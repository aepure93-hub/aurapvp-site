import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://aurapvp.app';
const locales = ['en', 'it', 'es', 'pt', 'de', 'fr'];

const localeMeta = {
  en: { name: 'English', flag: '🇬🇧', og: 'en_US', home: '/en/', privacy: '/en/privacy/', cookies: '/en/cookies/' },
  it: { name: 'Italiano', flag: '🇮🇹', og: 'it_IT', home: '/', privacy: '/privacy/', cookies: '/cookies/' },
  es: { name: 'Español', flag: '🇪🇸', og: 'es_ES', home: '/es/', privacy: '/es/privacy/', cookies: '/es/cookies/' },
  pt: { name: 'Português', flag: '🇵🇹', og: 'pt_PT', home: '/pt/', privacy: '/pt/privacy/', cookies: '/pt/cookies/' },
  de: { name: 'Deutsch', flag: '🇩🇪', og: 'de_DE', home: '/de/', privacy: '/de/privacy/', cookies: '/de/cookies/' },
  fr: { name: 'Français', flag: '🇫🇷', og: 'fr_FR', home: '/fr/', privacy: '/fr/privacy/', cookies: '/fr/cookies/' },
};

const copy = {
  en: {
    seo: {
      title: 'AuraPvP — Live challenges. Farm Aura.',
      description: 'AuraPvP brings Aura Battles into the real world: live 1v1 challenges, verified spectators and result-based rankings.',
      social: 'Two people. One real place. The verified crowd decides who farmed more Aura.',
      imageAlt: 'AuraPvP logo for live real-world Aura Battles',
    },
    ui: { skip: 'Skip to content', homeAria: 'AuraPvP, back to the top', menu: 'Open menu', language: 'Choose language' },
    nav: ['How it works', 'The battle', 'Rankings', 'Plans', 'Coming soon'],
    hero: {
      eyebrow: 'Aura Battles, in the real world', lines: ['Step in.', 'Challenge.', 'Farm Aura.'],
      lede: 'Two people meet face to face. The crowd that is actually there watches, votes and decides who made the biggest impact.',
      primary: 'See how it works', secondary: 'View plans', trust: ['Live', 'Verified presence', 'Unlimited crowd'], visual: 'Preview of an AuraPvP battle',
      location: 'Rome · Piazza del Popolo', progress: 'Battle in progress', present: 'present', remaining: 'Time remaining', start: 'Start 19:35', duration: 'Duration 12 min',
      spectators: '18 verified spectators', minimum: 'Minimum crowd reached', voteOpens: 'Voting opens at the end', question: 'Who farmed more Aura?',
    },
    marquee: ['ONLY PEOPLE THERE CAN VOTE', 'ONE-ON-ONE CHALLENGES', 'PUBLIC PLACES', 'REAL AURA'],
    how: {
      kicker: 'How it works', title: 'The city is your arena.', body: 'No filters, hidden judges or votes from home. A challenge is real only when both participants and the crowd are there.',
      steps: [
        ['Launch the challenge', 'Suggest three public places, three dates and three durations. Your opponent chooses the combination and accepts.', '1 versus 1'],
        ['Show up in person', 'Check-in confirms participants and spectators on site. Presence stays private and is shown only as an aggregate.', 'Verified GPS'],
        ['Let the crowd decide', 'When the battle ends, people who stayed on site vote once. The result appears only after voting closes.', 'Anonymous vote'],
      ],
    },
    battle: {
      kicker: 'A valid battle', title: 'Showing up is not enough.', titleEm: 'The crowd must be there.', body: 'Every match follows transparent rules. If even one condition is missing, the result stays in history but does not change Aura or rankings.',
      requirements: ['verified spectators, excluding participants', 'valid votes when voting closes', 'minimum presence required to vote', 'of public visibility before the start'],
      flow: [['Check-in opens', 'Participants and spectators confirm their presence.'], ['Battle begins', 'No voting and no partial results.'], ['Voting opens', 'A short window and one choice only.'], ['Result and Aura', 'Rating, Aura Farmed, league and ranking update.']],
      official: 'Official question', or: 'or',
    },
    ratings: {
      kicker: 'Two numbers, two stories', title: 'Build your Aura.', body: 'Competition measures the moment. History remembers the whole journey.', competitive: 'Competitive', history: 'History',
      ratingTitle: 'Aura Rating', ratingBody: 'Moves up or down based on the result, opponent, vote share and verified crowd.',
      farmedTitle: 'Aura Farmed', farmedBody: 'All the Aura collected over time. It reflects votes, crowd and activity, and never goes down.', allTime: 'all time',
      leagues: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Aura Legend'], where: 'How far will you go?', rankingTitle: 'From your area to the global leaderboard.', scopes: ['Area', 'City', 'Region', 'Country', 'Global'],
    },
    fair: {
      kicker: 'Fair competition', title: 'Aura is earned.', title2: 'It cannot be bought.', body: 'A plan never makes a vote more important and never sells wins, boosts or protection from Rating loss.',
      labels: ['No votes from home', 'No pay-to-win', 'Private location'], checks: ['Participants cannot vote', 'Individual votes stay anonymous', 'Public, verified places', 'Checks against anomalies and manipulation'],
    },
    plans: {
      kicker: 'Launch plans', title: 'The crowd has no limits.', body: 'Everyone can watch, follow and vote for free. Plans change how many battles you can organize or accept and the level of statistics.',
      freePrice: '€0', freeFreq: 'free plan', freeBody: 'Enter the arena and start building your profile.', freeFeatures: ['2 battles organized / month', '2 battles accepted / month', 'Essential statistics', 'Standard result card', 'Unlimited spectators and votes'],
      popular: 'More flexibility', basePrice: '€2.99', perMonth: 'per month', baseBody: 'For more challenges, more data and cards without a watermark.', baseFeatures: ['3 battles organized / month', '3 battles accepted / month', 'Advanced statistics', 'Total monthly social clicks', 'Rollover of 1+1 credits'],
      proPrice: '€5.99', proBody: 'For people who live the competition and want every detail.', proFeatures: ['6 battles organized / month', '6 battles accepted / month', 'Complete statistics', 'Animated, customizable cards', 'Rollover of 2+2 credits'],
      soon: 'Coming soon', note: 'Planned launch prices may change before the service becomes available. No purchase is currently available.',
    },
    faq: {
      kicker: 'Frequently asked questions', title: 'Before entering the arena.', items: [
        ['Is it a beauty contest?', 'No. AuraPvP focuses on presence, style, safety, performance and the ability to engage the crowd during a live match.'],
        ['Can I vote from home?', 'No. Only people who checked in, stayed in the valid area for at least 70% of the battle and are still present when voting opens can vote.'],
        ['Can other people see my location?', 'No. Location is used only to verify presence at the event. Everyone else sees aggregate counts only.'],
        ['Does paying increase the Aura I earn?', 'No. Plans add battle credits, statistics and sharing options, but never change vote weight or the competitive result.'],
        ['What happens if the minimum crowd is not reached?', 'The battle can finish and remain in history, but it is marked invalid and does not change Rating, Aura Farmed, league or ranking.'],
      ],
    },
    cta: { kicker: 'In development', title: 'Your next challenge will not be behind a screen.', body: 'AuraPvP is in development. This is only the entrance to the arena.', badges: ['Real presence', 'Verified votes'] },
    footer: { tagline: 'Live Aura Battles. Real presence. Verified votes.', privacy: 'Privacy', cookies: 'Cookies', development: 'Product in development · International' },
    legal: {
      siteNotice: 'Website notice', back: 'Back to home', lastUpdated: 'Last updated: 3 September 2026.',
      privacy: {
        title: 'Privacy — AuraPvP', description: 'Privacy notice for the AuraPvP informational website.', intro: 'This notice applies only to the informational website <strong>aurapvp.app</strong>. The AuraPvP app is still in development and is not available through this website.',
        note: '<strong>In short:</strong> the website has no accounts, forms, newsletters, payments, advertising or behavioural analytics.',
        sections: [
          ['Data collected directly', 'The website does not ask for or directly collect your name, email, location or other personal data. You cannot create an account or take part in a battle from this website.'],
          ['Technical browsing data', 'As with any website, the hosting provider and network operators may process technical data needed to deliver pages and protect the service, such as IP address, request date and time, browser type and requested resource. AuraPvP does not use this data for profiling or advertising.'],
          ['Language preference', 'If you choose a language, the website stores that preference locally in your browser under <strong>aurapvp-language</strong>. It is used only to reopen the website in your chosen language and is not sent to AuraPvP.'],
          ['External services', 'Pages do not load third-party fonts, videos, maps, social widgets or trackers. The website is published through GitHub Pages; related technical processing is governed by the provider’s notices.'],
          ['App privacy', 'Before the app launches, a separate and complete notice will be published covering accounts, social connections, presence verification during battles, voting and data retention.'],
          ['Updates', `This page will be updated if the website adds new features or changes how data is handled. Last updated: 3 September 2026.`],
        ],
      },
      cookies: {
        title: 'Cookies — AuraPvP', description: 'Cookie and local storage notice for the AuraPvP website.', intro: 'The AuraPvP informational website is designed to work without tracking or invasive banners.',
        note: '<strong>Current status:</strong> AuraPvP does not set profiling, advertising or analytics cookies and does not use equivalent technologies to track browsing.',
        sections: [
          ['Website cookies', 'The static pages do not set AuraPvP cookies. Navigation and animations work locally without saving browser identifiers.'],
          ['Language preference', 'When you select a language, the website saves the code in your browser’s local storage under <strong>aurapvp-language</strong>. This strictly functional preference is not a cookie, does not identify you and can be removed by clearing site data.'],
          ['Hosting provider', 'The infrastructure that distributes the website may use technical mechanisms strictly necessary for security and correct request routing. AuraPvP does not access any such identifiers for commercial purposes.'],
          ['Future changes', 'If non-essential tools are introduced in future, this notice will be updated and, where required, consent will be requested before they are activated. Last updated: 3 September 2026.'],
        ],
      },
    },
  },
  it: {
    seo: { title: 'AuraPvP — Sfide dal vivo. Farma Aura.', description: 'AuraPvP porta le Aura Battle nel mondo reale: sfide 1 contro 1 dal vivo, pubblico verificato e classifiche basate sui risultati.', social: 'Due persone. Un luogo reale. Il pubblico verificato decide chi ha farmato più Aura.', imageAlt: 'Logo AuraPvP per le Aura Battle dal vivo nel mondo reale' },
    ui: { skip: 'Vai al contenuto', homeAria: "AuraPvP, torna all'inizio", menu: 'Apri il menu', language: 'Scegli la lingua' },
    nav: ['Come funziona', 'La battaglia', 'Classifiche', 'Piani', 'In arrivo'],
    hero: { eyebrow: 'Aura Battle, nel mondo reale', lines: ['Entra.', 'Sfida.', 'Farma Aura.'], lede: 'Due persone si incontrano dal vivo. Il pubblico realmente presente guarda, vota e decide chi ha lasciato il segno.', primary: 'Scopri come funziona', secondary: 'Vedi i piani', trust: ['Dal vivo', 'Presenza verificata', 'Pubblico illimitato'], visual: 'Anteprima di una battaglia AuraPvP', location: 'Roma · Piazza del Popolo', progress: 'Battaglia in corso', present: 'presenti', remaining: 'Tempo rimanente', start: 'Inizio 19:35', duration: 'Durata 12 min', spectators: '18 spettatori verificati', minimum: 'Pubblico minimo raggiunto', voteOpens: 'Il voto si apre alla fine', question: 'Chi ha farmato più Aura?' },
    marquee: ["SOLO CHI C'È PUÒ VOTARE", 'SFIDE UNO CONTRO UNO', 'LUOGHI PUBBLICI', 'AURA REALE'],
    how: { kicker: 'Come funziona', title: 'La città è la tua arena.', body: 'Niente filtri, giudici nascosti o voti da casa. Una sfida esiste davvero solo quando partecipanti e pubblico sono lì.', steps: [['Lancia la sfida', 'Proponi tre luoghi pubblici, tre date e tre durate. Il tuo avversario sceglie la combinazione e accetta.', '1 contro 1'], ['Presentati dal vivo', 'Il check-in conferma partecipanti e spettatori sul posto. La presenza resta privata e viene mostrata solo in forma aggregata.', 'GPS verificato'], ['Lascia parlare il pubblico', 'Finita la battaglia, chi è rimasto presente vota una sola volta. Il risultato appare soltanto alla chiusura.', 'Voto anonimo']] },
    battle: { kicker: 'Una battaglia valida', title: 'Non basta esserci.', titleEm: 'Deve esserci il pubblico.', body: 'Ogni incontro segue regole trasparenti. Se manca anche una condizione, il risultato resta nello storico ma non modifica Aura o classifiche.', requirements: ['spettatori verificati, esclusi i partecipanti', 'voti validi alla chiusura', 'presenza minima per poter votare', "di visibilità pubblica prima dell'inizio"], flow: [['Check-in aperto', 'Partecipanti e pubblico confermano la presenza.'], ['Battaglia iniziata', 'Nessun voto, nessun risultato parziale.'], ['Votazione aperta', 'Una finestra breve, una sola scelta.'], ['Risultato e Aura', 'Rating, Aura Farmed, lega e classifica si aggiornano.']], official: 'Domanda ufficiale', or: 'oppure' },
    ratings: { kicker: 'Due numeri, due storie', title: 'Costruisci la tua Aura.', body: 'La competizione misura il momento. La storia ricorda tutto il percorso.', competitive: 'Competitivo', history: 'Storico', ratingTitle: 'Aura Rating', ratingBody: 'Sale o scende in base a risultato, avversario, percentuale dei voti e pubblico verificato.', farmedTitle: 'Aura Farmed', farmedBody: "Il totale dell'Aura raccolta nel tempo. Racconta voti, pubblico e attività e non diminuisce mai.", allTime: 'totale', leagues: ['Bronzo', 'Argento', 'Oro', 'Platino', 'Diamante', 'Master', 'Aura Legend'], where: 'Dove arrivi?', rankingTitle: 'Dalla tua zona alla classifica globale.', scopes: ['Zona', 'Città', 'Regione', 'Italia', 'Globale'] },
    fair: { kicker: 'Competizione pulita', title: "L'Aura si guadagna.", title2: 'Non si compra.', body: 'Il piano non rende un voto più importante e non vende vittorie, boost o protezioni dalla perdita di Rating.', labels: ['No voti da casa', 'No pay-to-win', 'Posizione privata'], checks: ['I partecipanti non possono votare', 'I singoli voti restano anonimi', 'Luoghi pubblici e verificati', 'Controlli contro anomalie e manipolazioni'] },
    plans: { kicker: 'Piani iniziali', title: 'Il pubblico non ha limiti.', body: 'Tutti possono vedere, seguire e votare gratis. I piani cambiano quante battaglie puoi organizzare o accettare e il livello delle statistiche.', freePrice: '0 €', freeFreq: 'piano gratuito', freeBody: "Per entrare nell'arena e iniziare a costruire il tuo profilo.", freeFeatures: ['2 battaglie organizzate / mese', '2 battaglie accettate / mese', 'Statistiche essenziali', 'Card risultato standard', 'Spettatori e voti illimitati'], popular: 'Più flessibilità', basePrice: '2,99 €', perMonth: 'al mese', baseBody: 'Per chi vuole più sfide, più dati e card senza watermark.', baseFeatures: ['3 battaglie organizzate / mese', '3 battaglie accettate / mese', 'Statistiche avanzate', 'Click social mensili complessivi', 'Riporto di 1+1 crediti'], proPrice: '5,99 €', proBody: 'Per chi vive la competizione e vuole leggere ogni dettaglio.', proFeatures: ['6 battaglie organizzate / mese', '6 battaglie accettate / mese', 'Statistiche complete', 'Card animate e personalizzabili', 'Riporto di 2+2 crediti'], soon: 'In arrivo', note: 'Prezzi di lancio previsti, modificabili prima della disponibilità del servizio. Nessun acquisto è attualmente disponibile.' },
    faq: { kicker: 'Domande frequenti', title: 'Prima di scendere in campo.', items: [['È una gara di bellezza?', 'No. AuraPvP mette al centro presenza, stile, sicurezza, performance e capacità di coinvolgere il pubblico durante un incontro dal vivo.'], ['Posso votare da casa?', "No. Può votare solo chi ha effettuato il check-in, è rimasto nella zona valida per almeno il 70% della battaglia ed è ancora presente all'apertura del voto."], ['La mia posizione è visibile agli altri?', 'No. La posizione serve soltanto a verificare la presenza relativa all’evento. Gli altri vedono esclusivamente conteggi aggregati.'], ["Pagare aumenta l'Aura ottenuta?", 'No. I piani aggiungono crediti battaglia, statistiche e opzioni di condivisione, ma non alterano il peso dei voti o il risultato competitivo.'], ['Cosa succede se non si raggiunge il pubblico minimo?', 'La battaglia può concludersi e restare nello storico, ma viene indicata come non valida e non modifica Rating, Aura Farmed, lega o classifica.']] },
    cta: { kicker: 'In sviluppo', title: 'La tua prossima sfida non sarà dietro uno schermo.', body: "AuraPvP è in sviluppo. Questa è solo l'entrata dell'arena.", badges: ['Presenza reale', 'Voti verificati'] },
    footer: { tagline: 'Aura Battle dal vivo. Presenza reale. Voti verificati.', privacy: 'Privacy', cookies: 'Cookie', development: 'Prodotto in sviluppo · Italia' },
    legal: {
      siteNotice: 'Informativa del sito', back: 'Torna alla home', lastUpdated: 'Ultimo aggiornamento: 3 settembre 2026.',
      privacy: { title: 'Privacy — AuraPvP', description: 'Informativa privacy del sito informativo AuraPvP.', intro: 'Questa informativa riguarda esclusivamente il sito informativo <strong>aurapvp.app</strong>. L’app AuraPvP è ancora in sviluppo e non è disponibile attraverso questo sito.', note: '<strong>In breve:</strong> il sito non contiene account, moduli, newsletter, sistemi di pagamento, pubblicità o strumenti di analisi del comportamento.', sections: [['Dati raccolti direttamente', 'Il sito non chiede né raccoglie direttamente nome, email, posizione o altri dati personali. Non è possibile creare un account o partecipare a una battaglia da questa pagina.'], ['Dati tecnici di navigazione', 'Come per qualsiasi sito web, il fornitore di hosting e gli operatori di rete possono trattare dati tecnici necessari a consegnare le pagine e proteggere il servizio, come indirizzo IP, data e ora della richiesta, tipo di browser e risorsa richiesta. Questi dati non vengono usati da AuraPvP per profilazione o pubblicità.'], ['Preferenza della lingua', 'Se scegli una lingua, il sito salva la preferenza localmente nel browser con il nome <strong>aurapvp-language</strong>. Serve solo a riaprire il sito nella lingua scelta e non viene inviata ad AuraPvP.'], ['Servizi esterni', 'Le pagine non caricano font, video, mappe, social widget o tracker da terze parti. Il sito è pubblicato tramite GitHub Pages; il relativo trattamento tecnico è soggetto alle informative del fornitore.'], ['Privacy dell’app', 'Prima del lancio dell’app sarà pubblicata un’informativa separata e completa, con particolare attenzione ad account, collegamenti social, verifica della presenza durante le battaglie, votazioni e conservazione dei dati.'], ['Aggiornamenti', 'Questa pagina verrà aggiornata se il sito introdurrà nuove funzioni o cambierà modalità di trattamento. Ultimo aggiornamento: 3 settembre 2026.']] },
      cookies: { title: 'Cookie — AuraPvP', description: 'Informativa su cookie e archiviazione locale del sito AuraPvP.', intro: 'Il sito informativo AuraPvP è stato progettato per funzionare senza tracciamento e senza banner invasivi.', note: '<strong>Stato attuale:</strong> AuraPvP non imposta cookie di profilazione, pubblicità o analytics e non utilizza tecnologie equivalenti per seguire la navigazione.', sections: [['Cookie del sito', 'Le pagine statiche non impostano cookie di AuraPvP. Il menu e le animazioni funzionano localmente senza salvare identificatori nel browser.'], ['Preferenza della lingua', 'Quando selezioni una lingua, il sito ne salva il codice nell’archiviazione locale del browser con il nome <strong>aurapvp-language</strong>. Questa preferenza strettamente funzionale non è un cookie, non ti identifica e può essere rimossa cancellando i dati del sito.'], ['Fornitore di hosting', 'L’infrastruttura che distribuisce il sito può usare meccanismi tecnici strettamente necessari alla sicurezza e al corretto instradamento delle richieste. AuraPvP non accede a tali eventuali identificatori per finalità commerciali.'], ['Modifiche future', 'Se in futuro verranno introdotti strumenti non essenziali, questa informativa sarà aggiornata e, quando richiesto, verrà chiesto il consenso prima della loro attivazione. Ultimo aggiornamento: 3 settembre 2026.']] },
    },
  },
};

