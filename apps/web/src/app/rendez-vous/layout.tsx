import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Réserver un appel de découverte gratuit",
	description: "30 minutes pour identifier vos processus chronophages et estimer le gain potentiel d'une automatisation. Gratuit, sans engagement.",
	alternates: {
		canonical: "/rendez-vous",
	},
	openGraph: {
		title: "Réserver un appel de découverte gratuit | Synapsis",
		description: "30 minutes pour identifier vos processus chronophages et estimer le gain potentiel d'une automatisation. Gratuit, sans engagement.",
		url: "/rendez-vous",
	},
};

export default function RendezVousLayout({ children }: { children: React.ReactNode }) {
	return children;
}
