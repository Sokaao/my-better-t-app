"use client";

import Link from "next/link";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Bridge from "@/components/site/Bridge";
import Icon, { type IconName } from "@/components/site/Icon";
import SiteNavV2 from "@/components/site/SiteNavV2";
import SiteFooter from "@/components/site/SiteFooter";
import s from "@/styles/site.module.css";

// Les six tâches du diagnostic, enrichies du micro-moment qui prouve qu'on connaît
// le métier. Aucune heure ici : le chiffre est ce que le diagnostic donne, pas la page.
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
	{
		label: "Préparer les déclarations de TVA",
		moment: "« Le 12 du mois, quand il manque encore trois dossiers. »",
	},
	{
		label: "Répondre aux mêmes questions clients",
		moment: "« La quinzième fois qu'on vous demande si un repas passe en frais. »",
	},
	{
		label: "Sortir les tableaux de bord et les reportings",
		moment: "« Le reporting que personne n'a le temps de sortir le 5. »",
	},
];

// Ce que produit le système, illustré : le tableau de bord de complétude.
const DOSSIERS = [
	{ name: "Martin SAS", sub: "12 pièces reçues", state: "ok" as const, tag: "Complet" },
	{ name: "Dupont & Fils", sub: "8 pièces reçues", state: "ok" as const, tag: "Complet" },
	{ name: "Garage Lemoine", sub: "Relance envoyée il y a 2 h", state: "wait" as const, tag: "2 pièces" },
	{ name: "SCI des Tilleuls", sub: "6 pièces reçues", state: "ok" as const, tag: "Complet" },
];

// Un seul axe de jours, deux réalités en regard : la comparaison se fait à date égale.
// La suite des jours est strictement croissante, du 1er au 31, et se referme sur
// l'échéance du 10 du mois suivant (ligne de fin, traitée à part).
// `act` : vrai quand le système demande quand même une intervention humaine. C'est le
// décompte de ces points, en bas du tableau, qui porte la démonstration.
const MONTH: { day: string; before: string; after: string; act: boolean }[] = [
	{ day: "le 1er", before: "Un mail groupé au portefeuille.", after: "Chacun reçoit sa liste.", act: false },
	{ day: "le 5", before: "On trie les réponses en vrac.", after: "Les pièces se classent seules.", act: false },
	{ day: "le 10", before: "On cherche qui n'a pas répondu.", after: "L'écran montre qui bloque.", act: false },
	{ day: "le 18", before: "On relance à la main, une par une.", after: "Les relances sont parties seules.", act: false },
	{ day: "le 25", before: "On appelle. Toujours les mêmes.", after: "Trois dossiers à traiter. Pas trente.", act: true },
	{ day: "le 31", before: "On reconstitue depuis le relevé.", after: "Les derniers se complètent seuls.", act: false },
];

// L'offre tient en trois cellules sur l'accueil : le cadrage, l'installation, la
// garantie. Le détail, les autres garanties et le calendrier sont sur /offres.
const OFFER = [
	{
		k: "Le cadrage",
		v: "600 €",
		x: "Relevé, analyse, périmètre et plan chiffré. Facturé à la livraison.",
	},
	{
		k: "L'installation",
		v: "À partir de 4 500 €",
		x: "Chiffrée au cadrage, une fois vos dossiers et vos outils connus.",
	},
	{
		k: "Garantie",
		v: "Remboursé si le temps ne baisse pas",
		x: "Mesuré à J+90 sur un second relevé. Ou je continue gratuitement.",
	},
];

// Les heures ne sont que la facture visible. Ce bloc dit ce qu'elles coûtent vraiment.
// Le conseil qu'on ne fait pas est traité au mouvement 07, pas ici.
// Un seul chiffre, celui qu'on peut rattacher à une étude nommée. Les trois autres
// cartes portent le mécanisme : devant ce public, un nombre sans source coûte plus
// cher qu'il ne rapporte.
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
	{
		icon: "calendrier",
		title: "La période fiscale",
		quote: "Ce qui a traîné toute l'année remonte d'un coup. C'est vous qui rattrapez, le week-end.",
	},
];

