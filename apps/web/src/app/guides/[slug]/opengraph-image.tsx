import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllGuides, getGuide } from "@/lib/guides";

export const alt = "Guide pratique Synapsis, par Frédéric Mallet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Produite au build pour chaque guide, comme la page (pas de fonction à l'exécution).
export const dynamicParams = false;
export function generateStaticParams() {
	return getAllGuides().map((g) => ({ slug: g.slug }));
}

// Image de partage propre à chaque guide, générée au build à partir du titre (h1).
// Même langage que app/opengraph-image.tsx : fond blanc pointillé, accent orange, logo officiel.
const PHOTO_CANDIDATES = [
	path.join(process.cwd(), "public/images/frederic-mallet.jpg"),
	path.join(process.cwd(), "apps/web/public/images/frederic-mallet.jpg"),
];

function photoDataUri(): string | null {
	const file = PHOTO_CANDIDATES.find((p) => fs.existsSync(p));
	if (!file) return null;
	// Le type se lit dans les premiers octets : malgré son extension .jpg, ce fichier est aujourd'hui un PNG,
	// et un type faux casse le rendu (« Offset is outside the bounds of the DataView »).
	const buf = fs.readFileSync(file);
	const mime = buf[0] === 0x89 && buf[1] === 0x50 ? "image/png" : buf[0] === 0xff && buf[1] === 0xd8 ? "image/jpeg" : null;
	return mime ? `data:${mime};base64,${buf.toString("base64")}` : null;
}

export default async function GuideOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const guide = getGuide(slug);
	const title = guide?.h1 ?? "Guides pratiques pour dirigeants de PME";
	const titleSize = title.length > 80 ? 54 : title.length > 60 ? 62 : 70;
	const photo = photoDataUri();

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "70px 90px 64px",
					background: "#ffffff",
					backgroundImage:
						"radial-gradient(circle at 92% 8%, rgba(232,80,15,.10) 0, rgba(232,80,15,0) 420px), radial-gradient(circle at 1px 1px, rgba(15,23,42,.08) 1px, transparent 0)",
					backgroundSize: "100% 100%, 22px 22px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
						<svg width="38" height="45" viewBox="4.5 4.5 45 53">
							<path d="M11 11C27 11 43 19 43 31" stroke="#E8500F" strokeWidth="4.5" fill="none" strokeLinecap="round" />
							<path d="M43 31C43 43 27 51 11 51" stroke="#E8500F" strokeWidth="4.5" fill="none" strokeLinecap="round" />
							<circle cx="43" cy="31" r="9.5" fill="#ffffff" />
							<circle cx="11" cy="11" r="6.5" fill="#E8500F" />
							<circle cx="11" cy="51" r="6.5" fill="#E8500F" />
							<circle cx="43" cy="31" r="6.5" fill="#E8500F" />
						</svg>
						<span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1, color: "#0E0E10" }}>Synapsis</span>
					</div>
					<span
						style={{
							display: "flex",
							fontSize: 24,
							fontWeight: 700,
							color: "#C23F08",
							background: "#FDEEE6",
							padding: "10px 22px",
							borderRadius: 999,
						}}
					>
						Guide pratique
					</span>
				</div>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						fontSize: titleSize,
						fontWeight: 800,
						color: "#0E0E10",
						lineHeight: 1.08,
						letterSpacing: -2,
						maxWidth: 1000,
					}}
				>
					{title}
				</div>

				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
						{photo && (
							<img src={photo} width={76} height={76} alt="" style={{ borderRadius: 999, objectFit: "cover", border: "3px solid #FDEEE6" }} />
						)}
						<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
							<span style={{ fontSize: 28, fontWeight: 700, color: "#0E0E10" }}>Frédéric Mallet</span>
							<span style={{ fontSize: 22, color: "#4B4E58" }}>mysynapsis.fr/guides</span>
						</div>
					</div>
					{guide && <span style={{ display: "flex", fontSize: 22, color: "#6B6F7B" }}>{guide.readingMinutes} min de lecture</span>}
				</div>
			</div>
		),
		{ ...size },
	);
}
