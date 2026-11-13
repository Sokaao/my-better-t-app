// Données structurées schema.org, rendues côté serveur dans le HTML.
// Les « < » sont échappés pour qu'un texte ne puisse jamais fermer la balise <script>.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
		/>
	);
}
