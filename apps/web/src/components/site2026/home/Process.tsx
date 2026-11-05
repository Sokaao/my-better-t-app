import type { CSSProperties } from "react";
import Link from "next/link";
import { CTA_HREF } from "@/components/site2026/cta";

// Section « 8. Comment ça se passe » de la page d'accueil (portée depuis la maquette validée).
export default function Process() {
	return (
		<section className="sec alt" id="process">
			<div className="wrap">
				<div className="sec-head split">
					<div>
						<span className="eyebrow">Comment ça se passe</span>
						<h2 className="h2" data-words=""><span className="t2">Un mois pour que tout tourne.</span><span className="t2 acc">Sans changer d'outils.</span></h2>
					</div>
					<div className="rv">
						<p className="lead">Vous gardez vos outils : je les relie autour d'un point central. Si votre organisation mérite d'être revue, on le voit ensemble pendant l'audit.</p>
						<Link href={CTA_HREF} className="cta">Faire mon diagnostic</Link>
					</div>
				</div>
				<div className="phases" id="phases">
					<div className="ph-line" aria-hidden="true"><svg viewBox="0 0 1000 48" preserveAspectRatio="none"><path d="M0 40 C 120 40, 160 8, 333 8 S 540 40, 666 40 S 880 8, 1000 8" /></svg></div>
					<div className="phase rv">
						<div className="ph-k"><span>1</span>Comprendre</div>
						<ol>
							<li>
								<i>1</i>
								<div><b>Diagnostic en ligne</b><span>Quelques minutes, gratuit.</span></div>
							</li>
							<li>
								<i>2</i>
								<div><b>Audit de 30 min ensemble</b><span>Vous repartez avec un plan complet : vos points forts, vos points faibles, et quoi relier en premier.</span></div>
							</li>
						</ol>
						<div className="free"><span className="chip ok">Gratuit · sans engagement</span></div>
					</div>
					<div className="phase rv" style={{ "--d": ".12s" } as CSSProperties}>
						<div className="ph-k"><span>2</span>Construire</div>
						<ol>
							<li>
								<i>3</i>
								<div><b>Cadrage</b><span>On fixe ce qui doit circuler, et où.</span></div>
							</li>
							<li>
								<i>4</i>
								<div><b>Construction</b><span>Je relie vos outils et je mets en place le pilotage.</span></div>
							</li>
							<li>
								<i>5</i>
								<div><b>Test et validation</b><span>Vous testez avant que ça tourne.</span></div>
							</li>
						</ol>
					</div>
					<div className="phase rv" style={{ "--d": ".24s" } as CSSProperties}>
						<div className="ph-k"><span>3</span>Faire tourner</div>
						<ol>
							<li>
								<i>6</i>
								<div><b>Mise en production</b><span>Tout tourne, vous gardez la main.</span></div>
							</li>
							<li>
								<i>7</i>
								<div><b>Suivi</b><span>J'ajuste au fil de vos retours.</span></div>
							</li>
						</ol>
					</div>
				</div>
				<p className="ph-note rv">Environ un mois entre l'audit et la mise en production.</p>
			</div>
		</section>
	);
}
