import HomeHeader from "@/components/home/home-header";
import Hero from "@/components/home/hero";
import s from "@/styles/home.module.css";

// Accueil refondu. Structure et contenu : docs/REFONTE.md (§2 et §5).
// Section 1 (hero) posée ; sections 2 à 10 à suivre dans l'ordre du brief.
export default function Home() {
	return (
		<div className={s.page}>
			<HomeHeader />
			<main>
				<Hero />
			</main>
		</div>
	);
}
