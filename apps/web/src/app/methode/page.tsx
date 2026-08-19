"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Bridge from "@/components/site/Bridge";
import Icon, { type IconName } from "@/components/site/Icon";
import SiteNavV2, { type NavLink } from "@/components/site/SiteNavV2";
import SiteFooter from "@/components/site/SiteFooter";
import s from "@/styles/site.module.css";

// La page suit le calendrier réel, dans l'ordre où le cabinet le vit. La nav
// reprend les quatre étapes, pas des thèmes : on se repère dans le temps.
const NAV_LINKS: NavLink[] = [
	{ href: "#cadrage", label: "Le cadrage" },
	{ href: "#installation", label: "L'installation" },
	{ href: "#blanc", label: "La marche à blanc" },
	{ href: "#constat", label: "Le constat" },
];

// Ce que le cadrage produit. Aucun prix ligne à ligne : c'est la page offre qui
// porte les montants, celle-ci porte le contenu du livrable.
const LIVRABLES = [
	"Le relevé d'une semaine, dépouillé et analysé",
	"Le périmètre technique, vérifié avec vos outils",
	"Le plan chiffré de l'installation, à prix ferme",
	"L'ordre dans lequel les briques s'installent",
];

// Les trois semaines d'installation, datées. La seule pastille marque le moment
// où le cabinet donne du temps : une heure, une seule fois.
const INSTALLATION: { day: string; title: string; pill: string | null; text: string }[] = [
	{
		day: "J+0",
		title: "Signature et démarrage",
		pill: null,
		text: "Vous fournissez les accès et désignez un référent.",
	},
	{
		day: "J+7",
		title: "Premières relances construites",
		pill: null,
		text: "Les scénarios du cadrage prennent forme, dossier par dossier.",
	},
	{
		day: "J+14",
		title: "Connexion à vos canaux",
		pill: null,
		text: "Boîte mail, espace de dépôt, arborescence de classement.",
	},
	{
		day: "J+21",
		title: "Mise en production",
		pill: "1 h de formation",
		text: "Le système tourne. Documentation et vidéos de passation remises.",
	},
];

// Ce que le projet coûte au cabinet en temps et en attention. La question se pose
// toujours, autant y répondre avant qu'elle soit posée.
const VOTRE_PART: { icon: IconName; title: string; text: string }[] = [
	{
		icon: "calendrier",
		title: "Vous, deux heures par semaine",
		text: "Pendant l'installation seulement. Au-delà, les heures supplémentaires sont à ma charge.",
	},
	{
		icon: "equipe",
		title: "Vos collaborateurs, une semaine et une heure",
		text: "Une semaine de relevé au démarrage, une heure de formation à la mise en production.",
	},
	{
		icon: "recrutement",
		title: "Un référent désigné",
		text: "Une personne qui valide les paramétrages et les messages. Toujours la même.",
	},
	{
		icon: "logiciel",
		title: "Vos accès, sous cinq jours",
		text: "Rien d'autre. Votre outil de production n'est pas touché.",
	},
];

