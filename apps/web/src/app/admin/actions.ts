"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Route } from "next";
import {
	insertClient,
	updateClient,
	deleteClient,
	updateClientStage,
	fetchClientById,
	STAGES,
	STAGE_LABELS,
	type Stage,
} from "@/lib/admin-clients";
import { notifyClientStageChange } from "@/lib/client-notify";

export async function login(formData: FormData) {
	const password = String(formData.get("password") || "");
	const next = String(formData.get("next") || "/admin");

	if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
		redirect(`/admin/login?next=${encodeURIComponent(next)}&error=1` as Route);
	}

	const cookieStore = await cookies();
	cookieStore.set("admin_session", password, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
	});

	redirect(next as Route);
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.delete("admin_session");
	redirect("/admin/login");
}

function normalizeSlug(slugRaw: string): string {
	return slugRaw
		.toUpperCase()
		.replace(/[^A-Z0-9-]+/g, "-")
		.replace(/(^-+|-+$)/g, "");
}

export async function createClient(formData: FormData) {
	const nom = String(formData.get("nom") || "").trim();
	const slugRaw = String(formData.get("slug") || "").trim();
	const automation_type = String(formData.get("automation_type") || "autre");
	const notes = String(formData.get("notes") || "").trim();
	const email = String(formData.get("email") || "").trim();

	if (!nom || !slugRaw) {
		redirect(("/admin/clients/new?error=" + encodeURIComponent("Nom et identifiant sont requis.")) as Route);
	}

	const slug = normalizeSlug(slugRaw);
	if (!slug) {
		redirect(("/admin/clients/new?error=" + encodeURIComponent("Identifiant invalide.")) as Route);
	}

	try {
		await insertClient({ slug, nom, automation_type, notes, email });
	} catch (e) {
		const msg =
			e instanceof Error && e.message.includes("duplicate")
				? "Cet identifiant existe déjà — vérifie la liste des clients, il a peut-être déjà été créé (double-clic sur « Créer »)."
				: "Erreur lors de la création. Réessaie.";
		redirect(("/admin/clients/new?error=" + encodeURIComponent(msg)) as Route);
	}

	redirect("/admin");
}

export async function editClient(formData: FormData) {
	const id = String(formData.get("id") || "");
	const nom = String(formData.get("nom") || "").trim();
	const automation_type = String(formData.get("automation_type") || "autre");
	const notes = String(formData.get("notes") || "").trim();
	const email = String(formData.get("email") || "").trim();

	if (!id || !nom) {
		redirect((`/admin/clients/${id}/edit?error=` + encodeURIComponent("Le nom est requis.")) as Route);
	}

	try {
		await updateClient(id, { nom, automation_type, notes, email });
	} catch {
		redirect((`/admin/clients/${id}/edit?error=` + encodeURIComponent("Erreur lors de la mise à jour. Réessaie.")) as Route);
	}

	redirect("/admin");
}

export async function removeClient(formData: FormData) {
	const id = String(formData.get("id") || "");
	if (!id) return;
	await deleteClient(id);
	redirect("/admin");
}

export async function updateStage(formData: FormData) {
	const id = String(formData.get("id") || "");
	const stage = String(formData.get("stage") || "");

	if (!id || !STAGES.includes(stage as Stage)) return;

	await updateClientStage(id, stage as Stage);

	try {
		const client = await fetchClientById(id);
		if (client?.email) {
			await notifyClientStageChange({
				email: client.email,
				nom: client.nom,
				urlSlug: client.url_slug,
				stageLabel: STAGE_LABELS[stage as Stage],
			});
		}
	} catch {
		// Non bloquant : l'étape est mise à jour même si la notification échoue.
	}

	redirect("/admin");
}