// Locale dictionaries added below are deliberately complete: generated pages never fall back
// to another language, which keeps visible copy and search metadata consistent.
copy.es = {
  seo: { title: 'AuraPvP — Desafíos en vivo. Farmea Aura.', description: 'AuraPvP lleva las Aura Battles al mundo real: desafíos 1 contra 1 en vivo, público verificado y clasificaciones basadas en resultados.', social: 'Dos personas. Un lugar real. El público verificado decide quién farmeó más Aura.', imageAlt: 'Logo de AuraPvP para Aura Battles en vivo en el mundo real' },
  ui: { skip: 'Ir al contenido', homeAria: 'AuraPvP, volver al inicio', menu: 'Abrir el menú', language: 'Elegir idioma' }, nav: ['Cómo funciona', 'La batalla', 'Clasificaciones', 'Planes', 'Próximamente'],
  hero: { eyebrow: 'Aura Battles, en el mundo real', lines: ['Entra.', 'Desafía.', 'Farmea Aura.'], lede: 'Dos personas se encuentran en vivo. El público que está realmente presente mira, vota y decide quién dejó huella.', primary: 'Descubre cómo funciona', secondary: 'Ver los planes', trust: ['En vivo', 'Presencia verificada', 'Público ilimitado'], visual: 'Vista previa de una batalla AuraPvP', location: 'Roma · Piazza del Popolo', progress: 'Batalla en curso', present: 'presentes', remaining: 'Tiempo restante', start: 'Inicio 19:35', duration: 'Duración 12 min', spectators: '18 espectadores verificados', minimum: 'Público mínimo alcanzado', voteOpens: 'La votación se abre al final', question: '¿Quién farmeó más Aura?' },
  marquee: ['SOLO QUIEN ESTÁ PUEDE VOTAR', 'DESAFÍOS UNO CONTRA UNO', 'LUGARES PÚBLICOS', 'AURA REAL'],
  how: { kicker: 'Cómo funciona', title: 'La ciudad es tu arena.', body: 'Sin filtros, jueces ocultos ni votos desde casa. Un desafío solo existe de verdad cuando participantes y público están allí.', steps: [['Lanza el desafío', 'Propón tres lugares públicos, tres fechas y tres duraciones. Tu rival elige la combinación y acepta.', '1 contra 1'], ['Preséntate en persona', 'El check-in confirma a participantes y espectadores en el lugar. La presencia sigue siendo privada y solo se muestra de forma agregada.', 'GPS verificado'], ['Deja que decida el público', 'Al terminar la batalla, quienes permanecieron presentes votan una sola vez. El resultado solo aparece al cerrar la votación.', 'Voto anónimo']] },
  battle: { kicker: 'Una batalla válida', title: 'No basta con estar.', titleEm: 'El público debe estar.', body: 'Cada encuentro sigue reglas transparentes. Si falta una sola condición, el resultado queda en el historial, pero no modifica el Aura ni las clasificaciones.', requirements: ['espectadores verificados, sin contar participantes', 'votos válidos al cerrar', 'presencia mínima para poder votar', 'de visibilidad pública antes del inicio'], flow: [['Check-in abierto', 'Participantes y público confirman su presencia.'], ['Batalla iniciada', 'Sin votos ni resultados parciales.'], ['Votación abierta', 'Una ventana breve y una sola elección.'], ['Resultado y Aura', 'Se actualizan el Rating, Aura Farmed, liga y clasificación.']], official: 'Pregunta oficial', or: 'o' },
  ratings: { kicker: 'Dos números, dos historias', title: 'Construye tu Aura.', body: 'La competición mide el momento. La historia recuerda todo el recorrido.', competitive: 'Competitivo', history: 'Histórico', ratingTitle: 'Aura Rating', ratingBody: 'Sube o baja según el resultado, el rival, el porcentaje de votos y el público verificado.', farmedTitle: 'Aura Farmed', farmedBody: 'El total de Aura acumulada con el tiempo. Refleja votos, público y actividad, y nunca disminuye.', allTime: 'total', leagues: ['Bronce', 'Plata', 'Oro', 'Platino', 'Diamante', 'Master', 'Aura Legend'], where: '¿Hasta dónde llegarás?', rankingTitle: 'De tu zona a la clasificación global.', scopes: ['Zona', 'Ciudad', 'Región', 'País', 'Global'] },
  fair: { kicker: 'Competición limpia', title: 'El Aura se gana.', title2: 'No se compra.', body: 'Un plan nunca hace que un voto valga más ni vende victorias, boosts o protección frente a la pérdida de Rating.', labels: ['Sin votos desde casa', 'Sin pay-to-win', 'Ubicación privada'], checks: ['Los participantes no pueden votar', 'Los votos individuales son anónimos', 'Lugares públicos y verificados', 'Controles contra anomalías y manipulación'] },
  plans: { kicker: 'Planes iniciales', title: 'El público no tiene límites.', body: 'Todos pueden ver, seguir y votar gratis. Los planes cambian cuántas batallas puedes organizar o aceptar y el nivel de estadísticas.', freePrice: '0 €', freeFreq: 'plan gratuito', freeBody: 'Para entrar en la arena y empezar a construir tu perfil.', freeFeatures: ['2 batallas organizadas / mes', '2 batallas aceptadas / mes', 'Estadísticas esenciales', 'Tarjeta de resultado estándar', 'Espectadores y votos ilimitados'], popular: 'Más flexibilidad', basePrice: '2,99 €', perMonth: 'al mes', baseBody: 'Para quien quiere más desafíos, más datos y tarjetas sin marca de agua.', baseFeatures: ['3 batallas organizadas / mes', '3 batallas aceptadas / mes', 'Estadísticas avanzadas', 'Clics sociales mensuales totales', 'Acumulación de 1+1 créditos'], proPrice: '5,99 €', proBody: 'Para quien vive la competición y quiere conocer cada detalle.', proFeatures: ['6 batallas organizadas / mes', '6 batallas aceptadas / mes', 'Estadísticas completas', 'Tarjetas animadas y personalizables', 'Acumulación de 2+2 créditos'], soon: 'Próximamente', note: 'Los precios de lanzamiento previstos pueden cambiar antes de que el servicio esté disponible. Actualmente no se puede realizar ninguna compra.' },
  faq: { kicker: 'Preguntas frecuentes', title: 'Antes de entrar en la arena.', items: [['¿Es un concurso de belleza?', 'No. AuraPvP se centra en la presencia, el estilo, la seguridad, la actuación y la capacidad de involucrar al público durante un encuentro en vivo.'], ['¿Puedo votar desde casa?', 'No. Solo puede votar quien hizo check-in, permaneció en la zona válida al menos el 70 % de la batalla y sigue presente cuando se abre la votación.'], ['¿Los demás pueden ver mi ubicación?', 'No. La ubicación solo sirve para verificar la presencia en el evento. Los demás ven únicamente recuentos agregados.'], ['¿Pagar aumenta el Aura que obtengo?', 'No. Los planes añaden créditos de batalla, estadísticas y opciones para compartir, pero no alteran el peso de los votos ni el resultado competitivo.'], ['¿Qué ocurre si no se alcanza el público mínimo?', 'La batalla puede terminar y quedar en el historial, pero se marca como no válida y no modifica el Rating, Aura Farmed, la liga ni la clasificación.']] },
  cta: { kicker: 'En desarrollo', title: 'Tu próximo desafío no estará detrás de una pantalla.', body: 'AuraPvP está en desarrollo. Esta es solo la entrada a la arena.', badges: ['Presencia real', 'Votos verificados'] }, footer: { tagline: 'Aura Battles en vivo. Presencia real. Votos verificados.', privacy: 'Privacidad', cookies: 'Cookies', development: 'Producto en desarrollo · Internacional' },
  legal: { siteNotice: 'Aviso del sitio', back: 'Volver al inicio', lastUpdated: 'Última actualización: 3 de septiembre de 2026.', privacy: { title: 'Privacidad — AuraPvP', description: 'Aviso de privacidad del sitio informativo AuraPvP.', intro: 'Este aviso se refiere únicamente al sitio informativo <strong>aurapvp.app</strong>. La app AuraPvP sigue en desarrollo y no está disponible a través de este sitio.', note: '<strong>En resumen:</strong> el sitio no contiene cuentas, formularios, newsletters, pagos, publicidad ni análisis de comportamiento.', sections: [['Datos recogidos directamente', 'El sitio no solicita ni recoge directamente tu nombre, correo electrónico, ubicación u otros datos personales. No es posible crear una cuenta ni participar en una batalla desde esta página.'], ['Datos técnicos de navegación', 'Como en cualquier sitio web, el proveedor de hosting y los operadores de red pueden tratar los datos técnicos necesarios para entregar las páginas y proteger el servicio, como la dirección IP, la fecha y hora de la solicitud, el tipo de navegador y el recurso solicitado. AuraPvP no usa estos datos para crear perfiles ni mostrar publicidad.'], ['Preferencia de idioma', 'Si eliges un idioma, el sitio guarda esa preferencia localmente en el navegador con el nombre <strong>aurapvp-language</strong>. Solo sirve para volver a abrir el sitio en el idioma elegido y no se envía a AuraPvP.'], ['Servicios externos', 'Las páginas no cargan fuentes, vídeos, mapas, widgets sociales ni rastreadores de terceros. El sitio se publica mediante GitHub Pages; el tratamiento técnico correspondiente se rige por los avisos del proveedor.'], ['Privacidad de la app', 'Antes del lanzamiento de la app se publicará un aviso separado y completo sobre cuentas, conexiones sociales, verificación de presencia durante las batallas, votaciones y conservación de datos.'], ['Actualizaciones', 'Esta página se actualizará si el sitio añade nuevas funciones o cambia la forma de tratar los datos. Última actualización: 3 de septiembre de 2026.']] }, cookies: { title: 'Cookies — AuraPvP', description: 'Aviso sobre cookies y almacenamiento local del sitio AuraPvP.', intro: 'El sitio informativo AuraPvP está diseñado para funcionar sin rastreo ni banners invasivos.', note: '<strong>Estado actual:</strong> AuraPvP no instala cookies de perfilado, publicidad o analítica ni utiliza tecnologías equivalentes para seguir la navegación.', sections: [['Cookies del sitio', 'Las páginas estáticas no instalan cookies de AuraPvP. La navegación y las animaciones funcionan localmente sin guardar identificadores en el navegador.'], ['Preferencia de idioma', 'Al seleccionar un idioma, el sitio guarda el código en el almacenamiento local del navegador con el nombre <strong>aurapvp-language</strong>. Esta preferencia estrictamente funcional no es una cookie, no te identifica y puede eliminarse borrando los datos del sitio.'], ['Proveedor de hosting', 'La infraestructura que distribuye el sitio puede utilizar mecanismos técnicos estrictamente necesarios para la seguridad y el correcto enrutamiento de las solicitudes. AuraPvP no accede a esos posibles identificadores con fines comerciales.'], ['Cambios futuros', 'Si en el futuro se introducen herramientas no esenciales, este aviso se actualizará y, cuando sea necesario, se solicitará el consentimiento antes de activarlas. Última actualización: 3 de septiembre de 2026.']] } },
};

