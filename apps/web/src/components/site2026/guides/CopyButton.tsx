"use client";

import { useEffect, useRef, useState } from "react";
import s from "./guide.module.css";

type State = "idle" | "copied" | "error";

// Copie l'objet et le corps d'un modèle de message dans le presse-papier.
export default function CopyButton({ label, subject, lines }: { label: string; subject?: string; lines: string[] }) {
	const [state, setState] = useState<State>("idle");
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	useEffect(() => () => clearTimeout(timer.current), []);

	async function copy() {
		const text = (subject ? [`Objet : ${subject}`, "", ...lines] : lines).join("\n");
		let next: State = "copied";
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			next = "error";
		}
		setState(next);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setState("idle"), 2000);
	}

	return (
		<>
			<button type="button" className={s.copy} onClick={copy}>
				{state === "copied" ? "Copié" : state === "error" ? "Copie impossible" : "Copier"}
				<span className={s.sr}> le modèle « {label} »</span>
			</button>
			<span className={s.sr} aria-live="polite">
				{state === "copied"
					? "Message copié dans le presse-papier"
					: state === "error"
						? "Copie impossible : sélectionnez le texte du modèle à la main"
						: ""}
			</span>
		</>
	);
}
