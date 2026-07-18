export default function SynapsisMark({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 54 62" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M 11 11 C 27 11 43 19 43 31" stroke="#EA580C" strokeWidth="2.8" fill="none" strokeLinecap="round" />
			<path d="M 43 31 C 43 43 27 51 11 51" stroke="#EA580C" strokeWidth="2.8" fill="none" strokeLinecap="round" />
			<circle cx="11" cy="11" r="5.5" fill="#EA580C" />
			<circle cx="11" cy="51" r="5.5" fill="#EA580C" />
			<circle cx="43" cy="31" r="8" fill="var(--cream)" />
			<circle cx="43" cy="31" r="5.5" fill="#EA580C" />
			<circle cx="43" cy="31" r="2.5" fill="#FDBA74" />
		</svg>
	);
}
