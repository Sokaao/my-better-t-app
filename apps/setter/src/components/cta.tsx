"use client";

import { track } from "@vercel/analytics";
import { BOOKING_URL } from "@/lib/config";

// Le seul bouton de la page. `emplacement` sert uniquement a savoir lequel des
// trois convertit, dans Vercel Analytics.
export default function Cta({
	emplacement,
	label = "Réserver un appel de qualification",
}: {
	emplacement: "hero" | "milieu" | "final" | "header";
	label?: string;
}) {
	return (
		<a
			href={BOOKING_URL}
			target="_blank"
			rel="noopener noreferrer"
			className="s-btn s-btn-primary"
			onClick={() => track("cta_appel_qualification", { emplacement })}
		>
			{label} <span className="arr">→</span>
		</a>
	);
}
