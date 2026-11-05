import "server-only";
import { verifierDiagnostic, type DiagnosticV2 } from "./contrat";

// Envoi du diagnostic à Pilotage (n8n V-01b). Serveur uniquement : l'URL et le
// secret ne quittent jamais le serveur, aucune des deux variables n'est publique.
//
// Une tentative par appel. Le serveur ne crée jamais rien deux fois pour un même
// idDiagnostic : c'est donc à l'appelant de réessayer, avec le MÊME corps, quand
// la réponse est `reessayer: true`.

export type ResultatPilotage =
	| { ok: true; opportuniteId: string | null }
	// Contenu hors contrat ou site mal configuré : réessayer ne servirait à rien.
	| { ok: false; reessayer: false }
	// 500, délai dépassé, pas de réponse : même idDiagnostic, on peut retenter.
	| { ok: false; reessayer: true };

const DELAI_MS = 15_000;

export async function envoyerDiagnostic(diagnostic: unknown): Promise<ResultatPilotage> {
	const url = process.env.N8N_WEBHOOK_DIAGNOSTIC;
	const secret = process.env.N8N_WEBHOOK_SECRET;
	if (!url || !secret) {
		const manquantes = [!url && "N8N_WEBHOOK_DIAGNOSTIC", !secret && "N8N_WEBHOOK_SECRET"].filter(Boolean).join(", ");
		console.error(`[pilotage] variable(s) manquante(s) : ${manquantes}. Diagnostic non envoyé.`);
		return { ok: false, reessayer: false };
	}

	const erreurs = verifierDiagnostic(diagnostic);
	if (erreurs.length > 0) {
		console.error("[pilotage] diagnostic refusé avant envoi, hors contrat :", erreurs);
		return { ok: false, reessayer: false };
	}
	const corps = diagnostic as DiagnosticV2;
	// Estampillé ici, à chaque tentative : l'horloge du visiteur n'a pas à faire foi.
	const charge = JSON.stringify({ ...corps, envoyeLe: new Date().toISOString() });

	let res: Response;
	try {
		res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json", "X-Webhook-Secret": secret },
			body: charge,
			signal: AbortSignal.timeout(DELAI_MS),
			cache: "no-store",
		});
	} catch (err) {
		console.error(`[pilotage] pas de réponse pour ${corps.idDiagnostic}`, err);
		return { ok: false, reessayer: true };
	}

	if (res.status === 400) {
		const detail = await res.json().catch(() => null);
		console.error(`[pilotage] 400 pour ${corps.idDiagnostic}, ne pas réessayer :`, detail?.erreurs ?? detail);
		return { ok: false, reessayer: false };
	}

	if (res.status === 200) {
		const detail = await res.json().catch(() => null);
		if (detail?.ok === true) {
			const id = typeof detail.opportuniteId === "string" && detail.opportuniteId ? detail.opportuniteId : null;
			return { ok: true, opportuniteId: id };
		}
	}

	// 500, ou toute réponse inattendue : le serveur ne crée rien en double, on retente.
	console.error(`[pilotage] réponse ${res.status} pour ${corps.idDiagnostic}, nouvelle tentative possible`);
	return { ok: false, reessayer: true };
}
