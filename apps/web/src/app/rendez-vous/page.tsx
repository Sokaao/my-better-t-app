import Link from "next/link";
import CalInline from "@/components/site2026/CalInline";
import Shell from "@/components/site2026/Shell";
import s from "./rendez-vous.module.css";

// Réservation de l'audit gratuit de 30 minutes, sur le nouvel habillage (refonte 2026).
// Textes repris de la page Cal.com validée le 02/11/2026 (plan2.md, point 7).
export default function RendezVousPage() {
	return (
		<Shell>
			<section className={s.page}>
				<div className={s.intro}>
					<p className={s.kick}>Audit gratuit · 30 minutes</p>
					<h1 className={s.title}>Réservez vos 30 minutes d'audit</h1>
					<p className={s.lead}>
						On part de vos outils actuels : ce qui circule bien entre eux, et ce que votre équipe recopie, cherche ou relance encore à la main. Si vous avez fait le diagnostic en ligne, on part de votre carte.
					</p>
					<p className={s.lead}>Vous repartez avec un plan complet : vos points forts, vos points faibles, et ce qu'on relie en premier. Que vous travailliez avec moi ou non.</p>
					<div className={s.who}>
						{/* eslint-disable-next-line @next/next/no-img-element -- photo locale, déjà optimisée */}
						<img src="/images/frederic-mallet.jpg" alt="Frédéric Mallet" width={56} height={56} />
						<div>
							<p className={s.name}>Frédéric Mallet</p>
							<p className={s.meta}>30 min · Google Meet · Heure de Paris</p>
						</div>
					</div>
					<p className={s.diag}>
						Pas encore fait le diagnostic ? <Link href="/diagnostic">Il prend 3 minutes</Link>, et on gagne du temps pendant l'audit.
					</p>
				</div>
				<div className={s.cal}>
					<CalInline />
				</div>
			</section>
		</Shell>
	);
}
