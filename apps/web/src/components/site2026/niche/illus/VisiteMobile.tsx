import s from "./illus.module.css";

const CRITERES = ["Accueil et intégration", "Missions confiées", "Posture professionnelle", "Objectifs du stage"] as const;

// Maquette décorative (HTML/CSS + SVG inline, sans JS) : critères cochés, signature tracée, fiche rangée, en boucle.
export default function VisiteMobile() {
	return (
		<figure className={s.figure}>
			<div role="img" aria-label="Exemple de visite de stage remplie sur téléphone : critères cochés, signature du tuteur, fiche rangée dans le dossier">
				<div className={s.phone} aria-hidden="true">
					<span className={s.notch} />
					<div className={s.screen}>
						<div className={s.vhead}>
							<b>Visite de stage — Léa M.</b>
							<span className={s.timer}>1:52</span>
						</div>
						<div className={s.crits}>
							{CRITERES.map((c, i) => (
								<div key={c} className={s.crit}>
									<span className={s.box}>
										<svg className={`${s.tick} ${s[`k${i + 1}`]}`} viewBox="0 0 20 20" width="20" height="20">
											<circle cx="10" cy="10" r="10" />
											<path d="M6 10.4l2.6 2.6L14 7.6" />
										</svg>
									</span>
									<span>{c}</span>
								</div>
							))}
						</div>
						<div className={s.sig}>
							<span className={s.lbl}>Signature du tuteur</span>
							<svg viewBox="0 0 200 60" className={s.sigSvg}>
								<path
									className={s.sigPath}
									pathLength={1}
									d="M12 40 C 24 8, 36 8, 40 38 S 58 52, 68 26 S 88 10, 94 36 C 98 56, 114 52, 124 30 S 148 14, 158 38 L 188 28"
								/>
								<line x1="8" y1="52" x2="192" y2="52" className={s.sigLine} />
							</svg>
						</div>
						<div className={s.banner}>✓ Rangée dans le dossier</div>
					</div>
				</div>
			</div>
			<figcaption className={s.mention}>Exemple illustratif</figcaption>
		</figure>
	);
}
