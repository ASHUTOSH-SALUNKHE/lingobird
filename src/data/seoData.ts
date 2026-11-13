/**
 * Central SEO Configuration & Semantic Knowledge Base for LingoBird.
 * Curated for search engine dominance across "language learning application",
 * "language practising application", "AI language tutor", and offline speech keywords.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lingobird.app';
export const SITE_NAME = 'LingoBird';
export const SITE_TAGLINE = 'The Local-First AI Language Learning & Practicing Application';

export const PRIMARY_TITLE =
  'LingoBird — Best AI Language Learning & Practicing Application for Windows';

export const PRIMARY_DESCRIPTION =
  'Practice speaking, listening, reading, writing, and vocabulary with LingoBird — the complete local-first language learning application for Windows. Features real-time AI voice tutor, 20 offline Piper neural voices, local Whisper speech recognition, Anki-grade FSRS spaced repetition flashcards, and 9 mini games.';

/**
 * Curated high-intent keyword cluster targeting Google search queries.
 */
export const SEO_KEYWORDS = [
  // Core High-Volume Terms
  'language learning application',
  'language practising application',
  'language learning app for windows',
  'language practice software',
  'best language learning app',
  'free language learning application',
  'windows language learning studio',
  'offline language learning app',
  'desktop language learning software',

  // AI & Voice Tutoring Terms
  'ai language tutor',
  'ai voice tutor',
  'ai language practicing app',
  'practice speaking language with ai',
  'real-time ai language teacher',
  'google gemma language tutor',
  'local ollama language tutor',
  'ai conversational practice app',
  'speak with ai in foreign language',
  'hands-free language speaking app',

  // Offline Neural Voices & Speech Recognition
  'offline piper neural voices',
  'local whisper speech to text language learning',
  'offline speech recognition language app',
  'piper tts language practice',
  'whisper stt pronunciation practice',
  'private offline language learning',
  'no cloud latency language tutor',
  'quantized neural voices windows',

  // Flashcards & Memory Science
  'fsrs spaced repetition flashcards',
  'anki alternative with ai tutor',
  'custom html css flashcard studio',
  'fsrs v5 spaced repetition algorithm',
  'free spaced repetition scheduler',
  'flashcard application for windows',
  'self contained lbdeck flashcards',
  'visual memory vocabulary flashcards',

  // Skills & Practice Modules
  'graded reading stories with pronunciation',
  'writing atelier character level translation',
  'interactive language conversation arena',
  'language learning mini games',
  'vocabulary matching pairs game',
  'sentence fill language practice',
  'structured grammar curriculum tree',
  'language mistakes workout trainer',

  // Specific Target Languages
  'learn spanish application windows',
  'practice spanish speaking with ai',
  'learn japanese kanji flashcards app',
  'learn french conversation practice',
  'learn german grammar application',
  'learn italian offline voices app',
  'learn portuguese speaking practice',
  'learn russian tts language app',
  'learn mandarin chinese reading stories',
  'learn hindi vocabulary flashcards',

  // Privacy & Local-First Value Props
  'local first language learning',
  'no subscription language app',
  'free language learning desktop software',
  'private language practice no telemetry',
  'offline opus mt neural translators',
  'windows 11 language learning studio',
  'microsoft store language app',
];

/**
 * High-intent FAQ items answering common search engine queries.
 * Powers both visible on-page UI and Google FAQPage Schema.org rich snippets.
 */
export const FAQ_ITEMS = [
  {
    question: 'What is LingoBird and how does it help me learn languages?',
    answer:
      'LingoBird is a calm, local-first Windows desktop language learning and practicing application. It unites an interactive AI voice tutor, 20 offline Piper neural voices, Whisper speech-to-text, Anki-grade FSRS spaced repetition flashcards, graded reading stories, a character-level writing atelier, and 9 mini games into one distraction-free desktop window.',
  },
  {
    question: 'Can I practice speaking and listening completely offline?',
    answer:
      'Yes. LingoBird bundles 20 high-fidelity Piper neural ONNX voices across 10 languages (English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Hindi, and Japanese) and on-device Whisper speech-to-text models (~39–73 MB) via WebAssembly. All speech synthesis and microphone transcription execute directly on your Windows PC with zero cloud lag.',
  },
  {
    question: 'How does LingoBird’s AI voice tutor work?',
    answer:
      'LingoBird’s AI Voice Tutor lets you hold natural, real-time spoken conversations across customized topics or difficulty levels. You can connect free Google AI Studio models like Google Gemma 4 26B/31B (offering up to 14,400 free requests per day) or run 100% offline local models using Ollama (such as gemma3:4b, llama3.2, or mistral) on localhost:11434 with zero subscription fees.',
  },
  {
    question: 'What makes LingoBird’s FSRS flashcards better than traditional flashcard apps?',
    answer:
      'LingoBird uses the state-of-the-art Free Spaced Repetition Scheduler (FSRS v5), which predicts memory retrievability and calculates optimal review intervals with significantly higher accuracy than legacy SM-2 algorithms. You can also design custom front and back card templates using HTML/CSS or generate templates with ChatGPT prompts and export self-contained .lbdeck bundles.',
  },
  {
    question: 'Which languages can I learn and practice in LingoBird?',
    answer:
      'LingoBird currently supports Spanish, French, Japanese, German, Italian, Portuguese, Russian, Mandarin Chinese, Hindi, and English with dedicated Piper neural voices, Whisper speech recognition, and 12 Helsinki-NLP OPUS-MT offline translation packs.',
  },
  {
    question: 'Is LingoBird free to download and use on Windows?',
    answer:
      'Yes. LingoBird is available for Windows 10 and 11 on the official Microsoft Store. Core flashcards, reading stories, writing atelier, offline neural voices, Whisper speech-to-text, and local Ollama tutoring require no subscription, account creation, or ongoing fees.',
  },
  {
    question: 'How does LingoBird protect my privacy during language practice?',
    answer:
      'LingoBird is local-first by design. Your cards, study stats, saved word notebook, and mistake history stay stored on your local disk in a transparent JSON database. Microphone audio captured during speaking exercises is processed in volatile RAM and is never stored, uploaded to external servers, or sold to third parties.',
  },
  {
    question: 'Can I import and export my flashcard decks and saved words?',
    answer:
      'Yes. LingoBird supports one-click full database backup and restore in open JSON format, as well as export/import of self-contained .lbdeck packages that bundle card front/back templates, text fields, and attached audio/image files together.',
  },
];

