import Link from "next/link";
import type { Route } from "next";
import { fetchClients } from "@/lib/admin-clients";
import { logout } from "./actions";
import StageSelect from "@/components/admin/stage-select";
import CopyLinkButton from "@/components/admin/copy-link-button";

// Toujours re-rendre côté serveur : la liste des clients ne doit jamais être figée au build.
export const dynamic = "force-dynamic";

const AUTOMATION_LABELS: Record<string, string> = {
	setter_ia_instagram: "Setter IA Instagram",
	autre: "Autre / à configurer",
};

export default async function AdminPage() {
	let clients: Awaited<ReturnType<typeof fetchClients>> = [];
	let loadError = false;
	try {
		clients = await fetchClients();
	} catch {
		loadError = true;
	}

	return (
		<>
			<div className="s-bg-grid" />
			<main>
				<section className="s-page-hero" style={{ textAlign: "left", padding: "48px 0 24px" }}>
					<div
						className="s-wrap"
						style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}
					>
						<div>
							<span className="s-eyebrow">Admin Synapsis</span>
							<h1 style={{ fontSize: 32, margin: "12px 0 0" }}>Clients</h1>
						</div>
						<div style={{ display: "flex", gap: 10 }}>
							<Link href="/admin/clients/new" className="s-btn s-btn-primary">
								+ Nouveau client
							</Link>
							<form action={logout}>
								<button type="submit" className="s-btn s-btn-ghost">
									Déconnexion
								</button>
							</form>
						</div>
					</div>
				</section>

				<section className="s-blk" style={{ paddingTop: 0 }}>
					<div className="s-wrap">
						{loadError ? (
							<p style={{ color: "#c0392b" }}>
								Impossible de charger la liste des clients (Supabase injoignable). Réessaie dans un instant.
							</p>
						) : clients.length === 0 ? (
							<p style={{ color: "var(--ink-soft)" }}>Aucun client pour l&apos;instant.</p>
						) : (
							<div className="of-field" style={{ marginLeft: 0, padding: 0, overflow: "auto" }}>
								<table style={{ width: "100%", borderCollapse: "collapse" }}>
									<thead>
										<tr style={{ background: "var(--cream-2)", textAlign: "left" }}>
											<th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--faint)" }}>
												Client
											</th>
											<th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--faint)" }}>
												Automatisation
											</th>
											<th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--faint)" }}>
												Étape
											</th>
											<th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--faint)" }}>
												Notes
											</th>
											<th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--faint)" }}>
												Mis à jour
											</th>
											<th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--faint)" }}>
												Lien onboarding
											</th>
											<th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--faint)" }} />
										</tr>
									</thead>
									<tbody>
										{clients.map((c) => (
											<tr key={c.id} style={{ borderTop: "1px solid var(--line)" }}>
												<td style={{ padding: "12px 16px", fontWeight: 600 }}>
													{c.nom}
													<div style={{ fontSize: 12, color: "var(--faint)", fontFamily: "var(--font-ibm-plex-mono)", fontWeight: 400 }}>
														{c.slug}
													</div>
												</td>
												<td style={{ padding: "12px 16px", color: "var(--ink-soft)" }}>
													{AUTOMATION_LABELS[c.automation_type] || c.automation_type}
												</td>
												<td style={{ padding: "12px 16px" }}>
													<StageSelect id={c.id} stage={c.stage} />
												</td>
												<td
													style={{
														padding: "12px 16px",
														color: "var(--ink-soft)",
														maxWidth: 220,
														overflow: "hidden",
														textOverflow: "ellipsis",
														whiteSpace: "nowrap",
													}}
													title={c.notes || undefined}
												>
													{c.notes || <span style={{ color: "var(--faint)" }}>—</span>}
												</td>
												<td style={{ padding: "12px 16px", color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
													{new Date(c.updated_at).toLocaleString("fr-FR", {
														day: "2-digit",
														month: "2-digit",
														hour: "2-digit",
														minute: "2-digit",
													})}
												</td>
												<td style={{ padding: "12px 16px" }}>
													{c.url_slug ? (
														<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
															<Link href={(`/onboarding/${c.url_slug}`) as Route} style={{ color: "var(--orange)" }}>
																/onboarding/{c.url_slug}
															</Link>
															<CopyLinkButton url={`https://www.mysynapsis.fr/onboarding/${c.url_slug}`} />
														</div>
													) : (
														<span style={{ color: "var(--faint)" }}>— (lien non généré)</span>
													)}
												</td>
												<td style={{ padding: "12px 16px" }}>
													<Link href={(`/admin/clients/${c.id}/edit`) as Route} style={{ color: "var(--ink-soft)" }}>
														Modifier
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
