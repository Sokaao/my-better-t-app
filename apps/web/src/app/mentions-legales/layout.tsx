import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/components/seo/schemas";

export const metadata: Metadata = {
	title: "Mentions Légales",
	description: "Mentions légales du site Synapsis : éditeur (Frédéric Mallet, entreprise individuelle), hébergement, propriété intellectuelle et données personnelles.",
	alternates: {
		canonical: "/mentions-legales",
	},
};

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<JsonLd data={graph(breadcrumbLd("Mentions légales", "/mentions-legales"))} />
			{children}
		</>
	);
}
