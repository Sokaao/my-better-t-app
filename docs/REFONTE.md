# Refonte mysynapsis.fr

Brief et arbitrages de la refonte, arrêtés entre le 20 et le 24 octobre 2026.
Ce document fait foi : toute décision qui le contredit doit d'abord y être reportée.

## 1. Même site, nouvelle cible

- On refait mysynapsis.fr : même domaine, même repo. Pas de nouveau site.
- La cible « cabinets d'expertise comptable » est **abandonnée**. Tout le contenu actuel qui y fait référence part à la poubelle. Aucun texte existant n'est repris.
- Nouvelle cible : dirigeants de PME locales, tous secteurs **hors BTP et artisanat**, dont les process sont éclatés entre plusieurs outils.
- Rôle du site : convertir du trafic froid venu d'Instagram et de LinkedIn.
- Fred est **indépendant, pas une agence**. Le mot « agence » n'apparaît nulle part (textes, fil rouge, métadonnées).

## 2. Contenu arrêté

- **Titre** : « Vos clients sont éparpillés dans cinq outils. Je les réunis au même endroit, et le suivi se fait tout seul. »
- **Sous-titre** : « J'aide les dirigeants de PME à savoir où en est chaque client, sans fouiller dans cinq outils. »
- **Cœur du message** : d'abord centraliser et relier les données clients, ensuite les automatisations qui en découlent (accueil des nouveaux clients, relances).
- **Angle** : l'IA soulage, elle ne remplace pas l'humain.
- **Le mot « automatiser »** : on le garde, mais on le diminue, sans tourner autour.
- **Offre** : audit gratuit de 45 min, puis audit plus complet payant. Pas de grille tarifaire.
- **Prix** : aucun prix affiché sur le site, ni plancher. Le prix se donne en appel. (Le dépôt est public : aucun montant interne n'est écrit ici.)
- **Preuve** : aucun témoignage nominatif, aucun logo client (pas d'accord). Aucun cas fictif présenté comme un cas réel. La preuve passe par les fausses interfaces produit.

## 3. Style

- **Ne pas reprendre l'ancienne charte** (crème / orange).
- **Mise à jour du 24/10 (§ 11)** : le « fond très sombre » est abandonné. slayte.io est sur fond blanc ; on reprend son style visuel, pas seulement sa mécanique.
- Mécanique inspirée de la construction de slayte.io : titres en deux temps, chaque argument prouvé par une fausse interface produit remplie de données crédibles, personnages récurrents qui traversent la page, une mascotte, un seul CTA répété.
- On reprend **la mécanique, pas leurs visuels, leurs textes ni leurs personnages**. Aucun prénom repris de leur site (Karim, Inès, Yanis, Léa, Hugo, Nora, Thomas, Jade, Félix, Dana, Maya, Noah, Camille, Emma, Julie, Sami…).

### Mascotte

- Créée par Fred (SVG, style plat), en cours.
- Rôle : surveille les fiches clients, signale en une phrase ce qui coince, propose une action, **ne décide jamais**.

### Fil rouge (personnages récurrents)

- **Morel Formation** : organisme de formation fictif, 12 personnes.
- **Claire** : la dirigeante.
- **Antoine** : le commercial.
- **Sarah** : l'assistante administrative.
- **Julien Petit** : le client suivi de son premier message à sa facture.
- Chiffres récurrents, identiques d'une section à l'autre : devis de 2 340 €, relance à J+6, 14 dossiers ouverts.

## 4. CTA

- **CTA unique : « Faire mon diagnostic »**, répété en haut, au milieu et en fin de page.
- Le diagnostic se termine par la réservation de l'audit gratuit (page `/rendez-vous`).
- Conséquence : **le nouveau diagnostic conditionne la mise en production**. Il passe en priorité, juste après la page d'accueil.

## 5. Structure de la page d'accueil

| # | Titre (deux temps) | Preuve | Mascotte |
|---|---|---|---|
| 1 | Hero : titre et sous-titre arrêtés + CTA | Les cinq outils de Claire, qui se contredisent sur le dossier de Julien : mail non lu, statut périmé dans Excel, agenda, devis PDF, facture impayée que personne n'a vue | non |
| 2 | « Une fiche par client. / Tout ce qui le concerne, au même endroit. » | La fiche unique de Julien : provenance, échanges, devis, facture, prochaine action, responsable | badge : « Julien n'a pas répondu au devis depuis 6 jours. Relancer ? » |
| 3 | « Plus rien à ressaisir. / Une information entrée une fois arrive partout. » | Fil chronologique de Julien, du premier message au paiement ; chaque ligne marquée « automatique » ou « validé par Sarah ». Emplacement de la future vidéo. | non |
| 4 | « Ensuite seulement, le suivi tourne seul. / L'accueil des nouveaux clients et les relances, sans y penser. » | Liste d'accueil d'un nouveau client + relances programmées de 3 clients. Seule section où « automatiser » apparaît. | non |
| 5 | « [Mascotte] surveille vos fiches. / Vous, vous décidez. » | Récap du matin de Claire : 3 alertes d'une phrase, une action proposée, boutons « Valider » / « Ignorer » | **section principale** |
| 6 | « Vous saviez qu'il y avait un problème. / Maintenant vous savez où. » | Tableau de bord de Claire : dossiers par étape, montants en attente, relances en retard par personne | bulle sur l'anomalie |
| 7 | « Un audit pour commencer. / La suite dépend de ce qu'on y trouve. » | 3 étapes : diagnostic en ligne, audit gratuit 45 min, audit complet. Aucun prix. CTA. | non |
| 8 | « Un seul interlocuteur. / Celui qui fait le travail. » | Qui je suis : Fred, indépendant, photo, façon de travailler | non |
| 9 | « Les questions qu'on me pose » | FAQ reprenant les chiffres du fil rouge ; « Combien ça coûte ? » → « je vous le dis en appel » | non |
| 10 | Clôture : « Synapsis. / Vos clients, enfin au même endroit. » + CTA | aucune | salue |

Changements par rapport à la première proposition : l'ancienne section 2 (« Où en est Julien ? ») est fusionnée dans le hero ; l'ancienne section 8 (cas types anonymisés) est supprimée.

## 6. Technique

- Monorepo Turborepo : `apps/web` (Next.js 16, App Router, `src/app`), `apps/setter`, `packages/brand`.
- Travail sur la branche **`refonte`** ; `main` reste en production.

### On garde, sans y toucher

- L'infra et le déploiement.
- `apps/setter`.
- `/carte` (HTML statique dans `apps/web/public/carte` + vCard).
- `/admin/**` et `/onboarding/**` (outils de travail).
- `/privacy-policy-tracker-app` et `/terms-of-service-tracker`.
- `components/ui/*`, `components/admin/*`, `components/onboarding/*`.

### On garde, puis on rebranche

- `/merci-signature` : garder `SiteNavV2`, `SiteFooter` et `styles/site.module.css` jusqu'à ce que le nouvel en-tête et le nouveau pied de page existent, puis rebrancher la page dessus et supprimer l'ancien.

### On refait de zéro

- Pages, layout, en-tête, pied de page, composants de sections.
- `/rendez-vous` devient la page de réservation de l'audit gratuit.
- `/mentions-legales` et `/politique-confidentialite` : à revoir sur le fond.

### On supprime

- `/methode`, `/offres`, `/deroulement` → **redirections 301 vers `/`**.
- `/archive-accueil`, `/archive-accueil-v2`.

### packages/brand

- `apps/web` n'importe pas `@synapsis/brand` ; seul `apps/setter` l'utilise (`setter/src/index.css`).
- On garde le package. On ajoute un **nouveau fichier `synapsis-2026.css`** avec son propre export ; l'ancien `synapsis.css` reste en place pour `apps/setter`.

## 7. Diagnostic

### État actuel (constaté le 24/10/2026)

- Le calcul vit dans le composant d'interface : `apps/web/src/components/diagnostic/diagnostic-form.tsx` (constantes l. 11-15, calcul l. 139-157). Il n'est pas séparé de l'UI.
- **Défaut** : les heures des tâches cochées (`TASKS[].hours`) n'entrent jamais dans le calcul ; elles servent seulement à choisir « la première automatisation ». Les six tâches sont cochées par défaut.
- Tout est pensé pour les cabinets comptables : taux horaire facturé, conversion en heures facturables (× 0,35), tâches métier (TVA, justificatifs).
- Verdict : non réutilisable.

### Cible

- Réécriture en **module pur dans `apps/web/src/lib/diagnostic/`**, configuration **par niche**, qui mène à un audit et un appel chiffrés.
- **Tests sur 3 profils** dont le résultat attendu est calculé à la main.
- On garde `sendLead` (`lib/leads.ts`), l'action serveur `app/diagnostic/actions.ts` et le webhook n8n (→ NocoDB) ; on adapte les champs.

## 8. Ordre de travail

1. Page de structure à jour.
2. Tokens (`packages/brand/synapsis-2026.css`) et hero.
3. Reste de la page d'accueil.
4. Nouveau diagnostic (bloquant pour la mise en production).
5. `/rendez-vous`, rebranchement de `/merci-signature`, suppressions et redirections.

## 9. Décisions du 24/10/2026 (relayées depuis le téléphone)

- **Couleur d'accent** : on garde l'orange actuel de Synapsis, `#E8500F`, pour le moment. Sur fond sombre, le texte d'un bouton orange est sombre (le blanc sur cet orange ne passe pas le contraste AA en taille normale).
- **Nom de la mascotte** : pas prioritaire, laissé de côté. Le titre de la section 5 garde le marqueur `[Mascotte]`.
- **Faille /admin** : traitée une fois le nouveau site terminé. Consigne : couper l'accès seulement si la gravité le justifie. Évaluation du 24/10 : le cookie `admin_session` contient le mot de passe lui-même (httpOnly, secure, 30 jours) et le formulaire ne limite pas les essais. Risque réel modéré : il faut voler un cookie httpOnly ou deviner le mot de passe, et la solidité de `ADMIN_PASSWORD` est le seul vrai rempart. **Accès non coupé** : le couper casserait la gestion des clients et l'onboarding sans menace avérée. À vérifier par Fred : `ADMIN_PASSWORD` long et aléatoire (20 caractères ou plus).
- **DECOUVERTE.md** : ne pas le commiter tant que le dépôt GitHub est public.
- **Page 404 personnalisée** : oui, dans le nouveau style.

## 10. Vidéo du hero

- Ordre retenu : le site, puis le script, puis la vidéo.
- Un premier essai de boucle animée existe hors du repo (`Desktop/Projets/site_web_synapsis_[10.26]/videos/synapsis-hero-loop`), construit sur l'ancienne charte. Il est mis de côté.
- Sur ce PC, les outils qui pilotent un Chrome sans fenêtre (HyperFrames snapshot/render, Playwright) se sont bloqués : à éviter ou à lancer un par un, sous surveillance.

## 11. Direction visuelle validée le 24/10/2026 (via la session Pilotage)

Le premier aperçu (fond sombre, hero en deux colonnes) a été rejeté : il ne reprenait que la mécanique de contenu de slayte.io, pas son style. Leur CSS et leur HTML ont ensuite été relevés (sans navigateur) ; les choix de Fred :

- **a) Fonds** : blanc, sections alternées `#F7F8FC`, et **une seule** section sombre `#0E0E10`, celle de la mascotte (comme leur section « Félix »).
- **b) Polices** : proches d'Outfit et de Plus Jakarta Sans, mais pas les mêmes. **Choix définitif de Fred : Urbanist pour les titres, Figtree pour le texte** (Google Fonts). Elles vivent dans les tokens pour pouvoir en changer en une ligne.
- **c) Texte** : `#0E0E10` (19:1 sur blanc).
- **d) Boutons** : l'orange `#E8500F` pour le bouton principal « Faire mon diagnostic » (pilule de l'en-tête et appels dans la page), texte `#0E0E10` dessus (5,1:1 ; le blanc ne passe pas, 3,8:1). Boutons secondaires quasi-noirs, rayon 12 px, 48 px de haut. L'orange n'est **jamais** utilisé comme couleur de texte sur blanc (3,8:1) ; pour du texte orange, `#C23F08` (5,2:1).
- **e) Hero** : centré, texte seul. La scène de Claire et de ses cinq outils descend en section 2.
- **f) Sections** : sur-titre, titre en deux temps, paragraphe, puis grande fausse interface en HTML.
- **g) Ordre** : celui du § 5, avec la scène des cinq outils insérée en section 2.

