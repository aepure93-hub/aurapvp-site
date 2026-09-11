(() => {
  const localizedRoutes = {
    '/': { en: '/en/', it: '/', es: '/es/', pt: '/pt/', de: '/de/', fr: '/fr/' },
    '/privacy/': { en: '/en/privacy/', it: '/privacy/', es: '/es/privacy/', pt: '/pt/privacy/', de: '/de/privacy/', fr: '/fr/privacy/' },
    '/terms/': { en: '/en/terms/', it: '/terms/', es: '/es/terms/', pt: '/pt/terms/', de: '/de/terms/', fr: '/fr/terms/' },
    '/account-deletion/': { en: '/en/account-deletion/', it: '/account-deletion/', es: '/es/account-deletion/', pt: '/pt/account-deletion/', de: '/de/account-deletion/', fr: '/fr/account-deletion/' },
    '/cookies/': { en: '/en/cookies/', it: '/cookies/', es: '/es/cookies/', pt: '/pt/cookies/', de: '/de/cookies/', fr: '/fr/cookies/' },
  };
  const routes = localizedRoutes[window.location.pathname];
  if (!routes) return;

  let selected = null;
  try {
    const saved = localStorage.getItem('aurapvp-language');
    if (saved && routes[saved]) selected = saved;
  } catch {
    // Fall back to the browser language when storage is unavailable.
  }

  if (!selected) {
    const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
    selected = browserLanguages
      .map((language) => language?.toLowerCase().split('-')[0])
      .find((language) => routes[language]) || 'en';
  }

  if (selected && selected !== 'it') {
    window.location.replace(`${routes[selected]}${window.location.search}${window.location.hash}`);
  }
})();
