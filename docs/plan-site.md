# Plan de construction du site — mysynapsis.fr

> Le plan d'exécution. Il découle entièrement de [avatar-expert-comptable.md](./avatar-expert-comptable.md),
> qui doit être lu en premier.
>
> Règle de travail : **on ne code rien qui ne soit pas dans ce document.** Si une idée arrive
> en cours de route, elle entre d'abord ici, puis elle est développée.

---

## 1. Le principe directeur

> **Le site n'a qu'un seul job : faire dire à Marc « ce type connaît mon métier », puis lui
> donner un chiffre sur son propre cabinet.**

Tout le reste — le design, les animations, les technologies affichées — est secondaire et ne doit jamais passer devant.

Trois règles qui tranchent tous les arbitrages :

1. **Le vocabulaire du cabinet, jamais celui de l'agence.** Le lexique de §9 de l'avatar fait foi.
2. **Aucun chiffre invérifiable.** En cas de doute, on écrit le mécanisme, pas la statistique.
3. **Le système ne fait pas de comptabilité, il fait tout ce qui l'entoure.** Cette phrase apparaît sur trois pages minimum.

---

## 2. Verdict sur l'existant

### ✅ À garder — c'est bon, on n'y touche pas

| Élément | Fichier | Pourquoi |
|---|---|---|
| **Le diagnostic en 6 questions** | `components/diagnostic/diagnostic-form.tsx` | Le meilleur actif du site. Structure, ton, calibrage : tout est juste. |
| **Le dépliant « Comment on arrive à ce chiffre »** | `diagnostic-form.tsx:433-487` | L'aveu explicite que 55 % et 35 % sont des hypothèses. Pour un professionnel du chiffre, cette transparence vaut plus que dix témoignages. **C'est la voix que le site entier doit adopter.** |
| **Les 6 tâches du diagnostic** | `diagnostic-form.tsx:19-50` | Le seul endroit du site déjà écrit dans le vocabulaire du métier. À réutiliser ailleurs. |
| Le H1 « Arrêtez d'être un employé dans votre propre cabinet » | `app/page.tsx:63-72` | Frappe juste la tension identitaire du dirigeant-technicien. |
| « Aucun email demandé pour voir le résultat » | `app/page.tsx:89` | Vrai réducteur de friction, bien placé. |
| La capture réelle du workflow n8n | `app/page.tsx:245-257` | La seule preuve authentique de la page. Elle reste, mais elle descend (§4.1). |
| Le design system crème/orange + Archivo/Plex/Inter | `index.css:134-149` | Sobre, chaleureux, lisible, pas « startup ». Convient au public. |
| Toute l'infrastructure | app router, server actions, envoi n8n, analytics, admin, onboarding client | Fonctionne. Hors périmètre de la refonte. |
| Les pages légales | `mentions-legales`, `politique-confidentialite` | À jour. |

### 🔧 À modifier

| Élément | Fichier | Le problème |
|---|---|---|
| **Métadonnées du site** | `app/layout.tsx:26-27` | « les systèmes qui font tourner votre business » — générique. C'est ce qui s'affiche quand le lien est partagé. |
| **Bio fondateur** | `app/page.tsx:465` | « PME, agences et indépendants » — contredit frontalement le positionnement. |
| **Grille « Solutions »** | `app/page.tsx:201-232` | Vocabulaire d'agence (pipeline commercial, agents IA, intégrations). À remplacer par les 6 tâches du cabinet. |
| **Section « Réalisations »** | `app/page.tsx:237-398` | Trois blocs étiquetés « concept » par toi-même. Une section Réalisations qui annonce n'avoir aucune réalisation transforme un doute en certitude. |
| Sous-accroche du hero | `app/page.tsx:74` | « des tâches qu'une machine fait mieux que vous » — pique l'orgueil d'une profession bâtie sur l'expertise. |
| Ordre du hero | `app/page.tsx:94-177` | Le canvas n8n en premier écran dit « complexité informatique » à un dirigeant de 45 ans. |
| **Page Offres** | `app/offres/page.tsx` | Générique, 4 packs, vendus en nombre d'automatisations. Refonte totale. |
| **FAQ** | `app/offres/faqs.ts` | Écrite pour un public généraliste. Aucune des vraies objections du métier. |
| **Page Rendez-vous** | `app/rendez-vous/page.tsx` | Générique, et **promet 30 min alors que le lien Calendly est `/15min`** (ligne 135). Incohérence factuelle sur le bouton de conversion, devant un public dont le métier est de repérer les écarts. |
| Navigation | `components/site-nav.tsx` | Tagline générique, et le CTA « Réserver un appel » concurrence le diagnostic sur toutes les pages. |
| Téléphone obligatoire | `app/diagnostic/actions.ts:17` | Sur trafic froid et mobile, exiger un numéro coûte des leads. |
| Fin du diagnostic | `diagnostic-form.tsx:490-531` | « Je reviens sous 24 h ouvrées » au pic d'intention. Momentum jeté. |

