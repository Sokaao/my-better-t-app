import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/components/seo/schemas";

const DESCRIPTION =
	"30 minutes en visio, à partir de vos outils actuels. Vous repartez avec un plan complet : vos points forts, vos points faibles et ce qu'on relie en premier.";

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
	return (
		<>
			<JsonLd data={graph(breadcrumbLd("Audit de vos outils", "/rendez-vous"))} />
			{children}
		</>
	);
}
