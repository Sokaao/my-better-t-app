// Envoi d'un lead du diagnostic vers n8n, qui écrit ensuite dans NocoDB.
// Volontairement synchrone : on attend la réponse du workflow pour savoir si la
// ligne a bien été créée. Un webhook en fire-and-forget afficherait "c'est noté"
// à quelqu'un dont les coordonnées viennent de disparaître.
//
// Côté n8n, le nœud Webhook doit être réglé sur "Respond: When Last Node
// Finishes" (ou terminer par un nœud Respond to Webhook) pour que ce contrôle
// ait un sens.

export const OBJECTIFS = ["temps", "argent", "vie", "erreurs"] as const;
export type Objectif = (typeof OBJECTIFS)[number];

export const OBJECTIF_LABELS: Record<Objectif, string> = {
	temps: "Du temps pour lui",
	argent: "Du chiffre d'affaires",
	vie: "Sa vie de famille",
	erreurs: "Arrêter les erreurs",
};

// Ce que le questionnaire produit : les coordonnées, les réponses brutes, et
// les résultats affichés à l'écran. Ces résultats sont figés à l'envoi : les
// hypothèses du simulateur évolueront, pas le chiffre annoncé à cette personne.
export type LeadInput = {
	prenom: string;
	nom: string;
	email: string;
	telephone: string;
	tailleCabinet: number;
	heuresDirigeant: number;
	heuresCollaborateur: number;
	tauxHoraire: number;
	objectif: Objectif;
	taches: string[];
	heuresDirigeantSemaine: number;
	heuresDirigeantJoursAn: number;
	heuresCabinetAn: number;
	caPotentiel: number;
	etpEquivalent: number;
	premiereAutomatisation: string;
	source: string | null;
};

export async function sendLead(lead: LeadInput): Promise<{ ok: boolean; error?: string }> {
	const url = process.env.LEAD_WEBHOOK_URL;
	const secret = process.env.LEAD_WEBHOOK_SECRET;

	if (!url) {
		// Mauvaise configuration plutôt que panne : on le dit clairement dans les
		// logs, et on ne fait pas croire au visiteur que c'est passé.
		console.error("[lead] LEAD_WEBHOOK_URL manquant : le lead n'a été envoyé nulle part.");
		return { ok: false, error: "Le formulaire n'est pas encore relié. Écrivez-moi directement à synapsis.devis@gmail.com." };
	}

	// Payload à plat : chaque clé se mappe sur une colonne NocoDB sans avoir à
	// creuser dans des objets imbriqués côté n8n.
	const payload = {
		recuLe: new Date().toISOString(),
		prenom: lead.prenom,
		nom: lead.nom,
		nomComplet: `${lead.prenom} ${lead.nom}`.trim(),
		email: lead.email,
		telephone: lead.telephone,
		source: lead.source ?? "direct",
		tailleCabinet: lead.tailleCabinet,
		heuresDirigeant: lead.heuresDirigeant,
		heuresCollaborateur: lead.heuresCollaborateur,
		tauxHoraire: lead.tauxHoraire,
		objectif: lead.objectif,
		objectifLabel: OBJECTIF_LABELS[lead.objectif],
		taches: lead.taches.join(" · "),
		heuresDirigeantSemaine: lead.heuresDirigeantSemaine,
		heuresDirigeantJoursAn: lead.heuresDirigeantJoursAn,
		heuresCabinetAn: lead.heuresCabinetAn,
		caPotentiel: lead.caPotentiel,
		etpEquivalent: lead.etpEquivalent,
		premiereAutomatisation: lead.premiereAutomatisation,
		statut: "Nouveau",
	};

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(secret ? { "X-Webhook-Secret": secret } : {}),
			},
			body: JSON.stringify(payload),
			// Le chemin du webhook est devinable : sans réponse rapide, on préfère
			// rendre la main au visiteur plutôt que de le laisser attendre.
			signal: AbortSignal.timeout(10000),
		});
		if (!res.ok) {
			console.error(`[lead] n8n a répondu ${res.status} pour ${lead.email}`, JSON.stringify(payload));
			return { ok: false, error: "L'enregistrement a échoué. Réessayez dans un instant." };
		}
		return { ok: true };
	} catch (err) {
		// On journalise le payload complet : même si l'appel échoue, le lead reste
		// récupérable à la main dans les logs Vercel.
		console.error(`[lead] envoi impossible pour ${lead.email}`, err, JSON.stringify(payload));
		return { ok: false, error: "L'enregistrement a échoué. Réessayez dans un instant." };
	}
}
