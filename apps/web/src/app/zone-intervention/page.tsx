import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/site2026/Shell";
import s from "./zone.module.css";
import { ZONE_MAP, ZONE_MAP_MOBILE, ICON_ROUTE, ICON_TRAIN, ICON_VISIO } from "./illustrations";

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

export default function ZoneInterventionPage() {
	return (
		<Shell>
			<section className="hero">
				<div className="wrap">
					<p className="eyebrow">Zone d'intervention</p>
					<h1 className="h1">Sur place dans le Sud, en visio partout en France.</h1>
					<p className="sub">
						Je suis basé près de Nîmes. Je viens dans vos locaux jusqu'à 2 heures de route, je me déplace en train dans les grandes villes, et je travaille en visio avec les PME de toute la France.
					</p>
					<div className="hero-cta">
						<Link href="/diagnostic" className="cta big">Faire mon diagnostic</Link>
					</div>
					<div className={s.map}><div className={s.mapDesk} dangerouslySetInnerHTML={{ __html: ZONE_MAP }} /><div className={s.mapMob} dangerouslySetInnerHTML={{ __html: ZONE_MAP_MOBILE }} /></div>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<div className="sec-head">
						<h2 className="h2">Trois façons de travailler ensemble</h2>
					</div>
					<div className={s.grid}>
						<div className={s.card}>
							<div className={s.icon} dangerouslySetInnerHTML={{ __html: ICON_ROUTE }} />
							<h3>Sur place, jusqu'à 2 h de route</h3>
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

			<section className="sec alt">
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
					</div>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<h2 className="h2">Commencez par le diagnostic</h2>
					<p className={`lead ${s.closingLead}`}>Quelques minutes pour voir où ça coince chez vous. Puis 30 minutes ensemble, en visio.</p>
					<div className={s.actions}>
						<Link href="/diagnostic" className="cta">Faire mon diagnostic</Link>
						<Link href="/rendez-vous" className={s.textlink}>Réserver directement un rendez-vous</Link>
					</div>
				</div>
			</section>
		</Shell>
	);
}
