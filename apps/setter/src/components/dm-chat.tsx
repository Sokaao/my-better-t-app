"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Play, RotateCcw, User } from "lucide-react";
import {
	DM_DATE,
	DM_MESSAGES,
	DM_NOTIFICATION,
	type DmMessage,
} from "@/lib/dm-demo";

// Hauteurs des barres du waveform. Fixes et non aleatoires : le composant est
// prerendu, un Math.random ferait diverger le HTML du serveur et du client.
const WAVE = [
	7, 12, 18, 9, 14, 21, 11, 16, 8, 19, 13, 22, 10, 15, 7, 17, 12, 20, 9, 14, 18,
	8, 13, 16, 11, 19, 7, 15, 10, 12,
];

function Vocal({ duree }: { duree: string }) {
	return (
		<span className="st-voice">
			<span className="play" aria-hidden="true">
				<Play size={11} fill="currentColor" />
			</span>
			<span className="wave" aria-hidden="true">
				{WAVE.map((h, i) => (
					<i key={i} style={{ height: h }} />
				))}
			</span>
			<span className="dur">{duree}</span>
			<span className="sr-only">Message vocal de {duree}</span>
		</span>
	);
}

// Delai avant l'apparition d'une bulle : on simule le temps de frappe, plafonne
// pour que la sequence complete reste sous une dizaine de secondes.
function delai(m: DmMessage, premier: boolean): number {
	const base = premier ? 260 : 470;
	if (m.type === "systeme") return 420;
	if (m.type === "vocal") return base + 620;
	return base + Math.min(m.texte.length * 8, 820);
}

export default function DmChat() {
	const ref = useRef<HTMLDivElement>(null);
	const [anime, setAnime] = useState(false);
	const [visibles, setVisibles] = useState(0);
	const [demarre, setDemarre] = useState(false);

	// Le CSS ne masque les bulles que si le conteneur porte `anim`, pose ici
	// apres le montage : sans JS, la conversation reste entierement lisible.
	useEffect(() => {
		const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduit) {
			setVisibles(DM_MESSAGES.length);
			return;
		}
		setAnime(true);
	}, []);

	// Depart quand le bloc entre dans l'ecran, pas au chargement de la page.
	useEffect(() => {
		if (!anime || !ref.current) return;
		const el = ref.current;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						setDemarre(true);
						io.unobserve(e.target);
					}
				}
			},
			{ threshold: 0.15 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [anime]);

	useEffect(() => {
		if (!demarre || visibles >= DM_MESSAGES.length) return;
		const m = DM_MESSAGES[visibles];
		if (!m) return;
		const t = setTimeout(() => setVisibles((v) => v + 1), delai(m, visibles === 0));
		return () => clearTimeout(t);
	}, [demarre, visibles]);

	const termine = visibles >= DM_MESSAGES.length;

	return (
		<div className="st-term" ref={ref}>
			<div className="st-term-bar">
				<span className="d r" />
				<span className="d y" />
				<span className="d g" />
				<span className="fname">conversation-anonymisee.txt</span>
				{anime && termine && (
					<button type="button" className="st-replay" onClick={() => setVisibles(0)}>
						<RotateCcw size={11} /> rejouer
					</button>
				)}
				<span className="st-term-status">
					<span className="led" /> ACTIF
				</span>
			</div>

			{/* Le fil reprend les codes visuels d'Instagram : c'est la que le
			    prospect voit la conversation, la reconnaissance est immediate. */}
			<div className="st-thread">
				<div className="st-thread-date">{DM_DATE}</div>

				<div className={`st-chat${anime ? " anim" : ""}`}>
					{DM_MESSAGES.map((m, i) => {
						const vu = i < visibles;

						if (m.type === "systeme") {
							return (
								<div className={`st-sys${vu ? " show" : ""}`} key={i}>
									<span>{m.texte}</span>
								</div>
							);
						}

						return (
							<div className={`st-row ${m.sens}${vu ? " show" : ""}`} key={i}>
								{m.sens === "in" && (
									<span className="st-ava" aria-hidden="true">
										<User size={13} />
									</span>
								)}
								<div className="st-bub">
									<span className="sr-only">
										{m.sens === "in" ? "Prospect : " : "Setter IA : "}
									</span>
									{m.type === "vocal" ? <Vocal duree={m.duree} /> : m.texte}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* La seule chose que le client recoit de tout l'echange. */}
			<div className={`st-notif${!anime || termine ? " show" : ""}`}>
				<span className="ico">
					<CalendarCheck size={17} />
				</span>
				<div>
					<div className="t">
						{DM_NOTIFICATION.titre} · <b>{DM_NOTIFICATION.quand}</b>
					</div>
					<div className="l">{DM_NOTIFICATION.lignes.join("  ·  ")}</div>
				</div>
			</div>
		</div>
	);
}
