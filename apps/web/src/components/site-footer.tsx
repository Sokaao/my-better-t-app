import Link from "next/link";
import SynapsisMark from "@/components/synapsis-mark";

export default function SiteFooter() {
	return (
		<footer className="s-footer">
			<div className="s-wrap">
				<div className="s-foot-in">
					<div className="s-foot-col">
						<Link href="/" className="s-logo" style={{ marginBottom: 6 }}>
							<SynapsisMark className="mark" />
							SYNAPSIS
						</Link>
						<span style={{ color: "var(--faint)", fontSize: 13, maxWidth: "22em" }}>
							Systèmes d&apos;automatisation sur-mesure pour dirigeants qui veulent scaler sans grossir.
						</span>
					</div>
					<div className="s-foot-col">
						<span className="h">Contact</span>
						<a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a>
						<a href="tel:+33759951051">07 59 95 10 51</a>
					</div>
					<div className="s-foot-col">
						<span className="h">Réseaux</span>
						<a
							href="https://www.linkedin.com/in/frédéric-mallet-526426397/"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn
						</a>
						<a
							href="https://www.instagram.com/synaps_is/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Instagram
						</a>
					</div>
					<div className="s-foot-col">
						<span className="h">Légal</span>
						<Link href="/mentions-legales">Mentions légales</Link>
						<Link href="/politique-confidentialite">Confidentialité</Link>
					</div>
				</div>
				<div className="s-copy">© {new Date().getFullYear()} Synapsis — Tous droits réservés</div>
			</div>
		</footer>
	);
}
