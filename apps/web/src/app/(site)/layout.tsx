import Shell from "@/components/site2026/Shell";

// Pages du nouveau site (refonte 2026). Les pages hors de ce groupe gardent
// l'ancien habillage tant qu'elles ne sont pas migrées.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return <Shell>{children}</Shell>;
}