### ✨ À créer

| Élément | Priorité | Pourquoi |
|---|---|---|
| **Page Conformité & secret professionnel** | **Critique** | Zéro mot aujourd'hui sur le secret professionnel, le RGPD, l'hébergement. C'est la première objection réelle de la profession. Aucun concurrent généraliste ne l'aura. |
| **Bloc « Ce que le système ne fait pas »** | **Critique** | Désamorce la menace identitaire et la question déontologique. À placer sur l'accueil et sur l'offre. |
| **Système de preuve par le mécanisme** | **Critique** | Sans référence en cabinet, on ne prouve pas par le résultat mais par le fonctionnement détaillé. Remplace la section « concept ». |
| Page Méthode publique | Haute | Ce qui se passe semaine par semaine. `deroulement` existe mais sert le suivi client privé. |
| Bloc « Pour qui ce n'est pas » | Moyenne | Disqualifier augmente la conversion et pré-cadre l'appel. |
| Image OpenGraph niche | Moyenne | `app/opengraph-image.tsx` doit dire « experts-comptables ». |
| Contenu de fond (SEO / LinkedIn) | Moyenne | Aujourd'hui le trafic dépend d'un seul canal, et du plus faible (§7). |
| Séquence de relance email | Moyenne | 95 % des visiteurs ne convertissent pas et sont perdus définitivement. |

---

## 3. L'architecture cible

```
/                     Accueil — le problème, le mécanisme, la preuve
/diagnostic           Le quiz 6 questions          [GARDÉ, augmenté]
/offre                Zéro Pièce Manquante         [REFONTE de /offres]
/methode              Semaine par semaine          [NOUVEAU]
/conformite           Secret pro · RGPD · données  [NOUVEAU]
/rendez-vous          Calendly                     [MODIFIÉ]
/qui                  Frédéric Mallet              [extrait de l'accueil]
```

### Navigation

| Aujourd'hui | Cible |
|---|---|
| Systèmes · Réalisations · Offres · Méthode · Qui suis-je · **[Réserver un appel]** | Le problème · La méthode · L'offre · Conformité · Qui je suis · **[Faire le diagnostic]** |

Le bouton « Réserver un appel » ne disparaît pas — il devient un lien texte discret à côté du CTA principal. Deux portes, hiérarchie nette : le froid fait le diagnostic, le chaud prend rendez-vous.

Tagline du logo : `Automatisation & IA` → **`Cabinets d'expertise comptable`**.

---

## 4. Page par page

### 4.1 Accueil

**Job de la page :** faire dire « il connaît mon métier » en 5 secondes, puis envoyer au diagnostic.

**Ordre des sections (nouveau) :**

1. **Hero** — titre, sous-accroche, CTA diagnostic
2. **Le problème, en micro-moments** *(nouveau — remplace la grille Solutions)*
3. **Ce que le système fait / ne fait pas** *(nouveau)*
4. **Le mécanisme, montré** *(nouveau — remplace « Réalisations »)* — c'est ici que descend le canvas n8n et la capture réelle
5. **La méthode en 3 étapes** *(gardée, réécrite)*
6. **Conformité — teaser + lien** *(nouveau)*
7. **Bande CTA diagnostic**
8. **Qui je suis** *(réécrit)*

#### Hero — copy

```
ÉYEBROW   Cabinets d'expertise comptable · 1 à 15 collaborateurs

H1        Arrêtez d'être un employé
          dans votre propre cabinet.

LEAD      Vos collaborateurs passent leurs semaines à relancer des clients pour
          des pièces, à reclasser des justificatifs et à répondre trois fois à la
          même question. Rien de tout cela ne demande une expertise comptable.
          Répondez à 6 questions : vous saurez combien d'heures votre cabinet y
          laisse, ce que ça vaut, et par quoi commencer.

CTA       Lancer le diagnostic →        Voir comment ça marche
NOTE      6 questions · 2 min · aucun email demandé pour voir le résultat
```

