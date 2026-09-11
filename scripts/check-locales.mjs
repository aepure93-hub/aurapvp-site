import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const locales = ['en', 'it', 'es', 'pt', 'de', 'fr'];
const routes = {
  en: ['/en/', '/en/privacy/', '/en/cookies/', '/en/terms/', '/en/account-deletion/'],
  it: ['/', '/privacy/', '/cookies/', '/terms/', '/account-deletion/'],
  es: ['/es/', '/es/privacy/', '/es/cookies/', '/es/terms/', '/es/account-deletion/'],
  pt: ['/pt/', '/pt/privacy/', '/pt/cookies/', '/pt/terms/', '/pt/account-deletion/'],
  de: ['/de/', '/de/privacy/', '/de/cookies/', '/de/terms/', '/de/account-deletion/'],
  fr: ['/fr/', '/fr/privacy/', '/fr/cookies/', '/fr/terms/', '/fr/account-deletion/'],
};

const failures = [];
const diskPath = (route) => route === '/'
  ? path.join(root, 'index.html')
  : path.join(root, route.replace(/^\//, ''), 'index.html');

for (const locale of locales) {
  for (const route of routes[locale]) {
    const file = diskPath(route);
    const html = await readFile(file, 'utf8');
    if (!html.includes(`<html lang="${locale}">`)) failures.push(`${route}: wrong html lang`);
    if (!html.includes(`<link rel="canonical" href="https://aurapvp.app${route}">`)) failures.push(`${route}: wrong canonical`);
    const isHome = route === routes[locale][0];
    const hreflangCount = (html.match(/rel="alternate" hreflang=/g) ?? []).length;
    const isCookie = route.includes('/cookies/') || route === '/cookies/';
    if (!isCookie && hreflangCount !== 7) failures.push(`${route}: incomplete hreflang set`);
    if (isCookie && hreflangCount !== 0) failures.push(`${route}: noindex page should not declare hreflang`);
    if ((html.match(/data-language="/g) ?? []).length !== 6) failures.push(`${route}: incomplete language picker`);
    if (!/<title>[^<]+<\/title>/.test(html) || !/<meta name="description" content="[^"]+">/.test(html)) failures.push(`${route}: missing search metadata`);
    if (isHome && !html.includes('name="robots" content="index,follow,max-image-preview:large"')) failures.push(`${route}: home must be indexable`);
    if (!isHome && !isCookie && !html.includes('name="robots" content="index,follow"')) failures.push(`${route}: public legal page must be indexable`);
    if (isCookie && !html.includes('name="robots" content="noindex,follow"')) failures.push(`${route}: cookie page must be noindex`);
    if (isHome && !html.includes('twitter:card" content="summary_large_image"')) failures.push(`${route}: missing large social card`);
    if (isHome && !html.includes('og:image:width" content="1200"')) failures.push(`${route}: wrong social image dimensions`);
    const jsonLd = html.match(/<script type="application\/ld\+json">(.+)<\/script>/)?.[1];
    try { JSON.parse(jsonLd); } catch { failures.push(`${route}: invalid JSON-LD`); }
    if (/[ÃÂ]|â(?:€|™|œ|ž)/.test(html)) failures.push(`${route}: possible encoding corruption`);
  }
  const manifest = JSON.parse(await readFile(path.join(root, locale === 'it' ? 'site.webmanifest' : `${locale}/site.webmanifest`), 'utf8'));
  if (manifest.lang !== locale || manifest.start_url !== routes[locale][0]) failures.push(`${locale}: invalid manifest localization`);
}

const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
if ((sitemap.match(/<url>/g) ?? []).length !== 6) failures.push('sitemap: expected 6 indexable URLs');
for (const locale of locales) {
  const route = routes[locale][0];
  if (!sitemap.includes(`<loc>https://aurapvp.app${route}</loc>`)) failures.push(`sitemap: missing ${route}`);
  for (const legalRoute of routes[locale].slice(1)) {
    if (sitemap.includes(`<loc>https://aurapvp.app${legalRoute}</loc>`)) failures.push(`sitemap: noindex URL included ${legalRoute}`);
  }
}

const internalFiles = new Set();
for (const locale of locales) {
  for (const route of routes[locale]) {
    const html = await readFile(diskPath(route), 'utf8');
    for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
      const target = match[1].split(/[?#]/)[0];
      if (!target || target.endsWith('/')) continue;
      internalFiles.add(target);
    }
  }
}
for (const target of internalFiles) {
  try { await access(path.join(root, target.replace(/^\//, ''))); } catch { failures.push(`missing internal asset: ${target}`); }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Locale checks passed: 30 pages, 6 manifests, reciprocal hreflang, metadata, JSON-LD, sitemap and assets.');
}
