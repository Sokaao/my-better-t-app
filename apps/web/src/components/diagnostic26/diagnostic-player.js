// Diagnostic par métier (maquette validée le 05/11/2026), porté dans le site.
// Module lancé par DiagnosticClient ; `envoyer` est l'action serveur qui transmet le diagnostic au pilotage.
// La fonction renvoyée défait tout (écouteurs, observateurs, minuteurs) quand on quitte la page.
export function initDiagnostic(envoyer) {
	const ROOT = document.querySelector(".d26") || document.body;
	var SIG_AC = new AbortController(), SIG = SIG_AC.signal, dead = false, OBS = [], TIMERS = [];
	function IO(cb, o) { var x = new IntersectionObserver(cb, o); OBS.push(x); return x; }
	function later(f, ms) { var id = setTimeout(function () { if (!dead) f(); }, ms); TIMERS.push(id); return id; }
	function frame(f) { return requestAnimationFrame(function (t) { if (!dead) f(t); }); }
	function RO(cb) { var x = new ResizeObserver(cb); OBS.push(x); return x; }

  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EO = "cubic-bezier(.16,1,.3,1)", EI = "cubic-bezier(.7,0,.84,0)";
  const anim = (el, kf, o) => (RM || !el || !el.animate) ? Promise.resolve() : el.animate(kf, o).finished.catch(() => {});
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = ms => new Promise(r => later(r, RM ? 0 : ms));
  const isNarrow = () => innerWidth < 900;

  /* ---------- Données ---------- */
  const SVG = {
    outlook: '<svg viewBox="0 0 24 24"><path fill="#0078D4" d="M2 5.5l9-1.6v16.2l-9-1.6zM12 6h9.2c.4 0 .8.4.8.8v10.4c0 .4-.4.8-.8.8H12z"/><ellipse cx="6.5" cy="12" rx="2.3" ry="3" fill="none" stroke="#fff" stroke-width="1.4"/></svg>',
    hubspot: '<svg viewBox="0 0 24 24"><path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
    agenda: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="3" fill="none" stroke="#1a73e8" stroke-width="2"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="#1a73e8" stroke-width="2" stroke-linecap="round"/><rect x="7" y="13" width="4" height="3.5" rx="1" fill="#1a73e8"/></svg>',
    form: '<svg viewBox="0 0 24 24"><rect x="4" y="3.5" width="16" height="17" rx="3" fill="none" stroke="#6b6f7b" stroke-width="2"/><path d="M8 9h8M8 13h8M8 17h4" stroke="#6b6f7b" stroke-width="2" stroke-linecap="round"/></svg>',
    meet: '<svg viewBox="0 0 24 24"><rect x="2.5" y="6" width="13" height="12" rx="2.5" fill="#00832d"/><path d="M15.5 10.2l5-3.2v10l-5-3.2z" fill="#00ac47"/></svg>',
    devis: '<svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="#2b579a" stroke-width="2" stroke-linejoin="round"/><path d="M14 3v4h4M9 12h6M9 16h6" stroke="#2b579a" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  const TOOLS = [
    { id: "digiforma", n: "Digiforma", cat: "metier", g: 0, m: ["formation"], L: "D", c: "#3b5bdb" },
    { id: "dendreo", n: "Dendreo", cat: "metier", g: 0, m: ["formation"], L: "De", c: "#0e7490" },
    { id: "elearn", n: "Plateforme e-learning", short: "E-learning", ref: "la plateforme e-learning", cat: "metier", g: 0, m: ["formation"], L: "E", c: "#7a5af8" },
    { id: "calendly", n: "Calendly", cat: "agenda", g: 0, m: ["coaching"], L: "C", c: "#006bff" },
    { id: "stripe", n: "Stripe", cat: "banque", g: 0, m: ["coaching"], L: "S", c: "#635bff" },
    { id: "sign", n: "Signature électronique", short: "Signature", ref: "la signature électronique", cat: "devis", g: 0, m: ["formation", "coaching"], L: "Si", c: "#be185d" },
    { id: "quest", n: "Questionnaires en ligne", short: "Enquêtes", ref: "vos questionnaires en ligne", cat: "form", g: 0, m: ["formation", "coaching"], L: "Q", c: "#4d7c0f" },
    { id: "obat", n: "Obat", cat: "devis", g: 0, m: ["travaux"], L: "O", c: "#b45309" },
    { id: "tolteck", n: "Tolteck", cat: "devis", g: 0, m: ["travaux"], L: "T", c: "#0e7490" },
    { id: "planchantier", n: "Planning de chantier", short: "Planning", ref: "le planning de chantier", cat: "agenda", g: 0, m: ["travaux"], L: "P", c: "#4d7c0f" },
    { id: "interv", n: "Logiciel d'intervention", short: "Terrain", ref: "le logiciel d'intervention", cat: "metier", g: 0, m: ["depannage"], L: "I", c: "#b45309" },
    { id: "plantech", n: "Planning des techniciens", short: "Planning", ref: "le planning des techniciens", cat: "agenda", g: 0, m: ["depannage"], L: "P", c: "#4d7c0f" },
    { id: "standard", n: "Standard téléphonique", short: "Standard", ref: "le standard téléphonique", cat: "chat", g: 0, m: ["depannage"], L: "St", c: "#6b6f7b" },
    { id: "outlook", n: "Outlook", cat: "mail", g: 1 },
    { id: "gmail", n: "Gmail", cat: "mail", g: 1, L: "M", c: "#d93025" },
    { id: "hubspot", n: "HubSpot", cat: "crm", g: 2 },
    { id: "pipedrive", n: "Pipedrive", cat: "crm", g: 2, L: "Pd", c: "#1c7c54" },
    { id: "excel", n: "Excel", cat: "sheet", g: 2, L: "X", c: "#217346" },
    { id: "gsheets", n: "Google Sheets", cat: "sheet", g: 2, L: "S", c: "#188038" },
    { id: "notion", n: "Notion", cat: "docs", g: 2, L: "N", c: "#191919" },
    { id: "devis", n: "Devis Word ou Excel", short: "Devis Word", ref: "vos devis Word ou Excel", cat: "devis", g: 3 },
    { id: "sellsy", n: "Sellsy", cat: "devis", g: 3, L: "Sy", c: "#2f5bea" },
    { id: "pennylane", n: "Pennylane", cat: "compta", g: 3, L: "P", c: "#1e3a32" },
    { id: "qonto", n: "Qonto", cat: "banque", g: 3, L: "Q", c: "#0e0e10" },
    { id: "whatsapp", n: "WhatsApp", cat: "chat", g: 4 },
    { id: "teams", n: "Teams", cat: "chat", g: 4, L: "T", c: "#5059c9" },
    { id: "meet", n: "Google Meet", short: "Meet", cat: "chat", g: 4 },
    { id: "zoom", n: "Zoom", cat: "chat", g: 4, L: "Z", c: "#0b5cff" },
    { id: "agenda", n: "Agenda partagé", short: "Agenda", ref: "l'agenda partagé", cat: "agenda", g: 4 },
    { id: "form", n: "Formulaire du site", short: "Formulaire", ref: "le formulaire du site", cat: "form", g: 4 }
  ];
  const GROUPS = [
    { t: "Les outils de votre métier", cat: "metier", ph: "Votre logiciel métier", metier: true },
    { t: "Vos e-mails", cat: "mail", ph: "Votre autre messagerie" },
    { t: "Votre suivi client", cat: "crm", ph: "Votre autre outil de suivi client" },
    { t: "Devis, factures, banque", cat: "compta", ph: "Votre logiciel de devis, de factures ou de banque" },
    { t: "Échanges et rendez-vous", cat: "chat", ph: "Votre autre outil d'échange ou d'agenda" },
    { t: "Vos autres outils", cat: "autre", ph: "Nom de l'outil", open: true, hint: "Un logiciel métier, un outil maison, un fichier partagé… Ajoutez-les un par un." }
  ];
  const PAL = ["#6b6f7b", "#7a5af8", "#0e7490", "#b45309", "#be185d", "#4d7c0f"];
  const CAT_ORDER = ["mail", "chat", "form", "agenda", "metier", "crm", "sheet", "docs", "devis", "compta", "banque", "autre"];
  const MAXT = 12;

  const DIM = {
    suivi:   { w: 25, cats: ["metier", "crm", "sheet", "docs"] },
    msg:     { w: 20, cats: ["mail", "chat", "form", "agenda"] },
    relance: { w: 15, cats: ["devis"] },
    saisie:  { w: 20, cats: ["compta", "banque", "autre"] },
    pilot:   { w: 20, cats: [] }
  };
  const F = [1, .55, .25, 0];

  /* ---------- Parcours par métier ----------
     Chaque parcours pose une question par famille (suivi, msg, relance, saisie, pilot) : l'indice reste comparable d'un métier à l'autre.
     Options rangées de la meilleure à la pire (F). Une précision (pre) s'ouvre si la réponse est dans « when » : 2 au plus par parcours. */
  const Q1 = { id: "q1", kick: "Votre équipe", t: "Combien de personnes travaillent dans votre entreprise ?", compact: true, opts: ["Moins de 10", "10 à 19", "20 à 34", "35 à 49", "50 et plus"] };
  const Q7 = { id: "q7", kick: "Le temps passé", t: "Combien d'heures par semaine votre équipe passe-t-elle à recopier, chercher ou relancer ?", sub: "Toute l'équipe confondue. Une estimation suffit : on la vérifie ensemble pendant l'audit.", slider: true };
  const DIMS = ["suivi", "msg", "relance", "saisie", "pilot"];
  const PILOT_ORDI = ["Une minute : tout est sur un tableau de bord", "Une demi-heure à ouvrir plusieurs outils", "Demander à chacun", "On ne le sait pas vraiment"];
  const RELANCE_ORDI = ["Les relances partent toutes seules, au bon moment", "Quelqu'un tient une liste et relance chaque semaine", "Chacun relance les siens, quand il y pense", "On ne relance pas vraiment"];
  const lc = s => s.charAt(0).toLowerCase() + s.slice(1);

  const PARC = {
    gen: {
      q: {
        suivi: { kick: "Le suivi client", t: "Où vit le suivi de vos clients aujourd'hui ?", opts: ["Dans un logiciel que toute l'équipe tient à jour", "Dans un logiciel, mais rempli à moitié", "Dans des fichiers Excel ou Google Sheets", "Dans les boîtes mail et la tête de chacun"] },
        msg: { kick: "Les demandes", t: "Quand un client vous écrit, que se passe-t-il ?", opts: ["Le message arrive au bon endroit, rattaché à sa fiche", "Celui qui le reçoit le transfère à la bonne personne", "Ça dépend de qui le lit : parfois, ça se perd", "On s'en rend compte quand le client relance"],
          pre: { t: "Combien de demandes recevez-vous par semaine, à peu près ?", opts: ["Moins de 5", "5 à 20", "20 à 50", "Plus de 50"], when: [2, 3] } },
        relance: { kick: "Les relances", t: "Vos devis et propositions envoyés, qui les relance ?", opts: RELANCE_ORDI,
          pre: { t: "Combien de devis ou de propositions envoyez-vous par mois ?", opts: ["Moins de 10", "10 à 30", "30 à 100", "Plus de 100"], when: [2, 3] } },
        saisie: { kick: "La saisie", t: "Un nom, une adresse, un montant : combien de fois le saisissez-vous ?", opts: ["Une seule fois : il se retrouve partout", "Deux fois", "Trois ou quatre fois", "Je préfère ne pas compter"] },
        pilot: { kick: "Le pilotage", t: "Pour savoir ce qui coince cette semaine, il vous faut…", sub: "Devis en attente, factures impayées, clients sans réponse.", opts: PILOT_ORDI }
      },
      pr: [{ l: "Ne plus perdre de demandes clients", d: "msg" }, { l: "Relancer sans y penser", d: "relance" }, { l: "Voir où on en est en un coup d'œil", d: "pilot" }, { l: "Arrêter de recopier les mêmes informations", d: "saisie" }],
      txt: {
        suivi: {
          t: "Le suivi client est éparpillé",
          why: [null,
            "Le logiciel existe, mais il n'est rempli qu'à moitié. La vraie information est ailleurs : dans les e-mails et dans les têtes.",
            () => `Vos clients vivent dans ${nm(["sheet"], "des tableurs")}. Chaque mise à jour dépend de la personne qui y pense, et plusieurs versions finissent par circuler.`,
            "Le suivi est réparti entre les boîtes mail et la mémoire de chacun. Quand quelqu'un est absent, l'historique du client part avec lui."],
          fix: () => `Une fiche client unique, alimentée automatiquement par ${nm(["mail", "devis", "compta"], "vos e-mails et vos devis")}. Toute l'équipe regarde au même endroit.`,
          short: "Brancher votre suivi client sur une fiche unique"
        },
        msg: {
          t: "Des demandes se perdent entre les boîtes",
          why: [null,
            "Les demandes passent de main en main par transfert. Ça tient, tant que la bonne personne est là et lit ses messages.",
            () => `Selon qui lit le message, il est traité ou il attend. ${selTools(["mail", "chat", "form"]).length > 1 ? `Entre ${nm(["mail", "chat", "form"], "")}, les demandes` : "Les demandes"} arrivent par plusieurs portes, et aucune n'est surveillée en entier.`,
            "C'est le client qui vous rappelle qu'il attend. À ce moment-là, une partie de sa confiance est déjà entamée."],
          pre: (i, l) => i === 0 ? "Vous recevez moins de 5 demandes par semaine : chacune compte d'autant plus." : `Vous recevez ${lc(l)} demandes par semaine : il suffit d'en oublier une pour perdre un client.`,
          fix: () => `Chaque message entrant (${nm(["mail", "chat", "form"], "e-mail, téléphone, formulaire")}) est rattaché à la fiche du client et attribué à quelqu'un. Sans réponse sous 24 h, une alerte part.`,
          short: "Brancher vos messages sur la fiche client"
        },
        relance: {
          t: "Les devis attendent sans relance",
          why: [null,
            "Une personne tient la liste et relance chaque semaine. C'est du temps pris toutes les semaines, et tout s'arrête quand elle est absente.",
            "Chacun relance quand il y pense. Les devis les plus anciens, souvent les plus gros, sont ceux qu'on oublie.",
            "Sans relance, une partie des devis se perd simplement par oubli, côté client comme côté vous."],
          pre: (i, l) => `Vous envoyez ${lc(l)} devis ou propositions par mois : chaque oubli peut coûter une vente.`,
          fix: () => `À J+3 et J+10, la relance est prête dans ${nm(["mail"], "votre messagerie")}, au nom de la personne qui a fait le devis. Vous la validez d'un clic, et tout s'arrête dès que le client répond ou signe.`,
          short: "Relancer les devis sans y penser"
        },
        saisie: {
          t: "La même information est saisie plusieurs fois",
          why: [null,
            "Chaque information est saisie deux fois : le double du temps, et deux occasions de se tromper.",
            () => `Trois ou quatre saisies pour la même information${selTools(["compta", "banque", "sheet", "autre"]).length > 1 ? `, entre ${nm(["compta", "banque", "sheet", "autre"], "")}` : ""}. Les écarts et les erreurs deviennent inévitables.`,
            "Vous ne comptez plus les ressaisies. C'est souvent le premier poste de temps perdu, et le plus simple à supprimer."],
          fix: () => `Une information saisie une fois se retrouve partout : dans la fiche du client, dans la facture${has("pennylane") ? " sur Pennylane" : ""} et dans le suivi des paiements${has("qonto") ? " avec Qonto" : ""}.`,
          short: "Saisir chaque information une seule fois"
        },
        pilot: {
          t: "Personne n'a la vue d'ensemble",
          why: [null,
            "Il faut une demi-heure et plusieurs outils pour savoir où vous en êtes. Du coup, on le fait rarement.",
            "Pour savoir ce qui coince, il faut demander à chacun. Les problèmes remontent quand ils sont déjà urgents.",
            "Vous pilotez au ressenti. Les devis en attente et les impayés ne se voient que lorsqu'ils posent problème."],
          fix: "Un récapitulatif chaque matin : devis en attente, factures impayées, clients sans réponse. Une minute de lecture, pour vous et pour l'équipe.",
          short: "Mettre en place votre récap du matin"
        }
      }
    },

    formation: {
      lead: "pilot",
      pil: { ok: "Qualiopi : preuves prêtes", mid: "Qualiopi : à rassembler", man: "Qualiopi : preuves éparpillées" },
      q: {
        suivi: { kick: "Vos stagiaires", t: "Où vivent vos stagiaires et vos entreprises clientes ?", opts: ["Dans un logiciel de formation que toute l'équipe tient à jour", "Dans un logiciel, mais rempli à moitié", "Dans des fichiers Excel ou Google Sheets", "Dans les boîtes mail et la tête de chacun"] },
        msg: { kick: "Les inscriptions", t: "Une demande d'inscription arrive. Que se passe-t-il ?", opts: ["Elle crée le dossier du stagiaire, rattaché à la bonne session", "Quelqu'un la recopie dans le planning des sessions", "Elle attend que quelqu'un la traite, parfois plusieurs jours", "On s'en rend compte quand l'entreprise relance"],
          pre: { t: "Combien de demandes d'inscription recevez-vous par mois ?", opts: ["Moins de 10", "10 à 30", "30 à 100", "Plus de 100"], when: [2, 3] } },
        relance: { kick: "Les conventions", t: "Une convention attend sa signature. Qui relance ?", opts: ["Les relances partent toutes seules, jusqu'à la signature", "Quelqu'un suit la liste et relance chaque semaine", "Chacun relance quand il y pense", "Parfois, la session commence sans convention signée"] },
        saisie: { kick: "La saisie", t: "Pour une session, combien de fois saisissez-vous le nom d'un stagiaire ?", sub: "Convention, convocation, feuille d'émargement, attestation, facture.", opts: ["Une seule fois : il se retrouve partout", "Deux fois", "Trois ou quatre fois", "À chaque document"] },
        pilot: { kick: "Qualiopi", t: "Si un audit Qualiopi tombait demain, vos preuves seraient…", sub: "Émargements, questionnaires de satisfaction, évaluations, attestations.", opts: ["Prêtes : tout est rangé par session", "À rassembler : quelques jours de travail", "Éparpillées entre plusieurs outils et dossiers", "On préfère ne pas y penser"],
          pre: { t: "Quand a lieu votre prochain audit Qualiopi ?", opts: ["Dans moins de 3 mois", "Dans 3 à 12 mois", "Dans plus d'un an", "Nous ne sommes pas encore certifiés"], when: [1, 2, 3] } }
      },
      pr: [{ l: "Ne plus perdre d'inscriptions", d: "msg" }, { l: "Des conventions signées sans courir après", d: "relance" }, { l: "Des sessions prêtes sans paperasse", d: "saisie" }, { l: "Être prêt pour Qualiopi à tout moment", d: "pilot" }],
      txt: {
        suivi: {
          t: "Le suivi des stagiaires est éparpillé",
          why: [null,
            "Le logiciel existe, mais il n'est rempli qu'à moitié. La vraie information est ailleurs : dans les e-mails et dans les têtes.",
            () => `Vos stagiaires vivent dans ${nm(["sheet"], "des tableurs")}. Une session, un fichier : plusieurs versions finissent par circuler.`,
            "Le suivi est réparti entre les boîtes mail et la mémoire de chacun. Quand quelqu'un est absent, le dossier du stagiaire part avec lui."],
          fix: () => `Un dossier unique par stagiaire et par session, alimenté par ${nm(["mail", "form", "metier"], "vos inscriptions et vos e-mails")}. Toute l'équipe regarde au même endroit.`,
          short: "Un dossier unique par stagiaire et par session"
        },
        msg: {
          t: "Des inscriptions attendent ou se perdent",
          why: [null,
            "Chaque inscription est recopiée à la main dans le planning. Ça tient, tant que la personne qui s'en charge est là.",
            "Selon qui lit la demande, elle est traitée ou elle attend. Pendant ce temps, l'entreprise cliente attend sa convention.",
            "C'est l'entreprise qui vous rappelle qu'elle attend. Pour une inscription, c'est souvent le moment où elle regarde ailleurs."],
          pre: (i, l) => `Vous recevez ${lc(l)} demandes d'inscription par mois : chacune qui attend, c'est une session plus difficile à remplir.`,
          fix: "La demande d'inscription crée le dossier du stagiaire, prépare la convention et les convocations. Vous relisez, vous validez d'un clic, tout part.",
          short: "L'inscription qui prépare la convention et les convocations"
        },
        relance: {
          t: "Les conventions attendent leur signature",
          why: [null,
            "Une personne suit la liste et relance chaque semaine. C'est du temps pris toutes les semaines, et tout s'arrête quand elle est absente.",
            "Chacun relance quand il y pense. Les conventions non signées s'accumulent à l'approche des sessions.",
            "Des sessions commencent sans convention signée. Pour l'entreprise comme pour le financement de la formation, c'est un risque."],
          fix: () => `Dès qu'une convention attend depuis 3 jours, la relance est prête dans ${nm(["mail"], "votre messagerie")}. Vous la validez d'un clic, et tout s'arrête dès la signature.`,
          short: "Des conventions signées sans courir après"
        },
        saisie: {
          t: "Le même stagiaire est saisi à chaque document",
          why: [null,
            "Chaque stagiaire est saisi deux fois : le double du temps, et deux occasions de se tromper sur un nom ou une date.",
            "Trois ou quatre saisies par stagiaire et par session. Sur une année, ce sont des jours entiers de recopie.",
            "Un stagiaire, cinq documents, cinq saisies. C'est souvent le premier poste de temps perdu, et le plus simple à supprimer."],
          fix: "Le stagiaire est saisi une fois, à l'inscription. La convention, la convocation, la feuille d'émargement, l'attestation et la facture se remplissent seules : vous relisez avant l'envoi.",
          short: "Saisir chaque stagiaire une seule fois"
        },
        pilot: {
          t: "Les preuves Qualiopi sont à rassembler",
          why: [null,
            "Vos preuves existent, mais il faut quelques jours pour les rassembler avant chaque audit.",
            "Vos preuves sont éparpillées entre plusieurs outils et dossiers. Chaque audit devient une course.",
            "Vous préférez ne pas y penser. C'est souvent le signe que les preuves ne sont pas rangées au fil de l'eau."],
          pre: i => ["Votre prochain audit a lieu dans moins de 3 mois : c'est par là qu'il faut commencer.", "Votre prochain audit a lieu dans 3 à 12 mois : c'est le bon moment pour ranger au fil de l'eau.", "Votre prochain audit est dans plus d'un an : on a le temps de bien faire.", "Vous n'êtes pas encore certifiés : autant ranger les preuves dès le départ."][i],
          fix: "Chaque preuve (émargement, questionnaire de satisfaction, évaluation, attestation) est rangée au fil de l'eau dans le dossier de la session. Le jour de l'audit, vous ouvrez le dossier.",
          short: "Ranger vos preuves Qualiopi au fil de l'eau"
        }
      }
    },

    coaching: {
      lead: "saisie",
      q: {
        suivi: { kick: "Vos coachés", t: "Où vit le suivi de vos coachés : objectifs, séances, comptes rendus ?", opts: ["Dans un outil que toute l'équipe tient à jour", "Dans un outil, mais rempli à moitié", "Dans des documents et des fichiers séparés", "Dans les carnets et la mémoire de chaque coach"] },
        msg: { kick: "Les demandes", t: "Un prospect demande un premier rendez-vous. Que se passe-t-il ?", opts: ["Il réserve seul un créneau, et sa fiche se crée", "Quelqu'un lui répond et cale le rendez-vous à la main", "Plusieurs échanges d'e-mails avant de trouver un créneau", "Il arrive qu'il n'ait pas de réponse"],
          pre: { t: "Combien de demandes de premier rendez-vous recevez-vous par mois ?", opts: ["Moins de 5", "5 à 15", "15 à 40", "Plus de 40"], when: [2, 3] } },
        relance: { kick: "Les propositions", t: "Votre proposition d'accompagnement est envoyée. Qui la relance ?", opts: ["Les relances partent toutes seules, au bon moment", "Le coach relance, s'il a noté de le faire", "On attend que le client revienne", "On ne relance pas vraiment"] },
        saisie: { kick: "Entre les séances", t: "Après une séance, combien de temps passe le coach sur le compte rendu, la facture et le prochain rendez-vous ?", opts: ["Quelques minutes : presque tout se prépare seul", "Un quart d'heure", "Une demi-heure ou plus", "Tout se rattrape en fin de mois"],
          pre: { t: "Combien de séances par semaine, pour toute l'équipe ?", opts: ["Moins de 10", "10 à 30", "30 à 60", "Plus de 60"], when: [1, 2, 3] } },
        pilot: { kick: "Le pilotage", t: "Pour savoir où en est chaque accompagnement, il vous faut…", sub: "Séances faites et restantes, objectifs, factures en attente.", opts: ["Une minute : tout est sur un tableau de bord", "Une demi-heure à ouvrir plusieurs outils", "Demander à chaque coach", "On ne le sait pas vraiment"] }
      },
      pr: [{ l: "Ne plus laisser une demande sans réponse", d: "msg" }, { l: "Relancer les propositions sans y penser", d: "relance" }, { l: "Voir où en est chaque accompagnement", d: "pilot" }, { l: "Moins d'administratif après chaque séance", d: "saisie" }],
      txt: {
        suivi: {
          t: "Le suivi des coachés est éparpillé",
          why: [null,
            "L'outil existe, mais il n'est rempli qu'à moitié. Le vrai suivi est dans les notes de chaque coach.",
            "Les objectifs, les séances et les comptes rendus vivent dans des documents séparés. Pour voir un parcours en entier, il faut tout rouvrir.",
            "Le suivi est dans les carnets et la mémoire de chaque coach. Si un coach s'absente, l'historique part avec lui."],
          fix: () => `Une fiche par coaché : objectifs, séances, comptes rendus et factures, alimentée par ${nm(["agenda", "mail", "docs"], "votre agenda et vos e-mails")}. Toute l'équipe regarde au même endroit.`,
          short: "Une fiche unique par coaché"
        },
        msg: {
          t: "Des demandes de rendez-vous attendent",
          why: [null,
            "Quelqu'un cale chaque rendez-vous à la main. Ça tient, tant que cette personne est disponible.",
            "Plusieurs e-mails pour trouver un créneau. Pendant ce temps, le prospect a le temps d'hésiter.",
            "Certaines demandes restent sans réponse. En coaching, un prospect qui attend est souvent un prospect perdu."],
          pre: (i, l) => `Vous recevez ${lc(l)} demandes de premier rendez-vous par mois : chacune est un client possible.`,
          fix: "Le prospect choisit son créneau dans votre agenda, sa fiche se crée, et le coach reçoit le contexte avant le rendez-vous.",
          short: "Des premiers rendez-vous calés sans aller-retour"
        },
        relance: {
          t: "Les propositions attendent sans relance",
          why: [null,
            "Chaque coach relance s'il l'a noté. Les propositions des semaines chargées passent à la trappe.",
            "Vous attendez que le client revienne. Une partie ne revient pas, simplement par oubli.",
            "Sans relance, une partie des propositions se perd, alors que le premier rendez-vous s'était bien passé."],
          fix: () => `À J+3 et J+10, la relance est prête dans ${nm(["mail"], "votre messagerie")}, au nom du coach. Il la valide d'un clic, et tout s'arrête dès que le client répond.`,
          short: "Relancer les propositions sans y penser"
        },
        saisie: {
          t: "L'administratif mange le temps entre les séances",
          why: [null,
            "Un quart d'heure par séance. Sur une semaine chargée, ce sont des heures qui ne vont pas à vos coachés.",
            "Une demi-heure ou plus par séance pour le compte rendu, la facture et le prochain rendez-vous. C'est du temps de coach qui part dans l'administratif.",
            "Tout se rattrape en fin de mois. Les comptes rendus arrivent tard, les factures aussi."],
          pre: (i, l) => i === 0 ? "Même avec moins de 10 séances par semaine, ce temps s'additionne." : `Avec ${lc(l)} séances par semaine, ce temps se compte vite en journées.`,
          fix: "Après chaque séance, le compte rendu est pré-rempli, la facture prête et le prochain créneau proposé. Le coach relit et valide.",
          short: "Moins d'administratif après chaque séance"
        },
        pilot: {
          t: "Personne n'a la vue d'ensemble des accompagnements",
          why: [null,
            "Il faut une demi-heure et plusieurs outils pour savoir où en est chaque accompagnement. Du coup, on le fait rarement.",
            "Pour savoir où en sont les accompagnements, il faut demander à chaque coach. Les problèmes remontent tard.",
            "Vous pilotez au ressenti. Les séances restantes et les factures en attente ne se voient que lorsqu'elles posent problème."],
          fix: "Un récapitulatif chaque matin : séances du jour, comptes rendus à envoyer, accompagnements qui se terminent, factures en attente.",
          short: "Mettre en place votre récap du matin"
        }
      }
    },

    travaux: {
      lead: "saisie",
      q: {
        suivi: { kick: "Le suivi client", t: "Où vit l'historique de vos clients et de vos chantiers ?", opts: ["Dans un logiciel que toute l'équipe tient à jour", "Dans un logiciel, mais rempli à moitié", "Dans des fichiers Excel ou Google Sheets", "Dans les boîtes mail, les carnets et la tête de chacun"] },
        msg: { kick: "Les demandes", t: "Une demande de devis arrive. Que se passe-t-il ?", opts: ["Elle crée la fiche du client, et la visite est calée", "Quelqu'un la note et rappelle le client", "Elle attend que quelqu'un ait le temps", "On s'en rend compte quand le client relance"],
          pre: { t: "Combien de demandes de devis recevez-vous par mois ?", opts: ["Moins de 10", "10 à 30", "30 à 60", "Plus de 60"], when: [2, 3] } },
        relance: { kick: "Les devis", t: "Vos devis envoyés, qui les relance ?", opts: RELANCE_ORDI,
          pre: { t: "Combien de devis envoyez-vous par mois ?", opts: ["Moins de 10", "10 à 30", "30 à 60", "Plus de 60"], when: [2, 3] } },
        saisie: { kick: "Après la signature", t: "Un devis signé : combien de fois ressaisissez-vous le chantier ensuite ?", sub: "Commande de matériel, planning, acomptes, facture.", opts: ["Jamais : tout part du devis", "Une fois", "Deux ou trois fois", "Je préfère ne pas compter"] },
        pilot: { kick: "Le pilotage", t: "Pour savoir ce qui coince cette semaine, il vous faut…", sub: "Devis en attente, chantiers à planifier, acomptes et factures impayés.", opts: PILOT_ORDI }
      },
      pr: [{ l: "Ne plus perdre de demandes de devis", d: "msg" }, { l: "Relancer les devis sans y penser", d: "relance" }, { l: "Voir où en sont les chantiers en un coup d'œil", d: "pilot" }, { l: "Arrêter de ressaisir chaque chantier", d: "saisie" }],
      txt: {
        suivi: {
          t: "L'historique des chantiers est éparpillé",
          why: [null,
            "Le logiciel existe, mais il n'est rempli qu'à moitié. La vraie information est dans les e-mails, les carnets et les têtes.",
            () => `Vos clients et vos chantiers vivent dans ${nm(["sheet"], "des tableurs")}. Chaque mise à jour dépend de la personne qui y pense.`,
            "L'historique est réparti entre les boîtes mail, les carnets et la mémoire de chacun. Quand un client rappelle, il faut retrouver qui l'a suivi."],
          fix: () => `Une fiche par client et par chantier, alimentée par ${nm(["mail", "devis", "compta"], "vos e-mails et vos devis")}. Toute l'équipe regarde au même endroit.`,
          short: "Une fiche unique par client et par chantier"
        },
        msg: {
          t: "Des demandes de devis attendent",
          why: [null,
            "Chaque demande est notée puis rappelée à la main. Ça tient, tant que la personne qui s'en charge n'est pas sur un chantier.",
            "Les demandes attendent que quelqu'un ait le temps. Pendant ce temps, le client demande d'autres devis.",
            "C'est le client qui vous relance. À ce moment-là, il a souvent déjà un autre devis en main."],
          pre: (i, l) => `Vous recevez ${lc(l)} demandes de devis par mois : chacune qui attend peut signer ailleurs.`,
          fix: () => `Chaque demande (${nm(["mail", "chat", "form"], "e-mail, téléphone, formulaire")}) crée la fiche du client et propose un créneau de visite. Vous validez, le client reçoit la réponse.`,
          short: "Des demandes de devis traitées tout de suite"
        },
        relance: {
          t: "Les devis attendent sans relance",
          why: [null,
            "Une personne tient la liste et relance chaque semaine. C'est du temps pris toutes les semaines, et tout s'arrête quand elle est absente.",
            "Chacun relance quand il y pense. Les devis les plus anciens, souvent les plus gros, sont ceux qu'on oublie.",
            "Sans relance, une partie des devis se perd simplement par oubli, côté client comme côté vous."],
          pre: (i, l) => `Vous envoyez ${lc(l)} devis par mois : chaque oubli peut coûter un chantier.`,
          fix: () => `À J+3 et J+10, la relance est prête dans ${nm(["mail"], "votre messagerie")}, au nom de celui qui a fait le devis. Vous la validez d'un clic, et tout s'arrête dès que le client répond ou signe.`,
          short: "Relancer les devis sans y penser"
        },
        saisie: {
          t: "Chaque chantier est ressaisi après la signature",
          why: [null,
            "Le chantier est ressaisi une fois après la signature : du temps perdu, et une occasion de se tromper.",
            "Deux ou trois ressaisies par chantier, entre le planning, les commandes et la facture. Les écarts deviennent inévitables.",
            "Vous ne comptez plus les ressaisies. C'est souvent le premier poste de temps perdu, et le plus simple à supprimer."],
          fix: () => `Le devis signé prépare tout : la fiche du chantier, le planning, la facture d'acompte${has("pennylane") ? " dans Pennylane" : ""}. Le paiement reçu${has("qonto") ? " sur Qonto" : ""} met la fiche à jour.`,
          short: "Tout faire partir du devis signé"
        },
        pilot: {
          t: "Personne n'a la vue d'ensemble",
          why: [null,
            "Il faut une demi-heure et plusieurs outils pour savoir où en sont vos chantiers. Du coup, on le fait rarement.",
            "Pour savoir ce qui coince, il faut demander à chacun. Les problèmes remontent quand ils sont déjà urgents.",
            "Vous pilotez au ressenti. Les devis en attente et les acomptes impayés ne se voient que lorsqu'ils posent problème."],
          fix: "Un récapitulatif chaque matin : devis en attente, chantiers à planifier, acomptes et factures impayés. Une minute de lecture, pour vous et pour l'équipe.",
          short: "Mettre en place votre récap du matin"
        }
      }
    },

    depannage: {
      lead: "msg",
      q: {
        suivi: { kick: "Le suivi client", t: "Où vit l'historique de vos clients et de leurs équipements ?", opts: ["Dans un logiciel que toute l'équipe tient à jour", "Dans un logiciel, mais rempli à moitié", "Dans des fichiers Excel ou Google Sheets", "Dans les carnets des techniciens et la tête de chacun"] },
        msg: { kick: "Les demandes", t: "Une demande arrive le soir ou le week-end. Que se passe-t-il ?", opts: ["Le client a une réponse tout de suite, et un créneau", "Quelqu'un la traite le lendemain matin", "Elle attend le lundi", "On la découvre quand le client rappelle"],
          pre: { t: "Combien de demandes vous arrivent le soir ou le week-end, par semaine ?", opts: ["Moins de 3", "3 à 10", "10 à 25", "Plus de 25"], when: [2, 3] } },
        relance: { kick: "Les contrats d'entretien", t: "Les entretiens annuels de vos clients : qui pense à les proposer ?", opts: ["Le rappel part tout seul, au bon moment", "Quelqu'un suit une liste chaque mois", "On y pense quand le client appelle", "Personne, vraiment"] },
        saisie: { kick: "Après l'intervention", t: "Après une intervention, comment le rapport arrive-t-il jusqu'à la facture ?", opts: ["Le technicien le remplit sur place, la facture se prépare seule", "Il est ressaisi au bureau", "Sur papier, ressaisi en fin de semaine", "Il manque souvent des informations"],
          pre: { t: "Combien d'interventions par semaine, pour toute l'équipe ?", opts: ["Moins de 20", "20 à 50", "50 à 100", "Plus de 100"], when: [1, 2, 3] } },
        pilot: { kick: "Le pilotage", t: "Pour savoir ce qui coince cette semaine, il vous faut…", sub: "Demandes sans réponse, interventions à caler, factures impayées.", opts: PILOT_ORDI }
      },
      pr: [{ l: "Répondre à chaque demande, même le soir", d: "msg" }, { l: "Ne plus oublier les entretiens annuels", d: "relance" }, { l: "Voir le planning et les urgences d'un coup d'œil", d: "pilot" }, { l: "Facturer sans ressaisir les rapports", d: "saisie" }],
      txt: {
        suivi: {
          t: "L'historique des clients est éparpillé",
          why: [null,
            "Le logiciel existe, mais il n'est rempli qu'à moitié. La vraie information est dans les carnets et les têtes.",
            () => `Vos clients et leurs équipements vivent dans ${nm(["sheet"], "des tableurs")}. Sur place, le technicien n'a pas toujours la dernière version.`,
            "L'historique est dans les carnets des techniciens et la mémoire de chacun. Quand un technicien part, l'historique part avec lui."],
          fix: () => `Une fiche par client et par équipement : interventions, rapports, contrats, factures. Alimentée par ${nm(["mail", "chat", "metier"], "vos e-mails et vos rapports")}, et consultable sur place.`,
          short: "Une fiche unique par client et par équipement"
        },
        msg: {
          t: "Les demandes du soir attendent",
          why: [null,
            "Les demandes du soir sont traitées le lendemain. Ça tient, tant qu'aucun client n'a une urgence.",
            "Les demandes du week-end attendent le lundi. Pendant ce temps, le client en panne appelle quelqu'un d'autre.",
            "C'est le client qui rappelle. En panne, il n'attend pas longtemps avant d'appeler ailleurs."],
          pre: (i, l) => i === 0 ? "Même rares, les demandes du soir sont souvent les plus urgentes." : `Vous recevez ${lc(l)} demandes par semaine en dehors des horaires : autant de clients qui attendent une réponse.`,
          fix: "Le soir comme le week-end, le client reçoit tout de suite la réponse que vous avez validée une fois pour toutes, avec vos prochains créneaux libres. Le lundi matin, l'intervention est déjà sur le planning.",
          short: "Une réponse à chaque demande, même le soir"
        },
        relance: {
          t: "Les entretiens annuels s'oublient",
          why: [null,
            "Quelqu'un suit la liste chaque mois. C'est du temps pris tous les mois, et tout s'arrête quand cette personne est absente.",
            "On y pense quand le client appelle. Ceux qui n'appellent pas font leur entretien ailleurs.",
            "Personne ne pense aux entretiens. C'est du chiffre d'affaires régulier qui s'en va sans bruit."],
          fix: "Un mois avant l'échéance, le rappel est prêt pour chaque client, avec un lien pour choisir son créneau. Vous validez d'un clic.",
          short: "Proposer chaque entretien annuel au bon moment"
        },
        saisie: {
          t: "Les rapports sont ressaisis avant la facture",
          why: [null,
            "Chaque rapport est ressaisi au bureau. Le double du travail, et une facture qui part plus tard.",
            "Les rapports papier sont ressaisis en fin de semaine. Les factures partent avec une semaine de retard.",
            "Il manque souvent des informations dans les rapports. Le bureau rappelle les techniciens, et la facture attend."],
          pre: (i, l) => i === 0 ? "Même avec moins de 20 interventions par semaine, ces ressaisies s'additionnent." : `Avec ${lc(l)} interventions par semaine, chaque ressaisie se compte en heures.`,
          fix: "Le technicien remplit le rapport sur place, depuis son téléphone. La facture se prépare toute seule : vous la validez.",
          short: "Facturer depuis le rapport d'intervention"
        },
        pilot: {
          t: "Personne n'a la vue d'ensemble",
          why: [null,
            "Il faut une demi-heure et plusieurs outils pour voir le planning et les urgences. Du coup, on le fait rarement.",
            "Pour savoir ce qui coince, il faut appeler chaque technicien. Les problèmes remontent quand ils sont déjà urgents.",
            "Vous pilotez au ressenti. Les demandes en attente et les factures impayées ne se voient que lorsqu'elles posent problème."],
          fix: "Un récapitulatif chaque matin : interventions du jour, demandes sans réponse, rapports à facturer, factures impayées.",
          short: "Mettre en place votre récap du matin"
        }
      }
    }
  };

  /* Métiers. p : parcours complet. sig : question propre au métier, posée dans le parcours générique à la place de celle de sa famille. */
  const MET = {
    formation: { n: "Formation", p: "formation" },
    coaching: { n: "Coaching", p: "coaching" },
    travaux: { n: "Travaux et rénovation", p: "travaux" },
    depannage: { n: "Installation, maintenance, dépannage", p: "depannage" },
    evenementiel: { n: "Événementiel et traiteur", sig: { dim: "msg", kick: "Les demandes", t: "Une demande pour un événement arrive. En combien de temps part votre proposition ?",
      opts: ["Dans la journée, à partir d'un modèle prêt", "En deux ou trois jours", "Quand quelqu'un a le temps de la monter", "Parfois, elle ne part pas"],
      txt: { t: "Les propositions partent trop tard", why: [null,
        "Deux ou trois jours pour une proposition. Pendant ce temps, le client en a reçu d'autres.",
        "La proposition attend que quelqu'un ait le temps de la monter. Les demandes des semaines chargées passent après.",
        "Certaines demandes ne reçoivent jamais de proposition. Ce sont des événements perdus sans même avoir été chiffrés."],
        fix: "La demande crée la fiche de l'événement et une proposition pré-remplie à partir de vos modèles. Vous ajustez, vous validez, elle part.", short: "Des propositions prêtes dans la journée" } } },
    nettoyage: { n: "Nettoyage et propreté", sig: { dim: "pilot", kick: "Les absences", t: "Un agent est absent ce matin. Combien de temps pour prévenir le client et le remplacer ?",
      opts: ["Quelques minutes : le remplaçant et le client sont prévenus", "Une heure de coups de fil", "Toute la matinée", "Le client s'en aperçoit avant nous"],
      txt: { t: "Une absence désorganise toute la matinée", why: [null,
        "Une heure de coups de fil à chaque absence. Sur un mois, ce sont des journées entières.",
        "Chaque absence prend la matinée. Pendant ce temps, le reste du planning attend.",
        "Le client découvre l'absence avant vous. C'est le genre de moment qui fait perdre un contrat."],
        fix: "L'absence est signalée en un message. Les remplaçants disponibles sont proposés, et le message au client est prêt : vous validez, tout le monde est prévenu.", short: "Gérer une absence en quelques minutes" } } },
    domicile: { n: "Aide à domicile", sig: { dim: "msg", kick: "Les plannings", t: "Un planning change. Combien d'appels pour prévenir l'intervenant et la famille ?",
      opts: ["Aucun : chacun est prévenu automatiquement", "Un ou deux", "Plusieurs appels, et des SMS", "Il arrive qu'on oublie quelqu'un"],
      txt: { t: "Chaque changement de planning se fait au téléphone", why: [null,
        "Un ou deux appels par changement. Ça tient, tant que les changements restent rares.",
        "Plusieurs appels et des SMS à chaque changement. Le bureau passe ses journées au téléphone.",
        "Il arrive qu'on oublie de prévenir quelqu'un. Pour une famille, c'est une visite manquée."],
        fix: "Le planning modifié prépare les messages pour l'intervenant et pour la famille. Vous validez d'un clic, chacun est prévenu.", short: "Prévenir tout le monde d'un clic" } } },
    garage: { n: "Garages et ateliers", sig: { dim: "relance", kick: "Les rappels", t: "L'entretien ou le contrôle technique d'un client approche. Qui le prévient ?",
      opts: ["Un rappel part tout seul, au bon moment", "Quelqu'un regarde une liste chaque mois", "On y pense quand il passe à l'atelier", "Personne, vraiment"],
      txt: { t: "Les entretiens à venir s'oublient", why: [null,
        "Quelqu'un suit la liste chaque mois. C'est du temps pris tous les mois, et tout s'arrête quand cette personne est absente.",
        "On y pense quand le client passe. Ceux qui ne passent pas font leur entretien ailleurs.",
        "Personne ne prévient les clients. C'est un atelier rempli d'avance qui s'en va sans bruit."],
        fix: "Un mois avant l'échéance, le rappel est prêt pour chaque client, avec un lien pour choisir son créneau à l'atelier. Vous validez d'un clic.", short: "Rappeler chaque entretien au bon moment" } } },
    compta: { n: "Expertise comptable", sig: { dim: "relance", kick: "Les pièces", t: "Il manque des pièces à un client. Combien de relances avant de les avoir ?",
      opts: ["Les relances partent seules, jusqu'à réception", "Une ou deux, à la main", "Beaucoup, et on perd le fil", "On attend, et tout se bloque à la clôture"],
      txt: { t: "Les pièces manquantes se courent après", why: [null,
        "Une ou deux relances à la main par client. Multiplié par votre portefeuille, ça fait des journées.",
        "Beaucoup de relances, et on ne sait plus qui a relancé qui. Les clients reçoivent des demandes en double.",
        "Les pièces arrivent à la clôture, toutes en même temps. C'est là que les journées s'allongent."],
        fix: "Pour chaque client, la liste des pièces manquantes est tenue à jour. La relance est prête au bon moment : vous la validez, et elle s'arrête dès que la pièce arrive.", short: "Relancer les pièces manquantes sans y penser" } } },
    conseil: { n: "Conseil, ingénierie, architectes", sig: { dim: "saisie", kick: "Le temps passé", t: "Le temps passé sur une mission : comment arrive-t-il jusqu'à la facture ?",
      opts: ["Il est saisi une fois et prépare la facture", "Il est recopié d'un tableau à l'autre", "On le reconstitue en fin de mois", "On ne le suit pas vraiment"],
      txt: { t: "Le temps passé se reconstitue à la main", why: [null,
        "Le temps est recopié d'un tableau à l'autre. Chaque copie est une occasion d'oublier des heures.",
        "Le temps se reconstitue en fin de mois, de mémoire. Ce qui est oublié n'est jamais facturé.",
        "Le temps passé n'est pas suivi. Vous ne savez pas quelles missions sont rentables."],
        fix: "Le temps est saisi une fois, au fil de la semaine. Il alimente la fiche de la mission et prépare la facture : vous relisez, vous validez.", short: "Facturer le temps passé sans le recopier" } } },
    comm: { n: "Communication et marketing", sig: { dim: "msg", kick: "Les validations", t: "Un client doit valider une maquette. Combien d'allers-retours par e-mail ?",
      opts: ["Il valide en un clic, et c'est tracé", "Un ou deux échanges", "Beaucoup, dans plusieurs fils", "On ne sait plus quelle version est validée"],
      txt: { t: "Les validations se perdent dans les e-mails", why: [null,
        "Un ou deux échanges par validation. Ça tient, tant que les projets restent peu nombreux.",
        "Beaucoup d'allers-retours, répartis dans plusieurs fils. Retrouver le dernier avis prend du temps.",
        "Personne ne sait plus quelle version est validée. C'est là que les erreurs coûtent cher."],
        fix: "Chaque demande de validation part depuis la fiche du projet, avec la bonne version. Le client valide en un clic, et la décision est rangée.", short: "Des validations claires et tracées" } } },
    recrut: { n: "Recrutement et intérim", sig: { dim: "msg", kick: "Les candidats", t: "Un candidat postule. En combien de temps reçoit-il une réponse ?",
      opts: ["Dans la journée, même pour dire non", "Dans la semaine", "Seulement s'il est retenu", "Souvent, jamais"],
      txt: { t: "Des candidats attendent une réponse", why: [null,
        "Une semaine pour répondre. Les meilleurs candidats ont souvent déjà accepté ailleurs.",
        "Seuls les candidats retenus ont une réponse. Les autres gardent une mauvaise image de vous.",
        "Beaucoup de candidats n'ont jamais de réponse. C'est votre réputation qui en pâtit, auprès d'eux comme de vos clients."],
        fix: "Chaque candidature crée une fiche et reçoit tout de suite la réponse que vous avez validée une fois pour toutes. Les profils à rappeler remontent chaque matin.", short: "Une réponse à chaque candidat" } } },
    immo: { n: "Immobilier", sig: { dim: "msg", kick: "Les contacts", t: "Un contact arrive d'un site d'annonces un samedi. Quand est-il rappelé ?",
      opts: ["Il a une réponse tout de suite, et un rendez-vous", "Le jour même", "Le lundi", "Quand quelqu'un voit le message"],
      txt: { t: "Des contacts attendent d'être rappelés", why: [null,
        "Rappelé le jour même : bien, mais d'autres l'ont peut-être appelé avant vous.",
        "Rappelé le lundi. Entre-temps, il a visité ailleurs.",
        "Rappelé quand quelqu'un voit le message. Certains ne le sont jamais."],
        fix: "Chaque contact crée une fiche et reçoit tout de suite la réponse que vous avez validée une fois pour toutes, avec vos créneaux de visite. Vous confirmez le rendez-vous.", short: "Répondre à chaque contact, même le week-end" } } },
    negoce: { n: "Négoce et distribution", sig: { dim: "saisie", kick: "Les commandes", t: "Une commande arrive par e-mail ou par téléphone. Combien de fois est-elle ressaisie ?",
      opts: ["Jamais : elle entre une seule fois", "Une fois", "Deux ou trois fois", "Je préfère ne pas compter"],
      txt: { t: "Les commandes sont ressaisies", why: [null,
        "Chaque commande est ressaisie une fois : du temps, et une occasion de se tromper de référence.",
        "Deux ou trois saisies par commande. Les erreurs de quantité ou de prix deviennent inévitables.",
        "Vous ne comptez plus les ressaisies. C'est souvent le premier poste de temps perdu, et le plus simple à supprimer."],
        fix: "La commande reçue par e-mail est lue et préparée dans votre outil. Vous vérifiez, vous validez : la préparation et la facture suivent.", short: "Saisir chaque commande une seule fois" } } },
    ecommerce: { n: "E-commerce", sig: { dim: "msg", kick: "Le service client", t: "Un client demande où en est sa commande. Qui lui répond, et avec quelle information ?",
      opts: ["Il a la réponse seul, le suivi est à jour", "Le service client, en quelques clics", "Quelqu'un cherche dans plusieurs outils", "Il relance avant qu'on lui réponde"],
      txt: { t: "Le service client cherche les réponses", why: [null,
        "Quelques clics par demande. Ça tient, tant que les commandes restent peu nombreuses.",
        "Chaque réponse demande de chercher dans plusieurs outils. Le service client passe son temps à fouiller.",
        "Le client relance avant d'avoir une réponse. Ce sont des avis négatifs en préparation."],
        fix: "La réponse est préparée avec le suivi à jour de la commande. Le service client relit et l'envoie en un clic.", short: "Des réponses prêtes avec le bon suivi" } } },
    transport: { n: "Transport et logistique", sig: { dim: "saisie", kick: "Les bons de livraison", t: "Les bons de livraison signés : comment reviennent-ils jusqu'à la facture ?",
      opts: ["Ils arrivent seuls, la facture se prépare", "Scannés et classés à la main", "Sur papier, ressaisis en fin de mois", "Il en manque toujours"],
      txt: { t: "Les bons de livraison retardent la facture", why: [null,
        "Chaque bon est scanné et classé à la main. Du temps tous les jours, et des bons qui s'égarent.",
        "Les bons papier sont ressaisis en fin de mois. La facture part avec des semaines de retard.",
        "Il manque toujours des bons. Sans preuve de livraison, la facture attend, ou elle est contestée."],
        fix: "Le bon signé est photographié à la livraison, rangé dans la fiche de la course, et la facture se prépare. Vous la validez.", short: "Facturer dès la livraison" } } },
    autre: { n: "Autre activité" }
  };
  const MGROUPS = [
    { t: "Formation et accompagnement", ids: ["formation", "coaching"] },
    { t: "Chantiers et devis", ids: ["travaux", "evenementiel"] },
    { t: "Interventions chez le client", ids: ["depannage", "nettoyage", "domicile", "garage"] },
    { t: "Dossiers et missions", ids: ["compta", "conseil", "comm", "recrut", "immo"] },
    { t: "Commandes et livraisons", ids: ["negoce", "ecommerce", "transport"] },
    { t: "Votre activité n'y est pas ?", ids: ["autre"], last: true }
  ];
  /* Visuels des métiers : icône au trait, exemple sous le nom, parcours type dessiné sur la carte, nom du centre de la carte. */
  const MV = {
    formation: { ex: "Inscriptions, conventions, Qualiopi", hub: ["Fiche", "stagiaire"], flow: ["Inscription", "Convention", "Convocations", "Émargement", "Attestation", "Facture"],
      ic: '<path d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.6V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.4"/><path d="M21.5 9.5v5"/>' },
    coaching: { ex: "Rendez-vous, séances, suivi des coachés", hub: ["Fiche", "coaché"], flow: ["1er rendez-vous", "Proposition", "Séances", "Comptes rendus", "Facture"],
      ic: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12l6.5-6.5M15.5 5.5h3v3"/>' },
    travaux: { ex: "Devis, chantiers, acomptes", hub: ["Fiche", "chantier"], flow: ["Demande", "Visite", "Devis", "Acompte", "Chantier", "Facture"],
      ic: '<path d="M3 17.5h18"/><path d="M5 17.5v-2a7 7 0 0 1 14 0v2"/><path d="M10 8.5v4M14 8.5v4"/>' },
    evenementiel: { ex: "Demandes, propositions, acomptes", hub: ["Fiche", "événement"], flow: ["Demande", "Proposition", "Acompte", "Préparation", "Événement", "Facture"],
      ic: '<path d="M8 3.5h8l-.6 5.2a3.4 3.4 0 0 1-6.8 0z"/><path d="M12 12v7.5M8.5 19.5h7"/>' },
    depannage: { ex: "Urgences, interventions, entretiens", hub: ["Fiche", "client"], flow: ["Demande", "Créneau", "Intervention", "Rapport", "Facture", "Entretien annuel"],
      ic: '<path d="M14.6 6.4a4 4 0 0 0-5.3 5.3L3.8 17.2a1.8 1.8 0 0 0 2.6 2.6l5.5-5.5a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.2-.4-.4-2.2z"/>' },
    nettoyage: { ex: "Plannings, absences, contrats", hub: ["Fiche", "site"], flow: ["Contrat", "Planning", "Passage", "Contrôle", "Facture"],
      ic: '<path d="M10 3.5l1.6 4.4 4.4 1.6-4.4 1.6L10 15.5l-1.6-4.4L4 9.5l4.4-1.6z"/><path d="M17.5 13.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/>' },
    domicile: { ex: "Plannings, intervenants, familles", hub: ["Fiche", "famille"], flow: ["Demande", "Planning", "Visite", "Compte rendu", "Facture"],
      ic: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M12 17s-2.8-1.6-2.8-3.4a1.5 1.5 0 0 1 2.8-.8 1.5 1.5 0 0 1 2.8.8c0 1.8-2.8 3.4-2.8 3.4z"/>' },
    garage: { ex: "Atelier, devis, rappels d'entretien", hub: ["Fiche", "véhicule"], flow: ["Rendez-vous", "Diagnostic", "Devis", "Réparation", "Facture", "Rappel"],
      ic: '<path d="M5.7 16.5H3.5v-4l2.2-5h12.6l2.2 5v4h-2.2M9.3 16.5h5.4"/><path d="M3.5 12.5h17"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>' },
    compta: { ex: "Pièces manquantes, échéances", hub: ["Dossier", "client"], flow: ["Lettre de mission", "Pièces", "Saisie", "Déclarations", "Bilan"],
      ic: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8 6.5h8v3H8z"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" stroke-width="2.6"/>' },
    conseil: { ex: "Missions, temps passé, factures", hub: ["Fiche", "mission"], flow: ["Proposition", "Mission", "Temps passé", "Livrable", "Facture"],
      ic: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 12.5h18"/>' },
    comm: { ex: "Projets, validations, versions", hub: ["Fiche", "projet"], flow: ["Brief", "Devis", "Maquette", "Validation", "Livraison", "Facture"],
      ic: '<path d="M4 10v4a1 1 0 0 0 1 1h2l8 4V5L7 9H5a1 1 0 0 0-1 1z"/><path d="M18.5 9.5a3.5 3.5 0 0 1 0 5"/><path d="M7.5 15l1 4.5h2.5l-.6-3.8"/>' },
    recrut: { ex: "Candidats, missions, relevés d'heures", hub: ["Fiche", "candidat"], flow: ["Candidature", "Entretien", "Mission", "Relevé d'heures", "Facture"],
      ic: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20a6.5 6.5 0 0 1 13 0"/><path d="M19 8v6M16 11h6"/>' },
    immo: { ex: "Contacts, visites, mandats", hub: ["Fiche", "contact"], flow: ["Contact", "Visite", "Offre", "Compromis", "Signature"],
      ic: '<circle cx="8" cy="15.5" r="4.5"/><path d="M11.2 12.3 20 3.5M16.8 6.7l2.4 2.4M14.3 9.2l2 2"/>' },
    negoce: { ex: "Commandes, stocks, livraisons", hub: ["Fiche", "client"], flow: ["Commande", "Préparation", "Livraison", "Facture", "Paiement"],
      ic: '<path d="M3.5 7.8 12 3.8l8.5 4v8.4L12 20.2l-8.5-4z"/><path d="M3.5 7.8 12 12l8.5-4.2M12 12v8.2"/>' },
    ecommerce: { ex: "Commandes, suivi, retours", hub: ["Fiche", "client"], flow: ["Commande", "Expédition", "Suivi", "Retour", "Avis"],
      ic: '<path d="M3 4h2.5l2.2 10.5h10.6L20.5 7.5H6.4"/><circle cx="9.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/>' },
    transport: { ex: "Cotations, tournées, bons de livraison", hub: ["Fiche", "client"], flow: ["Cotation", "Commande", "Tournée", "Bon de livraison", "Facture"],
      ic: '<path d="M2.5 6h11v9h-11z"/><path d="M13.5 9.5h4l3 3.5v2h-7"/><circle cx="6.5" cy="17.3" r="1.8"/><circle cx="17" cy="17.3" r="1.8"/>' },
    autre: { ex: "Décrivez-la en quelques mots", hub: ["Fiche", "client"], flow: ["Demande", "Devis", "Réalisation", "Facture", "Paiement"],
      ic: '<path d="M12 6.5v11M6.5 12h11"/>' }
  };

  let Q = [], TXT = {}, PIL = null, LEAD = null;
  function setParcours() {
    const m = MET[S.metier] || MET.autre, base = PARC[m.p || "gen"], sig = m.sig;
    LEAD = sig ? sig.dim : base.lead || null;
    const qs = DIMS.map((d, k) => {
      const src = sig && sig.dim === d ? sig : base.q[d];
      return { id: "q" + (k + 2), dim: d, kick: src.kick, t: src.t, sub: src.sub, opts: src.opts, pre: src.pre || null };
    });
    const pr = base.pr.map(x => sig && x.d === sig.dim ? { l: sig.txt.short, d: x.d } : x);
    Q = [Q1, ...qs, Q7, { id: "q8", kick: "Votre priorité", t: "Si une seule chose devait changer d'ici un mois, ce serait…", opts: pr.map(x => x.l), pr: pr.map(x => x.d) }];
    TXT = {}; DIMS.forEach(d => { TXT[d] = sig && sig.dim === d ? sig.txt : base.txt[d]; });
    PIL = base.pil || null;
  }
  /* Étapes, précisions comprises (une précision ne s'affiche que si la réponse l'appelle). */
  function order() {
    const o = ["intro", "metier", "tools"];
    Q.forEach(q => { o.push(q.id); if (q.pre && q.pre.when.includes(S.ans[q.id])) o.push(q.id + "p"); });
    return o.concat("calc", "result");
  }
  function qById(id) {
    for (const q of Q) {
      if (q.id === id) return q;
      if (q.pre && q.id + "p" === id) return { id, opts: q.pre.opts, parent: q };
    }
    return null;
  }
  const WEEKS = 45;

  const S = { sel: [], ans: {}, hours: 6, lead: null, custom: 0, metier: null, metierTxt: "" };

  /* ---------- Rendu des tuiles ---------- */
  const tile = t => SVG[t.id] ? `<span class="tl svg">${SVG[t.id]}</span>` : `<span class="tl" style="--c:${t.c || "#6b6f7b"}">${esc(t.L || t.n.slice(0, 1).toUpperCase())}</span>`;
  const chipHTML = t => `<label class="chip" data-id="${t.id}"><input type="checkbox" value="${t.id}"><span>${tile(t)}${esc(t.n)}</span></label>`;

  const groups = $("#groups");
  const shownTool = t => !t.m || t.m.includes(S.metier);
  /* Les outils du métier choisi passent en tête ; le groupe disparaît pour un métier sans outils proposés. */
  function renderGroups() {
    groups.innerHTML = GROUPS.map((g, i) => {
      const list = TOOLS.filter(t => t.g === i && shownTool(t)).concat(customs.filter(t => t.g === i));
      if (g.metier && !list.length) return "";
      return `<div class="grp${g.open ? " last" : ""}${g.metier ? " grp-m" : ""}" data-g="${i}"><p>${g.t}${g.metier && MET[S.metier] ? ` · ${esc(MET[S.metier].n)}` : ""}</p>${g.hint ? `<p class="ghint">${g.hint}</p>` : ""}<div class="chips">${list.map(chipHTML).join("")}${g.open ? "" : `<button type="button" class="chip-add" aria-expanded="false" aria-controls="af${i}" aria-label="Ajouter un autre outil : ${g.t}"><span aria-hidden="true">+</span>Autre</button>`}</div><form class="add" id="af${i}" data-g="${i}"${g.open ? "" : " hidden"}><label class="sr" for="ai${i}">Ajouter un outil : ${g.t}</label><input id="ai${i}" type="text" maxlength="28" placeholder="${g.ph}" autocomplete="off"><button type="submit">Ajouter</button></form><p class="msg" id="am${i}" aria-live="polite"></p></div>`;
    }).join("");
    S.sel.forEach(id => { const b = $(`.chip[data-id="${id}"] input`, groups); if (b) b.checked = true; });
  }

  /* Grille des métiers */
  $("#metiers").innerHTML = MGROUPS.map(g => `<div class="grp${g.last ? " last" : ""}"><p>${g.t}</p><div class="mgrid">${g.ids.map(id =>
    `<label class="mcard${id === "autre" ? " other" : ""}" data-m="${id}"><input type="radio" name="metier" value="${id}"><span><i class="mi"><svg viewBox="0 0 24 24" aria-hidden="true">${MV[id].ic}</svg></i><b>${esc(MET[id].n)}</b><small>${esc(MV[id].ex)}</small></span></label>`).join("")}</div></div>`).join("");

  /* Écrans de questions */
  const BACK = `<button class="ghost" type="button" data-back><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3m4-4.5L2.5 8 7 12.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Retour</button>`;
  const optsHTML = (name, legend, opts, compact) => `<fieldset class="opts${compact ? " compact" : ""}" style="border:0;padding:0;margin-inline:0"><legend class="sr">${esc(legend)}</legend>${opts.map((o, k) =>
    `<label class="opt"><input type="radio" name="${name}" value="${k}"><span data-k="${k + 1}">${esc(o)}</span></label>`).join("")}</fieldset>`;
  const qHTML = (q, i) => {
    const body = q.slider ? `<div class="slide"><output id="hOut" for="hIn" class="tab">6 <small>h par semaine</small></output><p class="yr" id="hYr"></p>
        <label class="sr" for="hIn">Heures par semaine</label><input type="range" id="hIn" min="0" max="40" step="1" value="6">
        <div class="ends"><span>0 h</span><span>40 h et plus</span></div><span class="yours">Votre estimation</span></div>` : optsHTML(q.id, q.t, q.opts, q.compact);
    return `<div class="step" data-step="${q.id}" hidden>
      <p class="kick">Question ${i + 1} sur 8 · ${esc(q.kick)}</p>
      <h2 data-h tabindex="-1">${esc(q.t)}</h2>${q.sub ? `<p class="sub">${esc(q.sub)}</p>` : ""}
      ${body}
      <div class="foot">${BACK}${q.slider ? "" : `<span class="kbd">Touches 1 à ${q.opts.length}, puis Entrée</span>`}<button class="cta" type="button" data-next${q.slider ? "" : " disabled"}>${i === 7 ? "Voir mon résultat" : "Suivant"}</button></div>
    </div>`;
  };
  /* Précision : s'ouvre après une réponse qui coince, pour chiffrer le rapport. Même numéro que la question. */
  const preHTML = (q, i) => `<div class="step" data-step="${q.id}p" hidden>
      <p class="kick">Question ${i + 1} sur 8 · précision</p>
      <h2 data-h tabindex="-1">${esc(q.pre.t)}</h2><p class="sub">Une estimation suffit : elle sert à chiffrer votre rapport.</p>
      ${optsHTML(q.id + "p", q.pre.t, q.pre.opts, false).replace('class="opts"', 'class="opts pre"')}
      <div class="foot">${BACK}<span class="kbd">Touches 1 à ${q.pre.opts.length}, puis Entrée</span><button class="cta" type="button" data-next disabled>Suivant</button></div>
    </div>`;
  function renderQuestions() {
    $$('#pane .step[data-step^="q"]').forEach(s => s.remove());
    $("#pane .step[data-step=calc]").insertAdjacentHTML("beforebegin", Q.map((q, i) => qHTML(q, i) + (q.pre ? preHTML(q, i) : "")).join(""));
    const h = $("#hIn"); if (h) { h.value = S.hours; updHours(); }
  }

  /* ---------- Carte ---------- */
  const map = $("#map"), svgL = $("#links"), hubEl = $("#hub"), pRing = $("#pRing");
  const NS = "http://www.w3.org/2000/svg";
  const nodes = new Map();
  let W = 0, H = 0, C = { x: 0, y: 0 }, hubR = 44, tileR = 20, pilot = null;

  function geo() {
    const r = map.getBoundingClientRect();
    W = r.width; H = r.height;
    svgL.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const nar = isNarrow();
    hubR = nar ? 28 : 44; tileR = nar ? 16 : 20;
    const capH = nar ? 30 : 40, legH = (nar && !ROOT.classList.contains("is-result")) ? 6 : 34;
    C = { x: W / 2, y: capH + (H - capH - legH) / 2 - (nar ? 4 : 6) };
    hubEl.style.left = C.x + "px"; hubEl.style.top = C.y + "px";
    pRing.setAttribute("cx", C.x); pRing.setAttribute("cy", C.y); pRing.setAttribute("r", hubR + 9);
    const list = [...nodes.values()].sort((a, b) => a.ord - b.ord);
    const n = list.length;
    const lab = nar ? 15 : 22;
    const rx = Math.max(60, Math.min(W * (nar ? .4 : .36), W / 2 - (nar ? 36 : 50)));
    const ry = Math.max(40, Math.min(H * .36, (C.y - capH) - tileR - 4, (H - legH) - C.y - tileR - lab));
    // répartition à distance égale le long de l'orbite (pas à angle égal), pour ne pas tasser les côtés d'une ellipse aplatie
    const pts = []; let acc = 0;
    for (let k = 0; k <= 360; k++) {
      const a = -Math.PI / 2 + k * Math.PI / 180, q = { x: C.x + rx * Math.cos(a), y: C.y + ry * Math.sin(a) };
      if (k) acc += Math.hypot(q.x - pts[k - 1].x, q.y - pts[k - 1].y);
      q.s = acc; pts.push(q);
    }
    let j = 0;
    list.forEach((nd, i) => {
      const want = (i + (n === 2 ? .5 : 0)) * acc / n;
      while (j < 360 && pts[j].s < want) j++;
      nd.tx = pts[j].x; nd.ty = pts[j].y;
    });
  }
  function centerOf(nd) {
    const t = nd.el.querySelector(".tl").getBoundingClientRect(), m = map.getBoundingClientRect();
    return { x: t.left + t.width / 2 - m.left, y: t.top + t.height / 2 - m.top };
  }
  function pathD(p) {
    const dx = C.x - p.x, dy = C.y - p.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const x1 = p.x + ux * (tileR + 5), y1 = p.y + uy * (tileR + 5), x2 = C.x - ux * (hubR + 7), y2 = C.y - uy * (hubR + 7);
    const k = .16 * Math.hypot(x2 - x1, y2 - y1), mx = (x1 + x2) / 2 - uy * k, my = (y1 + y2) / 2 + ux * k;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  function drawLinks(live) {
    nodes.forEach(nd => {
      const p = live ? centerOf(nd) : { x: nd.x, y: nd.y };
      const d = pathD(p);
      nd.base.setAttribute("d", d); nd.ok.setAttribute("d", d);
    });
  }
  let trackUntil = 0, trackRaf = 0;
  function track(ms) {
    trackUntil = Math.max(trackUntil, performance.now() + ms);
    if (trackRaf) return;
    const loop = () => {
      drawLinks(true);
      if (performance.now() < trackUntil) trackRaf = frame(loop);
      else { trackRaf = 0; drawLinks(false); }
    };
    trackRaf = frame(loop);
  }
  function place(animate, fly) {
    const old = new Map(); nodes.forEach((nd, id) => old.set(id, { x: nd.x, y: nd.y }));
    geo();
    nodes.forEach((nd, id) => {
      nd.el.style.left = nd.tx + "px"; nd.el.style.top = nd.ty + "px";
      const isNew = old.get(id).x == null;
      const from = (fly && fly.id === id) ? fly.pt : old.get(id);
      if (animate && !RM) {
        if (from && from.x != null) {
          const dx = from.x - nd.tx, dy = from.y - nd.ty;
          if (Math.abs(dx) + Math.abs(dy) > 1) nd.el.animate([{ transform: `translate(${dx}px,${dy}px)${isNew ? " scale(1.25)" : ""}` }, { transform: "none" }], { duration: isNew ? 720 : 560, easing: EO });
        } else if (isNew) nd.el.animate([{ transform: "scale(.3)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 520, easing: EO });
      }
      nd.x = nd.tx; nd.y = nd.ty;
    });
    drawLinks(false);
    if (animate) track(760);
    $("#mapEmpty").style.opacity = nodes.size || pvId ? 0 : 1;
    updCount();
  }
  function addNode(t, fromEl) {
    if (nodes.has(t.id)) return;
    const el = document.createElement("div");
    el.className = "nd";
    el.innerHTML = `<div class="nd-in">${tile(t)}<span class="nd-l">${esc(t.short || t.n)}</span></div>`;
    map.appendChild(el);
    const g = document.createElementNS(NS, "g"); g.setAttribute("class", "lk");
    const sid = "lo-" + t.id.replace(/[^a-z0-9-]/gi, "");
    g.innerHTML = `<path class="ln-b"/><path class="ln-o" id="${sid}"/>` + (RM ? "" : `<circle class="ln-d" r="3.2"><animateMotion dur="2.4s" repeatCount="indefinite" begin="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#${sid}"/></animateMotion></circle>`);
    svgL.appendChild(g);
    const nd = { t, el, g, base: g.querySelector(".ln-b"), ok: g.querySelector(".ln-o"), x: null, y: null, ord: CAT_ORDER.indexOf(t.cat) * 100 + S.sel.indexOf(t.id), st: "unk" };
    nodes.set(t.id, nd);
    let fly = null;
    if (fromEl) {
      const r = fromEl.getBoundingClientRect(), m = map.getBoundingClientRect();
      fly = { id: t.id, pt: { x: r.left + r.width / 2 - m.left, y: r.top + r.height / 2 - m.top } };
    }
    place(true, fly);
    applyKnownState(nd);
  }
  function removeNode(id) {
    const nd = nodes.get(id); if (!nd) return;
    nodes.delete(id);
    anim(nd.el, [{ transform: "none", opacity: 1 }, { transform: "scale(.3)", opacity: 0 }], { duration: 260, easing: EI, fill: "forwards" }).then(() => nd.el.remove());
    anim(nd.g, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" }).then(() => nd.g.remove());
    place(true);
  }
  function drawIn(path, ms, delay) {
    const L = path.getTotalLength();
    if (RM || !L) return;
    path.style.strokeDasharray = L + "px";
    const a = path.animate([{ strokeDashoffset: L + "px" }, { strokeDashoffset: "0px" }], { duration: ms, delay, easing: EO, fill: "both" });
    a.finished.then(() => { path.style.strokeDasharray = ""; a.cancel(); }).catch(() => {});
  }
  function setLink(nd, st, delay = 0) {
    if (nd.st === st) return;
    nd.st = st;
    const go = () => {
      ["ok", "mid", "man"].forEach(k => { nd.el.classList.toggle(k, st === k); if (k !== "ok") nd.base.classList.toggle(k, st === k); });
      nd.g.classList.toggle("on", st === "ok");
      if (st === "ok") {
        drawIn(nd.ok, 640, 0);
        const am = nd.g.querySelector("animateMotion"); if (am && am.beginElement) try { am.beginElement(); } catch (e) {}
      } else if (st === "mid") {
        anim(nd.base, [{ strokeWidth: "4px", opacity: .3 }, { strokeWidth: "1.9px", opacity: 1 }], { duration: 520, easing: EO });
      } else if (st === "man") {
        anim(nd.base, [{ strokeWidth: "4px", opacity: .3 }, { strokeWidth: "1.8px", opacity: 1 }], { duration: 520, easing: EO });
        anim(nd.el.querySelector(".tl"), [{ transform: "translateX(-3px)" }, { transform: "translateX(3px)" }, { transform: "translateX(-2px)" }, { transform: "none" }], { duration: 300, easing: "ease-out" });
      }
      updCount();
    };
    delay && !RM ? later(go, delay) : go();
  }
  const stOf = idx => idx === 0 ? "ok" : idx === 1 ? "mid" : "man";
  const dimOfCat = cat => Object.keys(DIM).find(k => DIM[k].cats.includes(cat));
  function applyKnownState(nd) {
    const d = dimOfCat(nd.t.cat), q = Q.find(x => x.dim === d);
    if (q && S.ans[q.id] != null) setLink(nd, stOf(S.ans[q.id]), 680);
  }
  function setDim(dim, idx, stagger = 70) {
    if (dim === "pilot") return setPilot(stOf(idx));
    let i = 0;
    [...nodes.values()].sort((a, b) => a.ord - b.ord).forEach(nd => { if (DIM[dim].cats.includes(nd.t.cat)) setLink(nd, stOf(idx), (i++) * stagger); });
  }
  function setPilot(st) {
    if (pilot === st) return;
    pilot = st;
    pRing.setAttribute("class", "p-ring " + st);
    const hp = $("#hubP"); hp.className = "hub-p " + st;
    hp.textContent = (PIL || { ok: "Pilotage : en un coup d'œil", mid: "Pilotage : laborieux", man: "Pilotage : à l'aveugle" })[st];
    if (st === "ok") drawIn(pRing, 700, 0);
    anim($(".hub-in"), [{ transform: "translate(-50%,-50%) scale(1.12)" }, { transform: "translate(-50%,-50%)" }], { duration: 520, easing: EO });
  }
  function updCount() {
    const v = [...nodes.values()], c = k => v.filter(n => n.st === k).length, ok = c("ok"), mid = c("mid"), man = c("man"), pl = n => n > 1 ? "s" : "";
    $("#mapCnt").innerHTML = !v.length ? "" : `${v.length} outil${pl(v.length)}${ok ? ` · <span class="ok">${ok} relié${pl(ok)}</span>` : ""}${mid ? ` · <span class="mid">${mid} fragile${pl(mid)}</span>` : ""}${man ? ` · <span class="man">${man} à la main</span>` : ""}`;
    $("#mapSr").textContent = v.length ? "Carte : " + v.map(n => n.t.n + ({ ok: " relié", mid: " fragile", man: " à la main" }[n.st] || "")).join(", ") + "." : "";
  }
  /* ---------- Aperçu du parcours type (écran « Votre métier ») ----------
     Les étapes du métier se placent sur l'orbite des outils, la ligne orange les relie dans l'ordre, et le centre prend le nom de la fiche du métier. */
  const pvL = $("#pvL"), pvBox = $("#pv");
  let pvId = null, pvTimer = 0;
  const setHubName = id => { $("#hub b").innerHTML = (MV[id] || MV.autre).hub.map(esc).join("<br>"); };
  function pvLayout() {
    if (!pvId) return;
    const steps = $$(".pv-s", pvBox), n = steps.length, nar = isNarrow();
    const capH = nar ? 30 : 40, legH = nar ? 6 : 34;
    const rx = Math.max(70, Math.min(W * (nar ? .4 : .34), W / 2 - (nar ? 44 : 70)));
    const ry = Math.max(46, Math.min(H * .34, C.y - capH - 16, H - legH - C.y - 16));
    steps.forEach((el, i) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / n, hw = el.offsetWidth / 2 + 6;
      el.style.left = Math.min(W - hw, Math.max(hw, C.x + rx * Math.cos(a))) + "px";
      el.style.top = (C.y + ry * Math.sin(a)) + "px";
    });
    const d = `M${C.x} ${C.y - ry}A${rx} ${ry} 0 1 1 ${C.x} ${C.y + ry}A${rx} ${ry} 0 1 1 ${C.x} ${C.y - ry}`;
    $$("path", pvL).forEach(p => p.setAttribute("d", d));
  }
  function pvShow(id) {
    if (cur !== "metier") return;
    if (!id) return pvHide();
    if (id === pvId) return;
    pvId = id;
    const v = MV[id] || MV.autre, D = RM ? 0 : 900;
    map.classList.add("pv-on");
    $("#mapEmpty").style.opacity = 0;
    $("#pvT").innerHTML = `Parcours type<span class="pv-m"> · ${esc(MET[id].n)}</span>`;
    pvL.innerHTML = `<path class="pv-tr"/><path class="pv-o" id="pvO" pathLength="100" stroke-dasharray="100 100"/>` +
      (RM ? "" : `<circle class="pv-dot" r="3.6" opacity="0"><animateMotion dur="7s" repeatCount="indefinite" begin="indefinite"><mpath href="#pvO"/></animateMotion></circle>`);
    pvBox.innerHTML = v.flow.map((s, i) => `<span class="pv-s"><i>${i + 1}</i>${esc(s)}</span>`).join("");
    setHubName(id);
    pvLayout();
    anim($("#pvO"), [{ strokeDashoffset: "100px" }, { strokeDashoffset: "0px" }], { duration: D, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" });
    $$(".pv-s", pvBox).forEach((el, i, all) => anim(el, [{ transform: "translate(-50%,-50%) scale(.6)", opacity: 0 }, { transform: "translate(-50%,-50%)", opacity: 1 }],
      { duration: 380, delay: i / all.length * D, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "backwards" }));
    anim($(".hub-in"), [{ transform: "translate(-50%,-50%) scale(1.12)" }, { transform: "translate(-50%,-50%)" }], { duration: 520, easing: EO });
    const dot = $(".pv-dot", pvL);
    if (dot) later(() => { if (dot.isConnected) { dot.setAttribute("opacity", 1); try { dot.firstChild.beginElement(); } catch (e) {} } }, D);
  }
  function pvHide() {
    pvId = null;
    map.classList.remove("pv-on");
    pvL.innerHTML = ""; pvBox.innerHTML = ""; $("#pvT").textContent = "";
    $("#mapEmpty").style.opacity = nodes.size ? 0 : 1;
    setHubName(S.metier || "autre");
  }
  /* Appelé à chaque changement d'étape : l'aperçu ne vit que sur l'écran « Votre métier ». */
  function pvSync() {
    $("#mapEmpty").textContent = cur === "metier" ? "Choisissez votre métier : son parcours s'affichera ici." : "Vos outils viendront se placer ici.";
    if (cur === "metier") { if (S.metier) pvShow(S.metier); } else if (pvId) pvHide();
  }
  const mList = $("#metiers");
  mList.addEventListener("pointerover", e => {
    const c = e.target.closest(".mcard"); if (!c || isNarrow()) return;
    clearTimeout(pvTimer); pvTimer = later(() => pvShow(c.dataset.m), 70);
  }, { signal: SIG });
  mList.addEventListener("pointerleave", () => { clearTimeout(pvTimer); pvTimer = later(() => S.metier ? pvShow(S.metier) : pvHide(), 140); }, { signal: SIG });
  mList.addEventListener("focusin", e => { const c = e.target.closest(".mcard"); if (c && e.target.matches(":focus-visible")) pvShow(c.dataset.m); }, { signal: SIG });

  RO(() => { place(false); pvLayout(); }).observe(map);

  /* ---------- Navigation entre étapes ---------- */
  let cur = "intro", busy = false;
  const stepEl = id => $(`#pane .step[data-step="${id}"]`);
  /* 10 étapes : métier, outils, 8 questions. Une précision garde le numéro de sa question. */
  const MAIN = ["metier", "tools", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];
  function updProg() {
    const end = cur === "calc" || cur === "result", n = cur === "intro" ? 0 : end ? 10 : MAIN.indexOf(cur.replace(/^(q\d)p$/, "$1")) + 1;
    const pct = cur === "intro" ? 0 : end ? 1 : (n - .5) / 10;
    $("#progB").style.transform = `scaleX(${pct})`;
    $("#prog").setAttribute("aria-valuenow", n);
    $("#progL").textContent = cur === "intro" ? "Diagnostic gratuit" : cur === "metier" ? "Étape 1 sur 10 · votre métier" : cur === "tools" ? "Étape 2 sur 10 · vos outils" : end ? "Votre résultat" : `Étape ${n} sur 10`;
  }
  async function go(to, dir = 1) {
    if (busy || to === cur) return;
    busy = true;
    const a = stepEl(cur), b = stepEl(to);
    await anim(a, [{ transform: "none", opacity: 1 }, { transform: `translateX(${-44 * dir}px)`, opacity: 0 }], { duration: 210, easing: EI, fill: "forwards" });
    a.hidden = true; a.getAnimations().forEach(x => x.cancel());
    b.hidden = false; cur = to; updProg(); pvSync();
    const sTop = $("#pane").getBoundingClientRect().top + scrollY - (isNarrow() ? $(".mapcard").offsetHeight + 70 : 100);
    if (scrollY > sTop + 10) scrollTo({ top: Math.max(0, sTop), behavior: RM ? "auto" : "smooth" });
    const h = $("[data-h]", b); h && h.focus({ preventScroll: true });
    anim(b, [{ transform: `translateX(${44 * dir}px)`, opacity: .35 }, { transform: "none", opacity: 1 }], { duration: 440, easing: EO });
    $$(".opt, .chip, .mcard, .slide", b).forEach((o, i) => anim(o, [{ transform: "translateY(16px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 380, delay: 70 + Math.min(i, 10) * 32, easing: EO, fill: "backwards" }));
    busy = false;
    if (to === "calc") runCalc();
  }
  const next = () => { const o = order(), i = o.indexOf(cur); go(o[i + 1], 1); };
  const back = () => { const o = order(), i = o.indexOf(cur); if (i > 0) go(o[i - 1], -1); };
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-go],[data-back],[data-next]");
    if (!t || t.disabled) return;
    if (t.dataset.go) go(t.dataset.go, 1);
    else if (t.hasAttribute("data-back")) back();
    else next();
  }, { signal: SIG });

  /* ---------- Outils ---------- */
  const toolMsg = $("#toolMsg"), toolsNext = $("#toolsNext");
  function updTools() {
    const n = S.sel.length;
    toolsNext.disabled = n < 2;
    toolsNext.textContent = n < 2 ? "Continuer" : `Continuer avec ${n} outils`;
  }
  groups.addEventListener("change", e => {
    const inp = e.target; if (inp.type !== "checkbox") return;
    const id = inp.value, t = toolById(id);
    if (inp.checked) {
      if (S.sel.length >= MAXT) { inp.checked = false; toolMsg.textContent = `La carte affiche ${MAXT} outils au plus : gardez les principaux.`; return; }
      S.sel.push(id); toolMsg.textContent = "";
      addNode(t, inp.closest(".chip").querySelector(".tl"));
    } else {
      S.sel = S.sel.filter(x => x !== id); toolMsg.textContent = "";
      removeNode(id);
    }
    updTools();
  }, { signal: SIG });
  const customs = [];
  const toolById = id => TOOLS.find(t => t.id === id) || customs.find(t => t.id === id);
  const tick = box => { box.checked = true; box.dispatchEvent(new Event("change", { bubbles: true })); };
  function addCustom(v, gi) {
    const g = GROUPS[gi], msg = $("#am" + gi);
    const dup = [...TOOLS, ...customs].find(t => t.n.toLowerCase() === v.toLowerCase());
    if (dup) {
      const box = $(`.chip[data-id="${dup.id}"] input`);
      if (box.checked) { msg.textContent = `${dup.n} est déjà sur votre carte.`; return false; }
      if (S.sel.length >= MAXT) { msg.textContent = `La carte affiche ${MAXT} outils au plus : gardez les principaux.`; return false; }
      tick(box); msg.textContent = `${dup.n} était déjà dans la liste : je l'ai coché.`; return true;
    }
    if (S.sel.length >= MAXT) { msg.textContent = `La carte affiche ${MAXT} outils au plus : gardez les principaux.`; return false; }
    const t = { id: "c" + (++S.custom), n: v, cat: g.cat, g: gi, c: PAL[(S.custom - 1) % PAL.length] };
    customs.push(t);
    const chips = $(`.grp[data-g="${gi}"] .chips`), plus = $(".chip-add", chips);
    plus ? plus.insertAdjacentHTML("beforebegin", chipHTML(t)) : chips.insertAdjacentHTML("beforeend", chipHTML(t));
    tick($(`.chip[data-id="${t.id}"] input`));
    msg.textContent = "";
    return true;
  }
  function toggleAdd(btn, open) {
    const f = $("#" + btn.getAttribute("aria-controls"));
    open = open ?? f.hidden;
    btn.setAttribute("aria-expanded", open);
    f.hidden = !open;
    if (open) {
      anim(f, [{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }], { duration: 280, easing: EO });
      $("input", f).focus();
    } else { $("input", f).value = ""; $("#am" + f.dataset.g).textContent = ""; }
  }
  groups.addEventListener("click", e => { const b = e.target.closest(".chip-add"); if (b) toggleAdd(b); }, { signal: SIG });
  groups.addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, inp = $("input", f), v = inp.value.trim().replace(/\s+/g, " ");
    if (!v) { inp.focus(); return; }
    if (addCustom(v, +f.dataset.g)) inp.value = "";
    inp.focus();
  }, { signal: SIG });
  groups.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const f = e.target.closest("form.add"), b = f && $(`.chip-add[aria-controls="${f.id}"]`);
    if (b) { toggleAdd(b, false); b.focus(); }
  }, { signal: SIG });

  /* ---------- Questions ---------- */
  /* Pas d'avance automatique : choisir une réponse allume « Suivant », c'est le visiteur qui passe à la suite. */
  let viaPointer = 0;
  document.addEventListener("pointerdown", e => { if (e.target.closest(".opt, .mcard")) viaPointer = performance.now(); }, { signal: SIG });
  function nudge(btn) {
    if (!btn.disabled) return;
    btn.disabled = false;
    anim(btn, [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 420, easing: EO });
  }
  $("#pane").addEventListener("change", e => {
    const inp = e.target; if (inp.type !== "radio") return;
    if (inp.name === "metier") return pickMetier(inp);
    const q = qById(inp.name), idx = +inp.value;
    if (!q) return;
    S.ans[q.id] = idx;
    nudge($(`.step[data-step="${q.id}"] [data-next]`));
    if (q.dim) setDim(q.dim, idx);
    if (q.pre && !q.pre.when.includes(idx)) delete S.ans[q.id + "p"];
  }, { signal: SIG });
  $("#pane").addEventListener("input", e => { if (e.target.id === "hIn") updHours(); }, { signal: SIG });
  function updHours() {
    const hIn = $("#hIn"); if (!hIn) return;
    const h = +hIn.value; S.hours = h;
    $("#hOut").innerHTML = `${h}${h === 40 ? "+" : ""} <small>h par semaine</small>`;
    $("#hYr").textContent = h ? `Soit environ ${fmt(h * WEEKS)} h par an, sur ${WEEKS} semaines travaillées.` : "Aucune heure perdue : tant mieux. On le vérifiera ensemble.";
  }
  const fmt = n => n.toLocaleString("fr-FR");

  /* ---------- Métier ---------- */
  function resetAnswers() {
    S.ans = {};
    nodes.forEach(nd => setLink(nd, "unk"));
    pilot = null; pRing.setAttribute("class", "p-ring");
    const hp = $("#hubP"); hp.className = "hub-p"; hp.textContent = "";
  }
  /* Changer de métier reconstruit les questions ; les outils propres à l'ancien métier quittent la carte. */
  function pickMetier(inp) {
    const id = inp.value, auto = performance.now() - viaPointer < 800;
    $("#mOther").hidden = id !== "autre";
    nudge($("#metierNext"));
    pvShow(id);
    if (id !== S.metier) {
      S.metier = id;
      S.sel.filter(x => { const t = TOOLS.find(y => y.id === x); return t && t.m && !t.m.includes(id); }).forEach(x => { S.sel = S.sel.filter(y => y !== x); removeNode(x); });
      renderGroups(); updTools();
      if (Object.keys(S.ans).length) resetAnswers();
      setParcours(); renderQuestions();
    }
    if (id === "autre" && auto) later(() => $("#mOtherIn").focus(), 60);
  }
  $("#mOtherIn").addEventListener("input", e => { S.metierTxt = e.target.value.trim(); }, { signal: SIG });
  $("#mOtherIn").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); next(); } }, { signal: SIG });

  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" && (e.target.type === "text" || e.target.type === "email") || tag === "textarea") return;
    const q = qById(cur); if (!q) return;
    if (q.opts && /^[1-9]$/.test(e.key)) {
      const r = $$(`input[name="${q.id}"]`)[+e.key - 1];
      if (r) { r.checked = true; r.focus(); r.dispatchEvent(new Event("change", { bubbles: true })); e.preventDefault(); }
    } else if (e.key === "Enter" && tag !== "button" && tag !== "a") {
      if (q.slider || S.ans[q.id] != null) { e.preventDefault(); next(); }
    }
  }, { signal: SIG });

  /* ---------- Calcul et résultat ---------- */
  function score() {
    let s = 0;
    Q.forEach(q => { if (q.dim) s += Math.round(DIM[q.dim].w * F[S.ans[q.id] ?? 3]); });
    return s;
  }
  const deficit = dim => { const q = Q.find(x => x.dim === dim); return DIM[dim].w * (1 - F[S.ans[q.id] ?? 3]); };
  const selTools = cats => S.sel.map(toolById).filter(t => cats.includes(t.cat));
  const join = a => a.length <= 1 ? (a[0] || "") : a.slice(0, -1).join(", ") + " et " + a[a.length - 1];
  const nm = (cats, fb) => { const l = selTools(cats).map(t => t.ref || t.n); return l.length ? join(l) : fb; };
  const has = id => S.sel.includes(id);

  const val = x => typeof x === "function" ? x() : x;
  const qOf = d => Q.find(x => x.dim === d);
  /* Pourquoi ça coince, chiffré par la précision quand elle a été posée. */
  function whyOf(d) {
    const q = qOf(d), w = val(TXT[d].why[S.ans[q.id] ?? 3]) || "", pi = S.ans[q.id + "p"];
    return q.pre && pi != null && TXT[d].pre ? w + " " + TXT[d].pre(pi, q.pre.opts[pi]) : w;
  }
  /* La question propre au métier (LEAD) pèse un peu plus dans l'ordre des blocages, pas dans l'indice. */
  function ranked() {
    const pr = Q[7].pr[S.ans.q8 ?? 0], k = d => deficit(d) * (d === LEAD ? 1.3 : 1);
    return DIMS.filter(d => deficit(d) > 0).sort((a, b) => k(b) - k(a) || (b === pr) - (a === pr));
  }
  function band(s) {
    if (s < 35) return { c: "var(--alert)", l: "Peu relié", t: "Vos outils ne se parlent pas", p: "Aujourd'hui, c'est votre équipe qui fait le lien, à la main. C'est très courant, et c'est là qu'on gagne le plus." };
    if (s < 65) return { c: "var(--orange)", l: "Relié en partie", t: "Des ponts existent, mais tenus à la main", p: "Une partie circule bien. Le reste dépend de la mémoire et de la bonne volonté de chacun." };
    if (s < 85) return { c: "var(--ok)", l: "Bien relié", t: "Bien relié, avec quelques trous", p: "L'essentiel tient. Deux ou trois branchements bien choisis peuvent finir le travail." };
    return { c: "var(--ok)", l: "Très bien relié", t: "Vos outils se parlent déjà", p: "Franchement, vous êtes bien organisés. L'audit peut confirmer qu'il ne manque rien, ou vous éviter une dépense inutile." };
  }

  async function runCalc() {
    $("#calc1").textContent = `Lecture de vos ${S.sel.length} outils`;
    const li = $$("#calcL li");
    li.forEach(l => l.classList.remove("on"));
    for (let i = 0; i < li.length; i++) {
      await wait(i ? 480 : 260);
      li[i].classList.add("on");
      if (i === 1) {
        let k = 0;
        [...nodes.values()].sort((a, b) => a.ord - b.ord).forEach(nd => {
          later(() => {
            if (nd.st === "ok") drawIn(nd.ok, 520, 0);
            else anim(nd.base, [{ strokeWidth: "4px" }, { strokeWidth: "1.8px" }], { duration: 420, easing: EO });
          }, RM ? 0 : (k++) * 60);
        });
      }
    }
    await wait(420);
    buildResult();
    await go("result", 1);
    revealResult();
  }

  function buildResult() {
    const s = score(), b = band(s), r = ranked();
    S.score = s;
    $("#score").style.setProperty("--sc", b.c);
    $(".res-top").style.setProperty("--sc", b.c);
    $("#scB").textContent = b.l;
    $("#bandT").innerHTML = b.t.split(" ").map(w => `<span class="w">${esc(w)}</span>`).join(" ");
    $("#bandP").textContent = b.p;
    const f = $("#first");
    if (r.length) {
      const d = r[0];
      f.className = "first";
      f.innerHTML = `<span class="tg">Premier blocage</span><h3>${esc(TXT[d].t)}</h3><p>${esc(whyOf(d))}</p>`;
    } else {
      f.className = "first none";
      f.innerHTML = `<span class="tg">Aucun blocage majeur</span><h3>Vos flux principaux sont reliés</h3><p>Le rapport complet vous dit où regarder pour garder ce niveau quand l'équipe grandit.</p>`;
    }
    const fit = $("#fit"), t = S.ans.q1;
    // Cible : PME de 5 à 49 personnes (décision de Fred du 11/11/2026). « Moins de 10 » est dans la cible :
    // seul « 50 et plus » reçoit un message.
    fit.hidden = t !== 4;
    fit.textContent = "Mon offre est pensée pour les équipes de 5 à 49 personnes. Au-delà, on regarde ensemble si je suis la bonne personne pour vous.";
    buildReport(s, r);
  }
  function revealResult() {
    ROOT.classList.add("is-result");
    place(false);
    const s = S.score, scV = $("#scV"), scN = $("#scN");
    const t0 = performance.now(), D = RM ? 1 : 1200;
    scV.style.strokeDashoffset = 100; scN.textContent = 0;
    const tick = now => {
      const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3), v = Math.round(s * e);
      scN.textContent = v; scV.style.strokeDashoffset = 100 - s * e;
      if (k < 1) frame(tick);
    };
    frame(tick);
    const words = $$("#bandT .w"); let tt = D + 350, gap = 70;
    words.forEach(w => { anim(w, [{ transform: "translateY(26px)", opacity: 0 }, { transform: "translateY(26px)", opacity: 1, offset: .001 }, { transform: "none", opacity: 1 }], { duration: 300, delay: tt, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" }); tt += gap; gap = Math.max(28, gap * .84); });
    [$("#bandP"), $("#first"), $("#fit"), $(".res-act")].forEach((el, i) => anim(el, [{ transform: "translateY(18px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 520, delay: tt + 80 + i * 90, easing: EO, fill: "backwards" }));
    const rep = $("#report"); rep.hidden = false;
    anim(rep, [{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: tt + 400, fill: "backwards" });
  }

  function buildReport(s, r) {
    const blocs = r.slice(0, 3);
    const blocHTML = (d, i) => {
      const ts = d === "pilot" ? [] : selTools(DIM[d].cats.concat(d === "suivi" ? [] : d === "saisie" ? ["sheet"] : []));
      return `<article class="card bloc"><span class="n">Blocage 0${i + 1}</span><h3>${esc(TXT[d].t)}</h3><p>${esc(whyOf(d))}</p>
        ${ts.length ? `<div class="tls">${ts.map(tile).join("")}</div>` : ""}
        <div class="fix"><b>Ce qu'on peut relier</b><p>${esc(val(TXT[d].fix))}</p></div></article>`;
    };
    const pr = Q[7].pr[S.ans.q8 ?? 0];
    const firstDim = deficit(pr) > 0 ? pr : (r[0] || pr);
    const prLabel = lc(Q[7].opts[S.ans.q8 ?? 0]);
    const intro = firstDim === pr
      ? `Vous m'avez dit vouloir en priorité : <b>${esc(prLabel)}</b>. C'est par là que je commencerais.`
      : `Vous m'avez dit vouloir en priorité : <b>${esc(prLabel)}</b>, et c'est déjà bien en place chez vous. Je commencerais donc par votre plus gros blocage.`;
    const flowTools = firstDim === "pilot" ? selTools(["metier", "crm", "sheet", "devis", "compta"]).slice(0, 2) : selTools(DIM[firstDim].cats).slice(0, 2);
    const hubSvg = $(".hub-in svg").outerHTML;
    const h = S.hours, yr = h * WEEKS, wk = Math.round(yr / 35 * 10) / 10;
    $("#repBody").innerHTML = `
      <p class="sec-t">${blocs.length ? `Vos ${blocs.length > 1 ? blocs.length + " blocages" : "blocage"}` : "Vos blocages"}</p>
      ${blocs.length ? `<div class="blocs">${blocs.map(blocHTML).join("")}</div>` : `<div class="card"><h3>Aucun blocage majeur</h3><p style="color:var(--ink-2);margin-top:8px">Vos flux principaux sont déjà reliés. Pendant l'audit, on vérifie ce qui tiendra quand l'équipe grandira.</p></div>`}
      <div class="row2">
        <article class="card est"><p class="kick">Votre estimation</p><h3>Temps passé à recopier, chercher, relancer</h3>
          <p class="big tab">${fmt(yr)} <small>h par an</small></p>
          <p class="eq">Votre estimation : <b>${h} h</b> par semaine × <b>${WEEKS}</b> semaines travaillées = <b>${fmt(yr)} h</b> par an${yr ? `, soit environ <b>${fmt(wk)} semaines</b> de travail à 35 h.` : "."}</p>
          <p class="cv">C'est votre chiffre, pas le mien. On le vérifie ensemble pendant l'audit, outil par outil.</p></article>
        <article class="card first-l"><p class="kick">Ce que je relierais en premier</p><h3>${esc(TXT[firstDim].short)}</h3>
          <p>${intro}</p><p>${esc(val(TXT[firstDim].fix))}</p>
          <div class="flow">${flowTools.map(tile).join("")}${flowTools.length ? '<span class="ar"></span>' : ""}<span class="hubm">${hubSvg}</span></div>
          <p>Vos outils restent les mêmes : <b>on ajoute les liens, pas un logiciel de plus.</b></p></article>
      </div>
      <p class="sec-t">En un mois</p>
      <div class="plan">
        <article class="card"><b>Semaine 1</b><h3>Audit et plan</h3><p>30 minutes ensemble, et vous repartez avec un plan complet : vos points forts, vos points faibles, l'ordre des branchements.</p></article>
        <article class="card"><b>Semaines 2 et 3</b><h3>Les branchements</h3><p>Je relie vos outils autour de la fiche client. Votre équipe continue de travailler comme avant pendant ce temps.</p></article>
        <article class="card"><b>Semaine 4</b><h3>Prise en main</h3><p>On teste avec l'équipe, on ajuste, et vous recevez votre premier récap du matin.</p></article>
      </div>`;
  }

  $("#restart").addEventListener("click", () => location.reload(), { signal: SIG });
  $("#toReport").addEventListener("click", e => {
    e.preventDefault();
    const tgt = $("#locked").classList.contains("is-locked") ? $("#gate") : $("#report");
    tgt.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" });
    if (tgt.id === "gate") later(() => $('#gate input[name=prenom]').focus({ preventScroll: true }), RM ? 0 : 600);
  }, { signal: SIG });

  /* ---------- Formulaire e-mail ---------- */
  const gate = $("#gate");
  gate.addEventListener("submit", async e => {
    e.preventDefault();
    const f = gate.elements, err = $("#gateErr");
    [f.prenom, f.email, f.tel].forEach(x => x.removeAttribute("aria-invalid"));
    let msg = "";
    if (!f.prenom.value.trim()) { msg = "Indiquez votre prénom."; f.prenom.setAttribute("aria-invalid", "true"); f.prenom.focus(); }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim())) { msg = "Cette adresse e-mail ne semble pas valide."; f.email.setAttribute("aria-invalid", "true"); f.email.focus(); }
    else if (f.tel.value.replace(/\D/g, "").length < 8) { msg = "Indiquez un numéro de téléphone valide, pour que je puisse vous joindre."; f.tel.setAttribute("aria-invalid", "true"); f.tel.focus(); }
    else if (!f.ok.checked) { msg = "Cochez la case pour que je puisse vous envoyer le rapport."; f.ok.focus(); }
    err.textContent = msg;
    if (msg) return;
    S.lead = { prenom: f.prenom.value.trim(), email: f.email.value.trim(), ent: f.ent.value.trim(), tel: f.tel.value.trim() };
    const btn = $("#gateBtn"); btn.disabled = true; btn.innerHTML = '<span class="spin" aria-hidden="true"></span>Envoi en cours…';
    S.consentAt = new Date().toISOString();
    S.envoi = await envoyerAvecReprise();
    if (dead) return;
    unlock();
  }, { signal: SIG });
  async function unlock() {
    const lk = $("#locked"), body = $("#repBody");
    $("#repT").textContent = `${S.lead.prenom}, voici votre rapport complet`;
    $("#repP").textContent = S.envoi && S.envoi.ok
      ? `Une copie de ce rapport part aussi dans votre boîte mail (${S.lead.email}).`
      : "L'envoi par e-mail n'a pas abouti. Votre rapport est ci-dessous ; écrivez-moi à contact@mysynapsis.fr si vous voulez le recevoir.";
    await anim(gate, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(12px) scale(.98)" }], { duration: 260, easing: EI, fill: "forwards" });
    const h0 = body.getBoundingClientRect().height;
    gate.hidden = true;
    lk.classList.remove("is-locked");
    body.removeAttribute("inert");
    const h1 = body.getBoundingClientRect().height;
    anim(body, [{ height: h0 + "px", filter: "blur(7px)", opacity: .75, overflow: "hidden" }, { height: h1 + "px", filter: "blur(0)", opacity: 1, overflow: "hidden" }], { duration: 760, easing: EO });
    $$(".card", body).forEach((c, i) => anim(c, [{ transform: "translateY(14px)" }, { transform: "none" }], { duration: 520, delay: 80 + i * 60, easing: EO, fill: "backwards" }));
    $("#report").scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" });
    $("#cal").hidden = false; buildCalReal();
    $("#repT").setAttribute("tabindex", "-1"); $("#repT").focus({ preventScroll: true });
  }

  /* ---------- Réservation : icônes du bloc au-dessus du calendrier ---------- */
  const IC = {
    clock: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 6v4.3l2.8 1.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    video: '<svg viewBox="0 0 20 20"><rect x="2.5" y="5.5" width="10.5" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 9l4.5-2.5v7L13 11" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    globe: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M2.5 10h15M10 2.5c2.2 2.3 2.2 12.7 0 15M10 2.5c-2.2 2.3-2.2 12.7 0 15" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    doc: '<svg viewBox="0 0 20 20"><path d="M5 2.5h6.5L15 6v11.5H5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 10h4M8 13h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    cal: '<svg viewBox="0 0 20 20"><rect x="3" y="4.5" width="14" height="12.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 8.5h14M7 2.5v3.5M13 2.5v3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    prev: '<svg viewBox="0 0 16 16"><path d="M10 3.5L5.5 8 10 12.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg viewBox="0 0 16 16"><path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  /* ---------- Réservation : vrai calendrier Cal.com (réglages validés le 02/11) ---------- */
  const CAL_LINK = "synapsis/30min";
  function diagNotes() {
    const r = ranked().slice(0, 3).map(d => TXT[d].t);
    return [
      `Diagnostic Synapsis : indice ${S.score} sur 100 (${band(S.score).l})`,
      `Métier : ${(MET[S.metier] || MET.autre).n}${S.metier === "autre" && S.metierTxt ? ` (${S.metierTxt})` : ""}`,
      `Taille de l'équipe : ${Q[0].opts[S.ans.q1 ?? 0]}`,
      ...Q.filter(q => q.pre && S.ans[q.id + "p"] != null).map(q => `${q.pre.t} ${q.pre.opts[S.ans[q.id + "p"]]}`),
      `Outils : ${S.sel.map(id => toolById(id).n).join(", ")}`,
      `Blocages : ${r.length ? r.join(" ; ") : "aucun blocage majeur"}`,
      `Priorité : ${Q[7].opts[S.ans.q8 ?? 0]}`,
      `Temps estimé : ${S.hours} h par semaine`
    ].join("\n");
  }
  function buildCalReal() {
    const box = $("#calBox"), L = S.lead || {};
    box.classList.add("real");
    box.innerHTML = calHead() + '<div class="cal-load" id="calLoad">Chargement du calendrier…</div><div id="calInline"></div>';
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    window.Cal("init", "30min", { origin: "https://app.cal.com" });
    const cal = window.Cal.ns["30min"];
    const config = { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light", name: L.prenom || "", email: L.email || "", notes: diagNotes() };
    // L'identifiant de l'affaire rattache la réservation à l'affaire du pilotage (V-03c)
    const opp = S.envoi && S.envoi.ok ? S.envoi.opportuniteId : null;
    if (opp) config["metadata[opportuniteId]"] = opp;
    cal("inline", {
      elementOrSelector: "#calInline",
      calLink: CAL_LINK,
      config
    });
    cal("ui", { cssVarsPerTheme: { light: { "cal-brand": "#E8500F" }, dark: { "cal-brand": "#FF8A52" } }, hideEventTypeDetails: true, theme: "light", layout: "month_view" });
    let ready = false;
    const fail = () => { if (ready) return; const l = $("#calLoad"); if (l) l.innerHTML = `Le calendrier ne s'affiche pas ? Réservez directement sur <a href="https://cal.com/${CAL_LINK}" target="_blank" rel="noopener">cal.com/${CAL_LINK}</a>.`; };
    cal("on", { action: "linkReady", callback: () => { ready = true; const l = $("#calLoad"); l && l.remove(); } });
    cal("on", { action: "linkFailed", callback: fail });
    later(fail, 12000);
  }


  function calHead() {
    return `<div class="cal-head"><img src="/images/frederic-mallet-120.webp" alt="" width="48" height="48"><div><p class="nm">Frédéric Mallet</p><p class="ev">Audit de vos outils</p>
      <ul><li>${IC.clock}30 min</li><li>${IC.video}Google Meet</li><li>${IC.globe}Heure de Paris</li></ul></div></div>`;
  }

  /* ---------- Contrat v2 envoyé au pilotage (n8n V-01b), et e-mail du rapport ---------- */
  const CONSENT_TXT = "J'accepte que Synapsis utilise ces informations pour m'envoyer mon rapport et revenir vers moi au sujet de ce diagnostic. Je peux demander leur suppression à tout moment.";
  const UTM = {};
  try { const sp = new URLSearchParams(location.search); ["source", "medium", "campaign", "content", "term"].forEach(k => { const v = sp.get("utm_" + k); if (v) UTM[k] = v.slice(0, 200); }); } catch (e) { /* adresse illisible : pas d'UTM */ }
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)));
  const premier = () => { const r = ranked(), pr = Q[7].pr[S.ans.q8 ?? 0]; return deficit(pr) > 0 ? pr : (r[0] || pr); };

  function rapportEmail() {
    const L = S.lead, s = S.score, b = band(s), r = ranked().slice(0, 3), d1 = premier(), pr = Q[7].pr[S.ans.q8 ?? 0];
    const prLabel = lc(Q[7].opts[S.ans.q8 ?? 0]);
    const intro = d1 === pr ? `Vous m'avez dit vouloir en priorité : ${prLabel}. C'est par là que je commencerais.`
      : `Vous m'avez dit vouloir en priorité : ${prLabel}, et c'est déjà bien en place chez vous. Je commencerais donc par votre plus gros blocage.`;
    const h = S.hours, yr = h * WEEKS, wk = Math.round(yr / 35 * 10) / 10;
    const est = `Votre estimation : ${h} h par semaine × ${WEEKS} semaines travaillées = ${fmt(yr)} h par an${yr ? `, soit environ ${fmt(wk)} semaines de travail à 35 h` : ""}. C'est votre chiffre : on le vérifie ensemble pendant l'audit.`;
    const CAL = "https://cal.com/synapsis/30min";
    const P = 'style="margin:0 0 14px;font-size:15px;line-height:1.55;color:#33363f"';
    const H2 = 'style="margin:26px 0 10px;font-size:17px;line-height:1.3;color:#0e0e10"';
    const blocs = r.map((d, i) => `<h2 ${H2}>Blocage ${i + 1} · ${esc(TXT[d].t)}</h2><p ${P}>${esc(whyOf(d))}</p>
      <p style="margin:0 0 6px;padding:12px 14px;background:#fdeee6;border-radius:10px;font-size:14.5px;line-height:1.5;color:#33363f"><b style="color:#c23f08">Ce qu'on peut relier :</b> ${esc(val(TXT[d].fix))}</p>`).join("");
    const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Votre rapport de diagnostic Synapsis</title></head>
<body style="margin:0;padding:0;background:#f4f5fa">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5fa"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;font-family:Arial,Helvetica,sans-serif">
<tr><td style="padding:28px 28px 8px"><span style="font-size:20px;font-weight:800;color:#0e0e10">Synapsis</span><span style="color:#e8500f;font-size:20px;font-weight:800">.</span></td></tr>
<tr><td style="padding:8px 28px 28px">
<h1 style="margin:0 0 12px;font-size:23px;line-height:1.25;color:#0e0e10">${esc(L.prenom)}, voici votre rapport de diagnostic</h1>
<p ${P}>Indice de connexion : <b style="color:#0e0e10">${s} sur 100</b> · ${esc(b.l)}${S.metier ? ` · ${esc((MET[S.metier] || MET.autre).n)}` : ""}</p>
<p ${P}><b style="color:#0e0e10">${esc(b.t)}.</b> ${esc(b.p)}</p>
${r.length ? `<h2 ${H2.replace("26px", "22px")}>Vos ${r.length > 1 ? r.length + " blocages" : "blocage"}</h2>` + blocs : `<p ${P}>Aucun blocage majeur : vos flux principaux sont déjà reliés. Pendant l'audit, on vérifie ce qui tiendra quand l'équipe grandira.</p>`}
<h2 ${H2}>Temps passé à recopier, chercher, relancer : ${fmt(yr)} h par an</h2><p ${P}>${esc(est)}</p>
<h2 ${H2}>Ce que je relierais en premier : ${esc(TXT[d1].short)}</h2><p ${P}>${esc(intro)}</p><p ${P}>${esc(val(TXT[d1].fix))}</p>
<p ${P}>Vos outils restent les mêmes : on ajoute les liens, pas un logiciel de plus. Rien ne part sans votre validation.</p>
<p style="margin:24px 0 8px"><a href="${CAL}" style="display:inline-block;background:#e8500f;color:#0e0e10;padding:14px 22px;border-radius:12px;font-size:15px;font-weight:bold;text-decoration:none">Réserver mes 30 minutes d'audit</a></p>
<p style="margin:0 0 22px;font-size:13.5px;line-height:1.5;color:#6b6f7b">Gratuit, en visio, sans engagement. On reprend votre diagnostic ensemble, et vous repartez avec un plan complet.</p>
<p style="margin:0;font-size:15px;line-height:1.5;color:#33363f">Frédéric Mallet<br>Synapsis · <a href="https://www.mysynapsis.fr" style="color:#c23f08">mysynapsis.fr</a></p>
</td></tr></table>
<p style="max-width:560px;margin:14px auto 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8a8e99">Vous recevez cet e-mail parce que vous avez demandé votre rapport sur mysynapsis.fr. Pour faire supprimer vos données, répondez simplement à ce message.</p>
</td></tr></table></body></html>`;
    const t = [`${L.prenom}, voici votre rapport de diagnostic`, "",
      `Indice de connexion : ${s} sur 100 (${b.l})`, `${b.t}. ${b.p}`, "",
      ...(r.length ? r.flatMap((d, i) => [`Blocage ${i + 1} · ${TXT[d].t}`, whyOf(d), `Ce qu'on peut relier : ${val(TXT[d].fix)}`, ""]) : ["Aucun blocage majeur : vos flux principaux sont déjà reliés.", ""]),
      `Temps passé à recopier, chercher, relancer : ${fmt(yr)} h par an`, est, "",
      `Ce que je relierais en premier : ${TXT[d1].short}`, intro, val(TXT[d1].fix), "",
      "Vos outils restent les mêmes : on ajoute les liens, pas un logiciel de plus. Rien ne part sans votre validation.", "",
      `Réserver mes 30 minutes d'audit (gratuit, en visio, sans engagement) : ${CAL}`, "",
      "Frédéric Mallet", "Synapsis · https://www.mysynapsis.fr", "",
      "Vous recevez cet e-mail parce que vous avez demandé votre rapport sur mysynapsis.fr. Pour faire supprimer vos données, répondez simplement à ce message."];
    return { html, texte: t.join("\n") };
  }

  function construireDiagnostic() {
    const L = S.lead, s = S.score, b = band(s), m = MET[S.metier] || MET.autre;
    const opt = (q, k) => q && q.opts && q.opts[k] != null ? q.opts[k] : "";
    return {
      version: 2,
      idDiagnostic: S.idDiag,
      envoyeLe: new Date().toISOString(),
      prenom: L.prenom.slice(0, 100),
      email: L.email,
      entreprise: L.ent ? L.ent.slice(0, 200) : null,
      telephone: L.tel.slice(0, 30),
      consentement: { accepte: true, texte: CONSENT_TXT, le: S.consentAt },
      metier: { id: S.metier || "autre", libelle: m.n, precisionLibre: S.metier === "autre" ? (S.metierTxt || "").slice(0, 300) : "" },
      equipe: opt(Q[0], S.ans.q1 ?? 0),
      outils: S.sel.map(id => toolById(id)).filter(Boolean).map(t => t.n.slice(0, 100)).slice(0, 50),
      indice: s,
      niveau: b.l,
      reponses: Q.filter(q => q.dim).map(q => ({ famille: q.dim, question: q.t, reponse: opt(q, S.ans[q.id] ?? 3), rang: S.ans[q.id] ?? 3 })),
      precisions: Q.filter(q => q.pre && S.ans[q.id + "p"] != null).map(q => ({ question: q.pre.t, reponse: q.pre.opts[S.ans[q.id + "p"]] })),
      blocages: ranked().slice(0, 3).map(d => ({ famille: d, titre: TXT[d].t, pourquoi: whyOf(d), solution: val(TXT[d].fix) })),
      priorite: opt(Q[7], S.ans.q8 ?? 0),
      premierBranchement: TXT[premier()].short,
      heuresSemaine: S.hours,
      heuresAn: S.hours * WEEKS,
      utm: UTM,
      page: location.origin + location.pathname,
      rapport: rapportEmail()
    };
  }

  /* Un seul idDiagnostic par diagnostic : un nouvel essai renvoie le même, le pilotage ne crée rien deux fois. */
  async function envoyerAvecReprise() {
    if (!S.idDiag) S.idDiag = uuid();
    const corps = construireDiagnostic();
    for (let essai = 0; essai < 3; essai++) {
      let res;
      try { res = await envoyer(corps); } catch (e) { res = { ok: false, reessayer: true }; }
      if (dead) return { ok: false, reessayer: false };
      if (res && (res.ok || !res.reessayer)) return res;
      await new Promise(ok => later(ok, essai ? 4000 : 1500));
    }
    return { ok: false, reessayer: false };
  }

  /* ---------- Démarrage ---------- */
  setParcours(); renderGroups(); renderQuestions();
  updProg(); updTools(); place(false);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!dead) place(false); });

  return function () {
    dead = true; SIG_AC.abort();
    OBS.forEach(function (o) { o.disconnect(); }); TIMERS.forEach(clearTimeout);
    ROOT.classList.remove("is-result");
  };
}
