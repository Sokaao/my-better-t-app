import SiteNavMinimal from "@/components/site-nav-minimal";
import SiteFooterMinimal from "@/components/site-footer-minimal";

export default function InfoMessage({ title, body }: { title: string; body: string }) {
	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />
			<main>
				<section className="s-page-hero">
					<div className="s-wrap" style={{ maxWidth: 560 }}>
						<span className="s-eyebrow" style={{ justifyContent: "center" }}>
							Onboarding
						</span>
						<h1 style={{ fontSize: 30 }}>{title}</h1>
						<p>{body}</p>
					</div>
				</section>
			</main>
			<SiteFooterMinimal />
		</>
	);
}
