import { notFound } from "next/navigation";
import { editClient } from "../../../actions";
import SubmitButton from "@/components/admin/submit-button";
import DeleteClientButton from "@/components/admin/delete-client-button";
import { fetchClientById } from "@/lib/admin-clients";

export const dynamic = "force-dynamic";

export default async function EditClientPage({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ error?: string }>;
}) {
	const { id } = await params;
	const { error } = await searchParams;

	const client = await fetchClientById(id);
	if (!client) notFound();

	return (
		<>
			<div className="s-bg-grid" />
			<main>
				<section className="s-page-hero" style={{ textAlign: "left", padding: "48px 0 24px" }}>
					<div className="s-wrap" style={{ maxWidth: 560 }}>
						<span className="s-eyebrow">Admin Synapsis</span>
						<h1 style={{ fontSize: 28, margin: "12px 0 0" }}>Modifier {client.nom}</h1>
					</div>
				</section>

				<section className="s-blk" style={{ paddingTop: 0 }}>
					<div className="s-wrap" style={{ maxWidth: 560 }}>
						<form action={editClient} className="of-field" style={{ marginLeft: 0 }}>
							<input type="hidden" name="id" value={client.id} />

							<div className="of-sublab">Nom du client</div>
							<input type="text" name="nom" defaultValue={client.nom} required />

							<div className="of-sublab">Identifiant (slug)</div>
							<input type="text" value={client.slug} disabled style={{ opacity: 0.6 }} />
							<p className="of-hint">
								Non modifiable — sert de nom au dossier Drive et à l&apos;URL d&apos;onboarding déjà partagée avec le client.
							</p>

							<div className="of-sublab">Email du client (optionnel)</div>
							<input type="email" name="email" defaultValue={client.email ?? ""} placeholder="Ex : noe@celofat.fr" />
							<p className="of-hint">Utilisé pour prévenir le client par email quand tu fais avancer son étape.</p>

							<div className="of-sublab">Type d&apos;automatisation</div>
							<select name="automation_type" defaultValue={client.automation_type}>
								<option value="setter_ia_instagram">Setter IA Instagram</option>
								<option value="autre">Autre / pas encore configuré</option>
							</select>

							<div className="of-sublab">Notes (optionnel)</div>
							<textarea name="notes" defaultValue={client.notes} placeholder="Contexte, particularités…" />

							{error && (
								<p className="of-hint" style={{ color: "#c0392b" }}>
									{error}
								</p>
							)}

							<SubmitButton className="s-btn s-btn-primary" style={{ marginTop: 16 }} pendingLabel="Enregistrement…">
								Enregistrer
							</SubmitButton>
						</form>

						<div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
							<div className="of-sublab" style={{ color: "#c0392b" }}>
								Zone dangereuse
							</div>
							<DeleteClientButton id={client.id} nom={client.nom} />
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
