export const MICROSOFT_STORE_URL =
  'https://apps.microsoft.com/detail/9P7N7S9N222J?hl=en-us&gl=IN&ocid=pdpshare';
export const DEVELOPER_EMAIL = 'ashutoshsalunkhe2010@gmail.com';
export const YOUTUBE_DEMO_URL = 'https://youtu.be/eCfCsZAhf38';
export const YOUTUBE_DEMO_EMBED = 'https://www.youtube-nocookie.com/embed/eCfCsZAhf38';
export const YOUTUBE_DEMO_TITLE = 'How to Use the AI Teacher in Lingobird ?';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@lingobird_app';

export interface VoiceLanguageSummary {
  language: string;
  flag: string;
  voices: string;
  sizeRange: string;
}

export interface OfflinePackSummary {
  id: string;
  pair: string;
  flag: string;
  model: string;
  size: string;
}

export interface AIModelSummary {
  name: string;
  provider: 'Google AI Studio' | 'Local Ollama';
  identifier: string;
  badge: string;
  highlight: string;
}

export const APP_STATS = [
  { label: 'Core Learning Studios', value: '8', detail: 'Flashcards, Reading, Writing, Conversation, Games, Grammar, Saved, AI Tutor' },
  { label: 'Offline Neural Voices', value: '20', detail: 'Female & Male Piper ONNX speakers across 10 languages' },
  { label: 'Offline Translator Pairs', value: '12', detail: 'Helsinki-NLP OPUS-MT neural translation packs (~31–39 MB)' },
  { label: 'Visual Calm Themes', value: '2 × 5', detail: 'Calm Daylight & Midnight Neon across 5 design personalities' },
];

export const PILLAR_EXPLORER = [
  {
    id: 'memory',
    tabLabel: 'Flashcards & Saved Vault',
    eyebrow: 'FSRS Spaced Repetition + Custom Card Studio',
    title: 'Flashcards That Adapt to Your Memory — and Match Your Style',
    description:
      'Built around the scientific FSRS memory stability scheduler, paired with an HTML/CSS Card Studio where you design front and back layouts or generate templates directly with AI.',
    bullets: [
      '4-level FSRS scheduling (Again, Hard, Good, Easy) with deck forecasts',
      'Custom Card Studio: edit templates visually, inspect elements, attach images/audio',
      'Paste AI-generated HTML/CSS card designs directly during deck setup',
      '1-click .lbdeck package export & import to share complete styled decks',
      'Saved Words Notebook organized by language, category, difficulty & star tags',
      'Automatic Mistakes Workout to recover weak vocabulary gently',
    ],
    screenshotKey: 'flashcardsStudio',
  },
  {
    id: 'immersion',
    tabLabel: 'Reading & Writing',
    eyebrow: 'Context Stories + Character-Level Atelier',
    title: 'Read Stories With Tap Glosses, Then Write Them Yourself',
    description:
      'Every reading passage comes with tap-to-inspect word definitions, phonetic overlays, audio narration, and comprehension checks — while Writing challenges turn prose into calm character-by-character feedback.',
    bullets: [
      'Graded stories (N5–B2) with inline Romaji / Devanagari / pronunciation toggles',
      'Tap any highlighted token for meaning, grammar role & 1-click deck saving',
      'Sentence-by-sentence & full-article audio playback using offline voices',
      'Writing Atelier: real-time character validation with 3-strike smart autofill',
      'Writing Sentence Story mode & targeted Writing Mistakes Workout',
      'Click any word in Writing prompts for immediate gloss translation',
    ],
    screenshotKey: 'readingWriting',
  },
  {
    id: 'active',
    tabLabel: 'Conversation, Games & Grammar',
    eyebrow: 'Active Recall + 9 Mini Games + Structured Syllabi',
    title: 'Playful Practice Without Cognitive Overload',
    description:
      'Switch between branched multi-speaker conversations, 9 fast-paced mini games backed by your own Saved Words or Decks, and structured grammar syllabi with boss battles.',
    bullets: [
      'Conversation Arena with stereo audio waves, speaker voices & clickable words',
      'Import custom scenarios cleanly via ChatGPT JSON prompt builder',
      '9 Mini Games across Vocabulary, Sentence, Grammar & Dialogue modes',
      'Pull game words from Saved Notebook, Flashcard Decks, or Active Mistakes',
      'Grammar Curriculum across languages + Topic Mastery + AI Grammar Packs',
      'Encouraging streak chimes and zero punitive shame mechanics',
    ],
    screenshotKey: 'conversationGames',
  },
  {
    id: 'offline-ai',
    tabLabel: 'Offline Voices, STT & AI',
    eyebrow: 'Piper Neural TTS · Whisper STT · OPUS-MT · Ollama & Gemini',
    title: 'Works Offline on Windows — Ready for Cloud AI When You Want It',
    description:
      'Download compact neural models once inside Settings. Speak, translate, and listen completely offline — or pair with free Gemini / Gemma models (14.4K daily requests) or local Ollama.',
    bullets: [
      '20 Piper Neural TTS voices (female & male) across 10 languages via ONNX WASM',
      'Whisper Tiny (~39 MB) & Whisper Base (~73 MB) offline speech-to-text + Groq Cloud',
      '12 Helsinki-NLP OPUS-MT offline translators running inside LingoBird',
      'Google Gemma 4 (26B/31B) & Gemini 2.5 Flash/Pro with your own AI Studio key',
      'One-click Local Ollama scanner for gemma3:4b, llama3.2, mistral & deepseek-r1',
      'Friendly Startup Guide & Flashcard Guide plus complete JSON database backups',
    ],
    screenshotKey: 'settingsOfflineAi',
  },
];

