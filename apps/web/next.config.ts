import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,

	// 🔧 Fix monorepo / Turborepo warning
	turbopack: {
		root: "../../",
	},
};

export default nextConfig;
