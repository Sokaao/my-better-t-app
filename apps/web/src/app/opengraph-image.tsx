import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Synapsis · Arrêtez de faire le facteur entre vos outils";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image de partage du nouveau site (refonte 2026) : fond blanc, accent orange, logo officiel (logos/synapsis, 05/11/2026).
export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "80px 90px",
					background: "#ffffff",
					backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,.08) 1px, transparent 0)",
					backgroundSize: "22px 22px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 18 }}>
					<svg width="45" height="53" viewBox="4.5 4.5 45 53">
						<path d="M11 11C27 11 43 19 43 31" stroke="#E8500F" strokeWidth="4.5" fill="none" strokeLinecap="round" />
						<path d="M43 31C43 43 27 51 11 51" stroke="#E8500F" strokeWidth="4.5" fill="none" strokeLinecap="round" />
						<circle cx="43" cy="31" r="9.5" fill="#ffffff" />
						<circle cx="11" cy="11" r="6.5" fill="#E8500F" />
						<circle cx="11" cy="51" r="6.5" fill="#E8500F" />
						<circle cx="43" cy="31" r="6.5" fill="#E8500F" />
					</svg>
					<span style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, color: "#0E0E10" }}>Synapsis</span>
				</div>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						fontSize: 70,
						fontWeight: 800,
						color: "#0E0E10",
						lineHeight: 1.08,
						letterSpacing: -2,
						marginTop: 48,
						maxWidth: 980,
					}}
				>
					Arrêtez de faire le facteur entre vos outils.
				</div>

				<div style={{ display: "flex", marginTop: 34, fontSize: 28, color: "#4B4E58", maxWidth: 940, lineHeight: 1.4 }}>
					Pour les PME de 10 à 49 salariés. Vos outils reliés autour d'un point central : c'est vous qui validez.
				</div>

				<div style={{ display: "flex", marginTop: 40 }}>
					<span style={{ display: "flex", background: "#E8500F", color: "#0E0E10", fontSize: 26, fontWeight: 700, padding: "14px 26px", borderRadius: 14 }}>
						Diagnostic gratuit · 3 minutes
					</span>
				</div>
			</div>
		),
		{ ...size },
	);
}
