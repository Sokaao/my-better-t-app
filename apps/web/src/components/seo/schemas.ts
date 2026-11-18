import { SITE_URL } from "@/lib/contact";
import type { Guide } from "@/lib/guides";

// Fil d'Ariane « Accueil > page » pour les pages intérieures.
export function breadcrumbLd(name: string, path: string) {
	return {
		"@type": "BreadcrumbList",
		"@id": `${SITE_URL}${path}#breadcrumb`,
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
			{ "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
		],
	};
}

// Fil d'Ariane à plusieurs niveaux (Accueil > … > page). `trail` liste les niveaux après l'accueil, dans l'ordre.
export function breadcrumbTrailLd(path: string, trail: readonly { name: string; path: string }[]) {
	return {
		"@type": "BreadcrumbList",
		"@id": `${SITE_URL}${path}#breadcrumb`,
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
			...trail.map((t, i) => ({ "@type": "ListItem", position: i + 2, name: t.name, item: `${SITE_URL}${t.path}` })),
		],
	};
}

// Article d'un guide. Auteur et éditeur renvoient aux nœuds Person et Organization du graphe global (layout.tsx).
export function articleLd(guide: Pick<Guide, "slug" | "h1" | "description" | "published" | "updated">) {
	const url = `${SITE_URL}/guides/${guide.slug}`;
	return {
		"@type": "BlogPosting",
		"@id": `${url}#article`,
		headline: guide.h1,
		description: guide.description,
		datePublished: guide.published,
		dateModified: guide.updated,
		inLanguage: "fr-FR",
		mainEntityOfPage: url,
		image: `${SITE_URL}/opengraph-image`,
		isPartOf: { "@id": `${SITE_URL}/#website` },
		author: {
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: "Frédéric Mallet",
			url: "https://www.linkedin.com/in/mysynapsis",
		},
		publisher: { "@id": `${SITE_URL}/#organization` },
	};
}

// FAQPage construite à partir du tableau qui sert aussi à l'affichage : les deux ne peuvent pas diverger.
export function faqPageLd(path: string, items: readonly { q: string; a: string }[]) {
	return {
		"@type": "FAQPage",
		"@id": `${SITE_URL}${path}#faq`,
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: { "@type": "Answer", text: item.a },
		})),
	};
}

// Un bloc @graph par page.
export function graph(...nodes: Record<string, unknown>[]) {
	return { "@context": "https://schema.org", "@graph": nodes };
}
