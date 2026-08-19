import type { MetadataRoute } from "next";

const siteUrl = "https://www.mysynapsis.fr";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = [
		"",
		"/diagnostic",
		"/offres",
		"/methode",
		"/rendez-vous",
		"/mentions-legales",
		"/politique-confidentialite",
	];

	return routes.map((route) => ({
		url: `${siteUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: route === "" || route === "/offres" ? "weekly" : "monthly",
		priority:
			route === ""
				? 1
				: route === "/diagnostic" ||
						route === "/offres" ||
						route === "/methode" ||
						route === "/rendez-vous"
					? 0.9
					: 0.3,
	}));
}
