import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/site2026/Shell";
import s from "./zone.module.css";
import { VILLES } from "./villes";
import { ICON_ROUTE, ICON_TRAIN, ICON_VISIO } from "./illustrations";

// Page Zone d'intervention (SEO local), contenu validé par Fred le 11/11/2026 : déplacements à 2 h de route autour de Nîmes, grandes villes en train, visio partout.
const title = "Automatisation PME Nîmes, Montpellier, Provence | Synapsis";
const description =
	"Sur place jusqu'à 2 h de route autour de Nîmes, en train dans les grandes villes, en visio partout en France. Automatisation pour PME de 5 à 49 salariés.";

export const metadata: Metadata = {
	title: { absolute: title },
	description,
	alternates: { canonical: "/zone-intervention" },
	openGraph: { title, description, url: "/zone-intervention" },
};

// Questions de la page (texte affiché et données structurées FAQPage : mêmes chaînes).
const FAQ = [
	{ q: "Faut-il être dans le Sud pour travailler avec vous ?", r: "Non. Une grande partie du travail se fait à distance : vos outils sont en ligne, et on avance en visio. Le déplacement sert quand voir votre équipe au travail change le résultat." },
	{ q: "Comment se passe le premier rendez-vous ?", r: "Toujours en visio, 30 minutes. On part de vos outils actuels, et vous repartez avec un plan complet : vos points forts, vos points faibles, et ce qu'on relie en premier." },
	{ q: "Vous déplacez-vous à Montpellier, Avignon ou Marseille ?", r: "Oui. Ces villes sont à moins de 2 heures de route de Nîmes, comme Alès, Béziers, Arles ou Aix-en-Provence. Je peux venir dans vos locaux, en particulier pour comprendre comment l'information circule dans votre équipe." },
	{ q: "Quels outils reliez-vous ?", r: "Ceux que vous utilisez déjà : votre messagerie (Outlook, Gmail), votre fichier clients (HubSpot, Excel), votre facturation (Pennylane), votre banque (Qonto), WhatsApp… Vous ne changez pas d'outils : ils travaillent enfin ensemble." },
	{ q: "Combien de temps faut-il pour que tout fonctionne ?", r: "Comptez environ un mois entre l'audit et un système qui tourne, sans changer d'outils. Le calendrier exact est fixé avec vous pendant l'audit." },
];

const faqLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
};

