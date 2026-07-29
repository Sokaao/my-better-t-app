"use client";

import Link from "next/link";
import type { Route } from "next";
import { Check } from "lucide-react";
import type { Stage } from "@/lib/admin-clients";
import { getProcessSteps } from "@/lib/process-steps";
import { getAutomationInfo } from "@/lib/automation-info";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type TrackerStep = { key: string; title: string; desc: string };

const STAGE_ORDER: Stage[] = ["onboarding", "cadrage", "construction", "test", "production", "suivi"];

const BUILD_PHILOSOPHY = [
	{
		num: "ÉTAPE 01",
		title: "MVP",
		desc: "On livre d'abord une première version fonctionnelle qui couvre l'essentiel de ton besoin — pas une usine à gaz, l'outil qui te fait déjà gagner du temps.",
	},
	{
		num: "ÉTAPE 02",
		title: "Amélioration continue",
		desc: "On ajuste au fil de tes retours et de l'usage réel, pas sur des suppositions. Chaque itération colle un peu plus à ta façon de travailler.",
	},
	{
		num: "ÉTAPE 03",
		title: "Produit final",
		desc: "Un système fiable, qui tourne au quotidien, taillé sur mesure pour ton activité — et qu'on continue de faire évoluer avec toi.",
	},
];

export default function ClientTracker({
	nom,
	automationType,
	urlSlug,
	stage,
	updatedAt,
}: {
	nom: string;
	automationType: string;
	urlSlug: string;
	stage: Stage;
	updatedAt: string;
}) {
	useScrollReveal();

	const processSteps = getProcessSteps(automationType);
	const steps: TrackerStep[] = [
		{ key: "paiement", title: "Paiement", desc: "Ton projet est lancé, c'est confirmé." },
		...processSteps.map((s) => ({ key: s.stage, title: s.title, desc: s.desc })),
	];

	const currentIndex = 1 + STAGE_ORDER.indexOf(stage);
	const automationInfo = getAutomationInfo(automationType);
	const current = steps[currentIndex];

	return (
		<>
			<section className="s-page-hero">
				<div className="s-wrap">
					<span className="s-eyebrow rv" style={{ justifyContent: "center" }}>
						Suivi de projet
					</span>
					<h1 className="rv rv-d1" style={{ fontSize: 30 }}>
						Bonjour {nom}, voici où en est ton projet.
					</h1>
					<p className="rv rv-d2">On avance ensemble, étape par étape. Voici l&apos;avancement en temps réel.</p>
					<p className="rv rv-d2" style={{ fontSize: 13, color: "var(--faint)" }}>
						Dernière mise à jour :{" "}
						{new Date(updatedAt).toLocaleString("fr-FR", { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })}
					</p>
				</div>
			</section>

			<section className="s-blk">
				<div className="s-wrap">
					<div className="of-stepper-scroll rv">
						<div className="of-stepper">
							{steps.map((s, i) => {
								const status = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
								return (
									<div className={`of-stepper-node is-${status}`} key={s.key}>
										<div className="of-stepper-marker">{status === "done" ? "✓" : i + 1}</div>
										<div className="of-stepper-label">{s.title}</div>
									</div>
								);
							})}
						</div>
					</div>

					{current && (
						<div className="of-tracker-current rv rv-d1">
							<span className="of-tracker-current-eyebrow">Étape en cours</span>
							<div className="of-tracker-current-top">
								<span className="of-tracker-current-num">{currentIndex + 1}</span>
								<h2>{current.title}</h2>
							</div>
							<p>{current.desc}</p>
							{current.key === "onboarding" &&
								(automationType === "setter_ia_instagram" ? (
									<div style={{ marginTop: 16 }}>
										<Link href={`/onboarding/${urlSlug}/remplir` as Route} className="s-btn s-btn-primary">
											Remplir l&apos;onboarding <span className="arr">→</span>
										</Link>
									</div>
								) : (
									<p style={{ marginTop: 12, fontSize: 13, color: "var(--faint)" }}>
										Le formulaire d&apos;onboarding est en cours de préparation pour ton automatisation — Fred te
										préviendra dès qu&apos;il est prêt.
									</p>
								))}
						</div>
					)}
				</div>
			</section>

			<section className="s-blk" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-sec-head rv">
						<span className="s-eyebrow">Ton automatisation</span>
						<h2>{automationInfo.title}</h2>
						<p>{automationInfo.description}</p>
					</div>
					{automationInfo.benefits.length > 0 && (
						<div className="s-info-strip of-benefits-strip rv rv-d1">
							{automationInfo.benefits.map((b) => (
								<div className="s-info-item" key={b}>
									<div className="s-cico">
										<Check size={18} />
									</div>
									<span>{b}</span>
								</div>
							))}
						</div>
					)}
				</div>
			</section>

			<section className="s-blk" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-sec-head rv">
						<span className="s-eyebrow">Comment on construit ton automatisation</span>
						<h2>MVP, amélioration continue, produit final</h2>
						<p>
							On n&apos;essaie pas de tout deviner à l&apos;avance. On avance par itérations courtes, avec toi, jusqu&apos;à
							un système qui te convient vraiment.
						</p>
					</div>
					<div className="s-steps rv rv-d1">
						{BUILD_PHILOSOPHY.map((p) => (
							<div className="s-step" key={p.num}>
								<div className="s-num">{p.num}</div>
								<h3>{p.title}</h3>
								<p>{p.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
