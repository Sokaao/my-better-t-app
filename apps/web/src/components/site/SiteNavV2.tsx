"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import SynapsisMark from "@/components/synapsis-mark";
import s from "@/styles/site.module.css";

export type NavLink = { href: string; label: string };

// Les ancres de la page d'accueil. Une autre page passe les siennes en props.
const DEFAULT_LINKS: NavLink[] = [
	{ href: "#probleme", label: "Le problème" },
	{ href: "#mecanisme", label: "Le mécanisme" },
	{ href: "/methode", label: "La méthode" },
	{ href: "#offre", label: "L'offre" },
];

// Navigation des pages nichées : la marque, les ancres, le bouton diagnostic.
// `ctaLocation` nomme l'événement analytics du bouton, propre à chaque page.
export default function SiteNavV2({
	links = DEFAULT_LINKS,
	ctaLocation = "home_nav",
}: {
	links?: NavLink[];
	ctaLocation?: string;
}) {
	return (
		<nav className={s.nav}>
			<div className={`${s.wrap} ${s.navIn}`}>
				<Link href="/" className={s.logo}>
					<SynapsisMark className={s.logoMark} />
					<span className={s.logoText}>
						<span className={s.logoWord}>SYNAPSIS</span>
						<span className={s.logoTagline}>Automatisation &amp; IA</span>
					</span>
				</Link>
				<div className={s.navLinks}>
					{links.map((l) => (
						<a key={l.href} className={s.navItem} href={l.href}>
							{l.label}
						</a>
					))}
					<Link
						href="/diagnostic"
						className={`${s.btn} ${s.btnPrimary}`}
						onClick={() => track("cta_diagnostic", { location: ctaLocation })}
					>
						Faire le diagnostic <span className={s.arr}>→</span>
					</Link>
				</div>
			</div>
		</nav>
	);
}
