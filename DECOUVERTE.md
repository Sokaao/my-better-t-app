# Découverte — interface de pilotage Synapsis

Phase 0 de la spec. Aucune ligne de code écrite. Ce document répond aux huit
questions, liste les écarts entre la spec et ce que contient réellement le dépôt,
et pose les décisions que je ne prends pas seul.

---

## 0. La question qui commande toutes les autres

**La spec dit « à la racine du dépôt de l'interface ». Ce dépôt n'est pas celui-là.**

Le dépôt ouvert est `Site_web_synapsis` : le **site public** (marketing, diagnostic,
offres) plus un petit back-office d'onboarding, déployé sur **Vercel**. La spec, elle,
suppose un projet séparé, déployé sur un **VPS** (question 7 : PM2, Docker, systemd,
nginx). Aucun artefact de déploiement VPS n'existe ici : ni `Dockerfile`, ni
`docker-compose`, ni `ecosystem.config.js`, ni unité systemd, ni conf nginx.

Trois options, je ne tranche pas :

| Option | Ce que ça implique |
|---|---|
| **A. Nouvelle app dans ce monorepo** (`apps/pilotage`) | Le plus rapide : Turborepo, design system et conventions déjà là. Mais l'interface part sur Vercel, exposée sur Internet, avec un token NocoDB pleins pouvoirs dans son environnement. |
| **B. Dépôt séparé, hébergé sur le VPS** à côté de NocoDB et n8n | Correspond à ce que la spec décrit. Le token ne quitte pas le VPS, l'interface peut même rester derrière le réseau privé ou un VPN. Il faut monter le déploiement de zéro (aucun modèle dans ce dépôt). |
| **C. Nouvelle app dans le monorepo, déployée sur le VPS** | Réutilise le design system via `@synapsis/brand`, mais impose un pipeline de build/déploiement différent de celui de Vercel pour cette app seule. |

Mon avis : **B ou C**, pas A. Cette interface porte un token qui donne un accès total
en lecture et en écriture au CRM. Sur Vercel, sa seule barrière serait un mot de passe
partagé — voir l'écart n° 4 ci-dessous sur la qualité de l'authentification actuelle.
Un outil mono-utilisateur, utilisé depuis un poste de bureau, n'a aucun besoin d'être
joignable publiquement.

**Tant que ce point n'est pas tranché, je ne crée aucun fichier applicatif.**

---

## 1. Framework, version, gestionnaire de paquets

- **Monorepo Turborepo** (`turbo` ^2.5.4), workspaces **npm** (`npm@11.6.2`),
  déclarés dans `package.json` racine : `apps/*` et `packages/*`.
- **Next.js ^16.0.7** (16.0.10 installé), **React 19.1.2**, **TypeScript ^5**.
- Deux applications :
  - `apps/web` — le site public, port de dev **3001**
  - `apps/setter` — landing « Setter IA Instagram », port de dev **3002**
- Deux paquets :
  - `packages/brand` — `@synapsis/brand`, le design system en CSS (1 960 lignes)
  - `packages/config` — `tsconfig.base.json` partagé

## 2. App Router ou Pages Router, TypeScript ou JavaScript

**App Router**, `apps/web/src/app/`. **TypeScript strict** (`strict: true` dans
`apps/web/tsconfig.json` et dans `packages/config/tsconfig.base.json`).

Deux réglages Next actifs qui ont des conséquences directes sur le code à écrire
(`apps/web/next.config.ts`) :

- `typedRoutes: true` — les `href` sont typés. Toute route dynamique construite à la
  volée doit être castée (`as Route`), le dépôt le fait déjà partout dans `/admin`.
- `reactCompiler: true` — compilateur React activé.

## 3. Style, design system, composants réutilisables

Il existe un design system, écrit, documenté et déjà partagé. **À réutiliser, pas à
réinventer** (la spec le demande, et c'est faisable ici sans effort).

- `packages/brand/synapsis.css` — thème crème / orange, variables CSS
  (`--cream #faf6ef`, `--ink #231d16`, `--orange #e8500f`, `--line`, `--ok`…),
  classes utilitaires `s-*` : `s-wrap`, `s-btn` / `s-btn-primary` / `s-btn-ghost`,
  `s-card`, `s-eyebrow`, `s-blk`, `s-steps`, `s-faq-*`, `s-price-*`…
  Déjà consommé par `apps/setter`.
- `apps/web/src/index.css` — la même chose, dupliquée, dans l'app web (le paquet
  `brand` est l'extraction récente, `apps/web` n'a pas encore été basculé dessus).
- `apps/web/src/styles/site.module.css` — 3 162 lignes de CSS Modules, la direction
  artistique « grand livre » des pages publiques. Spécifique au site vitrine,
  **sans intérêt pour un outil de saisie**.
