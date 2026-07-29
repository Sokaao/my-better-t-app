"use client";

import { removeClient } from "@/app/admin/actions";

export default function DeleteClientButton({ id, nom }: { id: string; nom: string }) {
	return (
		<form
			action={removeClient}
			onSubmit={(e) => {
				if (!confirm(`Supprimer définitivement ${nom} ? Cette action est irréversible.`)) {
					e.preventDefault();
				}
			}}
		>
			<input type="hidden" name="id" value={id} />
			<button type="submit" className="s-btn s-btn-ghost" style={{ color: "#c0392b", borderColor: "#e0b4ac" }}>
				Supprimer ce client
			</button>
		</form>
	);
}
