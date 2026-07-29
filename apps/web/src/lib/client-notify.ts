// Appelle le workflow n8n "Notifier client — changement d'étape" (fire-and-forget).
// N'échoue jamais bruyamment : la mise à jour de l'étape en base ne doit pas dépendre de l'email.
const NOTIFY_WEBHOOK_URL = "https://n8n.mysynapsis.fr/webhook/client-stage-notify-28a686bac090";

export async function notifyClientStageChange(input: {
	email: string;
	nom: string;
	urlSlug: string;
	stageLabel: string;
}): Promise<void> {
	await fetch(NOTIFY_WEBHOOK_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input),
	});
}
