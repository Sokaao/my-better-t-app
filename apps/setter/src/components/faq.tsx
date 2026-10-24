"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: React.ReactNode };

export default function Faq({ items }: { items: FaqItem[] }) {
	const [ouvert, setOuvert] = useState<number | null>(0);

	return (
		<div className="s-faq-list">
			{items.map((item, i) => (
				<div key={item.q} className={`s-faq-item${ouvert === i ? " open" : ""}`}>
					<button
						type="button"
						className="s-faq-q-btn"
						aria-expanded={ouvert === i}
						onClick={() => setOuvert(ouvert === i ? null : i)}
					>
						<span className="s-faq-q-text">
							<span className="qm">{String(i + 1).padStart(2, "0")}</span>
							{item.q}
						</span>
						<ChevronDown size={18} className="s-faq-chevron" />
					</button>
					<div className="s-faq-panel">
						<div className="s-faq-panel-inner">
							<div className="s-faq-a">{item.a}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
