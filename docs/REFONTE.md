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
- Mécanique inspirée de la construction de slayte.io : fond très sombre, titres en deux temps, chaque argument prouvé par une fausse interface produit remplie de données crédibles, personnages récurrents qui traversent la page, une mascotte, un seul CTA répété.
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

## 9. Vidéo du hero

- Ordre retenu : le site, puis le script, puis la vidéo.
- Un premier essai de boucle animée existe hors du repo (`Desktop/Projets/site_web_synapsis_[10.26]/videos/synapsis-hero-loop`), construit sur l'ancienne charte. Il est mis de côté.
- Sur ce PC, les outils qui pilotent un Chrome sans fenêtre (HyperFrames snapshot/render, Playwright) se sont bloqués : à éviter ou à lancer un par un, sous surveillance.
