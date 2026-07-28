"use server";

import { advanceAfterOnboarding as advance } from "@/lib/admin-clients";

// Invoqué directement depuis le composant client juste après l'envoi réussi du formulaire —
// pas de <form>, appelé comme une fonction async classique (RPC Server Action).
export async function advanceAfterOnboarding(urlSlug: string) {
	try {
		await advance(urlSlug);
	} catch {
		// Non bloquant pour le client : le formulaire est déjà parti vers Fred, l'étape
		// pourra être avancée manuellement depuis /admin si cet appel échoue.
	}
}
