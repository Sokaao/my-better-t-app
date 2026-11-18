import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/site2026/Shell";
import JsonLd from "@/components/seo/JsonLd";
import { articleLd, breadcrumbTrailLd, faqPageLd, graph } from "@/components/seo/schemas";
import Inline from "@/components/site2026/guides/Inline";
import CopyButton from "@/components/site2026/guides/CopyButton";
import TocAside from "@/components/site2026/guides/TocAside";
import Illus from "@/components/site2026/guides/illus/Illus";
import { formatDateFr, getAllGuides, getGuide, type Block } from "@/lib/guides";
import s from "@/components/site2026/guides/guide.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
	return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const guide = getGuide(slug);
	if (!guide) return {};
	const url = `/guides/${guide.slug}`;
	return {
		title: { absolute: guide.title },
		description: guide.description,
		alternates: { canonical: url },
		openGraph: {
			type: "article",
			siteName: "Synapsis",
			locale: "fr_FR",
			// image : opengraph-image.tsx de ce dossier (une image par guide)
			title: guide.title,
			description: guide.description,
			url,
			publishedTime: guide.published,
			modifiedTime: guide.updated,
			authors: [guide.author],
		},
		// card répété : l'objet twitter d'une page remplace celui du layout en entier
		twitter: { card: "summary_large_image", title: guide.title, description: guide.description },
	};
}

function BlockView({ block }: { block: Block }) {
	switch (block.type) {
		case "h2":
			return <h2 id={block.id}>{block.text}</h2>;
		case "h3":
			return <h3>{block.text}</h3>;
		case "p":
			return (
				<p>
					<Inline text={block.text} />
				</p>
			);
		case "ul":
		case "ol": {
			const List = block.type;
			return (
				<List className={s[block.type]}>
					{block.items.map((item, i) => (
						<li key={i}>
							<Inline text={item} />
						</li>
					))}
				</List>
			);
		}
		case "message":
			return (
				<div className={s.message}>
					<div className={s.messageHead}>
						<span className={s.messageLabel}>{block.label}</span>
						<CopyButton label={block.label} subject={block.subject} lines={block.lines} />
					</div>
					{block.subject && <p className={s.subject}>Objet : {block.subject}</p>}
					<div className={s.messageLines}>
						{block.lines.map((line, i) => (line === "" ? <span key={i} className={s.gap} /> : <p key={i}>{line}</p>))}
					</div>
				</div>
			);
		case "note":
			return (
				<p className={s.note}>
					<Inline text={block.text} />
				</p>
			);
		case "illus":
			return <Illus name={block.name} />;
		case "photo":
			return (
				<figure className={s.photo}>
					<Image
						src={block.src}
						width={block.width}
						height={block.height}
						alt={block.alt}
						sizes="(min-width: 1100px) 704px, 100vw"
					/>
					<figcaption>
						<PhotoCredit credit={block.credit} creditUrl={block.creditUrl} />
					</figcaption>
				</figure>
			);
		case "exergue":
			// répète une phrase du texte : masquée aux lecteurs d'écran pour ne pas la lire deux fois
			return (
				<p className={s.exergue} aria-hidden="true">
					{block.text}
				</p>
			);
	}
}

