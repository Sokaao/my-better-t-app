// Diagnostic par métier : le décor HTML (porté depuis la maquette validée le 05/11/2026). Tout le comportement vit dans diagnostic-player.js.
export default function DiagnosticMarkup() {
	return (
		<div className="d26-page">
			<header className="top">
				<div className="top-in">
					<a className="brand" href="/" aria-label="Synapsis, accueil"> <svg viewBox="0 0 80 80" aria-hidden="true"><g transform="translate(13, 9) scale(0.98)"><path d="M 11 11 C 27 11 43 19 43 31" stroke="#e8500f" strokeWidth="4.5" fill="none" strokeLinecap="round" /><path d="M 43 31 C 43 43 27 51 11 51" stroke="#e8500f" strokeWidth="4.5" fill="none" strokeLinecap="round" /><circle cx="11" cy="11" r="6.5" fill="#e8500f" /><circle cx="11" cy="51" r="6.5" fill="#e8500f" /><circle cx="43" cy="31" r="9.5" fill="#fff" /><circle cx="43" cy="31" r="6.5" fill="#e8500f" /></g></svg> <span>Synapsis</span> </a>
					<div className="prog" id="prog" role="progressbar" aria-label="Avancement du diagnostic" aria-valuemin={0} aria-valuemax={10} aria-valuenow={0}>
						<span className="prog-l" id="progL">Diagnostic gratuit</span>
						<div className="prog-b"><i id="progB" /></div>
					</div>
					<a className="sim-tag top-rdv" href="/rendez-vous"><span className="l">Déjà décidé ? </span>Réserver l'audit</a>
				</div>
			</header>
			<main>
				<section className="stage" id="stage">
					<div className="pane" id="pane">
						<div className="step" data-step="intro">
							<span className="pill">Diagnostic gratuit · 3 minutes</span>
							<h1 data-h="" tabIndex={-1}>Où se perd l'information entre vos outils ?</h1>
							<p className="lead">Choisissez votre métier et vos outils, puis répondez à 8 questions pensées pour votre activité. Votre carte se construit au fil des réponses, et votre résultat s'affiche tout de suite, sans e-mail.</p>
							<ul className="gets">
								<li><svg viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="11" fill="#fdeee6" /><path d="M6.5 11.5l3 3 6-6.5" fill="none" stroke="#c23f08" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>Votre indice de connexion, sur 100</li>
								<li><svg viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="11" fill="#fdeee6" /><path d="M6.5 11.5l3 3 6-6.5" fill="none" stroke="#c23f08" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>La carte de vos outils : ce qui est relié, ce qui passe à la main</li>
								<li><svg viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="11" fill="#fdeee6" /><path d="M6.5 11.5l3 3 6-6.5" fill="none" stroke="#c23f08" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>Le premier blocage à traiter</li>
							</ul>
							<button className="cta big" type="button" data-go="metier">Commencer le diagnostic <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4.5L15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
							<div className="direct">
								<p>Vous savez déjà ce dont vous avez besoin ?</p>
								<a href="/rendez-vous">Réserver directement un rendez-vous <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4.5L15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
							</div>
							<p className="note"><img src="/images/frederic-mallet.jpg" alt="" width="30" height="30" />Conçu par Frédéric Mallet. Rien n'est envoyé tant que vous ne le demandez pas.</p>
						</div>
						<div className="step" data-step="metier" hidden>
							<p className="kick">Votre métier</p>
							<h2 data-h="" tabIndex={-1}>Quel est votre métier ?</h2>
							<p className="hint">Les questions s'adaptent à votre activité. Vous ne la trouvez pas ? Choisissez « Autre activité ».</p>
							<div className="groups" id="metiers" />
							<div className="add m-other" id="mOther" hidden><label className="sr" htmlFor="mOtherIn">Votre activité, en quelques mots</label><input id="mOtherIn" type="text" maxLength={60} placeholder="Votre activité, en quelques mots (facultatif)" autoComplete="off" /></div>
							<div className="foot"><button className="ghost" type="button" data-back=""><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3m4-4.5L2.5 8 7 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Retour</button><button className="cta" type="button" id="metierNext" data-next="" disabled>Continuer</button></div>
						</div>
						<div className="step" data-step="tools" hidden>
							<p className="kick">Vos outils</p>
							<h2 data-h="" tabIndex={-1}>Quels outils votre équipe utilise-t-elle chaque semaine ?</h2>
							<p className="hint">Cochez tout ce qui sert, même un simple fichier Excel. Au moins deux.</p>
							<div className="groups" id="groups" />
							<p className="msg" id="toolMsg" aria-live="polite" />
							<div className="foot"><button className="ghost" type="button" data-back=""><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3m4-4.5L2.5 8 7 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>Retour</button><button className="cta" type="button" id="toolsNext" data-next="" disabled>Continuer</button></div>
						</div>
						{/* QUESTIONS */}
						<div className="step" data-step="calc" hidden>
							<p className="kick">Analyse</p>
							<h2 data-h="" tabIndex={-1}>Je relie vos réponses…</h2>
							<ul className="calc" id="calcL">
								<li><i><svg viewBox="0 0 14 14"><path d="M3 7.5l2.5 2.5L11 4.5" fill="none" stroke="#0e0e10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></i><span id="calc1">Lecture de vos outils</span></li>
								<li><i><svg viewBox="0 0 14 14"><path d="M3 7.5l2.5 2.5L11 4.5" fill="none" stroke="#0e0e10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></i><span>Évaluation de chaque lien</span></li>
								<li><i><svg viewBox="0 0 14 14"><path d="M3 7.5l2.5 2.5L11 4.5" fill="none" stroke="#0e0e10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></i><span>Calcul de votre indice de connexion</span></li>
							</ul>
						</div>
						<div className="step" data-step="result" hidden>
							<p className="kick">Votre résultat</p>
							<div className="res-top">
								<div className="score" id="score">
									<svg viewBox="0 0 120 120" aria-hidden="true"><circle className="sc-t" cx="60" cy="60" r="52" /><circle className="sc-v" id="scV" cx="60" cy="60" r="52" pathLength="100" /></svg>
									<div className="sc-n"><b id="scN">0</b><span>sur 100</span></div>
								</div>
								<p className="lab">Indice de connexion<b id="scB" /></p>
							</div>
							<h2 className="band-t" id="bandT" data-h="" tabIndex={-1} />
							<p className="band-p" id="bandP" />
							<div className="first" id="first" />
							<p className="fit" id="fit" hidden />
							<div className="res-act"><a className="cta" href="#report" id="toReport">Recevoir mon rapport complet</a><button className="ghost" type="button" id="restart">Recommencer</button></div>
						</div>
					</div>
					<aside className="mapcard" aria-hidden="true">
						<div className="map-bg" />
						<div className="map" id="map">
							<div className="map-cap"><b>Votre carte</b><span className="cnt" id="mapCnt" /><span className="pv-t" id="pvT" /></div>
							<svg className="pv-l" id="pvL" aria-hidden="true" />
							<div className="pv" id="pv" />
							<svg className="links" id="links"><circle className="p-ring" id="pRing" r="10" /></svg>
							<div className="hub" id="hub">
								<div className="hub-in"><svg viewBox="0 0 80 80"><g transform="translate(13, 9) scale(0.98)"><path d="M 11 11 C 27 11 43 19 43 31" stroke="#e8500f" strokeWidth="4.5" fill="none" strokeLinecap="round" /><path d="M 43 31 C 43 43 27 51 11 51" stroke="#e8500f" strokeWidth="4.5" fill="none" strokeLinecap="round" /><circle cx="11" cy="11" r="6.5" fill="#e8500f" /><circle cx="11" cy="51" r="6.5" fill="#e8500f" /><circle cx="43" cy="31" r="9.5" fill="#fff" /><circle cx="43" cy="31" r="6.5" fill="#e8500f" /></g></svg><b>Fiche<br />client</b></div>
								<span className="hub-p" id="hubP" />
							</div>
							<p className="map-empty" id="mapEmpty">Vos outils viendront se placer ici.</p>
							<div className="legend"><span><i />Relié</span><span><i className="f" />Fragile</span><span><i className="m" />À la main</span><span className="lu"><i className="u" />Pas encore évalué</span></div>
						</div>
					</aside>
					<p className="sr" id="mapSr" />
				</section>
				<section className="report" id="report" hidden>
					<div className="wrap">
						<div className="rep-head">
							<p className="kick">Votre rapport</p>
							<h2 id="repT">Votre rapport complet</h2>
							<p id="repP">Vos blocages détaillés, le calcul de votre estimation, et ce que je relierais en premier chez vous.</p>
						</div>
						<div className="locked is-locked" id="locked">
							<div className="rep-body" id="repBody" inert />
							<form className="gate" id="gate" noValidate>
								<div className="lock"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="none" stroke="#c23f08" strokeWidth="2" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="#c23f08" strokeWidth="2" /></svg></div>
								<h3>Recevez votre rapport complet</h3>
								<p>Vos 3 blocages détaillés, le calcul de votre estimation, et le premier branchement que je ferais chez vous. Ensuite, vous pourrez réserver vos 30 minutes d'audit si vous le souhaitez.</p>
								<div className="fld">
									<div className="two"> <label>Prénom<input type="text" name="prenom" autoComplete="given-name" required /></label> <label>E-mail professionnel<input type="email" name="email" autoComplete="email" inputMode="email" required /></label> </div>
									<label><span>Entreprise <span className="o">(facultatif)</span></span><input type="text" name="ent" autoComplete="organization" /></label>
									<label className="consent"><input type="checkbox" name="ok" required /><span>J'accepte que Synapsis utilise ces informations pour m'envoyer mon rapport et revenir vers moi au sujet de ce diagnostic. Je peux demander leur suppression à tout moment. <a href="/politique-confidentialite">Confidentialité</a></span></label>
									<p className="err" id="gateErr" role="alert" />
									<button className="cta big" type="submit" id="gateBtn">Débloquer mon rapport</button>
								</div>
							</form>
						</div>
						<div className="cal" id="cal" hidden>
							<div className="rep-head">
								<p className="kick">Étape suivante</p>
								<h2>Réservez vos 30 minutes d'audit</h2>
								<p>On reprend votre diagnostic ensemble, à l'écran. Vous repartez avec un plan complet : vos points forts, vos points faibles, et ce qu'on relie en premier. Sans engagement.</p>
							</div>
							<div className="cal-box" id="calBox" />
							<p className="cal-note">L'invitation et le lien Google Meet vous arrivent par e-mail dès la réservation.</p>
						</div>
					</div>
				</section>
			</main>
			<footer className="site-f">© 2026 Synapsis · <a href="/mentions-legales">Mentions légales</a> · <a href="/politique-confidentialite">Confidentialité</a></footer>
		</div>
	);
}
