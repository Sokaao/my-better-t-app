import type { CSSProperties } from "react";

// Section « 5. Le pilotage » de la page d'accueil (portée depuis la maquette validée).
export default function Pilotage() {
	return (
		<section className="sec" id="pilotage">
			<div className="wrap">
				<div className="sec-head split">
					<div>
						<span className="eyebrow">Le pilotage</span>
						<h2 className="h2" data-words=""><span className="t2">Vous voyez ce qui coince</span><span className="t2 acc">avant le client.</span></h2>
					</div>
					<p className="lead rv">Un tableau de pilotage qui se met à jour seul, et un récap chaque matin : ce qui attend, ce qui bloque, ce qui est prêt.</p>
				</div>
				<div className="tabs rv" role="tablist" aria-label="Vues du tableau de pilotage"> <button type="button" role="tab" id="tb1" aria-controls="tp1" aria-selected="true">Relances</button> <button type="button" role="tab" id="tb2" aria-controls="tp2" aria-selected="false" tabIndex={-1}>Devis en attente</button> <button type="button" role="tab" id="tb3" aria-controls="tp3" aria-selected="false" tabIndex={-1}>Encaissements</button> </div>
				<div className="dash-wrap" id="dashWrap">
					<div className="card dash rv">
						<div className="dash-top" aria-hidden="true"><i /><i /><i /><b>Pilotage</b><span>Morel Formation · aujourd'hui</span></div>
						<div className="tp" id="tp1" role="tabpanel" aria-labelledby="tb1">
							<div className="t-row t-head"><span>Client</span><span className="obj">Objet</span><span className="late">Attente</span><span>Statut</span></div>
							<div className="t-row"><span className="who"><span className="av julien" /><span>Julien Petit</span></span><span className="obj">Bon pour accord</span><span className="late">6 jours</span><span className="chip warn">Relance prête</span></div>
							<div className="t-row"><span className="who"><span className="av garnier" /><span>Garnier SARL</span></span><span className="obj">Facture F-2026-104</span><span className="late">12 jours</span><span className="chip alert">En retard</span></div>
							<div className="t-row"><span className="who"><span className="av nadia" /><span>Nadia Benali</span></span><span className="obj">Devis D-0409</span><span className="late">3 jours</span><span className="chip">Relancée</span></div>
							<div className="t-row"><span className="who"><span className="av paul" /><span>Paul Roussel</span></span><span className="obj">Rendez-vous</span><span className="late">demain</span><span className="chip ok">Confirmé</span></div>
						</div>
						<div className="tp" id="tp2" role="tabpanel" aria-labelledby="tb2" hidden>
							<div className="kpis">
								<div className="kpi"><small>Devis en attente</small><b className="tab" data-count="6">0</b></div>
								<div className="kpi"><small>Montant</small><b className="tab" data-count="18450" data-suf=" €">0 €</b></div>
								<div className="kpi"><small>Attente moyenne</small><b className="tab" data-count="4.5" data-dec="1" data-suf=" j">0 j</b></div>
							</div>
							<div className="b-row"><span className="who"><span className="av sophie" /><span>Sophie Laurent · 1 250 €</span></span><span className="bar"><i className="hot" data-w="100" /></span><span className="d tab">8 j</span></div>
							<div className="b-row"><span className="who"><span className="av julien" /><span>Julien Petit · 2 340 €</span></span><span className="bar"><i data-w="75" /></span><span className="d tab">6 j</span></div>
							<div className="b-row"><span className="who"><span className="av nadia" /><span>Nadia Benali · 4 180 €</span></span><span className="bar"><i data-w="38" /></span><span className="d tab">3 j</span></div>
							<div className="b-row"><span className="who"><span className="av romain" /><span>Atelier Morin · 6 900 €</span></span><span className="bar"><i data-w="25" /></span><span className="d tab">2 j</span></div>
						</div>
						<div className="tp" id="tp3" role="tabpanel" aria-labelledby="tb3" hidden>
							<div className="kpis">
								<div className="kpi"><small>Encaissé ce mois</small><b className="tab" data-count="48600" data-suf=" €">0 €</b></div>
								<div className="kpi"><small>En attente</small><b className="tab" data-count="11240" data-suf=" €">0 €</b></div>
								<div className="kpi alert"><small>En retard</small><b className="tab" data-count="2340" data-suf=" €">0 €</b></div>
							</div>
							<div className="chart" id="chart">
								<small>Encaissements, 6 derniers mois</small>
								<div className="chart-r"><svg viewBox="0 0 600 150" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e8500f" stopOpacity=".22" /><stop offset="1" stopColor="#e8500f" stopOpacity="0" /></linearGradient></defs><path d="M0 118 C 60 112, 90 98, 120 100 S 200 80, 240 84 S 330 60, 360 62 S 450 40, 480 44 S 560 22, 600 18 L600 150 L0 150 Z" fill="url(#gA)" /><path d="M0 118 C 60 112, 90 98, 120 100 S 200 80, 240 84 S 330 60, 360 62 S 450 40, 480 44 S 560 22, 600 18" fill="none" stroke="#e8500f" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /></svg></div>
							</div>
						</div>
					</div>
					<div className="card recap rv" style={{ "--d": ".15s" } as CSSProperties}>
						<div className="recap-h">
							<span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></span>
							<div><b>Récap du matin</b><small>Chaque jour à 8 h, par e-mail ou WhatsApp</small></div>
						</div>
						<p>Bonjour, voici ce qui compte aujourd'hui :</p>
						<ul>
							<li className="wait">2 devis sans réponse depuis 5 jours</li>
							<li className="alert">1 facture en retard · Garnier SARL</li>
							<li>1 relance prête à valider · Julien Petit</li>
						</ul>
						<span className="open">Ouvrir le pilotage →</span>
					</div>
				</div>
			</div>
		</section>
	);
}