> Ce qui change : « une machine fait mieux que vous » disparaît au profit de **« rien de tout
> cela ne demande une expertise comptable »**. Même idée, mais elle flatte sa compétence au
> lieu de la contester.

#### Section « Le problème » — remplace la grille Solutions

Six cartes, reprises **mot pour mot** des tâches du diagnostic (`diagnostic-form.tsx:19-50`), chacune enrichie d'un micro-moment tiré de l'avatar §10 :

| Carte | Micro-moment à afficher |
|---|---|
| Relancer les clients pour les pièces manquantes | *« Le client qui envoie ses pièces le 28 pour une TVA au 15. »* |
| Collecter et classer les justificatifs | *« La photo floue reçue par WhatsApp un dimanche soir. »* |
| Ressaisir les mêmes infos dans plusieurs outils | *« La même donnée saisie dans la production, puis dans la paie, puis dans Excel. »* |
| Préparer les déclarations de TVA | *« Le 12 du mois, quand il manque encore trois dossiers. »* |
| Répondre aux mêmes questions clients | *« La quinzième fois qu'on vous demande si un repas passe en frais. »* |
| Sortir les tableaux de bord et reportings | *« Le reporting que personne n'a le temps de sortir le 5. »* |

#### Bloc « Ce que le système fait / ne fait pas » — nouveau, essentiel

```
IL FAIT                              IL NE FAIT PAS
Relancer les clients                 Aucune écriture comptable
Collecter et classer les pièces      Aucune révision, aucun arbitrage
Rappeler les échéances               Aucun avis, aucune signature
Préparer et pré-remplir              Aucun contact client sans votre validation
Alerter quand un dossier bloque      Aucun accès à vos données sans contrat

           « Le système ne fait pas de comptabilité.
              Il fait tout ce qui l'entoure. »
```

#### Section « Le mécanisme » — remplace « Réalisations »

**On supprime les trois blocs étiquetés « concept ».** À la place, on prouve par le fonctionnement :

- **Avant / après d'un mois de collecte** — schéma en deux colonnes : ce qui se passe aujourd'hui (relance manuelle, abandon, reconstitution depuis le relevé) contre ce qui se passe avec le système.
- **La capture réelle du workflow n8n** (gardée) — légendée honnêtement : *« un pipeline réel, tel qu'il tourne »*.
- **Le canvas animé** (gardé, descendu ici) — il devient une preuve d'exécution, plus une barrière d'entrée.

> Aucune capture ne doit plus porter la mention « concept ». Soit c'est réel, soit ça n'est
> pas sur le site.

#### Bio fondateur — réécriture

```
Frédéric Mallet · Fondateur, Synapsis

Je construis des systèmes qui prennent en charge tout ce qui entoure la
comptabilité sans en faire partie : la collecte des pièces, les relances, le
classement, les rappels d'échéance. Je ne touche ni à vos écritures, ni à votre
production, ni à votre jugement professionnel. Vous n'achetez pas une prestation
ponctuelle : vous installez une infrastructure qui tourne sur votre compte, à
votre nom, et qui continuerait de tourner si je disparaissais demain.
```

> On supprime « PME, agences et indépendants ». On supprime aussi toute formule du type
> « la plupart des dirigeants que j'accompagne » tant qu'elle n'est pas défendable à l'oral.

---

### 4.2 `/offre` — refonte totale

Le contenu est déjà écrit et validé : voir l'artefact **Zéro Pièce Manquante**.

**Structure de la page :**

1. Promesse — *90 % de vos dossiers complets au 10 du mois*
2. Le problème choisi (pourquoi la collecte des pièces)
3. Prix décomposé — 1 000 / 5 200 / 1 300 = 7 500 €, en grand livre
4. Échéancier 50/50
5. **La garantie** — bloc inversé, un seul chiffre, une seule date, choix laissé au client
6. **Les huit réassurances** — peur ↔ remède
7. Le calendrier J+0 → J+90
8. Les cinq livrables compris (3 800 € de valeur)
9. Rareté — 3 cabinets, avant décembre
10. FAQ réécrite
11. CTA diagnostic

