"use server";

import { OBJECTIFS, sendLead, type LeadInput, type Objectif } from "@/lib/leads";

export type SubmitResult = { ok: true } | { ok: false; error: string };

// Reçu depuis le composant client à la fin du diagnostic. On revalide tout côté
// serveur : le formulaire est public, rien de ce qui arrive ici n'est de confiance.
export async function submitDiagnostic(input: LeadInput): Promise<SubmitResult> {
	const prenom = String(input.prenom ?? "").trim().slice(0, 80);
	const nom = String(input.nom ?? "").trim().slice(0, 80);
	const email = String(input.email ?? "").trim().toLowerCase().slice(0, 160);
	const telephone = String(input.telephone ?? "").trim().slice(0, 40);

	if (!prenom || !nom) return { ok: false, error: "Il manque votre nom ou votre prénom." };
	if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return { ok: false, error: "Cette adresse email ne semble pas valide." };
	if (telephone && telephone.replace(/\D/g, "").length < 9) return { ok: false, error: "Ce numéro de téléphone ne semble pas valide." };
	if (!OBJECTIFS.includes(input.objectif as Objectif)) return { ok: false, error: "Réponse manquante à la dernière question." };

	const num = (v: unknown, max: number) => {
		const n = Number(v);
		return Number.isFinite(n) && n >= 0 && n <= max ? n : 0;
	};

	const res = await sendLead({
		prenom,
		nom,
		email,
		telephone,
		tailleCabinet: num(input.tailleCabinet, 500),
		heuresDirigeant: num(input.heuresDirigeant, 80),
		heuresCollaborateur: num(input.heuresCollaborateur, 80),
		tauxHoraire: num(input.tauxHoraire, 2000),
		objectif: input.objectif as Objectif,
		taches: Array.isArray(input.taches) ? input.taches.slice(0, 20).map((t) => String(t).slice(0, 160)) : [],
		heuresDirigeantSemaine: num(input.heuresDirigeantSemaine, 100),
		heuresDirigeantJoursAn: num(input.heuresDirigeantJoursAn, 400),
		heuresCabinetAn: num(input.heuresCabinetAn, 500000),
		caPotentiel: num(input.caPotentiel, 100000000),
		etpEquivalent: num(input.etpEquivalent, 500),
		premiereAutomatisation: String(input.premiereAutomatisation ?? "").slice(0, 160),
		source: input.source ? String(input.source).slice(0, 60) : null,
	});

	return res.ok ? { ok: true } : { ok: false, error: res.error ?? "L'enregistrement a échoué." };
}
