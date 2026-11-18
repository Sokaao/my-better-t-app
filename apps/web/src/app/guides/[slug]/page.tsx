import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/site2026/Shell";
import JsonLd from "@/components/seo/JsonLd";
import { articleLd, breadcrumbTrailLd, faqPageLd, graph } from "@/components/seo/schemas";
import Inline from "@/components/site2026/guides/Inline";
import CopyButton from "@/components/site2026/guides/CopyButton";
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
			images: ["/opengraph-image"],
			title: guide.title,
			description: guide.description,
			url,
			publishedTime: guide.published,
			modifiedTime: guide.updated,
			authors: [guide.author],
		},
		twitter: { title: guide.title, description: guide.description },
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
	}
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const guide = getGuide(slug);
	if (!guide) notFound();
	const path = `/guides/${guide.slug}`;
	const toc = guide.blocks.flatMap((b) => (b.type === "h2" ? [b] : []));

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
				<div className="wrap narrow">
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
					<p className={s.meta}>
						Par {guide.author} · mis à jour le {formatDateFr(guide.updated)} · {guide.readingMinutes} min de lecture
					</p>
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
				<div className="wrap narrow">
					<div className={s.body}>
						{guide.blocks.map((block, i) => (
							<BlockView key={i} block={block} />
						))}
					</div>
				</div>
			</section>

			{guide.faq.length > 0 && (
				<section className="sec alt">
					<div className="wrap narrow">
						<div className="sec-head">
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
				<div className="wrap narrow">
					<h2 className="h2">{guide.cta.h2}</h2>
					<p className={`lead ${s.closingLead}`}>
						<Inline text={guide.cta.text} />
					</p>
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
