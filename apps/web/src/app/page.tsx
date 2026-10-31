"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Counter from "@/components/site/Counter";
import Icon, { type IconName } from "@/components/site/Icon";
import SiteNavV2 from "@/components/site/SiteNavV2";
import SiteFooter from "@/components/site/SiteFooter";
import { faqs } from "@/app/offres/faqs";
import s from "@/styles/site.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// Accueil. Structure éditoriale empruntée à vccimpact.fr (ligne de chiffres au
// hero, phases numérotées, parcours en cartes, « pourquoi moi » segmenté, FAQ
// compacte, CTA non vendeur), remplie avec le contenu déjà écrit du site. Aucun
// chiffre nouveau : ce qui n'existait pas ailleurs n'est pas apparu ici.
// Cette page a d'abord vécu sur /v3 le temps d'être arbitrée ; la version qu'elle
// remplace est archivée dans /archive-accueil-v2, celle d'avant dans
// /archive-accueil.
// Les passerelles (<Bridge>) ont disparu de cette page : les sections sont assez
// courtes pour s'enchaîner seules, et le composant reste utilisé par /methode et
// /offres.
// ─────────────────────────────────────────────────────────────────────────────

// Les tâches du diagnostic, enrichies du micro-moment qui prouve qu'on connaît le
// métier. Trois seulement, les plus universelles : une grille se lit d'un coup
// d'œil ou ne se lit pas. Aucune heure ici : le chiffre est ce que le diagnostic
// donne, pas la page.
const TASKS = [
	{
		label: "Relancer les clients pour les pièces manquantes",
		moment: "« Le client qui envoie ses pièces le 28 pour une TVA au 15. »",
	},
	{
		label: "Collecter et classer les justificatifs",
		moment: "« La photo floue reçue par WhatsApp un dimanche soir. »",
	},
	{
		label: "Ressaisir les mêmes infos dans plusieurs outils",
		moment: "« La même donnée dans la production, puis dans la paie, puis dans Excel. »",
	},
];

// Ce que produit le système, illustré : le tableau de bord de complétude.
const DOSSIERS = [
	{ name: "Martin SAS", sub: "12 pièces reçues", state: "ok" as const, tag: "Complet" },
	{ name: "Dupont & Fils", sub: "8 pièces reçues", state: "ok" as const, tag: "Complet" },
	{ name: "Garage Lemoine", sub: "Relance envoyée il y a 2 h", state: "wait" as const, tag: "2 pièces" },
	{ name: "SCI des Tilleuls", sub: "6 pièces reçues", state: "ok" as const, tag: "Complet" },
];

// La ligne de chiffres du hero, façon vccimpact. Ce ne sont pas des résultats
// passés : sans référence en cabinet, il n'y en a aucun à publier. Ce sont les
// quatre engagements déjà écrits ailleurs sur le site (marche à blanc dans
// /methode, délai dans /methode, effort et migration dans /offres), et ils
// sont au contrat. Aucun seuil de complétude ici : ce chiffre n'existe nulle
// part ailleurs sur le site, contrairement aux quatre ci-dessous.
const ENGAGEMENTS: { to: number; unit: string; label: string }[] = [
	{ to: 14, unit: " j", label: "de marche à blanc avant le premier envoi" },
	{ to: 21, unit: " j", label: "de la signature à la mise en production" },
	{ to: 2, unit: " h", label: "par semaine demandées, pas plus" },
	{ to: 0, unit: "", label: "migration, aucun changement de logiciel" },
];

// Un seul axe de jours, deux réalités en regard : la comparaison se fait à date égale.
// Quatre jours suffisent à porter la démonstration, du 1er au 31, avant la ligne
// d'échéance du 10 du mois suivant (traitée à part).
// `act` : vrai quand le système demande quand même une intervention humaine. C'est le
// décompte de ces points, en bas du tableau, qui porte la démonstration.
const MONTH: { day: string; before: string; after: string; act: boolean }[] = [
	{ day: "le 1er", before: "Un mail groupé au portefeuille.", after: "Chacun reçoit sa liste.", act: false },
	{ day: "le 10", before: "On cherche qui n'a pas répondu.", after: "L'écran montre qui bloque.", act: false },
	{ day: "le 25", before: "On appelle. Toujours les mêmes.", after: "Trois dossiers à traiter. Pas trente.", act: true },
	{ day: "le 31", before: "On reconstitue depuis le relevé.", after: "Les derniers se complètent seuls.", act: false },
];

