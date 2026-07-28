"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Route } from "next";
import { insertClient, updateClientStage, STAGES, type Stage } from "@/lib/admin-clients";

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

export async function createClient(formData: FormData) {
	const nom = String(formData.get("nom") || "").trim();
	const slugRaw = String(formData.get("slug") || "").trim();
	const automation_type = String(formData.get("automation_type") || "autre");
	const notes = String(formData.get("notes") || "").trim();

	if (!nom || !slugRaw) {
		redirect(("/admin/clients/new?error=" + encodeURIComponent("Nom et identifiant sont requis.")) as Route);
	}

	const slug = slugRaw.toUpperCase().replace(/[^A-Z0-9-]+/g, "-").replace(/(^-+|-+$)/g, "");
	if (!slug) {
		redirect(("/admin/clients/new?error=" + encodeURIComponent("Identifiant invalide.")) as Route);
	}

	try {
		await insertClient({ slug, nom, automation_type, notes });
	} catch (e) {
		const msg = e instanceof Error && e.message.includes("duplicate") ? "Cet identifiant existe déjà." : "Erreur lors de la création. Réessaie.";
		redirect(("/admin/clients/new?error=" + encodeURIComponent(msg)) as Route);
	}

	redirect("/admin");
}

export async function updateStage(formData: FormData) {
	const id = String(formData.get("id") || "");
	const stage = String(formData.get("stage") || "");

	if (!id || !STAGES.includes(stage as Stage)) return;

	await updateClientStage(id, stage as Stage);
	redirect("/admin");
}
