import type { CSSProperties } from "react";
import PlayOnView from "./PlayOnView";
import s from "./illus.module.css";

// Section « Ce que l'IA peut faire » : les deux listes du texte, face à face.
const PREPARE = [
	"Rédiger une relance qui tient compte du devis et des échanges",
	"Trier les réponses : accord, question, « pas maintenant », refus",
	"Signaler les devis qui dorment depuis trop longtemps",
];
const VOUS = ["Envoyer un message à un client", "Promettre une remise, un délai, une condition", "Répondre à une négociation", "Relancer quelqu'un qui a dit non"];

const LABEL =
	"Ce que l'assistant IA prépare : une relance qui tient compte du devis et des échanges, le tri des réponses, le signalement des devis qui dorment. Ce qui reste votre décision : envoyer, promettre une remise ou un délai, répondre à une négociation, relancer quelqu'un qui a dit non.";

export default function IaPrepare() {
	return (
		<figure className={s.figure}>
			<PlayOnView className={`${s.anim} ${s.iaWrap}`} label={LABEL}>
				<div className={s.card} aria-hidden="true">
					<div className={s.ia}>
						<div className={s.iaCol} style={{ "--i": 0 } as CSSProperties}>
							<p className={s.iaHead}>L'assistant prépare</p>
							<ul>
								{PREPARE.map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
						</div>
						<div className={s.iaArrow} style={{ "--i": 1 } as CSSProperties}>
							<span>vous validez d'un clic</span>
						</div>
						<div className={`${s.iaCol} ${s.iaYou}`} style={{ "--i": 2 } as CSSProperties}>
							<p className={s.iaHead}>Vous seul décidez</p>
							<ul>
								{VOUS.map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</PlayOnView>
		</figure>
	);
}
