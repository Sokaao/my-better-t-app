import type { ReactNode } from "react";
import { preload } from "react-dom";
import "@/styles/site2026.css";
import { PRELOAD_FONTS } from "./fonts";
import Footer from "./Footer";
import Header from "./Header";

// Posée avant l'affichage : les animations d'apparition (.js .rv…) ne masquent le contenu
// que si JavaScript tourne. Sans lui, tout reste lisible.
const JS_FLAG = 'document.documentElement.classList.add("js")';

// Habillage commun du nouveau site : polices, en-tête avec le bouton unique, pied de page.
export default function Shell({ children }: { children: ReactNode }) {
	for (const href of PRELOAD_FONTS) preload(href, { as: "font", type: "font/woff2", crossOrigin: "" });
	return (
		<div className="s26">
			<script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
			<a href="#contenu" className="skip">
				Aller au contenu
			</a>
			<Header />
			<main id="contenu">{children}</main>
			<Footer />
		</div>
	);
}
