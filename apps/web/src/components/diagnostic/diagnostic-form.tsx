"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import SynapsisMark from "@/components/synapsis-mark";
import { submitDiagnostic } from "@/app/diagnostic/actions";
import type { Objectif } from "@/lib/leads";

// Hypothèses de cadrage, assumées comme telles à l'écran. Elles pilotent tout le
// résultat : les modifier ici change ce que voit le prospect.
const WEEKS = 46;
const ETP_H = 1607;
const AUTO = 0.55;
const CONV = 0.35;
const DAY_H = 7;

type Task = { label: string; hours: number; why: string };

const TASKS: Task[] = [
	{
		label: "Relancer les clients pour les pièces manquantes",
		hours: 2.5,
		why: "Le système relance chaque client tant qu'une pièce manque, en listant précisément ce qui manque, et s'arrête tout seul quand le dossier est complet. Vos équipes ne courent plus après personne.",
	},
	{
		label: "Collecter et classer les justificatifs",
		hours: 2,
		why: "Les pièces arrivent par mail ou par photo, sont renommées, classées dans le bon dossier et rapprochées de l'écriture. Plus de dossier à reconstituer trois mois plus tard.",
	},
	{
		label: "Ressaisir les mêmes infos dans plusieurs outils",
		hours: 2,
		why: "Vos outils se parlent. Une information saisie une fois se propage partout, ce qui supprime d'un coup la ressaisie et les erreurs qu'elle provoque.",
	},
	{
		label: "Préparer les déclarations de TVA",
		hours: 1.5,
		why: "Les données sont rassemblées et pré-remplies à date fixe. Il ne reste que le contrôle et la validation, qui restent chez vous.",
	},
	{
		label: "Répondre aux mêmes questions clients",
		hours: 1.5,
		why: "Les questions qui reviennent reçoivent une réponse préparée avec le contexte du dossier, que votre équipe valide d'un clic avant envoi.",
	},
	{
		label: "Sortir les tableaux de bord et les reportings",
		hours: 1.5,
		why: "Le tableau de bord du client se met à jour et part tout seul, à date fixe, sans que personne y pense le 5 du mois.",
	},
];

type Choice<T> = { label: string; value: T; sub?: string };

const SIZES: Choice<number>[] = [
	{ label: "Moins de 5 personnes", value: 4, sub: "Cabinet en création ou très petit" },
	{ label: "5 à 8 personnes", value: 6.5, sub: "Le format le plus courant" },
	{ label: "9 à 15 personnes", value: 12, sub: "Plusieurs pôles, un ou deux associés" },
	{ label: "Plus de 15 personnes", value: 20, sub: "Structure établie" },
];

const OWNER_HOURS: Choice<number>[] = [
	{ label: "Moins de 5 h", value: 3.5, sub: "Vous êtes déjà bien sorti de la production" },
	{ label: "Entre 5 et 10 h", value: 7.5, sub: "Environ une journée par semaine" },
	{ label: "Entre 10 et 15 h", value: 12.5, sub: "Le cas le plus fréquent" },
	{ label: "Plus de 15 h", value: 18, sub: "Vous êtes encore en production à temps partiel" },
];

const TEAM_HOURS: Choice<number>[] = [
	{ label: "3 à 5 h", value: 4 },
	{ label: "6 à 8 h", value: 7 },
	{ label: "9 à 12 h", value: 10.5 },
	{ label: "Plus de 12 h", value: 14 },
];

const RATES: Choice<number>[] = [
	{ label: "Moins de 80 €", value: 70 },
	{ label: "Entre 80 et 110 €", value: 95 },
	{ label: "Entre 110 et 150 €", value: 130 },
	{ label: "Plus de 150 €", value: 170 },
];

const WANTS: Choice<Objectif>[] = [
	{ label: "Du temps pour moi", value: "temps", sub: "Sortir la tête de l'eau" },
	{ label: "Du chiffre d'affaires", value: "argent", sub: "Grandir sans embaucher" },
	{ label: "Ma vie de famille", value: "vie", sub: "Ne plus finir la semaine le samedi" },
	{ label: "Arrêter les erreurs", value: "erreurs", sub: "Dormir tranquille sur la qualité" },
];

const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function roundish(n: number) {
	const a = Math.abs(n);
	const step = a >= 100000 ? 5000 : a >= 10000 ? 1000 : a >= 1000 ? 100 : 50;
	return Math.round(n / step) * step;
}
function kEur(n: number) {
	return Math.abs(n) >= 10000 ? `${nf.format(Math.round(n / 1000))} k€` : `${nf.format(Math.round(n))} €`;
}

