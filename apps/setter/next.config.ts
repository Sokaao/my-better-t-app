import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,

	// Meme reglage que apps/web : la racine du monorepo, sinon Turbopack
	// remonte tout seul et se trompe de repertoire.
	turbopack: {
		root: "../../",
	},
};

export default nextConfig;
