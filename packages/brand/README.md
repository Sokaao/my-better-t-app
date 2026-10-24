# @synapsis/brand

Source unique du design system Synapsis (palette creme/orange, classes `s-*`,
motifs terminal / callout violet / bloc mono).

`synapsis.css` a ete extrait verbatim de `apps/web/src/index.css` (lignes 132-2091
au moment de l'extraction, le 2026-09-08).

## Qui l'utilise

- `apps/setter` : import direct en tete de `src/index.css`.
- `apps/web` : **pas encore migre**, garde sa copie inline. Voir ci-dessous.

## Migrer apps/web (non fait, a valider)

`apps/web/src/index.css` contient, avant le design system :

```css
html,
body {
  @apply bg-white;
}
```

En CSS, `@import` doit preceder toute autre regle. Deplacer le design system en
tete de fichier le ferait donc passer *avant* cette regle, qui gagnerait la
cascade : le `background: var(--cream)` du `body` serait ecrase et tout le site
passerait en fond blanc.

La migration suppose donc de supprimer aussi cette regle `bg-white`, et de
verifier les pages qui s'appuient dessus (`/admin`, `/onboarding`). C'est un
changement a tester page par page, volontairement laisse de cote.
