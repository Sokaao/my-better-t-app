"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Bridge from "@/components/site/Bridge";
import Icon, { type IconName } from "@/components/site/Icon";
import SiteNavV2, { type NavLink } from "@/components/site/SiteNavV2";
import SiteFooter from "@/components/site/SiteFooter";
import s from "@/styles/site.module.css";
import { faqs } from "./faqs";

// La page n'a pas de mouvements numérotés comme l'accueil : elle répond à quatre
// questions, dans l'ordre où on les pose au téléphone. La nav suit cet ordre.
const NAV_LINKS: NavLink[] = [
	{ href: "#prix", label: "Le prix" },
	{ href: "#garanties", label: "Les garanties" },
	{ href: "#calendrier", label: "Le calendrier" },
	{ href: "#faq", label: "Questions" },
];

// Deux temps, deux décisions. Le cadrage se suffit à lui-même, l'installation ne
// se chiffre qu'une fois les dossiers et les outils connus.
const PRIX = [
	{
		k: "Le cadrage",
		v: "600 €",
		x: "Relevé d'une semaine, analyse, périmètre technique et plan chiffré. Livré en sept jours. Facturé à la livraison, donc vous le lisez avant de le payer. Déduit du projet si vous continuez.",
	},
	{
		k: "L'installation",
		v: "À partir de 4 500 €",
		x: "Chiffrée dans le plan du cadrage, une fois vos dossiers et vos outils connus. Moitié à la signature, moitié à la mise en production.",
	},
];

// Ce qui est livré, sans prix ligne à ligne : une valeur qu'on s'attribue soi-même
// ne prouve rien à quelqu'un dont le métier est d'évaluer ce que valent les choses.
const INCLUS = [
	"Le système de collecte et de relance",
	"Le cadrage et le relevé de référence",
	"La bibliothèque de relances prêtes à l'emploi",
	"Le tableau de bord de complétude",
	"La formation, la documentation et les vidéos de passation",
	"La marche à blanc de deux semaines",
	"La surveillance pendant les 90 jours de garantie",
];

// Trois garanties de nature différente, empilées : c'est l'empilement qui rend le
// refus difficile, pas une garantie isolée.
const GARANTIES = [
	{
		k: "Sur vos clients",
		v: "Rien ne part sans votre accord",
		x: "Aucun message n'atteint un de vos clients sans qu'une personne de votre cabinet l'ait validé. Les deux premières semaines, rien ne part du tout.",
	},
	{
		k: "Sur le résultat",
		v: "Si le temps n'a pas baissé, je rembourse",
		x: "Un second relevé d'une semaine à J+90, même équipe et même méthode qu'au cadrage. Aucune baisse mesurée, remboursement intégral de l'installation. Ou je continue gratuitement, à vous de choisir.",
	},
	{
		k: "Sur votre temps",
		v: "Deux heures par semaine, pas plus",
		x: "C'est tout ce que l'installation vous demande. Au-delà, les heures supplémentaires sont à ma charge.",
	},
];

// Le calendrier porte les deux dates qui engagent : le prix au démarrage, le constat
// à J+90. Elles sont marquées d'une pastille, les autres étapes non.
const STEPS: { day: string; title: string; pill: string | null; text: string }[] = [
	{
		day: "J+0",
		title: "Le cadrage démarre",
		pill: "600 €",
		text: "Vos équipes remplissent le relevé d'une semaine.",
	},
	{
		day: "J+7",
		title: "Cadrage livré",
		pill: null,
		text: "Vos chiffres, votre périmètre, le plan chiffré. Il est à vous, même si vous vous arrêtez là.",
	},
	{
		day: "J+21",
		title: "Mise en production",
		pill: null,
		text: "Une heure de formation pour vos collaborateurs. Le système tourne.",
	},
	{
		day: "J+35",
		title: "Fin de la marche à blanc",
		pill: null,
		text: "Deux semaines à blanc avant le premier envoi.",
	},
	{
		day: "J+90",
		title: "Second relevé",
		pill: "le constat",
		text: "Même équipe, même méthode qu'au cadrage. On compare les deux chiffres.",
	},
];

