import type { Metadata } from "next";

const DESCRIPTION =
	"Sept jours pour le cadrage, trois semaines pour installer, trois mois pour mesurer. Le détail de chaque étape et ce qu'elle demande à votre cabinet d'expertise comptable.";

export const metadata: Metadata = {
	title: "La méthode · Comment ça se passe",
	description: DESCRIPTION,
	alternates: {
		canonical: "/methode",
	},
	openGraph: {
		title: "La méthode · Comment ça se passe | Synapsis",
		description: DESCRIPTION,
		url: "/methode",
	},
};

export default function MethodeLayout({ children }: { children: React.ReactNode }) {
	return children;
}
