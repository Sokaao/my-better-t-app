// Pousse le lead vers n8n, qui se charge ensuite de créer la fiche dans le CRM et
// de vous notifier. Fire-and-forget : l'enregistrement en base ne doit jamais
// dépendre de la disponibilité du workflow.

import type { LeadRow } from "./leads";

const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;

export async function notifyNewLead(lead: LeadRow): Promise<void> {
	if (!WEBHOOK_URL) return;

	// Payload à plat : n8n mappe directement sur les champs du CRM sans avoir à
	// creuser dans des objets imbriqués.
	await fetch(WEBHOOK_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			id: lead.id,
			createdAt: lead.created_at,
			prenom: lead.prenom,
			nom: lead.nom,
			nomComplet: `${lead.prenom} ${lead.nom}`.trim(),
			email: lead.email,
			telephone: lead.telephone,
			source: lead.source,
			tailleCabinet: lead.taille_cabinet,
			heuresDirigeant: lead.heures_dirigeant,
			heuresCollaborateur: lead.heures_collaborateur,
			tauxHoraire: lead.taux_horaire,
			objectif: lead.objectif,
			taches: lead.taches,
			resultat: {
				heuresDirigeantSemaine: lead.heures_dirigeant_semaine,
				heuresDirigeantJoursAn: lead.heures_dirigeant_jours_an,
				heuresCabinetAn: lead.heures_cabinet_an,
				caPotentiel: lead.ca_potentiel,
				etpEquivalent: lead.etp_equivalent,
				premiereAutomatisation: lead.premiere_automatisation,
			},
		}),
	});
}
