import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const locales = ['en', 'it', 'es', 'pt', 'de', 'fr'];
const routes = {
  en: ['/en/', '/en/privacy/', '/en/cookies/'],
  it: ['/', '/privacy/', '/cookies/'],
  es: ['/es/', '/es/privacy/', '/es/cookies/'],
  pt: ['/pt/', '/pt/privacy/', '/pt/cookies/'],
  de: ['/de/', '/de/privacy/', '/de/cookies/'],
  fr: ['/fr/', '/fr/privacy/', '/fr/cookies/'],
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
    if ((html.match(/rel="alternate" hreflang=/g) ?? []).length !== 7) failures.push(`${route}: incomplete hreflang set`);
    if ((html.match(/data-language="/g) ?? []).length !== 6) failures.push(`${route}: incomplete language picker`);
    if (!/<title>[^<]+<\/title>/.test(html) || !/<meta name="description" content="[^"]+">/.test(html)) failures.push(`${route}: missing search metadata`);
    const jsonLd = html.match(/<script type="application\/ld\+json">(.+)<\/script>/)?.[1];
    try { JSON.parse(jsonLd); } catch { failures.push(`${route}: invalid JSON-LD`); }
    if (/[ÃÂ]|â(?:€|™|œ|ž)/.test(html)) failures.push(`${route}: possible encoding corruption`);
  }
  const manifest = JSON.parse(await readFile(path.join(root, locale === 'it' ? 'site.webmanifest' : `${locale}/site.webmanifest`), 'utf8'));
  if (manifest.lang !== locale || manifest.start_url !== routes[locale][0]) failures.push(`${locale}: invalid manifest localization`);
}

const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
if ((sitemap.match(/<url>/g) ?? []).length !== 18) failures.push('sitemap: expected 18 URLs');
for (const locale of locales) {
  for (const route of routes[locale]) {
    if (!sitemap.includes(`<loc>https://aurapvp.app${route}</loc>`)) failures.push(`sitemap: missing ${route}`);
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
  console.log('Locale checks passed: 18 pages, 6 manifests, reciprocal hreflang, metadata, JSON-LD, sitemap and assets.');
}
