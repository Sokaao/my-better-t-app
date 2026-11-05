import type { Metadata } from "next";

const DESCRIPTION =
	"Trente minutes ensemble, en visio. On part de vos outils actuels, et vous repartez avec un plan complet : vos points forts, vos points faibles, et ce qu'on relie en premier.";

export const metadata: Metadata = {
	title: "Audit de vos outils · 30 minutes",
	description: DESCRIPTION,
	alternates: {
		canonical: "/rendez-vous",
	},
	openGraph: {
		title: "Audit de vos outils · 30 minutes | Synapsis",
		description: DESCRIPTION,
		url: "/rendez-vous",
	},
};

export default function RendezVousLayout({ children }: { children: React.ReactNode }) {
	return children;
}
