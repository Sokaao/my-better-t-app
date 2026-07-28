// Accès serveur uniquement (clé service_role) — n'importer ce module que depuis des
// Server Components ou Server Actions, jamais depuis un composant client.

import { randomBytes } from "crypto";
import { supabaseAdmin } from "./supabase-admin";

export type ClientRow = {
	id: string;
	slug: string;
	url_slug: string;
	nom: string;
	automation_type: string;
	notes: string;
	created_at: string;
};

export async function fetchClients(): Promise<ClientRow[]> {
	const { data, error } = await supabaseAdmin()
		.from("clients")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
}

// Utilisé pour retrouver le client depuis l'URL publique /onboarding/[urlSlug] —
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

export async function insertClient(input: {
	slug: string;
	nom: string;
	automation_type: string;
	notes: string;
}): Promise<ClientRow> {
	const urlSlug = `${input.slug}-${randomBytes(3).toString("hex")}`;
	const { data, error } = await supabaseAdmin()
		.from("clients")
		.insert({ ...input, url_slug: urlSlug })
		.select()
		.single();
	if (error) throw new Error(error.message);
	return data;
}
