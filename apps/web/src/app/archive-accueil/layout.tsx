import type { Metadata } from "next";

// Ancienne page d'accueil, conservée pour reference. Hors index.
export const metadata: Metadata = {
	title: "Archive",
	robots: { index: false, follow: false },
};

export default function ArchiveAccueilLayout({ children }: { children: React.ReactNode }) {
	return children;
}
