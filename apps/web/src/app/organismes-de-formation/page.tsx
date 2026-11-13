import type { Metadata } from "next";
import NichePage from "@/components/site2026/niche/NichePage";
import { FORMATION } from "./content";

export const metadata: Metadata = {
	title: { absolute: FORMATION.title },
	description: FORMATION.description,
	alternates: { canonical: "/organismes-de-formation" },
	openGraph: { title: FORMATION.title, description: FORMATION.description, url: "/organismes-de-formation" },
};

export default function OrganismesDeFormationPage() {
	return <NichePage content={FORMATION} />;
}
