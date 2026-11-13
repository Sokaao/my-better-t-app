// Contenu d'une page métier (une page par niche), consommé par NichePage.
export type NicheContent = {
	slug: string;
	niche: string;
	breadcrumb: string;
	title: string;
	description: string;
	eyebrow: string;
	h1: string;
	intro: string;
	situations: { h2: string; items: string[] };
	tools: { h2: string; intro: string; links: string[] };
	beforeAfter: { h2: string; rows: { before: string; after: string }[] };
	caseStudy: {
		h2: string;
		paragraphs: string[];
		resultsLabel: string;
		results: string[];
		note: string;
	};
	faq: { q: string; a: string }[];
	cta: { h2: string; text: string; label: string };
	// Maquettes animées facultatives (décoratives) ; absentes = rien d'affiché.
	illustrations?: { hero?: "suivi-stagiaires"; tools?: "visite-mobile" };
};
