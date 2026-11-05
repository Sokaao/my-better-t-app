import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,

	// 🔧 Fix monorepo / Turborepo warning
	turbopack: {
		root: "../../",
	},

	// Refonte 2026 (docs/REFONTE.md, § 12) :
	// - /admin et /onboarding ne servent plus (décision de Fred du 05/11/2026) : renvoyés vers l'accueil,
	//   en attendant la suppression du code ;
	// - les pages de l'ancien site (cabinets d'expertise comptable) et les archives renvoient vers l'accueil.
	async redirects() {
		return [
			{ source: "/admin/:path*", destination: "/", permanent: false },
			{ source: "/onboarding/:path*", destination: "/", permanent: false },
			{ source: "/onboarding-celofat", destination: "/", permanent: false },
			{ source: "/methode", destination: "/", permanent: true },
			{ source: "/offres", destination: "/", permanent: true },
			{ source: "/deroulement", destination: "/", permanent: true },
			{ source: "/archive-accueil", destination: "/", permanent: true },
			{ source: "/archive-accueil-v2", destination: "/", permanent: true },
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
