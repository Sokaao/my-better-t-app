import type { Metadata } from "next";
import SiteFooterMinimal from "@/components/site-footer-minimal";
import DiagnosticForm from "@/components/diagnostic/diagnostic-form";

export const metadata: Metadata = {
	title: "Diagnostic · Ce que votre cabinet perd à ne pas automatiser",
	description:
		"Six questions, deux minutes : combien d'heures votre cabinet d'expertise comptable récupère, ce que ça vaut en chiffre d'affaires, et par quelle automatisation commencer. Résultat immédiat, sans email.",
	alternates: { canonical: "/diagnostic" },
	openGraph: {
		title: "Diagnostic automatisation pour cabinets d'expertise comptable | Synapsis",
		description:
			"Six questions, deux minutes. Vos heures récupérées, votre chiffre d'affaires potentiel, et par quoi commencer. Sans email pour voir le résultat.",
		url: "/diagnostic",
	},
};

export default function DiagnosticPage() {
	return (
		<div className="dg-page">
			{/* Pas de navigation ici : la page reçoit du trafic payant, chaque lien
			    sortant est une fuite. Le logo vit dans la barre de progression. */}
			<main>
				<DiagnosticForm />
			</main>
			<SiteFooterMinimal />
		</div>
	);
}
