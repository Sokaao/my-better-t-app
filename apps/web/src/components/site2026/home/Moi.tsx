// Section « 7. Un seul interlocuteur » de la page d'accueil (portée depuis la maquette validée).
export default function Moi() {
	return (
		<section className="sec" id="moi">
			<div className="wrap me-grid">
				<div className="me-ph rv"><img alt="Frédéric Mallet" width="340" height="340" src="/images/frederic-mallet.webp" /></div>
				<div>
					<span className="eyebrow">Qui je suis</span>
					<h2 className="h2" data-words=""><span className="t2">Un seul interlocuteur.</span><span className="t2 acc">Celui qui fait le travail.</span></h2>
					<p className="lead rv" style={{ marginTop: "20px" }}>Frédéric Mallet. Le diagnostic, l'audit, la mise en place et le suivi : c'est moi. Pas de sous-traitance, pas de commercial entre nous.</p>
					<ul className="me-facts rv">
						<li><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#fdeee6" /><path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="#c23f08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Je relie les outils que vous avez déjà, autour d'un point central.</li>
						<li><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#fdeee6" /><path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="#c23f08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Si votre organisation mérite d'être revue, je vous le dis.</li>
						<li><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#fdeee6" /><path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="#c23f08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Vous validez chaque étape.</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
