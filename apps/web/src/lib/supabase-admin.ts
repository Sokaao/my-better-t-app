import { createClient } from "@supabase/supabase-js";

// Client service_role — accès complet, RLS ignoré. Ne jamais importer depuis un composant client
// ni exposer cette clé au navigateur : n'utiliser ce module que dans des Server Components/Actions.
export function supabaseAdmin() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !key) {
		throw new Error("SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant.");
	}
	return createClient(url, key, {
		auth: { persistSession: false },
	});
}
