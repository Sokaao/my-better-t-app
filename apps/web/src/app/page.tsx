"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Mail, Check, Pencil, X } from "lucide-react";
import { track } from "@vercel/analytics";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Home() {
	useScrollReveal();
	const execRef = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		const el = execRef.current;
		if (!el) return;

		const target = 1247;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reduced) {
			el.textContent = target.toLocaleString("fr-FR");
			return;
		}

		let started = false;
		let frameId: number;
		const startCount = () => {
			if (started) return;
			started = true;
			const t0 = performance.now();
			const dur = 1800;
			const tick = (now: number) => {
				const p = Math.min((now - t0) / dur, 1);
				const eased = 1 - (1 - p) ** 3;
				el.textContent = Math.round(eased * target).toLocaleString("fr-FR");
				if (p < 1) frameId = requestAnimationFrame(tick);
			};
			frameId = requestAnimationFrame(tick);
		};

		const timeoutId = setTimeout(startCount, 3000);
		return () => {
			clearTimeout(timeoutId);
			if (frameId) cancelAnimationFrame(frameId);
		};
	}, []);

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNav />

			<header className="s-hero">
				<div className="s-wrap">
					<div className="s-hero-top">
						<span className="s-eyebrow s-hin s-h1d" style={{ justifyContent: "center" }}>
							Automatisation sur-mesure · PME &amp; indépendants
						</span>
						<h1 className="s-hin s-h2d">
							Je construis les{" "}
							<span className="s-hl">
								systèmes
								<svg viewBox="0 0 320 12" preserveAspectRatio="none">
									<path d="M4,9 C80,3 240,3 316,8" />
								</svg>
							</span>{" "}
							qui font tourner votre business sans vous.
						</h1>
						<p className="s-lead s-hin s-h3d">
							Prospection, relances, devis, reporting : des workflows sur-mesure qui exécutent 24/7 les tâches répétitives de votre opérationnel. Déployés sur votre infrastructure, connectés à vos outils.
						</p>
						<div className="s-hero-cta s-hin s-h4d">
							<Link
								href="/rendez-vous"
								className="s-btn s-btn-primary"
								onClick={() => track("cta_reserver_appel", { location: "home_hero" })}
							>
								Réserver un appel de découverte <span className="arr">→</span>
							</Link>
							<a href="#preuves" className="s-btn s-btn-ghost">
								Voir des systèmes réels
							</a>
						</div>
						<div className="s-hero-note s-hin s-h5d">
							Audit gratuit · 30 min · <b>ROI chiffré sous 60 jours</b>
						</div>
					</div>
				</div>

				{/* WORKFLOW n8n */}
				<div className="s-flow-stage">
					<div className="s-flow">
						<div className="s-flow-bar">
							<span className="d r" />
							<span className="d y" />
							<span className="d g" />
							<span className="fname">pipeline-relance-client.json</span>
							<div className="fright">
								<span className="badge">
									<span className="live" />
									ACTIF
								</span>
							</div>
						</div>
						<div className="s-canvas">
							<svg className="s-wires" viewBox="0 0 1180 430" preserveAspectRatio="none">
								<path className="s-wire s-flowing s-w1" d="M212,84 C245,84 235,200 262,200" />
								<path className="s-wire s-flowing s-w2" d="M212,322 C245,322 235,200 262,200" />
								<path className="s-wire s-flowing s-w3" d="M436,200 C458,200 458,200 480,200" />
								<path className="s-wire s-flowing s-w4" d="M656,192 C690,192 685,92 716,92" />
								<path className="s-wire s-w5" d="M656,208 C690,208 685,312 716,312" />
								<path className="s-wire s-flowing s-w6" d="M886,92 C915,92 915,92 952,92" />
								<path className="s-wire s-w7" d="M886,312 C915,312 915,312 952,312" />
								<circle className="s-pulse" r={4}>
									<animateMotion dur="2.6s" repeatCount="indefinite" begin="3.2s" path="M212,84 C245,84 235,200 262,200 L436,200 C458,200 458,200 480,200" />
								</circle>
								<circle className="s-pulse2" r={4}>
									<animateMotion dur="2.2s" repeatCount="indefinite" begin="4.1s" path="M656,192 C690,192 685,92 716,92 L886,92 C915,92 915,92 952,92" />
								</circle>
								<circle className="s-pulse" r={3.5}>
									<animateMotion dur="3s" repeatCount="indefinite" begin="5s" path="M212,322 C245,322 235,200 262,200" />
								</circle>
							</svg>

							<div className="s-node s-trigger s-n1">
								<div className="s-ntitle"><span className="s-ico">⚡</span>Nouveau lead</div>
								<small>Webhook · formulaire site</small>
							</div>
							<div className="s-node s-trigger s-n2">
								<div className="s-ntitle"><span className="s-ico">⏱</span>Sans réponse 48h</div>
								<small>Déclencheur planifié</small>
							</div>
							<div className="s-node s-action s-n3">
								<div className="s-ntitle"><span className="s-ico">◍</span>Enrichissement</div>
								<small>SIREN · site · LinkedIn</small>
							</div>
							<div className="s-node s-logic s-n4">
								<div className="s-ntitle"><span className="s-ico">⑂</span>Lead qualifié ?</div>
								<small>Score IA ≥ 70</small>
							</div>
							<div className="s-node s-ai s-n5">
								<div className="s-ntitle"><span className="s-ico">✦</span>Message personnalisé</div>
								<small>IA · contexte du lead</small>
							</div>
							<div className="s-node s-action s-n6">
								<div className="s-ntitle"><span className="s-ico">♻</span>Nurturing long terme</div>
								<small>Séquence 5 emails</small>
							</div>
							<div className="s-node s-action s-endnode s-n7">
								<div className="s-ntitle"><span className="s-ico">✉</span>Envoi + RDV</div>
								<small>Email · lien agenda</small>
							</div>
							<div className="s-node s-action s-endnode s-n8">
								<div className="s-ntitle"><span className="s-ico">◈</span>Maj CRM</div>
								<small>Pipeline · étiquettes</small>
							</div>

							<span className="s-branch-label s-bl-yes">OUI</span>
							<span className="s-branch-label s-bl-no">NON</span>
						</div>
						<div className="s-flow-log">
							<span><span className="k">Exécutions ce mois :</span> <span className="v o" ref={execRef}>0</span></span>
							<span className="sep" />
							<span><span className="k">Taux de succès :</span> <span className="v">99,4%</span></span>
							<span className="sep" />
							<span><span className="k">Dernière exécution :</span> <span className="v">il y a 2 min</span></span>
							<span className="sep" />
							<span><span className="k">Intervention humaine :</span> <span className="v">aucune</span></span>
						</div>
					</div>
				</div>

				<div className="s-proof">
					<div className="s-wrap s-proof-in">
						<span className="s-proof-label">Construit avec</span>
						<div className="s-stack">
							<span className="s-stack-item">n8n</span>
							<span className="s-stack-item">Supabase</span>
							<span className="s-stack-item">Next.js</span>
							<span className="s-stack-item">API IA</span>
							<span className="s-stack-item">Intégrations sur-mesure</span>
						</div>
					</div>
				</div>
			</header>

			{/* SOLUTIONS */}
			<section className="s-blk" id="solutions">
				<div className="s-wrap">
					<div className="s-sec-head rv">
						<span className="s-eyebrow">Ce que je construis</span>
						<h2>Des systèmes, pas des gadgets.</h2>
						<p>Chaque brique est déployée sur votre infrastructure, connectée à vos outils, et pensée pour tourner sans supervision.</p>
					</div>
					<div className="s-sol-grid">
						<div className="s-card rv rv-d1" data-id="01">
							<div className="s-cico">◑</div>
							<h3>Pipeline commercial</h3>
							<p>Détection, qualification et relance automatique des prospects jusqu&apos;à la prise de rendez-vous.</p>
						</div>
						<div className="s-card rv rv-d2" data-id="02">
							<div className="s-cico">◈</div>
							<h3>Devis &amp; administratif</h3>
							<p>Génération de devis et factures à partir d&apos;un simple input, format à votre charte, zéro ressaisie.</p>
						</div>
						<div className="s-card rv rv-d3" data-id="03">
							<div className="s-cico">✉</div>
							<h3>Relation client 24/7</h3>
							<p>Réponses, suivis et relances automatisés, même la nuit et le week-end, avec votre ton de voix.</p>
						</div>
						<div className="s-card rv rv-d4" data-id="04">
							<div className="s-cico">✦</div>
							<h3>Agents IA métier</h3>
							<p>Assistants entraînés sur votre contexte pour trier, rédiger et préparer les décisions sur les tâches cadrées.</p>
						</div>
						<div className="s-card rv rv-d5" data-id="05">
							<div className="s-cico">⇄</div>
							<h3>Intégrations</h3>
							<p>Vos outils synchronisés entre eux. Une saisie unique, propagée partout, sans erreur de transfert.</p>
						</div>
						<div className="s-card rv rv-d6" data-id="06">
							<div className="s-cico">◫</div>
							<h3>Reporting automatisé</h3>
							<p>Tableaux de bord alimentés en temps réel. Vous ouvrez, vous lisez, vous décidez. Plus d&apos;export manuel.</p>
						</div>
					</div>
				</div>
			</section>

			{/* PREUVES */}
			<section className="s-blk" id="preuves" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-sec-head rv">
						<span className="s-eyebrow">Réalisations</span>
						<h2>Ce que ça donne concrètement.</h2>
						<p>Pas de photo de banque d&apos;images : des captures réelles et des concepts d&apos;interface assumés comme tels.</p>
					</div>
					<div className="s-shots">
						<div className="s-shot rv rv-d1">
							<div className="s-shot-photo">
								<Image
									src="/images/workflow-n8n-exemple.png"
									alt="Workflow n8n réel : agent IA de création de compte utilisateur"
									fill
									sizes="(max-width: 760px) 100vw, 50vw"
									style={{ objectFit: "cover" }}
								/>
							</div>
							<span className="s-ph-title">Votre workflow n8n complet</span>
							<span className="s-ph-sub">Une vue du canvas avec les nodes connectés d&apos;un pipeline réel. La preuve la plus forte.</span>
						</div>
						<div className="s-shot rv rv-d2">
							<div className="s-dashmock">
								<div className="s-dashmock-bar">
									<span className="d r" /><span className="d y" /><span className="d g" />
									<span>dashboard — concept</span>
								</div>
								<div className="s-dashmock-body">
									<div className="s-dashmock-stats">
										<div className="s-dashmock-stat">
											<div className="n">12</div>
											<div className="l">Automatisations</div>
										</div>
										<div className="s-dashmock-stat">
											<div className="n">98%</div>
											<div className="l">Taux succès</div>
										</div>
									</div>
									<div className="s-dashmock-rows">
										<div className="s-dashmock-row"><span className="dot ok" /> Facture générée cette semaine<span className="t">22</span></div>
										<div className="s-dashmock-row"><span className="dot ok" /> Relance client<span className="t">7</span></div>
										<div className="s-dashmock-row"><span className="dot pending" /> Validation envoi mail<span className="t">1</span></div>
									</div>
								</div>
								<div className="s-dashmock-divider"><span>Validation humaine</span></div>
								<div className="s-dashmock-queue">
									<div className="s-dashmock-ticket">
										<div className="ico"><Mail size={11} /></div>
										<div className="meta">
											<div className="subject">Relance facture #2024-118</div>
											<div className="to">à client@exemple.fr</div>
										</div>
										<div className="s-dashmock-ticket-actions">
											<span className="a validate"><Check size={11} /></span>
											<span className="a edit"><Pencil size={11} /></span>
											<span className="a decline"><X size={11} /></span>
										</div>
									</div>
									<div className="s-dashmock-ticket">
										<div className="ico"><Mail size={11} /></div>
										<div className="meta">
											<div className="subject">Confirmation RDV audit</div>
											<div className="to">à prospect@exemple.fr</div>
										</div>
										<div className="s-dashmock-ticket-actions">
											<span className="a validate"><Check size={11} /></span>
											<span className="a edit"><Pencil size={11} /></span>
											<span className="a decline"><X size={11} /></span>
										</div>
									</div>
								</div>
							</div>
							<span className="s-ph-title">Un dashboard de pilotage</span>
							<span className="s-ph-sub">Concept d&apos;interface pour suivre vos automatisations, avec validation humaine avant chaque envoi sensible.</span>
						</div>
						<div className="s-shot rv rv-d3">
							<div className="s-doc-frame">
								<div className="s-doc-frame-bar">
									<span className="d r" /><span className="d y" /><span className="d g" />
									<span className="fname">devis-final.pdf</span>
									<span className="s-doc-badge"><span className="lbl">Total TTC</span> 18 234 €</span>
								</div>
								<div className="s-doc-frame-img">
									<Image
										src="/images/devis-exemple.png"
										alt="Devis PDF généré automatiquement par l'automatisation"
										fill
										sizes="(max-width: 760px) 100vw, 50vw"
										style={{ objectFit: "cover", objectPosition: "top" }}
									/>
								</div>
							</div>
							<span className="s-ph-title">Un devis généré automatiquement</span>
							<span className="s-ph-sub">Le rendu PDF final d&apos;une automatisation, à côté de son input brut.</span>
						</div>
						<div className="s-shot rv rv-d4">
							<div className="s-statcard">
								<div className="s-statcard-bar">
									<span className="d r" /><span className="d y" /><span className="d g" />
									<span>résultats — concept</span>
								</div>
								<div className="s-statcard-tiles">
									<div className="s-statcard-tile">
										<div className="n">8h</div>
										<div className="l">Récupérées/sem.</div>
									</div>
									<div className="s-statcard-tile">
										<div className="n">156</div>
										<div className="l">Tâches traitées</div>
									</div>
									<div className="s-statcard-tile">
										<div className="n">-73%</div>
										<div className="l">Temps de traitement</div>
									</div>
								</div>
								<div className="s-statcard-chart">
									<svg viewBox="0 0 400 150" fill="none" style={{ width: "100%", height: "100%" }}>
										<defs>
											<linearGradient id="statFill" x1="0" y1="0" x2="0" y2="1">
												<stop offset="0%" stopColor="var(--orange)" stopOpacity="0.28" />
												<stop offset="100%" stopColor="var(--orange)" stopOpacity="0" />
											</linearGradient>
										</defs>
										<path d="M10,20 H390 M10,55 H390 M10,90 H390" stroke="var(--line)" strokeWidth="1" />
										<path
											d="M10,105 L88,88 L166,96 L244,58 L322,42 L390,18 V125 H10 Z"
											fill="url(#statFill)"
										/>
										<path
											d="M10,105 L88,88 L166,96 L244,58 L322,42 L390,18"
											stroke="var(--orange)"
											strokeWidth="2.6"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<circle cx="10" cy="105" r="3.5" fill="var(--orange)" />
										<circle cx="88" cy="88" r="3.5" fill="var(--orange)" />
										<circle cx="166" cy="96" r="3.5" fill="var(--orange)" />
										<circle cx="244" cy="58" r="3.5" fill="var(--orange)" />
										<circle cx="322" cy="42" r="3.5" fill="var(--orange)" />
										<circle cx="390" cy="18" r="9" fill="var(--orange)" opacity="0.18">
											<animate attributeName="r" values="6;11;6" dur="2s" repeatCount="indefinite" />
											<animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
										</circle>
										<circle cx="390" cy="18" r="5" fill="var(--orange)" stroke="var(--s-card)" strokeWidth="2.5" />
										<text x="10" y="142" fontFamily="var(--font-ibm-plex-mono)" fontSize="10" fill="var(--faint)">S1</text>
										<text x="235" y="142" fontFamily="var(--font-ibm-plex-mono)" fontSize="10" fill="var(--faint)">S8</text>
										<text x="378" y="142" fontFamily="var(--font-ibm-plex-mono)" fontSize="10" fill="var(--faint)">S12</text>
									</svg>
								</div>
								<div className="s-statcard-legend">
									<span className="item"><span className="sw" style={{ background: "var(--orange)" }} /> Suivi hebdomadaire</span>
									<span className="item"><span className="sw" style={{ background: "var(--line-strong)" }} /> Tendance sur 12 semaines</span>
								</div>
							</div>
							<span className="s-ph-title">Un résultat chiffré réel</span>
							<span className="s-ph-sub">Heures récupérées, volume traité, temps de réponse : un chiffre issu d&apos;une mission.</span>
						</div>
					</div>
				</div>
			</section>

			{/* METHODE */}
			<section className="s-blk" id="methode" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-sec-head rv">
						<span className="s-eyebrow">Méthode</span>
						<h2>De l&apos;audit au premier gain en 60 jours.</h2>
						<p>Déploiement progressif, résultats mesurables à chaque étape.</p>
					</div>
					<div className="s-steps rv rv-d1">
						<div className="s-step">
							<div className="s-num">ÉTAPE 01</div>
							<h3>Audit &amp; cartographie</h3>
							<p>Identification des tâches chronophages et chiffrage du gain potentiel de chacune. Plan d&apos;action priorisé.</p>
						</div>
						<div className="s-step">
							<div className="s-num">ÉTAPE 02</div>
							<h3>Déploiement par briques</h3>
							<p>Mise en production étape par étape. Chaque système livré tourne avant de passer au suivant.</p>
						</div>
						<div className="s-step">
							<div className="s-num">ÉTAPE 03</div>
							<h3>Maintenance &amp; optimisation</h3>
							<p>Suivi mensuel, ajustements et nouvelles briques selon l&apos;évolution de votre activité.</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="s-blk" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-band rv">
						<span className="s-eyebrow" style={{ justifyContent: "center", marginBottom: 16 }}>
							Appel de découverte · gratuit
						</span>
						<h2>Identifiez vos 3 processus les plus coûteux en 30 minutes.</h2>
						<p>Sans engagement. On analyse votre opérationnel, je vous montre exactement ce qui est automatisable et ce que ça vous rapporterait.</p>
						<Link
							href="/rendez-vous"
							className="s-btn s-btn-primary"
							onClick={() => track("cta_reserver_appel", { location: "home_band" })}
						>
							Réserver mon créneau <span className="arr">→</span>
						</Link>
					</div>
				</div>
			</section>

			{/* FOUNDER */}
			<section className="s-blk" id="qui" style={{ paddingTop: 0 }}>
				<div className="s-wrap">
					<div className="s-founder rv">
						<div className="s-avatar">
							<Image
								src="/images/frederic-mallet.jpg"
								alt="Frédéric Mallet"
								fill
								sizes="110px"
								style={{ objectFit: "cover" }}
							/>
						</div>
						<div>
							<span className="s-role">Fondateur · Synapsis</span>
							<h3>Frédéric Mallet</h3>
							<p>
								J&apos;automatise l&apos;opérationnel des PME, agences et indépendants avec n8n, des intégrations API et des agents IA. Je conçois des systèmes qui libèrent du temps et produisent des résultats mesurables. Vous n&apos;achetez pas une prestation ponctuelle : vous installez une infrastructure qui travaille pour vous en continu.
							</p>
						</div>
					</div>
				</div>
			</section>

			<SiteFooter />
		</>
	);
}
