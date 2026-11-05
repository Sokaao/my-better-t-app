// Section « 9. Questions » de la page d'accueil (portée depuis la maquette validée).
export default function Faq() {
	return (
		<section className="sec" id="faq">
			<div className="wrap narrow">
				<div className="sec-head center" style={{ marginBottom: "0" }}>
					<span className="eyebrow">Questions</span>
					<h2 className="h2" data-words="">Les questions qu'on me pose</h2>
				</div>
				<div className="faq rv">
					<details>
						<summary>Dois-je changer d'outils ?</summary>
						<p>Non. Je relie ceux que vous utilisez déjà autour d'un point central : la fiche client et le tableau de pilotage. Si l'audit montre qu'un outil vous freine, je vous le dis, mais ce n'est jamais le point de départ.</p>
					</details>
					<details>
						<summary>Combien de temps ça prend ?</summary>
						<p>Environ un mois entre l'audit et la mise en production. Le diagnostic, lui, prend quelques minutes.</p>
					</details>
					<details>
						<summary>Que se passe-t-il après l'audit ?</summary>
						<p>Vous repartez avec un plan complet : vos points forts, vos points faibles, et ce qu'il faut relier en premier. Sans engagement : le plan est à vous, même si on s'arrête là.</p>
					</details>
					<details>
						<summary>Je ne suis pas à l'aise avec la technique.</summary>
						<p>Vous n'avez rien à configurer. Je construis, vous testez, vous validez.</p>
					</details>
					<details>
						<summary>L'IA peut-elle envoyer des messages sans moi ?</summary>
						<p>Non. Elle trie et prépare. Rien ne part sans votre clic.</p>
					</details>
					<details>
						<summary>Combien ça coûte ?</summary>
						<p>Ça dépend de ce qu'on trouve pendant l'audit. Le diagnostic et l'audit sont gratuits.</p>
					</details>
				</div>
			</div>
		</section>
	);
}
