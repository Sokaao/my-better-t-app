import s from "./illus.module.css";

// Illustration d'en-tête du guide « relance de devis » : le titre en trois temps
// (devis sans réponse, relance prête, réponse du client). Exemple fictif, signalé comme tel.
// Animée au chargement en CSS seul (pas de JS : rien ne clignote, état final sans animation).
const LABEL =
	"Exemple : un devis sans réponse depuis 9 jours ; une relance prête à envoyer, « Où en est votre réflexion ? » ; puis la réponse du client, qui dit enfin ce qui le bloque.";

export default function HeroDevis() {
	return (
		<figure className={s.figure}>
			<div className={s.heroDevis} role="img" aria-label={LABEL}>
				<div className={s.hdStack} aria-hidden="true">
					<div className={`${s.card} ${s.hdCard} ${s.hd1}`}>
						<div className={s.top}>
							<b>Devis n°&nbsp;2026-118</b>
							<span className={s.tag}>Exemple</span>
						</div>
						<p className={s.hdLine}>Agencement des bureaux · M.&nbsp;Roux</p>
						<p className={s.hdStatus}>
							<span className={s.chipWarn}>Sans réponse</span>
							<span className={s.when}>envoyé il y a 9 jours</span>
						</p>
					</div>
					<div className={`${s.card} ${s.hdCard} ${s.hd2}`}>
						<p className={s.hdKicker}>
							<span className={s.hdIcon}>
								<svg viewBox="0 0 24 24" width="16" height="16">
									<path d="M3 6h18v12H3zM3 7l9 6 9-6" />
								</svg>
							</span>
							Relance 2 prête
						</p>
						<p className={s.hdQuote}>«&nbsp;Où en est votre réflexion&nbsp;?&nbsp;»</p>
						<span className={s.hdBtn}>Relire et envoyer</span>
					</div>
					<div className={`${s.card} ${s.hdCard} ${s.hd3}`}>
						<p className={s.hdStatus}>
							<span className={s.chipOk}>Réponse reçue</span>
							<span className={s.when}>le lendemain</span>
						</p>
						<p className={s.hdQuote}>«&nbsp;C'est le délai qui nous bloque. Possible de démarrer plus tôt&nbsp;?&nbsp;»</p>
					</div>
				</div>
			</div>
		</figure>
	);
}
