import type { CSSProperties } from "react";
import Link from "next/link";
import { CTA_HREF } from "@/components/site2026/cta";
import Story from "./Story";

// Section « 1. Haut de page » de la page d'accueil (portée depuis la maquette validée).
export default function Hero() {
	return (
		<section className="hero">
			<div className="wrap">
				{/* Mots déjà découpés (comme le fait home-effects.js pour les autres titres) : l'apparition démarre au premier affichage. */}
				<h1 className="h1" data-words=""><span className="t2"><span className="w" style={{ "--i": 0 } as CSSProperties}>Arrêtez</span> <span className="w" style={{ "--i": 1 } as CSSProperties}>de</span> <span className="w" style={{ "--i": 2 } as CSSProperties}>faire</span> <span className="w" style={{ "--i": 3 } as CSSProperties}>le</span> <span className="mark w" style={{ "--i": 4 } as CSSProperties}>facteur<svg className="mark-u" viewBox="0 0 300 22" aria-hidden="true"><path d="M5 15 C 70 6, 160 4, 295 11" pathLength="1" /></svg></span></span><span className="t2"><span className="w" style={{ "--i": 5 } as CSSProperties}>entre</span> <span className="w" style={{ "--i": 6 } as CSSProperties}>vos</span> <span className="w" style={{ "--i": 7 } as CSSProperties}>outils.</span></span></h1>
				<p className="sub rv" style={{ "--d": ".45s" } as CSSProperties}>Je centralise vos mails, votre fichier clients, votre agenda et vos factures. Tout se retrouve au même endroit, les relances partent au bon moment, et c'est vous qui validez.</p>
				<div className="frame-wrap rv" style={{ "--d": ".6s" } as CSSProperties} id="frameWrap">
					<Story />
					<button type="button" className="vid-pause" id="vidPause" aria-pressed="false" aria-label="Mettre la vidéo en pause" />
				</div>
				<div className="hero-cta rv">
					<Link href={CTA_HREF} className="cta big">Faire mon diagnostic</Link>
					<p className="hero-note"><img alt="" width="30" height="30" src="/images/frederic-mallet-120.webp" />Gratuit, en quelques minutes. Puis 30 min d'audit avec moi : vous repartez avec un plan complet, sans engagement.</p>
				</div>
				<div className="tools rv">
					<p>Je relie les outils que vous utilisez déjà</p>
					<div className="marq">
						<div className="marq-rail">
							<ul>
								<li><svg className="lg" viewBox="0 0 24 24" aria-hidden="true"><path fill="#0078D4" d="M2 5.5l9-1.6v16.2l-9-1.6zM12 6h9.2c.4 0 .8.4.8.8v10.4c0 .4-.4.8-.8.8H12z" /><ellipse cx="6.5" cy="12" rx="2.3" ry="3" fill="none" stroke="#fff" strokeWidth="1.4" /></svg>Outlook</li>
								<li><svg className="lg" viewBox="0 0 24 24" aria-hidden="true"><path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" /></svg>HubSpot</li>
								<li><span className="lgw" style={{ "--c": "#1e3a32" } as CSSProperties}>P</span>Pennylane</li>
								<li><span className="lgw" style={{ "--c": "#0e0e10" } as CSSProperties}>Q</span>Qonto</li>
								<li><svg className="lg" viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>WhatsApp</li>
								<li><svg className="lg wide" viewBox="0 9 24 6" aria-hidden="true"><path fill="#0B5CFF" d="M5.033 14.649H.743a.74.74 0 0 1-.686-.458.74.74 0 0 1 .16-.808L3.19 10.41H1.06A1.06 1.06 0 0 1 0 9.35h3.957c.301 0 .57.18.686.458a.74.74 0 0 1-.161.808L1.51 13.59h2.464c.585 0 1.06.475 1.06 1.06zM24 11.338c0-1.14-.927-2.066-2.066-2.066-.61 0-1.158.265-1.537.686a2.061 2.061 0 0 0-1.536-.686c-1.14 0-2.066.926-2.066 2.066v3.311a1.06 1.06 0 0 0 1.06-1.06v-2.251a1.004 1.004 0 0 1 2.013 0v2.251c0 .586.474 1.06 1.06 1.06v-3.311a1.004 1.004 0 0 1 2.012 0v2.251c0 .586.475 1.06 1.06 1.06zM16.265 12a2.728 2.728 0 1 1-5.457 0 2.728 2.728 0 0 1 5.457 0zm-1.06 0a1.669 1.669 0 1 0-3.338 0 1.669 1.669 0 0 0 3.338 0zm-4.82 0a2.728 2.728 0 1 1-5.458 0 2.728 2.728 0 0 1 5.457 0zm-1.06 0a1.669 1.669 0 1 0-3.338 0 1.669 1.669 0 0 0 3.338 0z" /></svg></li>
								<li><span className="lgw" style={{ "--c": "#0e0e10" } as CSSProperties}>T</span>Tally</li>
								<li><span className="lgw" style={{ "--c": "#217346" } as CSSProperties}>X</span>Excel</li>
							</ul>
							<ul aria-hidden="true">
								<li><svg className="lg" viewBox="0 0 24 24" aria-hidden="true"><path fill="#0078D4" d="M2 5.5l9-1.6v16.2l-9-1.6zM12 6h9.2c.4 0 .8.4.8.8v10.4c0 .4-.4.8-.8.8H12z" /><ellipse cx="6.5" cy="12" rx="2.3" ry="3" fill="none" stroke="#fff" strokeWidth="1.4" /></svg>Outlook</li>
								<li><svg className="lg" viewBox="0 0 24 24" aria-hidden="true"><path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" /></svg>HubSpot</li>
								<li><span className="lgw" style={{ "--c": "#1e3a32" } as CSSProperties}>P</span>Pennylane</li>
								<li><span className="lgw" style={{ "--c": "#0e0e10" } as CSSProperties}>Q</span>Qonto</li>
								<li><svg className="lg" viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>WhatsApp</li>
								<li><svg className="lg wide" viewBox="0 9 24 6" aria-hidden="true"><path fill="#0B5CFF" d="M5.033 14.649H.743a.74.74 0 0 1-.686-.458.74.74 0 0 1 .16-.808L3.19 10.41H1.06A1.06 1.06 0 0 1 0 9.35h3.957c.301 0 .57.18.686.458a.74.74 0 0 1-.161.808L1.51 13.59h2.464c.585 0 1.06.475 1.06 1.06zM24 11.338c0-1.14-.927-2.066-2.066-2.066-.61 0-1.158.265-1.537.686a2.061 2.061 0 0 0-1.536-.686c-1.14 0-2.066.926-2.066 2.066v3.311a1.06 1.06 0 0 0 1.06-1.06v-2.251a1.004 1.004 0 0 1 2.013 0v2.251c0 .586.474 1.06 1.06 1.06v-3.311a1.004 1.004 0 0 1 2.012 0v2.251c0 .586.475 1.06 1.06 1.06zM16.265 12a2.728 2.728 0 1 1-5.457 0 2.728 2.728 0 0 1 5.457 0zm-1.06 0a1.669 1.669 0 1 0-3.338 0 1.669 1.669 0 0 0 3.338 0zm-4.82 0a2.728 2.728 0 1 1-5.458 0 2.728 2.728 0 0 1 5.457 0zm-1.06 0a1.669 1.669 0 1 0-3.338 0 1.669 1.669 0 0 0 3.338 0z" /></svg></li>
								<li><span className="lgw" style={{ "--c": "#0e0e10" } as CSSProperties}>T</span>Tally</li>
								<li><span className="lgw" style={{ "--c": "#217346" } as CSSProperties}>X</span>Excel</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
