// Icone officielle du kit de logos (09_mark_transparent.svg), avec le disque
// interieur repeint en creme : dans le SVG d'origine il est en #0C1E14, une
// couleur prevue pour un fond sombre.
export default function SynapsisMark({
	className,
	style,
}: {
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<svg
			className={className}
			style={style}
			viewBox="0 0 54 62"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M 11 11 C 27 11 43 19 43 31"
				stroke="#EA580C"
				strokeWidth="2.8"
				fill="none"
				strokeLinecap="round"
			/>
			<path
				d="M 43 31 C 43 43 27 51 11 51"
				stroke="#EA580C"
				strokeWidth="2.8"
				fill="none"
				strokeLinecap="round"
			/>
			<circle cx="11" cy="11" r="5.5" fill="#EA580C" />
			<circle cx="11" cy="51" r="5.5" fill="#EA580C" />
			<circle cx="43" cy="31" r="8" fill="#FAF6EF" />
			<circle cx="43" cy="31" r="5.5" fill="#EA580C" />
			<circle cx="43" cy="31" r="2.5" fill="#FDBA74" />
		</svg>
	);
}
