"use client";

import { CheckCircle2, ChevronDown, Sparkles, Rocket, Zap, MessageSquare, Clock, Shield, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { track } from "@vercel/analytics";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { faqs } from "./faqs";

export default function Offres() {
	useScrollReveal();
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNav />

			<section className="s-page-hero">
				<div className="s-wrap">
					<span className="s-eyebrow" style={{ justifyContent: "center" }}>Offres &amp; tarifs</span>
					<h1>
						Automatisez votre business. <span style={{ color: "var(--orange)" }}>Récupérez 1 jour par semaine.</span>
					</h1>
					<p>
						Vous passez encore <strong>4h par semaine</strong> sur des tâches que vous pourriez ne plus jamais faire.
					</p>
					<p>
						Relances, facturation, suivi client — on automatise ça en moins d&apos;une semaine.{" "}
						<strong style={{ color: "var(--orange)" }}>ROI garanti sous 60 jours.</strong>
					</p>
					<div style={{ marginTop: 24 }}>
						<Link
							href="/rendez-vous"
							className="s-btn s-btn-primary"
							onClick={() => track("cta_reserver_appel", { location: "offres_hero" })}
						>
							Réserver mon appel découverte gratuit <span className="arr">→</span>
						</Link>
					</div>
				</div>
			</section>

			<section className="s-blk" style={{ padding: "56px 0" }}>
				<div className="s-wrap">
					<div className="s-info-strip rv">
						<div className="s-info-item">
							<div className="s-cico"><Shield size={20} /></div>
							<div>
								<strong>100% indépendant</strong>
								<span>Tous les workflows vous appartiennent</span>
							</div>
						</div>
						<div className="s-info-item">
							<div className="s-cico"><Wrench size={20} /></div>
							<div>
								<strong>Prérequis</strong>
								<span>Compte n8n Cloud (~20 €/mois)</span>
							</div>
						</div>
						<div className="s-info-item">
							<div className="s-cico"><Zap size={20} /></div>
							<div>
								<strong>Intégrations</strong>
								<span>Notion, Pennylane, Calendly, HubSpot</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="s-blk" id="offres" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-sec-head rv" style={{ margin: "0 auto 52px", textAlign: "center", maxWidth: "640px" }}>
						<span className="s-eyebrow" style={{ justifyContent: "center" }}>Nos formules</span>
						<h2>Choisissez l&apos;offre adaptée à vos besoins</h2>
						<p>3 packs clairs + une option sur-mesure pour les projets spécifiques</p>
					</div>

					<div className="s-price-grid">
						{/* Offre 1 - Zéro Relance */}
						<div className="s-price-card rv rv-d1">
							<div className="s-cico"><Sparkles size={20} /></div>
							<h3>Zéro Relance Manuelle</h3>
							<p className="s-price-desc">Pour les entreprises qui perdent du chiffre d&apos;affaires parce que personne ne relance systématiquement</p>
							<div className="s-price-amount">
								<span className="num">900</span>
								<span className="unit">€</span>
							</div>
							<p className="s-price-note">Paiement unique</p>

							<ul className="s-price-list">
								<li><CheckCircle2 size={15} className="ck" /><span>Audit de votre flux actuel (45 min)</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>1 automatisation déployée au choix : relances devis, rappels RDV ou facturation récurrente</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Formation de votre équipe (1h)</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Support 30 jours inclus</span></li>
								<li><Clock size={15} className="ck" /><span><strong>Livraison : 7 jours</strong> après l&apos;audit</span></li>
							</ul>

							<div className="s-price-sub">
								<p className="s-price-punch">Ce processus tourne tout seul, sans intervention humaine, à vie.</p>
								<Link
									href="/rendez-vous"
									className="s-btn s-btn-primary"
									onClick={() => track("cta_reserver_appel", { location: "offres_pack_zero_relance" })}
								>
									Choisir cette offre <span className="arr">→</span>
								</Link>
							</div>
						</div>

						{/* Offre 2 - Pilote Automatique */}
						<div className="s-price-card featured rv rv-d2">
							<span className="s-price-ribbon">Populaire</span>
							<div className="s-cico"><Rocket size={20} /></div>
							<h3>Pilote Automatique</h3>
							<p className="s-price-desc">Pour les entreprises qui veulent supprimer les 3 principales pertes de temps en une fois</p>
							<div className="s-price-amount">
								<span className="num">2 200</span>
								<span className="unit">€</span>
							</div>
							<p className="s-price-note">Paiement unique</p>

							<ul className="s-price-list">
								<li><CheckCircle2 size={15} className="ck" /><span>Audit complet de vos processus (1h30)</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span><strong>3 automatisations</strong> au choix</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Intégration avec vos outils existants</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Formation équipe (2h)</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Support 60 jours inclus</span></li>
								<li><Clock size={15} className="ck" /><span><strong>Livraison : 14 jours</strong> ouvrés</span></li>
							</ul>
							<p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 16 }}>
								<strong style={{ color: "var(--ink)" }}>Option maintenance :</strong> surveillance, corrections, 1 ajustement/mois
							</p>

							<div className="s-price-sub">
								<p className="s-price-punch">4 à 6h récupérées chaque semaine. Zéro lead perdu.</p>
								<Link
									href="/rendez-vous"
									className="s-btn s-btn-primary"
									onClick={() => track("cta_reserver_appel", { location: "offres_pack_pilote_auto" })}
								>
									Choisir cette offre <span className="arr">→</span>
								</Link>
							</div>
						</div>

						{/* Offre 3 - Transformation Complète */}
						<div className="s-price-card premium rv rv-d3">
							<div className="s-cico"><Zap size={20} /></div>
							<h3>Transformation Complète</h3>
							<p className="s-price-desc">Pour les entreprises qui veulent déléguer l&apos;ensemble de leur back-office opérationnel</p>
							<div className="s-price-amount">
								<span className="num">4 000</span>
								<span className="unit">€</span>
							</div>
							<p className="s-price-note">+ 400 €/mois d&apos;accompagnement</p>

							<ul className="s-price-list">
								<li><CheckCircle2 size={15} className="ck" /><span><strong>5 automatisations clés</strong> complètes</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span><strong>Agents IA sur-mesure</strong></span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Intégrations avancées multi-outils</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>3 mois d&apos;accompagnement inclus</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Reporting mensuel des gains</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Support prioritaire</span></li>
							</ul>

							<div className="s-price-sub">
								<p className="s-price-punch">Entreprise autonome sur les tâches répétitives. Mesuré à 90 jours.</p>
								<Link
									href="/rendez-vous"
									className="s-btn s-btn-primary"
									onClick={() => track("cta_reserver_appel", { location: "offres_pack_transformation" })}
								>
									Choisir cette offre <span className="arr">→</span>
								</Link>
							</div>
						</div>

						{/* Offre 4 - Personnalisée */}
						<div className="s-price-card custom rv rv-d4">
							<div className="s-cico"><MessageSquare size={20} /></div>
							<h3>Offre Personnalisée</h3>
							<p className="s-price-desc">Pour les projets spécifiques qui ne rentrent pas dans les cases</p>
							<div className="s-price-amount">
								<span className="num" style={{ fontSize: 24 }}>Sur devis</span>
							</div>
							<p className="s-price-note">Adapté à vos besoins</p>

							<ul className="s-price-list">
								<li><CheckCircle2 size={15} className="ck" /><span>Projets d&apos;automatisation complexes</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Intégrations API spécifiques</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Développement d&apos;agents IA sur-mesure</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Accompagnement long terme</span></li>
								<li><CheckCircle2 size={15} className="ck" /><span>Formation approfondie des équipes</span></li>
							</ul>

							<div className="s-price-sub">
								<p className="s-price-punch" style={{ color: "var(--ink-soft)" }}>On en discute ensemble pour construire la solution idéale.</p>
								<Link
									href="/rendez-vous"
									className="s-btn s-btn-ghost"
									onClick={() => track("cta_reserver_appel", { location: "offres_pack_personnalise" })}
								>
									Discutons de votre projet <span className="arr">→</span>
								</Link>
							</div>
						</div>
					</div>

					<div className="s-guarantee rv" style={{ marginTop: 40 }}>
						<div className="s-guarantee-icon"><ShieldCheck size={24} /></div>
						<div>
							<h3>Garantie remboursement intégral</h3>
							<p>
								Sur les 3 offres packagées ci-dessus : si l&apos;automatisation n&apos;est pas livrée dans le délai annoncé, ou si vous ne constatez aucun résultat mesurable après 60 jours d&apos;utilisation, vous êtes remboursé à 100%. Sans condition cachée.
							</p>
							<div className="s-guarantee-terms">
								<span><CheckCircle2 size={15} className="ck" /> Délai de livraison non tenu → remboursé</span>
								<span><CheckCircle2 size={15} className="ck" /> Zéro résultat mesurable sous 60 jours → remboursé</span>
							</div>
							<p className="s-guarantee-note">Offre Personnalisée (sur devis) : conditions définies ensemble selon le périmètre du projet.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="s-blk" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-sec-head rv" style={{ margin: "0 auto 40px", textAlign: "center", maxWidth: "640px" }}>
						<span className="s-eyebrow" style={{ justifyContent: "center" }}>Questions fréquentes</span>
						<h2>Avant de vous lancer</h2>
					</div>

					<div className="s-faq-list rv" style={{ margin: "0 auto" }}>
						{faqs.map((item, i) => {
							const isOpen = openFaq === i;
							return (
								<div key={item.q} className={`s-faq-item${isOpen ? " open" : ""}`}>
									<button
										type="button"
										className="s-faq-q-btn"
										aria-expanded={isOpen}
										onClick={() => setOpenFaq(isOpen ? null : i)}
									>
										<span className="s-faq-q-text"><span className="qm">Q.</span> {item.q}</span>
										<ChevronDown className="s-faq-chevron" size={18} />
									</button>
									<div className="s-faq-panel">
										<div className="s-faq-panel-inner">
											<p className="s-faq-a">{item.a}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			<section className="s-blk" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-band rv">
						<h2>Pas sûr du bon pack ?</h2>
						<p>
							L&apos;appel découverte est <strong style={{ color: "#fff" }}>gratuit, 30 minutes, sans engagement</strong>. On identifie ensemble ce qui vous fait perdre le plus de temps et je vous dis lequel des trois packs correspond exactement à votre situation.
						</p>
						<Link
							href="/rendez-vous"
							className="s-btn s-btn-primary"
							onClick={() => track("cta_reserver_appel", { location: "offres_band" })}
						>
							Réserver mon appel découverte gratuit <span className="arr">→</span>
						</Link>
					</div>
				</div>
			</section>

			<SiteFooter />
		</>
	);
}
