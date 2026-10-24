"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Timer, UserX } from "lucide-react";

// Transposition de « l'extraction chiffree » de l'audit : on n'avance aucun
// chiffre a la place du prospect, il fournit les siens et on ne fait que poser
// la multiplication. Rien ici n'affirme un resultat obtenu par le setter IA.
//
// Forme retenue : emphase (une teinte + un neutre). Le temps perdu est le
// propos, le temps utile n'est que du contexte — les peindre tous les deux
// donnerait le meme poids a l'un et a l'autre.

function formatHeures(heures: number): string {
	const h = Math.floor(heures);
	const m = Math.round((heures - h) * 60);
	if (m === 60) return `${h + 1} h`;
	if (m === 0) return `${h} h`;
	return `${h} h ${String(m).padStart(2, "0")}`;
}

// Compteur anime : part de la valeur courante vers la nouvelle, en ~0,5 s.
// Neutralise si le visiteur a demande la reduction des animations.
function useCompteur(cible: number, actif: boolean): number {
	const [valeur, setValeur] = useState(cible);
	const courant = useRef(cible);

	useEffect(() => {
		if (!actif) {
			courant.current = cible;
			setValeur(cible);
			return;
		}
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			courant.current = cible;
			setValeur(cible);
			return;
		}

		const depart = courant.current;
		const t0 = performance.now();
		const duree = 520;
		let raf = 0;

		const tick = (t: number) => {
			const p = Math.min((t - t0) / duree, 1);
			const e = 1 - Math.pow(1 - p, 3);
			const v = depart + (cible - depart) * e;
			courant.current = v;
			setValeur(v);
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [cible, actif]);

	return valeur;
}

const CHAMPS = [
	{
		id: "calc-dm",
		icone: MessageCircle,
		label: "DM reçus par jour",
		aide: "week-end compris",
		min: 5,
		max: 80,
		pas: 5,
		unite: "",
	},
	{
		id: "calc-min",
		icone: Timer,
		label: "Minutes par échange",
		aide: "lecture, réponse, relance",
		min: 1,
		max: 12,
		pas: 1,
		unite: " min",
	},
	{
		id: "calc-part",
		icone: UserX,
		label: "Part qui n'achètera jamais",
		aide: "au doigt mouillé, sois honnête",
		min: 10,
		max: 95,
		pas: 5,
		unite: " %",
	},
] as const;

export default function DmCalculator() {
	const ref = useRef<HTMLDivElement>(null);
	const [demarre, setDemarre] = useState(false);
	const [valeurs, setValeurs] = useState<[number, number, number]>([25, 4, 70]);
	const [dmParJour, minutesParEchange, partPerdue] = valeurs;

	// Le compte a rebours ne part qu'une fois le bloc a l'ecran, sinon
	// l'animation se joue pendant que le visiteur est encore en haut de page.
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						setDemarre(true);
						io.unobserve(e.target);
					}
				}
			},
			{ threshold: 0.3 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	const heuresParSemaine = (dmParJour * minutesParEchange * 7) / 60;
	const heuresPerdues = heuresParSemaine * (partPerdue / 100);
	const heuresUtiles = heuresParSemaine - heuresPerdues;
	const joursParAn = (heuresPerdues * 52) / 7;

	const animPerdues = useCompteur(heuresPerdues, demarre);
	const animTotal = useCompteur(heuresParSemaine, demarre);
	const animJours = useCompteur(joursParAn, demarre);

	function majValeur(i: number, v: number) {
		setValeurs((prev) => {
			const suite = [...prev] as [number, number, number];
			suite[i] = v;
			return suite;
		});
	}

	return (
		<div className="st-calc" ref={ref}>
			<div className="st-calc-in">
				{CHAMPS.map((c, i) => {
					const Icone = c.icone;
					const v = valeurs[i] ?? c.min;
					const remplissage = ((v - c.min) / (c.max - c.min)) * 100;
					return (
						<div className="st-calc-field" key={c.id}>
							<label htmlFor={c.id}>
								<Icone size={15} />
								<b className="val">
									{v}
									{c.unite}
								</b>
								<span className="k">{c.label}</span>
							</label>
							<span className="aide">{c.aide}</span>
							<input
								id={c.id}
								type="range"
								min={c.min}
								max={c.max}
								step={c.pas}
								value={v}
								style={{ "--fill": `${remplissage}%` } as React.CSSProperties}
								onChange={(e) => majValeur(i, Number(e.target.value))}
							/>
						</div>
					);
				})}
			</div>

			<div className="st-calc-out" aria-live="polite">
				<p className="big">
					Tu passes <em>{formatHeures(animPerdues)} par semaine</em> à qualifier des
					gens qui n&apos;achèteront pas.
				</p>

				{/* Part-a-tout : le temps perdu en teinte, le reste en neutre.
				    2 px de fond entre les segments, et aucun texte a l'interieur —
				    un label pose dans un segment trop court finit coupe. */}
				<div
					className="st-bar"
					role="img"
					aria-label={`Sur ${formatHeures(heuresParSemaine)} passées en DM chaque semaine, ${formatHeures(heuresPerdues)} le sont avec des prospects qui n'achèteront pas.`}
				>
					<div className="perdu" style={{ width: `${partPerdue}%` }} />
					<div className="utile" style={{ width: `${100 - partPerdue}%` }} />
				</div>

				<div className="st-legend">
					<span className="item fort">
						<i className="sw perdu" />
						<span className="k">Temps perdu</span>
						<b>{formatHeures(heuresPerdues)}</b>
						<span className="pct">{partPerdue} %</span>
					</span>
					<span className="item">
						<i className="sw utile" />
						<span className="k">Temps utile</span>
						<b>{formatHeures(heuresUtiles)}</b>
					</span>
				</div>

				<div className="st-tiles">
					<div className="tile">
						<span className="n">{formatHeures(animTotal)}</span>
						<span className="l">
							par semaine dans tes DM,
							<br />
							tous prospects confondus
						</span>
					</div>
					<div className="tile">
						<span className="n">{Math.round(animJours)}</span>
						<span className="l">
							journées de 7 h par an,
							<br />
							passées à écarter
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
