import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/site2026/Shell";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/components/seo/schemas";
import { formatDateFr, getAllGuides } from "@/lib/guides";
import s from "@/components/site2026/guides/guide.module.css";

const TITLE = "Guides pratiques pour dirigeants de PME | Synapsis";
const DESCRIPTION = "Relances, double saisie, outils qui ne se parlent pas : des méthodes concrètes et des modèles prêts à l'emploi pour les PME.";

export const metadata: Metadata = {
	title: { absolute: TITLE },
	description: DESCRIPTION,
	alternates: { canonical: "/guides" },
	openGraph: { title: TITLE, description: DESCRIPTION, url: "/guides", siteName: "Synapsis", locale: "fr_FR", images: ["/opengraph-image"] },
	twitter: { title: TITLE, description: DESCRIPTION },
};

export default function GuidesPage() {
	const guides = getAllGuides();

	return (
		<Shell>
			<JsonLd data={graph(breadcrumbLd("Guides", "/guides"))} />
			<section className={`hero ${s.heroLeft}`}>
				<div className="wrap">
					<h1 className={`h1 ${s.title}`}>Guides pratiques</h1>
					<p className={`sub ${s.lead0}`}>
						Des méthodes concrètes, écrites pour les dirigeants de PME, avec des modèles que vous pouvez copier dès aujourd'hui.
					</p>
				</div>
			</section>

			<section className="sec">
				<div className="wrap">
					{guides.length === 0 && <p>Le premier guide arrive bientôt.</p>}
					<ul className={s.cards}>
						{guides.map((g) => (
							<li key={g.slug} className={s.card}>
								<h2>
									<Link href={`/guides/${g.slug}` as never}>{g.h1}</Link>
								</h2>
								<p>{g.description}</p>
								<p className={s.date}>Mis à jour le {formatDateFr(g.updated)}</p>
							</li>
						))}
					</ul>
				</div>
			</section>
		</Shell>
	);
}
