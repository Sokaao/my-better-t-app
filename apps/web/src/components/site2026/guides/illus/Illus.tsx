import type { IllusName } from "@/lib/guides";
import FriseRelances from "./FriseRelances";

// Bibliothèque d'illustrations appelables depuis le JSON d'un guide : { "type": "illus", "name": "..." }.
// Ajouter une illustration : le composant ici, et son nom dans ILLUS_NAMES (lib/guides.ts).
const ILLUS: Record<IllusName, () => React.JSX.Element> = {
	"frise-relances": FriseRelances,
};

export default function Illus({ name }: { name: IllusName }) {
	const Component = ILLUS[name];
	return <Component />;
}
