"use client";

import { useState } from "react";

export default function CopyLinkButton({ url }: { url: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<button
			type="button"
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(url);
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				} catch {
					// Clipboard indisponible (permissions navigateur) : rien à faire, le lien reste affiché.
				}
			}}
			style={{
				border: "1px solid var(--line-strong)",
				background: "#fff",
				borderRadius: 6,
				padding: "4px 8px",
				fontSize: 12,
				cursor: "pointer",
				color: copied ? "var(--orange)" : "var(--ink-soft)",
			}}
		>
			{copied ? "Copié ✓" : "Copier"}
		</button>
	);
}
