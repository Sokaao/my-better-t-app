"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Joue une fois l'animation d'une illustration quand elle arrive à l'écran.
// Sans JavaScript ou avec le mouvement réduit, data-anim n'est jamais posé : l'illustration reste dans son état final.
export default function PlayOnView({ className, label, children }: { className: string; label: string; children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		// Déjà à l'écran (défilement restauré, lien vers un passage) : on ne cache pas ce qui est lu.
		const r = el.getBoundingClientRect();
		if (r.top < window.innerHeight && r.bottom > 0) return;
		el.dataset.anim = "armed";
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					el.dataset.anim = "play";
					io.disconnect();
				}
			},
			{ threshold: 0.35 },
		);
		io.observe(el);
		return () => {
			io.disconnect();
			delete el.dataset.anim;
		};
	}, []);

	return (
		<div ref={ref} className={className} role="img" aria-label={label}>
			{children}
		</div>
	);
}
