import type { Metadata } from "next";
import DiagnosticClient from "@/components/diagnostic26/DiagnosticClient";
import DiagnosticMarkup from "@/components/diagnostic26/DiagnosticMarkup";
import { fontVariables } from "@/components/site2026/fonts";
import "@/styles/diagnostic2026.css";

export const metadata: Metadata = {
	title: "Diagnostic gratuit · Où se perd l'information entre vos outils ?",
	description:
		"Choisissez votre métier et vos outils, répondez à 8 questions : votre indice de connexion, la carte de vos outils et votre premier blocage, sans e-mail.",
	alternates: { canonical: "/diagnostic" },
	openGraph: {
		title: "Diagnostic gratuit · Où se perd l'information entre vos outils ? | Synapsis",
		description: "8 questions pensées pour votre métier. Votre indice de connexion, la carte de vos outils et votre premier blocage, tout de suite.",
		url: "/diagnostic",
	},
};

// Diagnostic par métier, porté depuis la maquette validée le 05/11/2026 (docs/REFONTE.md, § 12).
// Pas de navigation : le logo ramène à l'accueil, la barre de progression tient lieu d'en-tête.
export default function DiagnosticPage() {
	return (
		<div className={`d26 ${fontVariables}`}>
			<DiagnosticMarkup />
			<DiagnosticClient />
		</div>
	);
}
