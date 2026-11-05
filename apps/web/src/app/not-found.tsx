import type { Metadata } from "next";
import Link from "next/link";
import { CTA_HREF, CTA_LABEL } from "@/components/site2026/cta";
import Shell from "@/components/site2026/Shell";
import s from "./not-found.module.css";

export const metadata: Metadata = {
	title: "Page introuvable",
	robots: { index: false },
};

// Page 404 dans le style du nouveau site (docs/REFONTE.md, § 9). Pas d'animation d'apparition :
// le script de l'accueil ne tourne pas ici, le contenu doit être visible d'emblée.
export default function NotFound() {
	return (
		<Shell>
			<section className={s.page}>
				<div className="wrap">
					<span className="eyebrow">Erreur 404</span>
					<h1 className="h2">
						<span className="t2">Cette page n&apos;existe pas.</span>
						<span className={`t2 ${s.follow}`}>Le site a changé, l&apos;adresse a pu suivre.</span>
					</h1>
					<p className={`lead ${s.text}`}>
						Si vous cherchez qui fait le lien entre vos outils, le diagnostic est le bon point de départ.
					</p>
					<div className={s.actions}>
						<Link href={CTA_HREF} className="cta big">
							{CTA_LABEL}
						</Link>
						<Link href="/" className={s.home}>
							Revenir à l&apos;accueil
						</Link>
					</div>
				</div>
			</section>
		</Shell>
	);
}