- Disponibles côté composants : **Tailwind v4** (`@tailwindcss/postcss`),
  **Radix UI**, **lucide-react**, **sonner** (toasts), `components.json` de shadcn.
- La doctrine graphique du site est écrite dans `docs/plan-site.md`, section 7.

Conséquence pour l'interface de pilotage : la palette et les boutons `s-btn` donnent
une base cohérente immédiate. Le back-office existant (`apps/web/src/app/admin/`) est
d'ailleurs écrit exactement comme ça — classes `s-*` plus quelques styles en ligne.

## 4. Authentification existante

Il y en a une, minimale, et **ce n'est pas `better-auth`** malgré les variables
d'environnement `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` : le paquet n'est ni installé
ni importé nulle part (vestiges du starter « better-t-stack »).

Ce qui existe réellement, pour `/admin` :

- `apps/web/src/middleware.ts` — `matcher: ["/admin/:path*"]`, redirige vers
  `/admin/login` si le cookie `admin_session` ne vaut pas `process.env.ADMIN_PASSWORD`.
- `apps/web/src/app/admin/actions.ts:18-36` — `login()` compare le mot de passe posté
  à `ADMIN_PASSWORD`, puis **stocke le mot de passe lui-même comme valeur du cookie**
  (`httpOnly`, `secure` en prod, `sameSite: lax`, 30 jours).

**Signalement de sécurité** (la spec me demande de signaler, pas d'imiter) : mettre le
secret partagé dans le cookie, c'est le dupliquer à chaque requête et à chaque
sauvegarde de session du navigateur ; il n'y a ni signature, ni expiration côté
serveur, ni limitation du nombre d'essais sur le formulaire. C'est tolérable pour un
suivi d'onboarding. Ça ne l'est pas pour une interface qui porte un token d'accès
total au CRM. Pour la nouvelle interface je propose une session signée (HMAC, cookie
opaque) ou un simple `Basic auth` au niveau du reverse proxy si l'on part sur le VPS —
**à arbitrer**, et je ne touche pas à l'existant sans demande.

## 5. Sources de données déjà branchées, et où sont les clés

Fichier d'environnement : **`apps/web/.env`** (avec `apps/web/.env.example` à jour,
les deux listant les mêmes clés). `.env` est bien couvert par le `.gitignore` racine.
Clés présentes :

| Clé | Usage réel |
|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | `src/lib/supabase-admin.ts`, `src/lib/admin-clients.ts` — table des clients en onboarding, lue uniquement côté serveur |
| `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` | `src/lib/leads.ts` — envoi des leads du diagnostic **à n8n**, en-tête `X-Webhook-Secret`, timeout 10 s, réponse attendue avant de confirmer au visiteur |
| `ADMIN_PASSWORD` | l'authentification décrite ci-dessus |
| `BETTER_AUTH_*`, `CORS_ORIGIN` | inutilisés |

**NocoDB n'est branché nulle part dans le code.** La seule mention du dépôt est un
commentaire en tête de `src/lib/leads.ts` : le site envoie à n8n, et **c'est n8n qui
écrit dans NocoDB**. Aucune variable `NOCODB_*` n'existe. Aucune clé n'est exposée
côté navigateur (pas un seul `NEXT_PUBLIC_` sensible) : sur ce point l'existant est
sain et donne le bon modèle à suivre.

À noter : `src/lib/leads.ts` est déjà exactement le patron demandé par la spec pour les
webhooks n8n — URL en variable d'environnement, absence de configuration traitée comme
une erreur explicite et non comme une panne, payload à plat. Je m'en inspirerai.

## 6. Pages existantes

**Site public** — `/`, `/diagnostic`, `/offres`, `/methode`, `/deroulement`,
`/rendez-vous`, `/mentions-legales`, `/politique-confidentialite`, plus
`/archive-accueil` et `/archive-accueil-v2` (anciennes versions d'accueil, en
`noindex`) et deux pages légales d'une app tierce (`/privacy-policy-tracker-app`,
`/terms-of-service-tracker`).

