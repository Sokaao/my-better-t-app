"use server";

import { advanceAfterOnboarding as advance, saveLastSubmission } from "@/lib/admin-clients";
import type { OnboardingPrefill } from "@/components/onboarding/setter-ia-form";

// Invoqué directement depuis le composant client juste après l'envoi réussi du formulaire :
// pas de <form>, appelé comme une fonction async classique (RPC Server Action).
export async function advanceAfterOnboarding(urlSlug: string) {
	try {
		await advance(urlSlug);
	} catch {
		// Non bloquant pour le client : le formulaire est déjà parti vers Fred, l'étape
		// pourra être avancée manuellement depuis /admin si cet appel échoue.
	}
}

// Garde une copie des réponses (hors secrets) pour pré-remplir le formulaire si le client
// revient le modifier plus tard, même après que le projet ait avancé.
export async function saveOnboardingSubmission(urlSlug: string, data: Required<OnboardingPrefill>) {
	try {
		await saveLastSubmission(urlSlug, data);
	} catch {
		// Non bloquant : l'envoi vers Fred a déjà réussi, on perd juste le pré-remplissage.
	}
}
