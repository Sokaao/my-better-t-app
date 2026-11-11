import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../index.css";
import "@/styles/fonts.css";
import Providers from "@/components/providers";

// Polices : embarquées dans le site (src/styles/fonts.css), plus téléchargées à la construction.

const siteUrl = "https://www.mysynapsis.fr";
const defaultTitle = "Synapsis · Arrêtez de faire le facteur entre vos outils";
const defaultDescription = "Je centralise les outils des PME de 5 à 49 salariés autour d'un point central : la fiche client et le pilotage. Les relances partent au bon moment, et c'est vous qui validez.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: defaultTitle,
		template: "%s | Synapsis",
	},
	description: defaultDescription,
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "fr_FR",
		siteName: "Synapsis",
		title: defaultTitle,
		description: defaultDescription,
		url: siteUrl,
	},
	twitter: {
		card: "summary_large_image",
		title: defaultTitle,
		description: defaultDescription,
	},
};

// Données structurées lues par Google et les moteurs d'IA. Zone desservie alignée sur la fiche
// Google Business Profile (11/11/2026) : Sud de la France en priorité, le reste de la France à distance.
// L'adresse reste celle du siège (mentions légales) ; elle est masquée sur la fiche Google.
const professionalServiceLd = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	"@id": `${siteUrl}/#entreprise`,
	name: "Synapsis",
	description:
		"Automatisation pour PME : je relie vos mails, votre fichier clients, votre agenda et vos factures autour d'une seule fiche client. Les relances partent au bon moment, et c'est vous qui validez.",
	url: siteUrl,
	image: `${siteUrl}/opengraph-image`,
	telephone: "+33759951051",
	email: "contact@mysynapsis.fr",
	address: {
		"@type": "PostalAddress",
		streetAddress: "1 Impasse des frênes",
		postalCode: "15260",
		addressLocality: "Neuvéglise-sur-Truyère",
		addressCountry: "FR",
	},
	areaServed: [
		{ "@type": "AdministrativeArea", name: "Occitanie" },
		{ "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
		{ "@type": "City", name: "Nîmes" },
		{ "@type": "City", name: "Montpellier" },
		{ "@type": "City", name: "Avignon" },
		{ "@type": "City", name: "Marseille" },
		{ "@type": "Country", name: "France" },
	],
	knowsAbout: ["Automatisation pour PME", "Relances clients automatiques", "Connexion d'outils métier", "n8n", "Assistant IA"],
	founder: {
		"@type": "Person",
		name: "Frédéric Mallet",
		sameAs: ["https://www.linkedin.com/in/mysynapsis/"],
	},
	// Profils officiels de l'entreprise (page LinkedIn complétée le 11/11/2026)
	sameAs: [
		"https://www.linkedin.com/company/mysynapsis/",
		"https://www.instagram.com/synaps_is/",
	],
};

// Nom du site affiché par Google au-dessus du titre dans les résultats
const websiteLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Synapsis",
	alternateName: "mysynapsis",
	url: `${siteUrl}/`,
	publisher: { "@id": `${siteUrl}/#entreprise` },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" suppressHydrationWarning className="scroll-smooth">
			<body
				className="antialiased"
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
				/>
				<Providers>
					{children}
				</Providers>
				<Analytics />
			</body>
		</html>
	);
}
