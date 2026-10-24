/* ============================================================================
 * DEMONSTRATION DE QUALIFICATION
 * ============================================================================
 *
 * Source : echange reel remonte d'un compte client (capture du 19/08/2026),
 * fourni par Fred. Anonymise : pas de prenom, pas d'@, pas de nom de marque.
 *
 * Ce qui a ete modifie par rapport a la capture d'origine :
 *   - la conversation reelle se termine sur « renvoie moi un message demain » ;
 *     ici elle va jusqu'au RDV, ce que le setter fait quand le prospect ne
 *     repousse pas.
 *   - trois vocaux dans l'original, deux ici.
 *   - le conseil et la proposition d'appel sont dans le dernier vocal, jamais
 *     ecrits : c'est ce qui se passe reellement.
 *   - fautes de frappe du prospect conservees : c'est ce qui rend l'echange
 *     credible.
 *
 * D'ou le statut "adapte" : la page l'annonce comme un echange reel dont la
 * cloture a ete condensee, jamais comme une capture brute.
 *
 * ==========================================================================*/

export type DmStatut = "exemple" | "adapte" | "reel";

export type DmMessage =
	| { sens: "in" | "out"; type: "texte"; texte: string }
	| { sens: "in" | "out"; type: "vocal"; duree: string }
	| { type: "systeme"; texte: string };

export const DM_STATUT: DmStatut = "adapte";

export const DM_DATE = "19 août 2026, 15:30";

export const DM_MESSAGES: DmMessage[] = [
	{
		sens: "out",
		type: "texte",
		texte: "Yes tkt t'inquiète, on a tous nos rythmes haha",
	},
	{
		sens: "out",
		type: "texte",
		texte:
			"Et toi du coup tu bosses sur quoi en ce moment, c'est quoi ton activité principale ?",
	},
	{
		sens: "in",
		type: "texte",
		texte: "La je fais des seminaires d'une semaine pour les dirigeants",
	},
	{
		sens: "out",
		type: "texte",
		texte:
			"Ah lourd ça, super niche et gros niveau de responsabilité sur une semaine entière",
	},
	{ sens: "out", type: "vocal", duree: "0:13" },
	{
		sens: "in",
		type: "texte",
		texte: "bah je fais un séminaire par mois avec 8 à 10 client min pour 2500eur chacun",
	},
	{
		sens: "out",
		type: "texte",
		texte:
			"Ok donc t'as déjà une belle base avec des séminaires bien remplis et bien positionnés",
	},
	{
		sens: "in",
		type: "texte",
		texte:
			"Bah la j'aimerai augmenter les prix des seminaires mais je sais pas si je peux offrir assez de valeur",
	},
	// Le vocal porte tout : le conseil sur l'offre, puis la proposition d'appel.
	// Rien de tout ca n'est ecrit dans le fil.
	{ sens: "out", type: "vocal", duree: "1:23" },
	{ sens: "in", type: "texte", texte: "ça marche, envoie le lien" },
	{ type: "systeme", texte: "lien de réservation envoyé" },
];

// Ce que le client recoit, et la seule chose qu'il recoit.
export const DM_NOTIFICATION = {
	titre: "Nouveau rendez-vous réservé",
	quand: "jeudi 21 août · 14 h 30",
	lignes: [
		"séminaires dirigeants, 1 par mois",
		"8 à 10 clients à 2 500 €",
		"veut monter ses prix sans perdre en valeur",
	],
};
