import type { MetadataRoute } from "next";

const siteUrl = "https://www.mysynapsis.fr";

// Pages du nouveau site (refonte 2026). Les anciennes pages (/offres, /methode, /deroulement) redirigent vers l'accueil.
export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ["", "/diagnostic", "/rendez-vous", "/mentions-legales", "/politique-confidentialite"];

	return routes.map((route) => ({
		url: `${siteUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: route === "" ? "weekly" : "monthly",
		priority: route === "" ? 1 : route === "/diagnostic" || route === "/rendez-vous" ? 0.9 : 0.3,
	}));
}
