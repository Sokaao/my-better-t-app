"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Icon, { type IconName } from "@/components/site/Icon";
import SiteNavV2, { type NavLink } from "@/components/site/SiteNavV2";
import SiteFooter from "@/components/site/SiteFooter";
import s from "@/styles/site.module.css";

// Les trois questions qu'on se pose avant de bloquer trente minutes : ce qu'on
// regarde, ce qu'on en retire, ce qui se passe ensuite.
const NAV_LINKS: NavLink[] = [
	{ href: "#regarder", label: "Au programme" },
	{ href: "#repartir", label: "Ce que vous repartez avec" },
	{ href: "#apres", label: "Après l'appel" },
];

// Ce qui est passé en revue pendant l'appel. Quatre points, dans l'ordre où ils
// se posent : la faisabilité d'abord, l'ordre de grandeur en dernier.
const PROGRAMME: { icon: IconName; title: string; text: string }[] = [
	{
		icon: "logiciel",
		title: "Vos outils",
		text: "Votre logiciel de production, votre paie, la façon dont vos clients vous envoient leurs pièces. C'est ce qui détermine la faisabilité.",
	},
	{
		icon: "capacite",
		title: "Votre portefeuille",
		text: "Combien de dossiers, quelle taille d'équipe, et où ça bloque le plus souvent.",
	},
	{
		icon: "portail",
		title: "Ce que vous avez déjà tenté",
		text: "Pour ne pas vous proposer ce qui n'a pas marché la dernière fois.",
	},
	{
		icon: "conseil",
		title: "Ce que ça donnerait",
		text: "Un ordre de grandeur de ce que vous récupéreriez, et par quelle brique commencer.",
	},
];

// Ce qui suit l'appel, daté. Aucune surprise : la dernière ligne dit aussi ce que
// je ne fais pas.
const APRES: { day: string; title: string; text: string }[] = [
	{
		day: "Le jour même",
		title: "Un récapitulatif écrit",
		text: "Vous recevez par mail ce qu'on s'est dit et ce que j'ai compris de votre situation.",
	},
	{
		day: "Sous 48 h",
		title: "La proposition de cadrage",
		text: "Si c'est faisable, avec le périmètre et le prix. Sinon, je vous le dis dans le récapitulatif.",
	},
	{
		day: "Ensuite",
		title: "Vous décidez",
		text: "Pas de relance insistante. Si vous ne donnez pas suite, je n'insiste pas.",
	},
];

const CALENDLY_URL = "https://calendly.com/synapsis-devis/30min";

