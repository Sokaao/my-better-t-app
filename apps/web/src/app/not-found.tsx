import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function NotFound() {
	return (
		<>
			<div className="s-bg-grid" />
			<SiteNav />

			<section className="s-blk" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
				<div className="s-wrap" style={{ textAlign: "center" }}>
					<span className="s-eyebrow" style={{ justifyContent: "center" }}>Erreur 404</span>
					<h1
						style={{
							fontFamily: "var(--font-archivo)",
							fontWeight: 800,
							fontSize: "clamp(32px, 5vw, 54px)",
							letterSpacing: "-0.025em",
							color: "var(--ink)",
							margin: "20px 0 18px",
						}}
					>
						Cette page a été automatisée hors de l&apos;existence.
					</h1>
					<p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: "40em", margin: "0 auto 32px" }}>
						Ou elle n&apos;a jamais existé. Dans les deux cas, elle n&apos;est plus là.
					</p>
					<div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
						<Link href="/" className="s-btn s-btn-primary">
							Retour à l&apos;accueil <span className="arr">→</span>
						</Link>
						<Link href="/offres" className="s-btn s-btn-ghost">
							Voir les offres
						</Link>
					</div>
				</div>
			</section>

			<SiteFooter />
		</>
	);
}
