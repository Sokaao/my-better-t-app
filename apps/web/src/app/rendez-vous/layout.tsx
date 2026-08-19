import type { Metadata } from "next";

const DESCRIPTION =
	"Trente minutes pour regarder vos outils, votre portefeuille et ce que vous avez déjà tenté. Je vous dis franchement si l'automatisation est la bonne réponse pour votre cabinet.";

export const metadata: Metadata = {
	title: "Rendez-vous · Trente minutes",
	description: DESCRIPTION,
	alternates: {
		canonical: "/rendez-vous",
	},
	openGraph: {
		title: "Rendez-vous · Trente minutes | Synapsis",
		description: DESCRIPTION,
		url: "/rendez-vous",
	},
};

export default function RendezVousLayout({ children }: { children: React.ReactNode }) {
	return children;
}
