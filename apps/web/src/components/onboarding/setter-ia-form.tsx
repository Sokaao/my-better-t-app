"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Lock, Server, Database, ShieldCheck, Plus, X, Clock, Mic, Square, Trash2 } from "lucide-react";
import { track } from "@vercel/analytics";

/**
 * Clé publique RSA-OAEP-256 de Synapsis (Fred). Non secrète : sert uniquement à chiffrer,
 * jamais à déchiffrer. La clé privée correspondante n'existe que hors-ligne, chez Fred.
 */
const FRED_PUBLIC_KEY_JWK: JsonWebKey = {
	kty: "RSA",
	n: "wKGwa_C8CTQ0NjqEMGrAiFgOTd_UkmsP9tgmHRrnciYGllmuggyCS3IcYg_K9TkFvxrOQg9RhMWuxjsFEWGmxUOt1GFyGqMvLdJlTzuKIECch5JrRC6NSzsj6VO29YsQCryy17Hnsf3sl2mAs7A7NrFXZcnEzD928dK3LZ40wBTG1CyrSxQY5hOW_LvhvU1tHvaQBRF_2qnR5eKqc80JfvtmPPu-CgCHVZrQ4FVBl55IZZHWcEheOgzk2oC9TZx-ndnnwyh1tyWTUNOujPYsUnPRU-T4Az42Gb6u52wH7ck1y_DEyQaf1EU9xRPqnbF-_Oqo4I-hnLM3ujFOprfv1Q",
	e: "AQAB",
	alg: "RSA-OAEP-256",
	ext: true,
	key_ops: ["encrypt", "wrapKey"],
};

const NOTIFY_EMAIL = "contact@mysynapsis.fr";
const DOC_ACCEPT = "image/*,.pdf,.doc,.docx,.txt";
const WEBHOOK_URL = "https://n8n.mysynapsis.fr/webhook/onboarding-celofat-36ed444892d7";
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

type Values = {
	nom: string;
	email: string;
	manychatMode: "" | "collaborateur" | "token";
	mcToken: string;
	openaiKey: string;
	geminiKey: string;
	identite: string;
	avatar: string;
	critNeg: string;
	exemplesText: string;
	relance: string;
	calendly: string;
	youtube: string;
	vocalLinks: string;
};

const EMPTY_VALUES: Values = {
	nom: "",
	email: "",
	manychatMode: "",
	mcToken: "",
	openaiKey: "",
	geminiKey: "",
	identite: "",
	avatar: "",
	critNeg: "",
	exemplesText: "",
	relance: "",
	calendly: "",
	youtube: "",
	vocalLinks: "",
};

type VocalRow = { id: string; name: string };
type ObjectionRow = { id: string; question: string; reponse: string };

const DEFAULT_VOCALS: VocalRow[] = [
	{ id: "voc-intro", name: "Intro « t'as aimé ma ressource ? »" },
	{ id: "voc-avatar-1", name: "Questions sur ton avatar (pour qualifier)" },
	{ id: "voc-appel", name: "Proposition d'appel" },
];

const DEFAULT_OBJECTIONS: ObjectionRow[] = [{ id: "obj-1", question: "", reponse: "" }];

// Ces deux vocaux sont indispensables au scénario de base : suppression non autorisée.
const LOCKED_VOCAL_IDS = new Set(["voc-intro", "voc-appel"]);

const EXAMPLES: Record<string, string> = {
	identite:
		"Exemple :\nJe réponds sous mon prénom, avec un ton direct et complice, jamais scolaire. J'accompagne des indépendants qui vendent du service (coachs, consultants, artisans du digital) à structurer leur activité pour arrêter de vendre leur temps. Mon offre : un accompagnement de 3 mois pour poser une offre claire, un système de vente répétable et une routine de contenu qui ramène des prospects qualifiés.",
	avatar:
		"Exemple :\nDes indépendants entre 1 et 3 ans d'activité, qui génèrent déjà du chiffre mais à l'instinct, pas de vrai système. Souvent débordés, mal payés par rapport au temps investi, avec une offre encore floue. Ils suivent déjà des comptes business sur Instagram et savent qu'il leur manque une structure.",
	critNeg:
		"Exemple :\n- Pas encore d'activité lancée (idée seule, zéro client)\n- Salarié qui « réfléchit à se lancer » sans échéance\n- Budget clairement hors de portée, annoncé spontanément\n- Secteur que je n'accompagne pas (ex : e-commerce physique)",
	exemplesText:
		"Exemple de format :\n\nProspect : Salut ! Je viens de voir ta story, ça m'intéresse…\nToi : Hey merci ! Dis-m'en plus, tu es dans quel domaine ?\nProspect : …\n\n(Colle 2-3 échanges complets, du premier message jusqu'à la prise de RDV.)",
	relance:
		"Exemple :\nToujours plus court que le setter, ton « pote qui recroise quelqu'un » : « Hey, je voulais pas te laisser sans réponse 😄 T'en es où de ton côté ? »",
};