export default function Methode() {
	useScrollReveal();

	return (
		<div className={s.page}>
			<SiteNavV2 links={NAV_LINKS} ctaLocation="methode_nav" />

			<main className={s.main}>
				{/* ══ HERO ══
				    Le calendrier complet en une phrase, avant le détail. Le premier bouton
				    mène au diagnostic : on ne demande pas de rendez-vous à quelqu'un qui ne
				    connaît pas encore son chiffre. */}
				<header className={s.hero}>
					<div className={s.wrap}>
						<div className={s.heroIn}>
							<p className={`${s.eyebrow} ${s.in}`}>La méthode</p>
							<h1 className={`${s.in} ${s.in1}`}>Comment ça se passe, semaine par semaine.</h1>
							<p className={`${s.mechanism} ${s.in} ${s.in2}`}>
								Sept jours pour le cadrage, trois semaines pour installer, trois mois pour mesurer.
							</p>
							<p className={`${s.sub} ${s.in} ${s.in2}`}>
								Voilà le détail de chaque étape, et exactement ce qu&apos;elle demande à votre cabinet.
							</p>
							<div className={`${s.heroCta} ${s.in} ${s.in3}`}>
								<Link
									href="/diagnostic"
									className={`${s.btn} ${s.btnPrimary}`}
									onClick={() => track("cta_diagnostic", { location: "methode_hero" })}
								>
									Lancer le diagnostic <span className={s.arr}>→</span>
								</Link>
								<Link
									href="/offres"
									className={`${s.btn} ${s.btnGhost}`}
									onClick={() => track("cta_offre", { location: "methode_hero" })}
								>
									Voir l&apos;offre
								</Link>
							</div>
						</div>
					</div>
				</header>

				{/* ══ ÉTAPE 1 · LE CADRAGE ══
				    Le relevé d'abord : il fixe le chiffre de départ, donc il rend la garantie
				    de résultat mesurable. Sans lui, il n'y a rien à comparer à J+90. */}
				<section className={s.block} id="cadrage">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Étape 1 · Sept jours</p>
							<h2>Le cadrage</h2>
							<p className={s.sub}>
								Vos équipes remplissent un relevé pendant une semaine. À chaque fois qu&apos;un
								collaborateur relance un client ou cherche une pièce, il note la tâche et la durée.
								C&apos;est votre point de départ chiffré, et c&apos;est aussi ce qui rendra la garantie
								mesurable trois mois plus tard.
							</p>
						</div>

						{/* La liste des livrables est portée par une carte .offer : .included ne
						    dessine qu'un filet de séparation, il lui faut un cadre pour ne pas
						    flotter, et .offer .included:last-child escamote justement ce filet. */}
						<div className={`${s.offer} rv rv-d1`}>
							<div className={s.included}>
								<p className={s.includedLabel}>Ce que vous recevez</p>
								<ul className={s.includedList}>
									{LIVRABLES.map((l) => (
										<li key={l}>{l}</li>
									))}
								</ul>
								<p className={s.includedNote}>
									Livré en sept jours, facturé à la livraison. Vous le lisez avant de le payer, et il
									reste à vous même si vous vous arrêtez là.
								</p>
							</div>
						</div>
					</div>
				</section>

				<Bridge>Si le plan vous convient, on installe.</Bridge>

				{/* ══ ÉTAPE 2 · L'INSTALLATION ══ */}
				<section className={`${s.block} ${s.blockAlt}`} id="installation">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Étape 2 · Trois semaines</p>
							<h2>L&apos;installation</h2>
							<p className={s.sub}>
								Je construis le système sur votre compte n8n Cloud, ouvert à votre nom. Vous
								n&apos;installez rien, vous ne changez pas de logiciel, et personne dans votre cabinet
								ne réapprend un outil.
							</p>
						</div>

						<div className={`${s.steps} rv rv-d1`}>
							{INSTALLATION.map((st) => (
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

				<Bridge>Et rien ne part encore chez vos clients.</Bridge>

				{/* ══ ÉTAPE 3 · LA MARCHE À BLANC ══
				    L'objection arrive toujours ici : « et si la machine écrit n'importe quoi
				    à mon client ? ». La réponse est encadrée, pas noyée dans un paragraphe. */}
				<section className={s.block} id="blanc">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Étape 3 · Deux semaines</p>
							<h2>La marche à blanc</h2>
							<p className={s.sub}>
								Pendant quatorze jours, le système tourne mais n&apos;envoie rien. Chaque jour, il vous
								montre ce qu&apos;il aurait envoyé, à qui, et pourquoi. Vous lisez, vous corrigez le ton,
								vous ajustez les règles.
							</p>
							<p className={s.sub}>
								On n&apos;ouvre les envois que le jour où vous le dites. Ensuite, et aussi longtemps que
								vous le voulez, chaque message reste validé par une personne de votre cabinet avant de
								partir.
							</p>
						</div>

						<div className={`${s.promiseBox} rv rv-d1`}>
							<p className={s.eyebrow}>L&apos;objection que tout le monde a</p>
							<p className={s.promiseBig}>Aucun message ne part sans votre accord.</p>
						</div>
					</div>
				</section>

				{/* ══ VOTRE PART ══ */}
				<section className={`${s.block} ${s.blockAlt}`}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Votre part</p>
							<h2>Ce que ça demande à votre cabinet.</h2>
						</div>

						<div className={`${s.opps} rv rv-d1`}>
							{VOTRE_PART.map((v) => (
								<div key={v.title} className={s.opp}>
									<Icon name={v.icon} />
									<span className={s.oppTitle}>{v.title}</span>
									<p className={s.oppText}>{v.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<Bridge>Trois mois plus tard, on regarde si ça a marché.</Bridge>

				{/* ══ ÉTAPE 4 · LE CONSTAT ══
				    Sur fond sombre : c'est le seul endroit de la page où j'engage de
				    l'argent, il doit se voir d'un coup d'œil. */}
				<section className={s.block} id="constat">
					<div className={s.wrap}>
						<div className={`${s.band} rv`}>
							<p className={s.eyebrow}>Étape 4 · À J+90</p>
							<h2>On compare deux chiffres.</h2>
							<p>
								Un second relevé d&apos;une semaine, même équipe et même méthode qu&apos;au cadrage. On
								pose les deux chiffres côte à côte.
							</p>
							<p>
								Si le temps passé à relancer n&apos;a pas baissé, vous choisissez : remboursement
								intégral de l&apos;installation, ou je continue gratuitement jusqu&apos;à ce
								qu&apos;on y soit.
							</p>
						</div>
					</div>
				</section>

				{/* ══ CTA FINAL ══ */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Par où commencer</p>
							<h2>Le diagnostic d&apos;abord.</h2>
							<p className={s.sub}>
								Six questions, deux minutes, et vous saurez ce que ces tâches vous coûtent avant même
								qu&apos;on se parle.
							</p>
						</div>
						<div className={`${s.heroCta} rv rv-d1`}>
							<Link
								href="/diagnostic"
								className={`${s.btn} ${s.btnPrimary}`}
								onClick={() => track("cta_diagnostic", { location: "methode_bas_de_page" })}
							>
								Lancer le diagnostic <span className={s.arr}>→</span>
							</Link>
							<Link
								href="/rendez-vous"
								className={`${s.btn} ${s.btnGhost}`}
								onClick={() => track("cta_reserver_appel", { location: "methode_bas_de_page" })}
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
