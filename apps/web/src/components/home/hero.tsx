import Link from "next/link";
import s from "@/styles/home.module.css";

// Preuve du hero : les cinq outils de Claire (Morel Formation) ne disent pas la
// même chose du dossier de Julien Petit. Données fictives, chiffres du fil rouge
// (devis de 2 340 €, relance à J+6, 14 dossiers ouverts).
const TOOLS = [
	{
		tool: "Messagerie",
		line: "Julien Petit · Re : votre devis formation",
		state: "Non lu depuis 6 jours",
		tone: "warn",
	},
	{
		tool: "Tableur de suivi",
		line: "Petit J. · Statut : « Devis à envoyer »",
		state: "Modifié il y a 3 semaines",
		tone: "stale",
	},
	{
		tool: "Agenda",
		line: "Rappeler J. Petit",
		state: "Jeudi dernier · non fait",
		tone: "warn",
	},
	{
		tool: "Devis (PDF)",
		line: "Devis_Petit_2340.pdf · 2 340 €",
		state: "Envoyé",
		tone: "ok",
	},
	{
		tool: "Facturation",
		line: "Facture Petit · 2 340 €",
		state: "Impayée, échue · personne ne l'a vue",
		tone: "alert",
	},
] as const;

export default function Hero() {
	return (
		<section className={s.hero}>
			<div className={s.wrap + " " + s.heroGrid}>
				<div className={s.heroCopy}>
					<h1 className={s.h1}>
						<span>Vos clients sont éparpillés dans cinq outils.</span>{" "}
						<span className={s.h1Second}>
							Je les réunis au même endroit, et le suivi se fait tout seul.
						</span>
					</h1>
					<p className={s.lead}>
						J&apos;aide les dirigeants de PME à savoir où en est chaque client,
						sans fouiller dans cinq outils.
					</p>
					<div className={s.ctaRow}>
						<Link href="/diagnostic" className={s.cta}>
							Faire mon diagnostic
						</Link>
						<span className={s.ctaNote}>
							Il se termine par un audit gratuit de 45 minutes.
						</span>
					</div>
				</div>

				<figure className={s.proof} aria-label="Exemple : cinq outils, cinq réponses différentes sur un même client">
					<figcaption className={s.proofHead}>
						<span className={s.proofTitle}>Morel Formation · Claire</span>
						<span className={s.proofSub}>14 dossiers ouverts</span>
					</figcaption>
					<p className={s.proofQuestion}>Où en est Julien Petit ?</p>
					<ul className={s.tools}>
						{TOOLS.map((t) => (
							<li key={t.tool} className={s.tool} data-tone={t.tone}>
								<span className={s.toolName}>{t.tool}</span>
								<span className={s.toolLine}>{t.line}</span>
								<span className={s.toolState}>{t.state}</span>
							</li>
						))}
					</ul>
					<p className={s.proofFoot}>
						Cinq réponses, aucune qui concorde.
					</p>
				</figure>
			</div>
		</section>
	);
}
