export type AutomationInfo = { title: string; description: string; benefits: string[] };

// Présenté au client sur sa page de suivi, sous le tracker — lui rappelle ce que fait
// concrètement son automatisation et ce qu'elle lui fait gagner.
export const AUTOMATION_INFO: Record<string, AutomationInfo> = {
	setter_ia_instagram: {
		title: "Setter IA Instagram",
		description:
			"Un agent IA qui répond à tes prospects en DM Instagram, qualifie leur besoin et prend rendez-vous à ta place — 24h/24, sans que tu aies à taper un seul message.",
		benefits: [
			"Zéro message manqué, même la nuit ou le week-end",
			"Chaque lead est qualifié avant d'atterrir dans ton agenda",
			"Un ton et des réponses calibrés sur ta marque",
			"Tu gardes la main : reprendre la conversation à tout moment",
		],
	},
};

// Affiché quand aucun contenu spécifique n'existe encore pour ce type d'automatisation —
// évite de laisser la section "Ton automatisation" vide sur la page de suivi du client.
const DEFAULT_AUTOMATION_INFO: AutomationInfo = {
	title: "Ton automatisation",
	description: "Fred configure encore le détail de ton automatisation. Cette section sera complétée très bientôt.",
	benefits: [],
};

export function getAutomationInfo(automationType: string): AutomationInfo {
	return AUTOMATION_INFO[automationType] ?? DEFAULT_AUTOMATION_INFO;
}
