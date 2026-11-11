export type Ville = { ville: string; dep: string; slug: string; auteur: string; licence: string; page: string };

// Photos libres de Wikimedia Commons (licences Creative Commons : l'auteur doit être crédité, voir les crédits sous le carrousel). Choisies le 11/11/2026.
export const VILLES: Ville[] = [
	{ ville: "Nîmes", dep: "Gard", slug: "nimes", auteur: "Krzysztof Golik", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Maison_Carree_in_Nimes_(10).jpg" },
	{ ville: "Alès", dep: "Gard", slug: "ales", auteur: "Krzysztof Golik", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Saint_John_the_Baptist_Cathedral_of_Ales_01.jpg" },
	{ ville: "Montpellier", dep: "Hérault", slug: "montpellier", auteur: "Jorge Franganillo", licence: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Montpellier-_Place_de_la_Com%C3%A9die_-_52262234358.jpg" },
	{ ville: "Béziers", dep: "Hérault", slug: "beziers", auteur: "Christian Ferrer", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Pont_Vieux_et_Cath%C3%A9drale_Saint-Nazaire_de_B%C3%A9ziers_cf02.jpg" },
	{ ville: "Avignon", dep: "Vaucluse", slug: "avignon", auteur: "Jean-Marc Rosier", licence: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Avignon,_Palais_des_Papes_by_JM_Rosier.jpg" },
	{ ville: "Arles", dep: "Bouches-du-Rhône", slug: "arles", auteur: "PierreSelim", licence: "CC BY 3.0", page: "https://commons.wikimedia.org/wiki/File:Arles_-_2017-05-24_-_Roman_Amphitheatre_-_3804.jpg" },
	{ ville: "Marseille", dep: "Bouches-du-Rhône", slug: "marseille", auteur: "Mike is Michi", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Vieux-Port_golden_hour_Notre-Dame_de_la_Garde_Marseille_2026.JPG" },
	{ ville: "Aix-en-Provence", dep: "Bouches-du-Rhône", slug: "aix-en-provence", auteur: "FrogsLegs71", licence: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Cours_Mirabeau_in_Aix_en_Provence.jpg" },
];
