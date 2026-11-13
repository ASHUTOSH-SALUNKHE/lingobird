export type PreviewModuleId =
  | 'overview'
  | 'flashcards'
  | 'saved'
  | 'reading'
  | 'writing'
  | 'conversation'
  | 'games'
  | 'listening'
  | 'speaking'
  | 'grammar'
  | 'tutor'
  | 'stats'
  | 'settings';

export type PreviewNavItem = {
  id: PreviewModuleId;
  label: string;
  section: 'workspace' | 'bottom';
  comingSoon?: boolean;
  isPro?: boolean;
};

export const PREVIEW_NAV_ITEMS: PreviewNavItem[] = [
  { id: 'overview', label: 'Overview', section: 'workspace' },
  { id: 'flashcards', label: 'Flashcards', section: 'workspace' },
  { id: 'saved', label: 'Saved', section: 'workspace' },
  { id: 'reading', label: 'Reading', section: 'workspace' },
  { id: 'writing', label: 'Writing', section: 'workspace' },
  { id: 'conversation', label: 'Conversation', section: 'workspace' },
  { id: 'games', label: 'Mini Games', section: 'workspace' },
  { id: 'listening', label: 'Listening', section: 'workspace', comingSoon: true },
  { id: 'speaking', label: 'Speaking', section: 'workspace', comingSoon: true },
  { id: 'grammar', label: 'Grammar', section: 'workspace' },
  { id: 'tutor', label: 'AI Tutor', section: 'workspace', isPro: true },
  { id: 'stats', label: 'Analytics', section: 'workspace' },
  { id: 'settings', label: 'Settings', section: 'bottom' },
];

/**
 * Authentic LingoBird Blueberry Bliss Light Palette constants.
 * Scoped explicitly so the desktop preview always preserves the real
 * Windows light-blue & white app identity regardless of site dark mode.
 */
export const BB = {
  sidebarBg: '#cfe0f2',
  canvasBg: '#ddeaf8',
  surface: '#ffffff',
  surfaceSubtle: '#e7f1fb',
  inputBg: '#f0f7ff',
  accent: '#3373b0',
  accentHover: '#2560a0',
  accentEdge: '#0b385f',
  accentSoft: 'rgba(51, 115, 176, 0.14)',
  textPrimary: '#1c2127',
  textSecondary: '#2d4a6a',
  textMuted: '#537396',
  border: 'rgba(51, 115, 176, 0.20)',
  borderStrong: 'rgba(11, 56, 95, 0.28)',
  correct: '#2d8a5b',
  correctSoft: '#e8f7ef',
  amber: '#c4760a',
  amberSoft: '#fef4e2',
  purple: '#7c3aed',
  purpleSoft: 'rgba(124, 58, 237, 0.12)',
  cardShadow: '0 2px 0 rgba(51, 115, 176, 0.22), 0 6px 16px rgba(11, 56, 95, 0.08)',
} as const;

export const SPOTLIGHT_WORDS = [
  {
    front: '木漏れ日',
    phonetic: 'komorebi',
    back: 'Sunlight filtering through leaves',
    exampleFront: '木漏れ日の下で本を読みます。',
    exampleBack: 'Reading a book beneath sunlight filtering through leaves.',
    deck: 'Japanese Core Essentials',
    langCode: 'ja-JP',
  },
  {
    front: 'Sobremesa',
    phonetic: 'so-bre-ME-sa',
    back: 'Warm table conversation after a meal',
    exampleFront: 'Disfrutamos una larga sobremesa.',
    exampleBack: 'We enjoyed a lingering conversation after dinner.',
    deck: 'Spanish Cultural Gems',
    langCode: 'es-ES',
  },
  {
    front: 'Flâner',
    phonetic: 'fla-NE',
    back: 'To stroll slowly without hurry',
    exampleFront: 'J’aime flâner le long de la rivière.',
    exampleBack: 'I love strolling gently along the river.',
    deck: 'French Everyday Calm',
    langCode: 'fr-FR',
  },
];

export const QUICK_TRANSLATIONS = [
  {
    id: 'coffee',
    source: 'A coffee with milk, please.',
    target: 'Un café con leche, por favor.',
    lang: 'Spanish',
    langCode: 'es-ES',
  },
  {
    id: 'quiet',
    source: 'Let us practice little by little today.',
    target: '今日少しずつ練習しましょう。',
    lang: 'Japanese',
    langCode: 'ja-JP',
  },
  {
    id: 'morning',
    source: 'Good morning, how are you feeling?',
    target: 'Bonjour, comment allez-vous aujourd’hui ?',
    lang: 'French',
    langCode: 'fr-FR',
  },
];

