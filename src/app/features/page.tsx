import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Layers, BookOpen, PenLine, MessagesSquare, Gamepad2, BookmarkCheck, Bot, Compass, ArrowRight } from 'lucide-react';
import { getMediaAvailability } from '@/lib/mediaServer';
import { SCREENSHOT_SLOTS } from '@/lib/mediaRegistry';
import { MediaSlot } from '@/components/MediaSlot';

export const metadata: Metadata = {
  title: 'Features — Spaced Repetition, Reading, Writing & Conversation Studios | LingoBird',
  description:
    'Explore LingoBird desktop studios: FSRS-powered flashcards, custom HTML/CSS card designer, graded reading atelier, character-level writing master, 9 mini games, and offline AI conversation.',
  keywords: [
    'FSRS flashcards app',
    'HTML CSS flashcards',
    'language practice application',
    'graded reading Japanese Spanish',
    'language writing practice software',
    'conversation practice app',
    'spaced repetition Windows',
    'language learning games desktop',
    'vocabulary notebook app',
    'grammar curriculum software',
  ],
  alternates: {
    canonical: '/features',
  },
  openGraph: {
    title: 'LingoBird Features — Complete Language Practice Studio for Windows',
    description:
      'Master vocabulary with FSRS, read graded stories, write with live character feedback, and converse with neural voices.',
    url: '/features',
  },
};

const FEATURE_GROUPS = [
  {
    id: 'flashcards',
    badge: 'Memory Science + Design',
    icon: Layers,
    title: 'FSRS Flashcards & HTML/CSS Card Studio',
    desc: 'Study with scientific Free Spaced Repetition Scheduler (FSRS) intervals while customizing card front and back designs in real time — or paste custom HTML/CSS directly from an AI prompt.',
    points: [
      'Again, Hard, Good & Easy recall ratings with deck stability forecasts',
      'Built-in Flashcard Studio editor with live visual canvas, element tree & code tabs',
      'Attach card images or audio notes saved right alongside your deck',
      'Export and import self-contained .lbdeck bundles to share or back up decks',
      'Built-in Flashcard Creation Guide accessible anytime inside Settings',
    ],
    slotKey: 'flashcardsStudio',
  },
  {
    id: 'reading-writing',
    badge: 'Input + Output',
    icon: BookOpen,
    title: 'Graded Reading & Character-Level Writing Atelier',
    desc: 'Read graded target-language stories with inline pronunciation, click any unfamiliar word to inspect & save, then flip into Writing Atelier for gentle real-time translation mastery.',
    points: [
      'Reading stories in Japanese, Spanish, and more with N5–B2 difficulty badges',
      'Toggle phonetic overlays (Romaji, Hiragana, stressed pronunciation) calmly',
      'Instant Word Inspector modal + comprehension checks + Reading Mistakes Workout',
      'Writing Atelier: live character matching, accent-friendly forgiveness & Word Hints',
      'Writing Sentence Story mode for step-by-step guided prose practice',
    ],
    slotKey: 'readingWriting',
  },
  {
    id: 'conversation-games',
    badge: 'Active Fluency',
    icon: MessagesSquare,
    title: 'Conversation Arena, 9 Mini Games & Grammar Curriculum',
    desc: 'Practice everyday situations with natural speaker voices, reinforce recall through 9 fast games pulling straight from your Saved Notebook or Decks, and clear structured Grammar syllabi.',
    points: [
      'Multi-speaker Conversation dialogues with synchronized wave playback',
      'Generate custom Conversation lessons cleanly via ChatGPT JSON prompt workflow',
      '9 Mini Games across Vocabulary, Sentence, Grammar & Dialogue categories',
      'Play Mini Games using your own Saved Words, Decks, or Active Mistakes',
      'Grammar Arena: topic curriculum tree, mastery dashboard, boss fights & custom packs',
    ],
    slotKey: 'conversationGames',
  },
  {
    id: 'ai-tutor',
    badge: 'Spoken Partner',
    icon: Bot,
    title: 'AI Voice Tutor & Saved Vocabulary Vault',
    desc: 'Converse freely about topics or target vocabulary using Google Gemini/Gemma or local Ollama, backed by a calm Saved Notebook and Mistakes Workout across Reading, Writing & Games.',
    points: [
      'Real-time voice reply paired with streaming subtitles & slow-speed toggle',
      'Target Word Tracker nudges you gently to use new words in conversation',
      'Click any word spoken by the AI Tutor to translate & save without interrupting',
      'Saved Notebook groups words by language, category, difficulty & starred status',
      'Startup Guide + Calm/Neon themes + JSON database backup & restore',
    ],
    slotKey: 'aiTutorWorkspace',
  },
];

