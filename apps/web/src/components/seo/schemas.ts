import { SITE_URL } from "@/lib/contact";

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
