// Accès serveur uniquement (clé service_role), n'importer ce module que depuis des
// Server Components ou Server Actions, jamais depuis un composant client.

import { randomBytes } from "crypto";
import { supabaseAdmin } from "./supabase-admin";

export const STAGES = ["onboarding", "cadrage", "construction", "test", "production", "suivi"] as const;
export type Stage = (typeof STAGES)[number];

export const STAGE_LABELS: Record<Stage, string> = {
	onboarding: "Onboarding",
	cadrage: "Cadrage",
	construction: "Construction",
	test: "Test & validation",
	production: "Mise en production",
	suivi: "Suivi",
};

export type ClientRow = {
	id: string;
	slug: string;
	url_slug: string;
	nom: string;
	automation_type: string;
	notes: string;
	email: string | null;
	stage: Stage;
	onboarding_submitted_at: string | null;
	created_at: string;
	updated_at: string;
	last_submission: unknown;
};

export async function fetchClients(): Promise<ClientRow[]> {
	const { data, error } = await supabaseAdmin()
		.from("clients")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
}

// Utilisé pour retrouver le client depuis l'URL publique /onboarding/[urlSlug] :
// urlSlug est non-devinable (slug + suffixe aléatoire), à la différence de slug (nom propre).
export async function fetchClientByUrlSlug(urlSlug: string): Promise<ClientRow | null> {
	const { data, error } = await supabaseAdmin()
		.from("clients")
		.select("*")
		.ilike("url_slug", urlSlug)
		.maybeSingle();
	if (error) throw new Error(error.message);
	return data;
}

export async function fetchClientById(id: string): Promise<ClientRow | null> {
	const { data, error } = await supabaseAdmin().from("clients").select("*").eq("id", id).maybeSingle();
	if (error) throw new Error(error.message);
	return data;
}

export async function insertClient(input: {
	slug: string;
	nom: string;
	automation_type: string;
	notes: string;
	email: string;
}): Promise<ClientRow> {
	const urlSlug = `${input.slug}-${randomBytes(3).toString("hex")}`;
	const { data, error } = await supabaseAdmin()
		.from("clients")
		.insert({ ...input, email: input.email || null, url_slug: urlSlug })
		.select()
		.single();
	if (error) throw new Error(error.message);
	return data;
}

export async function updateClient(
	id: string,
	input: { nom: string; automation_type: string; notes: string; email: string },
): Promise<void> {
	const { error } = await supabaseAdmin()
		.from("clients")
		.update({ ...input, email: input.email || null })
		.eq("id", id);
	if (error) throw new Error(error.message);
}

export async function deleteClient(id: string): Promise<void> {
	const { error } = await supabaseAdmin().from("clients").delete().eq("id", id);
	if (error) throw new Error(error.message);
}

export async function updateClientStage(id: string, stage: Stage): Promise<void> {
	const { error } = await supabaseAdmin().from("clients").update({ stage }).eq("id", id);
	if (error) throw new Error(error.message);
}

// Appelé côté client juste après l'envoi réussi du formulaire d'onboarding : fait avancer
// l'étape uniquement si le client est encore à "onboarding" (n'écrase pas une avancée manuelle).
export async function advanceAfterOnboarding(urlSlug: string): Promise<void> {
	const { error } = await supabaseAdmin()
		.from("clients")
		.update({ stage: "cadrage", onboarding_submitted_at: new Date().toISOString() })
		.ilike("url_slug", urlSlug)
		.eq("stage", "onboarding");
	if (error) throw new Error(error.message);
}

// Garde les dernières réponses (hors secrets) pour pré-remplir le formulaire si le client
// revient le modifier plus tard, même après que le projet ait avancé.
export async function saveLastSubmission(urlSlug: string, data: unknown): Promise<void> {
	const { error } = await supabaseAdmin().from("clients").update({ last_submission: data }).ilike("url_slug", urlSlug);
	if (error) throw new Error(error.message);
}