export default function FeaturesPage() {
  const availability = getMediaAvailability();

  return (
    <main className="pt-28 sm:pt-32">
      {/* Header */}
      <section className="px-5 sm:px-6 pb-14 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="calm-tag">Complete Capabilities</span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
            Every Studio Built for <span className="calm-gradient-text">Quiet Focus</span>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            Each module lives cleanly inside one calm Windows desktop window — modular when you explore, serene while you focus.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Link href="/#playground" className="calm-btn-primary text-xs py-2.5 px-5">
              Try Interactive Preview
            </Link>
            <Link href="/ai-engine" className="calm-btn-secondary text-xs py-2.5 px-5">
              See Offline Voices &amp; AI
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Groups */}
      <div className="space-y-12 px-5 sm:px-6 pb-16">
        {FEATURE_GROUPS.map((group, idx) => {
          const Icon = group.icon;
          const slot = SCREENSHOT_SLOTS[group.slotKey];
          const reversed = idx % 2 === 1;
          return (
            <section
              key={group.id}
              id={group.id}
              className="max-w-5xl mx-auto calm-card p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className={`lg:col-span-5 space-y-4 ${reversed ? 'lg:order-2' : ''}`}>
                  <div className="inline-flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                      {group.badge}
                    </span>
                  </div>

                  <h2 className="font-display font-semibold text-2xl sm:text-3xl leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {group.title}
                  </h2>

                  <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {group.desc}
                  </p>

                  <ul className="space-y-2.5 list-none p-0 m-0">
                    {group.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--mint)' }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`lg:col-span-7 ${reversed ? 'lg:order-1' : ''}`}>
                  <MediaSlot slot={slot} availability={availability} />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Onboarding & Themes strip */}
      <section className="px-5 sm:px-6 pb-8" style={{ background: 'var(--bg-sky)' }}>
        <div className="max-w-5xl mx-auto py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="calm-tag">
              <Compass className="w-3.5 h-3.5" />
              Guided Experience
            </span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
              Built-In Startup &amp; Flashcard Guides
            </h2>
            <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
              New learners are gently greeted with an optional Startup Guide covering Gemini API, Speech-to-Text, Voice Packs, and Offline Translators — plus a dedicated 7-step Flashcard Styling walkthrough. Turn either off permanently or re-open them anytime from Settings.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
              <div className="p-3 rounded-2xl border flex items-center gap-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <PenLine className="w-4 h-4" style={{ color: 'var(--amber)' }} />
                <span>Custom Card Guide</span>
              </div>
              <div className="p-3 rounded-2xl border flex items-center gap-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <Gamepad2 className="w-4 h-4" style={{ color: 'var(--violet)' }} />
                <span>9 Practice Games</span>
              </div>
              <div className="p-3 rounded-2xl border flex items-center gap-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <BookmarkCheck className="w-4 h-4" style={{ color: 'var(--mint)' }} />
                <span>Mistakes Workouts</span>
              </div>
              <div className="p-3 rounded-2xl border flex items-center gap-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <ArrowRight className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <span>Full JSON Backups</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <MediaSlot slot={SCREENSHOT_SLOTS.onboardingGuides} availability={availability} />
          </div>
        </div>
      </section>
    </main>
  );
}

