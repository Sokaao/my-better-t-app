import type { NicheContent } from "@/components/site2026/niche/types";

// Page « organismes de formation » (13/11/2026).
// Requête principale : « preuves Qualiopi suivi des stagiaires » ; secondaires : « centraliser les documents
// des stagiaires Qualiopi », « suivi des stagiaires organisme de formation » (relevé du 13/11, docs/seo-log.md).
// Cas réel volontairement flou : le client n'a pas encore donné son accord pour être reconnaissable.
// Ne rien ajouter qui le rende identifiable (secteur précis, nombre de villes) avant cet accord.
export const FORMATION: NicheContent = {
	slug: "organismes-de-formation",
	niche: "formation",
	breadcrumb: "Organismes de formation",
	title: "Suivi des stagiaires et preuves Qualiopi | Synapsis",
	description:
		"Conventions envoyées automatiquement, visites de stage remplies en 2 minutes, preuves Qualiopi rangées : le suivi de vos stagiaires au même endroit.",
	eyebrow: "Organismes de formation",
	h1: "Conventions, visites de stage, preuves Qualiopi : tout au même endroit.",
	intro:
		"Un fichier Excel par site, une convention qui attend sa signature, une fiche de visite introuvable la veille de l'audit. Je relie les outils que vous utilisez déjà pour que chaque stagiaire ait un dossier complet et à jour, et que les documents partent sans que personne ait à les relancer.",

	situations: {
		h2: "Le suivi des stagiaires, aujourd'hui",
		items: [
			"Chaque site ou chaque formateur tient son propre tableau Excel, et personne ne sait lequel est à jour.",
			"Le stage commence alors que la convention n'est pas encore signée par l'entreprise d'accueil.",
			"Les fiches de visite de stage sont remplies sur papier, recopiées plus tard, ou pas du tout.",
			"À l'approche de l'audit Qualiopi, il faut retrouver les preuves de suivi, stagiaire par stagiaire.",
			"Les futurs stagiaires sont suivis dans un autre fichier, et les relances partent quand quelqu'un y pense.",
		],
	},

	tools: {
		h2: "Vos outils restent les vôtres",
		intro:
			"Je relie ce que vous utilisez déjà : Excel ou Google Sheets pour vos listes, Gmail ou Outlook pour vos échanges, votre outil de signature, votre agenda pour les visites, et votre logiciel de gestion de formation si vous en avez un.",
		links: [
			"La fiche du stagiaire se remplit une seule fois, et elle alimente la convention, les relances et le suivi.",
			"La convention est générée à partir de cette fiche, envoyée pour signature, puis rangée dans le dossier du stagiaire.",
			"La fiche de visite se remplit sur téléphone pendant la visite, et rejoint aussitôt le dossier.",
			"Chaque document manquant apparaît sur le tableau de suivi, stagiaire par stagiaire.",
		],
	},

	beforeAfter: {
		h2: "Ce qui change pour votre équipe",
		rows: [
			{ before: "Des dizaines de fichiers Excel, un par site ou par session.", after: "Un seul espace avec vos stagiaires actuels et à venir." },
			{ before: "Des conventions préparées et envoyées à la main.", after: "Des conventions qui partent automatiquement, sans action de votre équipe." },
			{ before: "Des fiches de visite incomplètes ou perdues.", after: "Une fiche de visite remplie en quelques minutes, complète et classée." },
			{ before: "Des preuves Qualiopi cherchées dans les mails avant l'audit.", after: "Des preuves rangées au fil de la formation, dossier par dossier." },
		],
	},

	caseStudy: {
		h2: "Un cas réel",
		paragraphs: [
			"Un organisme de formation certifiante, présent sur plusieurs sites, accueille plusieurs sessions de stagiaires par an, chacune avec des stages en entreprise. Le suivi tenait dans une cinquantaine de fichiers Excel, et l'équipe s'y perdait : des fiches de visite égarées, des conventions qui n'étaient pas signées à temps.",
			"J'ai construit un espace unique où l'équipe voit tous ses stagiaires, actuels et futurs, et l'état de chaque dossier. Les conventions de stage sont générées et envoyées sans action humaine, et une visite de stage se remplit en 2 minutes.",
		],
		resultsLabel: "Les premiers résultats constatés par l'équipe :",
		results: [
			"des fiches de visite complètes, sans oubli ni erreur ;",
			"des documents rangés et prêts pour l'audit Qualiopi ;",
			"environ 30 minutes gagnées par stagiaire sur les conventions.",
		],
		note: "Client anonymisé.",
	},

	faq: [
		{
			q: "Est-ce que ça aide pour l'audit Qualiopi ?",
			a: "Oui, pour les preuves. Les conventions signées, les fiches de visite et les échanges avec chaque stagiaire sont rangés dans son dossier au fil de la formation. Le jour de l'audit, vous les retrouvez au lieu de les reconstituer. La certification reste votre démarche : je ne remplace pas votre accompagnement Qualiopi.",
		},
		{
			q: "Faut-il changer de logiciel de gestion de formation ?",
			a: "Non. Je pars de ce que vous utilisez, tableurs compris. Si vous avez déjà un logiciel de gestion de formation, je le relie au reste plutôt que de le remplacer.",
		},
		{
			q: "Les conventions peuvent-elles vraiment partir sans personne ?",
			a: "Oui, une fois les informations du stagiaire et de l'entreprise d'accueil saisies. La convention est générée, envoyée pour signature, puis rangée quand elle revient signée. Le tableau de suivi vous montre celles qui attendent encore une signature.",
		},
		{
			q: "Nous avons plusieurs sites : est-ce un problème ?",
			a: "Non. Tous les sites travaillent dans le même espace, et vous voyez l'état des dossiers site par site.",
		},
		{
			q: "Combien de temps faut-il pour la mise en place ?",
			a: "Comptez environ un mois entre l'audit et un système qui tourne. Le calendrier exact est fixé avec vous pendant l'audit de 30 minutes.",
		},
	],

	cta: {
		h2: "Où se perdent vos dossiers de stagiaires ?",
		text: "Le diagnostic prend 3 minutes, sans e-mail. Ensuite, 30 minutes ensemble en visio : vous repartez avec un plan complet, que vous travailliez avec moi ou non.",
		label: "Faire mon diagnostic",
	},

	illustrations: { hero: "suivi-stagiaires", tools: "visite-mobile" },
};
