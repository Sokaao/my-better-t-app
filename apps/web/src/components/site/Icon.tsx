import type { ReactNode } from "react";
import s from "@/styles/site.module.css";

// Pictogrammes des cartes. Ils remplacent une phrase d'explication, ils ne décorent pas :
// chaque carte se lit en un titre, un dessin et une ligne.
const ICONS = {
	calendrier: (
		<>
			<rect x="3" y="5" width="18" height="16" rx="2" />
			<path d="M3 10h18M8 3v4M16 3v4" />
		</>
	),
	depart: (
		<>
			<circle cx="9" cy="8" r="3.5" />
			<path d="M2 20a7 7 0 0 1 12-4.9" />
			<path d="M16 12h6M19 9l3 3-3 3" />
		</>
	),
	reforme: (
		<>
			<path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
			<path d="M14 3v5h5" />
			<path d="M12 11v4M12 18h.01" />
		</>
	),
	recrutement: (
		<>
			<circle cx="10" cy="8" r="4" />
			<path d="M3 20a7 7 0 0 1 10-6.3" />
			<circle cx="17" cy="17" r="3.5" />
			<path d="M19.6 19.6L22 22" />
		</>
	),
	logiciel: (
		<>
			<rect x="2" y="4" width="20" height="13" rx="2" />
			<path d="M8 21h8M12 17v4" />
		</>
	),
	portail: (
		<>
			<path d="M17 17.5a3.5 3.5 0 0 0-1-6.9 5 5 0 0 0-9.6 1.4A3.5 3.5 0 0 0 7 17.5" />
			<path d="M12 21v-8M9.5 15.5L12 13l2.5 2.5" />
		</>
	),
	tableau: (
		<>
			<rect x="3" y="3" width="18" height="18" rx="2" />
			<path d="M3 9h18M3 15h18M9 3v18" />
		</>
	),
	conseil: (
		<>
			<path d="M4 19V5M4 19h16" />
			<polyline points="7 15 11 11 14 14 20 8" />
		</>
	),
	honoraires: (
		<>
			<path d="M4 19V5M4 19h16" />
			<polyline points="7 9 11 13 14 10 20 16" />
		</>
	),
	capacite: (
		<>
			<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<path d="M12 11v6M9 14h6" />
		</>
	),
	equipe: (
		<>
			<circle cx="9" cy="8" r="3.5" />
			<path d="M2 20a7 7 0 0 1 14 0" />
			<path d="M16 5.2a3.5 3.5 0 0 1 0 5.6M18.5 20a6.5 6.5 0 0 0-2.2-4.8" />
		</>
	),
	campagne: (
		<>
			<rect x="3" y="5" width="18" height="16" rx="2" />
			<path d="M3 10h18M8 3v4M16 3v4" />
			<polyline points="8.5 15 10.5 17 15 12.5" />
		</>
	),
} satisfies Record<string, ReactNode>;

// Le nom d'un pictogramme. Le type découle de ICONS : ajouter une entrée suffit.
export type IconName = keyof typeof ICONS;

export default function Icon({ name }: { name: IconName }) {
	return (
		<svg
			className={s.cardIcon}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{ICONS[name]}
		</svg>
	);
}
