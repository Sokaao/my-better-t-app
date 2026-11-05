import type { CSSProperties } from "react";

// Section « 4. La fiche client » de la page d'accueil (portée depuis la maquette validée).
export default function Fiche() {
	return (
		<section className="sec alt scene" id="fiche" style={{ "--len": "220vh" } as CSSProperties}>
			<div className="stick">
				<div className="wrap">
					<div className="fiche-grid">
						<div>
							<span className="eyebrow">La fiche client</span>
							<h2 className="h2" data-words=""><span className="t2">Un client, une fiche.</span><span className="t2 acc">Toujours à jour.</span></h2>
							<p className="lead rv" style={{ marginTop: "20px" }}>Le mail, le devis, la relance, la signature, la facture : tout s'accroche à la même fiche. Votre équipe voit la même chose que vous, sans changer d'outils.</p>
							<ol className="steps" id="ficheSteps" aria-hidden="true">
								<li>Premier contact</li>
								<li>Échanges</li>
								<li>Devis</li>
								<li>Relance</li>
								<li>Signature</li>
								<li>Facture</li>
								<li>Paiement</li>
							</ol>
						</div>
						<div className="card fiche rv" id="ficheCard">
							<div className="fc-head">
								<span className="av l julien" />
								<div><b>Julien Petit</b><small>Petit Rénovation · arrivé le 14 oct.</small></div>
								<span className="chip" id="ficheTag">Prospect</span>
							</div>
							<div className="fc-row"><span className="k">Source</span><span className="v">Formulaire du site · 14 oct., 09:12</span></div>
							<div className="fc-row"><span className="k">Échanges</span><span className="v">3 mails et 1 WhatsApp, rattachés seuls</span></div>
							<div className="fc-row"><span className="k">Devis</span><span className="v">D-0412 · 2 340 € · envoyé le 15 oct.</span></div>
							<div className="fc-row"><span className="k">Relance</span><span className="v">J+3 · préparée, validée par Antoine</span></div>
							<div className="fc-row"><span className="k">Signature</span><span className="v ok">Bon pour accord signé · 21 oct.</span></div>
							<div className="fc-row"><span className="k">Facture</span><span className="v">F-2026-118 · envoyée le 21 oct.</span></div>
							<div className="fc-row"><span className="k">Paiement</span><span className="v ok">2 340 € reçus · 29 oct.</span></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