// Mouvement 03 : les quatre tentatives que tous les cabinets ont déjà faites, et le
// verdict de chacune. Aucune n'était une erreur : elles butaient toutes sur la même
// chose, ce que dit la bande sombre juste après, dans le même mouvement.
const TRIED: { icon: IconName; title: string; verdict: string }[] = [
	{ icon: "recrutement", title: "Embaucher", verdict: "Le marché est vide." },
	{ icon: "logiciel", title: "Changer de logiciel", verdict: "Un logiciel ne relance personne." },
	{ icon: "portail", title: "La dématérialisation", verdict: "Un portail non plus." },
	{ icon: "tableau", title: "Le tableau de suivi", verdict: "La discipline ne tient pas. Un système, si." },
];

// Mouvement 07 : le temps repris n'est pas du temps libre, c'est de la capacité.
const OPPORTUNITES: { icon: IconName; title: string; text: string }[] = [
	{
		icon: "conseil",
		title: "Le conseil, enfin",
		text: "Prévisionnel, pilotage, accompagnement. Les missions dont on vous parle depuis dix ans.",
	},
	{
		icon: "capacite",
		title: "Le dossier que vous prenez",
		text: "Celui que vous auriez refusé faute de bras.",
	},
	{ icon: "equipe", title: "Une équipe qui reste", text: "Vos collaborateurs arrêtent de courir et font leur métier." },
	{ icon: "campagne",	title: "La campagne qui se passe bien", text: "Les dossiers arrivent complets. Vous révisez au lieu de rattraper.",
	},
];

const CONFORMITE = [
	["Hébergement", "Union européenne, sur votre propre compte."],
	["IA", "Aucune donnée nominative, aucune écriture comptable."],
	["RGPD", "Contrat de sous-traitance art. 28 fourni et signé."],
	["Confidentialité", "Accord signé avant l'audit, donc avant tout accès."],
];

const STACK = ["Cegid", "MyUnisoft", "Pennylane", "ACD", "Agiris", "Silae", "Tiime"];

