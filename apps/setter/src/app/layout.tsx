import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../index.css";
import { SITE_URL } from "@/lib/config";

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

// Syne n'est pas charge sur mysynapsis.fr (le wordmark y est en Archivo), mais
// la charte le donne comme police du logo. Ici il ne sert qu'au wordmark.
const syne = Syne({
	variable: "--font-syne",
	weight: ["700"],
	subsets: ["latin"],
});

const title = "Setter IA Instagram · qualifie tes DM à ta place | Synapsis";
const description =
	"Un setter IA qui répond à tes DM Instagram, qualifie chaque prospect sur tes critères et ne te passe que ceux qui sont prêts. Setup 1 500 €, 100 €/mois, satisfait ou remboursé 30 jours.";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title,
	description,
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		locale: "fr_FR",
		siteName: "Synapsis",
		title,
		description,
		url: SITE_URL,
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
	},
};

const serviceLd = {
	"@context": "https://schema.org",
	"@type": "Service",
	name: "Setter IA Instagram",
	serviceType: "Automatisation de la qualification des prospects en DM Instagram",
	provider: {
		"@type": "ProfessionalService",
		name: "Synapsis",
		url: "https://www.mysynapsis.fr",
		email: "contact@mysynapsis.fr",
		founder: { "@type": "Person", name: "Frédéric Mallet" },
	},
	areaServed: "FR",
	url: SITE_URL,
	offers: {
		"@type": "Offer",
		price: "1500",
		priceCurrency: "EUR",
		description:
			"Setup 1 500 € (acompte de 750 € à la commande) puis 100 €/mois de maintenance.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr" className="scroll-smooth">
			<body
				className={`${archivo.variable} ${ibmPlexMono.variable} ${inter.variable} ${syne.variable} antialiased`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
				/>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
