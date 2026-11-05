"use client";

import { useEffect, useRef, useState } from "react";

// Calendrier Cal.com intégré (cal.com/synapsis/30min), avec les réglages validés le 02/11/2026 :
// thème clair, couleurs de la marque, détails de l'événement masqués (notre propre bloc les affiche au-dessus).
// Si le calendrier ne se charge pas (bloqueur, réseau), un lien direct prend le relais.

type CalApi = ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, CalApi>; q?: unknown[][] };

const ORIGIN = "https://app.cal.com";
export const CAL_LINK = "synapsis/30min";
const NS = "rdv30";

// Amorce officielle de Cal.com, réécrite en TypeScript : les appels attendent dans une file que embed.js arrive.
function amorcer(): CalApi {
	const w = window as unknown as { Cal?: CalApi };
	if (w.Cal) return w.Cal;
	const file = (a: CalApi, args: unknown[]) => {
		(a.q = a.q || []).push(args);
	};
	const cal = function (...args: unknown[]) {
		const c = w.Cal as CalApi;
		if (!c.loaded) {
			c.ns = {};
			c.q = c.q || [];
			const s = document.createElement("script");
			s.src = `${ORIGIN}/embed/embed.js`;
			s.async = true;
			document.head.appendChild(s);
			c.loaded = true;
		}
		if (args[0] === "init") {
			const api = function (...a: unknown[]) {
				file(api as CalApi, a);
			} as CalApi;
			const espace = args[1];
			api.q = api.q || [];
			if (typeof espace === "string" && c.ns) {
				c.ns[espace] = c.ns[espace] || api;
				file(c.ns[espace], args);
				file(c, ["initNamespace", espace]);
			} else file(c, args);
			return;
		}
		file(c, args);
	} as CalApi;
	w.Cal = cal;
	return cal;
}

export default function CalInline() {
	const cible = useRef<HTMLDivElement>(null);
	const [etat, setEtat] = useState<"chargement" | "pret" | "echec">("chargement");

	useEffect(() => {
		if (!cible.current) return;
		const Cal = amorcer();
		Cal("init", NS, { origin: ORIGIN });
		const api = Cal.ns?.[NS];
		if (!api) return;
		api("inline", {
			elementOrSelector: cible.current,
			calLink: CAL_LINK,
			config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" },
		});
		api("ui", {
			theme: "light",
			cssVarsPerTheme: { light: { "cal-brand": "#E8500F" }, dark: { "cal-brand": "#FF8A52" } },
			hideEventTypeDetails: true,
			layout: "month_view",
		});
		api("on", { action: "linkReady", callback: () => setEtat("pret") });
		api("on", { action: "linkFailed", callback: () => setEtat("echec") });
		const t = setTimeout(() => setEtat((e) => (e === "chargement" ? "echec" : e)), 12000);
		return () => clearTimeout(t);
	}, []);

	return (
		<div>
			{etat !== "pret" && (
				<p style={{ padding: "48px 16px", textAlign: "center", fontWeight: 600, color: "var(--ink-3)" }}>
					{etat === "chargement" ? (
						"Chargement du calendrier…"
					) : (
						<>
							Le calendrier ne s'affiche pas ? Réservez directement sur{" "}
							<a href={`https://cal.com/${CAL_LINK}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--orange-text)" }}>
								cal.com/{CAL_LINK}
							</a>
							.
						</>
					)}
				</p>
			)}
			<div ref={cible} style={{ width: "100%", overflow: "auto" }} />
		</div>
	);
}