function bufToB64(buf: ArrayBuffer): string {
	const bytes = new Uint8Array(buf);
	let bin = "";
	for (const b of bytes) bin += String.fromCharCode(b);
	return btoa(bin);
}

async function encryptSecrets(secrets: Record<string, string>) {
	const hasSecret = Object.values(secrets).some((v) => v && v.trim() !== "");
	if (!hasSecret) return null;

	const publicKey = await crypto.subtle.importKey(
		"jwk",
		FRED_PUBLIC_KEY_JWK,
		{ name: "RSA-OAEP", hash: "SHA-256" },
		true,
		["wrapKey"],
	);
	const aesKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const plaintext = new TextEncoder().encode(JSON.stringify(secrets));
	const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, plaintext);
	const wrappedKey = await crypto.subtle.wrapKey("raw", aesKey, publicKey, { name: "RSA-OAEP" });

	return {
		alg: "RSA-OAEP-256+AES-256-GCM",
		wrappedKey: bufToB64(wrappedKey),
		iv: bufToB64(iv.buffer as ArrayBuffer),
		ciphertext: bufToB64(ciphertext),
	};
}

type FilePayload = { name: string; type: string; size: number; data: string };

function fileToPayload(file: File): Promise<FilePayload> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, data: String(reader.result) });
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}

function filesToPayload(list: FileList | null | undefined): Promise<FilePayload[]> {
	if (!list || !list.length) return Promise.resolve([]);
	return Promise.all(Array.from(list).map(fileToPayload));
}

function formatSeconds(total: number): string {
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}

function VoiceRecorder({ label, onRecorded }: { label: string; onRecorded: (file: File | null) => void }) {
	const [recording, setRecording] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [error, setError] = useState("");

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const chunksRef = useRef<Blob[]>([]);
	const streamRef = useRef<MediaStream | null>(null);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
			streamRef.current?.getTracks().forEach((t) => t.stop());
		};
	}, []);

	async function startRecording() {
		setError("");
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = stream;
			const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
			const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
			chunksRef.current = [];
			recorder.ondataavailable = (e) => {
				if (e.data.size > 0) chunksRef.current.push(e.data);
			};
			recorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
				const ext = blob.type.includes("mp4") ? "m4a" : "webm";
				const safeName = (label || "vocal").replace(/[^\p{L}\p{N}-]+/gu, "-").slice(0, 40) || "vocal";
				const file = new File([blob], `${safeName}.${ext}`, { type: blob.type });
				setPreviewUrl(URL.createObjectURL(blob));
				onRecorded(file);
				stream.getTracks().forEach((t) => t.stop());
			};
			mediaRecorderRef.current = recorder;
			recorder.start();
			setRecording(true);
			setSeconds(0);
			timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
		} catch {
			setError("Micro inaccessible. Vérifie les autorisations de ton navigateur.");
		}
	}

	function stopRecording() {
		mediaRecorderRef.current?.stop();
		setRecording(false);
		if (timerRef.current) clearInterval(timerRef.current);
	}

	function clearRecording() {
		setPreviewUrl(null);
		onRecorded(null);
	}

	if (previewUrl) {
		return (
			<div className="of-recorder has-recording">
				<audio controls src={previewUrl} style={{ height: 32 }} />
				<button type="button" className="of-recorder-btn" onClick={clearRecording}>
					<Trash2 size={13} /> Supprimer
				</button>
			</div>
		);
	}

	return (
		<div className="of-recorder">
			{recording ? (
				<button type="button" className="of-recorder-btn is-recording" onClick={stopRecording}>
					<Square size={12} /> Arrêter ({formatSeconds(seconds)})
				</button>
			) : (
				<button type="button" className="of-recorder-btn" onClick={startRecording}>
					<Mic size={13} /> Enregistrer directement
				</button>
			)}
			{error && <span className="of-recorder-error">{error}</span>}
		</div>
	);
}

