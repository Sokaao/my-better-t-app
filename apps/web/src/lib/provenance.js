// Provenance d'un visiteur, au format UTM (source, medium…), envoyée avec le diagnostic.
// Ordre : UTM de l'adresse, sinon le site d'où il arrive (document.referrer). Même convention que
// Google Analytics : google / organic, linkedin / social, autre site / referral, rien = direct.
// Elle est retenue dès la première page vue (sessionStorage, effacé à la fermeture de l'onglet) :
// un rechargement ou une navigation complète vers /diagnostic ne la perd plus.
// Rien n'est envoyé tant que le visiteur ne valide pas le diagnostic.

const CLE = "syn_provenance";
const CHAMPS = ["source", "medium", "campaign", "content", "term"];
const MOTEURS = { google: /(^|\.)google\./, bing: /(^|\.)bing\.com$/, duckduckgo: /(^|\.)duckduckgo\.com$/, qwant: /(^|\.)qwant\.com$/, ecosia: /(^|\.)ecosia\.org$/, yahoo: /(^|\.)yahoo\./ };
const RESEAUX = { linkedin: /(^|\.)(linkedin\.com|lnkd\.in)$/, facebook: /(^|\.)(facebook\.com|fb\.com)$/, instagram: /(^|\.)instagram\.com$/, x: /(^|\.)(t\.co|x\.com|twitter\.com)$/, youtube: /(^|\.)youtube\.com$/ };

export function calculerProvenance(search, referrer) {
	const utm = {};
	try {
		const sp = new URLSearchParams(search || "");
		CHAMPS.forEach((k) => { const v = sp.get("utm_" + k); if (v) utm[k] = v.slice(0, 200); });
	} catch (e) { /* adresse illisible : pas d'UTM */ }
	if (utm.source) return utm;
	try {
		if (!referrer) return utm;
		const hote = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
		if (!hote || hote.endsWith("mysynapsis.fr")) return utm;
		const trouve = (liste) => Object.keys(liste).find((k) => liste[k].test(hote));
		const moteur = trouve(MOTEURS), reseau = moteur ? null : trouve(RESEAUX);
		utm.source = (moteur || reseau || hote).slice(0, 200);
		utm.medium = moteur ? "organic" : reseau ? "social" : "referral";
	} catch (e) { /* provenance illisible */ }
	return utm;
}

// À l'arrivée sur le site (première page de la visite) : retient la provenance une seule fois.
export function retenirProvenance() {
	try {
		if (sessionStorage.getItem(CLE) !== null) return;
		sessionStorage.setItem(CLE, JSON.stringify(calculerProvenance(location.search, document.referrer)));
	} catch (e) { /* stockage indisponible (navigation privée stricte) : on lira la page courante */ }
}

// Au moment d'envoyer : UTM de la page courante d'abord, puis la provenance retenue à l'arrivée,
// puis le site précédent de la page courante (cas où /diagnostic est la première page vue).
export function lireProvenance() {
	const ici = calculerProvenance(location.search, "");
	if (ici.source) return ici;
	try {
		const retenue = JSON.parse(sessionStorage.getItem(CLE) || "null");
		if (retenue && typeof retenue === "object" && typeof retenue.source === "string") {
			const propre = {};
			CHAMPS.forEach((k) => { if (typeof retenue[k] === "string" && retenue[k]) propre[k] = retenue[k].slice(0, 200); });
			if (propre.source) return propre;
		}
	} catch (e) { /* valeur illisible : on l'ignore */ }
	return calculerProvenance("", document.referrer);
}
