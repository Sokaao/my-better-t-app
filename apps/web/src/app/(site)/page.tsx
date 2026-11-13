import type { Metadata } from "next";
import Assistant from "@/components/site2026/home/Assistant";
import Douleurs from "@/components/site2026/home/Douleurs";
import Faq from "@/components/site2026/home/Faq";
import Fiche from "@/components/site2026/home/Fiche";
import Fil from "@/components/site2026/home/Fil";
import Final from "@/components/site2026/home/Final";
import Hero from "@/components/site2026/home/Hero";
import HomeClient from "@/components/site2026/home/HomeClient";
import Moi from "@/components/site2026/home/Moi";
import Pilotage from "@/components/site2026/home/Pilotage";
import Process from "@/components/site2026/home/Process";
import { HOME_FAQ } from "@/components/site2026/home/faq-data";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageLd, graph } from "@/components/seo/schemas";

export const metadata: Metadata = {
	// Titre et description pour Google (choisis par Fred le 10/11/2026) : l'expression recherchée en tête,
	// reprise du grand titre de la page (Google réécrit moins un titre proche du H1), marque à la fin, moins de 60 caractères.
	title: { absolute: "Automatisation PME : arrêtez de faire le facteur | Synapsis" },
	description:
		"Automatisez les relances et reliez vos outils (mails, fichier clients, agenda, factures). Pour les PME : tout au même endroit, et c'est vous qui validez.",
	alternates: { canonical: "/" },
};

// Page d'accueil portée depuis la maquette validée le 02/11/2026 (docs/REFONTE.md, § 12).
export default function HomePage() {
	return (
		<>
			<JsonLd data={graph(faqPageLd("/", HOME_FAQ))} />
			<Hero />
			<Douleurs />
			<Fil />
			<Fiche />
			<Pilotage />
			<Assistant />
			<Moi />
			<Process />
			<Faq />
			<Final />
			<HomeClient />
		</>
	);
}
