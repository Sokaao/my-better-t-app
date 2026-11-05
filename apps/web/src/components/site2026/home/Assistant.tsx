// Section « 6. L'assistant IA (la seule section sombre du milieu de page) » de la page d'accueil (portée depuis la maquette validée).
export default function Assistant() {
	return (
		<section className="dsec" id="ia">
			<div className="dcard">
				<div className="wrap ia-grid">
					<div>
						<span className="eyebrow">L'assistant IA</span>
						<h2 className="h2" data-words=""><span className="t2">Il prépare tout.</span><span className="t2 acc">Vous décidez.</span></h2>
						<p className="lead rv" style={{ marginTop: "20px" }}>Il trie les demandes, rédige les relances, prépare les réponses. Il n'envoie rien sans votre clic : c'est un assistant, pas un pilote automatique.</p>
						<ul className="ia-list rv">
							<li><b>08:02</b>3 demandes triées par urgence</li>
							<li><b>08:05</b>2 relances rédigées, en attente de votre accord</li>
							<li><b>08:06</b>1 réponse préparée pour Garnier SARL</li>
						</ul>
					</div>
					<div className="ia-stage">
						<span className="glow" aria-hidden="true" />
						<div className="chip-f c1" aria-hidden="true" data-par=".12">Relances prêtes<b>3</b></div>
						<div className="chip-f c2" aria-hidden="true" data-par="-.1">Devis en attente<b>6</b></div>
						<div className="ia-card" id="iaCard">
							<div className="ia-h"><span className="ia-badge" aria-hidden="true">IA</span><b>Assistant</b><small>vient de préparer</small></div>
							<p className="ia-msg" id="iaMsg">Julien n'a pas signé le bon pour accord depuis 6 jours. J'ai préparé la relance. Je l'envoie ?</p>
							<div className="ia-btns" aria-hidden="true"><span className="ok">Valider</span><span className="no">Modifier</span></div>
							<div className="ia-done"><i>✓</i>Relance envoyée · validée par vous</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
