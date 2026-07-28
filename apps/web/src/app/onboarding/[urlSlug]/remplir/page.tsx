import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import SiteNavMinimal from "@/components/site-nav-minimal";
import SiteFooterMinimal from "@/components/site-footer-minimal";
import InfoMessage from "@/components/onboarding/info-message";
import FillOnboardingClient from "@/components/onboarding/fill-onboarding-client";
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

	if (client.stage !== "onboarding") {
		redirect(`/onboarding/${client.url_slug}` as Route);
	}

	return (
		<>
			<div className="s-bg-grid" />
			<SiteNavMinimal />
			<main>
				<div className="s-wrap" style={{ paddingTop: 24 }}>
					<Link href={`/onboarding/${client.url_slug}` as Route} className="s-btn s-btn-ghost">
						<ArrowLeft size={16} /> Retour au suivi de projet
					</Link>
				</div>
				<FillOnboardingClient slug={client.slug} nom={client.nom} urlSlug={client.url_slug} />
			</main>
			<SiteFooterMinimal />
		</>
	);
}