export default function ZoneInterventionPage() {
	return (
		<Shell>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
			<section className="hero">
				<div className="wrap">
					<p className="eyebrow">Zone d'intervention</p>
					<h1 className="h1">Automatisation pour PME à Nîmes, Montpellier et dans tout le Sud.</h1>
					<p className="sub">
						Vos outils ne se parlent pas, et votre équipe recopie les mêmes informations d'un logiciel à l'autre ? Je les relie, sans vous en faire changer. Basé près de Nîmes, je viens dans vos locaux jusqu'à 2 heures de route, et je travaille en visio avec les PME de toute la France.
					</p>
					<div className="hero-cta">
						<Link href="/diagnostic" className="cta big">Faire mon diagnostic</Link>
					</div>
					<div className={s.villes} aria-label="Villes où j'interviens sur place" role="region">
						<div className={s.rail}>
							<ul>
								{VILLES.map((v) => (
									<li key={v.slug} className={s.ville}>
										<figure>
											<img src={`/images/villes/${v.slug}.webp`} alt={v.ville} width={560} height={374} loading="lazy" decoding="async" />
											<figcaption><b>{v.ville}</b><span>{v.dep}</span></figcaption>
										</figure>
									</li>
								))}
							</ul>
							<ul aria-hidden="true">
								{VILLES.map((v) => (
									<li key={v.slug} className={s.ville}>
										<figure>
											<img src={`/images/villes/${v.slug}.webp`} alt="" width={560} height={374} loading="lazy" decoding="async" />
											<figcaption><b>{v.ville}</b><span>{v.dep}</span></figcaption>
										</figure>
									</li>
								))}
							</ul>
						</div>
					</div>
					<details className={s.credits}>
						<summary>Crédits photos</summary>
						<ul>
							{VILLES.map((v) => (
								<li key={v.slug}>
									{v.ville} : {v.auteur}, {v.licence}, <a href={v.page} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
								</li>
							))}
						</ul>
					</details>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<div className="sec-head">
						<p className="eyebrow">Ce que je fais</p>
						<h2 className="h2">Arrêtez de faire le facteur entre vos outils.</h2>
					</div>
					<p className={`lead ${s.closingLead}`}>Un client écrit, et tout suit : sa fiche se crée, le devis part, la relance tombe au bon moment, la facture suit la signature. Personne ne recopie rien, et c'est vous qui validez.</p>
					<ul className={s.points}>
						<li>Plus de double saisie : vos mails, votre fichier clients, votre agenda et vos factures partagent les mêmes informations.</li>
						<li>Les relances partent seules, au bon moment, et vous voyez ce qui coince avant votre client.</li>
						<li>Vos outils restent les vôtres : Outlook ou Gmail, HubSpot, Pennylane, Qonto, Excel, WhatsApp.</li>
					</ul>
				</div>
			</section>

			<section className="sec alt">
				<div className="wrap">
					<div className="sec-head">
						<h2 className="h2">Trois façons de travailler ensemble</h2>
					</div>
					<div className={s.grid}>
						<div className={s.card}>
							<div className={s.icon} dangerouslySetInnerHTML={{ __html: ICON_ROUTE }} />
							<h3>Sur place, jusqu'à 2 h de route de Nîmes</h3>
							<p>Je viens voir comment votre équipe travaille vraiment : qui recopie quoi, où l'information se perd, ce qui se relance encore à la main.</p>
							<ul>
								<li>Nîmes, Alès et le Gard</li>
								<li>Montpellier, Béziers et l'Hérault</li>
								<li>Avignon et le Vaucluse</li>
								<li>Arles, Marseille, Aix-en-Provence</li>
							</ul>
						</div>
						<div className={s.card}>
							<div className={s.icon} dangerouslySetInnerHTML={{ __html: ICON_TRAIN }} />
							<h3>En train, dans les grandes villes</h3>
							<p>Hors de cette zone, je me déplace en train dans les grandes villes pour les étapes où être sur place compte : le lancement, la formation de votre équipe.</p>
						</div>
						<div className={s.card}>
							<div className={s.icon} dangerouslySetInnerHTML={{ __html: ICON_VISIO }} />
							<h3>En visio, partout en France</h3>
							<p>L'audit de 30 minutes se fait en visio, sur Google Meet. Pour la suite, on choisit ensemble : à distance, sur place, ou les deux.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<div className="sec-head">
						<h2 className="h2">Les questions qu'on me pose</h2>
					</div>
					<div className={s.faq}>
						<details>
							<summary>Faut-il être dans le Sud pour travailler avec vous ?</summary>
							<p>Non. Une grande partie du travail se fait à distance : vos outils sont en ligne, et on avance en visio. Le déplacement sert quand voir votre équipe au travail change le résultat.</p>
						</details>
						<details>
							<summary>Comment se passe le premier rendez-vous ?</summary>
							<p>Toujours en visio, 30 minutes. On part de vos outils actuels, et vous repartez avec un plan complet : vos points forts, vos points faibles, et ce qu'on relie en premier.</p>
						</details>
						{FAQ.slice(2).map((q) => (
							<details key={q.q}>
								<summary>{q.q}</summary>
								<p>{q.r}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<h2 className="h2">Faites le point sur vos outils en 3 minutes.</h2>
					<p className={`lead ${s.closingLead}`}>Le diagnostic est gratuit et sans e-mail. Ensuite, 30 minutes ensemble en visio : vous repartez avec un plan complet, que vous travailliez avec moi ou non.</p>
					<div className={s.actions}>
						<Link href="/diagnostic" className="cta">Faire mon diagnostic</Link>
						<Link href="/rendez-vous" className={s.textlink}>Réserver directement un rendez-vous</Link>
					</div>
				</div>
			</section>
		</Shell>
	);
}
