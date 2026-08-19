import type { Metadata } from "next";
import { faqs } from "./faqs";

const DESCRIPTION =
	"Vos dossiers complets au 10 du mois, sans qu'un collaborateur relance à la main. Cadrage 600 €, installation à partir de 4 500 €, remboursé si le temps de relance ne baisse pas.";

export const metadata: Metadata = {
	title: "L'offre · Zéro Pièce Manquante",
	description: DESCRIPTION,
	alternates: {
		canonical: "/offres",
	},
	openGraph: {
		title: "L'offre · Zéro Pièce Manquante | Synapsis",
		description: DESCRIPTION,
		url: "/offres",
	},
};

// Les dix questions de la page, republiées en FAQPage : ce sont les mêmes objets que
// ceux affichés, donc l'un ne peut pas dériver de l'autre.
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

// L'offre se vend en deux temps : le cadrage à prix fixe, puis l'installation
// chiffrée dans le plan du cadrage. Les données structurées disent exactement ça.
const serviceLd = {
	"@context": "https://schema.org",
	"@type": "Service",
	name: "Zéro Pièce Manquante",
	serviceType:
		"Collecte et relance automatisées des pièces comptables pour cabinets d'expertise comptable",
	provider: {
		"@type": "ProfessionalService",
		name: "Synapsis",
		url: "https://www.mysynapsis.fr",
	},
	areaServed: "FR",
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Zéro Pièce Manquante",
		itemListElement: [
			{
				"@type": "Offer",
				name: "Le cadrage",
				price: "600",
				priceCurrency: "EUR",
				description:
					"Relevé d'une semaine, analyse, périmètre technique et plan chiffré, livrés en sept jours. Facturé à la livraison, déduit du projet si vous continuez.",
				url: "https://www.mysynapsis.fr/offres",
			},
			{
				"@type": "Offer",
				name: "L'installation",
				priceCurrency: "EUR",
				priceSpecification: {
					"@type": "PriceSpecification",
					minPrice: "4500",
					priceCurrency: "EUR",
				},
				description:
					"Système de collecte et de relance installé sur votre compte, marche à blanc de deux semaines et garantie de résultat mesurée à J+90.",
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
				dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
			/>
			{children}
		</>
	);
}
