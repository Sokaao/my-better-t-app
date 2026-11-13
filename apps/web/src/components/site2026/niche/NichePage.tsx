import Link from "next/link";
import Shell from "@/components/site2026/Shell";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbLd, faqPageLd, graph } from "@/components/seo/schemas";
import type { NicheContent } from "./types";
import SuiviStagiaires from "./illus/SuiviStagiaires";
import VisiteMobile from "./illus/VisiteMobile";
import s from "./niche.module.css";

// Gabarit des pages métier (une page par niche), rendu côté serveur.
export default function NichePage({ content }: { content: NicheContent }) {
	const diagnostic = { pathname: "/diagnostic", query: { niche: content.niche } } as const;

	return (
		<Shell>
			<JsonLd data={graph(breadcrumbLd(content.breadcrumb, `/${content.slug}`), faqPageLd(`/${content.slug}`, content.faq))} />
			<section className="hero">
				<div className="wrap">
					<p className="eyebrow">{content.eyebrow}</p>
					<h1 className="h1">{content.h1}</h1>
					<p className="sub">{content.intro}</p>
					<div className="hero-cta">
						<Link href={diagnostic} className="cta big">{content.cta.label}</Link>
					</div>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<div className={content.illustrations?.hero === "suivi-stagiaires" ? `${s.split} ${s.splitStart}` : undefined}>
						{content.illustrations?.hero === "suivi-stagiaires" && (
							<div className={s.illusLeft}>
								<SuiviStagiaires />
							</div>
						)}
						<div>
							<div className="sec-head">
								<h2 className="h2">{content.situations.h2}</h2>
							</div>
							<ul className={s.points}>
								{content.situations.items.map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="sec alt">
				<div className="wrap">
					<div className={content.illustrations?.tools ? s.split : undefined}>
						<div>
							<div className="sec-head">
								<h2 className="h2">{content.tools.h2}</h2>
							</div>
							<p className="lead">{content.tools.intro}</p>
							<ul className={s.points}>
								{content.tools.links.map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
						</div>
						{content.illustrations?.tools === "visite-mobile" && (
							<div className={s.aside}>
								<VisiteMobile />
							</div>
						)}
					</div>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<div className="sec-head">
						<h2 className="h2">{content.beforeAfter.h2}</h2>
					</div>
					<ul className={s.rows}>
						{content.beforeAfter.rows.map((r) => (
							<li key={r.before} className={s.row}>
								<div className={s.cell}><b>Avant</b>{r.before}</div>
								<div className={`${s.cell} ${s.after}`}><b>Après</b>{r.after}</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="sec alt">
				<div className="wrap">
					<div className="sec-head">
						<h2 className="h2">{content.caseStudy.h2}</h2>
					</div>
					<div className={s.case}>
						{content.caseStudy.paragraphs.map((p) => (
							<p key={p}>{p}</p>
						))}
						<p className={s.label}>{content.caseStudy.resultsLabel}</p>
						<ul className={s.points}>
							{content.caseStudy.results.map((t) => (
								<li key={t}>{t}</li>
							))}
						</ul>
						<p className={s.note}>{content.caseStudy.note}</p>
					</div>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<div className="sec-head">
						<h2 className="h2">Les questions qu'on me pose</h2>
					</div>
					<div className={s.faq}>
						{content.faq.map((q) => (
							<details key={q.q}>
								<summary>{q.q}</summary>
								<p>{q.a}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					<h2 className="h2">{content.cta.h2}</h2>
					<p className={`lead ${s.closingLead}`}>{content.cta.text}</p>
					<div className={s.actions}>
						<Link href={diagnostic} className="cta">{content.cta.label}</Link>
					</div>
					<p className={s.zone}>
						Je me déplace jusqu'à 2 h de route autour de Nîmes et je travaille en visio partout en France.{" "}
						<Link href="/zone-intervention" className={s.textlink}>Voir ma zone d'intervention</Link>
					</p>
				</div>
			</section>
		</Shell>
	);
}
