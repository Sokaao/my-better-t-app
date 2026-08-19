"use client";

import { useEffect, useRef, useState } from "react";

// Compteur qui s'anime la première fois qu'il entre dans le viewport.
// Les chiffres d'engagement méritent d'être vus se poser ; au-delà, c'est du bruit.
export default function Counter({ to }: { to: number }) {
	const ref = useRef<HTMLSpanElement>(null);
	const [n, setN] = useState(to === 0 ? 0 : null as number | null);

	useEffect(() => {
		const el = ref.current;
		if (!el || to === 0) return;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setN(to);
			return;
		}

		let frame = 0;
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					io.unobserve(entry.target);
					const t0 = performance.now();
					const tick = (now: number) => {
						const p = Math.min((now - t0) / 1100, 1);
						setN(Math.round((1 - (1 - p) ** 3) * to));
						if (p < 1) frame = requestAnimationFrame(tick);
					};
					frame = requestAnimationFrame(tick);
				}
			},
			{ threshold: 0.4 },
		);

		io.observe(el);
		return () => {
			io.disconnect();
			if (frame) cancelAnimationFrame(frame);
		};
	}, [to]);

	// Avant l'animation on affiche la valeur cible : sans JS, le chiffre reste juste.
	return <span ref={ref}>{n ?? to}</span>;
}
