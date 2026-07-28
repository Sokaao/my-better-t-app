import { login } from "../actions";

export default async function AdminLoginPage({
	searchParams,
}: {
	searchParams: Promise<{ next?: string; error?: string }>;
}) {
	const { next, error } = await searchParams;

	return (
		<>
			<div className="s-bg-grid" />
			<main>
				<section className="s-page-hero" style={{ paddingBottom: 40 }}>
					<div className="s-wrap" style={{ maxWidth: 420 }}>
						<span className="s-eyebrow" style={{ justifyContent: "center" }}>
							Accès privé
						</span>
						<h1 style={{ fontSize: 32 }}>Administration Synapsis</h1>

						<form action={login} className="of-field" style={{ marginTop: 24, marginLeft: 0, textAlign: "left" }}>
							<input type="hidden" name="next" value={next || "/admin"} />
							<div className="of-sublab">Mot de passe</div>
							{/* eslint-disable-next-line jsx-a11y/no-autofocus */}
							<input type="password" name="password" placeholder="••••••••" autoFocus required />
							{error && (
								<p className="of-hint" style={{ color: "#c0392b" }}>
									Mot de passe incorrect.
								</p>
							)}
							<button
								className="s-btn s-btn-primary"
								type="submit"
								style={{ marginTop: 16, width: "100%", justifyContent: "center" }}
							>
								Se connecter
							</button>
						</form>
					</div>
				</section>
			</main>
		</>
	);
}
