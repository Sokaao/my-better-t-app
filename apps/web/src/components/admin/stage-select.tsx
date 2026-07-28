"use client";

import { useRef } from "react";
import { STAGES, STAGE_LABELS, type Stage } from "@/lib/admin-clients";
import { updateStage } from "@/app/admin/actions";

export default function StageSelect({ id, stage }: { id: string; stage: Stage }) {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<form ref={formRef} action={updateStage}>
			<input type="hidden" name="id" value={id} />
			<select
				name="stage"
				defaultValue={stage}
				onChange={() => formRef.current?.requestSubmit()}
				style={{
					width: "auto",
					padding: "6px 10px",
					fontSize: 13,
					border: "1.5px solid var(--line-strong)",
					borderRadius: 6,
					background: "var(--bg, #fff)",
					color: "var(--ink-soft)",
				}}
			>
				{STAGES.map((s) => (
					<option key={s} value={s}>
						{STAGE_LABELS[s]}
					</option>
				))}
			</select>
		</form>
	);
}
