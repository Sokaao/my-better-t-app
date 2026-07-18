import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Politique de Confidentialité",
	description: "Comment Synapsis collecte, utilise et protège vos données personnelles, conformément au RGPD.",
	alternates: {
		canonical: "/politique-confidentialite",
	},
};

export default function PolitiqueConfidentialiteLayout({ children }: { children: React.ReactNode }) {
	return children;
}
