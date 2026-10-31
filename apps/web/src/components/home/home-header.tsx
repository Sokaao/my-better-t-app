import Link from "next/link";
import s from "@/styles/home.module.css";

export default function HomeHeader() {
	return (
		<header className={s.header}>
			<div className={s.wrap + " " + s.headerInner}>
				<Link href="/" className={s.brand} aria-label="Synapsis, accueil">
					Synapsis
				</Link>
				<Link href="/diagnostic" className={s.ctaSmall}>
					Faire mon diagnostic
				</Link>
			</div>
		</header>
	);
}
