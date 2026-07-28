"use client";

import { useRouter } from "next/navigation";
import SetterIaOnboardingForm from "./setter-ia-form";
import { advanceAfterOnboarding } from "@/app/onboarding/actions";

export default function FillOnboardingClient({ slug, nom, urlSlug }: { slug: string; nom: string; urlSlug: string }) {
	const router = useRouter();

	return (
		<SetterIaOnboardingForm
			client={slug}
			nom={nom}
			onSuccess={() => {
				void advanceAfterOnboarding(urlSlug);
				router.push(`/onboarding/${urlSlug}`);
			}}
		/>
	);
}
