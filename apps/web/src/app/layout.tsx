import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../index.css";
import "@/styles/fonts.css";
import Providers from "@/components/providers";
import JsonLd from "@/components/seo/JsonLd";
import { graph } from "@/components/seo/schemas";
import { CONTACT, SITE_URL } from "@/lib/contact";

// Polices : embarquées dans le site (src/styles/fonts.css), plus téléchargées à la construction.

const siteUrl = SITE_URL;
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

// Données structurées globales (un seul @graph), lues par Google et les moteurs d'IA.
// Toutes les URL sont sous www : mysynapsis.fr redirige en 308 vers www.mysynapsis.fr.
// Volontairement absents : adresse postale (masquée sur la fiche Google), priceRange, avis et notes
// (aucun avis affiché sur le site).
const orgId = `${SITE_URL}/#organization`;

const globalLd = graph(
	{
		"@type": "Organization",
		"@id": orgId,
		name: "Synapsis",
		alternateName: "mysynapsis.fr",
		url: SITE_URL,
		image: `${SITE_URL}/opengraph-image`,
		logo: {
			"@type": "ImageObject",
			url: `${SITE_URL}/logo-synapsis-512.png`,
			width: 512,
			height: 512,
		},
		founder: {
			"@type": "Person",
			name: "Frédéric Mallet",
			sameAs: ["https://www.linkedin.com/in/mysynapsis"],
		},
		email: CONTACT.email,
		telephone: CONTACT.phoneE164,
		sameAs: [
			"https://g.page/r/CbHQBwt64zZHEBM",
			"https://www.pagesjaunes.fr/pros/65627804",
			"https://www.malt.fr/profile/fredericmallet",
			"https://www.linkedin.com/company/116059554/",
		],
	},
	{
		// Zone desservie alignée sur la fiche Google Business Profile.
		"@type": "ProfessionalService",
		"@id": `${SITE_URL}/#service`,
		name: "Synapsis",
		parentOrganization: { "@id": orgId },
		url: SITE_URL,
		image: `${SITE_URL}/opengraph-image`,
		telephone: CONTACT.phoneE164,
		email: CONTACT.email,
		description: "Je centralise vos mails, votre fichier clients, votre agenda et vos factures.",
		areaServed: [
			{ "@type": "City", name: "Nîmes" },
			{ "@type": "City", name: "Montpellier" },
			{ "@type": "AdministrativeArea", name: "Gard" },
			{ "@type": "AdministrativeArea", name: "Hérault" },
			{ "@type": "AdministrativeArea", name: "Occitanie" },
			{ "@type": "Country", name: "France" },
		],
	},
	{
		// Nom du site affiché par Google au-dessus du titre dans les résultats.
		"@type": "WebSite",
		"@id": `${SITE_URL}/#website`,
		url: `${SITE_URL}/`,
		name: "Synapsis",
		inLanguage: "fr-FR",
		publisher: { "@id": orgId },
	},
);

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
				<JsonLd data={globalLd} />
				<Providers>
					{children}
				</Providers>
				<Analytics />
			</body>
		</html>
	);
}
