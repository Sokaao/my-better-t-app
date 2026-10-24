# setter.mysynapsis.fr

Landing page unique du setter IA Instagram. Une seule conversion : la prise de
rendez-vous pour l'appel de qualification.

Trafic attendu : Instagram (contenu) → cette page → appel de qualification →
appel de vente.

## Lancer en local

```bash
npm run dev:setter        # depuis la racine du monorepo, port 3002
```

## À remplacer avant la mise en production

1. **La conversation de démonstration** — `src/lib/dm-demo.ts`.
   Le contenu actuel est un *scénario illustratif*, pas un échange client. Tant
   que `DM_STATUT` vaut `"exemple"`, la page l'annonce explicitement (nom de
   fichier `exemple-scenario.txt` dans le bandeau + mention sous le bloc).
   Remplacer par un vrai transcript anonymisé, puis passer `DM_STATUT` à
   `"reel"` : la page bascule d'elle-même sur `conversation-anonymisee.txt` et
   sur la mention « échange réel, prénoms et détails modifiés ».

2. **Le lien de rendez-vous** — `src/lib/config.ts`, constante `BOOKING_URL`.
   Pointe aujourd'hui sur le Calendly 30 min existant
   (`calendly.com/synapsis-devis/30min`), le même que sur mysynapsis.fr. À
   changer si un créneau dédié au trafic Instagram est créé, pour distinguer les
   deux sources dans l'agenda.

3. **Vérifier les constantes commerciales** — `src/lib/config.ts` : setup
   1 500 €, acompte 750 €, maintenance 100 €/mois, délai « deux à trois
   semaines ». Ces valeurs sont utilisées à plusieurs endroits de la page (offre,
   étapes, FAQ) mais définies une seule fois ici.

## Déploiement Vercel

Projet Vercel **distinct** de `web`, sur le même dépôt :

- Root Directory : `apps/setter`
- Le reste est déjà dans `vercel.json` (install et build depuis la racine du
  monorepo via turbo).
- Domaine : `setter.mysynapsis.fr` (DNS à ajouter côté Vercel).

## Charte

Le design system vient de `@synapsis/brand` (`packages/brand/synapsis.css`),
extrait de `apps/web/src/index.css`. Ne pas redéfinir de couleur ici : tout passe
par les variables (`--cream`, `--ink`, `--orange-text`, `--violet`, `--line`…).

`src/index.css` ne contient que les motifs de la charte qui n'existaient pas
encore en CSS sur le site : bandeau terminal avec badge ACTIF, callout violet,
fil de conversation DM, calculateur.

## Contraintes de contenu

Pas de témoignage, pas de logo client, pas de chiffre de résultat, pas de cas
d'usage inventé. Les seuls réducteurs de risque de la page sont la démonstration
du produit, la garantie, et la transparence du bloc fondateur. Le calculateur de
la section « problème » ne produit que de l'arithmétique sur les chiffres saisis
par le visiteur — il n'avance aucun résultat obtenu par le setter IA.
