// Accès serveur uniquement (clé service_role) — n'importer ce module que depuis des
// Server Components ou Server Actions, jamais depuis un composant client.

import { supabaseAdmin } from "./supabase-admin";

export type ClientRow = {
	id: string;
	slug: string;
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

export async function fetchClientBySlug(slug: string): Promise<ClientRow | null> {
	const { data, error } = await supabaseAdmin()
		.from("clients")
		.select("*")
		.ilike("slug", slug)
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
	const { data, error } = await supabaseAdmin().from("clients").insert(input).select().single();
	if (error) throw new Error(error.message);
	return data;
}
