import { STAGES, type Stage } from "./admin-clients";

export type ProcessStep = { stage: Stage; title: string; desc: string };

// Contenu du process affiché sur la page de suivi du client, par type d'automatisation.
// Un seul type actif aujourd'hui : en ajouter un nouveau ici suffit à le rendre disponible
// depuis le menu déroulant de /admin/clients/new.
export const PROCESS_STEPS: Record<string, ProcessStep[]> = {
	setter_ia_instagram: [
		{
			stage: "onboarding",
			title: "Onboarding",
			desc: "Tu remplis le formulaire ci-dessus : accès techniques, contenu, vos informations réelles. Chiffré, envoyé en un clic.",
		},
		{
			stage: "cadrage",
			title: "Cadrage",
			desc: "Fred relit tout et revient vers toi sous 48h si un point manque ou mérite d'être précisé avant de commencer à construire.",
		},
		{
			stage: "construction",
			title: "Construction",
			desc: "Fred monte le système dans son infrastructure d'automatisation. Tu n'as rien à installer ni à configurer de ton côté.",
		},
		{
			stage: "test",
			title: "Test & validation",
			desc: "Tu reçois un accès de test avant toute mise en production. Rien ne part en conditions réelles sans ta validation.",
		},
		{
			stage: "production",
			title: "Mise en production",
			desc: "Le système tourne. Premiers résultats mesurables : c'est le début du suivi, pas la fin du projet.",
		},
		{
			stage: "suivi",
			title: "Suivi & ajustements",
			desc: "Point mensuel, ajustements et nouvelles briques selon l'évolution de ton activité.",
		},
	],
};

export function getProcessSteps(automationType: string): ProcessStep[] {
	return PROCESS_STEPS[automationType] ?? STAGES.map((stage) => ({ stage, title: stage, desc: "" }));
}
