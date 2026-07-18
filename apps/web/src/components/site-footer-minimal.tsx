export default function SiteFooterMinimal() {
	return (
		<footer className="s-footer" style={{ padding: "24px 0" }}>
			<div className="s-wrap" style={{ textAlign: "center" }}>
				<span className="s-copy" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
					© {new Date().getFullYear()} Synapsis. Tous droits réservés.
				</span>
			</div>
		</footer>
	);
}
