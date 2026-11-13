"use client";

import { useEffect } from "react";
import { retenirProvenance } from "@/lib/provenance";

// Retient d'où vient le visiteur dès sa première page (voir src/lib/provenance.js).
export default function Provenance() {
	useEffect(() => retenirProvenance(), []);
	return null;
}
