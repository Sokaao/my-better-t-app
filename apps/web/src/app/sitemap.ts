import type { MetadataRoute } from "next";

const siteUrl = "https://mysynapsis.fr";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ["", "/offres", "/rendez-vous", "/mentions-legales", "/politique-confidentialite"];

	return routes.map((route) => ({
		url: `${siteUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: route === "" || route === "/offres" ? "weekly" : "monthly",
		priority: route === "" ? 1 : route === "/offres" || route === "/rendez-vous" ? 0.9 : 0.3,
	}));
}
