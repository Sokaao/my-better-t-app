"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Lock, Server, Database, ShieldCheck, Plus, X } from "lucide-react";
import SiteNavMinimal from "@/components/site-nav-minimal";
import SiteFooterMinimal from "@/components/site-footer-minimal";

/**
 * Clé publique RSA-OAEP-256 de Synapsis (Fred). Non secrète — sert uniquement à chiffrer,
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
	objections: string;
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
	objections: "",
	calendly: "",
	youtube: "",
	vocalLinks: "",
};

type VocalRow = { id: string; name: string };

const DEFAULT_VOCALS: VocalRow[] = [
	{ id: "voc-intro", name: "Intro « t'as aimé ma ressource ? »" },
	{ id: "voc-avatar-1", name: "Questions sur ton avatar (pour qualifier)" },
	{ id: "voc-appel", name: "Proposition d'appel" },
];

// Ces deux vocaux sont indispensables au scénario de base : suppression non autorisée.
const LOCKED_VOCAL_IDS = new Set(["voc-intro", "voc-appel"]);

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

export default function SetterIaOnboardingForm({ client, nom: clientNom }: { client: string; nom: string }) {
	const draftKey = `synapsis_onboarding_${client}`;

	const [values, setValues] = useState<Values>(EMPTY_VALUES);
	const [vocals, setVocals] = useState<VocalRow[]>(DEFAULT_VOCALS);
	const [fileCounts, setFileCounts] = useState<Record<string, number>>({});
	const [sending, setSending] = useState(false);
	const [status, setStatus] = useState<{ msg: string; cls: "" | "ok" | "err" }>({ msg: "", cls: "" });

	const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

	useEffect(() => {
		try {
			const raw = localStorage.getItem(draftKey);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed.values) setValues((v) => ({ ...v, ...parsed.values }));
				if (Array.isArray(parsed.vocals) && parsed.vocals.length) setVocals(parsed.vocals);
			}
		} catch {
			// brouillon illisible : on repart d'un formulaire vide
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(draftKey, JSON.stringify({ values, vocals }));
		} catch {
			// stockage plein/indisponible : tant pis pour l'autosave
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, vocals]);

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
		delete fileRefs.current[`vocal:${id}`];
	}

	function renameVocal(id: string, name: string) {
		setVocals((v) => v.map((x) => (x.id === id ? { ...x, name } : x)));
	}

	const vocalsHaveAudio = vocals.some((v) => (fileCounts[`vocal:${v.id}`] ?? 0) > 0);

	function totalAttachedBytes(): number {
		let total = 0;
		for (const input of Object.values(fileRefs.current)) {
			if (!input?.files) continue;
			for (const f of Array.from(input.files)) total += f.size;
		}
		return total;
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
			values.objections.trim() !== "",
			values.calendly.trim() !== "",
			values.youtube.trim() !== "",
			vocalsHaveAudio || values.vocalLinks.trim() !== "",
		];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, fileCounts, vocalsHaveAudio]);

	const doneCount = boxesDone.filter(Boolean).length;
	const totalCount = boxesDone.length;
	const progressPct = totalCount ? (doneCount / totalCount) * 100 : 0;

	async function handleSend() {
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
		setSending(true);
		setStatus({ msg: "Préparation…", cls: "" });
		try {
			const secrets = {
				manychat_token: values.manychatMode === "token" ? values.mcToken : "",
				openai: values.openaiKey,
				gemini: values.geminiKey,
			};
			const secretsChiffres = await encryptSecrets(secrets);

			const vocauxPayload = await Promise.all(
				vocals.map(async (v, i) => {
					const f = fileRefs.current[`vocal:${v.id}`]?.files?.[0];
					return {
						nom: v.name.trim() || `Vocal ${i + 1}`,
						fichier: f ? await fileToPayload(f) : null,
					};
				}),
			);

			const payload = {
				client,
				projet: `Setter IA Instagram — ${clientNom}`,
				soumis_le: new Date().toISOString(),
				contact: { nom: values.nom, email: values.email },
				acces: {
					manychat_mode: values.manychatMode,
					secrets_chiffres: secretsChiffres,
					note: secretsChiffres
						? "openai / gemini / manychat_token sont chiffrés en RSA-OAEP-256 + AES-256-GCM pour la clé publique Synapsis. À déchiffrer avec l'outil local dédié de Fred — ce JSON ne contient aucun secret en clair."
						: "Aucune clé/token saisi dans le formulaire.",
				},
				prompt: {
					identite_offre: { texte: values.identite, fichiers: await filesToPayload(fileRefs.current.identite?.files) },
					avatar: { texte: values.avatar, fichiers: await filesToPayload(fileRefs.current.avatar?.files) },
					critere_disqualif: { texte: values.critNeg, fichiers: await filesToPayload(fileRefs.current.critNeg?.files) },
					exemples_setting: { texte: values.exemplesText, fichiers: await filesToPayload(fileRefs.current.exemplesText?.files) },
					ton_relance: { texte: values.relance, fichiers: await filesToPayload(fileRefs.current.relance?.files) },
					objections: { texte: values.objections, fichiers: await filesToPayload(fileRefs.current.objections?.files) },
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
				msg: "✅ Envoyé à Fred. Tout est bien parti — tu peux fermer la page. Merci !",
				cls: "ok",
			});
			try {
				localStorage.removeItem(draftKey);
			} catch {
				// non bloquant
			}
		} catch {
			setStatus({
				msg: "Envoi impossible (connexion ou serveur indisponible). Réessaie dans un instant, ou écris-moi directement à " + NOTIFY_EMAIL + ".",
				cls: "err",
			});
		} finally {
			setSending(false);
		}
	}

	const CheckIcon = () => (
		<svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.4}>
			<path d="M4 12l5 5L20 6" />
		</svg>
	);

	function docAttach(key: keyof Values | "exemplesText", label: string) {
		return (
			<>
				<div className="of-sublab">Documents / captures liés — {label} (optionnel)</div>
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

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />

			<main>
				<section className="s-page-hero">
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
							tout envoi</strong> — je suis le seul à pouvoir les lire.
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
								<input
									type="text"
									placeholder="Nom / prénom"
									aria-label="Nom / prénom"
									value={values.nom}
									onChange={(e) => set("nom", e.target.value)}
								/>
								<input
									type="email"
									placeholder="Email"
									aria-label="Email"
									value={values.email}
									onChange={(e) => set("email", e.target.value)}
								/>
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
								<input
									type="text"
									placeholder="Clé OpenAI (sk-...)"
									aria-label="Clé OpenAI"
									value={values.openaiKey}
									onChange={(e) => set("openaiKey", e.target.value)}
								/>
								<input
									type="text"
									placeholder="Clé Google Gemini"
									aria-label="Clé Google Gemini"
									value={values.geminiKey}
									onChange={(e) => set("geminiKey", e.target.value)}
								/>
							</div>
							<p className="of-hint lock">
								<Lock size={12} /> Chiffrées dans ton navigateur (RSA-OAEP + AES-256-GCM) avant tout envoi — seul Fred
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
							Ce qui fait parler et qualifier l&apos;IA comme toi. Le cœur du système — sur chaque question tu peux aussi
							joindre des documents (PDF, Word, captures d&apos;écran…).
						</p>

						<div className={`of-field${boxesDone[3] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Ton identité &amp; ton offre</div>
									<div className="of-d">
										Sous quelle identité l&apos;IA répond (prénom, ton, crédibilité) + ce que tu vends : nature,
										promesse, cible.
									</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<textarea
								placeholder="Ex : Je réponds sous mon prénom, ton direct et cash. J'accompagne les… sur… Mon offre : …"
								aria-label="Identité et offre"
								value={values.identite}
								onChange={(e) => set("identite", e.target.value)}
							/>
							{docAttach("identite", "identité & offre")}
						</div>

						<div className={`of-field${boxesDone[4] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Ton (ou tes) avatar(s) client</div>
									<div className="of-d">Le profil précis des gens que tu vises, pour caler le vocabulaire et les questions.</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<textarea
								placeholder="Qui ? Quel niveau ? Quelle situation ? Plusieurs avatars possibles."
								aria-label="Avatar client"
								value={values.avatar}
								onChange={(e) => set("avatar", e.target.value)}
							/>
							{docAttach("avatar", "avatar(s) client")}
						</div>

						<div className={`of-field${boxesDone[5] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Ce qui fait que tu NE proposes PAS l&apos;accompagnement</div>
									<div className="of-d">Les critères qui disqualifient un prospect (hors cible, activité qui ne tourne pas…).</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<textarea
								placeholder="Ex : pas de business en cours, cible qui ne correspond pas, budget nul, etc."
								aria-label="Critères de disqualification"
								value={values.critNeg}
								onChange={(e) => set("critNeg", e.target.value)}
							/>
							{docAttach("critNeg", "critères de disqualification")}
						</div>

						<div className={`of-field${boxesDone[6] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Des exemples de setting réels</div>
									<div className="of-d">Colle des vraies conversations réussies, ou joins des captures.</div>
								</div>
								<span className="of-prio of-prio-std">Standard</span>
							</div>
							<textarea
								placeholder="Colle ici tes échanges types (texte)…"
								aria-label="Exemples de setting"
								value={values.exemplesText}
								onChange={(e) => set("exemplesText", e.target.value)}
							/>
							{docAttach("exemplesText", "exemples de setting")}
						</div>

						<div className={`of-field${boxesDone[7] ? " done" : ""}`}>
							<div className="of-fhead">
								<span className="of-box">
									<CheckIcon />
								</span>
								<div className="of-ftxt">
									<div className="of-t">Ton message de relance</div>
									<div className="of-d">Le style/ton des relances (souvent plus court et décontracté que le setter).</div>
								</div>
								<span className="of-prio of-prio-std">Standard</span>
							</div>
							<textarea
								placeholder="Ex : ton façon 'pote qui relance', 1 phrase max…"
								aria-label="Message de relance"
								value={values.relance}
								onChange={(e) => set("relance", e.target.value)}
							/>
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
							<textarea
								placeholder="Ex : « c'est payant ? » → … / « j'ai pas le temps » → …"
								aria-label="Objections récurrentes"
								value={values.objections}
								onChange={(e) => set("objections", e.target.value)}
							/>
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
									<div className="of-t">Ton lien Calendly</div>
									<div className="of-d">L&apos;objectif de conversion : l&apos;IA l&apos;envoie pour caler l&apos;appel avec les prospects qualifiés.</div>
								</div>
								<span className="of-prio of-prio-key">Bloquant</span>
							</div>
							<input
								type="url"
								placeholder="https://calendly.com/…"
								aria-label="Lien Calendly"
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
									<div className="of-t">Ta vidéo de nurturing (lien YouTube)</div>
									<div className="of-d">Envoyée aux prospects pas encore mûrs pour les entretenir.</div>
								</div>
								<span className="of-prio of-prio-std">Standard</span>
							</div>
							<input
								type="url"
								placeholder="https://youtube.com/…"
								aria-label="Lien YouTube de nurturing"
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
										Enregistre-les depuis ton tel puis dépose les fichiers ici. Ajoute-en autant que nécessaire — utile
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
									{!LOCKED_VOCAL_IDS.has(v.id) && (
										<button
											type="button"
											className="of-vocal-remove"
											aria-label="Supprimer ce vocal"
											onClick={() => removeVocal(v.id)}
										>
											<X size={14} />
										</button>
									)}
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
								Tout part directement à Fred en un clic — textes, documents et vocaux inclus. Rien à télécharger ni à
								joindre à un mail, et rien à renvoyer si tu as un doute : tu verras la confirmation ci-dessous.
							</p>
							<button className="s-btn s-btn-primary" type="button" disabled={sending} onClick={handleSend}>
								Envoyer le tout <span className="arr">→</span>
							</button>
							{status.msg && <div className={`of-status ${status.cls}`}>{status.msg}</div>}
						</div>
						<p style={{ textAlign: "center", fontSize: 13, color: "var(--faint)", marginTop: 16 }}>
							<CheckCircle2 size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
							Tes saisies restent sur ton navigateur jusqu&apos;à l&apos;envoi.
						</p>
					</section>
				</div>
			</main>

			<SiteFooterMinimal />
		</>
	);
}
