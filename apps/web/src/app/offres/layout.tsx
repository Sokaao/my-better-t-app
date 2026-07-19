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

const servicesLd = {
	"@context": "https://schema.org",
	"@type": "Service",
	serviceType: "Automatisation de processus métier (n8n, API, agents IA)",
	provider: {
		"@type": "ProfessionalService",
		name: "Synapsis",
		url: "https://www.mysynapsis.fr",
	},
	areaServed: "FR",
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Offres Synapsis",
		itemListElement: [
			{
				"@type": "Offer",
				name: "Zéro Relance Manuelle",
				price: "900",
				priceCurrency: "EUR",
				description: "Une automatisation déployée au choix (relances devis, rappels RDV ou facturation récurrente), livrée en 7 jours.",
				url: "https://www.mysynapsis.fr/offres",
			},
			{
				"@type": "Offer",
				name: "Pilote Automatique",
				price: "2200",
				priceCurrency: "EUR",
				description: "3 automatisations au choix intégrées à vos outils existants, livrées en 14 jours ouvrés.",
				url: "https://www.mysynapsis.fr/offres",
			},
			{
				"@type": "Offer",
				name: "Transformation Complète",
				price: "4000",
				priceCurrency: "EUR",
				description: "5 automatisations clés, agents IA sur-mesure et 3 mois d'accompagnement inclus.",
				url: "https://www.mysynapsis.fr/offres",
			},
		],
	},
};

export default function OffresLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
			/>
			{children}
		</>
	);
}
