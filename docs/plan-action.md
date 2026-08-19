# Plan d'action — construire le site Synapsis pour les experts-comptables

> **Le document d'exécution.** Il consolide l'audit, l'avatar, l'offre et la DA en une seule
> liste d'actions séquencées. Les documents de fond restent la référence du *pourquoi* :
> [avatar-expert-comptable.md](./avatar-expert-comptable.md) ·
> [plan-site.md](./plan-site.md) ·
> [positionnement-et-acquisition.md](./positionnement-et-acquisition.md)
>
> Rédigé le 15 août 2026. Chaque case à cocher est une action réelle, avec son responsable :
> **[F]** = Frédéric (décisions, administratif, contenu incarné) · **[C]** = Claude (code, copy, pages).

---

## 0. Les décisions actées (15 août 2026)

| Décision | Choix |
|---|---|
| Canal d'acquisition | **LinkedIn + Instagram**, LinkedIn en canal principal sur cette cible |
| Page /v2 | ✅ **Basculée en accueil le 16 août 2026.** Ancien accueil sur /archive-accueil (noindex) |
| Appel découverte | **30 minutes**, le lien Calendly passe de /15min à /30min |
| Préalables administratifs | RC Pro, contrat RGPD et vérification API IA : **tous à faire** |
| Offre | Zéro Pièce Manquante, 7 500 €, 50/50, trois garanties empilées |
| Positionnement | L'ennemi commun est **le hors-métier** ; « le système ne fait pas de comptabilité, il fait tout ce qui l'entoure » |

---

## 1. Le calendrier joue pour nous — à condition d'être prêt en septembre

Deux horloges tournent en même temps :

### a) La fenêtre d'achat des cabinets : septembre → novembre

L'avatar n'achète ni en période fiscale (janvier-mai) ni en plein été. Il décide et signe
en **septembre-novembre** pour être opérationnel sur la campagne suivante.
**Nous sommes le 15 août : la fenêtre ouvre dans deux semaines.** Tout ce qui n'est pas
en ligne début septembre rate le train de l'année.

### b) La facturation électronique : le plus gros événement du métier depuis dix ans

Vérifié le 15 août 2026 (sources : Sage, Cegid, Pennylane, impots.gouv à re-confirmer) :

- **1er septembre 2026** : réception des factures électroniques obligatoire pour **toutes**
  les entreprises ; émission obligatoire pour les grandes entreprises et ETI.
- **1er septembre 2027** : émission obligatoire étendue aux **PME, TPE, indépendants,
  micro-entrepreneurs** — c'est-à-dire la clientèle entière d'un cabinet de 1 à 15.
- Passage par une **Plateforme Agréée** (ex-PDP) indispensable ; sanctions à la clé
  (15 €/facture non transmise, plafond 15 000 €/an).

**Ce que ça veut dire pour Synapsis :** pendant les 12 prochains mois, chaque cabinet de
France doit faire migrer chacun de ses dossiers, expliquer la réforme à chaque client, et
absorber cette charge **en plus** du hors-métier existant, sans réussir à recruter. Leur
année 2026-2027 est structurellement en surcharge. C'est le meilleur contexte possible pour
vendre un système qui reprend la collecte et les relances — et un excellent sujet de contenu
LinkedIn où tout le monde cherche des réponses.

**Règle d'usage :** on surfe sur l'événement dans le *contenu* (posts, page dédiée, FAQ),
mais l'offre reste Zéro Pièce Manquante. On ne se transforme pas en consultant facture
électronique — on est celui qui libère le temps que la réforme va dévorer.

- [x] **[C]** Dates de la facture électronique **vérifiées le 16 août 2026** : réception obligatoire pour toutes les entreprises au 1er sept. 2026, émission GE et ETI au 1er sept. 2026, émission PME, TPE et micro au 1er sept. 2027. Passage par une plateforme agréée obligatoire.
- [ ] **[C]** Ajouter une question FAQ « Et la facturation électronique dans tout ça ? » sur la page offre
- [ ] **[F]** Prévoir 3-4 posts LinkedIn sur l'angle « la réforme va manger le temps que vous n'avez déjà pas »

---

## 2. Semaine 1 (18-24 août) — Débloquer et corriger

### Administratif (bloque la crédibilité de tout le reste)

- [ ] **[F]** Souscrire la **RC Pro** (300-600 €/an ; un EC la demandera à l'appel, ne pas l'avoir fait perdre le deal sur une question)
- [x] **[F]** Télécharger le modèle CNIL de **contrat de sous-traitance art. 28** ; adaptation avec Claude
- [x] **[C]** Rédiger le contrat de sous-traitance RGPD à partir du modèle CNIL
- [ ] **[F]** Vérifier la politique de **non-rétention des données** de l'API IA utilisée (zero data retention) ; changer de plan/fournisseur si nécessaire
- [ ] **[F]** Passer le créneau Calendly de 15 à **30 minutes** et ajouter 2 questions de qualification : taille du cabinet + **outil de production utilisé**

