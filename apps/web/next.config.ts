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
				destination: "/onboarding/CELOFAT",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