### Animations (grammaire de slayte.io)

Fausses interfaces vivantes qui se remplissent en entrant à l'écran ; titres révélés mot par mot (~0,3 s) ; passage du flou au net ; soulignement qui se trace ; entrées qui glissent de 16 px ; dévoilements en clip-path ; jauges, barres et cercles de progression qui se remplissent ; coches qui apparaissent ; bandeau qui défile en continu (pause au survol) ; effets liés au défilement. Sobres et rapides. Tout est coupé sous `prefers-reduced-motion`.

### Cible et ton

TPE/PME de 5 à 20 salariés. Douleurs : tout tourne sur Excel ; le dirigeant et ses salariés perdent du temps ; les relances sont oubliées ; des clients oubliés ou mal suivis se plaignent ; rien n'est centralisé ; une organisation bancale qui empêche de grandir. Vouvoiement, concret, on appuie sur la douleur avant de montrer la solution.

### Méthode

Plan des sections et paires de polices validés par Fred avant tout code ; aperçu en artefact, puis Vercel ; rien n'est poussé avant validation. Les tokens sombres et le premier hero (commit local `0d1afb2` et fichiers non commités) sont à remplacer.

### Corrections du plan (24/10, via Pilotage)

- Aucun vocabulaire propre à la formation (convention, convocation, session) : parcours client générique, devis → bon pour accord → démarrage → livraison ou intervention → facture → paiement. Le nom « Morel Formation » n'apparaît pas dans les interfaces.
- Section 5 : formulée en bénéfice (les relances et l'accueil partent au bon moment, vous validez d'un clic).
- Excel est nommé dans un titre visible (section 2).
- Hero : texte seul, titre révélé mot par mot, emplacement réservé à la vidéo sous le bouton. Le haut des fenêtres de la section 2 doit être visible sans défiler, sur mobile comme sur ordinateur.
- Animations : bibliothèque Motion (ex-Framer Motion) en version allégée (LazyMotion + m), coupée sous `prefers-reduced-motion`.

