import type { Metadata } from "next";

// Accueil « en huit mouvements », en ligne sur / jusqu'à la promotion de la
// variante V3. Conservée pour référence, hors index.
export const metadata: Metadata = {
	title: "Archive",
	robots: { index: false, follow: false },
};

export default function ArchiveAccueilV2Layout({ children }: { children: React.ReactNode }) {
	return children;
}