// Les quatre objections qui reviennent avant le prix, traitées en cartes : ce qui ne
// bouge pas dans le cabinet. Faute de pictogramme « bouclier », l'acte professionnel
// reprend celui du document réglementaire.
const REASSURANCES: { icon: IconName; title: string; text: string }[] = [
	{
		icon: "logiciel",
		title: "Zéro migration",
		text: "Vous gardez Cegid, MyUnisoft, Pennylane, ACD, Agiris, Silae. Le système se branche autour, en amont de la production.",
	},
	{
		icon: "reforme",
		title: "Aucun acte professionnel",
		text: "Aucune écriture, aucune révision, aucun avis, aucune signature. Votre déontologie n'est jamais engagée par une machine.",
	},
	{
		icon: "tableau",
		title: "Vos données restent chez vous",
		text: "Tout est déployé sur votre compte, à votre nom, en région Union européenne. Je n'héberge rien.",
	},
	{
		icon: "equipe",
		title: "Zéro dépendance",
		text: "Documentation et vidéos de passation à la livraison. N'importe quel prestataire peut reprendre derrière moi.",
	},
];

// Ce que coûte l'attente : en places, en calendrier, en mois de collecte à la main.
const CADENCE = [
	{
		k: "3 places",
		x: "Trois cabinets d'ici décembre, pour pouvoir m'occuper de chacun personnellement.",
	},
	{
		k: "Avant le 1er décembre",
		x: "Installé avant décembre, le système tourne pour la campagne. Après, c'est un an de retard.",
	},
	{
		k: "Un mois perdu",
		x: "Chaque mois d'attente est un mois de collecte fait à la main.",
	},
	{
		k: "Septembre 2027",
		x: "Vos clients passent à la facture électronique. La collecte d'abord, la migration ensuite.",
	},
];