copy.pt = {
  seo: { title: 'AuraPvP — Desafios ao vivo. Farma Aura.', description: 'AuraPvP leva as Aura Battles ao mundo real: desafios 1 contra 1 ao vivo, público verificado e classificações baseadas nos resultados.', social: 'Duas pessoas. Um local real. O público verificado decide quem farmou mais Aura.', imageAlt: 'Logótipo AuraPvP para Aura Battles ao vivo no mundo real' },
  ui: { skip: 'Ir para o conteúdo', homeAria: 'AuraPvP, voltar ao início', menu: 'Abrir o menu', language: 'Escolher idioma' }, nav: ['Como funciona', 'A batalha', 'Classificações', 'Planos', 'Brevemente'],
  hero: { eyebrow: 'Aura Battles, no mundo real', lines: ['Entra.', 'Desafia.', 'Farma Aura.'], lede: 'Duas pessoas encontram-se ao vivo. O público realmente presente vê, vota e decide quem deixou a sua marca.', primary: 'Descobre como funciona', secondary: 'Ver os planos', trust: ['Ao vivo', 'Presença verificada', 'Público ilimitado'], visual: 'Pré-visualização de uma batalha AuraPvP', location: 'Roma · Piazza del Popolo', progress: 'Batalha em curso', present: 'presentes', remaining: 'Tempo restante', start: 'Início 19:35', duration: 'Duração 12 min', spectators: '18 espectadores verificados', minimum: 'Público mínimo atingido', voteOpens: 'A votação abre no final', question: 'Quem farmou mais Aura?' },
  marquee: ['SÓ QUEM ESTÁ PRESENTE PODE VOTAR', 'DESAFIOS UM CONTRA UM', 'LOCAIS PÚBLICOS', 'AURA REAL'],
  how: { kicker: 'Como funciona', title: 'A cidade é a tua arena.', body: 'Sem filtros, jurados escondidos ou votos a partir de casa. Um desafio só existe de verdade quando participantes e público estão no local.', steps: [['Lança o desafio', 'Propõe três locais públicos, três datas e três durações. O adversário escolhe a combinação e aceita.', '1 contra 1'], ['Aparece ao vivo', 'O check-in confirma participantes e espectadores no local. A presença permanece privada e só é mostrada de forma agregada.', 'GPS verificado'], ['Deixa o público decidir', 'Quando a batalha termina, quem permaneceu no local vota uma única vez. O resultado só aparece depois do fecho.', 'Voto anónimo']] },
  battle: { kicker: 'Uma batalha válida', title: 'Não basta estar lá.', titleEm: 'O público tem de estar.', body: 'Cada encontro segue regras transparentes. Se faltar uma única condição, o resultado fica no histórico, mas não altera a Aura nem as classificações.', requirements: ['espectadores verificados, excluindo participantes', 'votos válidos no fecho', 'presença mínima para poder votar', 'de visibilidade pública antes do início'], flow: [['Check-in aberto', 'Participantes e público confirmam a presença.'], ['Batalha iniciada', 'Sem votos nem resultados parciais.'], ['Votação aberta', 'Uma janela curta e uma única escolha.'], ['Resultado e Aura', 'Rating, Aura Farmed, liga e classificação são atualizados.']], official: 'Pergunta oficial', or: 'ou' },
  ratings: { kicker: 'Dois números, duas histórias', title: 'Constrói a tua Aura.', body: 'A competição mede o momento. A história recorda todo o percurso.', competitive: 'Competitivo', history: 'Histórico', ratingTitle: 'Aura Rating', ratingBody: 'Sobe ou desce consoante o resultado, o adversário, a percentagem de votos e o público verificado.', farmedTitle: 'Aura Farmed', farmedBody: 'O total de Aura acumulada ao longo do tempo. Reflete votos, público e atividade e nunca diminui.', allTime: 'total', leagues: ['Bronze', 'Prata', 'Ouro', 'Platina', 'Diamante', 'Master', 'Aura Legend'], where: 'Até onde vais chegar?', rankingTitle: 'Da tua zona à classificação global.', scopes: ['Zona', 'Cidade', 'Região', 'País', 'Global'] },
  fair: { kicker: 'Competição justa', title: 'A Aura conquista-se.', title2: 'Não se compra.', body: 'Um plano nunca torna um voto mais importante e não vende vitórias, boosts ou proteção contra a perda de Rating.', labels: ['Sem votos de casa', 'Sem pay-to-win', 'Localização privada'], checks: ['Os participantes não podem votar', 'Os votos individuais são anónimos', 'Locais públicos e verificados', 'Controlos contra anomalias e manipulação'] },
  plans: { kicker: 'Planos iniciais', title: 'O público não tem limites.', body: 'Todos podem ver, seguir e votar gratuitamente. Os planos alteram quantas batalhas podes organizar ou aceitar e o nível das estatísticas.', freePrice: '0 €', freeFreq: 'plano gratuito', freeBody: 'Para entrar na arena e começar a construir o teu perfil.', freeFeatures: ['2 batalhas organizadas / mês', '2 batalhas aceites / mês', 'Estatísticas essenciais', 'Cartão de resultado standard', 'Espectadores e votos ilimitados'], popular: 'Mais flexibilidade', basePrice: '2,99 €', perMonth: 'por mês', baseBody: 'Para quem quer mais desafios, mais dados e cartões sem marca de água.', baseFeatures: ['3 batalhas organizadas / mês', '3 batalhas aceites / mês', 'Estatísticas avançadas', 'Cliques sociais mensais totais', 'Transporte de 1+1 créditos'], proPrice: '5,99 €', proBody: 'Para quem vive a competição e quer conhecer todos os detalhes.', proFeatures: ['6 batalhas organizadas / mês', '6 batalhas aceites / mês', 'Estatísticas completas', 'Cartões animados e personalizáveis', 'Transporte de 2+2 créditos'], soon: 'Brevemente', note: 'Os preços de lançamento previstos podem mudar antes da disponibilização do serviço. Atualmente não é possível efetuar compras.' },
  faq: { kicker: 'Perguntas frequentes', title: 'Antes de entrares na arena.', items: [['É um concurso de beleza?', 'Não. A AuraPvP centra-se na presença, estilo, segurança, desempenho e capacidade de envolver o público durante um encontro ao vivo.'], ['Posso votar a partir de casa?', 'Não. Só pode votar quem fez check-in, permaneceu na zona válida durante pelo menos 70% da batalha e ainda está presente quando a votação abre.'], ['A minha localização é visível para outros?', 'Não. A localização serve apenas para verificar a presença no evento. Os outros veem apenas contagens agregadas.'], ['Pagar aumenta a Aura obtida?', 'Não. Os planos acrescentam créditos de batalha, estatísticas e opções de partilha, mas não alteram o peso dos votos nem o resultado competitivo.'], ['O que acontece se o público mínimo não for atingido?', 'A batalha pode terminar e ficar no histórico, mas é marcada como inválida e não altera o Rating, Aura Farmed, a liga ou a classificação.']] },
  cta: { kicker: 'Em desenvolvimento', title: 'O teu próximo desafio não estará atrás de um ecrã.', body: 'A AuraPvP está em desenvolvimento. Esta é apenas a entrada da arena.', badges: ['Presença real', 'Votos verificados'] }, footer: { tagline: 'Aura Battles ao vivo. Presença real. Votos verificados.', privacy: 'Privacidade', cookies: 'Cookies', development: 'Produto em desenvolvimento · Internacional' },
  legal: { siteNotice: 'Aviso do site', back: 'Voltar ao início', lastUpdated: 'Última atualização: 3 de setembro de 2026.', privacy: { title: 'Privacidade — AuraPvP', description: 'Aviso de privacidade do site informativo AuraPvP.', intro: 'Este aviso aplica-se apenas ao site informativo <strong>aurapvp.app</strong>. A aplicação AuraPvP ainda está em desenvolvimento e não está disponível através deste site.', note: '<strong>Em resumo:</strong> o site não contém contas, formulários, newsletters, pagamentos, publicidade ou análise comportamental.', sections: [['Dados recolhidos diretamente', 'O site não pede nem recolhe diretamente o teu nome, email, localização ou outros dados pessoais. Não é possível criar uma conta nem participar numa batalha a partir deste site.'], ['Dados técnicos de navegação', 'Como em qualquer site, o fornecedor de alojamento e os operadores de rede podem tratar dados técnicos necessários para entregar as páginas e proteger o serviço, como endereço IP, data e hora do pedido, tipo de navegador e recurso solicitado. A AuraPvP não utiliza estes dados para definição de perfis ou publicidade.'], ['Preferência de idioma', 'Se escolheres um idioma, o site guarda essa preferência localmente no navegador com o nome <strong>aurapvp-language</strong>. Serve apenas para reabrir o site no idioma escolhido e não é enviada à AuraPvP.'], ['Serviços externos', 'As páginas não carregam tipos de letra, vídeos, mapas, widgets sociais ou trackers de terceiros. O site é publicado através do GitHub Pages; o respetivo tratamento técnico rege-se pelos avisos do fornecedor.'], ['Privacidade da aplicação', 'Antes do lançamento da aplicação será publicado um aviso separado e completo sobre contas, ligações sociais, verificação de presença durante as batalhas, votações e conservação de dados.'], ['Atualizações', 'Esta página será atualizada se o site adicionar novas funções ou alterar a forma de tratamento dos dados. Última atualização: 3 de setembro de 2026.']] }, cookies: { title: 'Cookies — AuraPvP', description: 'Aviso sobre cookies e armazenamento local do site AuraPvP.', intro: 'O site informativo AuraPvP foi concebido para funcionar sem rastreamento e sem banners invasivos.', note: '<strong>Estado atual:</strong> a AuraPvP não define cookies de perfil, publicidade ou analytics e não utiliza tecnologias equivalentes para acompanhar a navegação.', sections: [['Cookies do site', 'As páginas estáticas não definem cookies da AuraPvP. A navegação e as animações funcionam localmente sem guardar identificadores no navegador.'], ['Preferência de idioma', 'Ao selecionar um idioma, o site guarda o código no armazenamento local do navegador com o nome <strong>aurapvp-language</strong>. Esta preferência estritamente funcional não é um cookie, não te identifica e pode ser removida ao limpar os dados do site.'], ['Fornecedor de alojamento', 'A infraestrutura que distribui o site pode usar mecanismos técnicos estritamente necessários para a segurança e o encaminhamento correto dos pedidos. A AuraPvP não acede a eventuais identificadores para fins comerciais.'], ['Alterações futuras', 'Se no futuro forem introduzidas ferramentas não essenciais, este aviso será atualizado e, quando necessário, será solicitado consentimento antes da sua ativação. Última atualização: 3 de setembro de 2026.']] } },
};