## 12. Décisions du 02/11/2026 (maquettes validées en artefact)

Ces décisions remplacent les points contraires des sections précédentes.

- **Cible** : PME de **10 à 49 salariés** (remplace « 5 à 20 » du § 11 et « TPE/PME » du § 1).
- **Offre** : des systèmes de centralisation d'outils. On relie les outils existants autour d'un point central, la fiche client et le pilotage ; le client garde ses outils. Revoir l'organisation est possible, mais ce n'est pas le but premier. Mise en place en un mois environ. L'assistant IA prépare, l'humain valide.
- **Hero** (remplace le titre et le sous-titre du § 2) : « Arrêtez de faire le facteur / entre vos outils. » Sous-titre : « Je centralise vos mails, votre fichier clients, votre agenda et vos factures. Tout se retrouve au même endroit, les relances partent au bon moment, et c'est vous qui validez. »
- **Audit gratuit : 30 min** (remplace 45 min aux § 2 et § 5). Promesse : un plan complet (points forts, points faibles, ce qu'on relie en premier), sans engagement. Réservation par **Cal.com** (`cal.com/synapsis/30min`), qui remplace Calendly sur `/rendez-vous`. Couleurs de marque dans Cal.com : `#E8500F` (clair), `#FF8A52` (sombre).
- **Page d'accueil** (remplace le tableau du § 5) : celle de la maquette validée. Haut de page (titre, vidéo, CTA, bandeau d'outils), « Vous vous reconnaissez ? », le fil (piste horizontale au défilement), la fiche client, le pilotage (3 onglets et récap du matin), l'assistant IA (seule section sombre du milieu), un seul interlocuteur, comment ça se passe (7 étapes en 3 temps), questions, appel final.
- **Vidéo du hero** : « Qui fait le lien entre tous vos outils ? », animée avec **GSAP** (remplace Motion du § 11). Musique et bruitages générés dans le navigateur ; voix dans `public/audio/voix-kenzy-v2.mp3`, téléchargée seulement au clic sur « Activer le son ». La phrase « Moi, c'est Frédéric » est dite par une voix de synthèse : à remplacer par la voix de Fred ou à reformuler.
- **Mascotte** : en attente.
- **Diagnostic** (remplace la cible du § 7) : choix des outils, puis 8 questions ; l'indice de connexion sur 100 et la carte des outils s'affichent sans e-mail. L'e-mail, avec consentement, débloque le rapport complet (3 blocages, estimation des heures présentée comme celle du visiteur avec son calcul, premier branchement conseillé) et la réservation Cal.com intégrée, avec le diagnostic pré-rempli dans les notes du rendez-vous.
- **Logo Synapsis** : la version épaissie de la maquette devient le logo officiel (mêmes courbes que `synapsis-mark.tsx`, traits et points plus gros, `#E8500F`, sans le carré de fond). Les fichiers SVG sont à livrer à Fred.
- **Cible, précision** : on ne met pas en avant l'exclusion « hors BTP et artisanat » du § 1. Ces entreprises sont bienvenues si elles viennent.
- **Admin** : Fred n'a plus besoin de `/admin` (il a son espace pilotage). Sa suppression est à décider dans plan2.md.
- **Logos des outils** : les vrais logos partout (bandeau de l'accueil, vidéo, diagnostic), pris dans les kits presse officiels et sans laisser croire à un partenariat. Dans le diagnostic, quand le visiteur tape lui-même un outil connu, son logo s'affiche ; sinon, pastille avec l'initiale.
- **Icône d'onglet et image de partage** (`app/icon.png`, `app/opengraph-image.tsx`) : encore à l'ancienne charte (« cabinets d'expertise comptable », crème), à refaire dans le nouveau style avant la mise en ligne.
- **Technique du portage** : la maquette est portée telle quelle. Une section par composant serveur dans `components/site2026/home`, styles dans `styles/site2026.css` (tout sous `.s26`, remise à zéro de Tailwind annulée sous `.s26`), jetons dans `packages/brand/synapsis-2026.css`, animations de la page et vidéo dans deux modules (`home-effects.js`, `story-player.js`) lancés par `HomeClient` et arrêtés quand on quitte la page.