**À supprimer :** les 4 packs, l'offre « sur devis », et le bandeau « Prérequis : compte n8n Cloud ~20 €/mois » placé juste avant les prix (`offres/page.tsx:61`) — il descend en FAQ.

#### FAQ — les 8 vraies questions à remplacer

Les FAQ actuelles répondent à des objections génériques. Les vraies :

1. Mes clients vont-ils recevoir des messages automatiques sans que je le sache ?
2. Où sont hébergées les données de mes clients ?
3. Est-ce que mes données passent dans une IA ?
4. Est-ce compatible avec Cegid / MyUnisoft / Pennylane / Silae ?
5. Qu'est-ce que ça demande à mes collaborateurs, concrètement ?
6. Et si le système se trompe ? Qui est responsable ?
7. Que se passe-t-il si vous arrêtez votre activité ?
8. Pourquoi commencer par la collecte des pièces et pas autre chose ?

---

### 4.3 `/conformite` — page nouvelle, critique

**Job de la page :** répondre à la première objection du métier avant qu'elle soit posée, et transformer une contrainte en argument de vente.

**Sections :**

1. **Le secret professionnel** — ce qu'il implique, et ce que Synapsis s'engage à respecter. Accord de confidentialité signé **avant l'audit**, donc avant tout accès.
2. **L'hébergement** — où sont les données, dans quel pays, chez quel type d'hébergeur.
3. **L'IA** — ce qui y passe et ce qui n'y passe pas. Position claire : aucune donnée nominative ni écriture comptable.
4. **Le cadre RGPD** — contrat de sous-traitance (art. 28), le cabinet reste responsable de traitement, mention prête pour son registre des traitements.
5. **La déontologie** — aucun acte professionnel automatisé, aucune substitution au jugement.
6. **La réversibilité** — tout sur son compte, documentation et passation, aucune dépendance.

> ⚠️ **Cette page ne peut pas être écrite avant que les trois préalables soient réglés :**
> RC Pro souscrite, contrat de sous-traitance RGPD rédigé, et non-conservation des données
> vérifiée côté API d'IA. Écrire ces promesses sans les tenir est le pire risque du projet.

---

### 4.4 `/methode` — page nouvelle

Reprise du calendrier de l'offre, côté public : J+0 signature et relevé, J+7 cadrage et **point de sortie**, J+10 première relance en marche à blanc, J+21 mise en production, J+35 ouverture des envois, J+90 constat de garantie.

Ajouter **« Ce que ça demande à votre équipe »** : 2 h pour le dirigeant, 1 h de formation, un référent désigné. Chiffrer l'effort le divise par deux dans sa tête.

---

### 4.5 `/rendez-vous` — corrections

| À corriger | Détail |
|---|---|
| **L'incohérence 15/30 min** | Soit le lien passe en `/30min`, soit la copy passe à 15 min. Décision à prendre, mais l'écart doit disparaître. |
| Copy générique | Réécrire pour l'avatar : ce qu'on regarde pendant l'appel, dans son vocabulaire. |
| Ajouter une qualification | Deux questions dans Calendly : taille du cabinet, et **outil de production utilisé** — c'est ce qui détermine la faisabilité technique (avatar §7). |

---

### 4.6 `/diagnostic` — augmentations

Le quiz ne change pas. Ce qui change, c'est ce qui l'entoure :

| Modification | Fichier | Détail |
|---|---|---|
| Téléphone optionnel | `app/diagnostic/actions.ts:17` | Garder l'email obligatoire. Le téléphone freine sur mobile. |
| Prise de rendez-vous immédiate | `diagnostic-form.tsx:490` | Sur l'écran de confirmation, afficher le lien Calendly **en plus** du « je reviens vers vous ». Le pic d'intention, c'est maintenant. |
| Coût de l'inaction | écran de résultat | Une ligne : *« Chaque mois qui passe, c'est X € et Y heures. »* Calculé à partir des réponses. |
| Question outil de production | nouvelle question, optionnelle | Savoir s'il est sur Cegid ou Pennylane change tout à la faisabilité. À placer après le résultat, pas avant. |

---

## 5. Le système de preuve

**Le problème n°1 du site**, et il ne se résout pas en écrivant mieux.

Sans aucune référence en cabinet, trois substituts, par ordre de force :