export default function Accueil() {
	useScrollReveal();

	return (
		<div className={s.page}>
			<SiteNavV2 />

			<main className={s.main}>
				{/* ══ HERO ══ */}
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
							</div>
							<div className={`${s.heroCta} ${s.in} ${s.in3}`}>
								<Link
									href="/diagnostic"
									className={`${s.btn} ${s.btnPrimary}`}
									onClick={() => track("cta_diagnostic", { location: "home_hero" })}
								>
									Lancer le diagnostic <span className={s.arr}>→</span>
								</Link>
								<a href="#mecanisme" className={`${s.btn} ${s.btnGhost}`}>
									Voir comment ça marche
								</a>
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

				{/* ══ MOUVEMENT 01 · Le problème ══
				    Un seul geste : nommer les tâches et laisser le chiffre manquant. C'est le
				    diagnostic qui le donne, pas la page. Pas un mot sur la solution. */}
				<section className={`${s.block} ${s.blockAlt}`} id="probleme">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>01 · Le problème</p>
							<h2>Voilà ce qui remplit vos semaines.</h2>
							<p className={s.sub}>Six tâches. Aucune n&apos;est de la comptabilité.</p>
						</div>

						<div className={`${s.sheet} rv`}>
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
						<p className={`${s.ledgerFoot} rv rv-d1`}>
							Personne ne compte ces heures. C&apos;est pour ça qu&apos;elles ne baissent jamais.
						</p>
						<div className={`${s.heroCta} rv rv-d1`}>
							<Link
								href="/diagnostic"
								className={`${s.btn} ${s.btnPrimary}`}
								onClick={() => track("cta_diagnostic", { location: "home_mouvement_01" })}
							>
								Obtenir mon chiffre en 2 minutes <span className={s.arr}>→</span>
							</Link>
						</div>
						<p className={`${s.heroNote} rv rv-d1`}>
							6 questions · 2 min · aucun email demandé pour voir le résultat
						</p>
					</div>
				</section>

				<Bridge>
					Ces heures ne figurent sur aucun tableau de bord. Et elles coûtent bien plus que du temps.
				</Bridge>

				{/* ══ MOUVEMENT 02 · Les conséquences ══ */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>02 · Les conséquences</p>
							<h2>Ce que ça vous coûte vraiment.</h2>
						</div>

						<div className={`${s.costs} rv rv-d1`}>
							{COSTS.map((c) => (
								<div key={c.title} className={s.cost}>
									<Icon name={c.icon} />
									<span className={s.costTitle}>{c.title}</span>
									<p className={s.costQuote}>{c.quote}</p>
								</div>
							))}
						</div>
						<p className={`${s.sourceNote} rv rv-d2`}>
							<strong>Un cabinet sur deux qui recrute rencontre des difficultés.</strong> Baromètre de
							l&apos;Omeca, Observatoire des métiers de l&apos;expertise comptable, du commissariat aux
							comptes et de l&apos;audit, 2<sup>e</sup> semestre 2025.
						</p>
					</div>
				</section>

				<Bridge>Alors vous avez essayé de régler ça. Au moins quatre fois.</Bridge>

				{/* ══ MOUVEMENT 03 · Ce que vous avez déjà tenté ══
				    Les quatre tentatives, puis la bande qui dit pourquoi aucune ne pouvait tenir. */}
				<section className={`${s.block} ${s.blockAlt}`}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>03 · Ce que vous avez déjà tenté</p>
							<h2>Vous avez déjà essayé.</h2>
						</div>

						<div className={`${s.tried} rv rv-d1`}>
							{TRIED.map((t) => (
								<div key={t.title} className={s.triedCard}>
									<Icon name={t.icon} />
									<span className={s.triedTitle}>{t.title}</span>
									<span className={s.triedVerdict}>{t.verdict}</span>
								</div>
							))}
						</div>

						<div className={`${s.band} ${s.stacked} rv rv-d2`}>
							<h2 className={s.displayHuge}>
								<span className={s.bandMuted}>Ce n&apos;est pas un problème d&apos;organisation.</span>
								<br />
								Et ce n&apos;est pas votre faute.
							</h2>
							<p>
								Aucun logiciel du métier n&apos;a été conçu pour ça. Ils tiennent la comptabilité.{" "}
								<strong>Aucun ne court après un client qui ne répond pas.</strong>
							</p>
						</div>
					</div>
				</section>

				<Bridge>
					Personne n&apos;a jamais construit d&apos;outil pour ce travail-là. Voilà où ça coince.
				</Bridge>

				{/* ══ MOUVEMENT 04 · Ce que je prends en charge ══
				    Le périmètre, la citation qui le résume, et la promesse de non-migration. */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>04 · Ce que je prends en charge</p>
							<h2>Ce que je fais, et ce que je ne fais pas.</h2>
						</div>

						<div className={`${s.does} rv rv-d1`}>
							<div className={`${s.doesCol} ${s.doesYes}`}>
								<h3>Ce que le système fait</h3>
								<ul className={s.doesList}>
									<li><span className={s.sym}>✓</span><span>Relance vos clients, un par un</span></li>
									<li><span className={s.sym}>✓</span><span>Récupère et classe les pièces</span></li>
									<li><span className={s.sym}>✓</span><span>Rappelle les échéances</span></li>
									<li><span className={s.sym}>✓</span><span>Prépare ce qui est mécanique</span></li>
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
									<li><span className={s.sym}>✕</span><span>Aucun accès sans contrat</span></li>
								</ul>
							</div>
						</div>

						<p className={`${s.pullQuote} rv rv-d2`}>
							« Le système ne fait pas de comptabilité.{" "}
							<span className={s.pullQuoteSoft}>Il fait tout ce qui l&apos;entoure.</span> »
						</p>

						<div className={`${s.promiseBox} ${s.stacked} rv rv-d2`}>
							<p className={s.eyebrow}>La question que tout le monde pose en premier</p>
							<p className={s.promiseBig}>Zéro migration. On ne touche pas à votre outil de production.</p>
							<p>
								Le système se branche autour. Personne ne réapprend un logiciel, aucun dossier ne bouge.
							</p>
							<div className={s.stackRow}>
								{STACK.map((tool) => (
									<span key={tool} className={s.chip}>{tool}</span>
								))}
							</div>
						</div>
					</div>
				</section>

				<Bridge>Voilà à quoi ressemble un mois de collecte.</Bridge>

				{/* ══ MOUVEMENT 05 · Un mois, avant et après ══ */}
				<section className={`${s.block} ${s.blockAlt}`} id="mecanisme">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>05 · Un mois, avant et après</p>
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

							{/* La démonstration, recomptée en points : six pleins contre un seul. */}
							<div className={`${s.trackRow} ${s.trackTotal}`}>
								<span className={s.trackDay}>Sur le mois</span>
								<span className={s.trackCell}>
									<span className={s.dots} aria-hidden="true">
										{Array.from({ length: 6 }, (_, i) => (
											<i key={i} className={s.act} />
										))}
									</span>
									<span>
										<b>6 interventions</b> de votre équipe
									</span>
								</span>
								<span className={`${s.trackCell} ${s.trackGood}`}>
									<span className={s.dots} aria-hidden="true">
										<i className={s.act} />
										{Array.from({ length: 5 }, (_, i) => (
											<i key={i} className={s.noAct} />
										))}
									</span>
									<span>
										<b>1 seule</b>, sur les dossiers vraiment bloqués
									</span>
								</span>
							</div>
						</div>
					</div>
				</section>

				<Bridge>Reste à savoir si cette mécanique existe vraiment.</Bridge>

				{/* ══ MOUVEMENT 06 · Sous le capot ══
				    Une seule preuve : la capture d'un pipeline en production. Le calendrier
				    complet d'installation vit désormais sur /methode. */}
				<section className={s.block} id="methode">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>06 · Sous le capot</p>
							<h2>Pour ceux qui veulent vérifier.</h2>
							<p className={s.sub}>
								Vous n&apos;avez rien à comprendre de cet écran, c&apos;est justement le principe. Il est
								là pour montrer que la mécanique existe vraiment.
							</p>
						</div>

						<div className={`${s.shot} rv rv-d1`}>
							<div className={s.shotImg}>
								<Image
									src="/images/workflow-n8n-exemple.png"
									alt="Capture réelle d'un pipeline d'automatisation : les nœuds connectés d'un workflow en production"
									fill
									sizes="(max-width: 68rem) 100vw, 68rem"
									style={{ objectFit: "cover", objectPosition: "top" }}
								/>
							</div>
							<p className={s.shotCap}>
								<b>Un pipeline réel, en production.</b> Chaque bloc est une étape. Déployé sur votre compte,
								à votre nom.
							</p>
						</div>

						<div className={`${s.nextStep} rv rv-d1`}>
							<p className={s.nextStepText}>
								Vous vous demandez comment ça s&apos;installe chez vous, semaine par semaine ?
							</p>
							<Link
								href="/methode"
								className={`${s.btn} ${s.btnPrimary}`}
								onClick={() => track("cta_methode", { location: "home_methode" })}
							>
								Voir la méthode en détail <span className={s.arr}>→</span>
							</Link>
						</div>
					</div>
				</section>

				<Bridge>Voilà ce que ce temps devient.</Bridge>

				{/* ══ MOUVEMENT 07 · Ce que ça ouvre ══ */}
				<section className={`${s.block} ${s.blockAlt}`}>
					<div className={s.wrap}>
						<div className={`${s.secHeadWide} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>07 · Ce que ça ouvre</p>
							<h2>Ce que vous récupérez.</h2>
						</div>

						<div className={`${s.opps} rv rv-d1`}>
							{OPPORTUNITES.map((o) => (
								<div key={o.title} className={s.opp}>
									<Icon name={o.icon} />
									<span className={s.oppTitle}>{o.title}</span>
									<p className={s.oppText}>{o.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<Bridge>Avant de parler d&apos;argent, autant savoir à qui vous avez affaire.</Bridge>

				{/* ══ QUI JE SUIS ══
				    Placé juste avant le prix : c'est là que la question se pose vraiment.
				    Sans référence en cabinet, la personne est la preuve, d'où la note signée. */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={`${s.founder} rv`}>
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
								<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Qui construit ce système</p>

								<p className={s.founderLead}>
									Je construis des automatisations depuis trois ans. Des devis qui se génèrent seuls. Des
									demandes entrantes triées avant qu&apos;un humain les lise, et des nouveaux clients
									accueillis sans que personne s&apos;en occupe.
								</p>

								<p>
									J&apos;ai choisi les cabinets d&apos;expertise comptable parce que j&apos;aime les chiffres
									et les problèmes bien posés, et parce que j&apos;admire les gens qui font sérieusement un
									métier utile. <strong>Le vôtre l&apos;est, et on vous le dit rarement.</strong>
								</p>

								<p>
									Je ne toucherai pas à votre comptabilité, vous la connaissez mieux que moi. Je m&apos;occupe
									de ce qui l&apos;entoure et qui vous prend vos semaines.
								</p>

								<p>
									Je supporte mal le travail à moitié fait. Une relance qui part de travers, un dossier
									oublié : ça me gêne avant que ça vous gêne. C&apos;est pour ça que je vous propose
									d&apos;être remboursé si vous n&apos;y trouvez aucun intérêt. Je ne signe pas un projet que
									je ne compte pas finir.
								</p>

								<p>
									C&apos;est aussi pour ça que tout est installé sur votre compte, à votre nom, avec la
									documentation et les vidéos. Un système dont vous ne détenez pas les clés n&apos;est pas un
									système fini.
								</p>

								<p>
									Je ne prends que trois cabinets d&apos;ici décembre, pour pouvoir m&apos;occuper de chacun
									personnellement.
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

				<Bridge>Reste à savoir ce que ça coûte, et ce que je garantis.</Bridge>

				{/* ══ MOUVEMENT 08 · L'offre ══
				    Le prix en trois cellules, puis la conformité. Le détail des garanties,
				    ce qui est compris et le calendrier vivent sur /offres. La bande
				    conformité reste ici : elle n'existe nulle part ailleurs sur le site. */}
				<section className={s.block} id="offre">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>08 · L&apos;offre</p>
							<h2>Une seule offre, un seul chiffre à tenir.</h2>
						</div>

						<div className={`${s.offer} ${s.stacked} rv rv-d1`}>
							<div className={s.offerTop}>
								<span className={s.offerName}>Zéro Pièce Manquante</span>
								<p className={s.offerPromise}>
									Vos dossiers complets au 10 du mois, sans qu&apos;un collaborateur relance à la main.
								</p>
							</div>

							<div className={s.offerGrid}>
								{OFFER.map((o) => (
									<div key={o.k} className={s.offerCell}>
										<span className={s.offerK}>{o.k}</span>
										<span className={s.offerV}>{o.v}</span>
										<span className={s.offerX}>{o.x}</span>
									</div>
								))}
							</div>

							<div className={s.offerFoot}>
								<p>
									Le détail, les trois garanties et le calendrier complet sont sur la page de
									l&apos;offre.
								</p>
								<Link
									href="/offres"
									className={`${s.btn} ${s.btnPrimary}`}
									onClick={() => track("cta_offre", { location: "home_offre" })}
								>
									Voir l&apos;offre en détail <span className={s.arr}>→</span>
								</Link>
							</div>
						</div>

						{/* Le secret professionnel : un préalable, pas une clause de fin de contrat. */}
						<div className={`${s.band} ${s.stacked} rv rv-d2`}>
							<p className={s.eyebrow}>Secret professionnel et données</p>
							<h2>La question que vous vous posez déjà.</h2>
							<p>
								Vous êtes tenu au secret professionnel sur des données qui ne vous appartiennent pas. Ça se
								règle avant la signature, pas après.
							</p>
							<div className={s.conf}>
								{CONFORMITE.map(([k, v]) => (
									<div key={k} className={s.confCell}>
										<span className={s.confK}>{k}</span>
										<span className={s.confV}>{v}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* ══ CTA FINAL ══ */}
				<section className={`${s.block} ${s.blockAlt}`}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Par où commencer</p>
							<h2>Six questions, deux minutes, votre chiffre.</h2>
							<p className={s.sub}>
								Le résultat s&apos;affiche directement. Aucun email demandé pour le voir.
							</p>
						</div>
						<div className={`${s.heroCta} rv rv-d1`}>
							<Link
								href="/diagnostic"
								className={`${s.btn} ${s.btnPrimary}`}
								onClick={() => track("cta_diagnostic", { location: "home_bas_de_page" })}
							>
								Lancer le diagnostic <span className={s.arr}>→</span>
							</Link>
							<Link
								href="/rendez-vous"
								className={`${s.btn} ${s.btnGhost}`}
								onClick={() => track("cta_reserver_appel", { location: "home_bas_de_page" })}
							>
								Réserver un appel de 30 minutes
							</Link>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter />
		</div>
	);
}