// Le total se recompte depuis le tableau lui-même : impossible qu'il dise autre
// chose que ce que le lecteur a sous les yeux.
const MONTH_ACTS = MONTH.filter((m) => m.act).length;

// Les heures ne sont que la facture visible. Ce bloc dit ce qu'elles coûtent vraiment.
// Trois cartes, trois axes distincts : le client, l'équipe, la marge. Aucun chiffre
// sans source : devant ce public, un nombre non sourcé coûte plus cher qu'il ne
// rapporte — la seule statistique de la page est en légende sous la grille.
const COSTS: { icon: IconName; title: string; quote: string }[] = [
	{
		icon: "reforme",
		title: "Le client qui attend",
		quote: "Son bilan est prêt à 90 %. Il manque trois pièces depuis six semaines.",
	},
	{
		icon: "depart",
		title: "Le collaborateur qui part",
		quote: "Il voulait faire de la comptabilité. Il faisait du secrétariat de relance.",
	},
	{
		icon: "honoraires",
		title: "Le forfait qui ne couvre plus",
		quote: "Il a été calculé sur la comptabilité. Pas sur les heures passées à réclamer des pièces.",
	},
];

// Les tentatives que tous les cabinets ont déjà faites, et le verdict de chacune.
// Aucune n'était une erreur : elles butaient toutes sur la même chose, ce que dit
// la section sombre juste après.
const TRIED: { icon: IconName; title: string; verdict: string }[] = [
	{ icon: "recrutement", title: "Embaucher", verdict: "Le marché est vide." },
	{ icon: "logiciel", title: "Changer de logiciel", verdict: "Un logiciel ne relance personne." },
	{ icon: "tableau", title: "Le tableau de suivi", verdict: "La discipline ne tient pas. Un système, si." },
];

// Le parcours en trois temps, repris mot pour mot de ce qui est déjà publié : les
// deux premières cartes viennent de la grille de prix de /offres, la troisième du
// suivi mensuel décrit sur /deroulement. Le montant du suivi n'est publié nulle
// part sur le site : la carte reste courte plutôt que d'avancer un chiffre.
// `footnote` : la seule condition qu'on ne peut pas laisser hors de la carte. Le
// contrat (art. 6.5 et 7.3) n'impute les 600 € du cadrage que si l'installation est
// commandée dans les trois mois suivant la livraison du cadrage — un « déduit du
// projet » sec, sans le délai, promettrait plus que ce qui est signé.
const PARCOURS: {
	n: string;
	title: string;
	lead: string;
	items: string[];
	price: string;
	note?: string;
	footnote?: string;
}[] = [
	{
		n: "01",
		title: "Le cadrage",
		lead: "Relevé, analyse, périmètre et plan chiffré.",
		items: ["Le relevé et l'analyse", "Le périmètre technique", "Le plan chiffré"],
		price: "600 €",
		note: "Facturé à la livraison.",
	},
	{
		n: "02",
		title: "L'installation",
		lead: "Chiffrée au cadrage, une fois vos dossiers et vos outils connus.",
		items: [
			"Le système de collecte et de relance",
			"Le tableau de bord de complétude",
			"La formation, la documentation et les vidéos de passation",
		],
		price: "À partir de 4 500 €",
		note: "Chiffrée au cadrage.",
		footnote:
			"Les 600 € du cadrage sont déduits de ce montant si l'installation est commandée dans les trois mois suivant sa livraison.",
	},
	{
		n: "03",
		title: "Le suivi",
		lead: "Point mensuel, ajustements et nouvelles briques selon l'évolution de votre activité.",
		items: [],
		price: "Abonnement mensuel",
	},
];

const STACK = ["Cegid", "MyUnisoft", "Pennylane", "ACD", "Agiris", "Silae", "Tiime"];

// Les cinq questions qui bloquent une signature dans cette profession : les clients,
// les données, l'IA, l'outil de production, la dépendance. Elles sont reprises telles
// quelles du fichier partagé avec /offres, qui les publie aussi en données
// structurées : deux formulations pour une même réponse finiraient par diverger.
const FAQ_ORDER = [
	"Mes clients vont-ils recevoir des messages sans que je le sache ?",
	"Où sont hébergées les données de mes clients ?",
	"Est-ce que mes données passent dans une IA ?",
	"Est-ce compatible avec mon outil de production ?",
	"Que se passe-t-il si vous arrêtez votre activité ?",
];

