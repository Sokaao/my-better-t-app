"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

// Bloc du hero : la logique de qualification qui tourne, sur trois cas types.
// On ne simule pas du trafic reel et on n'affiche aucun compteur d'activite —
// ce sont les trois sorties possibles du prompt, jouees l'une apres l'autre.

type Verdict = "ecarte" | "attente" | "ok";

type Scenario = {
	dm: string;
	checks: { l: string; ok: boolean }[];
	verdict: string;
	ton: Verdict;
};

const SCENARIOS: Scenario[] = [
	{
		dm: "Salut, je veux bien le guide !",
		checks: [
			{ l: "activité déjà lancée", ok: true },
			{ l: "besoin = ton offre", ok: true },
			{ l: "budget dans la cible", ok: false },
		],
		verdict: "écarté, poliment",
		ton: "ecarte",
	},
	{
		dm: "Hello, tu peux m'envoyer la ressource ?",
		checks: [
			{ l: "activité déjà lancée", ok: true },
			{ l: "besoin = ton offre", ok: true },
			{ l: "prêt à démarrer", ok: false },
		],
		verdict: "gardé au chaud, relancé plus tard",
		ton: "attente",
	},
	{
		dm: "Salut ! Je veux la checklist stp",
		checks: [
			{ l: "activité déjà lancée", ok: true },
			{ l: "besoin = ton offre", ok: true },
			{ l: "prêt à démarrer", ok: true },
		],
		verdict: "créneau proposé → rendez-vous réservé",
		ton: "ok",
	},
];

// Rythme d'un cycle : le DM, puis les trois controles, puis le verdict, puis
// un temps de lecture avant de passer au cas suivant.
const T_DM = 520;
const T_CHECK = 460;
const T_VERDICT = 520;
const T_LECTURE = 2100;

export default function QualifLoop() {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);
	const [statique, setStatique] = useState(false);
	const [scenario, setScenario] = useState(0);
	const [etape, setEtape] = useState(0); // 0 rien · 1 dm · 2..4 checks · 5 verdict

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setStatique(true);
			setScenario(2);
			setEtape(5);
		}
	}, []);

	// La boucle ne tourne que quand le bloc est a l'ecran.
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) setVisible(e.isIntersecting);
			},
			{ threshold: 0.2 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		if (statique || !visible) return;

		if (etape < 5) {
			const d = etape === 0 ? T_DM : etape < 4 ? T_CHECK : T_VERDICT;
			const t = setTimeout(() => setEtape((e) => e + 1), d);
			return () => clearTimeout(t);
		}

		const t = setTimeout(() => {
			setEtape(0);
			setScenario((s) => (s + 1) % SCENARIOS.length);
		}, T_LECTURE);
		return () => clearTimeout(t);
	}, [statique, visible, etape, scenario]);

	const s = SCENARIOS[scenario] ?? SCENARIOS[0];
	if (!s) return null;

	return (
		<div className="st-term st-qualif" ref={ref}>
			<div className="st-term-bar">
				<span className="d r" />
				<span className="d y" />
				<span className="d g" />
				<span className="fname">qualification.rules</span>
				<span className="st-term-status">
					<span className="led" /> ACTIF
				</span>
			</div>

			<div className="st-qualif-body">
				<div className={`ql-dm${etape >= 1 ? " show" : ""}`}>
					<div className="haut">
						<span className="tag">Demande de ressource</span>
						<span className="txt">{s.dm}</span>
					</div>
					<span className="suite">
						↳ ressource envoyée, puis la conversation s&apos;engage
					</span>
				</div>

				<div className="ql-checks">
					{s.checks.map((c, i) => (
						<div
							className={`ql-check${etape >= i + 2 ? " show" : ""}${
								c.ok ? " oui" : " non"
							}`}
							key={`${scenario}-${c.l}`}
						>
							<span className="ico">
								{c.ok ? <Check size={12} /> : <X size={12} />}
							</span>
							<span className="l">{c.l}</span>
							<span className="r">{c.ok ? "oui" : "non"}</span>
						</div>
					))}
				</div>

				<div className={`ql-verdict ${s.ton}${etape >= 5 ? " show" : ""}`}>
					<span className="fl">→</span>
					<span className="v">{s.verdict}</span>
				</div>

				<div className="ql-dots" aria-hidden="true">
					{SCENARIOS.map((sc, i) => (
						<span key={sc.verdict} className={i === scenario ? "on" : ""} />
					))}
				</div>
			</div>
		</div>
	);
}
