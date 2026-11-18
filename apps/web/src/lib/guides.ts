import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

// Un guide = un fichier JSON dans content/guides/. Ajouter un fichier suffit à publier un article.
// Lu au build (composants serveur) : un JSON invalide fait échouer le build plutôt que publier une page cassée.

export type Inline = string; // supporte **gras** et [texte](url) uniquement

// Illustrations disponibles (components/site2026/guides/illus/Illus.tsx). Un nom inconnu fait échouer le build.
export const ILLUS_NAMES = ["frise-relances"] as const;
export type IllusName = (typeof ILLUS_NAMES)[number];

export type Block =
	| { type: "h2"; text: string; id: string }
	| { type: "h3"; text: string }
	| { type: "p"; text: Inline }
	| { type: "ul"; items: Inline[] }
	| { type: "ol"; items: Inline[] }
	| { type: "message"; label: string; subject?: string; lines: string[] } // modèle de mail à copier
	| { type: "note"; text: Inline }
	| { type: "illus"; name: IllusName }; // illustration de la bibliothèque

export type Guide = {
	slug: string;
	title: string;
	description: string;
	h1: string;
	intro: string[];
	published: string; // YYYY-MM-DD
	updated: string; // YYYY-MM-DD
	author: "Frédéric Mallet";
	readingMinutes: number;
	blocks: Block[];
	faq: { q: string; a: string }[];
	cta: { h2: string; text: Inline; label: string; href: string };
};

const DIR_CANDIDATES = [path.join(process.cwd(), "content/guides"), path.join(process.cwd(), "apps/web/content/guides")];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESERVED_IDS = ["sommaire", "contenu", "questions"];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function guidesDir(): string {
	const dir = DIR_CANDIDATES.find((d) => fs.existsSync(d));
	if (!dir) throw new Error(`Dossier des guides introuvable. Dossiers essayés : ${DIR_CANDIDATES.join(", ")}`);
	return dir;
}

function fail(file: string, message: string): never {
	throw new Error(`Guide invalide (${file}) : ${message}`);
}

function isObject(v: unknown): v is Record<string, unknown> {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}

function str(file: string, v: unknown, field: string): string {
	if (typeof v !== "string" || v.trim() === "") fail(file, `« ${field} » doit être un texte non vide.`);
	return v;
}

function strList(file: string, v: unknown, field: string, allowEmptyItems = false): string[] {
	if (!Array.isArray(v) || v.length === 0) fail(file, `« ${field} » doit être une liste non vide.`);
	return v.map((x, i) => {
		if (typeof x !== "string" || (!allowEmptyItems && x.trim() === "")) {
			fail(file, `« ${field}[${i}] » doit être un texte${allowEmptyItems ? "" : " non vide"}.`);
		}
		return x;
	});
}

function parseBlock(file: string, raw: unknown, i: number): Block {
	const f = `blocks[${i}]`;
	if (!isObject(raw)) fail(file, `« ${f} » doit être un objet.`);
	switch (raw.type) {
		case "h2":
			return { type: "h2", text: str(file, raw.text, `${f}.text`), id: str(file, raw.id, `${f}.id`) };
		case "h3":
			return { type: "h3", text: str(file, raw.text, `${f}.text`) };
		case "p":
			return { type: "p", text: str(file, raw.text, `${f}.text`) };
		case "note":
			return { type: "note", text: str(file, raw.text, `${f}.text`) };
		case "ul":
		case "ol":
			return { type: raw.type, items: strList(file, raw.items, `${f}.items`) };
		case "message":
			return {
				type: "message",
				label: str(file, raw.label, `${f}.label`),
				...(raw.subject === undefined ? {} : { subject: str(file, raw.subject, `${f}.subject`) }),
				lines: strList(file, raw.lines, `${f}.lines`, true),
			};
		case "illus": {
			const name = str(file, raw.name, `${f}.name`);
			if (!(ILLUS_NAMES as readonly string[]).includes(name)) {
				fail(file, `« ${f}.name » inconnu : ${name}. Illustrations disponibles : ${ILLUS_NAMES.join(", ")}.`);
			}
			return { type: "illus", name: name as IllusName };
		}
		default:
			return fail(file, `« ${f}.type » inconnu : ${String(raw.type)}.`);
	}
}

