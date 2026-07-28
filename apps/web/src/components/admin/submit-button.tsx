"use client";

import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export default function SubmitButton({
	children,
	pendingLabel,
	...props
}: { children: ReactNode; pendingLabel: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled">) {
	const { pending } = useFormStatus();

	return (
		<button {...props} type="submit" disabled={pending} aria-busy={pending}>
			{pending ? pendingLabel : children}
		</button>
	);
}
