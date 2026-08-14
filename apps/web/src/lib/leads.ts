// Accès serveur uniquement (clé service_role), n'importer ce module que depuis des
// Server Components ou Server Actions, jamais depuis un composant client.

import { supabaseAdmin } from "./supabase-admin";

export const LEAD_STATUSES = ["nouveau", "contacte", "rdv", "client", "perdu"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
	nouveau: "Nouveau",
	contacte: "Contacté",
	rdv: "RDV pris",
	client: "Client",
	perdu: "Perdu",
};

export const OBJECTIFS = ["temps", "argent", "vie", "erreurs"] as const;
export type Objectif = (typeof OBJECTIFS)[number];

export const OBJECTIF_LABELS: Record<Objectif, string> = {
	temps: "Du temps pour lui",
	argent: "Du chiffre d'affaires",
	vie: "Sa vie de famille",
	erreurs: "Arrêter les erreurs",
};

// Ce que le questionnaire envoie : les réponses brutes plus les résultats affichés.
// Les résultats sont figés à l'envoi, parce que les hypothèses du simulateur
// évolueront et que le chiffre vu par le prospect doit rester celui-là.
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

export type LeadRow = {
	id: string;
	created_at: string;
	prenom: string;
	nom: string;
	email: string;
	telephone: string;
	taille_cabinet: number;
	heures_dirigeant: number;
	heures_collaborateur: number;
	taux_horaire: number;
	objectif: Objectif;
	taches: string[];
	heures_dirigeant_semaine: number | null;
	heures_dirigeant_jours_an: number | null;
	heures_cabinet_an: number | null;
	ca_potentiel: number | null;
	etp_equivalent: number | null;
	premiere_automatisation: string | null;
	statut: LeadStatus;
	source: string | null;
	notes: string;
	contacte_at: string | null;
};

export async function createLead(input: LeadInput): Promise<LeadRow> {
	const { data, error } = await supabaseAdmin()
		.from("leads")
		.insert({
			prenom: input.prenom,
			nom: input.nom,
			email: input.email,
			telephone: input.telephone,
			taille_cabinet: input.tailleCabinet,
			heures_dirigeant: input.heuresDirigeant,
			heures_collaborateur: input.heuresCollaborateur,
			taux_horaire: input.tauxHoraire,
			objectif: input.objectif,
			taches: input.taches,
			heures_dirigeant_semaine: input.heuresDirigeantSemaine,
			heures_dirigeant_jours_an: input.heuresDirigeantJoursAn,
			heures_cabinet_an: input.heuresCabinetAn,
			ca_potentiel: input.caPotentiel,
			etp_equivalent: input.etpEquivalent,
			premiere_automatisation: input.premiereAutomatisation,
			source: input.source,
		})
		.select("*")
		.single();
	if (error) throw new Error(error.message);
	return data as LeadRow;
}

export async function fetchLeads(): Promise<LeadRow[]> {
	const { data, error } = await supabaseAdmin()
		.from("leads")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []) as LeadRow[];
}

export async function updateLeadStatus(id: string, statut: LeadStatus): Promise<void> {
	const { error } = await supabaseAdmin()
		.from("leads")
		.update({
			statut,
			// On date le premier passage hors de "nouveau" pour mesurer le délai de rappel.
			contacte_at: statut === "nouveau" ? null : new Date().toISOString(),
		})
		.eq("id", id);
	if (error) throw new Error(error.message);
}
