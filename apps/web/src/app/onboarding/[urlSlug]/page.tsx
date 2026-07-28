import SiteNavMinimal from "@/components/site-nav-minimal";
import SiteFooterMinimal from "@/components/site-footer-minimal";
import ClientTracker from "@/components/onboarding/client-tracker";
import { fetchClientByUrlSlug } from "@/lib/admin-clients";

// Toujours re-rendre côté serveur : un client créé après le build doit être joignable sans redéploiement.
export const dynamic = "force-dynamic";

function InfoMessage({ title, body }: { title: string; body: string }) {
	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />
			<main>
				<section className="s-page-hero">
					<div className="s-wrap" style={{ maxWidth: 560 }}>
						<span className="s-eyebrow" style={{ justifyContent: "center" }}>
							Onboarding
						</span>
						<h1 style={{ fontSize: 30 }}>{title}</h1>
						<p>{body}</p>
					</div>
				</section>
			</main>
			<SiteFooterMinimal />
		</>
	);
}

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

	if (client.automation_type !== "setter_ia_instagram") {
		return (
			<InfoMessage
				title={`Le formulaire de ${client.nom} n'est pas encore prêt.`}
				body="Fred configure encore cet onboarding. Contacte-le à contact@mysynapsis.fr si tu penses que c'est une erreur."
			/>
		);
	}

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />
			<main>
				<ClientTracker
					slug={client.slug}
					nom={client.nom}
					automationType={client.automation_type}
					urlSlug={client.url_slug}
					stage={client.stage}
				/>
			</main>
			<SiteFooterMinimal />
		</>
	);
}