export const PIPER_VOICE_LANGUAGES: VoiceLanguageSummary[] = [
  { language: 'English (US)', flag: '🇺🇸', voices: 'Lessac (F) · Ryan (M)', sizeRange: '~60 MB' },
  { language: 'Spanish', flag: '🇪🇸', voices: 'Sharvard (F) · DaveFX (M)', sizeRange: '~60–73 MB' },
  { language: 'French', flag: '🇫🇷', voices: 'Siwis (F) · Tom (M)', sizeRange: '~60 MB' },
  { language: 'German', flag: '🇩🇪', voices: 'Ramona (F) · Thorsten (M)', sizeRange: '~60 MB' },
  { language: 'Italian', flag: '🇮🇹', voices: 'Paola (F) · Riccardo (M)', sizeRange: '~27–60 MB' },
  { language: 'Portuguese', flag: '🇵🇹', voices: 'Tugão (F) · Faber (M)', sizeRange: '~60 MB' },
  { language: 'Russian', flag: '🇷🇺', voices: 'Irina (F) · Denis (M)', sizeRange: '~60 MB' },
  { language: 'Mandarin Chinese', flag: '🇨🇳', voices: 'Huayan (F) · Chaowen (M)', sizeRange: '~60 MB' },
  { language: 'Hindi', flag: '🇮🇳', voices: 'Priyamvada (F) · Pratham (M)', sizeRange: '~60 MB' },
  { language: 'Japanese', flag: '🇯🇵', voices: 'Hi-Fi Captain F & M (OpenJTalk)', sizeRange: '~73 MB' },
];

