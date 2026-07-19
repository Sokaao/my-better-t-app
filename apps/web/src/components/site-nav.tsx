"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import SynapsisMark from "@/components/synapsis-mark";

export default function SiteNav() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const close = () => setOpen(false);

	return (
		<>
		<nav className="s-nav">
			<div className="s-nav-in">
				<Link href="/" className="s-logo" onClick={close}>
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
					<button
						type="button"
						className={`s-burger${open ? " open" : ""}`}
						aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
						aria-expanded={open}
						onClick={() => setOpen((v) => !v)}
					>
						<span />
						<span />
						<span />
					</button>
				</div>
			</div>
		</nav>

		<div className={`s-mobile-overlay${open ? " open" : ""}`}>
			<div className="s-mobile-overlay-links">
				<Link href="/#solutions" onClick={close}>Systèmes</Link>
				<Link href="/#preuves" onClick={close}>Réalisations</Link>
				<Link href="/offres" onClick={close}>Offres</Link>
				<Link href="/#methode" onClick={close}>Méthode</Link>
				<Link href="/#qui" onClick={close}>Qui suis-je</Link>
				<Link
					href="/rendez-vous"
					className="s-btn s-btn-primary"
					onClick={() => {
						track("cta_reserver_appel", { location: "nav_mobile" });
						close();
					}}
				>
					Réserver un appel <span className="arr">→</span>
				</Link>
			</div>
		</div>
		</>
	);
}
