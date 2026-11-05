"use server";

import { envoyerDiagnostic, type ResultatPilotage } from "@/lib/diagnostic/pilotage";

// Action serveur appelée par le diagnostic à l'écran du rapport. Le corps est le
// contrat v2 ; idDiagnostic est tiré UNE fois côté client (crypto.randomUUID()) et
// renvoyé tel quel à chaque nouvel essai quand la réponse porte `reessayer: true`.
//
// Pas d'email du rapport depuis le site : n8n l'envoie déjà (rapport.html et
// rapport.texte), le visiteur le recevrait deux fois.
export async function envoyerDiagnosticPilotage(diagnostic: unknown): Promise<ResultatPilotage> {
	return envoyerDiagnostic(diagnostic);
}
