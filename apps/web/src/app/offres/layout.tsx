import type { Metadata } from "next";
import { faqs } from "./faqs";

export const metadata: Metadata = {
	title: "Offres & Tarifs — Automatisation dès 900€",
	description: "3 offres packagées pour automatiser vos relances, devis et facturation avec n8n, dès 900€ en paiement unique. Garantie remboursement intégral.",
	alternates: {
		canonical: "/offres",
	},
	openGraph: {
		title: "Offres & Tarifs — Automatisation dès 900€ | Synapsis",
		description: "3 offres packagées pour automatiser vos relances, devis et facturation avec n8n, dès 900€ en paiement unique. Garantie remboursement intégral.",
		url: "/offres",
	},
};

const faqPageLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((item) => ({
		"@type": "Question",
		name: item.q,
		acceptedAnswer: {
			"@type": "Answer",
			text: item.a,
		},
	})),
};

export default function OffresLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
			/>
			{children}
		</>
	);
}
