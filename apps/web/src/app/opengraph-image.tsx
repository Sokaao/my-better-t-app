import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Synapsis — Systèmes d'automatisation sur-mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
					background: "#faf6ef",
					backgroundImage:
						"linear-gradient(rgba(35,29,22,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(35,29,22,.06) 1px, transparent 1px)",
					backgroundSize: "44px 44px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
					<svg width="40" height="46" viewBox="0 0 54 62">
						<path d="M 11 11 C 27 11 43 19 43 31" stroke="#EA580C" strokeWidth="5" fill="none" strokeLinecap="round" />
						<path d="M 43 31 C 43 43 27 51 11 51" stroke="#EA580C" strokeWidth="5" fill="none" strokeLinecap="round" />
						<circle cx="11" cy="11" r="10" fill="#EA580C" />
						<circle cx="11" cy="51" r="10" fill="#EA580C" />
						<circle cx="43" cy="31" r="15" fill="#faf6ef" />
						<circle cx="43" cy="31" r="10" fill="#EA580C" />
						<circle cx="43" cy="31" r="4.5" fill="#FDBA74" />
					</svg>
					<span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 4, color: "#231d16" }}>
						SYNAPSIS
					</span>
				</div>

				<div
					style={{
						display: "flex",
						fontSize: 62,
						fontWeight: 800,
						color: "#231d16",
						lineHeight: 1.12,
						letterSpacing: -1.5,
						marginTop: 46,
						maxWidth: 920,
					}}
				>
					Je construis les systèmes qui font tourner votre business sans vous.
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 14,
						marginTop: 44,
						fontSize: 22,
						color: "#5c5347",
					}}
				>
					<span>n8n</span>
					<span style={{ color: "#e8500f" }}>·</span>
					<span>API</span>
					<span style={{ color: "#e8500f" }}>·</span>
					<span>Agents IA</span>
					<span style={{ color: "#e8500f" }}>·</span>
					<span>ROI chiffré sous 60 jours</span>
				</div>
			</div>
		),
		{ ...size },
	);
}
