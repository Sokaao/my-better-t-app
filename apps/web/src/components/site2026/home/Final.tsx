import Link from "next/link";
import { CTA_HREF } from "@/components/site2026/cta";

// Section « 10. Appel final » de la page d'accueil (portée depuis la maquette validée).
export default function Final() {
	return (
		<section className="dsec">
			<div className="dcard closing">
				<span className="glow" aria-hidden="true" />
				<div className="chip-f k1" aria-hidden="true" data-par=".14">Relances prêtes<b>3</b></div>
				<div className="chip-f k2" aria-hidden="true" data-par="-.1">Encaissé ce mois<b>48 600 €</b></div>
				<div className="chip-f k3" aria-hidden="true" data-par=".08">Devis en attente<b>6</b></div>
				<div className="wrap">
					<h2 className="h2" data-words=""><span className="t2">Synapsis.</span><span className="t2 acc">Vos outils se parlent. Vous décidez.</span></h2>
					<p className="lead rv">Quelques minutes pour voir où ça coince chez vous. Puis 30 minutes ensemble, et un plan complet.</p>
					<Link href={CTA_HREF} className="cta big rv">Faire mon diagnostic</Link>
				</div>
			</div>
		</section>
	);
}