function PhotoCredit({ credit, creditUrl }: { credit: string; creditUrl?: string }) {
	return creditUrl ? (
		<a href={creditUrl} rel="noopener" target="_blank">
			{credit}
		</a>
	) : (
		<>{credit}</>
	);
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const guide = getGuide(slug);
	if (!guide) notFound();
	const path = `/guides/${guide.slug}`;
	const toc = guide.blocks.flatMap((b) => (b.type === "h2" ? [b] : []));
	const tocItems = [
		...toc.map((b) => ({ id: b.id, label: b.text })),
		...(guide.faq.length > 0 ? [{ id: "questions", label: "Questions fréquentes" }] : []),
	];
	const hero = guide.hero;
	// photo prioritaire ; sinon illustration d'en-tête ; sinon en-tête sur une colonne
	const heroIllus = hero ? undefined : guide.heroIllus;
	const wideHero = Boolean(hero || heroIllus);

	return (
		<Shell>
			<JsonLd
				data={graph(
					breadcrumbTrailLd(path, [
						{ name: "Guides", path: "/guides" },
						{ name: guide.h1, path },
					]),
					articleLd(guide),
					faqPageLd(path, guide.faq),
				)}
			/>
			<section className={`hero ${s.heroLeft}`}>
				<div className={wideHero ? `wrap narrow ${s.wide}` : "wrap narrow"}>
					<div className={wideHero ? s.heroGrid : undefined}>
						<div className={s.heroText}>
							<nav className={s.crumbs} aria-label="Fil d&apos;Ariane">
								<Link href="/">Accueil</Link>
								<span aria-hidden="true">›</span>
								<Link href="/guides">Guides</Link>
							</nav>
							<h1 className={`h1 ${s.title}`}>{guide.h1}</h1>
							<div className={s.intro}>
								{guide.intro.map((p) => (
									<p key={p} className="lead">
										<Inline text={p} />
									</p>
								))}
							</div>
							{guide.summary && (
								<div className={s.resume}>
									<p className={s.resumeTitle}>En résumé</p>
									<ul className={s.ul}>
										{guide.summary.map((item) => (
											<li key={item}>
												<Inline text={item} />
											</li>
										))}
									</ul>
								</div>
							)}
							<p className={s.meta}>
								Par {guide.author} · mis à jour le {formatDateFr(guide.updated)} · {guide.readingMinutes} min de lecture
							</p>
						</div>
						{hero && (
							<figure className={s.heroPhoto}>
								<Image
									src={hero.src}
									width={hero.width}
									height={hero.height}
									alt={hero.alt}
									priority
									sizes="(min-width: 1100px) 460px, 100vw"
								/>
								<figcaption>
									<PhotoCredit credit={hero.credit} creditUrl={hero.creditUrl} />
								</figcaption>
							</figure>
						)}
						{heroIllus && (
							<div className={s.heroIllus}>
								<Illus name={heroIllus} />
							</div>
						)}
					</div>
					{(toc.length > 0 || guide.faq.length > 0) && (
						<nav className={s.toc} aria-labelledby="sommaire">
							<p className={s.tocTitle} id="sommaire">Dans ce guide</p>
							<ol>
								{toc.map((b) => (
									<li key={b.id}>
										<a href={`#${b.id}`}>{b.text}</a>
									</li>
								))}
								{guide.faq.length > 0 && (
									<li>
										<a href="#questions">Questions fréquentes</a>
									</li>
								)}
							</ol>
						</nav>
					)}
				</div>
			</section>

			<section className={`sec ${s.bodySec}`}>
				<div className={`wrap narrow ${s.wide} ${s.bodyGrid}`}>
					<div className={s.body}>
						{guide.blocks.map((block, i) => (
							<BlockView key={i} block={block} />
						))}
					</div>
					<aside className={s.aside}>
						{tocItems.length > 0 && <TocAside items={tocItems} />}
						<div className={s.asideCard}>
							<p className={s.asideCardTitle}>Diagnostic gratuit</p>
							<p>Repérez où l&apos;information se perd entre vos outils. Gratuit, en quelques minutes.</p>
							<Link href={guide.cta.href as never} className="cta">
								{guide.cta.label}
							</Link>
						</div>
					</aside>
				</div>
			</section>

			{guide.faq.length > 0 && (
				<section className="sec alt">
					<div className={`wrap narrow ${s.wide} ${s.faqGrid}`}>
						<div className={`sec-head ${s.faqHead}`}>
							<h2 className="h2" id="questions">Questions fréquentes</h2>
						</div>
						<div className={s.faq}>
							{guide.faq.map((item) => (
								<details key={item.q}>
									<summary>{item.q}</summary>
									<p>{item.a}</p>
								</details>
							))}
						</div>
					</div>
				</section>
			)}

			<section className="sec">
				<div className={`wrap narrow ${s.wide} ${s.closingGrid}`}>
					<div className={s.closingText}>
						<h2 className="h2">{guide.cta.h2}</h2>
						<p className={`lead ${s.closingLead}`}>
							<Inline text={guide.cta.text} />
						</p>
					</div>
					<div className={s.actions}>
						<Link href={guide.cta.href as never} className="cta">
							{guide.cta.label}
						</Link>
					</div>
				</div>
			</section>
		</Shell>
	);
}
