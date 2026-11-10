import type { CSSProperties } from "react";

// Vidéo d'accroche « Qui fait le lien entre tous vos outils ? » : le décor HTML. Toute l'animation et le son vivent dans story-player.js.
export default function Story() {
	return (
		<div className="frame vd" id="story">
			<p className="f-sr">Vidéo d'accroche. Qui fait le lien entre tous vos outils ? Vous. Ou votre équipe. Toute la journée, vous recopiez, vous relancez, vous vérifiez. Un oubli, et le client signe ailleurs. Alors, arrêtez de faire le facteur entre vos outils. Et si, à la place, vos outils se parlaient ? C'est ce que je mets en place : je les relie dans votre propre espace, construit pour votre entreprise et pour vos besoins. Résultat : plus rien à recopier, et toute l'équipe voit la même fiche. Prenons Julien, un client. Dès qu'il demande des informations, sa fiche se crée, puis le devis part. Trois jours plus tard, toujours pas de réponse de sa part. L'assistant prépare la relance, et c'est vous qui validez. Au final, Julien signe, la facture suit, et il paie. Ou bien vous dirigez un organisme de formation. Nadia inscrit trois salariés : la convention part, les convocations suivent, et l'émargement est prêt. Ou encore, vous entretenez des pompes à chaleur. Celle de Pierre tombe en panne un dimanche soir : il a une réponse dans la minute, choisit son créneau, et l'intervention est calée. Trois métiers. Rien à recopier, aucune relance oubliée, aucun client perdu. Je relie les outils que vous avez déjà, sans vous en faire changer. Dans votre espace, tous vos outils sont au même endroit, avec les automatisations qui les relient. D'un coup d'œil, vous repérez ce qui bloque, avant que le client ne s'en plaigne. Et chaque matin, vous recevez l'essentiel. Désormais, vos outils font le lien entre eux. Et vous, vous gardez le lien avec vos clients. Moi, c'est Frédéric. Pour commencer, faites le diagnostic : en quelques minutes, vous voyez où ça coince chez vous.</p>
			<div className="vbg vb-light" id="bgL" aria-hidden="true" />
			<div className="vbg vb-dark" id="bgD" aria-hidden="true" />
			<div className="vbg vb-orange" id="bgO" aria-hidden="true"><i /></div>
			<div className="vstage" aria-hidden="true">
				{/* 1. La question, puis les outils éparpillés */}
				<div className="vs" id="s1">
					<div className="v-prompt" id="prompt1"><span className="v-pi"><svg viewBox="0 0 80 80"><g transform="translate(13, 9) scale(0.98)"><path d="M 11 11 C 27 11 43 19 43 31" stroke="#e8500f" strokeWidth="6" fill="none" strokeLinecap="round" /><path d="M 43 31 C 43 43 27 51 11 51" stroke="#e8500f" strokeWidth="6" fill="none" strokeLinecap="round" /><circle cx="11" cy="11" r="7.5" fill="#e8500f" /><circle cx="11" cy="51" r="7.5" fill="#e8500f" /><circle cx="43" cy="31" r="10.5" fill="#e8500f" /></g></svg></span><span className="v-ptxt"><span id="ptxt1" /><i className="v-caret" id="caret1" /></span><span className="v-psend" id="psend1"><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg></span></div>
					<div className="v-win w1">
						<div className="v-wh" style={{ "--c": "#0078d4" } as CSSProperties}><i /><b>Outlook</b><em>12</em></div>
						<p><b>Julien Petit</b>Vous avez reçu ma demande ?</p>
					</div>
					<div className="v-win w2">
						<div className="v-wh" style={{ "--c": "#217346" } as CSSProperties}><i /><b>suivi_clients_V3.xlsx</b></div>
						<p><b>Petit J.</b>devis envoyé ? à vérifier</p>
					</div>
					<div className="v-win w3">
						<div className="v-wh" style={{ "--c": "#e8500f" } as CSSProperties}><i /><b>Agenda</b></div>
						<p><b>14:00</b>Rappeler Julien</p>
					</div>
					<div className="v-win w4">
						<div className="v-wh" style={{ "--c": "#25d366" } as CSSProperties}><i /><b>WhatsApp</b></div>
						<p><b>Julien</b>Toujours rien reçu…</p>
					</div>
					<div className="v-win w5">
						<div className="v-wh" style={{ "--c": "#1e3a32" } as CSSProperties}><i /><b>Pennylane</b></div>
						<p><b>F-2026-118</b>en attente</p>
					</div>
				</div>
				{/* 2. Vous. Ou votre équipe. */}
				<div className="vs dark" id="s2">
					<p className="vt-xxl" id="vous">Vous.</p>
					<div className="v-team" id="team">
						<span className="v-avs"><span className="av antoine" /><span className="av claire" /><span className="av sarah" /></span>
						<p className="vt-m" data-w="" id="team-t">Ou votre équipe.</p>
					</div>
				</div>
				{/* 3. Recopier, relancer, vérifier */}
				<div className="vs" id="s3">
					<p className="vt-s" data-w="" id="s3a">Toute la journée,</p>
					<div className="v-stack v-verbs">
						<p className="vt-xl" data-w="" id="vb1">vous <span className="acc">recopiez.</span></p>
						<p className="vt-xl" data-w="" id="vb2">vous <span className="acc">relancez.</span></p>
						<p className="vt-xl" data-w="" id="vb3">vous <span className="acc">vérifiez.</span></p>
					</div>
					<div className="v-stack v-vis3">
						<div className="v-vg" id="vg1">
							<div className="v-mini">
								<div className="v-wh" style={{ "--c": "#217346" } as CSSProperties}><i /><b>Excel</b></div>
								<p>Julien Petit · 2 340 €</p>
							</div>
							<span className="v-arrow">→</span>
							<div className="v-mini">
								<div className="v-wh" style={{ "--c": "#0078d4" } as CSSProperties}><i /><b>Mail</b></div>
								<p><span className="v-ghost" id="ghost">Julien Petit · 2 340 €</span></p>
							</div>
						</div>
						<div className="v-vg" id="vg2">
							<div className="v-notif">
								<span className="v-ni">⏰</span>
								<div><b>Rappel · 14:00</b><span>Relancer Julien Petit</span></div>
							</div>
						</div>
						<div className="v-vg" id="vg3"><span className="v-st">Pennylane · <b className="ok">payée</b></span><span className="v-ne">≠</span><span className="v-st">Excel · <b className="warn">en attente</b></span></div>
					</div>
				</div>
				{/* 4. Un oubli, et le client signe ailleurs */}
				<div className="vs dark" id="s4">
					<p className="vt-l" data-w="" id="s4a">Un oubli,</p>
					<div className="v-row4">
						<div className="v-agenda" id="ag4"><b>14:00</b><span>Relancer Julien</span><i className="v-strike" id="strike4" /></div>
						<div className="v-client" id="cl4">
							<span className="av julien" />
							<div><b>Julien Petit</b><small>Devis D-0412 · 2 340 €</small></div>
						</div>
					</div>
					<p className="vt-l" data-w="" id="s4b">et le client <span className="red">signe ailleurs.</span></p>
					<p className="v-loss" id="loss4">−2 340 €</p>
				</div>
				{/* 5. Arrêtez de faire le facteur */}
				<div className="vs dark" id="s5">
					<p className="vt-xl" data-w="" id="s5a">Alors, arrêtez de faire le facteur</p>
					<p className="v-pillw" id="s5b"><span className="v-pill">entre vos outils.</span></p>
				</div>
				{/* 6. Et si vos outils se parlaient ? */}
				<div className="vs dark" id="s6">
					<p className="vt-l" data-w="" id="s6a">Et si, à la place,</p>
					<p className="vt-xl" data-w="" id="s6b">vos outils <span className="acc">se parlaient ?</span></p>
					<span className="v-spark" id="spark" />
				</div>
				{/* 7. Le point central */}
				<div className="vs" id="s7">
					<div className="v-stack v-cap7">
						<p className="vt-m" data-w="" id="c7a">Je les relie dans <span className="acc">votre propre espace,</span></p>
						<p className="vt-m" data-w="" id="c7a2">construit pour votre entreprise <span className="acc">et pour vos besoins.</span></p>
						<p className="vt-m" data-w="" id="c7b">Résultat : plus rien <span className="acc">à recopier.</span></p>
					</div>
					<div className="v-hub" id="hub">
						<svg className="v-spokes" viewBox="0 0 100 100" preserveAspectRatio="none" id="spokes" />
						<div className="v-disc" id="disc"><svg viewBox="0 0 80 80"><g transform="translate(13, 9) scale(0.98)"><path d="M 11 11 C 27 11 43 19 43 31" stroke="#e8500f" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M 43 31 C 43 43 27 51 11 51" stroke="#e8500f" strokeWidth="5" fill="none" strokeLinecap="round" /><circle cx="11" cy="11" r="7" fill="#e8500f" /><circle cx="11" cy="51" r="7" fill="#e8500f" /><circle cx="43" cy="31" r="10" fill="#e8500f" /></g></svg><b>Votre espace</b></div>
						<div className="v-tile" style={{ "--x": "14", "--y": "22" } as CSSProperties}><svg viewBox="0 0 24 24"><path fill="#0078D4" d="M2 5.5l9-1.6v16.2l-9-1.6zM12 6h9.2c.4 0 .8.4.8.8v10.4c0 .4-.4.8-.8.8H12z" /><ellipse cx="6.5" cy="12" rx="2.3" ry="3" fill="none" stroke="#fff" strokeWidth="1.4" /></svg><b>Outlook</b></div>
						<div className="v-tile" style={{ "--x": "38", "--y": "9" } as CSSProperties}><svg viewBox="0 0 24 24"><path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" /></svg><b>HubSpot</b></div>
						<div className="v-tile" style={{ "--x": "62", "--y": "9" } as CSSProperties}><span className="lgw" style={{ "--c": "#1e3a32" } as CSSProperties}>P</span><b>Pennylane</b></div>
						<div className="v-tile" style={{ "--x": "86", "--y": "22" } as CSSProperties}><span className="lgw" style={{ "--c": "#0e0e10" } as CSSProperties}>Q</span><b>Qonto</b></div>
						<div className="v-tile" style={{ "--x": "86", "--y": "78" } as CSSProperties}><svg viewBox="0 0 24 24"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg><b>WhatsApp</b></div>
						<div className="v-tile" style={{ "--x": "62", "--y": "91" } as CSSProperties}><svg viewBox="0 9 24 6" className="wide"><path fill="#0B5CFF" d="M5.033 14.649H.743a.74.74 0 0 1-.686-.458.74.74 0 0 1 .16-.808L3.19 10.41H1.06A1.06 1.06 0 0 1 0 9.35h3.957c.301 0 .57.18.686.458a.74.74 0 0 1-.161.808L1.51 13.59h2.464c.585 0 1.06.475 1.06 1.06zM24 11.338c0-1.14-.927-2.066-2.066-2.066-.61 0-1.158.265-1.537.686a2.061 2.061 0 0 0-1.536-.686c-1.14 0-2.066.926-2.066 2.066v3.311a1.06 1.06 0 0 0 1.06-1.06v-2.251a1.004 1.004 0 0 1 2.013 0v2.251c0 .586.474 1.06 1.06 1.06v-3.311a1.004 1.004 0 0 1 2.012 0v2.251c0 .586.475 1.06 1.06 1.06zM16.265 12a2.728 2.728 0 1 1-5.457 0 2.728 2.728 0 0 1 5.457 0zm-1.06 0a1.669 1.669 0 1 0-3.338 0 1.669 1.669 0 0 0 3.338 0zm-4.82 0a2.728 2.728 0 1 1-5.458 0 2.728 2.728 0 0 1 5.457 0zm-1.06 0a1.669 1.669 0 1 0-3.338 0 1.669 1.669 0 0 0 3.338 0z" /></svg></div>
						<div className="v-tile" style={{ "--x": "38", "--y": "91" } as CSSProperties}><span className="lgw" style={{ "--c": "#0e0e10" } as CSSProperties}>T</span><b>Tally</b></div>
						<div className="v-tile" style={{ "--x": "14", "--y": "78" } as CSSProperties}><span className="lgw" style={{ "--c": "#217346" } as CSSProperties}>X</span><b>Excel</b></div>
					</div>
				</div>
				<div className="vs" id="s7b">
					<p className="vt-l" data-w="" id="c7c">Toute l'équipe voit <span className="acc">la même fiche.</span></p>
					<div className="v-teamfiche">
						<span className="av t1 antoine" /><span className="av t2 claire" /><span className="av t3 sarah" />
						<svg className="v-tlines" viewBox="0 0 100 100" preserveAspectRatio="none"><path pathLength="1" d="M12 30 L42 46" /><path pathLength="1" d="M88 30 L58 46" /><path pathLength="1" d="M50 96 L50 72" /></svg>
						<div className="v-fc">
							<span className="av julien" />
							<div><b>Julien Petit</b><small>Petit Rénovation · devis 2 340 €</small></div>
							<span className="v-chip ok">À jour</span>
						</div>
					</div>
				</div>
				{/* 8. Prenons Julien */}
				<div className="vs" id="s8">
					<div className="v-stack v-cap8">
						<p className="vt-l" data-w="" id="c8a">Prenons Julien, <span className="mut">un client.</span></p>
						<p className="vt-l" data-w="" id="c8b">Une demande, <span className="acc">sa fiche se crée.</span></p>
						<p className="vt-l" data-w="" id="c8c">Puis le devis <span className="acc">part.</span></p>
					</div>
					<div className="v-stage8">
						<div className="v-mail" id="mail8">
							<div className="v-wh" style={{ "--c": "#0078d4" } as CSSProperties}><i /><b>Nouveau message</b></div>
							<p><b>Julien Petit</b>Bonjour, j'aimerais des informations pour rénover ma cuisine.</p>
						</div>
						<div className="v-fiche" id="fiche8">
							<div className="v-fh">
								<span className="av julien" />
								<div><b>Julien Petit</b><small>Petit Rénovation</small></div>
								<span className="v-chip" id="tag8">Nouveau</span>
							</div>
							<div className="v-fr"><span>Source</span><b>Mail · 14 oct., 09:12</b></div>
							<div className="v-fr"><span>Demande</span><b>Rénovation cuisine</b></div>
							<div className="v-fr"><span>Devis</span><b className="v-devis" id="devis8"><i>PDF</i>D-0412 · 2 340 €</b></div>
						</div>
					</div>
				</div>
				{/* 9. Trois jours plus tard / l'assistant / vous validez */}
				<div className="vs" id="s9">
					<div className="v-stack v-cap9">
						<p className="vt-l" data-w="" id="c9a">Trois jours plus tard, <span className="mut">toujours pas de réponse.</span></p>
						<p className="vt-l" data-w="" id="c9b">L'assistant prépare <span className="acc">la relance…</span></p>
						<p className="vt-l" data-w="" id="c9c">et c'est vous qui <span className="acc">validez.</span></p>
					</div>
					<div className="v-stack v-stage9">
						<div className="v-cal" id="cal9"><span className="v-calm">OCT</span><b id="calD">15</b><span className="v-chip warn" id="cal3">+3 jours · pas de réponse</span></div>
						<div className="v-ai" id="ai9">
							<div className="v-aih"><span className="v-aib">IA</span><b>Assistant</b><small>vient de préparer</small></div>
							<p id="aiMsg" />
							<div className="v-aibtn" id="aiBtn"><span className="ok" id="aiOk">Valider</span><span className="no">Modifier</span></div>
							<div className="v-aidone" id="aiDone"><i>✓</i>Relance envoyée · validée par vous</div>
							<svg className="v-cur" id="cur9" viewBox="0 0 32 32"><path d="M5 3l21 12.5-9.2 2.1L12.6 27z" fill="#0e0e10" stroke="#fff" strokeWidth="2" strokeLinejoin="round" /></svg>
						</div>
					</div>
				</div>
				{/* 10. Au final, il signe, la facture suit, il paie */}
				<div className="vs dark" id="s10">
					<div className="v-stack v-cap10">
						<p className="vt-l" data-w="" id="c10a">Julien <span className="acc">signe,</span></p>
						<p className="vt-l" data-w="" id="c10b">la facture <span className="acc">suit,</span></p>
						<p className="vt-l" data-w="" id="c10c">et il <span className="acc">paie.</span></p>
					</div>
					<div className="v-stack v-stage10">
						<div className="v-doc" id="ct10">
							<small>Bon pour accord · Devis D-0412</small>
							<p>Bon pour accord, lu et approuvé.</p>
							<svg className="v-sig" viewBox="0 0 200 60"><path id="sig10" pathLength="1" d="M8 40 C 20 10, 30 10, 32 38 S 46 52, 54 30 S 66 14, 72 36 C 76 48, 84 44, 92 30 C 98 20, 104 22, 108 34 C 112 44, 120 40, 128 26 C 134 18, 142 22, 146 32 S 162 40, 192 22" /></svg><b>J. Petit</b>
						</div>
						<div className="v-doc inv" id="inv10">
							<small>Facture F-2026-118</small>
							<p>Rénovation · Petit Rénovation</p>
							<div className="v-invl"><span>Total</span><b>2 340,00 €</b></div>
							<span className="v-chip">Envoyée à Julien</span>
						</div>
						<div className="v-pay" id="pay10"><b id="payN">+0 €</b><span className="v-chip ok">✓ Payé</span></div>
					</div>
				</div>
				{/* 10b. Nadia, organisme de formation */}
				<div className="vs" id="s10b">
					<div className="v-stack v-cap10b">
						<p className="vt-l" data-w="" id="c10ba">Ou bien, <span className="mut">un organisme de formation.</span></p>
						<p className="vt-l" data-w="" id="c10bb">Nadia inscrit <span className="acc">trois salariés.</span></p>
					</div>
					<div className="v-stage8 v-stage10b">
						<div className="v-mail v-form" id="form10b">
							<div className="v-wh" style={{ "--c": "#e8500f" } as CSSProperties}><i /><b>Inscription en ligne</b></div>
							<p><b>Formation</b>Habilitation électrique · 14 mars</p>
							<ul className="v-part">
								<li><span className="av agnes" />Agnès Roy</li>
								<li><span className="av elodie" />Élodie Martin</li>
								<li><span className="av mehdi" />Mehdi Karim</li>
							</ul>
						</div>
						<div className="v-fiche" id="fiche10b">
							<div className="v-fh">
								<span className="av nadia" />
								<div><b>Nadia Benali</b><small>Imprimerie Benali</small></div>
								<span className="v-chips"><span className="v-chip" id="tag10b">Inscription</span><span className="v-chip ok" id="tag10b2">Session prête</span></span>
							</div>
							<div className="v-fr"><span>Convention</span><b className="ok">Envoyée ✓</b></div>
							<div className="v-fr"><span>Convocations</span><b className="ok">3 envoyées ✓</b></div>
							<div className="v-fr"><span>Émargement</span><b className="ok">Prêt · 14 mars ✓</b></div>
						</div>
					</div>
				</div>
				{/* 10c. Pierre, la panne du dimanche soir */}
				<div className="vs dark" id="s10c">
					<div className="v-stack v-cap10c">
						<p className="vt-l" data-w="" id="c10ca">Ou encore, <span className="mut">des pompes à chaleur.</span></p>
						<p className="vt-l" data-w="" id="c10cb">En panne, <span className="acc">un dimanche soir.</span></p>
						<p className="vt-l" data-w="" id="c10cc">Une réponse <span className="acc">dans la minute.</span></p>
					</div>
					<div className="v-stage10c">
						<div className="v-chat" id="chat10c">
							<div className="v-wh" style={{ "--c": "#25d366" } as CSSProperties}><i /><b>WhatsApp</b><span className="v-cht">Dimanche</span></div>
							<div className="v-bub in" id="bin10c"><b>Pierre Lefèvre</b>Bonsoir, ma pompe à chaleur est en panne, plus de chauffage.<small>21:14</small></div>
							<div className="v-bub out" id="bout10c">Bonsoir Pierre, c'est noté. Choisissez votre créneau :<span className="v-slots"><span className="v-slot" id="slotA">Lun. 8:00<b>✓ Lun. 8:00</b></span><span className="v-slot" id="slotB">Lun. 14:00</span></span><small>21:15</small></div>
						</div>
						<p className="v-stamp" id="stamp10c"><span className="v-chip ok">✓ Intervention calée · lundi 8 h</span></p>
					</div>
				</div>
				{/* 10d. Trois métiers */}
				<div className="vs" id="s10d">
					<p className="vt-l" data-w="" id="c10da">Trois métiers.</p>
					<div className="v-trio" id="trio">
						<div className="v-tc">
							<div className="v-tcard">
								<span className="av nadia" />
								<div><b>Nadia Benali</b><small>Formation</small></div>
							</div>
							<p className="vt-m" data-w="" id="tr1">Rien <span className="acc">à recopier.</span></p>
						</div>
						<div className="v-tc">
							<div className="v-tcard">
								<span className="av julien" />
								<div><b>Julien Petit</b><small>Rénovation</small></div>
							</div>
							<p className="vt-m" data-w="" id="tr2">Aucune relance <span className="acc">oubliée.</span></p>
						</div>
						<div className="v-tc">
							<div className="v-tcard">
								<span className="av bastien" />
								<div><b>Pierre Lefèvre</b><small>Pompe à chaleur</small></div>
							</div>
							<p className="vt-m" data-w="" id="tr3">Aucun client <span className="acc">perdu.</span></p>
						</div>
					</div>
				</div>
				{/* 11. Je relie les outils que vous avez déjà */}
				<div className="vs" id="s11b">
					<div className="v-stack v-cap11">
						<p className="vt-m" data-w="" id="c11b">Je relie les outils que <span className="acc">vous avez déjà,</span></p>
						<p className="vt-m" data-w="" id="c11c">sans vous en faire <span className="acc">changer.</span></p>
					</div>
					<div className="v-orbit" id="orbit">
						<svg className="v-olines" viewBox="0 0 100 100" preserveAspectRatio="none" id="olines" />
						<div className="v-odisc"><svg viewBox="0 0 80 80"><g transform="translate(13, 9) scale(0.98)"><path d="M 11 11 C 27 11 43 19 43 31" stroke="#e8500f" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M 43 31 C 43 43 27 51 11 51" stroke="#e8500f" strokeWidth="5" fill="none" strokeLinecap="round" /><circle cx="11" cy="11" r="7" fill="#e8500f" /><circle cx="11" cy="51" r="7" fill="#e8500f" /><circle cx="43" cy="31" r="10" fill="#e8500f" /></g></svg></div>
						<span className="v-ochip" style={{ "--x": "50", "--y": "8" } as CSSProperties}><i>✉</i>Mails</span>
						<span className="v-ochip" style={{ "--x": "84", "--y": "22" } as CSSProperties}><i>📅</i>Agenda</span>
						<span className="v-ochip" style={{ "--x": "92", "--y": "58" } as CSSProperties}><i className="hs"><svg viewBox="0 0 24 24"><path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" /></svg></i>CRM</span>
						<span className="v-ochip" style={{ "--x": "70", "--y": "88" } as CSSProperties}><i>📄</i>Devis</span>
						<span className="v-ochip" style={{ "--x": "30", "--y": "88" } as CSSProperties}><i className="lgw" style={{ "--c": "#1e3a32" } as CSSProperties}>P</i>Factures</span>
						<span className="v-ochip" style={{ "--x": "8", "--y": "58" } as CSSProperties}><i className="lgw" style={{ "--c": "#0e0e10" } as CSSProperties}>Q</i>Banque</span>
						<span className="v-ochip" style={{ "--x": "16", "--y": "22" } as CSSProperties}><i className="lgw" style={{ "--c": "#0e0e10" } as CSSProperties}>T</i>Formulaires</span>
					</div>
				</div>
				{/* 12. Votre espace : vos outils, les automatisations qui les relient, puis ce qui bloque */}
				<div className="vs" id="s12">
					<div className="v-stack v-cap12">
						<p className="vt-m" data-w="" id="c12a">Dans <span className="acc">votre espace,</span></p>
						<p className="vt-m" data-w="" id="c12b">tous vos outils <span className="acc">au même endroit,</span></p>
						<p className="vt-m" data-w="" id="c12c">avec les automatisations <span className="acc">qui les relient.</span></p>
						<p className="vt-m" data-w="" id="c12f">D'un coup d'œil, vous repérez <span className="acc">ce qui bloque</span></p>
						<p className="vt-m" data-w="" id="c12g">avant que le client <span className="acc">ne s'en plaigne.</span></p>
					</div>
					<div className="v-dash v-space" id="dash12">
						<div className="v-dh"><i /><i /><i /><b>Votre espace</b><span>sur mesure</span></div>
						<p className="v-sec">Vos outils</p>
						<div className="v-tools"> <span className="v-tool"><svg viewBox="0 0 24 24"><path fill="#0078D4" d="M2 5.5l9-1.6v16.2l-9-1.6zM12 6h9.2c.4 0 .8.4.8.8v10.4c0 .4-.4.8-.8.8H12z" /><ellipse cx="6.5" cy="12" rx="2.3" ry="3" fill="none" stroke="#fff" strokeWidth="1.4" /></svg><em>Outlook</em><i className="v-ok" /></span> <span className="v-tool"><span className="lgw" style={{ "--c": "#217346" } as CSSProperties}>X</span><em>Excel</em><i className="v-ok" /></span> <span className="v-tool"><svg viewBox="0 0 24 24"><path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" /></svg><em>HubSpot</em><i className="v-ok" /></span> <span className="v-tool"><span className="lgw" style={{ "--c": "#1e3a32" } as CSSProperties}>P</span><em>Pennylane</em><i className="v-ok" /></span> <span className="v-tool"><svg viewBox="0 0 24 24"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg><em>WhatsApp</em><i className="v-ok" /></span> </div>
						<p className="v-sec">Automatisations</p>
						<div className="v-auto"><span>Nouvelle demande</span><em>→</em><span>Fiche client</span><b className="v-sw" /></div>
						<div className="v-auto"><span>Devis sans réponse</span><em>→</em><span>Relance prête</span><b className="v-sw" /></div>
						<div className="v-auto"><span>Paiement reçu</span><em>→</em><span>Facture à jour</span><b className="v-sw" /></div>
						<p className="v-sec">À traiter aujourd'hui</p>
						<div className="v-dr" id="dr1"><span className="av garnier" /><b>Garnier SARL</b><span className="mut">Facture F-2026-104</span><span className="v-chip alert">En retard · 12 j</span></div>
						<div className="v-dr" id="dr2"><span className="av sophie" /><b>Sophie Laurent</b><span className="mut">Devis D-0409</span><span className="v-chip warn">Sans réponse · 6 j</span></div>
					</div>
				</div>
				<div className="vs" id="s12b">
					<div className="v-stack v-cap12b">
						<p className="vt-l" data-w="" id="c12d">Et chaque matin,</p>
						<p className="vt-l" data-w="" id="c12e">vous recevez <span className="acc">l'essentiel.</span></p>
					</div>
					<div className="v-phone" id="phone">
						<span className="v-pt">08:00</span><span className="v-pdate">lundi 21 octobre</span>
						<div className="v-pn" id="pnote">
							<div className="v-pnh"><span className="v-pi sm"><svg viewBox="0 0 80 80"><g transform="translate(13, 9) scale(0.98)"><path d="M 11 11 C 27 11 43 19 43 31" stroke="#e8500f" strokeWidth="7" fill="none" strokeLinecap="round" /><path d="M 43 31 C 43 43 27 51 11 51" stroke="#e8500f" strokeWidth="7" fill="none" strokeLinecap="round" /><circle cx="43" cy="31" r="10" fill="#e8500f" /></g></svg></span><b>Synapsis</b><small>maintenant</small></div>
							<p><b>Bonjour ! 3 priorités aujourd'hui</b>Relancer Garnier · Valider 2 relances · 1 devis à signer</p>
						</div>
					</div>
				</div>
				{/* 13. Vos outils font le lien entre eux ; vous, le lien avec vos clients */}
				<div className="vs dark" id="s13">
					<div className="v-prompt dk" id="prompt13"><span className="v-pi"><svg viewBox="0 0 80 80"><g transform="translate(13, 9) scale(0.98)"><path d="M 11 11 C 27 11 43 19 43 31" stroke="#e8500f" strokeWidth="6" fill="none" strokeLinecap="round" /><path d="M 43 31 C 43 43 27 51 11 51" stroke="#e8500f" strokeWidth="6" fill="none" strokeLinecap="round" /><circle cx="11" cy="11" r="7.5" fill="#e8500f" /><circle cx="11" cy="51" r="7.5" fill="#e8500f" /><circle cx="43" cy="31" r="10.5" fill="#e8500f" /></g></svg></span><span className="v-ptxt">Qui fait le lien entre tous vos outils ?</span></div>
					<p className="vt-s" data-w="" id="c13a">Désormais,</p>
					<p className="vt-xl" data-w="" id="c13b">vos outils font le lien entre eux.</p>
					<p className="vt-l mut" data-w="" id="c13c"><span id="c13c1">Et vous,</span> <span id="c13c2">le lien avec <span className="acc">vos clients.</span></span></p>
				</div>
				{/* 14. Frédéric */}
				<div className="vs orange" id="s14">
					<div className="v-me">
						<div className="v-ph"><img id="fPh" src="/images/frederic-mallet.webp" alt="Frédéric Mallet" /><svg viewBox="0 0 120 120"><circle id="ring14" cx="60" cy="60" r="57" pathLength="1" /></svg></div>
						<div className="v-mt">
							<p className="vt-xl" data-w="" id="c14a">Moi, c'est Frédéric.</p>
							<p className="v-ctaw" id="cta14"><span className="v-cta">Faites le diagnostic</span></p>
							<p className="vt-s" data-w="" id="c14b">En quelques minutes, vous voyez où ça coince chez vous.</p>
							<svg className="v-arr" id="arrW" viewBox="0 0 40 60"><path id="arr14" d="M20 4 V52 M6 38 L20 54 L34 38" pathLength="1" /></svg>
						</div>
					</div>
				</div>
			</div>
			<div className="v-red" id="vRed" aria-hidden="true" />
			<div className="v-grain" aria-hidden="true" />
			<div className="v-black" id="vBlack" aria-hidden="true" />
			<div className="sx-prog" aria-hidden="true"><i id="storyBar" /></div>
			<button type="button" className="sound f-voice" id="fSound" aria-pressed="false"><span className="bars" aria-hidden="true"><i /><i /><i /><i /></span><span id="fSoundL">Activer le son</span></button>
		</div>
	);
}
