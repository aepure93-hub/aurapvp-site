# AuraPvP landing page

Landing statica ufficiale di AuraPvP, pubblicata su `aurapvp.app` in inglese,
italiano, spagnolo, portoghese, tedesco e francese.

Il sito non usa tracker, moduli o dipendenze esterne. La lingua iniziale segue
le preferenze del browser e la selezione manuale viene conservata localmente.

## Localizzazione

Le pagine localizzate, i manifest e la sitemap vengono generati dalla sorgente
unica in `scripts/generate-locales.mjs`.

```sh
node scripts/generate-locales.mjs
node scripts/check-locales.mjs
```

## Asset SEO

L'anteprima social è mantenuta come SVG sorgente e pubblicata come PNG 1200×630.
La favicon standard viene generata dal PNG 64×64 già approvato.

```sh
npx sharp-cli -i assets/aurapvp-live-battle-social-preview.svg -o assets/aurapvp-live-battle-social-preview-1200x630.png -f png
npx sharp-cli -i assets/aurapvp-real-world-pvp-app-icon-512.png resize 96 96 -o assets/aurapvp-aura-battle-favicon-96.png
node scripts/generate-favicon.mjs
```
