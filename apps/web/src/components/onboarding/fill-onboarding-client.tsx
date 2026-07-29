"use client";

import { useRouter } from "next/navigation";
import SetterIaOnboardingForm, { type OnboardingPrefill } from "./setter-ia-form";
import { advanceAfterOnboarding, saveOnboardingSubmission } from "@/app/onboarding/actions";

export default function FillOnboardingClient({
	slug,
	nom,
	urlSlug,
	initialData,
}: {
	slug: string;
	nom: string;
	urlSlug: string;
	initialData?: OnboardingPrefill | null;
}) {
	const router = useRouter();

	return (
		<SetterIaOnboardingForm
			client={slug}
			nom={nom}
			initialData={initialData}
			onSuccess={(data) => {
				void advanceAfterOnboarding(urlSlug);
				void saveOnboardingSubmission(urlSlug, data);
				router.push(`/onboarding/${urlSlug}`);
			}}
		/>
	);
}
