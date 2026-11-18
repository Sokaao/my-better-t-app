import type { CSSProperties } from "react";
import PlayOnView from "./PlayOnView";
import s from "./illus.module.css";

// Frise du guide « relance de devis » : reprend mot pour mot le rythme donné dans le texte.
// Les délais sont posés entre deux étapes, car ils se comptent depuis l'étape précédente.
const STEPS = [
	{ gap: null, name: "Envoi du devis", goal: "Annoncez la suite" },
	//   : espace insécable avant « ? », pour qu'il ne passe jamais seul à la ligne
	{ gap: "2 à 3 jours ouvrés", name: "Relance 1", goal: "Le devis est-il bien arrivé ?" },
	{ gap: "env. 1 semaine", name: "Relance 2", goal: "Qu'est-ce qui bloque ?" },
	{ gap: "1 à 2 semaines", name: "Dernière relance", goal: "Je classe le dossier ?" },
] as const;

const LABEL =
	"Calendrier des relances : le jour de l'envoi, annoncez la suite ; relance 1 deux à trois jours ouvrés après ; relance 2 environ une semaine plus tard ; dernière relance une à deux semaines après. Dès que le client répond, les relances s'arrêtent.";

export default function FriseRelances() {
	return (
		<figure className={s.figure}>
			<PlayOnView className={s.frise} label={LABEL}>
				<div className={s.card} aria-hidden="true">
					<div className={s.top}>
						<b>Le rythme des relances</b>
						<span>à adapter au montant du devis</span>
					</div>
					<ol className={s.track}>
						{STEPS.map((step, i) => (
							<li key={step.name} className={s.step} style={{ "--i": i } as CSSProperties}>
								{step.gap && <span className={s.gap}>{step.gap}</span>}
								<span className={s.dot} />
								<span className={s.name}>{step.name}</span>
								<span className={s.goal}>{step.goal}</span>
							</li>
						))}
					</ol>
					<p className={s.stop}>Dès que le client répond, même par «&nbsp;pas maintenant&nbsp;», les relances s'arrêtent.</p>
				</div>
			</PlayOnView>
		</figure>
	);
}