copy.de = {
  seo: { title: 'AuraPvP — Live-Challenges. Farme Aura.', description: 'AuraPvP bringt Aura Battles in die echte Welt: Live-Duelle, verifiziertes Publikum und ergebnisbasierte Ranglisten.', social: 'Zwei Menschen. Ein echter Ort. Das verifizierte Publikum entscheidet, wer mehr Aura gefarmt hat.', imageAlt: 'AuraPvP-Logo für Live-Aura-Battles in der echten Welt' },
  ui: { skip: 'Zum Inhalt springen', homeAria: 'AuraPvP, zurück zum Anfang', menu: 'Menü öffnen', language: 'Sprache wählen' }, nav: ['So funktioniert es', 'Das Battle', 'Ranglisten', 'Pläne', 'Demnächst'],
  hero: { eyebrow: 'Aura Battles, in der echten Welt', lines: ['Tritt an.', 'Fordere heraus.', 'Farme Aura.'], lede: 'Zwei Menschen treffen sich live. Das Publikum vor Ort schaut zu, stimmt ab und entscheidet, wer den stärksten Eindruck hinterlassen hat.', primary: 'So funktioniert es', secondary: 'Pläne ansehen', trust: ['Live', 'Verifizierte Anwesenheit', 'Unbegrenztes Publikum'], visual: 'Vorschau eines AuraPvP-Battles', location: 'Rom · Piazza del Popolo', progress: 'Battle läuft', present: 'anwesend', remaining: 'Verbleibende Zeit', start: 'Start 19:35', duration: 'Dauer 12 Min.', spectators: '18 verifizierte Zuschauer', minimum: 'Mindestpublikum erreicht', voteOpens: 'Abstimmung öffnet am Ende', question: 'Wer hat mehr Aura gefarmt?' },
  marquee: ['NUR ANWESENDE DÜRFEN ABSTIMMEN', 'EINS-GEGEN-EINS-CHALLENGES', 'ÖFFENTLICHE ORTE', 'ECHTE AURA'],
  how: { kicker: 'So funktioniert es', title: 'Die Stadt ist deine Arena.', body: 'Keine Filter, versteckten Juroren oder Stimmen von zu Hause. Eine Challenge ist nur echt, wenn Teilnehmende und Publikum vor Ort sind.', steps: [['Starte die Challenge', 'Schlage drei öffentliche Orte, drei Termine und drei Dauern vor. Dein Gegner wählt eine Kombination und nimmt an.', '1 gegen 1'], ['Sei live dabei', 'Der Check-in bestätigt Teilnehmende und Zuschauer vor Ort. Die Anwesenheit bleibt privat und wird nur zusammengefasst angezeigt.', 'GPS-verifiziert'], ['Lass das Publikum entscheiden', 'Nach dem Battle stimmen alle, die vor Ort geblieben sind, genau einmal ab. Das Ergebnis erscheint erst nach dem Ende der Abstimmung.', 'Anonyme Stimme']] },
  battle: { kicker: 'Ein gültiges Battle', title: 'Anwesenheit allein reicht nicht.', titleEm: 'Das Publikum muss da sein.', body: 'Jedes Match folgt transparenten Regeln. Fehlt auch nur eine Bedingung, bleibt das Ergebnis im Verlauf, verändert aber weder Aura noch Ranglisten.', requirements: ['verifizierte Zuschauer, ohne Teilnehmende', 'gültige Stimmen bei Abstimmungsende', 'Mindestanwesenheit für die Stimmabgabe', 'öffentliche Sichtbarkeit vor dem Start'], flow: [['Check-in geöffnet', 'Teilnehmende und Publikum bestätigen ihre Anwesenheit.'], ['Battle gestartet', 'Keine Stimmen und keine Zwischenergebnisse.'], ['Abstimmung geöffnet', 'Ein kurzes Zeitfenster und genau eine Wahl.'], ['Ergebnis und Aura', 'Rating, Aura Farmed, Liga und Rangliste werden aktualisiert.']], official: 'Offizielle Frage', or: 'oder' },
  ratings: { kicker: 'Zwei Zahlen, zwei Geschichten', title: 'Baue deine Aura auf.', body: 'Der Wettbewerb misst den Moment. Der Verlauf bewahrt den ganzen Weg.', competitive: 'Wettbewerb', history: 'Verlauf', ratingTitle: 'Aura Rating', ratingBody: 'Steigt oder fällt je nach Ergebnis, Gegner, Stimmenanteil und verifiziertem Publikum.', farmedTitle: 'Aura Farmed', farmedBody: 'Die gesamte Aura, die du mit der Zeit sammelst. Sie spiegelt Stimmen, Publikum und Aktivität wider und sinkt nie.', allTime: 'gesamt', leagues: ['Bronze', 'Silber', 'Gold', 'Platin', 'Diamant', 'Master', 'Aura Legend'], where: 'Wie weit kommst du?', rankingTitle: 'Von deiner Umgebung bis zur globalen Rangliste.', scopes: ['Umgebung', 'Stadt', 'Region', 'Land', 'Global'] },
  fair: { kicker: 'Fairer Wettbewerb', title: 'Aura wird verdient.', title2: 'Nicht gekauft.', body: 'Kein Plan macht eine Stimme wichtiger und keiner verkauft Siege, Boosts oder Schutz vor Rating-Verlust.', labels: ['Keine Stimmen von zu Hause', 'Kein Pay-to-win', 'Privater Standort'], checks: ['Teilnehmende dürfen nicht abstimmen', 'Einzelne Stimmen bleiben anonym', 'Öffentliche, verifizierte Orte', 'Prüfungen gegen Auffälligkeiten und Manipulation'] },
  plans: { kicker: 'Startpläne', title: 'Das Publikum kennt kein Limit.', body: 'Alle können kostenlos zuschauen, folgen und abstimmen. Die Pläne bestimmen, wie viele Battles du organisieren oder annehmen kannst und wie detailliert die Statistiken sind.', freePrice: '0 €', freeFreq: 'kostenloser Plan', freeBody: 'Betritt die Arena und baue dein Profil auf.', freeFeatures: ['2 organisierte Battles / Monat', '2 angenommene Battles / Monat', 'Grundlegende Statistiken', 'Standard-Ergebniskarte', 'Unbegrenzte Zuschauer und Stimmen'], popular: 'Mehr Flexibilität', basePrice: '2,99 €', perMonth: 'pro Monat', baseBody: 'Für mehr Challenges, mehr Daten und Karten ohne Wasserzeichen.', baseFeatures: ['3 organisierte Battles / Monat', '3 angenommene Battles / Monat', 'Erweiterte Statistiken', 'Monatliche Social-Klicks gesamt', 'Übertrag von 1+1 Credits'], proPrice: '5,99 €', proBody: 'Für alle, die den Wettbewerb leben und jedes Detail kennen wollen.', proFeatures: ['6 organisierte Battles / Monat', '6 angenommene Battles / Monat', 'Vollständige Statistiken', 'Animierte, anpassbare Karten', 'Übertrag von 2+2 Credits'], soon: 'Demnächst', note: 'Die geplanten Einführungspreise können sich vor Verfügbarkeit des Dienstes ändern. Derzeit sind keine Käufe möglich.' },
  faq: { kicker: 'Häufige Fragen', title: 'Bevor du die Arena betrittst.', items: [['Ist es ein Schönheitswettbewerb?', 'Nein. Bei AuraPvP geht es um Präsenz, Stil, Sicherheit, Performance und die Fähigkeit, das Publikum während eines Live-Matches mitzureißen.'], ['Kann ich von zu Hause abstimmen?', 'Nein. Abstimmen darf nur, wer eingecheckt hat, mindestens 70 % des Battles im gültigen Bereich war und bei Öffnung der Abstimmung noch anwesend ist.'], ['Können andere meinen Standort sehen?', 'Nein. Der Standort wird nur genutzt, um die Anwesenheit beim Event zu verifizieren. Andere sehen ausschließlich zusammengefasste Zahlen.'], ['Erhalte ich durch Bezahlen mehr Aura?', 'Nein. Pläne bieten Battle-Credits, Statistiken und Optionen zum Teilen, verändern aber weder das Gewicht einer Stimme noch das Wettbewerbsergebnis.'], ['Was passiert, wenn das Mindestpublikum nicht erreicht wird?', 'Das Battle kann beendet und im Verlauf gespeichert werden, wird aber als ungültig markiert und verändert weder Rating, Aura Farmed, Liga noch Rangliste.']] },
  cta: { kicker: 'In Entwicklung', title: 'Deine nächste Challenge findet nicht hinter einem Bildschirm statt.', body: 'AuraPvP befindet sich in Entwicklung. Das hier ist nur der Eingang zur Arena.', badges: ['Echte Anwesenheit', 'Verifizierte Stimmen'] }, footer: { tagline: 'Live-Aura-Battles. Echte Anwesenheit. Verifizierte Stimmen.', privacy: 'Datenschutz', cookies: 'Cookies', development: 'Produkt in Entwicklung · International' },
  legal: { siteNotice: 'Website-Hinweis', back: 'Zurück zur Startseite', lastUpdated: 'Letzte Aktualisierung: 3. September 2026.', privacy: { title: 'Datenschutz — AuraPvP', description: 'Datenschutzhinweis für die Informationswebsite von AuraPvP.', intro: 'Dieser Hinweis gilt ausschließlich für die Informationswebsite <strong>aurapvp.app</strong>. Die AuraPvP-App befindet sich noch in Entwicklung und ist über diese Website nicht verfügbar.', note: '<strong>Kurz gesagt:</strong> Die Website enthält keine Konten, Formulare, Newsletter, Zahlungen, Werbung oder Verhaltensanalyse.', sections: [['Direkt erhobene Daten', 'Die Website fragt weder nach deinem Namen, deiner E-Mail-Adresse, deinem Standort noch nach anderen personenbezogenen Daten und erhebt diese auch nicht direkt. Über diese Website kannst du weder ein Konto erstellen noch an einem Battle teilnehmen.'], ['Technische Navigationsdaten', 'Wie bei jeder Website können der Hosting-Anbieter und Netzbetreiber technische Daten verarbeiten, die zur Auslieferung der Seiten und zum Schutz des Dienstes erforderlich sind, etwa IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp und angeforderte Ressource. AuraPvP nutzt diese Daten nicht für Profiling oder Werbung.'], ['Spracheinstellung', 'Wenn du eine Sprache auswählst, speichert die Website diese Einstellung lokal im Browser unter <strong>aurapvp-language</strong>. Sie wird nur verwendet, um die Website erneut in deiner gewählten Sprache zu öffnen, und nicht an AuraPvP gesendet.'], ['Externe Dienste', 'Die Seiten laden keine Schriftarten, Videos, Karten, Social Widgets oder Tracker von Drittanbietern. Die Website wird über GitHub Pages veröffentlicht; die damit verbundene technische Verarbeitung unterliegt den Hinweisen des Anbieters.'], ['Datenschutz der App', 'Vor dem Start der App wird ein separater, vollständiger Hinweis veröffentlicht, der Konten, Social-Verknüpfungen, Anwesenheitsprüfung während Battles, Abstimmungen und Datenspeicherung behandelt.'], ['Aktualisierungen', 'Diese Seite wird aktualisiert, wenn die Website neue Funktionen erhält oder sich die Datenverarbeitung ändert. Letzte Aktualisierung: 3. September 2026.']] }, cookies: { title: 'Cookies — AuraPvP', description: 'Hinweis zu Cookies und lokaler Speicherung auf der AuraPvP-Website.', intro: 'Die Informationswebsite von AuraPvP funktioniert ohne Tracking und ohne aufdringliche Banner.', note: '<strong>Aktueller Stand:</strong> AuraPvP setzt keine Cookies für Profiling, Werbung oder Analyse ein und verwendet keine vergleichbaren Technologien zur Verfolgung der Navigation.', sections: [['Cookies der Website', 'Die statischen Seiten setzen keine AuraPvP-Cookies. Navigation und Animationen funktionieren lokal, ohne Browser-Kennungen zu speichern.'], ['Spracheinstellung', 'Wenn du eine Sprache auswählst, speichert die Website den Code im lokalen Speicher des Browsers unter <strong>aurapvp-language</strong>. Diese rein funktionale Einstellung ist kein Cookie, identifiziert dich nicht und kann durch Löschen der Websitedaten entfernt werden.'], ['Hosting-Anbieter', 'Die Infrastruktur, die die Website ausliefert, kann technische Mechanismen einsetzen, die für Sicherheit und korrekte Weiterleitung von Anfragen unbedingt erforderlich sind. AuraPvP greift nicht zu kommerziellen Zwecken auf mögliche Kennungen zu.'], ['Zukünftige Änderungen', 'Falls künftig nicht notwendige Tools eingeführt werden, wird dieser Hinweis aktualisiert und, soweit erforderlich, vor ihrer Aktivierung eine Einwilligung eingeholt. Letzte Aktualisierung: 3. September 2026.']] } },
};

