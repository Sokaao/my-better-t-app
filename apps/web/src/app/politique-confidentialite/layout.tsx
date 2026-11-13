import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/components/seo/schemas";

export const metadata: Metadata = {
	title: "Politique de Confidentialité",
	description: "Comment Synapsis collecte, utilise et protège vos données personnelles, conformément au RGPD.",
	alternates: {
		canonical: "/politique-confidentialite",
	},
};

export default function PolitiqueConfidentialiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<JsonLd data={graph(breadcrumbLd("Politique de confidentialité", "/politique-confidentialite"))} />
			{children}
		</>
	);
}
