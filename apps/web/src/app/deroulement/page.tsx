"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const STEPS = [
	{
		num: "ÉTAPE 01",
		title: "Appel découverte",
		desc: "30 minutes pour comprendre vos processus actuels et identifier ce qui vaut la peine d'être automatisé. Zéro engagement à l'issue.",
	},
	{
		num: "ÉTAPE 02",
		title: "Onboarding",
		desc: "Vous remplissez un formulaire dédié à votre projet : accès techniques, contenu, vos informations réelles. Chiffré, envoyé en un clic.",
	},
	{
		num: "ÉTAPE 03",
		title: "Cadrage (sous 48h)",
		desc: "Je relis tout et je reviens vers vous si un point manque ou mérite d'être précisé avant de commencer à construire.",
	},
	{
		num: "ÉTAPE 04",
		title: "Construction",
		desc: "Je monte le système dans mon infrastructure d'automatisation. Vous n'avez rien à installer ni à configurer de votre côté.",
	},
	{
		num: "ÉTAPE 05",
		title: "Test & validation",
		desc: "Vous recevez un accès de test avant toute mise en production. Rien ne part en conditions réelles sans votre validation.",
	},
	{
		num: "ÉTAPE 06",
		title: "Mise en production",
		desc: "Le système tourne. Premiers résultats mesurables : c'est le début du suivi, pas la fin du projet.",
	},
	{
		num: "ÉTAPE 07",
		title: "Suivi & ajustements",
		desc: "Point mensuel, ajustements et nouvelles briques selon l'évolution de votre activité.",
	},
];

export default function DeroulementPage() {
	useScrollReveal();

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNav />

			<main>
				<section className="s-page-hero">
					<div className="s-wrap">
						<span className="s-eyebrow" style={{ justifyContent: "center" }}>
							Le déroulement
						</span>
						<h1>
							De la prise de contact <span style={{ color: "var(--orange)" }}>à l&apos;automatisation qui tourne</span>.
						</h1>
						<p>
							Sept étapes, du premier échange au suivi mensuel. Voici exactement ce qui se passe à chacune, et ce que
							vous avez (ou n&apos;avez pas) à faire.
						</p>
					</div>
				</section>

				<section className="s-blk">
					<div className="s-wrap">
						<div className="s-steps rv rv-d1">
							{STEPS.map((s) => (
								<div className="s-step" key={s.num}>
									<div className="s-num">{s.num}</div>
									<h3>{s.title}</h3>
									<p>{s.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="s-blk" style={{ paddingTop: 0 }}>
					<div className="s-wrap">
						<div className="s-band rv rv-d1">
							<h2>Prêt à commencer ?</h2>
							<p>La première étape ne coûte rien : 30 minutes pour savoir si ça vaut le coup.</p>
							<Link
								href="/rendez-vous"
								className="s-btn s-btn-primary"
								onClick={() => track("cta_reserver_appel", { location: "deroulement" })}
							>
								Réserver un appel <span className="arr">→</span>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter />
		</>
	);
}