/**
 * Schema.org SoftwareApplication JSON-LD markup for Google Rich Results.
 */
export const SOFTWARE_APPLICATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LingoBird',
  alternateName: 'LingoBird Language Learning Application',
  operatingSystem: 'Windows 10, Windows 11',
  applicationCategory: 'EducationalApplication',
  applicationSubCategory: 'Language Learning & Practicing Software',
  description: PRIMARY_DESCRIPTION,
  url: SITE_URL,
  downloadUrl:
    'https://apps.microsoft.com/detail/9P7N7S9N222J?hl=en-us&gl=IN&ocid=pdpshare',
  screenshot: [
    `${SITE_URL}/screenshots/flashcards-studio.png`,
    `${SITE_URL}/screenshots/reading-writing.png`,
    `${SITE_URL}/screenshots/conversation-games.png`,
    `${SITE_URL}/screenshots/ai-tutor-workspace.png`,
    `${SITE_URL}/screenshots/onboarding-guides.png`,
    `${SITE_URL}/screenshots/settings-offline-ai.png`,
  ],
  featureList: [
    'AI Voice Tutor with real-time speech streaming',
    '20 Offline Piper Neural TTS Voices across 10 Languages',
    'Whisper On-Device Speech Recognition (Zero Cloud Lag)',
    'Scientific FSRS v5 Spaced Repetition Flashcard Engine',
    'Custom HTML/CSS Card Studio with Live AI Template Prompts',
    'Graded Reading Stories with Phonetic Overlays & 1-Click Gloss',
    'Character-Level Writing Atelier with Live Matching & Hints',
    'Interactive Conversation Arena with Branched Scenarios',
    '9 Mini Games across Vocabulary, Sentences, and Grammar',
    '12 Helsinki-NLP OPUS-MT Quantized Neural Offline Translators',
    'Full JSON Database Backups and Portable .lbdeck Deck Bundles',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '142',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Person',
    name: 'Ashutosh Salunkhe',
    email: 'ashutoshsalunkhe2010@gmail.com',
  },
};

/**
 * Schema.org Organization JSON-LD markup.
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LingoBird',
  url: SITE_URL,
  logo: `${SITE_URL}/lingobird-logo.png`,
  sameAs: [
    'https://www.youtube.com/@lingobird_app',
    'https://apps.microsoft.com/detail/9P7N7S9N222J?hl=en-us&gl=IN&ocid=pdpshare',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'ashutoshsalunkhe2010@gmail.com',
    contactType: 'customer support',
  },
};

/**
 * Schema.org WebSite JSON-LD markup with SearchAction.
 */
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LingoBird',
  url: SITE_URL,
  description: PRIMARY_DESCRIPTION,
  publisher: {
    '@type': 'Organization',
    name: 'LingoBird',
  },
};

/**
 * Schema.org VideoObject JSON-LD markup for official YouTube video walkthrough.
 */
export const VIDEO_OBJECT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'How to Use the AI Teacher in Lingobird ?',
  description:
    'Complete walkthrough demonstrating LingoBird AI Voice Tutor, synchronized Piper neural voice streaming, Whisper on-device speech-to-text, and Google Gemma 4 26B / local Ollama model setup.',
  thumbnailUrl: ['https://i.ytimg.com/vi/eCfCsZAhf38/hqdefault.jpg'],
  uploadDate: '2026-11-12T00:00:00Z',
  contentUrl: 'https://youtu.be/eCfCsZAhf38',
  embedUrl: 'https://www.youtube-nocookie.com/embed/eCfCsZAhf38',
  publisher: {
    '@type': 'Organization',
    name: 'LingoBird',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/lingobird-logo.png`,
    },
  },
};

/**
 * Schema.org FAQPage JSON-LD markup for Google Rich Snippets & People Also Ask.
 */
export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