### Correctifs de cohérence sur le site actuel (2 heures, zéro conception)

- [x] **[C]** `layout.tsx` : métadonnées → experts-comptables (c'est ce qui s'affiche quand un lien est partagé)
- [x] **[C]** Bio fondateur : supprimer « PME, agences et indépendants »
- [x] **[C]** `rendez-vous/page.tsx` : aligner la copy sur 30 min et le lien sur /30min
- [x] **[C]** `diagnostic/actions.ts` : téléphone **optionnel**, email seul obligatoire
- [x] **[C]** Supprimer les trois mentions « concept » de la section Réalisations actuelle (tant qu'elle est encore en ligne)
- [x] **[C]** Ajouter le consentement d'usage statistique anonymisé sous le formulaire du diagnostic (prépare l'Observatoire, une donnée non collectée est perdue pour toujours)

---

## 3. Semaines 2-3 (25 août - 7 septembre) — Basculer le site

### La bascule /v2 → accueil

- [x] **[F]** Derniers ajustements visuels sur /v2
- [x] **[C]** Retirer le bandeau « variante » et le lien retour
- [x] **[C]** Ancien accueil archivé sur `/archive-accueil` (noindex), /v2 devenu `/`
- [x] **[C]** `sitemap.ts`, image OpenGraph nichée et liens internes à jour
- [x] **[C]** Événements analytics renommés `v2_*` → `home_*`

### La page /offre (refonte totale, structure déjà validée)

Contenu = l'artefact « Zéro Pièce Manquante » + les ajouts issus de la recherche :

- [x] **[C]** `/offres` refaite : cadrage 600 € puis installation à partir de 4 500 €
- [ ] **[C]** **Empilement de valeur** : les 8 livrables à leur prix réel → 11 400 € barrés → 7 500 €
- [x] **[C]** Trois garanties empilées : clients, résultat, temps
- [ ] **[C]** Les 8 réassurances peur ↔ remède (marche à blanc, validation humaine, zéro dépendance…)
- [x] **[C]** Calendrier J+0 → J+90
- [x] **[C]** Rareté honnête
- [x] **[C]** FAQ réécrite, 10 questions du métier dont la facture électronique
- [x] **[C]** 4 packs, « sur devis » et bandeau n8n supprimés

### La page /conformite (débloquée par la semaine 1)

- [ ] **[C]** Secret professionnel : engagement + accord de confidentialité signé avant l'audit
- [ ] **[C]** Hébergement UE, ce qui transite ou non par l'IA, contrat art. 28, mention registre des traitements
- [ ] **[C]** Déontologie : aucun acte professionnel automatisé
- [ ] **[C]** Réversibilité : tout sur son compte, documentation, passation
- ⚠️ **Ne se publie que quand les trois préalables de la semaine 1 sont réels.** Une promesse de conformité non tenable est le pire risque du projet.

### La page /methode

- [x] **[C]** `/methode` créée : les 4 étapes et ce que ça demande à l'équipe

---

## 4. Semaines 3-4 (1-14 septembre) — Le tunnel complet

### Diagnostic (le meilleur actif, on l'augmente sans le casser)