export default function Offres() {
	useScrollReveal();
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	return (
		<div className={s.page}>
			<SiteNavV2 links={NAV_LINKS} ctaLocation="offre_nav" />

			<main className={s.main}>
				{/* ══ HERO ══
				    Le nom de l'offre en titre, la promesse en panneau teinté, le périmètre
				    en dessous. Le premier bouton mène au diagnostic, pas à l'appel : on ne
				    demande pas trente minutes à quelqu'un qui ne connaît pas encore son
				    chiffre. */}
				<header className={s.hero}>
					<div className={s.wrap}>
						<div className={s.heroIn}>
							<p className={`${s.eyebrow} ${s.in}`}>L&apos;offre</p>
							<h1 className={`${s.in} ${s.in1}`}>Zéro Pièce Manquante</h1>
							<p className={`${s.mechanism} ${s.in} ${s.in2}`}>
								Vos dossiers complets au 10 du mois, sans qu&apos;un collaborateur relance à la main.
							</p>
							<p className={`${s.sub} ${s.in} ${s.in2}`}>
								Je relance vos clients, je récupère les pièces, je les classe. Vous gardez votre
								logiciel.
							</p>
							<div className={`${s.heroCta} ${s.in} ${s.in3}`}>
								<Link
									href="/diagnostic"
									className={`${s.btn} ${s.btnPrimary}`}
									onClick={() => track("cta_diagnostic", { location: "offre_hero" })}
								>
									Commencer par le diagnostic <span className={s.arr}>→</span>
								</Link>
								<Link
									href="/rendez-vous"
									className={`${s.btn} ${s.btnGhost}`}
									onClick={() => track("cta_reserver_appel", { location: "offre_hero" })}
								>
									Réserver 30 minutes
								</Link>
							</div>
							<p className={`${s.heroNote} ${s.in} ${s.in3}`}>
								6 questions · 2 min · aucun email demandé pour voir le résultat
							</p>
						</div>
					</div>
				</header>

				{/* ══ POURQUOI CETTE BRIQUE ══
				    Avant le prix, justifier le périmètre : une offre étroite se défend, elle
				    ne s'excuse pas. */}
				<section className={`${s.block} ${s.blockAlt}`}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Le problème choisi</p>
							<h2>Un seul irritant, précis et mensuel.</h2>
							<p className={s.sub}>
								La collecte des pièces est le seul point de friction à la fois universel, mensuel,
								mesurable et bloquant pour tout le reste. Tant qu&apos;une pièce manque, le dossier
								n&apos;avance pas, et le retard se propage jusqu&apos;à la campagne. C&apos;est aussi
								la brique la moins dépendante de votre outil de production, donc la plus rapide à
								installer.
							</p>
						</div>
					</div>
				</section>

				<Bridge>Ça se vend en deux temps, et vous décidez entre les deux.</Bridge>

				{/* ══ LE PRIX EN DEUX TEMPS ══
				    Une seule carte porte les deux temps et ce qui est compris : séparer le
				    prix de ce qu'il achète obligerait à remonter pour comparer. */}
				<section className={s.block} id="prix">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Prix</p>
							<h2>Le cadrage d&apos;abord. L&apos;installation ensuite, si vous le décidez.</h2>
						</div>

						<div className={`${s.offer} rv rv-d1`}>
							<div className={s.offerGrid}>
								{PRIX.map((p) => (
									<div key={p.k} className={s.offerCell}>
										<span className={s.offerK}>{p.k}</span>
										<span className={s.offerV}>{p.v}</span>
										<span className={s.offerX}>{p.x}</span>
									</div>
								))}
							</div>

							<div className={s.included}>
								<p className={s.includedNote}>
									Pour situer : le budget complet reste une fraction du coût annuel chargé d&apos;un
									collaborateur. Celui que vous cherchez depuis des mois.
								</p>
							</div>

							<div className={s.included}>
								<p className={s.includedLabel}>Compris, sans supplément</p>
								<ul className={s.includedList}>
									{INCLUS.map((v) => (
										<li key={v}>{v}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				<Bridge>Reste à savoir ce qui se passe si ça ne marche pas.</Bridge>

				{/* ══ LES TROIS GARANTIES ══ */}
				<section className={`${s.block} ${s.blockAlt}`} id="garanties">
					<div className={s.wrap}>
						<div className={`${s.band} rv`}>
							<p className={s.eyebrow}>Le risque, renversé</p>
							<h2>Ce projet peut mal tourner de trois façons.</h2>
							<p>J&apos;ai prévu une réponse pour chacune, et elles sont dans le contrat.</p>
							<div className={s.guarantees}>
								{GARANTIES.map((g) => (
									<div key={g.k} className={s.gtype}>
										<span className={s.gtypeK}>{g.k}</span>
										<span className={s.gtypeV}>{g.v}</span>
										<span className={s.gtypeX}>{g.x}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* ══ LE CALENDRIER ══ */}
				<section className={s.block} id="calendrier">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Le déroulement</p>
							<h2>Sept jours pour le cadrage. Trois semaines pour installer.</h2>
						</div>

						<div className={`${s.steps} rv rv-d1`}>
							{STEPS.map((st) => (
								<div key={st.day} className={s.step}>
									<span className={s.stepDay}>{st.day}</span>
									<div className={s.stepBody}>
										<span className={s.stepTitle}>
											{st.title}
											{st.pill ? <span className={s.pill}>{st.pill}</span> : null}
										</span>
										<span className={s.stepText}>{st.text}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ══ QUATRE RÉASSURANCES ══
				    Les quatre « et si » qui bloquent une signature, traités avant qu'ils
				    n'arrivent en FAQ. */}
				<section className={`${s.block} ${s.blockAlt}`}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Ce qui ne bouge pas</p>
							<h2>Votre métier, vos outils, vos données.</h2>
						</div>

						<div className={`${s.opps} rv rv-d1`}>
							{REASSURANCES.map((r) => (
								<div key={r.title} className={s.opp}>
									<Icon name={r.icon} />
									<span className={s.oppTitle}>{r.title}</span>
									<p className={s.oppText}>{r.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ══ POURQUOI MAINTENANT ══ */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={`${s.whyNow} rv`}>
							<p className={s.eyebrow}>Cadence</p>
							<h3 className={s.whyNowTitle}>Attendre coûte plus cher que décider.</h3>
							<div className={s.whyNowGrid}>
								{CADENCE.map((c) => (
									<div key={c.k} className={s.whyNowCell}>
										<span className={s.whyNowK}>{c.k}</span>
										<span className={s.whyNowX}>{c.x}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* ══ FAQ ══
				    Dépliable, une seule ouverte à la fois : la page reste lisible et la
				    question suivante reste à portée d'œil. */}
				<section className={`${s.block} ${s.blockAlt}`} id="faq">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Questions fréquentes</p>
							<h2>Ce qu&apos;on me demande à chaque appel.</h2>
						</div>

						<div className={`${s.faq} rv rv-d1`}>
							{faqs.map((item, i) => {
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

				{/* ══ CTA FINAL ══ */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Par où commencer</p>
							<h2>Le diagnostic d&apos;abord. Il est gratuit et il dure deux minutes.</h2>
							<p className={s.sub}>
								Vous saurez combien d&apos;heures votre cabinet perd sur ces tâches avant même
								qu&apos;on se parle.
							</p>
						</div>
						<div className={`${s.heroCta} rv rv-d1`}>
							<Link
								href="/diagnostic"
								className={`${s.btn} ${s.btnPrimary}`}
								onClick={() => track("cta_diagnostic", { location: "offre_bas_de_page" })}
							>
								Lancer le diagnostic <span className={s.arr}>→</span>
							</Link>
							<Link
								href="/rendez-vous"
								className={`${s.btn} ${s.btnGhost}`}
								onClick={() => track("cta_reserver_appel", { location: "offre_bas_de_page" })}
							>
								Réserver 30 minutes
							</Link>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter />
		</div>
	);
}
