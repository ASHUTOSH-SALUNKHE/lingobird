export interface ScreenshotSlotSpec {
  id: string;
  src: string;
  title: string;
  caption: string;
  recommendedSize: string;
  accent: 'sky' | 'mint' | 'amber' | 'violet';
}

export interface VideoSlotSpec {
  id: string;
  src: string;
  poster?: string;
  tabLabel: string;
  title: string;
  summary: string;
  durationHint: string;
  highlights: string[];
  recommendedSize: string;
}

export const SCREENSHOT_SLOTS: Record<string, ScreenshotSlotSpec> = {
  heroOverview: {
    id: 'hero-overview',
    src: '/screenshots/hero-overview.png',
    title: 'LingoBird Desktop Overview',
    caption:
      'Main Windows Desktop workspace with daily study streak, spotlight flashcard, real-time offline translator, and deck mastery cards.',
    recommendedSize: '1600 × 1000 px (PNG or WebP)',
    accent: 'sky',
  },
  flashcardsStudio: {
    id: 'flashcards-studio',
    src: '/screenshots/flashcards-studio.png',
    title: 'FSRS Flashcards & HTML/CSS Card Studio',
    caption:
      'Deck workspace showing custom HTML/CSS templates, ChatGPT template prompt workflow, audio attachments, and 4-level FSRS review.',
    recommendedSize: '1600 × 1000 px (PNG or WebP)',
    accent: 'sky',
  },
  readingWriting: {
    id: 'reading-writing',
    src: '/screenshots/reading-writing.png',
    title: 'Reading Stories & Writing Atelier',
    caption:
      'Side-by-side graded story inspection with phonetic reading overlays or character-validated paragraph translation.',
    recommendedSize: '1600 × 1000 px (PNG or WebP)',
    accent: 'mint',
  },
  conversationGames: {
    id: 'conversation-games',
    src: '/screenshots/conversation-games.png',
    title: 'Conversation Arena & 9 Mini Games',
    caption:
      'Branched roleplay scenarios with spoken audio waves alongside Matching Pairs, Sentence Fill, Dialogue Reply, and Grammar battles.',
    recommendedSize: '1600 × 1000 px (PNG or WebP)',
    accent: 'violet',
  },
  settingsOfflineAi: {
    id: 'settings-offline-ai',
    src: '/screenshots/settings-offline-ai.png',
    title: 'Offline Voices, Whisper STT & AI Models Settings',
    caption:
      'Piper neural voice manager, Whisper local STT models, Helsinki-NLP translation packs, Gemini/Gemma API setup, and Ollama scanner.',
    recommendedSize: '1600 × 1000 px (PNG or WebP)',
    accent: 'amber',
  },
  aiTutorWorkspace: {
    id: 'ai-tutor-workspace',
    src: '/screenshots/ai-tutor-workspace.png',
    title: 'AI Tutor Real-Time Conversation Window',
    caption:
      'Live voice and text practice with synchronized speech streaming, inline word translation popovers, and target word progress.',
    recommendedSize: '1600 × 1000 px (PNG or WebP)',
    accent: 'violet',
  },
  onboardingGuides: {
    id: 'onboarding-guides',
    src: '/screenshots/onboarding-guides.png',
    title: 'Built-In App Onboarding & Flashcard Guide',
    caption:
      'Step-by-step startup guide and flashcard creation assistant that new users can pause, skip, or revisit anytime in Settings.',
    recommendedSize: '1600 × 1000 px (PNG or WebP)',
    accent: 'sky',
  },
};

export const AI_TUTOR_VIDEOS: VideoSlotSpec[] = [
  {
    id: 'ai-tutor-overview',
    src: '/videos/ai-tutor-overview.mp4',
    tabLabel: 'Live Voice & Text Tutor',
    title: 'How the AI Tutor Guides Real Conversations',
    summary:
      'Watch a full topic or scenario session: synchronized voice synthesis reads while tokens appear on screen, and you reply naturally by voice or keyboard.',
    durationHint: '~60–90 sec walkthrough',
    highlights: [
      'Synchronized Piper/TTS playback while the reply streams live',
      'Topic & vocabulary drill presets across any language level',
      'Pause, slow down speech rate, or replay any tutor bubble',
    ],
    recommendedSize: '1920 × 1080 px (MP4 H.264 / WebM)',
  },
  {
    id: 'ai-tutor-voice-loop',
    src: '/videos/ai-tutor-voice-loop.mp4',
    tabLabel: 'Speech-to-Text & Word Gloss',
    title: 'Tap Words Mid-Chat & Speak Hands-Free',
    summary:
      'See how Whisper on-device speech recognition transcribes your pronunciation and lets you click unfamiliar tutor words for instant translations and flashcard capture.',
    durationHint: '~45–60 sec clip',
    highlights: [
      'Local Whisper Tiny/Base (~39–73 MB) or Groq Cloud mic capture',
      'Inline word translation popover without breaking conversation flow',
      'Live Target Word Tracker rewarding active vocabulary usage',
    ],
    recommendedSize: '1920 × 1080 px (MP4 H.264 / WebM)',
  },
  {
    id: 'ai-tutor-setup',
    src: '/videos/ai-tutor-setup.mp4',
    tabLabel: 'Free Gemini or Local Ollama',
    title: 'Set Up AI Models & Offline Voices in 1 Minute',
    summary:
      'Connect Google AI Studio (Gemma 4 26B / 31B with 14.4K free daily requests) or detect locally installed Ollama models like gemma3:4b for 100% offline tutoring.',
    durationHint: '~45 sec setup clip',
    highlights: [
      'Guided in-app onboarding & test connection button',
      'Automatic Ollama model scanner on localhost:11434',
      'Switch models seamlessly mid-hub before starting a session',
    ],
    recommendedSize: '1920 × 1080 px (MP4 H.264 / WebM)',
  },
];

export type MediaAvailability = Record<string, boolean>;

