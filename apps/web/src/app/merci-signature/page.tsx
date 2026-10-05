import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNavV2 from "@/components/site/SiteNavV2";
import SiteFooter from "@/components/site/SiteFooter";
import s from "@/styles/site.module.css";

// Page d'arrivée après la signature d'un devis sur Documenso. Elle est la même pour
// tous les clients : aucun nom ni montant ne transite par l'URL. Hors index, hors
// sitemap, hors menu. Elle reprend la grammaire de l'accueil (échelle .v3, titre
// souligné à la main, panneau produit, cartes du parcours, note signée) : le client
// retrouve le site qu'il a vu avant de signer.
export const metadata: Metadata = {
	title: "Signature reçue",
	robots: { index: false, follow: false },
	alternates: {
		canonical: "/merci-signature",
	},
};

const CADRAGE_URL = "https://cal.com/synapsis/cadrage";

// Le panneau du hero : l'état du projet au moment où le client arrive. Une seule
// ligne est faite, la signature ; les autres disent ce qui vient, dans l'ordre.
const ETAT: { name: string; sub: string; state: "ok" | "wait" | "idle"; tag: string }[] = [
	{ name: "Devis signé", sub: "Reçu à l'instant", state: "ok", tag: "Fait" },
	{ name: "Facture d'acompte", sub: "Par email, dans les prochaines heures", state: "wait", tag: "En cours" },
	{ name: "Réunion de cadrage", sub: "45 minutes, dans la semaine", state: "wait", tag: "À réserver" },
	{ name: "Construction", sub: "Suivie dans votre espace client", state: "idle", tag: "Ensuite" },
];

// Une étape franchie sur quatre. Le cercle du socle est réglé sur 92 % : on ne
// change ici que le décalage du trait (circonférence 213,6 × 3/4).
const RING_OFFSET = 160.2;

// La suite, en cartes. Le délai occupe la place du montant sur l'accueil : il est
// poussé en bas, pour que les trois se lisent sur une même ligne. Aucun lien dans
// les cartes, il décalerait cette ligne : le bouton de réservation est dans le hero.
const SUITE: { n: string; title: string; lead: string; when: string }[] = [
	{
		n: "01",
		title: "Votre facture d'acompte",
		lead: "Vous la recevez par email : 30 % du montant, avec les prochaines étapes de votre projet.",
		when: "Dans les prochaines heures",
	},
	{
		n: "02",
		title: "La réunion de cadrage",
		lead: "45 minutes pour valider ensemble le fonctionnement attendu. Vous retrouverez aussi le lien dans l'email de la facture d'acompte.",
		when: "Dans la semaine",
	},
	{
		n: "03",
		title: "La construction",
		lead: "Je construis votre solution, et vous suivez son avancement dans votre espace client.",
		when: "Ensuite",
	},
];