function parseGuide(file: string, raw: unknown): Guide {
	if (!isObject(raw)) fail(file, "le JSON doit être un objet.");
	const slug = str(file, raw.slug, "slug");
	if (!SLUG_RE.test(slug)) fail(file, `« slug » invalide : ${slug}.`);
	if (`${slug}.json` !== file) fail(file, `« slug » (${slug}) doit correspondre au nom du fichier.`);
	const published = str(file, raw.published, "published");
	const updated = str(file, raw.updated, "updated");
	if (!DATE_RE.test(published) || Number.isNaN(Date.parse(published))) fail(file, "« published » doit être au format YYYY-MM-DD.");
	if (!DATE_RE.test(updated) || Number.isNaN(Date.parse(updated))) fail(file, "« updated » doit être au format YYYY-MM-DD.");
	if (raw.author !== "Frédéric Mallet") fail(file, "« author » doit valoir « Frédéric Mallet ».");
	if (typeof raw.readingMinutes !== "number" || !Number.isFinite(raw.readingMinutes) || raw.readingMinutes < 1) {
		fail(file, "« readingMinutes » doit être un nombre positif.");
	}
	if (!Array.isArray(raw.blocks) || raw.blocks.length === 0) fail(file, "« blocks » doit être une liste non vide.");
	if (!Array.isArray(raw.faq)) fail(file, "« faq » doit être une liste.");
	if (!isObject(raw.cta)) fail(file, "« cta » doit être un objet.");
	const cta = raw.cta;
	const ctaHref = str(file, cta.href, "cta.href");
	if (!ctaHref.startsWith("/")) fail(file, "« cta.href » doit commencer par « / ».");
	const blocks = raw.blocks.map((b: unknown, i: number) => parseBlock(file, b, i));
	const ids = blocks.flatMap((b) => (b.type === "h2" ? [b.id] : []));
	for (const id of ids) {
		if (!ID_RE.test(id)) fail(file, `id de h2 invalide (kebab-case attendu) : ${id}.`);
		if (RESERVED_IDS.includes(id)) fail(file, `id de h2 réservé : ${id}.`);
	}
	if (new Set(ids).size !== ids.length) fail(file, "les « id » des h2 doivent être uniques.");
	return {
		slug,
		title: str(file, raw.title, "title"),
		description: str(file, raw.description, "description"),
		h1: str(file, raw.h1, "h1"),
		intro: strList(file, raw.intro, "intro"),
		published,
		updated,
		author: "Frédéric Mallet",
		readingMinutes: raw.readingMinutes,
		blocks,
		faq: raw.faq.map((item: unknown, i: number) => {
			if (!isObject(item)) fail(file, `« faq[${i}] » doit être un objet.`);
			return { q: str(file, item.q, `faq[${i}].q`), a: str(file, item.a, `faq[${i}].a`) };
		}),
		cta: {
			h2: str(file, cta.h2, "cta.h2"),
			text: str(file, cta.text, "cta.text"),
			label: str(file, cta.label, "cta.label"),
			href: ctaHref,
		},
	};
}

function readAll(): Guide[] {
	const dir = guidesDir();
	return fs
		.readdirSync(dir)
		.filter((f) => f.endsWith(".json"))
		.map((file) => {
			let raw: unknown;
			try {
				raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
			} catch (e) {
				return fail(file, `JSON illisible (${e instanceof Error ? e.message : String(e)}).`);
			}
			return parseGuide(file, raw);
		});
}

// Du plus récent au plus ancien.
export const getAllGuides = cache((): Guide[] => readAll().sort((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug)));

export function getGuide(slug: string): Guide | undefined {
	return getAllGuides().find((g) => g.slug === slug);
}

// « 2026-11-18 » devient « 18 novembre 2026 ».
export function formatDateFr(iso: string): string {
	return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}
