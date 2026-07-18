import type { MetadataRoute } from "next";

const siteUrl = "https://mysynapsis.fr";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/privacy-policy-tracker-app", "/terms-of-service-tracker", "/api/"],
		},
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
