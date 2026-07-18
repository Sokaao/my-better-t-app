"use client";

import { CheckCircle2, Clock, Award, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function RendezVousPage() {
	useScrollReveal();

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://assets.calendly.com/assets/external/widget.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			if (document.body.contains(script)) {
				document.body.removeChild(script);
			}
		};
	}, []);

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNav />

			<section className="s-page-hero">
				<div className="s-wrap">
					<span className="s-eyebrow" style={{ justifyContent: "center" }}>Dernière étape</span>
					<h1>
						Réservez votre appel de <span style={{ color: "var(--orange)" }}>découverte</span>
					</h1>
					<p>
						Pendant ces 30 minutes, nous échangerons sur vos processus chronophages et explorerons les opportunités d&apos;automatisation qui s&apos;offrent à vous.
					</p>
				</div>
			</section>

			<section className="s-blk">
				<div className="s-wrap">
					<div className="s-sec-head rv" style={{ margin: "0 auto 48px", textAlign: "center", maxWidth: "640px" }}>
						<span className="s-eyebrow" style={{ justifyContent: "center" }}>Au programme</span>
						<h2>Ce que vous allez obtenir</h2>
					</div>

					<div className="s-sol-grid s-cols-2 rv rv-d1" style={{ marginBottom: 56 }}>
						<div className="s-card">
							<div className="s-cico"><CheckCircle2 size={20} /></div>
							<h3>On analyse vos vrais problèmes</h3>
							<p>On identifie exactement ce qui vous fait perdre du temps et de l&apos;argent.</p>
						</div>
						<div className="s-card">
							<div className="s-cico"><TrendingUp size={20} /></div>
							<h3>Vous repartez avec un plan d&apos;action</h3>
							<p>Gains potentiels chiffrés. Priorités clarifiées. Prochaines étapes définies. Actionnable dès le lendemain.</p>
						</div>
						<div className="s-card">
							<div className="s-cico"><Award size={20} /></div>
							<h3>Zéro engagement. Zéro pression.</h3>
							<p>Si l&apos;automatisation n&apos;est pas faite pour vous, je vous le dis franchement, et on ne va pas plus loin.</p>
						</div>
						<div className="s-card">
							<div className="s-cico"><Clock size={20} /></div>
							<h3>30 minutes. Pas une de plus.</h3>
							<p>Je respecte votre temps. Échange ciblé, sans détour, 100% focalisé sur VOS besoins.</p>
						</div>
					</div>

					{/* Widget Calendly */}
					<div className="s-flow rv rv-d2" style={{ padding: 32, marginBottom: 48 }}>
						<div style={{ textAlign: "center", marginBottom: 24 }}>
							<h2 style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: 28, color: "var(--ink)", marginBottom: 10 }}>
								Sélectionnez votre créneau
							</h2>
							<p style={{ color: "var(--ink-soft)" }}>
								Vous recevrez une confirmation par email avec le lien de visioconférence
							</p>
						</div>
						<div
							className="calendly-inline-widget"
							data-url="https://calendly.com/synapsis-devis/15min"
							style={{ minWidth: "320px", height: "700px" }}
						/>
					</div>

					{/* CTA band */}
					<div className="s-band rv rv-d3">
						<h2>Prêt à transformer votre opérationnel ?</h2>
						<p>Choisissez le créneau qui vous convient le mieux ci-dessus</p>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap", fontSize: 14, color: "#c9c0b2" }}>
							<span>✓ Sans engagement</span>
							<span>✓ 100% gratuit</span>
							<span>✓ 100% actionnable</span>
						</div>
					</div>
				</div>
			</section>

			<SiteFooter />
		</>
	);
}
