"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import SynapsisMark from "@/components/synapsis-mark";

export default function SiteNav() {
	return (
		<nav className="s-nav">
			<div className="s-nav-in">
				<Link href="/" className="s-logo">
					<SynapsisMark className="mark" />
					<span className="s-logo-text">
						<span className="s-logo-word">SYNAPSIS</span>
						<span className="s-logo-tagline">Automatisation &amp; IA</span>
					</span>
				</Link>
				<div className="s-nav-links">
					<Link href="/#solutions">Systèmes</Link>
					<Link href="/#preuves">Réalisations</Link>
					<Link href="/offres">Offres</Link>
					<Link href="/#methode">Méthode</Link>
					<Link href="/#qui">Qui suis-je</Link>
					<Link
						href="/rendez-vous"
						className="s-btn s-btn-primary"
						onClick={() => track("cta_reserver_appel", { location: "nav" })}
					>
						Réserver un appel <span className="arr">→</span>
					</Link>
				</div>
			</div>
		</nav>
	);
}
