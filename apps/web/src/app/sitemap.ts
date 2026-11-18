import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";

const siteUrl = "https://www.mysynapsis.fr";

// Pages du nouveau site (refonte 2026). Les anciennes pages (/offres, /methode, /deroulement) redirigent vers l'accueil.
export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ["", "/diagnostic", "/rendez-vous", "/zone-intervention", "/organismes-de-formation", "/guides", "/mentions-legales", "/politique-confidentialite"];

	const priorities: Record<string, number> = {
		"": 1,
		"/diagnostic": 0.9,
		"/rendez-vous": 0.9,
		"/organismes-de-formation": 0.7,
		"/zone-intervention": 0.6,
	};

	const pages: MetadataRoute.Sitemap = routes.map((route) => ({
		url: `${siteUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: route === "" ? "weekly" : "monthly",
		priority: priorities[route] ?? 0.3,
	}));

	// Un guide par fichier JSON de content/guides.
	const guides: MetadataRoute.Sitemap = getAllGuides().map((g) => ({
		url: `${siteUrl}/guides/${g.slug}`,
		lastModified: new Date(`${g.updated}T00:00:00Z`),
		changeFrequency: "monthly",
		priority: 0.6,
	}));

	return [...pages, ...guides];
}
