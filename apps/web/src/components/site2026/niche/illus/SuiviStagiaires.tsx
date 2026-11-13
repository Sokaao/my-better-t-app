import s from "./illus.module.css";

const ROWS = [
	{ name: "Léa M.", firm: "Salle de sport", docs: "2 manquants" },
	{ name: "Hugo B.", firm: "Club de tennis", docs: "1 manquant" },
	{ name: "Inès R.", firm: "Centre aquatique", docs: "1 manquant" },
	{ name: "Tom D.", firm: "Studio de yoga", docs: "1 manquant" },
] as const;

// Maquette décorative (HTML/CSS, sans JS) : les pastilles passent au vert, ligne par ligne, en boucle.
export default function SuiviStagiaires() {
	return (
		<figure className={s.figure}>
			<div role="img" aria-label="Exemple de tableau de suivi des stagiaires : conventions, visites et documents de chaque stagiaire">
				<div className={`${s.card} ${s.suivi}`} aria-hidden="true">
					<div className={s.head}>
						<b>Suivi des stagiaires</b>
						<span className={s.sessionTag}>Session en cours</span>
					</div>
					{ROWS.map((r, i) => (
						<div key={r.name} className={`${s.srow} ${s[`r${i + 1}`]}`}>
							<div className={s.who}>
								<span className={s.avatar}>{r.name[0]}</span>
								<div>
									<b>{r.name}</b>
									<small>{r.firm}</small>
								</div>
							</div>
							<div className={s.cells}>
								<div className={s.cell}>
									<span className={s.lbl}>Convention</span>
									<span className={s.stack}>
										<span className={`${s.chip} ${s.warn} ${s.bef}`}>Envoyée</span>
										<span className={`${s.chip} ${s.ok} ${s.aft}`}>Signée</span>
									</span>
								</div>
								<div className={s.cell}>
									<span className={s.lbl}>Visite</span>
									<span className={s.stack}>
										<span className={`${s.chip} ${s.warn} ${s.bef}`}>À faire</span>
										<span className={`${s.chip} ${s.ok} ${s.aft}`}>Faite</span>
									</span>
								</div>
								<div className={s.cell}>
									<span className={s.lbl}>Documents</span>
									<span className={s.stack}>
										<span className={`${s.chip} ${s.warn} ${s.bef}`}>{r.docs}</span>
										<span className={`${s.chip} ${s.ok} ${s.aft}`}>Complet</span>
									</span>
								</div>
							</div>
						</div>
					))}
					<div className={s.foot}>
						<span>Documents manquants&nbsp;:</span>
						<span className={s.count}>
							<b className={`${s.n} ${s.n5}`}>5</b>
							<b className={`${s.n} ${s.n3}`}>3</b>
							<b className={`${s.n} ${s.n2}`}>2</b>
							<b className={`${s.n} ${s.n1}`}>1</b>
							<b className={`${s.n} ${s.n0}`}>0</b>
						</span>
					</div>
				</div>
			</div>
			<figcaption className={s.mention}>Exemple illustratif</figcaption>
		</figure>
	);
}
