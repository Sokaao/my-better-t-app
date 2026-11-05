// Section « 2. Vous vous reconnaissez ? » de la page d'accueil (portée depuis la maquette validée).
export default function Douleurs() {
	return (
		<section className="sec alt" id="douleurs">
			<div className="wrap narrow">
				<div className="sec-head center">
					<span className="eyebrow">Ça vous arrive</span>
					<h2 className="h2" data-words="">Vous vous reconnaissez ?</h2>
				</div>
				<ul className="checks">
					<li className="ck"><span className="box" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M2.5 7.4l3 3L11.5 4" /></svg></span>Chacun a son fichier clients, et personne n'a la même version.</li>
					<li className="ck"><span className="box" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M2.5 7.4l3 3L11.5 4" /></svg></span>Vous recopiez la même information dans trois outils.</li>
					<li className="ck"><span className="box" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M2.5 7.4l3 3L11.5 4" /></svg></span>Une relance oubliée vous a déjà coûté un client.</li>
					<li className="ck"><span className="box" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M2.5 7.4l3 3L11.5 4" /></svg></span>Là, maintenant, vous ne savez pas quels devis attendent une réponse.</li>
					<li className="ck"><span className="box" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M2.5 7.4l3 3L11.5 4" /></svg></span>Vous apprenez qu'un client attend en lisant sa réclamation.</li>
				</ul>
				<p className="checks-end rv">3 sur 5 ? <em>Vous êtes au bon endroit.</em></p>
			</div>
		</section>
	);
}