1. **Le mécanisme montré en détail.** Quand on ne peut pas prouver le résultat, on prouve le fonctionnement. Un schéma avant/après précis vaut mieux qu'un faux dashboard.
2. **Le partage du risque.** Paiement 50/50, garantie chiffrée, point de sortie, pénalité de retard. Mettre son argent en face remplace le témoignage qu'on n'a pas.
3. **La transparence sur les limites.** Dire ce qu'on ne sait pas faire, quels outils ne sont pas intégrables, pour qui ce n'est pas. Dans cette profession, l'aveu de limite est un accélérateur de confiance.

**Le premier cas client est l'actif le plus urgent à fabriquer.** Il se demande *après* le résultat obtenu, jamais en échange d'une remise. Seule une clause neutre de publication de chiffres anonymisés a sa place dans le contrat initial.

---

## 6. Le lexique appliqué

Voir avatar §9 pour la liste complète. Les substitutions à faire mécaniquement dans tout le code :

| Chercher | Remplacer par |
|---|---|
| votre business | votre cabinet |
| entreprise, société (parlant du client) | cabinet |
| employé | collaborateur |
| client (au sens dossier) | dossier |
| pipeline commercial | *(supprimer)* |
| agents IA *(en titre)* | *(supprimer — reléguer aux détails techniques)* |
| automatiser votre comptabilité | prendre en charge ce qui entoure la comptabilité |
| masse salariale | *(reformuler : « sans le recrutement que vous n'arrivez pas à faire »)* |
| PME, agences et indépendants | cabinets d'expertise comptable |

---

## 7. La direction artistique — on garde les os, on change le décor

**Verdict : la palette et les typographies restent. Le vocabulaire visuel change.**

### Ce qui reste

| Élément | Pourquoi |
|---|---|
| **Le fond crème `#faf6ef`** | Chaleureux, sobre, non-« startup ». Repose l'œil. Convient exactement à une profession qui se méfie du clinquant. |
| **Archivo / IBM Plex Mono / Inter** | Bon trio. Archivo est solide sans être froid, Plex apporte la rigueur du chiffre. |
| **L'orange `#e8500f`** | C'est ta marque. Il reste — mais **utilisé plus rarement**, en ponctuation, pas en décor. |
| **La sobriété générale** | Peu d'ombres, peu d'arrondis, des filets fins. Juste. |

### Ce qui change : la métaphore visuelle

Aujourd'hui, tout le site emprunte son vocabulaire graphique aux **outils de développeur** :

- barres de fenêtre avec pastilles rouge / jaune / verte (`s-flow-bar`, `s-dashmock-bar`, `s-doc-frame-bar`, `s-statcard-bar`)
- noms de fichiers `.json` affichés comme des onglets d'éditeur
- badges `ACTIF` avec point clignotant, compteurs d'exécutions, « taux de succès 99,4 % »
- câbles animés et impulsions lumineuses sur un canvas de nœuds
- police monospace employée pour **tous** les intertitres, y compris ceux qui n'affichent aucune donnée

C'est cohérent, c'est soigné, et **c'est adressé à la mauvaise personne**. Marc ne se reconnaît pas dans une fenêtre de terminal : il y voit la confirmation qu'il va devoir gérer un truc informatique.

> **La métaphore doit passer du terminal au cabinet.**
>
> Le monde visuel de Marc, c'est le dossier, le classeur, la pièce justificative, la colonne
> de chiffres alignés, la coche de validation, le tampon, l'échéance au calendrier.
> C'est le registre qu'il faut emprunter — pas celui de l'IDE.

### Les six règles de la nouvelle DA

1. **Le chrome de développeur quitte les pages publiques.** Plus de pastilles de fenêtre, plus de noms de fichiers, plus de badges `ACTIF` sur l'accueil.
2. **Le canvas n8n reste, mais il descend** dans une section explicitement technique — « sous le capot » — où il joue son vrai rôle : la preuve que le système existe, pour celui qui veut vérifier.
3. **La monospace est réservée aux chiffres et aux données.** Montants, dates, échéances, compteurs. Partout ailleurs, Inter ou Archivo. La mono doit signifier « ceci est une donnée », pas décorer un intertitre.
4. **Les chiffres s'alignent.** `font-variant-numeric: tabular-nums` systématique, montants alignés à droite, filets de séparation, ligne de total quand il y en a une. C'est la grammaire du grand livre, et elle est immédiatement lisible par ce public.
5. **L'orange ponctue, il ne décore pas.** Un accent par écran : le CTA, ou le chiffre clé, jamais les deux.
6. **Une présence humaine.** Dans une profession où l'on achète la confiance en une personne, ton visage vaut mieux que n'importe quel graphique abstrait. La photo existe déjà — elle doit remonter, pas rester en bas de page.

### La référence de style

L'artefact **Zéro Pièce Manquante** applique déjà exactement cette direction : même palette, mêmes fontes, mais grammaire de grand livre, chiffres tabulaires, filets, ligne de total, aucun chrome de terminal. **Il sert de référence visuelle pour la refonte.**

### Ce qu'on ne change pas maintenant

L'orange est vif — un ton plus profond porterait sans doute mieux la crédibilité. Mais changer la couleur d'une marque est une décision qui dépasse le site. **On la garde, on l'utilise mieux.** À rouvrir plus tard, si jamais.

---

## 8. Canaux — un arbitrage à trancher

**Constat de l'audit avatar (§8) :** Instagram est le canal le plus faible pour cet avatar. LinkedIn est là où la profession se parle, avec les groupements, les événements de l'Ordre et la presse spécialisée.

Ça n'invalide rien du travail sur le site — mais **le même site branché sur LinkedIn produira un tout autre résultat**.

Trois options, à décider explicitement :

| Option | Ce que ça implique |
|---|---|
| **Basculer sur LinkedIn** | Le canal juste pour l'avatar. Demande un rythme de publication et un ton différents d'Instagram. |
| **Garder Instagram, ajouter LinkedIn** | Charge double, mais on ne casse rien de l'existant. |
| **Rester sur Instagram** | Assumé, mais le plafond de recrutement sera bas quel que soit le site. |

À ajouter dans tous les cas : le contenu de fond (SEO), aujourd'hui inexistant. Une poignée de pages qui répondent à ses vraies questions capte une demande qualifiée et durable, indépendante des réseaux.

---

## 9. Ordre d'exécution

### Phase 0 — Les correctifs gratuits *(≈ 2 heures, à faire en premier)*

Rien à concevoir, uniquement des incohérences à supprimer. Meilleur rapport gain/effort du projet.

- [ ] Métadonnées `layout.tsx` → experts-comptables
- [ ] Bio fondateur `page.tsx:465` → supprimer « PME, agences et indépendants »
- [ ] Tagline nav → « Cabinets d'expertise comptable »
- [ ] Cohérence Calendly 15/30 min
- [ ] Téléphone optionnel dans `diagnostic/actions.ts`
- [ ] Supprimer les mentions « concept » des trois blocs
- [ ] Sous-accroche hero → « rien de tout cela ne demande une expertise comptable »

### Phase 1 — L'offre et la conformité

*Prérequis administratifs : RC Pro, contrat de sous-traitance RGPD, vérification API IA.*

- [ ] Refonte `/offre` (structure de l'artefact)
- [ ] Nouvelle FAQ, 8 questions du métier
- [ ] Nouvelle page `/conformite`
- [ ] Bloc « ce que le système ne fait pas »

### Phase 2 — L'accueil

- [ ] Grille « Le problème » avec les 6 tâches et leurs micro-moments
- [ ] Section « Le mécanisme » — avant/après, canvas descendu
- [ ] Réécriture de la bio
- [ ] Hiérarchie de navigation, CTA diagnostic dominant

### Phase 3 — Le tunnel

- [ ] Rendez-vous immédiat en fin de diagnostic
- [ ] Coût de l'inaction sur l'écran de résultat
- [ ] Page `/methode`
- [ ] Question outil de production

### Phase 4 — Le carburant

- [ ] Arbitrage de canal (§7)
- [ ] Image OpenGraph niche
- [ ] Contenu de fond
- [ ] Séquence de relance pour les non-convertis

---

## 10. Décisions en attente

| Décision | Pourquoi elle bloque |
|---|---|
| **Canal : Instagram, LinkedIn, ou les deux ?** | Détermine le ton et le rythme de tout le contenu. |
| **Calendly : 15 ou 30 minutes ?** | Correctif de Phase 0, deux minutes de travail, mais il faut choisir. |
| **RC Pro, DPA RGPD, non-rétention IA** | Bloquent `/conformite`, qui est la page la plus différenciante du site. |
| **Capacités API réelles par outil** | Déterminent ce qu'on peut promettre. À vérifier avant d'écrire la FAQ n°4. |
| **Premier cas client : comment on le fabrique** | L'actif manquant le plus urgent. |
