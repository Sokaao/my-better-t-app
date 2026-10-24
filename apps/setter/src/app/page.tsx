"use client";

import Image from "next/image";
import {
	Check,
	Info,
	MapPin,
	MessageCircle,
	ShieldCheck,
	Wrench,
} from "lucide-react";

import Cta from "@/components/cta";
import DmCalculator from "@/components/dm-calculator";
import DmChat from "@/components/dm-chat";
import Faq, { type FaqItem } from "@/components/faq";
import QualifLoop from "@/components/qualif-loop";
import SynapsisMark from "@/components/synapsis-mark";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { DM_STATUT } from "@/lib/dm-demo";
import {
	DELAI_MISE_EN_SERVICE,
	PRIX_ACOMPTE,
	PRIX_MENSUEL,
	PRIX_SETUP,
} from "@/lib/config";

// Mention affichee sous le bloc de conversation. Elle depend du statut de la
// demo : on ne presente jamais un echange retouche comme une capture brute.
const MENTION_DEMO: string = {
	exemple:
		"exemple de scénario de qualification — ce n'est pas une conversation client.",
	adapte:
		"échange réel remonté d'un compte client, anonymisé — la clôture a été condensée. Le conseil et la proposition de rendez-vous sont dans le dernier vocal : rien n'est écrit.",
	reel: "échange réel, prénoms et détails modifiés.",
}[DM_STATUT];

const COUTS: { titre: string; texte: string }[] = [
	{
		titre: "Tu réponds bien au premier, mal au dixième.",
		texte:
			"À la vingtième conversation de la journée, tu réponds plus court et tu creuses moins. Ceux qui étaient prêts passent à la trappe en même temps que les autres.",
	},
	{
		titre: "Le prospect de 23 h attend demain.",
		texte:
			"Instagram ne dort pas, toi si. Entre son message et ta réponse, il a le temps d'écrire à quelqu'un d'autre — et de recevoir une réponse.",
	},
	{
		titre: "Tu tries de tête, sans critère écrit.",
		texte:
			"Deux prospects identiques n'ont pas droit au même traitement selon ton niveau de fatigue. Et tu découvres le budget à la vingtième minute d'appel.",
	},
];

const ETAPES: { num: string; titre: string; texte: string }[] = [
	{
		num: "ÉTAPE 01",
		titre: "Tu remplis l'onboarding",
		texte:
			"Un formulaire d'une vingtaine de minutes : ton offre, ton avatar, tes critères de disqualification, tes objections habituelles et tes échanges types. C'est la seule chose que j'attends de toi.",
	},
	{
		num: "ÉTAPE 02",
		titre: "Je construis, tu testes",
		texte:
			"Je monte le système sur mon infrastructure — tu n'installes rien. Tu reçois un accès de test : rien ne part en conditions réelles sans ta validation.",
	},
	{
		num: "ÉTAPE 03",
		titre: "Mise en service",
		texte: `Le setter tourne sur ton compte et répond à ta place. Compte ${DELAI_MISE_EN_SERVICE} entre l'envoi de ton onboarding et ce moment-là.`,
	},
];

const INCLUS: string[] = [
	"Un prompt écrit sur mesure à partir de tes échanges réels, pas un modèle générique",
	"Tes critères de disqualification et tes réponses aux objections, dans tes mots",
	"L'hébergement et l'infrastructure : tu n'installes rien, tu ne configures rien",
	"Un accès de test avant toute mise en production",
	"Le suivi des conversations et des prospects qualifiés",
	"Les ajustements du prompt au fil des mois, compris dans la maintenance",
];

