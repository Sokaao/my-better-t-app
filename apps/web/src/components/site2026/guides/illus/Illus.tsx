import type { IllusName } from "@/lib/guides";
import BoiteEnvoi from "./BoiteEnvoi";
import CanauxRelance from "./CanauxRelance";
import FriseRelances from "./FriseRelances";
import HeroDevis from "./HeroDevis";
import IaPrepare from "./IaPrepare";
import OutilsRelies from "./OutilsRelies";
import TableauSuivi from "./TableauSuivi";

// Bibliothèque d'illustrations appelables depuis le JSON d'un guide : { "type": "illus", "name": "..." }.
// Ajouter une illustration : le composant ici, et son nom dans ILLUS_NAMES (lib/guides.ts).
const ILLUS: Record<IllusName, () => React.JSX.Element> = {
	"frise-relances": FriseRelances,
	"boite-envoi": BoiteEnvoi,
	"tableau-suivi": TableauSuivi,
	"outils-relies": OutilsRelies,
	"canaux-relance": CanauxRelance,
	"ia-prepare": IaPrepare,
	"hero-devis": HeroDevis, // conçue pour l'en-tête (champ heroIllus du guide)
};

export default function Illus({ name }: { name: IllusName }) {
	const Component = ILLUS[name];
	return <Component />;
}
