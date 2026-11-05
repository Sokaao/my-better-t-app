import { Figtree, Urbanist } from "next/font/google";

// Urbanist pour les titres, Figtree pour le texte (docs/REFONTE.md, § 11 b).
// Les variables exposées ici sont lues par packages/brand/synapsis-2026.css (--font-display / --font-body).
const display = Urbanist({
	variable: "--font-urbanist",
	weight: ["600", "700", "800"],
	subsets: ["latin"],
});

const body = Figtree({
	variable: "--font-figtree",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const fontVariables = `${display.variable} ${body.variable}`;
