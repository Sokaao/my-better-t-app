"use client";

import { useState } from "react";
import type { Stage } from "@/lib/admin-clients";
import { getProcessSteps } from "@/lib/process-steps";
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

	return (
		<section className="s-page-hero">
			<div className="s-wrap" style={{ maxWidth: 720 }}>
				<span className="s-eyebrow" style={{ justifyContent: "center" }}>
					Suivi de projet
				</span>
				<h1 style={{ fontSize: 30 }}>
					Bonjour {nom}, voici où en est ton projet.
				</h1>
				<p>On avance ensemble, étape par étape. Voici l&apos;avancement en temps réel.</p>
			</div>

			<div className="s-wrap" style={{ maxWidth: 720 }}>
				<div className="of-tracker">
					{steps.map((s, i) => {
						const status = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
						const isOnboardingStep = s.key === "onboarding";
						return (
							<div className={`of-tracker-step is-${status}`} key={s.key}>
								<div className="of-tracker-marker">{status === "done" ? "✓" : i + 1}</div>
								<div className="of-tracker-content">
									<h3>{s.title}</h3>
									<p>{s.desc}</p>
									{isOnboardingStep && status !== "upcoming" && (
										<div style={{ marginTop: 12 }}>
											{onboardingDone ? (
												<span className="of-tracker-badge">Onboarding reçu ✓</span>
											) : (
												<button
													type="button"
													className="s-btn s-btn-primary"
													onClick={() => setShowForm((v) => !v)}
												>
													{showForm ? "Masquer le formulaire" : "Remplir l'onboarding"}
												</button>
											)}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{!onboardingDone && showForm && (
				<div className="s-wrap" style={{ maxWidth: 720, marginTop: 24 }}>
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
