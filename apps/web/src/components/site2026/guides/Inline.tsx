import type { ReactNode } from "react";
import Link from "next/link";
import s from "./guide.module.css";

// Rendu du texte en ligne des guides : **gras** et [texte](url) uniquement, sans HTML brut.
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export default function Inline({ text }: { text: string }) {
	const out: ReactNode[] = [];
	let last = 0;
	let n = 0;
	for (const m of text.matchAll(TOKEN)) {
		const at = m.index ?? 0;
		if (at > last) out.push(text.slice(last, at));
		const url = m[3];
		if (m[1] !== undefined) {
			out.push(<strong key={n++}>{m[1]}</strong>);
		} else if (url.startsWith("/")) {
			// Chemin issu du JSON, donc non connu de typedRoutes à la compilation.
			out.push(
				<Link key={n++} href={url as never}>
					{m[2]}
				</Link>,
			);
		} else if (/^https?:\/\//i.test(url)) {
			out.push(
				<a key={n++} href={url} target="_blank" rel="noopener noreferrer">
					{m[2]}
					<span className={s.sr}> (nouvel onglet)</span>
				</a>,
			);
		} else {
			// Ancres (#…), mailto: et autres : lien simple.
			out.push(
				<a key={n++} href={url}>
					{m[2]}
				</a>,
			);
		}
		last = at + m[0].length;
	}
	if (last < text.length) out.push(text.slice(last));
	return <>{out}</>;
}