**Back-office existant** — `/admin` (liste des clients : nom, type d'automatisation,
étape, notes, lien d'onboarding), `/admin/login`, `/admin/clients/new`,
`/admin/clients/[id]/edit`. Données dans **Supabase**, pas NocoDB.

**Espace client** — `/onboarding/[urlSlug]` et `/onboarding/[urlSlug]/remplir`.

**Aucun Route Handler** (`route.ts`) n'existe aujourd'hui : tout passe par des Server
Actions. À décider pour la nouvelle interface — Route Handlers (comme le demande la
spec) ou Server Actions (comme fait le reste du dépôt). Les deux gardent le token
côté serveur ; les Server Actions seraient plus homogènes avec l'existant.

## 7. Déploiement

**Vercel, pas de VPS.**

- `vercel.json` racine : `framework: nextjs`, build `npm run build`.
- `apps/setter/vercel.json` : build filtré via Turborepo (`turbo build --filter=setter`).
- `push.ps1` à la racine : `git add -A` + commit + `git push origin main`, et son
  propre message le dit — « Vercel va detecter le push et deployer automatiquement ».
- Pas de script de redémarrage, pas de conteneur, rien qui ressemble à un VPS.

Le VPS existe bien quelque part — `nocodb.mysynapsis.fr` répond — mais **rien dans ce
dépôt ne le déploie**. Si l'interface doit y tourner, tout est à construire.

## 8. Tests, linter, formateur

**Aucun des trois.** Pas d'ESLint, pas de Biome, pas de Prettier, pas de Vitest ni de
Jest. `turbo.json` déclare des tâches `lint` et `check-types`, mais aucune app ne les
implémente : `apps/web/package.json` n'a que `dev`, `build`, `start`.

Le seul filet de sécurité disponible est `npx tsc --noEmit` et `next build`. Pour un
outil qui écrit dans le CRM, je recommande d'ajouter au minimum un `check-types` par
app et quelques tests sur la couche d'accès aux données (transformation des filtres,
règle d'opt-out, calcul des échéances). **À arbitrer** : ça ajoute une dépendance de
test au dépôt, ce n'est pas neutre.

---

## Écarts entre la spec et le dépôt

1. **Dépôt et hébergement** — la spec suppose un dépôt dédié sur VPS ; ici c'est le
   site public sur Vercel. Décision structurante, section 0.
2. **Aucun accès NocoDB configuré** — pas de token, pas de variable, aucun appel. La
   spec demande de vérifier les schémas avant de coder : je ne peux pas. Voir plus bas.
3. **Le serveur MCP NocoDB est déclaré mais tombe en erreur** (404, « No MCP endpoint
   was found at the URL provided »). Il n'aurait de toute façon pas remplacé le token
   côté application, mais il aurait servi à l'inspection. À réparer ou à ignorer.
4. **Authentification** — l'existant stocke le mot de passe en clair dans le cookie,
   sans signature ni limitation d'essais. À ne pas reproduire pour cette interface.
5. **Deux back-offices, deux bases** — `/admin` (Supabase : clients livrés, onboarding)
   et l'interface à construire (NocoDB : pipeline commercial) manipuleront chacun une
   notion de « client » dans un magasin différent. Ce n'est pas bloquant, mais il faudra
   décider un jour si l'un absorbe l'autre. Je ne fais rien de ce côté sans consigne.
6. **Ni linter, ni tests** — voir question 8.
7. **Hors sujet mais trouvé en passant** : le `vercel.json` racine contient
   `"rewrites": [{ "source": "/(.*)", "destination": "/" }]`. Sur Vercel les rewrites
   s'appliquent après le système de fichiers, donc les vraies routes ne sont pas
   cassées — mais toute URL inexistante renvoie l'accueil en HTTP 200 au lieu d'un 404.
   Signalé, non corrigé : hors périmètre.

---

## Vérification NocoDB : ce que j'ai pu faire sans token

| Test | Résultat |
|---|---|
| `GET /api/v2/tables/mejsahr6spv1x10/records?limit=1` | **HTTP 401** — l'instance répond, l'API v2 existe, il manque l'authentification |
| `GET /api/v2/meta/tables/mejsahr6spv1x10` | **HTTP 401** — idem |
| `GET /` (racine) | **HTTP 200** (dashboard). La spec annonçait une 302 vers `/sign_in` ; détail sans conséquence, le préfixe `/api/v2` est bien le bon |

**Ce qui reste impossible sans token, et qui bloque la suite :**

- Vérifier les schémas des cinq tables contre la section 2 de la spec (champs
  réellement présents, noms exacts, valeurs exactes des listes).
- Vérifier l'existence du champ **`Mode`** sur `Relances` (point ouvert n° 4 de la spec).
- Trancher le **format d'écriture des champs liés** : `Id` direct dans le champ de lien,
  ou appel séparé sur `/api/v2/tables/{tableId}/links/{linkFieldId}/records/{recordId}`.
  La spec demande de tester les deux sur un enregistrement jetable : c'est exactement ce
  que je ferai dès que j'aurai le token, avant d'écrire quoi que ce soit d'autre.
- Vérifier si l'exclusion d'opt-out est exprimable dans un `where` NocoDB en traversant
  un lien (`Contacts.Opt_out` depuis `Opportunites`). Si ce n'est pas possible — c'est
  mon hypothèse — la règle absolue de la section 5 devra se faire en deux temps dans la
  couche d'accès (résoudre les contacts, puis filtrer), ou reposer sur un champ
  dénormalisé alimenté par n8n. **C'est le point technique que je veux valider en
  premier**, parce qu'il conditionne la forme de toute la couche de données.

---

## Points ouverts de la section 6 : mes recommandations

Je propose, je ne crée rien.

**Réponses du formulaire de qualification → un champ `Qualification` (texte long) sur
`Opportunites`.** L'interaction dédiée est plus « pure » mais oblige, à chaque
affichage, à fouiller le journal en cherchant un couple canal + issue ; c'est fragile
et ça coûte une requête de plus au moment précis où tu ouvres un audit. Un champ se lit
avec l'opportunité, s'affiche sans condition, et se pré-remplit trivialement par n8n.
Inconvénient assumé : une seconde réservation écrase la première déclaration — ce qui
est plutôt le comportement souhaitable. Si tu veux garder l'historique, le plus simple
est que n8n fasse **les deux** (le champ pour l'affichage, une interaction pour la
trace).

**Compteur d'essais injoignables → calcul à la volée, pas de champ.** La file d'appel
charge déjà le journal des interactions de la fiche (la spec l'exige pour afficher la
note du dernier appel). Compter les `Injoignable` dedans ne coûte donc **aucune requête
supplémentaire**. Un champ stocké, lui, se désynchronise dès qu'une interaction est
corrigée ou supprimée à la main dans NocoDB, et il faudrait le maintenir depuis deux
endroits (l'interface et n8n).

**Distinction RDV1 / RDV2 → ne jamais deviner en silence.** Ordre de résolution que je
propose : (1) la relance `Rappel RDV` à l'origine de l'écran si elle existe, (2) le
statut de l'opportunité, (3) à défaut, le nombre de rendez-vous déjà tenus dans le
journal (canal `RDV visio` / `RDV physique`) : zéro → audit, un ou plus → vente. Et
dans tous les cas, l'écran affiche deux boutons **« Audit (RDV1) » / « Vente (RDV2) »**
pré-sélectionnés sur la meilleure hypothèse, modifiables d'un clic. Si une étape a été
sautée, tu corriges au lieu de subir.

**Champ `Mode` sur `Relances`** → invérifiable sans token. Je te le confirmerai avant
de construire l'écran 4.4, qui en dépend entièrement.

---

## Deux objections techniques, avant de coder

**« Écritures atomiques » n'est pas réalisable au sens strict.** NocoDB REST n'a pas de
transaction : une issue d'appel, c'est jusqu'à trois écritures (interaction, relance,
statut de l'opportunité). Ce que je peux garantir, et qui correspond à la formulation de
la spec (« atomique **du point de vue de l'utilisateur** ») : exécution séquentielle,
compensation en cas d'échec en cours de route (on annule ce qui a déjà été écrit), rien
n'avance dans la file tant que tout n'est pas confirmé, et message d'erreur explicite.
Je le dis d'emblée pour que ce ne soit pas une surprise.

**La file d'attente locale hors-ligne a besoin d'une clé d'idempotence.** Rejouer une
écriture après une coupure réseau, sans marqueur, crée des doublons d'interactions —
typiquement quand la requête est passée mais que la réponse s'est perdue. Il faut soit
un identifiant unique généré côté client et stocké dans un champ de `Interactions`
(un champ de plus, donc ton arbitrage), soit une déduplication au moment du rejeu sur
(opportunité + date à la seconde + issue). **Dis-moi lequel tu préfères** : la première
est fiable, la seconde évite un champ.

---

## Ce qu'il me faut pour passer à l'étape suivante

1. **La décision de la section 0** : où vit et où se déploie cette interface.
2. **Un token NocoDB** (`xc-token`), et l'endroit où le mettre : nouveau `.env` de la
   nouvelle app, ou fichier existant. Ne me le colle pas dans le chat si tu peux
   l'écrire directement dans le fichier d'environnement — dis-moi juste où.
3. **Tes arbitrages** sur les quatre points de la section 6 et les deux objections
   ci-dessus.
4. Accessoirement : veux-tu des **Route Handlers** (spec) ou des **Server Actions**
   (convention du dépôt) ? Et acceptes-tu l'ajout d'un linter et de quelques tests ?

Dès que 1 et 2 sont réglés, l'étape suivante est la vérification des schémas des cinq
tables contre la section 2, plus le test des champs liés sur un enregistrement jetable —
et je reviens vers toi avec le résultat avant d'écrire la couche d'accès.
