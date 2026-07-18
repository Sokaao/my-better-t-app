import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SynapsisMark from "@/components/synapsis-mark";

export default function SiteNavMinimal() {
	return (
		<nav className="s-nav">
			<div className="s-nav-in">
				<Link href="/" className="s-logo">
					<SynapsisMark className="mark" />
					SYNAPSIS
				</Link>
				<Link href="/" className="s-btn s-btn-ghost">
					<ArrowLeft size={16} /> Retour à l&apos;accueil
				</Link>
			</div>
		</nav>
	);
}
