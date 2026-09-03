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
