import { HOME_FAQ } from "./faq-data";

// Section « 9. Questions » de la page d'accueil (portée depuis la maquette validée).
export default function Faq() {
	return (
		<section className="sec" id="faq">
			<div className="wrap narrow">
				<div className="sec-head center" style={{ marginBottom: "0" }}>
					<span className="eyebrow">Questions</span>
					<h2 className="h2" data-words="">Les questions qu'on me pose</h2>
				</div>
				<div className="faq rv">
					{HOME_FAQ.map((item) => (
						<details key={item.q}>
							<summary>{item.q}</summary>
							<p>{item.a}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
