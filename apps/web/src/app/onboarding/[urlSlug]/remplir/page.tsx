import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft } from "lucide-react";
import SiteNavMinimal from "@/components/site-nav-minimal";
import SiteFooterMinimal from "@/components/site-footer-minimal";
import InfoMessage from "@/components/onboarding/info-message";
import FillOnboardingClient from "@/components/onboarding/fill-onboarding-client";
import type { OnboardingPrefill } from "@/components/onboarding/setter-ia-form";
import { fetchClientByUrlSlug } from "@/lib/admin-clients";

// Toujours re-rendre côté serveur : un client créé après le build doit être joignable sans redéploiement.
export const dynamic = "force-dynamic";

export default async function FillOnboardingPage({ params }: { params: Promise<{ urlSlug: string }> }) {
	const { urlSlug } = await params;

	let client: Awaited<ReturnType<typeof fetchClientByUrlSlug>> = null;
	try {
		client = await fetchClientByUrlSlug(urlSlug);
	} catch {
		return (
			<InfoMessage
				title="Ce lien est temporairement indisponible."
				body="Réessaie dans quelques instants, ou écris directement à contact@mysynapsis.fr."
			/>
		);
	}

	if (!client) {
		return (
			<InfoMessage
				title="Ce lien n'est pas (ou plus) actif."
				body="Vérifie l'adresse, ou contacte Fred à contact@mysynapsis.fr pour obtenir le bon lien."
			/>
		);
	}

	if (client.automation_type !== "setter_ia_instagram") {
		return (
			<InfoMessage
				title={`Le formulaire de ${client.nom} n'est pas encore prêt.`}
				body="Fred configure encore cet onboarding. Contacte-le à contact@mysynapsis.fr si tu penses que c'est une erreur."
			/>
		);
	}

	// Accessible à tout moment, même après l'étape "onboarding" : le client peut revenir
	// modifier ses réponses. Chaque nouvel envoi crée un nouveau log côté Fred, sans écraser l'ancien.
	const isRevisit = client.stage !== "onboarding";

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />
			<main>
				<div className="s-wrap" style={{ paddingTop: 24 }}>
					<Link href={`/onboarding/${client.url_slug}` as Route} className="s-btn s-btn-ghost">
						<ArrowLeft size={16} /> Retour au suivi de projet
					</Link>
					{isRevisit && (
						<p style={{ marginTop: 12, fontSize: 13, color: "var(--faint)" }}>
							Tu modifies les informations envoyées précédemment. Ton nouvel envoi s&apos;ajoute à l&apos;historique, il
							n&apos;écrase rien.
						</p>
					)}
				</div>
				<FillOnboardingClient
					slug={client.slug}
					nom={client.nom}
					urlSlug={client.url_slug}
					initialData={client.last_submission as OnboardingPrefill | null}
				/>
			</main>
			<SiteFooterMinimal />
		</>
	);
}