copy.fr = {
  seo: { title: 'AuraPvP — Défis en direct. Farme ton Aura.', description: 'AuraPvP fait entrer les Aura Battles dans le monde réel : défis 1 contre 1 en direct, public vérifié et classements basés sur les résultats.', social: 'Deux personnes. Un lieu réel. Le public vérifié décide qui a farmé le plus d’Aura.', imageAlt: 'Logo AuraPvP pour les Aura Battles en direct dans le monde réel' },
  ui: { skip: 'Aller au contenu', homeAria: 'AuraPvP, retour en haut', menu: 'Ouvrir le menu', language: 'Choisir la langue' }, nav: ['Comment ça marche', 'Le battle', 'Classements', 'Offres', 'Bientôt'],
  hero: { eyebrow: 'Aura Battles, dans le monde réel', lines: ['Entre.', 'Défie.', 'Farme ton Aura.'], lede: 'Deux personnes se rencontrent en direct. Le public réellement présent regarde, vote et décide qui a marqué les esprits.', primary: 'Découvrir le fonctionnement', secondary: 'Voir les offres', trust: ['En direct', 'Présence vérifiée', 'Public illimité'], visual: 'Aperçu d’un battle AuraPvP', location: 'Rome · Piazza del Popolo', progress: 'Battle en cours', present: 'présents', remaining: 'Temps restant', start: 'Début 19:35', duration: 'Durée 12 min', spectators: '18 spectateurs vérifiés', minimum: 'Public minimum atteint', voteOpens: 'Le vote s’ouvre à la fin', question: 'Qui a farmé le plus d’Aura ?' },
  marquee: ['SEULES LES PERSONNES PRÉSENTES VOTENT', 'DÉFIS EN UN CONTRE UN', 'LIEUX PUBLICS', 'AURA RÉELLE'],
  how: { kicker: 'Comment ça marche', title: 'La ville est ton arène.', body: 'Pas de filtres, de juges cachés ni de votes depuis chez soi. Un défi n’existe vraiment que lorsque les participants et le public sont sur place.', steps: [['Lance le défi', 'Propose trois lieux publics, trois dates et trois durées. Ton adversaire choisit la combinaison et accepte.', '1 contre 1'], ['Présente-toi en personne', 'Le check-in confirme les participants et les spectateurs sur place. La présence reste privée et n’est affichée que sous forme agrégée.', 'GPS vérifié'], ['Laisse le public décider', 'À la fin du battle, les personnes restées sur place votent une seule fois. Le résultat apparaît uniquement après la clôture.', 'Vote anonyme']] },
  battle: { kicker: 'Un battle valide', title: 'Être là ne suffit pas.', titleEm: 'Le public doit être présent.', body: 'Chaque rencontre suit des règles transparentes. Si une seule condition manque, le résultat reste dans l’historique, mais ne modifie ni l’Aura ni les classements.', requirements: ['spectateurs vérifiés, hors participants', 'votes valides à la clôture', 'de présence minimum pour pouvoir voter', 'de visibilité publique avant le début'], flow: [['Check-in ouvert', 'Les participants et le public confirment leur présence.'], ['Battle commencé', 'Aucun vote, aucun résultat partiel.'], ['Vote ouvert', 'Une courte fenêtre et un seul choix.'], ['Résultat et Aura', 'Le Rating, l’Aura Farmed, la ligue et le classement sont mis à jour.']], official: 'Question officielle', or: 'ou' },
  ratings: { kicker: 'Deux nombres, deux histoires', title: 'Construis ton Aura.', body: 'La compétition mesure l’instant. L’histoire se souvient de tout le parcours.', competitive: 'Compétitif', history: 'Historique', ratingTitle: 'Aura Rating', ratingBody: 'Il monte ou descend selon le résultat, l’adversaire, la part des votes et le public vérifié.', farmedTitle: 'Aura Farmed', farmedBody: 'Le total d’Aura accumulée au fil du temps. Il reflète les votes, le public et l’activité, et ne diminue jamais.', allTime: 'total', leagues: ['Bronze', 'Argent', 'Or', 'Platine', 'Diamant', 'Master', 'Aura Legend'], where: 'Jusqu’où iras-tu ?', rankingTitle: 'De ta zone au classement mondial.', scopes: ['Zone', 'Ville', 'Région', 'Pays', 'Monde'] },
  fair: { kicker: 'Compétition équitable', title: 'L’Aura se mérite.', title2: 'Elle ne s’achète pas.', body: 'Aucune offre ne rend un vote plus important et aucune ne vend de victoires, de boosts ou de protection contre la perte de Rating.', labels: ['Pas de vote à distance', 'Pas de pay-to-win', 'Position privée'], checks: ['Les participants ne peuvent pas voter', 'Chaque vote reste anonyme', 'Lieux publics et vérifiés', 'Contrôles contre les anomalies et la manipulation'] },
  plans: { kicker: 'Offres de lancement', title: 'Le public n’a pas de limites.', body: 'Tout le monde peut regarder, suivre et voter gratuitement. Les offres changent le nombre de battles que tu peux organiser ou accepter et le niveau des statistiques.', freePrice: '0 €', freeFreq: 'offre gratuite', freeBody: 'Pour entrer dans l’arène et commencer à construire ton profil.', freeFeatures: ['2 battles organisés / mois', '2 battles acceptés / mois', 'Statistiques essentielles', 'Carte de résultat standard', 'Spectateurs et votes illimités'], popular: 'Plus de flexibilité', basePrice: '2,99 €', perMonth: 'par mois', baseBody: 'Pour plus de défis, plus de données et des cartes sans filigrane.', baseFeatures: ['3 battles organisés / mois', '3 battles acceptés / mois', 'Statistiques avancées', 'Total des clics sociaux mensuels', 'Report de 1+1 crédits'], proPrice: '5,99 €', proBody: 'Pour celles et ceux qui vivent la compétition et veulent chaque détail.', proFeatures: ['6 battles organisés / mois', '6 battles acceptés / mois', 'Statistiques complètes', 'Cartes animées et personnalisables', 'Report de 2+2 crédits'], soon: 'Bientôt', note: 'Les prix de lancement prévus peuvent changer avant la disponibilité du service. Aucun achat n’est actuellement possible.' },
  faq: { kicker: 'Questions fréquentes', title: 'Avant d’entrer dans l’arène.', items: [['Est-ce un concours de beauté ?', 'Non. AuraPvP met au centre la présence, le style, la sécurité, la performance et la capacité à mobiliser le public pendant une rencontre en direct.'], ['Puis-je voter depuis chez moi ?', 'Non. Seules les personnes ayant effectué le check-in, étant restées dans la zone valide pendant au moins 70 % du battle et encore présentes à l’ouverture du vote peuvent voter.'], ['Ma position est-elle visible par les autres ?', 'Non. La position sert uniquement à vérifier la présence à l’événement. Les autres ne voient que des nombres agrégés.'], ['Payer augmente-t-il l’Aura obtenue ?', 'Non. Les offres ajoutent des crédits de battle, des statistiques et des options de partage, mais ne modifient ni le poids des votes ni le résultat compétitif.'], ['Que se passe-t-il si le public minimum n’est pas atteint ?', 'Le battle peut se terminer et rester dans l’historique, mais il est marqué comme non valide et ne modifie ni le Rating, ni l’Aura Farmed, ni la ligue, ni le classement.']] },
  cta: { kicker: 'En développement', title: 'Ton prochain défi ne sera pas derrière un écran.', body: 'AuraPvP est en développement. Ceci n’est que l’entrée de l’arène.', badges: ['Présence réelle', 'Votes vérifiés'] }, footer: { tagline: 'Aura Battles en direct. Présence réelle. Votes vérifiés.', privacy: 'Confidentialité', cookies: 'Cookies', development: 'Produit en développement · International' },
  legal: { siteNotice: 'Informations du site', back: 'Retour à l’accueil', lastUpdated: 'Dernière mise à jour : 3 septembre 2026.', privacy: { title: 'Confidentialité — AuraPvP', description: 'Avis de confidentialité du site d’information AuraPvP.', intro: 'Cet avis concerne uniquement le site d’information <strong>aurapvp.app</strong>. L’application AuraPvP est encore en développement et n’est pas disponible via ce site.', note: '<strong>En bref :</strong> le site ne contient ni comptes, ni formulaires, ni newsletter, ni paiements, ni publicité, ni analyse comportementale.', sections: [['Données collectées directement', 'Le site ne demande ni ne collecte directement votre nom, votre adresse e-mail, votre position ou d’autres données personnelles. Il n’est pas possible de créer un compte ou de participer à un battle depuis ce site.'], ['Données techniques de navigation', 'Comme pour tout site, l’hébergeur et les opérateurs réseau peuvent traiter les données techniques nécessaires à la diffusion des pages et à la protection du service, comme l’adresse IP, la date et l’heure de la demande, le type de navigateur et la ressource demandée. AuraPvP n’utilise pas ces données à des fins de profilage ou de publicité.'], ['Préférence de langue', 'Si vous choisissez une langue, le site enregistre cette préférence localement dans votre navigateur sous le nom <strong>aurapvp-language</strong>. Elle sert uniquement à rouvrir le site dans la langue choisie et n’est pas envoyée à AuraPvP.'], ['Services externes', 'Les pages ne chargent aucune police, vidéo, carte, aucun widget social ni tracker tiers. Le site est publié via GitHub Pages ; le traitement technique associé est régi par les avis du fournisseur.'], ['Confidentialité de l’application', 'Avant le lancement de l’application, un avis séparé et complet sera publié concernant les comptes, les connexions sociales, la vérification de présence pendant les battles, les votes et la conservation des données.'], ['Mises à jour', 'Cette page sera mise à jour si le site ajoute de nouvelles fonctions ou modifie le traitement des données. Dernière mise à jour : 3 septembre 2026.']] }, cookies: { title: 'Cookies — AuraPvP', description: 'Avis relatif aux cookies et au stockage local du site AuraPvP.', intro: 'Le site d’information AuraPvP est conçu pour fonctionner sans suivi et sans bannières intrusives.', note: '<strong>État actuel :</strong> AuraPvP ne dépose aucun cookie de profilage, de publicité ou d’analyse et n’utilise aucune technologie équivalente pour suivre la navigation.', sections: [['Cookies du site', 'Les pages statiques ne déposent aucun cookie AuraPvP. La navigation et les animations fonctionnent localement sans enregistrer d’identifiants dans le navigateur.'], ['Préférence de langue', 'Lorsque vous sélectionnez une langue, le site enregistre son code dans le stockage local du navigateur sous le nom <strong>aurapvp-language</strong>. Cette préférence strictement fonctionnelle n’est pas un cookie, ne vous identifie pas et peut être supprimée en effaçant les données du site.'], ['Hébergeur', 'L’infrastructure qui distribue le site peut utiliser des mécanismes techniques strictement nécessaires à la sécurité et au bon acheminement des demandes. AuraPvP n’accède pas à d’éventuels identifiants à des fins commerciales.'], ['Évolutions futures', 'Si des outils non essentiels sont ajoutés à l’avenir, cet avis sera mis à jour et, lorsque cela est requis, un consentement sera demandé avant leur activation. Dernière mise à jour : 3 septembre 2026.']] } },
};