export default function RendezVous() {
	useScrollReveal();

	// Trois états, parce que le cas réel n'est pas binaire : un bloqueur de contenu
	// n'émet pas toujours d'erreur, le script reste alors « en cours » indéfiniment.
	// D'où le repli à 8 s, qui bascule en `blocked` et affiche l'adresse mail.
	const [calendlyState, setCalendlyState] = useState<"loading" | "ready" | "blocked">("loading");

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://assets.calendly.com/assets/external/widget.js";
		script.async = true;
		script.onload = () => setCalendlyState("ready");
		script.onerror = () => setCalendlyState("blocked");
		document.body.appendChild(script);

		const timeout = setTimeout(() => {
			setCalendlyState((current) => (current === "loading" ? "blocked" : current));
		}, 8000);

		return () => {
			clearTimeout(timeout);
			if (document.body.contains(script)) {
				document.body.removeChild(script);
			}
		};
	}, []);

	return (
		<div className={s.page}>
			<SiteNavV2 links={NAV_LINKS} ctaLocation="rdv_nav" />

			<main className={s.main}>
				{/* ══ HERO ══ */}
				<header className={s.hero}>
					<div className={s.wrap}>
						<div className={s.heroIn}>
							<p className={`${s.eyebrow} ${s.in}`}>Rendez-vous</p>
							<h1 className={`${s.in} ${s.in1}`}>
								Trente minutes, pour savoir si c&apos;est faisable chez vous.
							</h1>
							<p className={`${s.mechanism} ${s.in} ${s.in2}`}>
								Pas de présentation, pas de diaporama. On regarde votre situation et je vous dis
								franchement si j&apos;ai quelque chose à vous apporter.
							</p>
						</div>
					</div>
				</header>

				{/* ══ AU PROGRAMME ══ */}
				<section className={s.block} id="regarder">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Au programme</p>
							<h2>Ce qu&apos;on regarde ensemble.</h2>
						</div>

						<div className={`${s.opps} rv rv-d1`}>
							{PROGRAMME.map((p) => (
								<div key={p.title} className={s.opp}>
									<Icon name={p.icon} />
									<span className={s.oppTitle}>{p.title}</span>
									<p className={s.oppText}>{p.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ══ CE QUE VOUS REPARTEZ AVEC ══ */}
				<section className={`${s.block} ${s.blockAlt}`} id="repartir">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Ce que vous repartez avec</p>
							<h2>Une réponse, pas une proposition commerciale.</h2>
							<p className={s.sub}>
								Vous saurez si c&apos;est faisable chez vous, ce que le cadrage mettrait au jour, et
								combien ça coûte. Si l&apos;automatisation n&apos;est pas la bonne réponse à votre
								problème, je vous le dis et on en reste là. C&apos;est plus utile pour vous, et ça
								m&apos;évite de perdre mon temps.
							</p>
						</div>
					</div>
				</section>

				{/* ══ LE CALENDRIER ══
				    Le widget Calendly s'injecte lui-même dans .calendly-inline-widget une fois
				    son script chargé. Tant qu'il n'a rien injecté, l'emplacement affiche l'état
				    de chargement ; si un bloqueur empêche le script d'arriver, il affiche
				    l'adresse mail. Le cadre est un .shot : c'est déjà la carte à filet du socle. */}
				<section className={s.block} id="calendrier">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Choisissez votre créneau</p>
							<h2>Trente minutes, en visioconférence.</h2>
							<p className={s.sub}>Vous recevrez une confirmation par email avec le lien.</p>
						</div>

						<div className={`${s.shot} rv rv-d1`}>
							<div className={s.calendarFrame}>
								{calendlyState === "loading" && (
									<div className={s.calendarState}>
										<span className={s.calendarSpinner} aria-hidden="true" />
										<p>Chargement du calendrier…</p>
									</div>
								)}
								{calendlyState === "blocked" && (
									<div className={s.calendarState}>
										<p>
											Le calendrier ne s&apos;est pas chargé, sans doute à cause d&apos;un bloqueur de
											contenu.
											<br />
											Écrivez-moi à <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a> et
											on convient d&apos;un créneau.
										</p>
									</div>
								)}
								<div
									className="calendly-inline-widget"
									data-url={CALENDLY_URL}
									style={{
										minWidth: "320px",
										height: "700px",
										visibility: calendlyState === "ready" ? "visible" : "hidden",
									}}
								/>
							</div>
						</div>
					</div>
				</section>

				{/* ══ CE QUI SE PASSE APRÈS ══ */}
				<section className={`${s.block} ${s.blockAlt}`} id="apres">
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Aucune surprise</p>
							<h2>Ce qui se passe après.</h2>
						</div>

						<div className={`${s.steps} rv rv-d1`}>
							{APRES.map((a) => (
								<div key={a.day} className={s.step}>
									<span className={s.stepDay}>{a.day}</span>
									<div className={s.stepBody}>
										<span className={s.stepTitle}>{a.title}</span>
										<span className={s.stepText}>{a.text}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ══ CTA FINAL ══ */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={`${s.secHead} rv`}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Vous préférez commencer seul ?</p>
							<h2>Le diagnostic répond en deux minutes.</h2>
							<p className={s.sub}>Six questions, aucun email demandé pour voir le résultat.</p>
						</div>
						<div className={`${s.heroCta} rv rv-d1`}>
							<Link
								href="/diagnostic"
								className={`${s.btn} ${s.btnPrimary}`}
								onClick={() => track("cta_diagnostic", { location: "rdv_bas_de_page" })}
							>
								Lancer le diagnostic <span className={s.arr}>→</span>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter />
		</div>
	);
}
