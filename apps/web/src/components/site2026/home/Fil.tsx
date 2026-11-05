import type { CSSProperties } from "react";

// Section « 3. Le fil : plus rien à recopier » de la page d'accueil (portée depuis la maquette validée).
export default function Fil() {
	return (
		<section className="sec scene" id="fil" style={{ "--len": "460vh" } as CSSProperties}>
			<div className="stick">
				<div className="wrap">
					<div className="sec-head split">
						<div>
							<span className="eyebrow">Zéro ressaisie</span>
							<h2 className="h2" data-words=""><span className="t2">Plus rien à recopier.</span><span className="t2 acc">Plus rien d'oublié.</span></h2>
						</div>
						<p className="lead rv">Un client écrit, et tout suit : sa fiche se crée, le devis part, la relance tombe au bon moment, la facture suit la signature. <b>Personne ne recopie rien.</b></p>
					</div>
				</div>
				<div className="track-vp" id="trackVp">
					<div className="track" id="track">
						<svg className="curve-svg" id="curveSvg" aria-hidden="true"><path className="c-base" id="cBase" /><path className="c-draw" id="cDraw" /></svg>
						<span className="c-dot" id="cDot" aria-hidden="true" />
						<div className="ev">
							<span className="ev-ring" /><span className="ev-dot" />
							<div className="ev-c"><span className="t">Lundi 09:12</span><b>Mail de Julien reçu</b><small>Demande de devis via le formulaire du site</small></div>
						</div>
						<div className="ev">
							<span className="ev-ring" /><span className="ev-dot" />
							<div className="ev-c"><span className="t">09:12</span><b>Fiche créée</b><small>Au point central, sans aucune saisie</small></div>
						</div>
						<div className="ev">
							<span className="ev-ring" /><span className="ev-dot" />
							<div className="ev-c"><span className="t">Mardi 10:30</span><b>Devis envoyé</b><small>D-0412 · 2 340 €, rattaché à la fiche</small></div>
						</div>
						<div className="ev">
							<span className="ev-ring" /><span className="ev-dot" />
							<div className="ev-c"><span className="t">Vendredi 08:00</span><b>Pas de réponse</b><small>Relance J+3 prête, validée par Antoine</small></div>
						</div>
						<div className="ev">
							<span className="ev-ring" /><span className="ev-dot" />
							<div className="ev-c"><span className="t">Lundi 14:05</span><b>Bon pour accord signé</b><small>Julien signe en ligne</small></div>
						</div>
						<div className="ev">
							<span className="ev-ring" /><span className="ev-dot" />
							<div className="ev-c"><span className="t">Lundi 14:06</span><b>Facture envoyée</b><small>Générée depuis le devis signé</small></div>
						</div>
						<div className="ev last">
							<span className="ev-ring" /><span className="ev-dot" />
							<div className="ev-c"><span className="t">J+8</span><b>Paiement reçu</b><small>2 340 € encaissés, fiche à jour</small></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