export const OPUS_TRANSLATION_PACKS: OfflinePackSummary[] = [
  { id: 'es-en', pair: 'Spanish ⇄ English (2 packs)', flag: '🇪🇸 ⇄ 🇬🇧', model: 'opus-mt-es-en / en-es', size: '~32–33 MB' },
  { id: 'fr-en', pair: 'French ⇄ English (2 packs)', flag: '🇫🇷 ⇄ 🇬🇧', model: 'opus-mt-fr-en / en-fr', size: '~31 MB' },
  { id: 'de-en', pair: 'German ⇄ English (2 packs)', flag: '🇩🇪 ⇄ 🇬🇧', model: 'opus-mt-de-en / en-de', size: '~32 MB' },
  { id: 'it-en', pair: 'Italian → English', flag: '🇮🇹 → 🇬🇧', model: 'opus-mt-it-en', size: '~31 MB' },
  { id: 'pt-en', pair: 'Portuguese → English', flag: '🇵🇹 → 🇬🇧', model: 'opus-mt-pt-en', size: '~31 MB' },
  { id: 'ru-en', pair: 'Russian → English', flag: '🇷🇺 → 🇬🇧', model: 'opus-mt-ru-en', size: '~34 MB' },
  { id: 'zh-en', pair: 'Chinese → English', flag: '🇨🇳 → 🇬🇧', model: 'opus-mt-zh-en', size: '~38 MB' },
  { id: 'ja-en', pair: 'Japanese → English', flag: '🇯🇵 → 🇬🇧', model: 'opus-mt-jap-en', size: '~39 MB' },
  { id: 'hi-en', pair: 'Hindi → English', flag: '🇮🇳 → 🇬🇧', model: 'opus-mt-hi-en', size: '~35 MB' },
];

export const AI_MODEL_OPTIONS: AIModelSummary[] = [
  {
    name: 'Google Gemma 4 26B / 31B',
    provider: 'Google AI Studio',
    identifier: 'gemma-4-26b-a4b-it · gemma-4-31b-it',
    badge: 'Recommended · 14.4K free req/day',
    highlight: 'Generous daily quota with rich multilingual reasoning & roleplay quality.',
  },
  {
    name: 'Google Gemini 2.5 Flash & Pro',
    provider: 'Google AI Studio',
    identifier: 'gemini-2.5-flash · gemini-2.5-pro',
    badge: 'Low-Latency Cloud',
    highlight: 'Fast daily driver for instant answer grading, story generation & deep grammar breakdowns.',
  },
  {
    name: 'Ollama (gemma3:4b)',
    provider: 'Local Ollama',
    identifier: 'gemma3:4b (localhost:11434)',
    badge: '100% Offline Recommended',
    highlight: 'Runs completely locally on Windows for zero-cost, zero-cloud-latency tutoring.',
  },
  {
    name: 'Llama 3.2 · Mistral · DeepSeek R1 · Qwen 2.5',
    provider: 'Local Ollama',
    identifier: 'llama3.2 · mistral · deepseek-r1:8b · qwen2.5:3b',
    badge: 'Auto-Detected',
    highlight: 'One-click local Ollama scanner adds any model already pulled on your machine.',
  },
];

export const STT_OPTIONS = [
  {
    name: 'Whisper Tiny Multilingual (On-Device)',
    model: 'Xenova/whisper-tiny',
    size: '~39 MB · <150 MB RAM',
    detail: 'Fastest int8 ONNX WebAssembly transcription for 99+ languages right inside Windows.',
  },
  {
    name: 'Whisper Base Multilingual (On-Device)',
    model: 'Xenova/whisper-base',
    size: '~73 MB · <220 MB RAM',
    detail: '97% accent & grammar precision with stronger tolerance for natural learner speech.',
  },
  {
    name: 'Whisper Tiny English & Groq Cloud STT',
    model: 'Xenova/whisper-tiny.en · Groq Whisper',
    size: '~39 MB local or Cloud fallback',
    detail: 'Dedicated English pronunciation precision offline or ultra-fast Groq Whisper API option.',
  },
];

export const VISUAL_PERSONALITIES = [
  { name: 'Claymorphism', note: 'Default tactile 3D surface softness with sky highlights' },
  { name: 'Glassmorphism', note: 'Translucent frosted layers with calm atmospheric depth' },
  { name: 'Neumorphism', note: 'Soft extruded monochrome panels for low visual contrast' },
  { name: 'Bento Grid', note: 'Crisp modular cards with clean hairline separators' },
  { name: 'Minimalism', note: 'Ultra-flat paper canvas for distraction-free study' },
];

