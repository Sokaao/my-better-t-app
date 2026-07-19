import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../index.css";
import Providers from "@/components/providers";

const archivo = Archivo({
	variable: "--font-archivo",
	weight: ["500", "600", "700", "800"],
	subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
	variable: "--font-ibm-plex-mono",
	weight: ["400", "500", "600"],
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-inter",
	weight: ["400", "500", "600"],
	subsets: ["latin"],
});

const siteUrl = "https://www.mysynapsis.fr";
const defaultTitle = "Synapsis — Systèmes d'automatisation sur-mesure";
const defaultDescription = "Je construis les systèmes qui font tourner votre business sans vous : prospection, relances, devis, reporting automatisés avec n8n, API et agents IA.";

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

const professionalServiceLd = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "Synapsis",
	url: siteUrl,
	image: `${siteUrl}/opengraph-image`,
	telephone: "+33754083258",
	email: "contact@mysynapsis.fr",
	address: {
		"@type": "PostalAddress",
		streetAddress: "1 Impasse des frênes",
		postalCode: "15260",
		addressLocality: "Neuvéglise-sur-Truyère",
		addressCountry: "FR",
	},
	areaServed: "FR",
	priceRange: "900€–4000€",
	founder: {
		"@type": "Person",
		name: "Frédéric Mallet",
	},
	sameAs: [
		"https://www.linkedin.com/in/frédéric-mallet-526426397/",
		"https://www.instagram.com/synaps_is/",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" suppressHydrationWarning className="scroll-smooth">
			<body
				className={`${archivo.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }}
				/>
				<Providers>
					{children}
				</Providers>
				<Analytics />
			</body>
		</html>
	);
}
