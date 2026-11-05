"use client";

import { useEffect } from "react";
import { initHome } from "./home-effects";
import { initStory } from "./story-player";

// Les animations de la page (apparitions, fil, fiche, onglets, assistant) et la vidéo du hero
// sont du code impératif (DOM, GSAP, Web Audio) : on les lance une fois la page affichée
// et on les arrête proprement quand on la quitte.
export default function HomeClient() {
	useEffect(() => {
		const stopHome = initHome();
		const stopStory = initStory();
		return () => {
			stopStory();
			stopHome();
		};
	}, []);
	return null;
}