const pagePath = (locale, page = 'home') => localeMeta[locale][page];
const absolute = (locale, page = 'home') => `${origin}${pagePath(locale, page)}`;
const manifestPath = (locale) => locale === 'it' ? '/site.webmanifest' : `/${locale}/site.webmanifest`;

function alternateLinks(page) {
  return [
    ...locales.map((locale) => `  <link rel="alternate" hreflang="${locale}" href="${absolute(locale, page)}">`),
    `  <link rel="alternate" hreflang="x-default" href="${absolute('en', page)}">`,
  ].join('\n');
}

function openGraphAlternates(locale) {
  return locales
    .filter((candidate) => candidate !== locale)
    .map((candidate) => `  <meta property="og:locale:alternate" content="${localeMeta[candidate].og}">`)
    .join('\n');
}

function languagePicker(locale, page) {
  const current = localeMeta[locale];
  return `<details class="language-picker" data-language-picker>
          <summary aria-label="${copy[locale].ui.language}"><span class="language-flag" aria-hidden="true">${current.flag}</span><span class="language-name-short">${locale.toUpperCase()}</span><span class="language-chevron" aria-hidden="true">⌄</span></summary>
          <div class="language-menu">
${locales.map((candidate) => {
  const item = localeMeta[candidate];
  const active = candidate === locale ? ' aria-current="page"' : '';
  return `            <a href="${pagePath(candidate, page)}" hreflang="${candidate}" lang="${candidate}" data-language="${candidate}"${active}><span class="language-flag" aria-hidden="true">${item.flag}</span><span>${item.name}</span></a>`;
}).join('\n')}
          </div>
        </details>`;
}

