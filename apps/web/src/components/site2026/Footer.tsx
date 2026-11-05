import Link from "next/link";

// Pied de page commun à tout le nouveau site.
export default function Footer() {
	return (
		<footer>
			<div className="wrap">
				<div className="col"><b>Synapsis</b><span>Frédéric Mallet, indépendant</span><span>contact@mysynapsis.fr</span></div>
				<ul>
					<li><Link href="/mentions-legales">Mentions légales</Link></li>
					<li><Link href="/politique-confidentialite">Politique de confidentialité</Link></li>
				</ul>
			</div>
		</footer>
	);
}
