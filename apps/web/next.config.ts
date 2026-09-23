import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,

	// 🔧 Fix monorepo / Turborepo warning
	turbopack: {
		root: "../../",
	},

	async redirects() {
		return [
			{
				source: "/onboarding-celofat",
				destination: "/onboarding/CELOFAT-d12fb6",
				permanent: true,
			},
			{
				source: "/onboarding/CELOFAT",
				destination: "/onboarding/CELOFAT-d12fb6",
				permanent: true,
			},
		];
	},

	// Carte de contact : page HTML statique servie depuis public/carte.
	async rewrites() {
		return [
			{
				source: "/carte",
				destination: "/carte/index.html",
			},
		];
	},

	// Sans ce Content-Type, l'iPhone affiche le .vcf en texte au lieu d'ouvrir la fiche contact.
	async headers() {
		return [
			{
				source: "/carte/:path*.vcf",
				headers: [{ key: "Content-Type", value: "text/vcard; charset=utf-8" }],
			},
		];
	},
};

export default nextConfig;