const FAQ_ITEMS: FaqItem[] = [
	{
		q: "Combien de temps avant que ça tourne ?",
		a: (
			<>
				Compte <b>{DELAI_MISE_EN_SERVICE}</b> entre le moment où tu m&apos;envoies tes
				éléments et la mise en service. De ton côté, le travail se résume à
				l&apos;onboarding : une vingtaine de minutes. Le reste est de mon côté, et tu
				valides un accès de test avant que quoi que ce soit parte en conditions
				réelles.
			</>
		),
	},
	{
		q: "Il me faut une ressource à offrir ?",
		a: (
			<>
				Oui, c&apos;est le point de départ du système. Le setter ne démarre pas une
				conversation tout seul : c&apos;est le prospect qui écrit pour recevoir
				quelque chose — un guide, une checklist, une vidéo, un audit. Ton contenu
				invite à envoyer un mot en DM, le setter envoie la ressource, et
				c&apos;est là qu&apos;il enchaîne avec la qualification.
				<br />
				<br />
				Sans ressource, il n&apos;y a pas de raison d&apos;écrire, donc pas de
				conversation à qualifier. Si tu n&apos;en as pas encore, on en parle
				pendant l&apos;appel : c&apos;est souvent la première chose à caler, et
				elle n&apos;a pas besoin d&apos;être longue pour fonctionner.
			</>
		),
	},
	{
		q: "Sur quels comptes Instagram ça marche ?",
		a: (
			<>
				Sur un compte <b>Business ou Créateur</b> uniquement. Le passage se fait dans
				les réglages Instagram, c&apos;est gratuit et ça prend deux minutes.
				<br />
				<br />
				Tout passe exclusivement par <b>ManyChat</b>, qui est un partenaire officiel de
				Meta : rien ne touche à ton compte en dehors de ce cadre. Concrètement, le
				setter ne répond qu&apos;aux conversations entrantes — il n&apos;envoie jamais
				de message à froid et ne va chercher personne dans les abonnés des autres.
				C&apos;est ce qui protège ton compte : les outils qui promettent le démarchage
				automatique passent par du scraping non officiel, avec le risque de
				bannissement qui va avec.
			</>
		),
	},
	{
		q: "Comment marche la garantie, exactement ?",
		a: (
			<>
				Si le setter ne te convient pas dans les <b>30 jours suivant sa mise en
				service</b>, je te rembourse l&apos;acompte de setup, soit {PRIX_ACOMPTE}.
				<br />
				<br />
				Deux précisions pour qu&apos;il n&apos;y ait pas de malentendu : la fenêtre de
				30 jours démarre à l&apos;activation du bot, pas à la date de commande — tu as
				donc 30 jours d&apos;usage réel. Et la garantie porte sur l&apos;acompte de
				setup : les mensualités déjà facturées ne sont pas remboursées.
			</>
		),
	},
	{
		q: "Qu'est-ce qui reste à ma charge ?",
		a: (
			<>
				L&apos;abonnement <b>ManyChat</b>, la brique qui relie ton compte Instagram au
				système. Il reste à ton nom et à ta charge : c&apos;est ton compte, tes
				conversations, et tu gardes la main dessus même si on arrête de travailler
				ensemble.
				<br />
				<br />
				Tout le reste — hébergement, infrastructure, suivi des conversations,
				ajustements du prompt — est compris dans les {PRIX_MENSUEL}/mois.
			</>
		),
	},
	{
		q: "Mes prospects vont voir que ce n'est pas moi ?",
		a: (
			<>
				Le ton est calé sur tes échanges réels, donc l&apos;écart est faible. Mais la
				question de l&apos;annoncer ou non t&apos;appartient : certains préfèrent le
				dire franchement, d&apos;autres non. On en parle à l&apos;appel et on cale le
				système sur ton choix.
				<br />
				<br />
				Dans tous les cas tu peux reprendre la main sur n&apos;importe quelle
				conversation, à tout moment : le setter s&apos;arrête dès que tu écris.
			</>
		),
	},
];

