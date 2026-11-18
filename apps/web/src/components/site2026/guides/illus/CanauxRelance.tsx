import type { CSSProperties, ReactNode } from "react";
import PlayOnView from "./PlayOnView";
import s from "./illus.module.css";

// Section « Téléphone ou e-mail ? » : un canal par usage, mot pour mot d'après le texte.
const CANAUX: { name: string; use: string; note: string; icon: ReactNode; careful?: boolean }[] = [
	{
		name: "Téléphone",
		use: "La première relance d'un devis important",
		note: "En deux minutes, vous entendez ce qui bloque.",
		icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />,
	},
	{
		name: "E-mail",
		use: "Garder une trace, laisser le temps de répondre",
		note: "Le bon canal aussi quand le client est difficile à joindre.",
		icon: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
	},
	{
		name: "SMS ou WhatsApp",
		use: "Seulement si le client échange déjà ainsi",
		note: "Sinon, c'est intrusif.",
		icon: <path d="M4 5h16v11H9l-5 4zM8 10h8M8 13h5" />,
		careful: true,
	},
];

const LABEL =
	"Quel canal pour relancer : le téléphone pour la première relance d'un devis important ; l'e-mail pour garder une trace et laisser le temps de répondre ; le SMS ou WhatsApp seulement si le client échange déjà ainsi. Si vous tombez sur la messagerie, envoyez le mail dans la foulée en le mentionnant.";

export default function CanauxRelance() {
	return (
		<figure className={s.figure}>
			<PlayOnView className={`${s.anim} ${s.canauxWrap}`} label={LABEL}>
				<div className={s.card} aria-hidden="true">
					<div className={s.top}>
						<b>Quel canal, pour quoi</b>
						<span>chacun à sa place</span>
					</div>
					<ul className={s.canaux}>
						{CANAUX.map((c, i) => (
							<li key={c.name} className={`${s.canal} ${c.careful ? s.careful : ""}`} style={{ "--i": i } as CSSProperties}>
								<span className={s.icon}>
									<svg viewBox="0 0 24 24" width="22" height="22">
										{c.icon}
									</svg>
								</span>
								<span className={s.tool}>{c.name}</span>
								<span className={s.canalUse}>{c.use}</span>
								<span className={s.event}>{c.note}</span>
							</li>
						))}
					</ul>
					<p className={s.stopNeutral}>Messagerie vocale&nbsp;? Envoyez le mail dans la foulée, en le mentionnant.</p>
				</div>
			</PlayOnView>
		</figure>
	);
}
