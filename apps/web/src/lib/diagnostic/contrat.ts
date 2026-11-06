// Contrat version 2 du diagnostic envoyé à Pilotage (n8n V-01b), et son contrôle.
// Module pur, sans accès au réseau ni à l'environnement : le serveur du site s'en
// sert pour refuser un envoi hors contrat avant de déranger n8n, qui revérifie.
// Les limites sont exactement celles du workflow (compte rendu de la session Pilotage, 05/11/2026).

export const FAMILLES = ["suivi", "msg", "relance", "saisie", "pilot"] as const;
export type Famille = (typeof FAMILLES)[number];

export const LIMITES = {
	prenom: 100,
	email: 254,
	entreprise: 200,
	telephone: 30,
	consentementTexte: 1000,
	metierId: 60,
	metierLibelle: 120,
	precisionLibre: 300,
	equipe: 40,
	niveau: 60,
	priorite: 300,
	premierBranchement: 300,
	page: 500,
	utm: 200,
	outils: 50,
	outil: 100,
	reponsesMin: 1,
	reponsesMax: 30,
	precisions: 5,
	blocages: 10,
	blocageTitre: 300,
	blocageTexte: 3000,
	heuresSemaine: 99_999,
	heuresAn: 999_999,
	rapportHtml: 600_000,
	rapportTexte: 100_000,
} as const;