export default function SetterLanding() {
	useScrollReveal();

	return (
		<>
			<div className="s-bg-grid" />

			{/* En-tete : logo + CTA. Aucun lien de navigation : la page n'a qu'une
			    sortie possible, la prise de rendez-vous. */}
			<header className="st-head">
				<div className="s-wrap st-head-in">
					<span className="st-brand">
						<SynapsisMark className="mark" style={{ width: 26, height: 30 }} />
						<span>
							<span className="word">SYNAPSIS</span>
							<span className="sub">AUTOMATISATION &amp; IA</span>
						</span>
					</span>
					<Cta emplacement="header" label="Réserver un appel" />
				</div>
			</header>

			<main>
				{/* ---------------------------------------------------------------
				    1 · HERO — le prospect arrive au pic de motivation (il sort d'un
				    contenu Instagram). Le CTA est visible sans scroller : la page
				    n'a pas a recreer la prise de conscience, juste a ne pas laisser
				    la motivation retomber.
				    --------------------------------------------------------------- */}
				<header className="s-hero">
					<div className="s-wrap">
						<div className="s-hero-top">
							<span
								className="s-eyebrow s-hin s-h1d"
								style={{ justifyContent: "center" }}
							>
								Setter IA · Instagram DM
							</span>
							<h1 className="s-hin s-h2d">
								Arrête de{" "}
								<span className="s-hl">
									qualifier tes DM
									<svg viewBox="0 0 320 12" preserveAspectRatio="none">
										<path d="M4,9 C80,3 240,3 316,8" />
									</svg>
								</span>{" "}
								à la main.
							</h1>
							<p className="s-lead s-hin s-h3d">
								Quelqu&apos;un t&apos;écrit pour recevoir ta ressource. Le setter IA
								la lui envoie, enchaîne avec tes questions de qualification, écarte
								ceux qui ne collent pas et propose un créneau à ceux qui sont prêts.
								Tu n&apos;entres dans la conversation qu&apos;au moment du
								rendez-vous.
							</p>
							<div className="s-hero-cta s-hin s-h4d">
								<Cta emplacement="hero" />
							</div>
							<div className="s-hero-note s-hin s-h5d">
								30 minutes en visio · <b>satisfait ou remboursé 30 jours</b> après la
								mise en service
							</div>
						</div>

						<div className="s-hin s-h5d" style={{ marginTop: 50 }}>
							<QualifLoop />
							<p className="st-qualif-note">
								tout démarre quand quelqu&apos;un écrit pour ta ressource · trois cas,
								trois sorties · tu ne vois que la dernière ligne
							</p>
						</div>
					</div>
				</header>

				{/* ---------------------------------------------------------------
				    2 · PROBLEME — le cout du tri manuel, puis le calcul fait avec
				    les chiffres du prospect (aucun chiffre avance a sa place).
				    --------------------------------------------------------------- */}
				<section className="s-blk" id="probleme">
					<div className="s-wrap">
						<div className="s-sec-head rv">
							<span className="s-eyebrow">Le coût du tri manuel</span>
							<h2>
								Tu ne perds pas ton temps à vendre. Tu le perds à{" "}
								<span className="s-hl">
									écarter
									<svg viewBox="0 0 320 12" preserveAspectRatio="none">
										<path d="M4,9 C80,3 240,3 316,8" />
									</svg>
								</span>
								.
							</h2>
							<p>
								Répondre, requalifier, relancer, se rendre compte au bout de dix
								messages que la personne n&apos;a ni le budget ni le projet. Ce
								travail-là n&apos;a jamais fait signer personne.
							</p>
						</div>

						<div className="s-sol-grid rv rv-d1">
							{COUTS.map((c) => (
								<div className="s-card" key={c.titre}>
									<h3>{c.titre}</h3>
									<p>{c.texte}</p>
								</div>
							))}
						</div>

						<div className="rv rv-d2" style={{ marginTop: 34 }}>
							<p
								className="s-mono"
								style={{
									fontSize: 12.5,
									color: "var(--faint)",
									marginBottom: 14,
									textAlign: "center",
								}}
							>
								mets tes chiffres, la multiplication fait le reste
							</p>
							<DmCalculator />
						</div>
					</div>
				</section>

				{/* ---------------------------------------------------------------
				    3 · SOLUTION — montrer plutot qu'argumenter. Le bloc de
				    conversation est la seule vraie demonstration de la page.
				    --------------------------------------------------------------- */}
				<section className="s-blk" id="solution" style={{ paddingTop: 0 }}>
					<div className="s-wrap">
						<div className="s-sec-head rv">
							<span className="s-eyebrow">Comment il qualifie</span>
							<h2>Il pose tes questions, avec tes mots, dans ton ordre.</h2>
							<p>
								Tout part de ta ressource : ton contenu invite à écrire pour la
								recevoir, et c&apos;est ce message qui ouvre la conversation. Le
								setter envoie la ressource, puis enchaîne — avec un prompt écrit à
								partir de tes vrais échanges : ton avatar, tes critères de
								disqualification, tes objections habituelles et ta façon de répondre.
								Ce n&apos;est pas un chatbot générique branché sur ton compte.
							</p>
						</div>

						<div className="rv rv-d1">
							<DmChat />
						</div>

						<p
							className="s-mono rv rv-d1"
							style={{ fontSize: 12, color: "var(--faint)", marginTop: 12 }}
						>
							{MENTION_DEMO}
						</p>

						<div className="st-callout rv rv-d2" style={{ marginTop: 34 }}>
							<Info size={19} className="ico" />
							<p>
								<strong>
									Aucune intervention humaine n&apos;a mené à ce rendez-vous.
								</strong>{" "}
								Le client n&apos;a pas lu la conversation, pas relancé, pas envoyé de
								lien. Il a reçu une notification : un créneau réservé dans son agenda,
								avec ce qu&apos;il faut savoir sur la personne en face. Le setter
								s&apos;arrête là — l&apos;appel, c&apos;est lui qui le prend. Et il
								peut reprendre la main sur n&apos;importe quel échange à tout moment :
								le setter se tait dès qu&apos;il écrit.
							</p>
						</div>

						<div className="s-steps rv rv-d2" style={{ marginTop: 46 }}>
							{ETAPES.map((e) => (
								<div className="s-step" key={e.num}>
									<div className="s-num">{e.num}</div>
									<h3>{e.titre}</h3>
									<p>{e.texte}</p>
								</div>
							))}
						</div>

						<div
							className="rv rv-d3"
							style={{ marginTop: 40, textAlign: "center" }}
						>
							<Cta emplacement="milieu" />
							<div className="st-cta-note">
								on regarde ton compte ensemble · <b>30 min</b> · sans engagement
							</div>
						</div>
					</div>
				</section>

				{/* ---------------------------------------------------------------
				    4 · OFFRE — prix et garantie cote a cote : le reducteur de
				    risque est colle au chiffre, pas relegue en bas de page.
				    --------------------------------------------------------------- */}
				<section className="s-blk" id="offre" style={{ paddingTop: 0 }}>
					<div className="s-wrap">
						<div className="s-sec-head rv">
							<span className="s-eyebrow">L&apos;offre</span>
							<h2>
								Un tarif unique.{" "}
								<span className="s-hl">
									Pas de palier
									<svg viewBox="0 0 320 12" preserveAspectRatio="none">
										<path d="M4,9 C80,3 240,3 316,8" />
									</svg>
								</span>{" "}
								d&apos;entrée.
							</h2>
							<p>
								Je ne vends pas une version allégée à 400 € qui ne qualifie rien. Si
								ton volume de DM ne justifie pas ce prix, je te le dis pendant
								l&apos;appel.
							</p>
						</div>

						<div className="st-offer rv rv-d1">
							<div className="s-price-card featured">
								<span className="s-price-ribbon">Tarif unique</span>
								<h3>Setter IA Instagram</h3>
								<div className="s-price-amount">
									<span className="num">{PRIX_SETUP}</span>
									<span className="unit">de setup</span>
								</div>
								<p className="s-price-note">
									{PRIX_ACOMPTE} à la commande, le solde à la mise en service. Puis{" "}
									{PRIX_MENSUEL}/mois de maintenance.
								</p>
								<ul className="s-price-list">
									{INCLUS.map((i) => (
										<li key={i}>
											<Check size={15} className="ck" />
											{i}
										</li>
									))}
								</ul>
								<div
									style={{
										borderTop: "1px solid var(--line)",
										paddingTop: 16,
										marginTop: 4,
									}}
								>
									<p
										className="s-mono"
										style={{
											fontSize: 11,
											letterSpacing: "0.08em",
											textTransform: "uppercase",
											color: "var(--faint)",
											marginBottom: 10,
										}}
									>
										Ce qui reste à ta charge
									</p>
									<ul className="st-charge">
										<li>
											<Check size={14} className="ck" />
											L&apos;abonnement ManyChat, à ton nom : c&apos;est ton compte
											et tes conversations, tu les gardes quoi qu&apos;il arrive.
										</li>
									</ul>
								</div>
							</div>

							<div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
								<div className="s-guarantee" style={{ flex: 1 }}>
									<div className="s-guarantee-icon">
										<ShieldCheck size={26} />
									</div>
									<div>
										<h3>Satisfait ou remboursé, 30 jours.</h3>
										<p>
											Si le setter IA ne te convient pas dans les 30 jours suivant sa
											mise en service, je te rembourse l&apos;acompte de setup
											({PRIX_ACOMPTE}).
										</p>
										<p className="s-guarantee-terms">
											La fenêtre de 30 jours démarre à l&apos;activation du bot, pas
											à la date de commande : tu as 30 jours d&apos;usage réel. La
											garantie porte sur l&apos;acompte de setup ; les mensualités
											déjà facturées ne sont pas remboursées.
										</p>
									</div>
								</div>

								<div className="s-card">
									<h3>Pourquoi ce prix</h3>
									<ul className="st-charge" style={{ marginTop: 12 }}>
										<li>
											<Check size={14} className="ck" />
											Le prompt est écrit à partir de tes échanges, un par client. Ce
											n&apos;est pas un abonnement à un outil que tu configures
											toi-même.
										</li>
										<li>
											<Check size={14} className="ck" />
											Une seule vente récupérée sur un DM que tu aurais laissé
											refroidir couvre déjà une partie du setup — fais le calcul avec
											le prix de ton offre.
										</li>
										<li>
											<Check size={14} className="ck" />
											La maintenance couvre l&apos;infrastructure et les ajustements
											du prompt : le système ne se dégrade pas tout seul dans trois
											mois.
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ---------------------------------------------------------------
				    5 · FONDATEUR — a defaut de temoignages publiables, la
				    transparence sur qui construit et sur l'anciennete reelle.
				    --------------------------------------------------------------- */}
				<section className="s-blk" id="qui" style={{ paddingTop: 0 }}>
					<div className="s-wrap">
						<div className="st-founder rv">
							<div className="photo">
								<Image
									src="/images/frederic-mallet.jpg"
									alt="Frédéric Mallet, fondateur de Synapsis"
									fill
									sizes="(max-width: 820px) 130px, 190px"
									style={{ objectFit: "cover", objectPosition: "center 22%" }}
								/>
							</div>

							<div className="txt">
								<span className="s-eyebrow">Qui construit ton setter</span>
								<h3>Frédéric Mallet</h3>
								<p className="accroche">
									Je construis le setter, je le maintiens, et c&apos;est moi que tu as
									au téléphone.
								</p>
								<p>
									Pas de commercial qui te vend un truc qu&apos;il ne sait pas
									construire, pas de support qui te renvoie vers un formulaire. Synapsis,
									c&apos;est une personne.
								</p>
								<p>
									Deux setters IA tournent aujourd&apos;hui, pour des créateurs qui
									vendent en DM. Je ne publie ni leurs noms, ni leurs chiffres, ni
									leurs captures d&apos;écran tant qu&apos;ils ne m&apos;ont pas donné
									leur accord — c&apos;est pour ça que tu trouves une garantie sur
									cette page plutôt qu&apos;un mur de témoignages.
								</p>

								<div className="faits">
									<span>
										<Wrench size={13} />
										Je construis moi-même
									</span>
									<span>
										<MessageCircle size={13} />2 setters en production
									</span>
									<span>
										<MapPin size={13} />
										Basé en France
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ---------------------------------------------------------------
				    6 · CTA FINAL
				    --------------------------------------------------------------- */}
				<section className="s-blk" style={{ paddingTop: 0 }}>
					<div className="s-wrap">
						<div className="s-band rv">
							<span
								className="s-eyebrow"
								style={{ justifyContent: "center", marginBottom: 16 }}
							>
								Appel de qualification · 30 minutes
							</span>
							<h2>On regarde tes DM, et je te dis si ça vaut le coup.</h2>
							<p>
								Ton compte, ton offre, le volume que tu reçois et ce que tu en fais
								aujourd&apos;hui. Si ça ne s&apos;y prête pas, je te le dis pendant
								l&apos;appel — ça m&apos;évite de construire un système que tu
								n&apos;utiliseras pas.
							</p>
							<Cta emplacement="final" />
						</div>
					</div>
				</section>

				{/* ---------------------------------------------------------------
				    7 · FAQ — les objections, avec ce qui est verifiable en face.
				    --------------------------------------------------------------- */}
				<section className="s-blk" id="faq" style={{ paddingTop: 0 }}>
					<div className="s-wrap">
						<div className="s-sec-head rv">
							<span className="s-eyebrow">Questions</span>
							<h2>Ce qu&apos;on me demande avant de réserver.</h2>
						</div>
						<div className="rv rv-d1">
							<Faq items={FAQ_ITEMS} />
						</div>
					</div>
				</section>
			</main>

			<footer className="st-foot">
				<div className="s-wrap st-foot-in">
					<span>© {new Date().getFullYear()} Synapsis · Frédéric Mallet</span>
					<span className="st-foot-links">
						<a
							href="https://www.mysynapsis.fr/mentions-legales"
							target="_blank"
							rel="noopener noreferrer"
						>
							Mentions légales
						</a>
						<a
							href="https://www.mysynapsis.fr/politique-confidentialite"
							target="_blank"
							rel="noopener noreferrer"
						>
							Politique de confidentialité
						</a>
					</span>
				</div>
			</footer>
		</>
	);
}
