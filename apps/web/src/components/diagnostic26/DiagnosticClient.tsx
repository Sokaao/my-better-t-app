"use client";

import { useEffect } from "react";
import { envoyerDiagnosticPilotage } from "@/app/diagnostic/envoi";
import { initDiagnostic } from "./diagnostic-player";

// Le diagnostic est du code impératif (DOM, animations, carte) : on le lance une fois la page affichée
// et on l'arrête proprement quand on la quitte. L'envoi au pilotage passe par une action serveur.
export default function DiagnosticClient() {
	useEffect(() => initDiagnostic(envoyerDiagnosticPilotage), []);
	return null;
}
