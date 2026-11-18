import type { CSSProperties } from "react";
import PlayOnView from "./PlayOnView";
import s from "./illus.module.css";

// Section « Commencez par un tableau » : une ligne par devis, trié par prochaine relance le lundi matin.
// Statuts repris du texte (en attente, relancé, signé, perdu). Pas de colonne montant : aucun prix sur le site.
type Statut = "attente" | "relance" | "signe" | "perdu";
const ROWS: { client: string; envoi: string; relance: string; due: boolean; statut: Statut }[] = [
	{ client: "Mme Delmas", envoi: "il y a 6 j", relance: "aujourd'hui", due: true, statut: "attente" },
	{ client: "M. Benoît", envoi: "il y a 8 j", relance: "aujourd'hui", due: true, statut: "relance" },
	{ client: "M. Roux", envoi: "il y a 4 j", relance: "jeudi", due: false, statut: "attente" },
	{ client: "Mme Méric", envoi: "il y a 15 j", relance: "—", due: false, statut: "signe" },
	{ client: "M. Faure", envoi: "il y a 30 j", relance: "—", due: false, statut: "perdu" },
];
const STATUT_LABEL: Record<Statut, string> = { attente: "En attente", relance: "Relancé", signe: "Signé", perdu: "Perdu" };

const LABEL =
	"Exemple de tableau de suivi des devis, trié par date de prochaine relance : client, date d'envoi, prochaine relance et statut. Deux devis sont à relancer aujourd'hui.";

export default function TableauSuivi() {
	return (
		<figure className={s.figure}>
			<PlayOnView className={`${s.anim} ${s.tableau}`} label={LABEL}>
				<div className={s.card} aria-hidden="true">
					<div className={s.top}>
						<b>Suivi des devis</b>
						<span className={s.tag}>Lundi, 9 h · trié par relance</span>
					</div>
					<div className={s.sheet}>
						<div className={`${s.srow} ${s.shead}`}>
							<span>Client</span>
							<span>Envoyé</span>
							<span>Prochaine relance</span>
							<span>Statut</span>
						</div>
						{ROWS.map((r, i) => (
							<div key={r.client} className={`${s.srow} ${r.due ? s.due : ""}`} style={{ "--i": i } as CSSProperties}>
								<span className={s.cClient}>{r.client}</span>
								<span className={s.cMuted}>{r.envoi}</span>
								<span className={r.due ? s.cDue : s.cMuted}>{r.relance}</span>
								<span>
									<span className={`${s.st} ${s[`st_${r.statut}`]}`}>{STATUT_LABEL[r.statut]}</span>
								</span>
							</div>
						))}
					</div>
					<p className={s.stopNeutral}>Quinze minutes chaque lundi : traitez les lignes du jour, rien n'est oublié.</p>
				</div>
			</PlayOnView>
		</figure>
	);
}