export default function SetterIaOnboardingForm({
	client,
	nom: clientNom,
	onSuccess,
}: {
	client: string;
	nom: string;
	onSuccess?: () => void;
}) {
	const draftKey = `synapsis_onboarding_${client}`;

	const [values, setValues] = useState<Values>(EMPTY_VALUES);
	const [vocals, setVocals] = useState<VocalRow[]>(DEFAULT_VOCALS);
	const [objections, setObjections] = useState<ObjectionRow[]>(DEFAULT_OBJECTIONS);
	const [fileCounts, setFileCounts] = useState<Record<string, number>>({});
	const [recordedVocals, setRecordedVocals] = useState<Record<string, File | null>>({});
	const [sending, setSending] = useState(false);
	const [status, setStatus] = useState<{ msg: string; cls: "" | "ok" | "err" }>({ msg: "", cls: "" });
	const [exampleOpen, setExampleOpen] = useState<Record<string, boolean>>({});
	const [showSaved, setShowSaved] = useState(false);
	const [reviewOpen, setReviewOpen] = useState(false);

	const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
	const isFirstSave = useRef(true);
	const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(draftKey);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed.values) setValues((v) => ({ ...v, ...parsed.values }));
				if (Array.isArray(parsed.vocals) && parsed.vocals.length) setVocals(parsed.vocals);
				if (Array.isArray(parsed.objections) && parsed.objections.length) setObjections(parsed.objections);
			}
		} catch {
			// brouillon illisible : on repart d'un formulaire vide
		}
		track("onboarding_started", { client });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(draftKey, JSON.stringify({ values, vocals, objections }));
		} catch {
			// stockage plein/indisponible : tant pis pour l'autosave
		}
		if (isFirstSave.current) {
			isFirstSave.current = false;
			return;
		}
		setShowSaved(true);
		if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
		saveTimerRef.current = setTimeout(() => setShowSaved(false), 2000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, vocals, objections]);

	function set<K extends keyof Values>(key: K, val: Values[K]) {
		setValues((v) => ({ ...v, [key]: val }));
	}

	function handleFileChange(key: string, e: React.ChangeEvent<HTMLInputElement>) {
		setFileCounts((c) => ({ ...c, [key]: e.target.files?.length ?? 0 }));
	}

	function addVocal() {
		setVocals((v) => [...v, { id: crypto.randomUUID(), name: "" }]);
	}

	function removeVocal(id: string) {
		if (LOCKED_VOCAL_IDS.has(id)) return;
		setVocals((v) => v.filter((x) => x.id !== id));
		setFileCounts((c) => {
			const next = { ...c };
			delete next[`vocal:${id}`];
			return next;
		});
		setRecordedVocals((r) => {
			const next = { ...r };
			delete next[id];
			return next;
		});
		delete fileRefs.current[`vocal:${id}`];
	}

	function renameVocal(id: string, name: string) {
		setVocals((v) => v.map((x) => (x.id === id ? { ...x, name } : x)));
	}

	function addObjection() {
		setObjections((o) => [...o, { id: crypto.randomUUID(), question: "", reponse: "" }]);
	}

	function removeObjection(id: string) {
		setObjections((o) => (o.length > 1 ? o.filter((x) => x.id !== id) : o));
	}

	function updateObjection(id: string, field: "question" | "reponse", val: string) {
		setObjections((o) => o.map((x) => (x.id === id ? { ...x, [field]: val } : x)));
	}

	function toggleExample(key: string) {
		setExampleOpen((e) => ({ ...e, [key]: !e[key] }));
	}

	const vocalsHaveAudio = vocals.some((v) => (fileCounts[`vocal:${v.id}`] ?? 0) > 0 || !!recordedVocals[v.id]);
	const objectionsFilled = objections.some((o) => o.question.trim() !== "" || o.reponse.trim() !== "");

	function totalAttachedBytes(): number {
		let total = 0;
		for (const input of Object.values(fileRefs.current)) {
			if (!input?.files) continue;
			for (const f of Array.from(input.files)) total += f.size;
		}
		for (const f of Object.values(recordedVocals)) {
			if (f) total += f.size;
		}
		return total;
	}

	function attachedDocCount(): number {
		let n = 0;
		for (const [key, input] of Object.entries(fileRefs.current)) {
			if (key.startsWith("vocal:")) continue;
			n += input?.files?.length ?? 0;
		}
		return n;
	}

	function vocalsReadyCount(): number {
		return vocals.filter((v) => !!recordedVocals[v.id] || (fileRefs.current[`vocal:${v.id}`]?.files?.length ?? 0) > 0).length;
	}

	const boxesDone = useMemo(() => {
		return [
			values.nom.trim() !== "" && values.email.trim() !== "",
			values.manychatMode !== "",
			values.openaiKey.trim() !== "" || values.geminiKey.trim() !== "",
			values.identite.trim() !== "",
			values.avatar.trim() !== "",
			values.critNeg.trim() !== "",
			values.exemplesText.trim() !== "" || (fileCounts.exemplesText ?? 0) > 0,
			values.relance.trim() !== "",
			objectionsFilled,
			values.calendly.trim() !== "",
			values.youtube.trim() !== "",
			vocalsHaveAudio || values.vocalLinks.trim() !== "",
		];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, fileCounts, vocalsHaveAudio, objectionsFilled]);

	const doneCount = boxesDone.filter(Boolean).length;
	const totalCount = boxesDone.length;
	const progressPct = totalCount ? (doneCount / totalCount) * 100 : 0;

	function handleReviewClick() {
		if (!values.nom.trim() || !values.email.trim()) {
			setStatus({ msg: "Renseigne au moins ton nom et ton email.", cls: "err" });
			return;
		}
		if (totalAttachedBytes() > MAX_TOTAL_BYTES) {
			setStatus({
				msg: "Tes pièces jointes dépassent 20 Mo au total. Retire quelques fichiers ou remplace-les par des liens (Drive/Dropbox), puis réessaie.",
				cls: "err",
			});
			return;
		}
		setStatus({ msg: "", cls: "" });
		setReviewOpen(true);
	}

	async function handleSend() {
		setSending(true);
		setStatus({ msg: "Préparation…", cls: "" });
		track("onboarding_submit_attempt", { client });
		try {
			const secrets = {
				manychat_token: values.manychatMode === "token" ? values.mcToken : "",
				openai: values.openaiKey,
				gemini: values.geminiKey,
			};
			const secretsChiffres = await encryptSecrets(secrets);

			const vocauxPayload = await Promise.all(
				vocals.map(async (v, i) => {
					const f = recordedVocals[v.id] || fileRefs.current[`vocal:${v.id}`]?.files?.[0];
					return {
						nom: v.name.trim() || `Vocal ${i + 1}`,
						fichier: f ? await fileToPayload(f) : null,
					};
				}),
			);

			const objectionItems = objections
				.map((o) => ({ question: o.question.trim(), reponse: o.reponse.trim() }))
				.filter((o) => o.question || o.reponse);

			const payload = {
				client,
				projet: `Setter IA Instagram · ${clientNom}`,
				soumis_le: new Date().toISOString(),
				contact: { nom: values.nom, email: values.email },
				acces: {
					manychat_mode: values.manychatMode,
					secrets_chiffres: secretsChiffres,
					note: secretsChiffres
						? "openai / gemini / manychat_token sont chiffrés en RSA-OAEP-256 + AES-256-GCM pour la clé publique Synapsis. À déchiffrer avec l'outil local dédié de Fred. Ce JSON ne contient aucun secret en clair."
						: "Aucune clé/token saisi dans le formulaire.",
				},
				prompt: {
					identite_offre: { texte: values.identite, fichiers: await filesToPayload(fileRefs.current.identite?.files) },
					avatar: { texte: values.avatar, fichiers: await filesToPayload(fileRefs.current.avatar?.files) },
					critere_disqualif: { texte: values.critNeg, fichiers: await filesToPayload(fileRefs.current.critNeg?.files) },
					exemples_setting: { texte: values.exemplesText, fichiers: await filesToPayload(fileRefs.current.exemplesText?.files) },
					ton_relance: { texte: values.relance, fichiers: await filesToPayload(fileRefs.current.relance?.files) },
					objections: {
						texte: objectionItems.map((o) => `« ${o.question} » → ${o.reponse}`).join("\n\n"),
						items: objectionItems,
						fichiers: await filesToPayload(fileRefs.current.objections?.files),
					},
				},
				medias: {
					calendly: values.calendly,
					youtube_nurturing: values.youtube,
					vocaux: vocauxPayload,
					vocaux_liens: values.vocalLinks,
				},
			};

			const res = await fetch(WEBHOOK_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error(String(res.status));

			setStatus({
				msg: "✅ Envoyé à Fred. Tout est bien parti, merci !",
				cls: "ok",
			});
			track("onboarding_submit_success", { client });
			try {
				localStorage.removeItem(draftKey);
			} catch {
				// non bloquant
			}
			onSuccess?.();
		} catch {
			setStatus({
				msg: "Envoi impossible (connexion ou serveur indisponible). Réessaie dans un instant, ou écris-moi directement à " + NOTIFY_EMAIL + ".",
				cls: "err",
			});
			track("onboarding_submit_error", { client });
		} finally {
			setSending(false);
		}
	}

	const CheckIcon = () => (
		<svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.4}>
			<path d="M4 12l5 5L20 6" />
		</svg>
	);

	function docAttach(key: string, label: string) {
		return (
			<>
				<div className="of-sublab">Documents / captures liés à {label} (optionnel)</div>
				<input
					type="file"
					multiple
					accept={DOC_ACCEPT}
					aria-label={`Documents pour ${label}`}
					ref={(el) => {
						fileRefs.current[key] = el;
					}}
					onChange={(e) => handleFileChange(key, e)}
				/>
			</>
		);
	}

	function exampleToggle(key: string) {
		if (!EXAMPLES[key]) return null;
		return (
			<>
				<button type="button" className="of-example-toggle" onClick={() => toggleExample(key)}>
					{exampleOpen[key] ? "Masquer l'exemple" : "Voir un exemple"}
				</button>
				{exampleOpen[key] && <div className="of-example">{EXAMPLES[key]}</div>}
			</>
		);
	}

	return (
		<>
			<section className="s-page-hero" style={{ paddingTop: 8 }}>
					<div className="s-wrap">
						<span className="s-eyebrow" style={{ justifyContent: "center" }}>
							Onboarding · {clientNom}
						</span>
						<h1>
							Ce dont j&apos;ai besoin de toi pour <span style={{ color: "var(--orange)" }}>construire ton setter IA</span>.
						</h1>
						<p>
							L&apos;hébergement n8n et le CRM sont de mon côté. Remplis les champs ci-dessous, ajoute tes fichiers, et
							envoie-moi le tout en un clic. <strong>Tes clés API et ton token sont chiffrés dans ton navigateur avant
							tout envoi</strong>, je suis le seul à pouvoir les lire.
						</p>
						<p className="of-time-estimate">
							<Clock size={13} /> Environ 15-20 minutes. Ton brouillon est sauvegardé automatiquement, tu peux revenir plus tard.
						</p>
					</div>
				</section>

				<section className="s-blk" style={{ paddingTop: 0 }}>
					<div className="s-wrap">
						<div className="s-info-strip">
							<div className="s-info-item">
								<div className="s-cico">
									<Server size={18} />
								</div>
								<div>
									<strong>Hébergement n8n</strong>
									<span>Pris en charge par Synapsis</span>
								</div>
							</div>
							<div className="s-info-item">
								<div className="s-cico">
									<Database size={18} />
								</div>
								<div>
									<strong>CRM (20CRM)</strong>
									<span>Pris en charge par Synapsis</span>
								</div>
							</div>
							<div className="s-info-item">
								<div className="s-cico">
									<Lock size={18} />
								</div>
								<div>
									<strong>Clés API &amp; token</strong>
									<span>Chiffrés avant envoi, déchiffrables par moi seul</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className="of-progress">
					<div className="s-wrap of-progress-row">
						<div className="of-bar">
							<i style={{ width: `${progressPct}%` }} />
						</div>
						<span className="of-pcount">
							<b>{doneCount}</b>/{totalCount} champs remplis
						</span>
					</div>
				</div>

				<div className="s-wrap">
					{/* 0 : coordonnées */}
					<section className="of-sec">
						<div className="of-sec-head">
							<span className="of-num">0</span>
							<h2>Tes coordonnées</h2>
						</div>
						<div className={`of-field${boxesDone[0] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Pour que je te recontacte</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<div className="of-grid2">
								<div>
									<label className="of-grid-label" htmlFor="f-nom">
										Nom / prénom
									</label>
									<input
										id="f-nom"
										type="text"
										placeholder="Ex : Noé Perret"
										value={values.nom}
										onChange={(e) => set("nom", e.target.value)}
									/>
								</div>
								<div>
									<label className="of-grid-label" htmlFor="f-email">
										Email
									</label>
									<input
										id="f-email"
										type="email"
										placeholder="toi@exemple.fr"
										value={values.email}
										onChange={(e) => set("email", e.target.value)}
									/>
								</div>
							</div>
						</div>
					</section>

					{/* 1 : accès techniques */}
					<section className="of-sec">
						<div className="of-sec-head">
							<span className="of-num">1</span>
							<h2>Accès techniques</h2>
						</div>
						<p className="of-sec-desc">Les comptes qui relient Instagram à l&apos;automatisation et font tourner l&apos;IA.</p>

						<div className={`of-field${boxesDone[1] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Accès à ton compte ManyChat</div>
									<div className="of-d">Tu as déjà une autom ManyChat en place, donc le socle est bon.</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<div className="of-radios">
								<label className="of-radiopill">
									<input
										type="radio"
										name="mc"
										value="collaborateur"
										checked={values.manychatMode === "collaborateur"}
										onChange={() => set("manychatMode", "collaborateur")}
									/>
									Je t&apos;ajoute en collaborateur
								</label>
								<label className="of-radiopill">
									<input
										type="radio"
										name="mc"
										value="token"
										checked={values.manychatMode === "token"}
										onChange={() => set("manychatMode", "token")}
									/>
									Je te passe le token API
								</label>
							</div>
							{values.manychatMode === "token" && (
								<input
									type="text"
									placeholder="Token API ManyChat"
									aria-label="Token API ManyChat"
									value={values.mcToken}
									onChange={(e) => set("mcToken", e.target.value)}
								/>
							)}
						</div>

						<div className={`of-field${boxesDone[2] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Credentials OpenAI &amp; Google Gemini</div>
									<div className="of-d">
										Clé <code>OpenAI</code> (rédaction + transcription) et clé <code>Gemini</code> (lecture
										images/vidéos). Je te guide pour les créer si besoin.
									</div>
								</div>
								<span className="of-prio of-prio-lock">
									<ShieldCheck size={11} style={{ marginRight: 4, verticalAlign: -1 }} />
									Chiffré
								</span>
							</div>
							<div className="of-grid2">
								<div>
									<label className="of-grid-label" htmlFor="f-openai">
										Clé OpenAI
									</label>
									<input
										id="f-openai"
										type="text"
										placeholder="sk-..."
										value={values.openaiKey}
										onChange={(e) => set("openaiKey", e.target.value)}
									/>
								</div>
								<div>
									<label className="of-grid-label" htmlFor="f-gemini">
										Clé Google Gemini
									</label>
									<input
										id="f-gemini"
										type="text"
										placeholder="AIza..."
										value={values.geminiKey}
										onChange={(e) => set("geminiKey", e.target.value)}
									/>
								</div>
							</div>
							<p className="of-hint lock">
								<Lock size={12} /> Chiffrées dans ton navigateur (RSA-OAEP + AES-256-GCM) avant tout envoi, seul Fred
								peut les déchiffrer. Tu peux aussi laisser vide et m&apos;inviter directement dans ton n8n : c&apos;est
								l&apos;option la plus sûre.
							</p>
						</div>
					</section>

					{/* 2 : contenu du prompt */}
					<section className="of-sec">
						<div className="of-sec-head">
							<span className="of-num">2</span>
							<h2>Contenu du prompt</h2>
						</div>
						<p className="of-sec-desc">
							Ce qui fait parler et qualifier l&apos;IA comme toi. Le cœur du système : chaque question a un exemple si
							tu veux t&apos;inspirer, et tu peux joindre des documents (PDF, Word, captures d&apos;écran…).
						</p>

						<div className={`of-field${boxesDone[3] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<label className="of-t" htmlFor="p-identite">
										Ton identité &amp; ton offre
									</label>
									<div className="of-d">
										Sous quelle identité l&apos;IA répond (prénom, ton, crédibilité) + ce que tu vends : nature,
										promesse, cible.
									</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<textarea
								id="p-identite"
								placeholder="Ex : Je réponds sous mon prénom, ton direct et cash. J'accompagne les… sur… Mon offre : …"
								value={values.identite}
								onChange={(e) => set("identite", e.target.value)}
							/>
							{exampleToggle("identite")}
							{docAttach("identite", "identité & offre")}
						</div>

						<div className={`of-field${boxesDone[4] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<label className="of-t" htmlFor="p-avatar">
										Ton (ou tes) avatar(s) client
									</label>
									<div className="of-d">Le profil précis des gens que tu vises, pour caler le vocabulaire et les questions.</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<textarea
								id="p-avatar"
								placeholder="Qui ? Quel niveau ? Quelle situation ? Plusieurs avatars possibles."
								value={values.avatar}
								onChange={(e) => set("avatar", e.target.value)}
							/>
							{exampleToggle("avatar")}
							{docAttach("avatar", "avatar(s) client")}
						</div>

						<div className={`of-field${boxesDone[5] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<label className="of-t" htmlFor="p-critneg">
										Ce qui fait que tu NE proposes PAS l&apos;accompagnement
									</label>
									<div className="of-d">Les critères qui disqualifient un prospect (hors cible, activité qui ne tourne pas…).</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<textarea
								id="p-critneg"
								placeholder="Ex : pas de business en cours, cible qui ne correspond pas, budget nul, etc."
								value={values.critNeg}
								onChange={(e) => set("critNeg", e.target.value)}
							/>
							{exampleToggle("critNeg")}
							{docAttach("critNeg", "critères de disqualification")}
						</div>

						<div className={`of-field${boxesDone[6] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<label className="of-t" htmlFor="p-exemples">
										Des exemples de setting réels
									</label>
									<div className="of-d">Colle des vraies conversations réussies, ou joins des captures.</div>
								</div>
								<span className="of-prio of-prio-std">Standard</span>
							</div>
							<textarea
								id="p-exemples"
								placeholder="Colle ici tes échanges types (texte)…"
								value={values.exemplesText}
								onChange={(e) => set("exemplesText", e.target.value)}
							/>
							{exampleToggle("exemplesText")}
							{docAttach("exemplesText", "exemples de setting")}
						</div>

						<div className={`of-field${boxesDone[7] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<label className="of-t" htmlFor="p-relance">
										Ton message de relance
									</label>
									<div className="of-d">Le style/ton des relances (souvent plus court et décontracté que le setter).</div>
								</div>
								<span className="of-prio of-prio-std">Standard</span>
							</div>
							<textarea
								id="p-relance"
								placeholder="Ex : ton façon 'pote qui relance', 1 phrase max…"
								value={values.relance}
								onChange={(e) => set("relance", e.target.value)}
							/>
							{exampleToggle("relance")}
							{docAttach("relance", "message de relance")}
						</div>

						<div className={`of-field${boxesDone[8] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Tes objections les plus récurrentes</div>
									<div className="of-d">Les objections fréquentes + ta façon d&apos;y répondre. L&apos;IA les rejoue quasi mot pour mot.</div>
								</div>
								<span className="of-prio of-prio-opt">Optionnel</span>
							</div>

							{objections.map((o, i) => (
								<div className="of-obj-row" key={o.id}>
									<div className="of-obj-row-head">
										<span>Objection {i + 1}</span>
										{objections.length > 1 && (
											<button
												type="button"
												className="of-vocal-remove"
												aria-label="Supprimer cette objection"
												onClick={() => removeObjection(o.id)}
											>
												<X size={13} />
											</button>
										)}
									</div>
									<input
										type="text"
										placeholder="Ex : « C'est payant ? »"
										aria-label={`Objection ${i + 1}`}
										value={o.question}
										onChange={(e) => updateObjection(o.id, "question", e.target.value)}
									/>
									<textarea
										placeholder="Ta réponse habituelle…"
										aria-label={`Réponse à l'objection ${i + 1}`}
										value={o.reponse}
										onChange={(e) => updateObjection(o.id, "reponse", e.target.value)}
									/>
								</div>
							))}
							<button type="button" className="of-add-btn" onClick={addObjection}>
								<Plus size={14} /> Ajouter une objection
							</button>
							{docAttach("objections", "objections récurrentes")}
						</div>
					</section>

					{/* 3 : médias & liens */}
					<section className="of-sec">
						<div className="of-sec-head">
							<span className="of-num">3</span>
							<h2>Médias &amp; liens</h2>
						</div>
						<p className="of-sec-desc">Les contenus que l&apos;IA envoie au fil de la conversation.</p>

						<div className={`of-field${boxesDone[9] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<label className="of-t" htmlFor="m-calendly">
										Ton lien Calendly
									</label>
									<div className="of-d">L&apos;objectif de conversion : l&apos;IA l&apos;envoie pour caler l&apos;appel avec les prospects qualifiés.</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<input
								id="m-calendly"
								type="url"
								placeholder="https://calendly.com/…"
								value={values.calendly}
								onChange={(e) => set("calendly", e.target.value)}
							/>
						</div>

						<div className={`of-field${boxesDone[10] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<label className="of-t" htmlFor="m-youtube">
										Ta vidéo de nurturing (lien YouTube)
									</label>
									<div className="of-d">Envoyée aux prospects pas encore mûrs pour les entretenir.</div>
								</div>
								<span className="of-prio of-prio-std">Standard</span>
							</div>
							<input
								id="m-youtube"
								type="url"
								placeholder="https://youtube.com/…"
								value={values.youtube}
								onChange={(e) => set("youtube", e.target.value)}
							/>
						</div>

						<div className={`of-field${boxesDone[11] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Ta banque de vocaux</div>
									<div className="of-d">
										Enregistre-les depuis ton tel puis dépose les fichiers ici. Ajoute-en autant que nécessaire, utile
										notamment pour les questions sur ton avatar, tu peux en avoir plusieurs.
									</div>
								</div>
								<span className="of-prio of-prio-std">Standard</span>
							</div>

							{vocals.map((v, i) => (
								<div className="of-vocal-row" key={v.id}>
									<input
										type="text"
										className="of-vocal-name"
										placeholder={`Nom du vocal ${i + 1}`}
										aria-label={`Nom du vocal ${i + 1}`}
										value={v.name}
										onChange={(e) => renameVocal(v.id, e.target.value)}
									/>
									<input
										type="file"
										accept="audio/*"
										aria-label={`Fichier du vocal ${i + 1}`}
										ref={(el) => {
											fileRefs.current[`vocal:${v.id}`] = el;
										}}
										onChange={(e) => handleFileChange(`vocal:${v.id}`, e)}
									/>
									{!LOCKED_VOCAL_IDS.has(v.id) ? (
										<button
											type="button"
											className="of-vocal-remove"
											aria-label="Supprimer ce vocal"
											onClick={() => removeVocal(v.id)}
										>
											<X size={14} />
										</button>
									) : (
										<span className="of-vocal-remove-spacer" aria-hidden="true" />
									)}
									<VoiceRecorder
										label={v.name}
										onRecorded={(file) => setRecordedVocals((r) => ({ ...r, [v.id]: file }))}
									/>
								</div>
							))}
							<button type="button" className="of-add-btn" onClick={addVocal}>
								<Plus size={14} /> Ajouter un vocal
							</button>

							<div className="of-sublab">Ou colle des liens (Drive / Dropbox) si les fichiers sont lourds</div>
							<textarea
								placeholder={"1 · https://…\n2 · https://…\n3 · https://…"}
								aria-label="Liens vers les vocaux"
								style={{ minHeight: 70 }}
								value={values.vocalLinks}
								onChange={(e) => set("vocalLinks", e.target.value)}
							/>
							<p className="of-hint">Formats audio acceptés. Au-delà de ~8 Mo au total, privilégie les liens.</p>
						</div>
					</section>

					{/* submit */}
					<section className="of-sec" style={{ paddingBottom: 40 }}>
						<div className="s-band">
							<h2>Envoyer mes éléments à Fred</h2>
							<p>
								Tout part directement à Fred en un clic : textes, documents et vocaux inclus. Rien à télécharger ni à
								joindre à un mail, et rien à renvoyer si tu as un doute : tu verras la confirmation ci-dessous.
							</p>

							{!reviewOpen ? (
								<button className="s-btn s-btn-primary" type="button" onClick={handleReviewClick}>
									Envoyer le tout <span className="arr">→</span>
								</button>
							) : (
								status.cls !== "ok" && (
									<div className="of-review">
										<h3>Vérifie avant l&apos;envoi</h3>
										<ul>
											<li>
												Contact : <b>{values.nom || "-"}</b> · {values.email || "-"}
											</li>
											<li>
												<b>{doneCount}</b>/{totalCount} champs remplis
											</li>
											<li>
												<b>{attachedDocCount()}</b> document(s) joint(s)
											</li>
											<li>
												<b>{vocalsReadyCount()}</b>/{vocals.length} vocaux prêts (enregistrés ou importés)
											</li>
										</ul>
										<div className="of-review-actions">
											<button className="s-btn s-btn-ghost" type="button" disabled={sending} onClick={() => setReviewOpen(false)}>
												Revoir mes réponses
											</button>
											<button className="s-btn s-btn-primary" type="button" disabled={sending} onClick={handleSend}>
												{sending ? "Envoi…" : "Confirmer et envoyer →"}
											</button>
										</div>
									</div>
								)
							)}

							{status.msg && <div className={`of-status ${status.cls}`}>{status.msg}</div>}
							{status.cls === "ok" && (
								<div className="of-next-steps">
									<h3>Ce qui se passe maintenant</h3>
									<ol>
										<li>
											<b>1</b> Je reçois tout instantanément : fichiers, textes et vocaux inclus.
										</li>
										<li>
											<b>2</b> Je regarde ça sous 48h et je reviens vers toi si un point manque ou mérite d&apos;être
											précisé.
										</li>
										<li>
											<b>3</b> Je construis ton setter IA et je te partage un accès pour le tester avant toute mise en
											prod.
										</li>
									</ol>
									<p style={{ textAlign: "center", marginTop: 16 }}>
										<Link href="/deroulement" style={{ color: "var(--orange)", fontSize: 13, fontWeight: 600 }}>
											Voir le déroulement complet du projet →
										</Link>
									</p>
								</div>
							)}
						</div>
						<p style={{ textAlign: "center", fontSize: 13, color: "var(--faint)", marginTop: 16 }}>
							<CheckCircle2 size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
							Tes saisies restent sur ton navigateur jusqu&apos;à l&apos;envoi.
						</p>
					</section>
				</div>

			<div className={`of-save-indicator${showSaved ? " show" : ""}`} aria-live="polite">
				<span className="dot" /> Brouillon enregistré
			</div>
		</>
	);
}
