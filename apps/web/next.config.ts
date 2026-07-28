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
};

export default nextConfig;