- [ ] **[C]** Recadrer l'intro et le résultat sur **le hors-métier** (l'ennemi a un compteur)
- [ ] **[C]** Écran de confirmation : **prise de rendez-vous Calendly immédiate** en plus du « je reviens sous 24 h » (le pic d'intention, c'est maintenant)
- [ ] **[C]** Ligne « coût de l'inaction » sur le résultat : « chaque mois qui passe ≈ X € et Y heures », calculée depuis ses réponses
- [ ] **[C]** Question optionnelle post-résultat : **outil de production** (qualifie la faisabilité technique avant l'appel)

### L'aimant à leads n°2 : le relevé d'une semaine

- [ ] **[C]** Créer la page `/releve` : le relevé téléchargeable (PDF + Google Sheet) contre email
- [ ] **[C]** Le proposer sur l'écran de résultat du diagnostic (« vous voulez votre vrai chiffre, pas mon estimation ? »)
- [ ] **[F]** Concevoir le modèle de relevé avec Claude (une feuille, 5 jours, cases tâche/durée)

### La relance des 95 % qui ne convertissent pas

- [ ] **[F]** Choisir l'outil d'emailing (branché sur le workflow n8n existant de leads)
- [ ] **[C]** Séquence de 4 emails post-diagnostic : J+1 récap de son résultat · J+3 le mécanisme (avant/après) · J+7 la conformité · J+14 étude de cas / relevé
- [ ] **[C]** Workflow n8n : lead diagnostic → séquence → notification si réponse

---

## 5. Septembre-novembre — La machine d'acquisition (fenêtre de vente)

### LinkedIn (canal principal sur cette cible)

- [ ] **[F]** Profil LinkedIn refait : bannière + titre « J'installe des systèmes qui reprennent le hors-métier des cabinets comptables » + section à propos reprenant le récit en 6 temps
- [ ] **[C]** Rédiger un lot de 12 posts prêts à publier, tirés des micro-moments de l'avatar (« Le client qui envoie ses pièces le 28 pour une TVA au 15 », « Le forfait signé en 2019 jamais réindexé »…) + 4 posts facturation électronique
- [ ] **[F]** Cadence : 2 posts/semaine minimum de septembre à novembre, réponses aux commentaires le jour même
- [ ] **[F]** 10 conversations directes/semaine avec des EC (commentaires, DM sans pitch, invitation au diagnostic)

### Instagram (conservé, adapté)

- [ ] **[C]** Adapter les 12 posts LinkedIn en format carrousel/visuel Instagram (même fond, forme différente)
- [ ] **[F]** Le lien en bio pointe vers /diagnostic (pas l'accueil)

### La checklist de conformité (lead magnet n°3, différenciant absolu)

- [ ] **[C]** Rédiger « Automatisation et IA en cabinet : les 12 points à vérifier avant de signer avec un prestataire » (il apprend à te challenger ; tu es le seul à cocher les 12)
- [ ] **[C]** Page de téléchargement contre email + intégration dans la séquence

### Groupements et réseaux (le levier le plus puissant, le plus lent)

- [ ] **[F]** Lister les groupements/associations d'EC régionaux + le congrès de l'Ordre (octobre) et les événements régionaux
- [ ] **[F]** Proposer une intervention « Le hors-métier : ce que vos cabinets perdent chaque semaine sans le mesurer » (l'Observatoire naissant sert de ticket d'entrée)

---

## 6. En continu — La preuve, actif n°1 manquant

1. **Court terme (maintenant)** : preuve par le mécanisme (avant/après, marche à blanc, captures réelles) + partage du risque (3 garanties). Déjà dans les pages.
2. **Moyen terme (premier client, obj. octobre-novembre)** : le premier cabinet signé produit le premier cas chiffré. Le témoignage se demande **après** le résultat (J+90), jamais contre une remise. Clause neutre de publication de chiffres anonymisés dans le contrat dès la signature.
3. **Long terme (juin 2027)** : **l'Observatoire du hors-métier** — publication annuelle des données agrégées du diagnostic. Personne ne mesure ça ; celui qui publie le chiffre devient la référence.

- [ ] **[C]** Vérifier que le diagnostic stocke bien toutes les réponses en base de façon exploitable (taille, heures, taux, tâches, objectif, source)
- [ ] **[F]** Ajouter la clause de publication anonymisée au contrat type

---

## 7. Mesure — savoir si ça marche

| Étape du tunnel | Événement | Objectif de départ |
|---|---|---|
| Visite → diagnostic démarré | `diagnostic_demarre` | > 25 % du trafic |
| Démarré → résultat vu | `diagnostic_resultat` | > 70 % |
| Résultat → lead (email) | `diagnostic_lead` | > 25 % |
| Lead → RDV réservé | `cta_reserver_appel` post-diagnostic | > 30 % |
| RDV → proposition envoyée | suivi manuel | 100 % des RDV qualifiés |
| Proposition → signature | suivi manuel | 1er client avant fin novembre |

- [ ] **[C]** Vérifier que chaque événement est bien émis après la bascule
- [ ] **[F]** Revue hebdomadaire des chiffres le vendredi (15 min, pas plus)

**L'objectif unique de la saison : 1 à 3 cabinets signés avant décembre.** Tout le reste
(followers, trafic, likes) est de la vanité si ce chiffre est zéro.

---

## 8. Ce qu'on ne fait PAS (aussi important que le reste)

- **Pas de vente active de janvier à mai** : les cabinets sont en campagne fiscale. On livre, on mesure, on fabrique les cas clients, on publie.
- **Pas de 4e cabinet en 2026** si les 3 places annoncées sont prises : la rareté annoncée doit être vraie, ce public vérifie et se parle.
- **Pas de chiffre invérifiable sur le site** : en cas de doute, écrire le mécanisme, pas la statistique.
- **Pas de pivot facture électronique** : c'est un contexte et un sujet de contenu, pas une nouvelle offre.
- **Pas de nouvelle page ou fonctionnalité** hors de ce plan tant que le premier client n'est pas signé.

---

## 9. Vue d'ensemble du site cible

```
/                    Accueil (ex-v2) : hors-métier, engagements, mécanisme, offre, conformité
/diagnostic          Quiz 6 questions → résultat → RDV immédiat + relevé      [augmenté]
/offre               Zéro Pièce Manquante : stack de valeur + 3 garanties     [refonte]
/methode             J+0 → J+90, ce que ça demande à l'équipe                 [nouveau]
/conformite          Secret pro · RGPD · IA · réversibilité                   [nouveau]
/releve              Le relevé d'une semaine (lead magnet)                    [nouveau]
/rendez-vous         Calendly 30 min + qualification outil                    [corrigé]
/mentions-legales    ·  /politique-confidentialite                            [inchangés]
```

*Admin, onboarding et suivi client existants : hors périmètre, ils fonctionnent.*
