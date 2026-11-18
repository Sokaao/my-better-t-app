import type { CSSProperties } from "react";
import PlayOnView from "./PlayOnView";
import s from "./illus.module.css";

// Section « Pourquoi vos devis restent sans réponse » : chaque silence cache une des raisons données dans le texte.
// Clients fictifs, signalés par l'étiquette « Exemple ».
const ROWS = [
	{ who: "M. Roux", what: "Agencement des bureaux", when: "il y a 4 jours", why: "n'a pas eu le temps de l'ouvrir" },
	{ who: "Mme Delmas", what: "Rénovation de l'accueil", when: "il y a 6 jours", why: "attend l'avis de son associé" },
	{ who: "M. Benoît", what: "Contrat d'entretien", when: "il y a 8 jours", why: "compare avec deux autres devis" },
	{ who: "Mme Méric", what: "Remplacement du matériel", when: "il y a 9 jours", why: "le mail est dans ses indésirables" },
] as const;

const LABEL =
	"Exemple de boîte d'envoi : quatre devis sans réponse. Derrière chaque silence, une raison qui n'est pas un refus : pas le temps de l'ouvrir, l'avis d'un associé attendu, une comparaison avec d'autres devis, un mail arrivé dans les indésirables.";

export default function BoiteEnvoi() {
	return (
		<figure className={s.figure}>
			<PlayOnView className={`${s.anim} ${s.boite}`} label={LABEL}>
				<div className={s.card} aria-hidden="true">
					<div className={s.top}>
						<b>Devis envoyés</b>
						<span className={s.tag}>Exemple</span>
					</div>
					<ul className={s.mails}>
						{ROWS.map((r, i) => (
							<li key={r.who} className={s.mail} style={{ "--i": i } as CSSProperties}>
								<span className={s.avatar}>{r.who.split(" ")[1]?.[0]}</span>
								<span className={s.mailMain}>
									<b>{r.who}</b>
									<span className={s.mailWhat}>Devis · {r.what}</span>
									<span className={s.why}>En réalité : {r.why}</span>
								</span>
								<span className={s.mailSide}>
									<span className={s.chipWait}>Sans réponse</span>
									<span className={s.when}>{r.when}</span>
								</span>
							</li>
						))}
					</ul>
					<p className={s.stopNeutral}>Aucun de ces silences ne veut dire «&nbsp;non&nbsp;».</p>
				</div>
			</PlayOnView>
		</figure>
	);
}
