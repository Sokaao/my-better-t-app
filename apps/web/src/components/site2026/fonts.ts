// Urbanist pour les titres, Figtree pour le texte (docs/REFONTE.md, § 11 b).
// Les polices sont embarquées dans le site : src/styles/fonts.css (chargé par app/layout.tsx) les déclare
// et pose --font-urbanist / --font-figtree sur :root, lues par packages/brand/synapsis-2026.css.
// Elles ne sont plus téléchargées par next/font/google à la construction (échecs au hasard sur Vercel).

// Fichiers à précharger sur les pages du nouveau site (titres et texte, sous-ensemble latin).
export const PRELOAD_FONTS = ["/fonts/urbanist-600-800.woff2", "/fonts/figtree-400-700.woff2"];