export default function DiagnosticForm() {
	const [step, setStep] = useState(0);
	const [size, setSize] = useState(12);
	const [ownerH, setOwnerH] = useState(12.5);
	const [teamH, setTeamH] = useState(7);
	const [rate, setRate] = useState(130);
	const [want, setWant] = useState<Objectif>("temps");
	const [tasks, setTasks] = useState<number[]>([0, 1, 2, 3, 4, 5]);
	const [source, setSource] = useState<string | null>(null);

	const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "" });
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");
	const topRef = useRef<HTMLDivElement | null>(null);

	// D'où vient la personne : utm_source si présent, sinon le référent.
	useEffect(() => {
		const utm = new URLSearchParams(window.location.search).get("utm_source");
		if (utm) return setSource(utm.slice(0, 60));
		const ref = document.referrer;
		if (!ref) return setSource("direct");
		try {
			setSource(new URL(ref).hostname.replace(/^www\./, "").slice(0, 60));
		} catch {
			setSource("direct");
		}
	}, []);

	const go = (n: number) => {
		setStep(n);
		if (n === 7) track("diagnostic_resultat", { objectif: want });
		if (n === 1 && step === 0) track("diagnostic_demarre");
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
		topRef.current?.focus({ preventScroll: true });
	};

	const r = useMemo(() => {
		const others = Math.max(size - 1, 0);
		const ownerWeek = ownerH * AUTO;
		const ownerYear = ownerWeek * WEEKS;
		const totalYear = ownerYear + others * teamH * AUTO * WEEKS;
		return {
			others,
			// Volume brut avant le filtre d'automatisation, pour pouvoir montrer le
			// calcul étape par étape dans le dépliant.
			weeklyRaw: ownerH + others * teamH,
			yearlyRaw: (ownerH + others * teamH) * WEEKS,
			ownerWeek,
			ownerDays: ownerYear / DAY_H,
			totalYear,
			billableH: totalYear * CONV,
			revenue: totalYear * CONV * rate,
			people: totalYear / ETP_H,
		};
	}, [size, ownerH, teamH, rate]);

	// La tâche cochée la plus lourde : c'est par là qu'on commence.
	const first = useMemo(() => {
		const sorted = [...tasks].sort((a, b) => TASKS[b].hours - TASKS[a].hours);
		return sorted.length ? { top: TASKS[sorted[0]], rest: sorted.slice(1, 3).map((i) => TASKS[i].label.toLowerCase()) } : null;
	}, [tasks]);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setSending(true);
		const res = await submitDiagnostic({
			...form,
			tailleCabinet: size,
			heuresDirigeant: ownerH,
			heuresCollaborateur: teamH,
			tauxHoraire: rate,
			objectif: want,
			taches: tasks.map((i) => TASKS[i].label),
			heuresDirigeantSemaine: Number(r.ownerWeek.toFixed(2)),
			heuresDirigeantJoursAn: Math.round(r.ownerDays),
			heuresCabinetAn: Math.round(r.totalYear),
			caPotentiel: Math.round(r.revenue),
			etpEquivalent: Number(r.people.toFixed(2)),
			premiereAutomatisation: first?.top.label ?? "",
			source,
		});
		setSending(false);
		if (res.ok) {
			setSent(true);
			track("diagnostic_lead", { objectif: want });
		} else {
			setError(res.error);
		}
	}

	const headline: Record<Objectif, [string, string]> = {
		temps: [
			`Vous récupérez ${nf1.format(r.ownerWeek)} heures par semaine.`,
			"C'est le temps que vous passez aujourd'hui sur des tâches qu'une machine fait mieux que vous.",
		],
		argent: [
			`Votre cabinet peut aller chercher ${kEur(roundish(r.revenue))} de plus par an.`,
			"Sans une embauche de plus, en remettant du temps disponible sur des missions facturées.",
		],
		vie: [
			`Vous récupérez ${nf.format(Math.round(r.ownerDays))} journées par an.`,
			"Des soirées et des samedis que vous ne passez plus à rattraper le retard du cabinet.",
		],
		erreurs: [
			`Vous supprimez ${nf.format(Math.round(r.totalYear))} heures de saisie par an.`,
			"Et avec elles, la première source d'erreurs dans un cabinet : la ressaisie humaine.",
		],
	};

	const hero: Record<Objectif, { cap: string; num: string; unit: string; under: React.ReactNode }> = {
		temps: {
			cap: "Chaque semaine, pour vous",
			num: nf1.format(r.ownerWeek),
			unit: "heures",
			under: <>Soit <b>{nf.format(Math.round(r.ownerDays))} journées</b> par an que vous ne passez plus en production.</>,
		},
		argent: {
			cap: "Chiffre d'affaires possible, sans embaucher",
			num: nf.format(roundish(r.revenue)),
			unit: "€ / an",
			under: <>En remettant <b>{nf.format(Math.round(r.billableH))} heures</b> par an sur des missions facturées.</>,
		},
		vie: {
			cap: "Ce que vous rendez à votre famille",
			num: nf.format(Math.round(r.ownerDays)),
			unit: "journées / an",
			under: <>Soit <b>{nf1.format(r.ownerWeek)} heures</b> par semaine qui ne sont plus prises sur vos soirées.</>,
		},
		erreurs: {
			cap: "Heures de saisie supprimées",
			num: nf.format(Math.round(r.totalYear)),
			unit: "h / an",
			under: <>Autant d&apos;occasions en moins de se tromper de client, de sauter une ligne ou de perdre une pièce.</>,
		},
	};

	const cards: Record<Objectif, { cls: string; l: string; n: string; u?: string; d: string }> = {
		temps: {
			cls: "time", l: "Votre temps", n: nf1.format(r.ownerWeek), u: "h / semaine",
			d: `Soit ${nf.format(Math.round(r.ownerDays))} journées par an rendues à votre rôle de dirigeant.`,
		},
		argent: {
			cls: "money", l: "Chiffre d'affaires", n: nf.format(roundish(r.revenue)), u: "€ / an",
			d: `Du temps facturable en plus, à ${nf.format(rate)} € de l'heure, sans un salaire supplémentaire.`,
		},
		vie: {
			cls: "life", l: "Vos soirées", n: nf.format(Math.round(r.ownerDays)), u: "journées / an",
			d: "Votre temps récupéré, converti en journées entières passées ailleurs qu'au cabinet.",
		},
		erreurs: {
			cls: "err", l: "Vos erreurs", n: "La ressaisie disparaît",
			d: `${nf.format(Math.round(r.totalYear))} heures de saisie manuelle en moins par an, donc autant d'occasions de se tromper.`,
		},
	};

	const single = <T,>(choices: Choice<T>[], current: T, set: (v: T) => void, next: number) => (
		<div className="dg-opts">
			{choices.map((c) => (
				<button
					key={String(c.value)}
					type="button"
					className={`dg-opt${current === c.value ? " sel" : ""}`}
					onClick={() => {
						set(c.value);
						window.setTimeout(() => go(next), 230);
					}}
				>
					<span className="dg-box">✓</span>
					<span>
						{c.label}
						{c.sub ? <span className="dg-sub">{c.sub}</span> : null}
					</span>
				</button>
			))}
		</div>
	);

	return (
		<>
			<div className="dg-bar">
				<div className="dg-bar-in">
					<SynapsisMark className="dg-mark" />
					<div className="dg-track"><i style={{ width: `${(step / 7) * 100}%` }} /></div>
					<span className="dg-stepn">{step === 0 ? "Diagnostic" : step === 7 ? "Résultat" : `${step} / 6`}</span>
				</div>
			</div>

			<div ref={topRef} tabIndex={-1} />

			{step === 0 && (
				<section className="dg-screen">
					<div className="dg-wrap">
						<span className="s-eyebrow">Diagnostic gratuit · Cabinets d&apos;expertise comptable</span>
						<h1 className="dg-h1">Combien votre cabinet perd chaque semaine à ne pas automatiser ?</h1>
						<p className="dg-lead">
							Six questions sur votre quotidien. À la fin, vous saurez combien d&apos;heures vous récupérez, ce que ça vaut en chiffre d&apos;affaires, et par quelle automatisation commencer.
						</p>
						<div className="dg-facts">
							<div className="dg-fact"><i>✓</i><span>Six questions, deux minutes, sur mobile comme sur ordinateur.</span></div>
							<div className="dg-fact"><i>✓</i><span>Le résultat s&apos;affiche directement. Aucun email demandé pour le voir.</span></div>
							<div className="dg-fact"><i>✓</i><span>Calibré pour un cabinet de 5 à 15 personnes, pas pour un grand groupe.</span></div>
						</div>
						<div className="dg-nav">
							<button type="button" className="s-btn s-btn-primary" onClick={() => go(1)}>
								Commencer <span className="arr">→</span>
							</button>
						</div>
					</div>
				</section>
			)}

			{step >= 1 && step <= 6 && (
				<section className="dg-screen">
					<div className="dg-wrap">
						<span className="dg-qnum">Question {step} sur 6</span>

						{step === 1 && (
							<>
								<h2 className="dg-qtitle">Combien êtes-vous dans le cabinet, vous compris ?</h2>
								<p className="dg-qhelp">Toutes les personnes qui travaillent sur les dossiers, associés inclus.</p>
								{single(SIZES, size, setSize, 2)}
							</>
						)}

						{step === 2 && (
							<>
								<h2 className="dg-qtitle">Qu&apos;est-ce qui vous prend le plus de temps dans la semaine ?</h2>
								<p className="dg-qhelp">Cochez tout ce qui vous parle. C&apos;est ce qui déterminera par quoi commencer.</p>
								<div className="dg-opts">
									{TASKS.map((t, i) => (
										<button
											key={t.label}
											type="button"
											className={`dg-opt${tasks.includes(i) ? " sel" : ""}`}
											onClick={() => setTasks((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))}
										>
											<span className="dg-box">✓</span>
											<span>{t.label}</span>
										</button>
									))}
								</div>
								<div className="dg-nav">
									<button type="button" className="s-btn s-btn-primary" disabled={tasks.length === 0} onClick={() => go(3)}>
										Continuer <span className="arr">→</span>
									</button>
									<button type="button" className="dg-back" onClick={() => go(1)}>← Retour</button>
								</div>
							</>
						)}

						{step === 3 && (
							<>
								<h2 className="dg-qtitle">Et vous, combien d&apos;heures par semaine vous passez sur ces tâches ?</h2>
								<p className="dg-qhelp">Le temps que vous y passez personnellement, au lieu de développer le cabinet.</p>
								{single(OWNER_HOURS, ownerH, setOwnerH, 4)}
							</>
						)}

						{step === 4 && (
							<>
								<h2 className="dg-qtitle">Et un collaborateur, en moyenne ?</h2>
								<p className="dg-qhelp">Par semaine, sur ces mêmes tâches, en dehors de la production facturable.</p>
								{single(TEAM_HOURS, teamH, setTeamH, 5)}
							</>
						)}

						{step === 5 && (
							<>
								<h2 className="dg-qtitle">Quel est votre taux horaire moyen ?</h2>
								<p className="dg-qhelp">Forfaits ramenés à l&apos;heure.</p>
								{single(RATES, rate, setRate, 6)}
							</>
						)}

						{step === 6 && (
							<>
								<h2 className="dg-qtitle">Aujourd&apos;hui, qu&apos;avez vous le plus besoin ?</h2>
								<p className="dg-qhelp">Celle que vous avez le plus besoin en ce moment pour vous.</p>
								{single(WANTS, want, setWant, 7)}
							</>
						)}

						{step !== 2 && (
							<div className="dg-nav">
								<button type="button" className="dg-back" onClick={() => go(step - 1)}>← Retour</button>
							</div>
						)}
					</div>
				</section>
			)}

			{step === 7 && (
				<section className="dg-screen">
					<div className="dg-wrap dg-wide">
						<div className="dg-reshead">
							<span className="s-eyebrow" style={{ justifyContent: "center" }}>Votre résultat</span>
							<h1>{headline[want][0]}</h1>
							<p>{headline[want][1]}</p>
						</div>

						<div className="dg-hero">
							<span className="cap">{hero[want].cap}</span>
							<div className="big">{hero[want].num}<small>{hero[want].unit}</small></div>
							<p className="under">{hero[want].under}</p>
						</div>

						<div className="dg-cards">
							{(["temps", "argent", "vie", "erreurs"] as Objectif[])
								.filter((k) => k !== want)
								.map((k) => (
									<div key={k} className={`dg-card ${cards[k].cls}`}>
										<span className="l">{cards[k].l}</span>
										<div className="n">{cards[k].n}{cards[k].u ? <small>{cards[k].u}</small> : null}</div>
										<p className="d">{cards[k].d}</p>
									</div>
								))}
						</div>

						{first && (
							<div className="dg-start">
								<div className="rank">1</div>
								<div>
									<h3>Commencez par : {first.top.label.toLowerCase()}</h3>
									<p>{first.top.why}</p>
									{first.rest.length > 0 && <p className="then">Ensuite : {first.rest.join(", puis ")}.</p>}
								</div>
							</div>
						)}

						<details className="dg-fold">
							<summary>
								<span className="chev">▾</span> Comment on arrive à ce chiffre
							</summary>
							<ol className="dg-steps">
								<li>
									<span>
									Vous passez <b>{nf1.format(ownerH)} h</b> par semaine sur ces tâches.
									{r.others > 0 ? (
										<> Vos <b>{nf.format(r.others)}</b> collaborateurs y passent <b>{nf1.format(teamH)} h</b> chacun.</>
									) : null}{" "}
									Ça fait <b>{nf1.format(r.weeklyRaw)} h</b> par semaine dans le cabinet.
									</span>
								</li>
								<li>
									<span>
									Sur <b>46 semaines</b> travaillées dans l&apos;année, congés et fériés déduits, ça donne{" "}
									<b>{nf.format(Math.round(r.yearlyRaw))} h</b>.
									</span>
								</li>
								<li>
									<span>
									Tout n&apos;est pas automatisable. Je retiens <b>55 %</b>, le reste demande un jugement
									professionnel. Il reste <b>{nf.format(Math.round(r.totalYear))} h</b> par an qu&apos;un
									système peut reprendre.
									</span>
								</li>
								<li>
									<span>
									Là-dedans, <b>vos</b> heures à vous font <b>{nf1.format(r.ownerWeek)} h</b> par semaine,
									soit <b>{nf.format(Math.round(r.ownerDays))} journées</b> de 7 h sur l&apos;année.
									</span>
								</li>
								<li>
									<span>
									Si <b>35 %</b> du temps libéré repart en missions facturées, ça fait{" "}
									<b>{nf.format(Math.round(r.billableH))} h</b> facturables à <b>{nf.format(rate)} €</b>,
									donc <b>{kEur(roundish(r.revenue))}</b> de chiffre d&apos;affaires en plus.
									</span>
								</li>
								<li>
									<span>
									Les 65 % restants ne sont pas perdus : ils absorbent la croissance sans embaucher. Au
									total, ces heures pèsent <b>{nf1.format(r.people)}</b> collaborateur à temps plein, sur
									une base de 1 607 h par an.
									</span>
								</li>
							</ol>
							<p className="dg-foldnote">
								Les deux pourcentages, 55 % et 35 %, sont mes hypothèses de cadrage, pas des statistiques
								publiées. Les 46 semaines et les 1 607 h sont les références habituelles en France. Votre
								vrai chiffre se mesure sur une semaine de relevé, et c&apos;est exactement ce qu&apos;on
								ferait ensemble.
							</p>
						</details>

						<div className="dg-form">
							{sent ? (
								<div className="dg-ok">
									<b>C&apos;est noté, {form.prenom.trim()}.</b>
									<br />
									Je reviens vers vous sous 24 h ouvrées avec le relevé d&apos;une semaine à faire remplir par vos équipes, et on cale 30 minutes pour le dépouiller ensemble.
								</div>
							) : (
								<>
									<h2>Vous voulez le plan adapté à votre cabinet ?</h2>
									<p>
										Ce que vous venez de voir est une estimation construite sur des fourchettes. Laissez-moi vos coordonnées : je reviens vers vous avec <b>le relevé d&apos;une semaine à faire remplir par vos équipes</b>, et on chiffre vos vraies heures ensemble. Sans engagement.
									</p>
									<form onSubmit={onSubmit} noValidate>
										<div className="dg-grid2">
											<div className="dg-fld">
												<label htmlFor="dg-fn">Prénom</label>
												<input id="dg-fn" autoComplete="given-name" placeholder="Votre prénom" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
											</div>
											<div className="dg-fld">
												<label htmlFor="dg-ln">Nom</label>
												<input id="dg-ln" autoComplete="family-name" placeholder="Votre nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
											</div>
											<div className="dg-fld full">
												<label htmlFor="dg-em">Email professionnel</label>
												<input id="dg-em" type="email" autoComplete="email" placeholder="vous@cabinet.fr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
											</div>
											<div className="dg-fld full">
												<label htmlFor="dg-ph">Téléphone (facultatif)</label>
												<input id="dg-ph" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
											</div>
										</div>
										{error && <p className="dg-err">{error}</p>}
										<button type="submit" className="s-btn s-btn-primary" disabled={sending}>
											{sending ? "Envoi…" : "Recevoir mon plan"} <span className="arr">→</span>
										</button>
										<p className="dg-legal">
											Vos coordonnées servent uniquement à vous recontacter au sujet de ce diagnostic. Pas de newsletter, pas de revente, désinscription immédiate sur simple demande. Vos réponses au diagnostic peuvent être utilisées de façon anonymisée et agrégée à des fins d&apos;étude statistique sur la profession.
										</p>
									</form>
								</>
							)}
						</div>

						<div className="dg-secondary">
							<button type="button" className="dg-back" onClick={() => go(1)}>Refaire le diagnostic</button>
						</div>
					</div>
				</section>
			)}
		</>
	);
}
