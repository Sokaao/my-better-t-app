import Link from "next/link";
import SynapsisMark from "@/components/synapsis-mark";
import s from "@/styles/site.module.css";

// Pied de page commun aux pages nichées. Il porte les liens légaux, qui sont
// obligatoires, et rouvre la navigation : arrivé en bas, le lecteur doit pouvoir
// aller quelque part plutôt que se retrouver dans un cul-de-sac.
export default function SiteFooter() {
	return (
		<footer className={s.foot}>
			<div className={s.wrap}>
				<div className={s.footGrid}>
					<div className={s.footBrand}>
						<Link href="/" className={s.logo}>
							<SynapsisMark className={s.logoMark} />
							<span className={s.logoText}>
								<span className={s.logoWord}>SYNAPSIS</span>
								<span className={s.logoTagline}>Automatisation &amp; IA</span>
							</span>
						</Link>
						<span className={s.footBaseline}>
							Automatisation pour cabinets d&apos;expertise comptable. Tout ce qui entoure la
							comptabilité, jamais la comptabilité.
						</span>
					</div>

					<div className={s.footCol}>
						<span className={s.footHead}>Le site</span>
						<Link href="/diagnostic" className={s.footLink}>Le diagnostic</Link>
						<Link href="/offres" className={s.footLink}>L&apos;offre</Link>
						<Link href="/rendez-vous" className={s.footLink}>Prendre rendez-vous</Link>
					</div>

					<div className={s.footCol}>
						<span className={s.footHead}>Contact</span>
						<a href="mailto:contact@mysynapsis.fr" className={s.footLink}>contact@mysynapsis.fr</a>
						<a
							href="https://www.linkedin.com/in/frédéric-mallet-526426397/"
							target="_blank"
							rel="noopener noreferrer"
							className={s.footLink}
						>
							LinkedIn
						</a>
						<a
							href="https://www.instagram.com/synaps_is/"
							target="_blank"
							rel="noopener noreferrer"
							className={s.footLink}
						>
							Instagram
						</a>
					</div>

					<div className={s.footCol}>
						<span className={s.footHead}>Légal</span>
						<Link href="/mentions-legales" className={s.footLink}>Mentions légales</Link>
						<Link href="/politique-confidentialite" className={s.footLink}>Confidentialité</Link>
					</div>
				</div>

				<div className={s.footBottom}>
					<span>© {new Date().getFullYear()} Synapsis · Frédéric Mallet</span>
				</div>
			</div>
		</footer>
	);
}