export type DiagnosticV2 = {
	version: 2;
	idDiagnostic: string;
	envoyeLe: string;
	prenom: string;
	email: string;
	entreprise?: string | null;
	telephone: string;
	consentement: { accepte: true; texte: string; le: string };
	metier: { id: string; libelle?: string; precisionLibre?: string };
	equipe?: string;
	outils: string[];
	indice: number;
	niveau?: string;
	reponses: { famille: Famille; question: string; reponse: string; rang: number }[];
	precisions?: { question: string; reponse: string }[];
	blocages: { famille?: Famille; titre: string; pourquoi?: string; solution?: string }[];
	priorite?: string;
	premierBranchement?: string;
	heuresSemaine?: number;
	heuresAn?: number;
	utm?: Partial<Record<"source" | "medium" | "campaign" | "content" | "term", string>>;
	page?: string;
	rapport: { html: string; texte: string };
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Fuseau obligatoire : « Z » ou « +01:00 ». Une date sans fuseau est ambiguë.
const DATE_AVEC_FUSEAU = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;
const METIER_ID = /^[a-z0-9_-]+$/;

const estObjet = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const absent = (v: unknown) => v === undefined || v === null || v === "";
const texteNonVide = (v: unknown, max: number) => typeof v === "string" && v.trim() !== "" && v.length <= max;
const dateValide = (v: unknown) => typeof v === "string" && DATE_AVEC_FUSEAU.test(v) && !Number.isNaN(Date.parse(v));
const nombreEntre = (v: unknown, max: number) => typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= max;

// Champ texte facultatif : absent, ou texte de `max` caractères au plus.
function facultatif(e: string[], nom: string, v: unknown, max: number) {
	if (!absent(v) && !(typeof v === "string" && v.length <= max)) e.push(`${nom} : texte de ${max} caractères au plus`);
}

// Renvoie la liste des écarts au contrat ; vide si le corps est acceptable.
export function verifierDiagnostic(d: unknown): string[] {
	if (!estObjet(d)) return ["le corps doit être un objet"];
	const e: string[] = [];

	if (d.version !== 2) e.push("version doit valoir 2");
	if (typeof d.idDiagnostic !== "string" || !UUID.test(d.idDiagnostic)) e.push("idDiagnostic doit être un UUID");
	if (!dateValide(d.envoyeLe)) e.push("envoyeLe doit être une date ISO avec fuseau (Z ou +01:00)");

	if (!texteNonVide(d.prenom, LIMITES.prenom)) e.push(`prenom : de 1 à ${LIMITES.prenom} caractères`);
	if (typeof d.email !== "string" || d.email.length > LIMITES.email || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(d.email)) e.push("email invalide");
	facultatif(e, "entreprise", d.entreprise, LIMITES.entreprise);
	if (!texteNonVide(d.telephone, LIMITES.telephone) || (d.telephone as string).replace(/\D/g, "").length < 8) e.push(`telephone : obligatoire, 8 chiffres au moins, ${LIMITES.telephone} caractères au plus`);

	if (!estObjet(d.consentement)) e.push("consentement manquant");
	else {
		if (d.consentement.accepte !== true) e.push("consentement.accepte doit être true");
		if (!texteNonVide(d.consentement.texte, LIMITES.consentementTexte)) e.push(`consentement.texte : de 1 à ${LIMITES.consentementTexte} caractères`);
		if (!dateValide(d.consentement.le)) e.push("consentement.le doit être une date ISO avec fuseau");
	}

	if (!estObjet(d.metier)) e.push("metier manquant");
	else {
		if (typeof d.metier.id !== "string" || !METIER_ID.test(d.metier.id) || d.metier.id.length > LIMITES.metierId) e.push("metier.id : minuscules (a-z, 0-9, - et _), 60 caractères au plus");
		facultatif(e, "metier.libelle", d.metier.libelle, LIMITES.metierLibelle);
		facultatif(e, "metier.precisionLibre", d.metier.precisionLibre, LIMITES.precisionLibre);
	}

	facultatif(e, "equipe", d.equipe, LIMITES.equipe);
	facultatif(e, "niveau", d.niveau, LIMITES.niveau);
	facultatif(e, "priorite", d.priorite, LIMITES.priorite);
	facultatif(e, "premierBranchement", d.premierBranchement, LIMITES.premierBranchement);
	facultatif(e, "page", d.page, LIMITES.page);
	if (!absent(d.utm)) {
		if (!estObjet(d.utm)) e.push("utm doit être un objet");
		else for (const [k, v] of Object.entries(d.utm)) facultatif(e, `utm.${k}`, v, LIMITES.utm);
	}

	if (!Number.isInteger(d.indice) || (d.indice as number) < 0 || (d.indice as number) > 100) e.push("indice : entier de 0 à 100");

	if (!Array.isArray(d.outils)) e.push("outils doit être un tableau");
	else {
		if (d.outils.length > LIMITES.outils) e.push(`outils : ${LIMITES.outils} au plus`);
		d.outils.forEach((o, i) => {
			if (!texteNonVide(o, LIMITES.outil)) e.push(`outils[${i}] : texte de 1 à ${LIMITES.outil} caractères`);
		});
	}

	if (!Array.isArray(d.reponses)) e.push("reponses doit être un tableau");
	else {
		if (d.reponses.length < LIMITES.reponsesMin || d.reponses.length > LIMITES.reponsesMax) e.push(`reponses : de ${LIMITES.reponsesMin} à ${LIMITES.reponsesMax}`);
		d.reponses.forEach((r, i) => {
			if (!estObjet(r)) { e.push(`reponses[${i}] doit être un objet`); return; }
			if (!FAMILLES.includes(r.famille as Famille)) e.push(`reponses[${i}].famille : ${FAMILLES.join(", ")}`);
			if (typeof r.question !== "string" || !r.question.trim()) e.push(`reponses[${i}].question est obligatoire`);
			if (typeof r.reponse !== "string") e.push(`reponses[${i}].reponse doit être un texte`);
			if (!(Number.isInteger(r.rang) && (r.rang as number) >= 0 && (r.rang as number) <= 3)) e.push(`reponses[${i}].rang : entier de 0 à 3`);
		});
	}

	if (!absent(d.precisions)) {
		if (!Array.isArray(d.precisions)) e.push("precisions doit être un tableau");
		else {
			if (d.precisions.length > LIMITES.precisions) e.push(`precisions : ${LIMITES.precisions} au plus`);
			d.precisions.forEach((p, i) => {
				if (!estObjet(p) || typeof p.question !== "string" || !p.question.trim()) e.push(`precisions[${i}].question est obligatoire`);
			});
		}
	}

	if (!Array.isArray(d.blocages)) e.push("blocages doit être un tableau");
	else {
		if (d.blocages.length > LIMITES.blocages) e.push(`blocages : ${LIMITES.blocages} au plus`);
		d.blocages.forEach((b, i) => {
			if (!estObjet(b) || !texteNonVide(b.titre, LIMITES.blocageTitre)) { e.push(`blocages[${i}].titre : de 1 à ${LIMITES.blocageTitre} caractères`); return; }
			facultatif(e, `blocages[${i}].pourquoi`, b.pourquoi, LIMITES.blocageTexte);
			facultatif(e, `blocages[${i}].solution`, b.solution, LIMITES.blocageTexte);
		});
	}

	if (!absent(d.heuresSemaine) && !nombreEntre(d.heuresSemaine, LIMITES.heuresSemaine)) e.push(`heuresSemaine : de 0 à ${LIMITES.heuresSemaine}`);
	if (!absent(d.heuresAn) && !nombreEntre(d.heuresAn, LIMITES.heuresAn)) e.push(`heuresAn : de 0 à ${LIMITES.heuresAn}`);

	if (!estObjet(d.rapport)) e.push("rapport manquant");
	else {
		if (!texteNonVide(d.rapport.html, LIMITES.rapportHtml)) e.push(`rapport.html : de 1 à ${LIMITES.rapportHtml} caractères`);
		if (!texteNonVide(d.rapport.texte, LIMITES.rapportTexte)) e.push(`rapport.texte : de 1 à ${LIMITES.rapportTexte} caractères`);
	}

	return e;
}
