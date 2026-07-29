import SiteNavMinimal from "@/components/site-nav-minimal";
import SiteFooterMinimal from "@/components/site-footer-minimal";
import ClientTracker from "@/components/onboarding/client-tracker";
import InfoMessage from "@/components/onboarding/info-message";
import { fetchClientByUrlSlug } from "@/lib/admin-clients";

// Toujours re-rendre côté serveur : un client créé après le build doit être joignable sans redéploiement.
export const dynamic = "force-dynamic";

export default async function OnboardingClientPage({ params }: { params: Promise<{ urlSlug: string }> }) {
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

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />
			<main>
				<ClientTracker
					nom={client.nom}
					automationType={client.automation_type}
					urlSlug={client.url_slug}
					stage={client.stage}
					updatedAt={client.updated_at}
				/>
			</main>
			<SiteFooterMinimal />
		</>
	);
}
