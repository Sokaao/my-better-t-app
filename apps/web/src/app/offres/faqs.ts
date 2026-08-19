// Les dix questions posées à chaque appel. Le fichier reste partagé entre la page,
// qui les affiche, et le layout, qui les publie en données structurées FAQPage :
// dupliquer dix réponses longues dans deux fichiers serait la garantie de les voir
// diverger.
export const faqs = [
	{
		q: "Mes clients vont-ils recevoir des messages sans que je le sache ?",
		a: "Non. Aucun message ne part sans qu'une personne de votre cabinet l'ait validé. Et pendant les quatorze premiers jours, rien ne part du tout : le système vous montre ce qu'il enverrait, vous corrigez le ton. Le passage en envoi direct, s'il a lieu un jour, demande une instruction écrite de votre part et reste révocable à tout moment.",
	},
	{
		q: "Où sont hébergées les données de mes clients ?",
		a: "Sur votre propre compte n8n Cloud, ouvert à votre nom, en région Union européenne. Je n'héberge rien chez moi. C'est ce qui rend la réversibilité réelle : si vous arrêtez de travailler avec moi, tout continue de tourner.",
	},
	{
		q: "Est-ce que mes données passent dans une IA ?",
		a: "Aucune donnée nominative de vos clients, aucune écriture comptable. L'IA sert à rédiger des gabarits de messages, pas à traiter vos dossiers. Un contrat de sous-traitance au titre de l'article 28 du RGPD encadre toute la chaîne, et vous en recevez une copie avant la signature.",
	},
	{
		q: "Est-ce compatible avec mon outil de production ?",
		a: "C'est exactement ce que le cadrage vérifie, avant tout engagement. Les outils récents comme Pennylane, MyUnisoft ou Tiime exposent des interfaces qui facilitent l'intégration. Les outils historiques comme Cegid, ACD ou Agiris sont plus fermés, et le système travaille alors en amont, sur la collecte et la relance, sans s'y connecter. Dans tous les cas, on ne touche pas à votre outil de production.",
	},
	{
		q: "Qu'est-ce que ça demande à mes collaborateurs ?",
		a: "Une semaine de relevé au démarrage, une heure de formation, et les validations de messages pendant la marche à blanc. Pour vous, deux heures par semaine pendant l'installation, pas plus. Au-delà, les heures supplémentaires sont à ma charge.",
	},
	{
		q: "Et si le système se trompe ? Qui est responsable ?",
		a: "Le système ne produit aucune écriture, aucune révision, aucun avis et aucune signature. Il relance, collecte et classe. Rien ne sort sans validation humaine de votre côté, et le contrat précise exactement ce dont je réponds.",
	},
	{
		q: "Que se passe-t-il si vous arrêtez votre activité ?",
		a: "Tout est déployé sur votre compte, à votre nom, avec la documentation et les vidéos de passation remises à la mise en production. Rien n'est propriétaire, rien ne dépend de moi pour fonctionner. N'importe quel prestataire peut reprendre derrière moi.",
	},
	{
		q: "Faut-il un compte n8n Cloud ?",
		a: "Oui, un compte à votre nom, en région Union européenne, que j'ouvre avec vous en dix minutes pendant le cadrage. Comptez quelques dizaines d'euros par mois. C'est ce qui garantit que le système vous appartient vraiment.",
	},
	{
		q: "Pourquoi commencer par la collecte des pièces ?",
		a: "Parce que c'est le seul point de friction à la fois universel, mensuel et mesurable, et parce qu'il bloque tout ce qui vient après. C'est aussi la brique la moins dépendante de votre outil de production, donc celle qui se met en place le plus vite.",
	},
	{
		q: "Et la facturation électronique dans tout ça ?",
		a: "Vos clients devront pouvoir recevoir des factures électroniques au 1er septembre 2026, et les émettre au 1er septembre 2027. Cette charge s'ajoute à celle que vous portez déjà. Je ne suis pas consultant sur cette réforme : je libère le temps qu'elle va consommer. Un cabinet dont la collecte est déjà systématisée aborde cette migration avec de la marge.",
	},
];
