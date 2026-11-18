"use client";

import { useEffect, useState } from "react";
import s from "./guide.module.css";

export type TocItem = { id: string; label: string };

// Sommaire latéral (ordinateur) : met en avant la section en cours de lecture.
export default function TocAside({ items }: { items: TocItem[] }) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const targets = items.flatMap((it) => {
			const el = document.getElementById(it.id);
			return el ? [el] : [];
		});
		if (targets.length === 0) return;
		// Le trait du haut du viewport (-96px) suit l'en-tête collant ; -60 % en bas ne garde que la section en cours.
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length === 0) return;
				visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				setActive(visible[0].target.id);
			},
			{ rootMargin: "-96px 0px -60% 0px" },
		);
		targets.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [items]);

	return (
		<nav className={s.tocAside} aria-labelledby="sommaire-lateral">
			<p className={s.tocAsideTitle} id="sommaire-lateral">Dans ce guide</p>
			<ol>
				{items.map((it) => (
					<li key={it.id}>
						<a
							href={`#${it.id}`}
							className={active === it.id ? s.tocActive : undefined}
							aria-current={active === it.id ? "true" : undefined}
						>
							{it.label}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
}
