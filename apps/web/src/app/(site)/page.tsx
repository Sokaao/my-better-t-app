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

export const metadata: Metadata = {
	title: { absolute: "Synapsis · Arrêtez de faire le facteur entre vos outils" },
	description:
		"Je centralise vos mails, votre fichier clients, votre agenda et vos factures. Tout se retrouve au même endroit, les relances partent au bon moment, et c'est vous qui validez.",
	alternates: { canonical: "/" },
};

// Page d'accueil portée depuis la maquette validée le 02/11/2026 (docs/REFONTE.md, § 12).
export default function HomePage() {
	return (
		<>
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
