"use client";

import { useEffect } from "react";

export function useScrollReveal() {
	useEffect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						io.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
		);

		const targets = document.querySelectorAll(".rv");
		for (const el of targets) io.observe(el);

		return () => io.disconnect();
	}, []);
}
