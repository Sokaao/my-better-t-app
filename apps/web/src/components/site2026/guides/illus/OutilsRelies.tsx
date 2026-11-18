import type { CSSProperties, ReactNode } from "react";
import PlayOnView from "./PlayOnView";
import s from "./illus.module.css";

// Section « Reliez vos outils » : le scénario décrit dans le texte, étape par étape.
const ICONS: Record<string, ReactNode> = {
	devis: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />,
	fichier: <path d="M4 5h16v14H4zM4 10h16M4 14.5h16M10 5v14" />,
	mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
	vous: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20c1.2-3.4 4-5 7.5-5s6.3 1.6 7.5 5" />,
};
const STEPS = [
	{ icon: "devis", tool: "Logiciel de devis", event: "Le devis part" },
	{ icon: "fichier", tool: "Fichier clients", event: "Une ligne se crée, avec la date de relance" },
	{ icon: "mail", tool: "Messagerie", event: "Le jour venu, un brouillon de relance vous attend" },
	{ icon: "vous", tool: "Vous", event: "Vous relisez, vous envoyez" },
] as const;

const LABEL =
	"Schéma des outils reliés : le devis part du logiciel de devis ; une ligne se crée dans le fichier clients avec la date de relance ; le jour venu, un brouillon de relance attend dans la messagerie ; vous relisez et vous envoyez. Si le client répond ou signe, tout s'arrête et le statut se met à jour.";

export default function OutilsRelies() {
	return (
		<figure className={s.figure}>
			<PlayOnView className={`${s.anim} ${s.relies}`} label={LABEL}>
				<div className={s.card} aria-hidden="true">
					<div className={s.top}>
						<b>Vos outils, reliés</b>
						<span>chacun garde son rôle</span>
					</div>
					<ol className={s.flow}>
						{STEPS.map((step, i) => (
							<li key={step.tool} className={s.node} style={{ "--i": i } as CSSProperties}>
								<span className={s.icon}>
									<svg viewBox="0 0 24 24" width="22" height="22">
										{ICONS[step.icon]}
									</svg>
								</span>
								<span className={s.tool}>{step.tool}</span>
								<span className={s.event}>{step.event}</span>
							</li>
						))}
					</ol>
					<p className={s.stop}>Le client répond ou signe&nbsp;: tout s'arrête, le statut se met à jour.</p>
				</div>
			</PlayOnView>
		</figure>
	);
}