export default function MerciSignature() {
	return (
		<div className={`${s.page} ${s.v3}`}>
			<SiteNavV2 links={[]} cta={false} />

			<main className={s.main}>
				{/* ══ CONFIRMATION ══ */}
				<header className={s.hero}>
					<div className={s.wrap}>
						<div className={s.heroTop}>
							<p className={`${s.eyebrow} ${s.in}`}>Devis signé</p>
							<h1 className={`${s.in} ${s.in1}`}>
								Votre signature a bien été{" "}
								<span className={s.hl}>
									reçue
									<svg viewBox="0 0 320 12" preserveAspectRatio="none" aria-hidden="true">
										<path d="M4,9 C80,3 240,3 316,8" />
									</svg>
								</span>
								.
							</h1>
						</div>

						<div className={`${s.heroGrid} ${s.heroGridTop}`}>
							<div className={s.heroIn}>
								<div className={`${s.mechanism} ${s.in} ${s.in2}`}>
									<p className={s.mechanismLead}>Merci pour votre confiance.</p>
									<p className={s.mechanismEndSoft}>
										Votre projet est lancé. La suite arrive par email. De votre côté, il reste à
										réserver la réunion de cadrage.
									</p>
								</div>

								<div className={`${s.heroCta} ${s.in} ${s.in3}`}>
									<a
										href={CADRAGE_URL}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Réserver mon créneau de cadrage (nouvel onglet)"
										className={`${s.btn} ${s.btnPrimary}`}
									>
										Réserver mon créneau <span className={s.arr} aria-hidden="true">→</span>
									</a>
								</div>
								<p className={`${s.heroNote} ${s.in} ${s.in3}`}>
									45 minutes · <b>le lien sera aussi dans l&apos;email de votre facture d&apos;acompte</b>
								</p>
							</div>

							<div className={`${s.panel} ${s.in} ${s.in4}`}>
								<div className={s.panelHead}>
									<span className={s.panelTitle}>Votre projet</span>
									<span className={s.panelDate}>Aujourd&apos;hui</span>
								</div>
								<div className={s.panelGauge}>
									<div className={s.ring}>
										<svg className={s.ringSvg} viewBox="0 0 80 80" aria-hidden="true">
											<circle className={s.ringTrack} cx="40" cy="40" r="34" />
											<circle
												className={s.ringValue}
												cx="40"
												cy="40"
												r="34"
												style={{ strokeDashoffset: RING_OFFSET }}
											/>
										</svg>
										<span className={s.ringLabel}>1/4</span>
									</div>
									<div className={s.gaugeText}>
										<span className={s.gaugeBig}>Projet lancé</span>
										<span className={s.gaugeSmall}>
											Signature reçue.
											<br />
											Prochaine étape : votre facture d&apos;acompte.
										</span>
									</div>
								</div>
								<div className={s.panelRows}>
									{ETAT.map((e) => (
										<div key={e.name} className={s.panelRow}>
											<span
												className={`${s.dot} ${e.state === "wait" ? s.dotWait : ""} ${e.state === "idle" ? s.dotIdle : ""}`}
											/>
											<span className={s.rowName}>
												{e.name}
												<span className={s.rowSub}>{e.sub}</span>
											</span>
											<span
												className={e.state === "ok" ? s.tagOk : e.state === "wait" ? s.tagWait : s.tagIdle}
											>
												{e.tag}
											</span>
										</div>
									))}
								</div>
								<p className={s.panelFoot}>Le suivi continue dans votre espace client</p>
							</div>
						</div>
					</div>
				</header>

				{/* ══ LA SUITE ══ */}
				<section className={`${s.block} ${s.blockAlt}`} id="suite">
					<div className={s.wrap}>
						<div className={s.secHead}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Les trois prochaines étapes</p>
							<h2>Ce qui va se passer, et quand.</h2>
						</div>

						<ol className={s.pathGrid}>
							{SUITE.map((p) => (
								<li key={p.n} className={s.pathCard}>
									<span className={s.pathNum} aria-hidden="true">
										{p.n}
									</span>
									<h3 className={s.pathTitle}>{p.title}</h3>
									<p className={s.pathLead}>{p.lead}</p>
									<span className={s.pathPrice}>{p.when}</span>
								</li>
							))}
						</ol>
					</div>
				</section>

				{/* ══ UNE QUESTION ? ══
				    La note signée de l'accueil, en court : le client qui vient de signer
				    sait à qui il parle, avec le visage et le numéro direct. */}
				<section className={s.block}>
					<div className={s.wrap}>
						<div className={s.secHead}>
							<p className={`${s.eyebrow} ${s.eyebrowQuiet}`}>Une question ?</p>
							<h2>Vous m&apos;avez en direct.</h2>
						</div>

						<div className={s.founder}>
							<div className={s.founderAside}>
								<div className={s.founderPhoto}>
									<Image
										src="/images/frederic-mallet.jpg"
										alt="Frédéric Mallet, fondateur de Synapsis"
										fill
										sizes="(max-width: 46rem) 112px, 224px"
										style={{ objectFit: "cover" }}
									/>
								</div>
								<span className={s.founderName}>
									Frédéric <b>MALLET</b>
								</span>
								<span className={s.founderRole}>Fondateur de Synapsis</span>
							</div>

							<div className={s.founderBody}>
								<p className={s.founderLead}>
									Une question sur votre devis, l&apos;acompte ou la suite du projet ? Appelez-moi ou
									écrivez-moi, c&apos;est moi qui vous réponds.
								</p>

								<div className={s.heroCta}>
									<a href="tel:+33754083258" className={`${s.btn} ${s.btnPrimary}`}>
										Appeler le 07 54 08 32 58
									</a>
									<a href="mailto:contact@mysynapsis.fr" className={`${s.btn} ${s.btnGhost}`}>
										Écrire à contact@mysynapsis.fr
									</a>
								</div>

								<span className={s.founderSign}>
									Frédéric MALLET
									<svg viewBox="0 0 320 12" preserveAspectRatio="none" aria-hidden="true">
										<path d="M4,9 C80,3 240,3 316,8" />
									</svg>
								</span>
							</div>
						</div>

						<div className={s.stacked}>
							<Link href="/" className={s.footLink}>
								Découvrir le site Synapsis
							</Link>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter />
		</div>
	);
}
