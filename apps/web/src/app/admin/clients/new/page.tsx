import { createClient } from "../../actions";
import SubmitButton from "@/components/admin/submit-button";

export default async function NewClientPage({
	searchParams,
}: {
	searchParams: Promise<{ error?: string }>;
}) {
	const { error } = await searchParams;

	return (
		<>
			<div className="s-bg-grid" />
			<main>
				<section className="s-page-hero" style={{ textAlign: "left", padding: "48px 0 24px" }}>
					<div className="s-wrap" style={{ maxWidth: 560 }}>
						<span className="s-eyebrow">Admin Synapsis</span>
						<h1 style={{ fontSize: 28, margin: "12px 0 0" }}>Nouveau client</h1>
					</div>
				</section>

				<section className="s-blk" style={{ paddingTop: 0 }}>
					<div className="s-wrap" style={{ maxWidth: 560 }}>
						<form action={createClient} className="of-field" style={{ marginLeft: 0 }}>
							<div className="of-sublab">Nom du client</div>
							<input type="text" name="nom" placeholder="Ex : CELOFAT (Noé Perret)" required />

							<div className="of-sublab">Identifiant (slug)</div>
							<input type="text" name="slug" placeholder="Ex : CELOFAT" required />
							<p className="of-hint">
								Sert de nom au dossier Drive et à l&apos;URL d&apos;onboarding. Mis en majuscules automatiquement,
								lettres/chiffres/tirets uniquement.
							</p>

							<div className="of-sublab">Email du client (optionnel)</div>
							<input type="email" name="email" placeholder="Ex : noe@celofat.fr" />
							<p className="of-hint">Utilisé pour prévenir le client par email quand tu fais avancer son étape.</p>

							<div className="of-sublab">Type d&apos;automatisation</div>
							<select name="automation_type" defaultValue="setter_ia_instagram">
								<option value="setter_ia_instagram">Setter IA Instagram</option>
								<option value="autre">Autre / pas encore configuré</option>
							</select>
							<p className="of-hint">
								Détermine le formulaire d&apos;onboarding affiché. Seul « Setter IA Instagram » est actif pour l&apos;instant
								— les autres types créent le client mais affichent une page d&apos;attente tant qu&apos;un formulaire n&apos;a
								pas été construit pour ce type.
							</p>

							<div className="of-sublab">Notes (optionnel)</div>
							<textarea name="notes" placeholder="Contexte, particularités…" />

							{error && (
								<p className="of-hint" style={{ color: "#c0392b" }}>
									{error}
								</p>
							)}

							<SubmitButton className="s-btn s-btn-primary" style={{ marginTop: 16 }} pendingLabel="Création…">
								Créer le client
							</SubmitButton>
						</form>
					</div>
				</section>
			</main>
		</>
	);
}
