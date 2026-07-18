"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function PolitiqueConfidentialite() {
	return (
		<>
			<div className="s-bg-grid" />
			<SiteNav />

			<section className="s-blk">
				<div className="s-wrap s-legal" style={{ maxWidth: 820 }}>
					<Link href="/" className="s-btn s-btn-ghost" style={{ marginBottom: 32 }}>
						<ArrowLeft size={16} /> Retour à l&apos;accueil
					</Link>

					<h1 style={{ marginBottom: 32 }}>Politique de Confidentialité</h1>

					<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
						<div>
							<h2 style={{ marginBottom: 14 }}>1. Introduction</h2>
							<p>La présente politique de confidentialité a pour but de vous informer sur la manière dont Synapsis collecte, utilise et protège vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>2. Responsable du traitement</h2>
							<p><strong>Nom :</strong> Synapsis</p>
							<p><strong>Responsable :</strong> Frédéric Mallet</p>
							<p><strong>Email :</strong> <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a></p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>3. Données collectées</h2>
							<p>Nous collectons les données personnelles suivantes lorsque vous utilisez notre site ou nos services :</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Nom et prénom</li>
								<li>Adresse email</li>
								<li>Numéro de téléphone (si fourni)</li>
								<li>Nom de l&apos;entreprise (si applicable)</li>
								<li>Informations fournies lors de la prise de rendez-vous</li>
								<li>Données de navigation (adresse IP, type de navigateur, pages visitées)</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>4. Finalités du traitement</h2>
							<p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Gestion des demandes de contact et de rendez-vous</li>
								<li>Fourniture de nos services d&apos;automatisation</li>
								<li>Communication commerciale et marketing (avec votre consentement)</li>
								<li>Amélioration de nos services</li>
								<li>Respect de nos obligations légales</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>5. Base légale du traitement</h2>
							<p>Le traitement de vos données repose sur les bases légales suivantes :</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Votre consentement explicite</li>
								<li>L&apos;exécution d&apos;un contrat ou de mesures précontractuelles</li>
								<li>Le respect d&apos;une obligation légale</li>
								<li>Notre intérêt légitime (amélioration des services, sécurité)</li>
							</ul>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>6. Durée de conservation</h2>
							<p>Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, et conformément aux obligations légales applicables. En règle générale, les données sont conservées pendant 3 ans à compter du dernier contact avec vous, sauf obligation légale de conservation plus longue.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>7. Destinataires des données</h2>
							<p>Vos données personnelles peuvent être transmises aux destinataires suivants :</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li>Personnel autorisé de Synapsis</li>
								<li>Prestataires techniques (hébergement, outils de gestion)</li>
								<li>Calendly (pour la gestion des rendez-vous)</li>
								<li>Autorités compétentes sur demande légale</li>
							</ul>
							<p style={{ marginTop: 14 }}>Nous nous assurons que ces destinataires offrent des garanties suffisantes en matière de protection des données.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>8. Transferts de données hors UE</h2>
							<p>Certains de nos prestataires peuvent être situés hors de l&apos;Union Européenne. Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place (clauses contractuelles types, Privacy Shield, etc.) pour protéger vos données.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>9. Vos droits</h2>
							<p>Conformément au RGPD, vous disposez des droits suivants :</p>
							<ul style={{ listStyle: "disc", marginLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
								<li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
								<li><strong>Droit de rectification :</strong> corriger vos données inexactes ou incomplètes</li>
								<li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
								<li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
								<li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
								<li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
								<li><strong>Droit de retirer votre consentement :</strong> à tout moment</li>
							</ul>
							<p style={{ marginTop: 14 }}>
								Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a>
							</p>
							<p style={{ marginTop: 14 }}>Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés).</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>10. Sécurité des données</h2>
							<p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou divulgation accidentelle. Cela inclut le chiffrement des données, l&apos;accès sécurisé et la formation de notre personnel.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>11. Cookies et technologies similaires</h2>
							<p>Notre site utilise uniquement des cookies techniques strictement nécessaires au fonctionnement du site. Nous n&apos;utilisons pas de cookies de tracking ou de publicité sans votre consentement préalable.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>12. Modifications de la politique</h2>
							<p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé.</p>
						</div>

						<div>
							<h2 style={{ marginBottom: 14 }}>13. Contact</h2>
							<p>Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, vous pouvez nous contacter à : <a href="mailto:contact@mysynapsis.fr">contact@mysynapsis.fr</a></p>
						</div>
					</div>

					<div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
						<p style={{ fontSize: 13, color: "var(--faint)" }}>
							Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
						</p>
					</div>
				</div>
			</section>

			<SiteFooter />
		</>
	);
}
