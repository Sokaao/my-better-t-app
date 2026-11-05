import Link from "next/link";
import { CTA_HREF } from "@/components/site2026/cta";

// En-tête flottant en pilule, commun à tout le nouveau site.
export default function Header() {
	return (
		<header className="nav">
			<div className="cap">
				<Link href="/" className="brand" aria-label="Synapsis, accueil"> <svg viewBox="0 0 80 80" aria-hidden="true"><g transform="translate(13, 9) scale(0.98)"><path d="M 11 11 C 27 11 43 19 43 31" stroke="#e8500f" strokeWidth="4.5" fill="none" strokeLinecap="round" /><path d="M 43 31 C 43 43 27 51 11 51" stroke="#e8500f" strokeWidth="4.5" fill="none" strokeLinecap="round" /><circle cx="11" cy="11" r="6.5" fill="#e8500f" /><circle cx="11" cy="51" r="6.5" fill="#e8500f" /><circle cx="43" cy="31" r="9.5" fill="#fff" /><circle cx="43" cy="31" r="6.5" fill="#e8500f" /></g></svg> Synapsis </Link>
				<nav className="links" aria-label="Navigation principale"><a href="/#process">Comment ça se passe</a><a href="/#faq">Questions</a></nav>
				<Link href={CTA_HREF} className="cta pill">Faire mon diagnostic</Link>
			</div>
		</header>
	);
}
