"use client";

import { useState } from "react";
import type { Stage } from "@/lib/admin-clients";
import { getProcessSteps } from "@/lib/process-steps";
import { getAutomationInfo } from "@/lib/automation-info";
import SetterIaOnboardingForm from "./setter-ia-form";
import { advanceAfterOnboarding } from "@/app/onboarding/actions";

type TrackerStep = { key: string; title: string; desc: string };

const STAGE_ORDER: Stage[] = ["onboarding", "cadrage", "construction", "test", "production", "suivi"];

export default function ClientTracker({
	slug,
	nom,
	automationType,
	urlSlug,
	stage,
}: {
	slug: string;
	nom: string;
	automationType: string;
	urlSlug: string;
	stage: Stage;
}) {
	const [currentStage, setCurrentStage] = useState<Stage>(stage);
	const [showForm, setShowForm] = useState(false);

	const processSteps = getProcessSteps(automationType);
	const steps: TrackerStep[] = [
		{ key: "paiement", title: "Paiement", desc: "Ton projet est lancé, c'est confirmé." },
		...processSteps.map((s) => ({ key: s.stage, title: s.title, desc: s.desc })),
	];

	const currentIndex = 1 + STAGE_ORDER.indexOf(currentStage);
	const onboardingDone = STAGE_ORDER.indexOf(currentStage) > STAGE_ORDER.indexOf("onboarding");
	const automationInfo = getAutomationInfo(automationType);

	return (
		<section className="s-page-hero">
			<div className="s-wrap">
				<span className="s-eyebrow" style={{ justifyContent: "center" }}>
					Suivi de projet
				</span>
				<h1 style={{ fontSize: 30 }}>Bonjour {nom}, voici où en est ton projet.</h1>
				<p>On avance ensemble, étape par étape. Voici l&apos;avancement en temps réel.</p>
			</div>

			<div className="s-wrap">
				<div className="of-stepper-scroll">
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

				{steps[currentIndex] && (
					<div className="of-tracker-current">
						<span className="of-tracker-current-eyebrow">Étape en cours</span>
						<div className="of-tracker-current-top">
							<span className="of-tracker-current-num">{currentIndex + 1}</span>
							<h2>{steps[currentIndex].title}</h2>
						</div>
						<p>{steps[currentIndex].desc}</p>
						{steps[currentIndex].key === "onboarding" && (
							<div style={{ marginTop: 16 }}>
								<button type="button" className="s-btn s-btn-primary" onClick={() => setShowForm((v) => !v)}>
									{showForm ? "Masquer le formulaire" : "Remplir l'onboarding"}
								</button>
							</div>
						)}
					</div>
				)}

				{automationInfo && (
					<div className="of-automation-info">
						<span className="s-eyebrow">Ton automatisation</span>
						<h2>{automationInfo.title}</h2>
						<p>{automationInfo.description}</p>
						<ul>
							{automationInfo.benefits.map((b) => (
								<li key={b}>{b}</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{!onboardingDone && showForm && (
				<div className="s-wrap" style={{ marginTop: 24 }}>
					<SetterIaOnboardingForm
						client={slug}
						nom={nom}
						onSuccess={() => {
							setCurrentStage("cadrage");
							setShowForm(false);
							void advanceAfterOnboarding(urlSlug);
						}}
					/>
				</div>
			)}
		</section>
	);
}