const FAQ_ACCUEIL = FAQ_ORDER.map((q) => faqs.find((f) => f.q === q)).filter(
	(f): f is (typeof faqs)[number] => f !== undefined,
);

// Les deux lignes de cadence reprises de /offres, celles qui portent une échéance.
const CADENCE = [
	{
		k: "3 places",
		x: "Trois cabinets d'ici décembre, pour pouvoir m'occuper de chacun personnellement.",
	},
	{
		k: "Avant le 1er décembre",
		x: "Installé avant décembre, le système tourne pour la campagne. Après, c'est un an de retard.",
	},
];

export default function Accueil() {
	useScrollReveal();
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	return (
		<div className={`${s.page} ${s.v3}`}>
			<SiteNavV2 />

			<main className={s.main}>
				{/* ══ HERO ══
				    Même bannière de titre et même panneau produit que l'accueil. Le seul
				    ajout est la ligne de quatre chiffres : des engagements contractuels,
				    pas des résultats passés. */}
				<header className={s.hero}>
					<div className={s.wrap}>
						<div className={s.heroTop}>
							<p className={`${s.eyebrow} ${s.in}`}>Cabinets d&apos;expertise comptable · 1 à 15 collaborateurs</p>
							<h1 className={`${s.in} ${s.in1}`}>
								<span className={s.heroLine}>Vous n&apos;avez pas fait 7 ans d&apos;études pour</span>{" "}
								<span className={s.heroLine}>
									<span className={s.hl}>
										relancer des gens
										<svg viewBox="0 0 320 12" preserveAspectRatio="none" aria-hidden="true">
											<path d="M4,9 C80,3 240,3 316,8" />
										</svg>
									</span>
									.
								</span>
							</h1>
						</div>

						<div className={s.heroGrid}>
						<div className={s.heroIn}>
							<div className={`${s.mechanism} ${s.in} ${s.in2}`}>
								<p className={s.mechanismLead}>Je vous crée un système qui :</p>
								<ul className={s.mechanismList}>
									<li>relance vos clients</li>
									<li>récupère les pièces</li>
									<li>les classe automatiquement</li>
								</ul>
								<p className={s.mechanismEnd}>Vous ne changez aucun de vos outils.</p>
								<p className={s.mechanismEndSoft}>Vos équipes ressaisissent moins, donc se trompent moins.</p>
							</div>

							<div className={`${s.heroPledge} ${s.in} ${s.in3}`}>
								<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Ce sur quoi je m&apos;engage, par contrat</p>
								<div className={s.heroStats}>
									{ENGAGEMENTS.map((e) => (
										<div key={e.label} className={s.heroStat}>
											<span className={s.heroStatN}>
												<Counter to={e.to} />
												{e.unit}
											</span>
											<span className={s.heroStatL}>{e.label}</span>
										</div>
									))}
								</div>
							</div>

							<div className={`${s.heroCta} ${s.in} ${s.in3}`}>
								<Link
									href="/diagnostic"
									className={`${s.btn} ${s.btnPrimary}`}
									onClick={() => track("cta_diagnostic", { location: "home_hero" })}
								>
									Lancer le diagnostic <span className={s.arr}>→</span>
								</Link>
								<Link
									href="/rendez-vous"
									className={`${s.btn} ${s.btnGhost}`}
									onClick={() => track("cta_reserver_appel", { location: "home_hero" })}
								>
									Réserver un appel
								</Link>
							</div>
							<p className={`${s.heroNote} ${s.in} ${s.in3}`}>
								6 questions · 2 min · <b>aucun email demandé pour voir le résultat</b>
							</p>
						</div>

						{/* Le livrable, montré : le tableau de bord de complétude. */}
						<div className={`${s.panel} ${s.in} ${s.in4}`}>
							<div className={s.panelHead}>
								<span className={s.panelTitle}>État des dossiers</span>
								<span className={s.panelDate}>10 septembre</span>
							</div>
							<div className={s.panelGauge}>
								<div className={s.ring}>
									<svg className={s.ringSvg} viewBox="0 0 80 80" aria-hidden="true">
										<circle className={s.ringTrack} cx="40" cy="40" r="34" />
										<circle className={s.ringValue} cx="40" cy="40" r="34" />
									</svg>
									<span className={s.ringLabel}>92 %</span>
								</div>
								<div className={s.gaugeText}>
									<span className={s.gaugeBig}>46 dossiers sur 50</span>
									<span className={s.gaugeSmall}>
										complets au 10 du mois.
										<br />
										Aucune relance envoyée à la main.
									</span>
								</div>
							</div>
							<div className={s.panelRows}>
								{DOSSIERS.map((d) => (
									<div key={d.name} className={s.panelRow}>
										<span className={`${s.dot} ${d.state === "wait" ? s.dotWait : ""}`} />
										<span className={s.rowName}>
											{d.name}
											<span className={s.rowSub}>{d.sub}</span>
										</span>
										<span className={d.state === "wait" ? s.tagWait : s.tagOk}>{d.tag}</span>
									</div>
								))}
							</div>
							<p className={s.panelFoot}>Exemple de tableau de bord livré avec le système</p>
						</div>
						</div>
					</div>

				<a href="#probleme" className={s.scrollCue} aria-label="Aller à la section suivante">
					<span>Le problème</span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
						<path d="M12 5v14M6 13l6 6 6-6" />
					</svg>
				</a>
			</header>

				{/* ══ VOUS RECONNAISSEZ-VOUS ? ══
				    Trois phases numérotées, trois grilles de trois. Aucun bouton ici : le
				    seul appel à l'action de la page vit au hero, et le dernier en bas. */}
				<section className={`${s.block} ${s.blockAlt}`} id="probleme">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Vous reconnaissez-vous ?</p>
							<h2>Trois signes qui ne trompent pas.</h2>
							<p className={s.sub}>Si vous cochez les trois, ce n&apos;est pas un hasard.</p>
						</div>

						{/* ── Phase 01 ── */}
						<div className={`${s.phaseBlock} rv`}>
							<span className={s.phaseBadge} aria-hidden="true">01</span>
							<h3 className={s.phaseTitle}>Ce qui remplit vos semaines</h3>
							<div className={s.phaseBody}>
								<p className={s.sub}>Trois tâches. Aucune n&apos;est de la comptabilité.</p>

								<div className={s.sheet}>
									<p className={s.sheetHead}>Relevé hebdomadaire · par personne</p>

									<ul className={s.sheetGrid}>
										{TASKS.map((t) => (
											<li key={t.label} className={s.sheetItem}>
												<span className={s.sheetCheck} aria-hidden="true" />
												<span className={s.sheetText}>
													<span className={s.sheetTask}>{t.label}</span>
													<span className={s.sheetMoment}>{t.moment}</span>
												</span>
											</li>
										))}
									</ul>

									<p className={s.sheetTotal}>
										<span className={s.sheetTotalLabel}>Total, chaque semaine</span>
										<span className={s.sheetLeader} aria-hidden="true" />
										<span className={s.sheetUnknown}>?</span>
									</p>
								</div>
							</div>
						</div>

						{/* ── Phase 02 ── */}
						<div className={`${s.phaseBlock} rv`}>
							<span className={s.phaseBadge} aria-hidden="true">02</span>
							<h3 className={s.phaseTitle}>Ce que ça coûte vraiment</h3>
							<div className={s.phaseBody}>
								<div className={s.costs}>
									{COSTS.map((c) => (
										<div key={c.title} className={s.cost}>
											<Icon name={c.icon} />
											<span className={s.costTitle}>{c.title}</span>
											<p className={s.costQuote}>{c.quote}</p>
										</div>
									))}
								</div>
								<p className={s.sourceNote}>
									<strong>Un cabinet sur deux qui recrute rencontre des difficultés.</strong> Baromètre de
									l&apos;Omeca, Observatoire des métiers de l&apos;expertise comptable, du commissariat aux
									comptes et de l&apos;audit, 2<sup>e</sup> semestre 2025.
								</p>
							</div>
						</div>

						{/* ── Phase 03 ── */}
						<div className={`${s.phaseBlock} rv`}>
							<span className={s.phaseBadge} aria-hidden="true">03</span>
							<h3 className={s.phaseTitle}>Ce que vous avez déjà tenté</h3>
							<div className={s.phaseBody}>
								<div className={s.tried}>
									{TRIED.map((t) => (
										<div key={t.title} className={s.triedCard}>
											<Icon name={t.icon} />
											<span className={s.triedTitle}>{t.title}</span>
											<span className={s.triedVerdict}>{t.verdict}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ══ LE CONSTAT ══
				    Le pivot de la page : il ne conclut pas une phase, il répond aux trois.
				    D'où la section autonome, à fond plein cadre, plutôt qu'une carte nichée
				    au bas du mouvement précédent. Un seul élément orange : l'intertitre. */}
				<section className={`${s.block} ${s.blockDark}`}>
					<div className={s.wrap}>
						<div className={`${s.pivot} rv`}>
							<p className={s.eyebrow}>Le constat</p>
							<h2 className={s.displayHuge}>
								<span className={s.bandMuted}>Ce n&apos;est pas un problème d&apos;organisation.</span>
								<br />
								Et ce n&apos;est pas votre faute.
							</h2>
							<p className={s.pivotText}>
								Aucun logiciel du métier n&apos;a été conçu pour ça. Ils tiennent la comptabilité.{" "}
								<strong>Aucun ne court après un client qui ne répond pas.</strong>
							</p>
						</div>
					</div>
				</section>

				{/* ══ LE PARCOURS ══
				    Trois temps, trois décisions distinctes. Le détail des garanties et le
				    calendrier complet vivent sur /offres : ici, ce qui est livré et ce que
				    ça coûte, rien de plus. */}
				<section className={s.block} id="offre">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Le parcours</p>
							<h2>Le cadrage d&apos;abord. L&apos;installation ensuite, si vous le décidez.</h2>
							<p className={s.sub}>
								Zéro Pièce Manquante : vos dossiers complets au 10 du mois, sans qu&apos;un collaborateur
								relance à la main.
							</p>
						</div>

						<div className={`${s.pathGrid} rv rv-d1`}>
							{PARCOURS.map((p) => (
								<article key={p.n} className={s.pathCard}>
									<span className={s.pathNum} aria-hidden="true">{p.n}</span>
									<h3 className={s.pathTitle}>{p.title}</h3>
									<p className={s.pathLead}>{p.lead}</p>
									{p.items.length > 0 ? (
										<ul className={s.pathList}>
											{p.items.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									) : null}
									<span className={s.pathPrice}>
										{p.price}
										{p.footnote ? (
											<sup className={s.pathStar} aria-hidden="true">
												*
											</sup>
										) : null}
									</span>
									{p.note ? <span className={s.pathNote}>{p.note}</span> : null}
									{p.footnote ? (
										<span className={s.pathFootnote}>
											<span aria-hidden="true">* </span>
											{p.footnote}
										</span>
									) : null}
									<Link
										href="/offres"
										className={s.pathLink}
										onClick={() => track("cta_offre", { location: "home_parcours" })}
									>
										Détail <span className={s.arr}>→</span>
									</Link>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* ══ CE QUI EST INCLUS ══
				    Une seule idée : le périmètre. Ce que le système fait, ce qu'il ne fait
				    pas, ce à quoi on ne touche pas, et la phrase qui dit ce que le temps
				    repris devient. */}
				<section className={`${s.block} ${s.blockAlt}`}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Ce qui est inclus</p>
							<h2>Ce que je fais, et ce que je ne fais pas.</h2>
						</div>

						<div className={`${s.does} rv rv-d1`}>
							<div className={`${s.doesCol} ${s.doesYes}`}>
								<h3>Ce que le système fait</h3>
								<ul className={s.doesList}>
									<li><span className={s.sym}>✓</span><span>Relance vos clients, un par un</span></li>
									<li><span className={s.sym}>✓</span><span>Récupère et classe les pièces</span></li>
									<li><span className={s.sym}>✓</span><span>Rappelle les échéances</span></li>
									<li><span className={s.sym}>✓</span><span>Vous signale les dossiers bloqués</span></li>
								</ul>
							</div>
							<div className={`${s.doesCol} ${s.doesNo}`}>
								<h3>Ce qu&apos;il ne fait pas</h3>
								<ul className={s.doesList}>
									<li><span className={s.sym}>✕</span><span>Aucune écriture</span></li>
									<li><span className={s.sym}>✕</span><span>Aucune révision</span></li>
									<li><span className={s.sym}>✕</span><span>Aucun avis, aucune signature</span></li>
									<li><span className={s.sym}>✕</span><span>Aucun envoi sans votre validation</span></li>
								</ul>
							</div>
						</div>

						<p className={`${s.pullQuote} rv rv-d2`}>
							« Le système ne fait pas de comptabilité.{" "}
							<span className={s.pullQuoteSoft}>Il fait tout ce qui l&apos;entoure.</span> »
						</p>

						<div className={`${s.promiseBox} ${s.stacked} rv rv-d2`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>La question que tout le monde pose en premier</p>
							<p className={s.promiseBig}>Zéro migration. On ne touche pas à votre outil de production.</p>
							<div className={s.stackRow}>
								{STACK.map((tool) => (
									<span key={tool} className={s.chip}>{tool}</span>
								))}
							</div>
						</div>

						<p className={`${s.closing} rv rv-d2`}>
							Le temps repris n&apos;est pas du temps libre, c&apos;est de la capacité : le dossier que vous
							auriez refusé faute de bras, et des collaborateurs qui arrêtent de courir et font leur métier.
						</p>
					</div>
				</section>

				{/* ══ POURQUOI MOI ══
				    La même note signée que sur l'accueil, mot pour mot, mais segmentée
				    par des sous-titres et allégée d'une phrase mise en exergue. */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Pourquoi moi</p>
							<h2>Pas une agence. Un système qui tourne chez vous.</h2>
						</div>

						<div className={`${s.founder} rv rv-d1`}>
							<div className={s.founderAside}>
								<div className={s.founderPhoto}>
									<Image
										src="/images/frederic-mallet.jpg"
										alt="Frédéric Mallet, fondateur de Synapsis"
										fill
										sizes="(max-width: 46rem) 112px, 224px"
										style={{ objectFit: "cover" }}
									/>
								</div>
								<span className={s.founderName}>
									Frédéric <b>MALLET</b>
								</span>
								<span className={s.founderRole}>Fondateur de Synapsis</span>
							</div>

							<div className={s.founderBody}>
								<p className={s.founderLead}>
									Je construis des automatisations depuis trois ans. Des devis qui se génèrent seuls. Des
									demandes entrantes triées avant qu&apos;un humain les lise, et des nouveaux clients
									accueillis sans que personne s&apos;en occupe.
								</p>

								<span className={s.founderSubhead}>Pourquoi les cabinets d&apos;expertise comptable</span>

								<p>
									J&apos;ai choisi les cabinets d&apos;expertise comptable parce que j&apos;aime les chiffres
									et les problèmes bien posés, et parce que j&apos;admire les gens qui font sérieusement un
									métier utile. <strong>Le vôtre l&apos;est, et on vous le dit rarement.</strong>
								</p>

								<span className={s.founderSubhead}>Ce qui me tient</span>

								<p className={s.pullQuoteSmall}>Je supporte mal le travail à moitié fait.</p>

								<p>
									Une relance qui part de travers, un dossier oublié : ça me gêne avant que ça vous gêne.
									C&apos;est pour ça que je vous propose d&apos;être remboursé si vous n&apos;y trouvez aucun
									intérêt. Je ne signe pas un projet que je ne compte pas finir.
								</p>

								<p>
									C&apos;est aussi pour ça que tout est installé sur votre compte, à votre nom, avec la
									documentation et les vidéos. Un système dont vous ne détenez pas les clés n&apos;est pas un
									système fini.
								</p>

								<span className={s.founderSign}>
									Frédéric MALLET
									<svg viewBox="0 0 320 12" preserveAspectRatio="none" aria-hidden="true">
										<path d="M4,9 C80,3 240,3 316,8" />
									</svg>
								</span>
							</div>
						</div>
					</div>
				</section>

				{/* ══ DES RÉSULTATS, PAS DES PROMESSES ══
				    À la place des cas clients chiffrés de vccimpact, qui n'existent pas
				    ici : le mécanisme, jour par jour, et le décompte des interventions. */}
				<section className={`${s.block} ${s.blockAlt}`} id="mecanisme">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Des résultats, pas des promesses</p>
							<h2>Le même mois, vécu deux fois.</h2>
						</div>

						<div className={`${s.track} rv rv-d1`}>
							<div className={`${s.trackRow} ${s.trackHead}`}>
								<span className={s.trackDay} />
								<span className={s.trackCol}>
									Aujourd&apos;hui <em>à la main</em>
								</span>
								<span className={`${s.trackCol} ${s.trackColGood}`}>
									Avec le système <em>automatique</em>
								</span>
							</div>

							{MONTH.map((m) => (
								<div key={m.day} className={s.trackRow}>
									<span className={s.trackDay}>{m.day}</span>
									<span className={s.trackCell}>
										<i className={s.act} aria-hidden="true" />
										{m.before}
									</span>
									<span className={s.trackCell}>
										{m.act ? <i className={s.act} aria-hidden="true" /> : <i className={s.noAct} aria-hidden="true" />}
										{m.after}
									</span>
								</div>
							))}

							{/* Ligne d'échéance : la date où tout se joue, hors du mois de collecte. */}
							<div className={`${s.trackRow} ${s.trackEnd}`}>
								<span className={s.trackDay}>le 10 du mois suivant</span>
								<span className={s.trackCell}>La TVA part avec des dossiers incomplets.</span>
								<span className={`${s.trackCell} ${s.trackGood}`}>Les dossiers sont complets.</span>
							</div>

							{/* La démonstration, recomptée en points depuis le tableau lui-même. */}
							<div className={`${s.trackRow} ${s.trackTotal}`}>
								<span className={s.trackDay}>Sur le mois</span>
								<span className={s.trackCell}>
									<span className={s.dots} aria-hidden="true">
										{MONTH.map((m) => (
											<i key={m.day} className={s.act} />
										))}
									</span>
									<span>
										<b>{MONTH.length} interventions</b> de votre équipe
									</span>
								</span>
								<span className={`${s.trackCell} ${s.trackGood}`}>
									<span className={s.dots} aria-hidden="true">
										{MONTH.map((m) => (
											<i key={m.day} className={m.act ? s.act : s.noAct} />
										))}
									</span>
									<span>
										<b>{MONTH_ACTS === 1 ? "1 seule" : `${MONTH_ACTS} seulement`}</b>, sur les dossiers
										vraiment bloqués
									</span>
								</span>
							</div>
						</div>
					</div>
				</section>

				{/* ══ FAQ ══
				    Les cinq questions qui bloquent une signature, dépliables, une seule
				    ouverte à la fois. Le dessin est celui du reste de la page : une suite
				    de lignes séparées par un filet, sans carte ni ombre. */}
				<section className={s.block} id="faq">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Questions fréquentes</p>
							<h2>Ce qu&apos;on me demande à chaque appel.</h2>
						</div>

						<div className={`${s.faq} rv rv-d1`}>
							{FAQ_ACCUEIL.map((item, i) => {
								const isOpen = openFaq === i;
								return (
									<div key={item.q} className={`${s.faqItem}${isOpen ? ` ${s.faqOpen}` : ""}`}>
										<button
											type="button"
											className={s.faqQ}
											aria-expanded={isOpen}
											onClick={() => setOpenFaq(isOpen ? null : i)}
										>
											<span>{item.q}</span>
											<span className={s.faqSign} aria-hidden="true" />
										</button>
										<div className={s.faqPanel}>
											<div className={s.faqPanelIn}>
												<p className={s.faqA}>{item.a}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* ══ CTA FINAL ══
				    Fond plein cadre sombre, comme le constat : la page s'ouvre et se ferme
				    sur les deux seuls moments où l'on demande quelque chose. Un seul accent
				    orange ici, le bouton : la cadence passe en clair sur sombre. */}
				<section className={`${s.block} ${s.blockDark}`}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Prêt à avancer ?</p>
							<h2>Discutons de votre cabinet.</h2>
						</div>

						<div className={`${s.whyNow} rv rv-d1`}>
							<div className={s.whyNowGrid}>
								{CADENCE.map((c) => (
									<div key={c.k} className={s.whyNowCell}>
										<span className={s.whyNowK}>{c.k}</span>
										<span className={s.whyNowX}>{c.x}</span>
									</div>
								))}
							</div>
						</div>

						<div className={`${s.heroCta} ${s.stacked} rv rv-d2`}>
							<Link
								href="/diagnostic"
								className={`${s.btn} ${s.btnPrimary}`}
								onClick={() => track("cta_diagnostic", { location: "home_bas_de_page" })}
							>
								Commencer par le diagnostic <span className={s.arr}>→</span>
							</Link>
							<Link
								href="/rendez-vous"
								className={`${s.btn} ${s.btnGhost}`}
								onClick={() => track("cta_reserver_appel", { location: "home_bas_de_page" })}
							>
								Ou réservez 30 minutes avec moi <span className={s.arr}>→</span>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter />
		</div>
	);
}