function sharedHead(locale, page, title, description, imageAlt, options = {}) {
  const canonical = absolute(locale, page);
  const socialDescription = options.socialDescription ?? description;
  const socialImage = `${origin}/assets/aurapvp-live-battle-social-preview-1200x630.png`;
  const robots = options.robots ?? 'index,follow,max-image-preview:large';
  const alternates = options.alternates === false ? '' : `\n${alternateLinks(page)}`;
  const schema = options.schema ?? {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: canonical,
    description,
    inLanguage: locale,
    isPartOf: { '@type': 'WebSite', name: 'AuraPvP', url: absolute(locale) },
  };
  return `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#08070d">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${canonical}">
${alternates}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${localeMeta[locale].og}">
${openGraphAlternates(locale)}
  <meta property="og:site_name" content="AuraPvP">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${socialDescription}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${socialImage}">
  <meta property="og:image:secure_url" content="${socialImage}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${imageAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${socialDescription}">
  <meta name="twitter:image" content="${socialImage}">
  <meta name="twitter:image:alt" content="${imageAlt}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/assets/aurapvp-aura-battle-favicon-96.png" sizes="96x96" type="image/png">
  <link rel="icon" href="/assets/aurapvp-aura-battle-favicon-64.png" sizes="64x64" type="image/png">
  <link rel="icon" href="/assets/aurapvp-aura-battle-favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="/assets/aurapvp-aura-battle-favicon-16.png" sizes="16x16" type="image/png">
  <link rel="apple-touch-icon" href="/assets/aurapvp-live-battle-apple-touch-icon-180.png" sizes="180x180">
  <link rel="manifest" href="${manifestPath(locale)}">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function renderList(items) {
  return items.map((item) => `              <li><span>✓</span> ${item}</li>`).join('\n');
}

function renderHome(locale) {
  const c = copy[locale];
  const home = pagePath(locale);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AuraPvP',
    url: absolute(locale),
    description: c.seo.description,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'AuraPvP',
      url: origin,
      logo: { '@type': 'ImageObject', url: `${origin}/assets/aurapvp-real-world-pvp-app-icon-512.png`, width: 512, height: 512 },
    },
  };
  const head = sharedHead(locale, 'home', c.seo.title, c.seo.description, c.seo.imageAlt, { socialDescription: c.seo.social, schema });
  const autoRedirect = locale === 'it' ? '\n  <script src="/locale-redirect.js" defer></script>' : '';
  const [step1, step2, step3] = c.how.steps;
  const [flow1, flow2, flow3, flow4] = c.battle.flow;
  const plan = (name, price, frequency, body, features, classes = '', popular = '') => `          <article class="plan-card${classes} reveal">
${popular ? `            <span class="popular-label">${popular}</span>\n` : ''}            <span class="plan-name">${name}</span>
            <div class="plan-price"><strong>${price}</strong><small>${frequency}</small></div>
            <p>${body}</p>
            <ul>
${renderList(features)}
            </ul>
            <a class="button ${classes ? 'button-primary' : 'button-plan'}" href="#in-arrivo">${c.plans.soon}</a>
          </article>`;

  return `<!doctype html>
<html lang="${locale}">
<head>
${head}
  <link rel="preload" href="/assets/aurapvp-live-aura-battle-horizontal-logo.png" as="image" type="image/png">
  <link rel="stylesheet" href="/styles.css">
  <script src="/script.js" defer></script>${autoRedirect}
</head>
<body>
  <a class="skip-link" href="#main">${c.ui.skip}</a>

  <header class="site-header" data-header>
    <div class="container nav-wrap">
      <a class="brand brand--horizontal" href="#top" aria-label="${c.ui.homeAria}">
        <img class="brand-logo brand-logo--horizontal" src="/assets/aurapvp-live-aura-battle-horizontal-logo.png" width="950" height="249" alt="${c.seo.imageAlt}" fetchpriority="high">
      </a>
      <nav class="site-nav" id="site-nav" aria-label="${c.nav[0]}" data-nav>
        <a href="#come-funziona">${c.nav[0]}</a><a href="#battaglia">${c.nav[1]}</a><a href="#classifiche">${c.nav[2]}</a><a href="#piani">${c.nav[3]}</a><a class="nav-cta" href="#in-arrivo">${c.nav[4]}</a>
      </nav>
      <div class="header-controls">
        ${languagePicker(locale, 'home')}
        <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-button><span class="sr-only">${c.ui.menu}</span><span></span><span></span></button>
      </div>
    </div>
  </header>

  <main id="main">
    <section class="hero" id="top">
      <div class="hero-glow hero-glow-one" aria-hidden="true"></div><div class="hero-glow hero-glow-two" aria-hidden="true"></div><div class="hero-grid" aria-hidden="true"></div>
      <div class="container hero-layout">
        <div class="hero-copy reveal">
          <div class="eyebrow"><span></span> ${c.hero.eyebrow}</div>
          <h1>${c.hero.lines[0]}<br> ${c.hero.lines[1]}<br><em>${c.hero.lines[2]}</em></h1>
          <p class="hero-lede">${c.hero.lede}</p>
          <div class="hero-actions"><a class="button button-primary" href="#come-funziona">${c.hero.primary} <span aria-hidden="true">↘</span></a><a class="button button-ghost" href="#piani">${c.hero.secondary}</a></div>
          <ul class="trust-row" aria-label="${c.hero.trust.join(', ')}"><li><span class="trust-icon">●</span> ${c.hero.trust[0]}</li><li><span class="trust-icon">⌖</span> ${c.hero.trust[1]}</li><li><span class="trust-icon">∞</span> ${c.hero.trust[2]}</li></ul>
        </div>
        <div class="hero-visual reveal" aria-label="${c.hero.visual}">
          <div class="orbit orbit-one" aria-hidden="true"></div><div class="orbit orbit-two" aria-hidden="true"></div><div class="floating-chip chip-live"><span></span> LIVE</div><div class="floating-chip chip-crowd">18 <small>${c.hero.present}</small></div>
          <div class="phone-shell">
            <div class="phone-top"><span>19:42</span><span class="phone-island"></span><span>●●●</span></div>
            <div class="battle-head"><div><span class="micro-label">${c.hero.location}</span><strong>${c.hero.progress}</strong></div><div class="live-dot"><i></i> LIVE</div></div>
            <div class="fighters"><article class="fighter fighter-one"><div class="avatar avatar-one"><span>AL</span></div><h3>Alessio</h3><p>${c.ratings.leagues[2]} II · 1.482</p></article><div class="versus"><span>VS</span></div><article class="fighter fighter-two"><div class="avatar avatar-two"><span>MK</span></div><h3>Mark</h3><p>${c.ratings.leagues[2]} I · 1.521</p></article></div>
            <div class="timer-card"><span class="micro-label">${c.hero.remaining}</span><strong>04:38</strong><div class="timer-track"><i></i></div><div class="timer-meta"><span>${c.hero.start}</span><span>${c.hero.duration}</span></div></div>
            <div class="crowd-card"><div class="crowd-icon" aria-hidden="true"><span></span><span></span><span></span></div><div><strong>${c.hero.spectators}</strong><small>${c.hero.minimum}</small></div><span class="verified">✓</span></div>
            <div class="vote-preview"><small>${c.hero.voteOpens}</small><p>${c.hero.question}</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="signal-strip" aria-label="AuraPvP"><div class="marquee-track">${[0, 1].map((group) => `<div class="marquee-group"${group ? ' aria-hidden="true"' : ''}>${c.marquee.map((item) => `<span>${item}</span><i>✦</i>`).join('')}</div>`).join('')}</div></section>

    <section class="section how" id="come-funziona"><div class="container">
      <div class="section-heading reveal"><span class="section-kicker">${c.how.kicker}</span><h2>${c.how.title}</h2><p>${c.how.body}</p></div>
      <div class="steps-grid">
        <article class="step-card reveal"><div class="step-number">01</div><div class="step-icon icon-challenge" aria-hidden="true"><span></span><span></span><i>VS</i></div><h3>${step1[0]}</h3><p>${step1[1]}</p><span class="step-tag">${step1[2]}</span></article>
        <article class="step-card step-featured reveal"><div class="step-number">02</div><div class="step-icon icon-presence" aria-hidden="true"><span></span><i></i></div><h3>${step2[0]}</h3><p>${step2[1]}</p><span class="step-tag">${step2[2]}</span></article>
        <article class="step-card reveal"><div class="step-number">03</div><div class="step-icon icon-vote" aria-hidden="true"><span>?</span><i></i></div><h3>${step3[0]}</h3><p>${step3[1]}</p><span class="step-tag">${step3[2]}</span></article>
      </div>
    </div></section>

    <section class="section battle-section" id="battaglia"><div class="container battle-layout">
      <div class="battle-copy reveal"><span class="section-kicker">${c.battle.kicker}</span><h2>${c.battle.title}<br><em>${c.battle.titleEm}</em></h2><p>${c.battle.body}</p><div class="requirements"><div><span>10+</span><p>${c.battle.requirements[0]}</p></div><div><span>8+</span><p>${c.battle.requirements[1]}</p></div><div><span>70%</span><p>${c.battle.requirements[2]}</p></div><div><span>60′</span><p>${c.battle.requirements[3]}</p></div></div></div>
      <div class="battle-flow reveal"><div class="flow-line" aria-hidden="true"></div>
        <article class="flow-item done"><span class="flow-status">✓</span><div><small>18:50</small><h3>${flow1[0]}</h3><p>${flow1[1]}</p></div></article>
        <article class="flow-item done"><span class="flow-status">✓</span><div><small>19:00</small><h3>${flow2[0]}</h3><p>${flow2[1]}</p></div></article>
        <article class="flow-item active"><span class="flow-status">●</span><div><small>19:12</small><h3>${flow3[0]}</h3><p>${flow3[1]}</p></div></article>
        <article class="flow-item"><span class="flow-status">4</span><div><small>19:13</small><h3>${flow4[0]}</h3><p>${flow4[1]}</p></div></article>
        <div class="vote-card"><span class="micro-label">${c.battle.official}</span><blockquote>“${c.hero.question}”</blockquote><div><button type="button" disabled>Alessio</button><span>${c.battle.or}</span><button type="button" disabled>Mark</button></div></div>
      </div>
    </div></section>

    <section class="section ratings" id="classifiche"><div class="container">
      <div class="section-heading centered reveal"><span class="section-kicker">${c.ratings.kicker}</span><h2>${c.ratings.title}</h2><p>${c.ratings.body}</p></div>
      <div class="rating-grid">
        <article class="rating-card rating-competitive reveal"><div class="rating-top"><span class="rating-symbol">↗</span><span class="pill">${c.ratings.competitive}</span></div><h3>${c.ratings.ratingTitle}</h3><p>${c.ratings.ratingBody}</p><div class="rating-value"><strong>1.842</strong><span>+31</span></div><div class="league-progress"><i></i></div><div class="league-labels"><span>${c.ratings.leagues[3]} II</span><span>${c.ratings.leagues[3]} I</span></div></article>
        <article class="rating-card rating-history reveal"><div class="rating-top"><span class="rating-symbol">✦</span><span class="pill">${c.ratings.history}</span></div><h3>${c.ratings.farmedTitle}</h3><p>${c.ratings.farmedBody}</p><div class="rating-value"><strong>12.670</strong><span>${c.ratings.allTime}</span></div><div class="sparkline" aria-hidden="true"><svg viewBox="0 0 300 72" role="img"><path d="M2 61 C30 59,42 42,66 46 S105 59,125 32 S159 24,178 35 S210 42,226 18 S268 9,298 4"/><path class="spark-fill" d="M2 61 C30 59,42 42,66 46 S105 59,125 32 S159 24,178 35 S210 42,226 18 S268 9,298 4 L298 72 L2 72 Z"/></svg></div></article>
      </div>
      <div class="leagues reveal" aria-label="AuraPvP">${c.ratings.leagues.map((league, index) => `<div class="league league-${['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'legend'][index]}"><i></i><span>${league}</span></div>`).join('')}</div>
      <div class="ranking-banner reveal"><div><span class="section-kicker">${c.ratings.where}</span><h3>${c.ratings.rankingTitle}</h3></div><div class="ranking-places" aria-label="${c.ratings.rankingTitle}">${c.ratings.scopes.map((scope) => `<span>${scope}</span>`).join('')}</div></div>
    </div></section>

    <section class="section fair-section"><div class="container fair-layout">
      <div class="fair-visual reveal" aria-hidden="true"><div class="shield-rings"><span></span><span></span><span></span><i>✓</i></div><div class="shield-label label-one">${c.fair.labels[0]}</div><div class="shield-label label-two">${c.fair.labels[1]}</div><div class="shield-label label-three">${c.fair.labels[2]}</div></div>
      <div class="fair-copy reveal"><span class="section-kicker">${c.fair.kicker}</span><h2>${c.fair.title}<br>${c.fair.title2}</h2><p>${c.fair.body}</p><ul class="check-list">${c.fair.checks.map((item) => `<li><span>✓</span> ${item}</li>`).join('')}</ul></div>
    </div></section>

    <section class="section plans" id="piani"><div class="container">
      <div class="section-heading centered reveal"><span class="section-kicker">${c.plans.kicker}</span><h2>${c.plans.title}</h2><p>${c.plans.body}</p></div>
      <div class="plans-grid">
${plan('Free', c.plans.freePrice, c.plans.freeFreq, c.plans.freeBody, c.plans.freeFeatures)}
${plan('Base', c.plans.basePrice, c.plans.perMonth, c.plans.baseBody, c.plans.baseFeatures, ' plan-popular', c.plans.popular)}
${plan('Pro', c.plans.proPrice, c.plans.perMonth, c.plans.proBody, c.plans.proFeatures)}
      </div><p class="price-note reveal">${c.plans.note}</p>
    </div></section>

    <section class="section faq-section"><div class="container faq-layout"><div class="faq-intro reveal"><span class="section-kicker">${c.faq.kicker}</span><h2>${c.faq.title}</h2></div><div class="faq-list reveal">${c.faq.items.map(([question, answer]) => `<details><summary>${question}<span>+</span></summary><p>${answer}</p></details>`).join('')}</div></div></section>

    <section class="final-cta" id="in-arrivo"><div class="cta-grid" aria-hidden="true"></div><div class="container cta-content reveal"><img class="cta-brand-icon" src="/assets/aurapvp-real-world-pvp-app-icon-512.png" width="512" height="512" alt="" loading="lazy" decoding="async"><span class="section-kicker">${c.cta.kicker}</span><h2>${c.cta.title}</h2><p>${c.cta.body}</p><div class="coming-platforms" aria-label="AuraPvP"><span>${c.cta.badges[0]}</span><i></i><span>${c.cta.badges[1]}</span></div></div></section>
  </main>

  <footer class="site-footer"><div class="container footer-top"><a class="brand brand--wordmark" href="#top" aria-label="AuraPvP"><img class="brand-logo brand-logo--wordmark" src="/assets/aurapvp-live-pvp-wordmark.png" width="563" height="108" alt="AuraPvP"></a><p>${c.footer.tagline}</p><nav aria-label="${c.legal.siteNotice}"><a href="${pagePath(locale, 'privacy')}">${c.footer.privacy}</a><a href="${pagePath(locale, 'cookies')}">${c.footer.cookies}</a></nav></div><div class="container footer-bottom"><span>© <span data-year></span> AuraPvP</span><span>${c.footer.development}</span></div></footer>
</body>
</html>
`;
}

function renderLegal(locale, type) {
  const c = copy[locale];
  const page = c.legal[type];
  const otherType = type === 'privacy' ? 'cookies' : 'privacy';
  const autoRedirect = locale === 'it' ? '\n  <script src="/locale-redirect.js" defer></script>' : '';
  return `<!doctype html>
<html lang="${locale}">
<head>
${sharedHead(locale, type, page.title, page.description, c.seo.imageAlt, { robots: 'noindex,follow', alternates: false })}
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/legal.css">
  <script src="/script.js" defer></script>${autoRedirect}
</head>
<body class="legal-page">
  <header class="legal-header"><div class="container nav-wrap"><a class="brand brand--horizontal" href="${pagePath(locale)}" aria-label="${c.ui.homeAria}"><img class="brand-logo brand-logo--horizontal" src="/assets/aurapvp-live-aura-battle-horizontal-logo.png" width="950" height="249" alt="${c.seo.imageAlt}"></a><div class="legal-actions">${languagePicker(locale, type)}<a class="back-link" href="${pagePath(locale)}">← ${c.legal.back}</a></div></div></header>
  <main class="legal-main"><span class="section-kicker">${c.legal.siteNotice}</span><h1>${type === 'privacy' ? c.footer.privacy : c.footer.cookies}</h1><p class="legal-intro">${page.intro}</p><p class="legal-note">${page.note}</p>${page.sections.map(([title, body]) => `<section><h2>${title}</h2><p>${body}</p></section>`).join('\n    ')}</main>
  <footer class="legal-footer"><div class="container"><span>© <span data-year></span> AuraPvP</span><a href="${pagePath(locale, otherType)}">${type === 'privacy' ? c.footer.cookies : c.footer.privacy}</a></div></footer>
</body>
</html>
`;
}

function renderManifest(locale) {
  const c = copy[locale];
  return `${JSON.stringify({
    name: 'AuraPvP', short_name: 'AuraPvP', description: c.seo.description, lang: locale,
    start_url: pagePath(locale), scope: pagePath(locale), display: 'standalone', background_color: '#08070d', theme_color: '#08070d',
    icons: [
      { src: '/assets/aurapvp-live-battle-pwa-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/assets/aurapvp-real-world-pvp-app-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }, null, 2)}\n`;
}

function renderSitemap() {
  const lastmod = '2026-09-05';
  const pageBlock = (locale) => `  <url>
    <loc>${absolute(locale)}</loc>
    <lastmod>${lastmod}</lastmod>
${locales.map((candidate) => `    <xhtml:link rel="alternate" hreflang="${candidate}" href="${absolute(candidate)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute('en')}"/>
    <image:image><image:loc>${origin}/assets/aurapvp-live-battle-social-preview-1200x630.png</image:loc></image:image>
    <image:image><image:loc>${origin}/assets/aurapvp-live-aura-battle-horizontal-logo.png</image:loc></image:image>
  </url>`;
  const urls = locales.map(pageBlock);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
}

function render404() {
  const messages = Object.fromEntries(locales.map((locale) => [locale, {
    title: { en: 'Page not found', it: 'Pagina non trovata', es: 'Página no encontrada', pt: 'Página não encontrada', de: 'Seite nicht gefunden', fr: 'Page introuvable' }[locale],
    heading: { en: 'Outside the arena', it: "Fuori dall'arena", es: 'Fuera de la arena', pt: 'Fora da arena', de: 'Außerhalb der Arena', fr: 'Hors de l’arène' }[locale],
    body: { en: 'This page does not exist or has moved.', it: 'Questa pagina non esiste o è stata spostata.', es: 'Esta página no existe o se ha movido.', pt: 'Esta página não existe ou foi movida.', de: 'Diese Seite existiert nicht oder wurde verschoben.', fr: 'Cette page n’existe pas ou a été déplacée.' }[locale],
    button: copy[locale].legal.back,
  }]));
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found — AuraPvP</title><meta name="robots" content="noindex,follow"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" href="/assets/aurapvp-aura-battle-favicon-96.png" sizes="96x96" type="image/png"><link rel="stylesheet" href="/styles.css"><style>body{min-height:100vh;display:grid;place-items:center;text-align:center;background:radial-gradient(circle,rgba(155,92,255,.18),transparent 35%),#08070d}.error{padding:30px}.error .brand{margin:0 auto 35px}.error strong{display:block;color:var(--acid);font-family:var(--display);font-size:clamp(90px,22vw,190px);line-height:.8;letter-spacing:-10px}.error h1{margin:25px 0 10px;font-family:var(--display);font-size:32px;text-transform:uppercase}.error p{margin:0 0 28px;color:var(--muted)}</style></head><body><main class="error"><a class="brand brand--horizontal" data-home href="/en/" aria-label="AuraPvP"><img class="brand-logo brand-logo--horizontal" src="/assets/aurapvp-live-aura-battle-horizontal-logo.png" width="950" height="249" alt="AuraPvP"></a><strong>404</strong><h1 data-heading>Outside the arena</h1><p data-body>This page does not exist or has moved.</p><a class="button button-primary" data-button data-home href="/en/">Back to home</a></main><script>const messages=${JSON.stringify(messages)};const supported=${JSON.stringify(locales)};let locale=location.pathname.split('/')[1];if(!supported.includes(locale)){try{locale=localStorage.getItem('aurapvp-language')}catch{}}if(!supported.includes(locale)){locale=(navigator.languages||[navigator.language]).map(value=>value?.toLowerCase().split('-')[0]).find(value=>supported.includes(value))||'en'}const message=messages[locale];document.documentElement.lang=locale;document.title=message.title+' — AuraPvP';document.querySelector('[data-heading]').textContent=message.heading;document.querySelector('[data-body]').textContent=message.body;document.querySelector('[data-button]').textContent=message.button;document.querySelectorAll('[data-home]').forEach(link=>link.href=${JSON.stringify(Object.fromEntries(locales.map((item) => [item, pagePath(item)])))}[locale]);</script></body></html>\n`;
}

async function writeRoute(route, contents) {
  const relative = route === '/' ? 'index.html' : path.join(route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  const target = path.join(root, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, 'utf8');
}

for (const locale of locales) {
  await writeRoute(pagePath(locale), renderHome(locale));
  await writeRoute(pagePath(locale, 'privacy'), renderLegal(locale, 'privacy'));
  await writeRoute(pagePath(locale, 'cookies'), renderLegal(locale, 'cookies'));
  const manifestTarget = path.join(root, manifestPath(locale).replace(/^\//, ''));
  await mkdir(path.dirname(manifestTarget), { recursive: true });
  await writeFile(manifestTarget, renderManifest(locale), 'utf8');
}

await writeFile(path.join(root, 'sitemap.xml'), renderSitemap(), 'utf8');
await writeFile(path.join(root, '404.html'), render404(), 'utf8');

console.log(`Generated ${locales.length * 3} localized pages, ${locales.length} manifests, sitemap and 404 page.`);
