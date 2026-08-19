import type { ReactNode } from "react";
import s from "@/styles/site.module.css";

// La passerelle : une seule phrase, entre deux mouvements, qui porte le lecteur de
// l'un à l'autre. Les filets verticaux au-dessus et en dessous disent la continuité.
export default function Bridge({ children }: { children: ReactNode }) {
	return (
		<div className={`${s.bridge} rv`}>
			<p>{children}</p>
		</div>
	);
}
