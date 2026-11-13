// Coordonnées publiques de Synapsis : seule source pour l'affichage, les liens et les données structurées.
// Exception : public/carte (HTML statique et vCard) ne peut pas importer ce fichier, il est tenu à la main.
export const SITE_URL = "https://www.mysynapsis.fr";

export const CONTACT = {
	email: "contact@mysynapsis.fr",
	phoneDisplay: "07 59 95 10 51",
	phoneE164: "+33759951051",
	phoneHref: "tel:+33759951051",
} as const;
