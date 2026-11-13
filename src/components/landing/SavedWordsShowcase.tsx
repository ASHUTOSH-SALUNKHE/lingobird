'use client';

import { useMemo, useState } from 'react';
import { Volume2, Star, Search, X } from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';

type Difficulty = 'easy' | 'medium' | 'hard';
type LanguageId = 'all' | 'es' | 'fr' | 'ja';

interface DemoSavedWord {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  language: 'es' | 'fr' | 'ja';
  langName: string;
  langCode: string;
  topic: string;
  difficulty: Difficulty;
  starred: boolean;
}

const INITIAL_SAVED_WORDS: DemoSavedWord[] = [
  {
    id: 'sw-1',
    word: 'la casa acogedora',
    phonetic: 'lah KAH-sah ah-koh-heh-DOH-rah',
    meaning: 'the cozy house',
    language: 'es',
    langName: 'Spanish',
    langCode: 'es-ES',
    topic: 'Home',
    difficulty: 'easy',
    starred: true,
  },
  {
    id: 'sw-2',
    word: 'el dormitorio amplio',
    phonetic: 'ehl dohr-mee-TOH-ryoh AHM-plyoh',
    meaning: 'the spacious bedroom',
    language: 'es',
    langName: 'Spanish',
    langCode: 'es-ES',
    topic: 'Home',
    difficulty: 'medium',
    starred: true,
  },
  {
    id: 'sw-3',
    word: 'el jardín florecido',
    phonetic: 'ehl har-DEEN floh-reh-SEE-doh',
    meaning: 'the blooming garden',
    language: 'es',
    langName: 'Spanish',
    langCode: 'es-ES',
    topic: 'Nature',
    difficulty: 'medium',
    starred: false,
  },
  {
    id: 'sw-4',
    word: 'la cocina luminosa',
    phonetic: 'lah koh-SEE-nah loo-mee-NOH-sah',
    meaning: 'the bright kitchen',
    language: 'es',
    langName: 'Spanish',
    langCode: 'es-ES',
    topic: 'Home',
    difficulty: 'easy',
    starred: true,
  },
  {
    id: 'sw-5',
    word: 'flâner',
    phonetic: 'flah-NAY',
    meaning: 'to stroll unhurriedly',
    language: 'fr',
    langName: 'French',
    langCode: 'fr-FR',
    topic: 'Calm',
    difficulty: 'hard',
    starred: true,
  },
  {
    id: 'sw-6',
    word: 'matin calme',
    phonetic: 'mah-TAN KAHLM',
    meaning: 'quiet morning',
    language: 'fr',
    langName: 'French',
    langCode: 'fr-FR',
    topic: 'Daily',
    difficulty: 'easy',
    starred: false,
  },
  {
    id: 'sw-7',
    word: '喫茶店',
    phonetic: 'きっさてん · kissaten',
    meaning: 'cozy traditional café',
    language: 'ja',
    langName: 'Japanese',
    langCode: 'ja-JP',
    topic: 'Café',
    difficulty: 'easy',
    starred: true,
  },
  {
    id: 'sw-8',
    word: '木漏れ日',
    phonetic: 'こもれび · komorebi',
    meaning: 'sunlight through trees',
    language: 'ja',
    langName: 'Japanese',
    langCode: 'ja-JP',
    topic: 'Nature',
    difficulty: 'hard',
    starred: true,
  },
];

const DIFFICULTY_META: Record<
  Difficulty,
  { label: string; bg: string; color: string; dot: string; next: Difficulty }
> = {
  easy: {
    label: 'Easy',
    bg: 'var(--mint-soft)',
    color: 'var(--mint)',
    dot: 'var(--mint)',
    next: 'medium',
  },
  medium: {
    label: 'Medium',
    bg: 'var(--amber-soft)',
    color: 'var(--amber)',
    dot: 'var(--amber)',
    next: 'hard',
  },
  hard: {
    label: 'Difficult',
    bg: 'var(--coral-soft)',
    color: 'var(--coral)',
    dot: 'var(--coral)',
    next: 'easy',
  },
};

export function SavedWordsShowcase() {
  const [words, setWords] = useState<DemoSavedWord[]>(INITIAL_SAVED_WORDS);
  const [selectedLang, setSelectedLang] = useState<LanguageId>('es');
  const [starredOnly, setStarredOnly] = useState(false);
  const [query, setQuery] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [statusNote, setStatusNote] = useState<string | null>(null);

  const langCounts = useMemo(
    () => ({
      all: words.length,
      es: words.filter((w) => w.language === 'es').length,
      fr: words.filter((w) => w.language === 'fr').length,
      ja: words.filter((w) => w.language === 'ja').length,
    }),
    [words]
  );

  const visibleWords = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (starredOnly && !w.starred) return false;
      if (!q && selectedLang !== 'all' && w.language !== selectedLang) return false;
      if (!q) return true;
      return (
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        w.phonetic.toLowerCase().includes(q) ||
        w.langName.toLowerCase().includes(q)
      );
    });
  }, [words, selectedLang, starredOnly, query]);

  const toggleStar = (id: string) => {
    playSoftChime('tap');
    let nextStarred = false;
    let label = '';
    setWords((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        nextStarred = !w.starred;
        label = w.word;
        return { ...w, starred: nextStarred };
      })
    );
    if (label) {
      setStatusNote(nextStarred ? `Starred “${label}” for priority review` : `Unstarred “${label}”`);
    }
  };

  const cycleDifficulty = (id: string) => {
    playSoftChime('tap');
    let nextLabel = '';
    let wordLabel = '';
    setWords((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const nextDiff = DIFFICULTY_META[w.difficulty].next;
        nextLabel = DIFFICULTY_META[nextDiff].label;
        wordLabel = w.word;
        return { ...w, difficulty: nextDiff };
      })
    );
    if (wordLabel) {
      setStatusNote(`Updated “${wordLabel}” to ${nextLabel}`);
    }
  };

  const handlePronounce = async (word: DemoSavedWord) => {
    setSpeakingId(word.id);
    await speakPhrase(word.word, word.langCode);
    setSpeakingId(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[420px] py-3">
        {/* Stacked Paper Layers Behind Main Notebook Card */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-x-3 top-2 bottom-2 rounded-[26px] border pointer-events-none"
          style={{
            background: 'var(--bg-surface-soft)',
            borderColor: 'var(--border)',
            transform: 'rotate(-2.6deg) translate(-6px, 2px)',
          }}
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-x-1.5 top-2.5 bottom-1.5 rounded-[26px] border pointer-events-none"
          style={{
            background: 'var(--bg-surface-soft)',
            borderColor: 'var(--border-strong)',
            boxShadow: 'var(--shadow-clay)',
            transform: 'rotate(1.9deg) translate(5px, 1px)',
          }}
        />

        {/* Delicate Curved Margin Annotations matching Section 2's Visual Craft */}
        <div
          aria-hidden="true"
          className="hidden xl:flex flex-col items-center absolute -right-11 top-12 z-30 pointer-events-none select-none"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg viewBox="0 0 46 36" className="w-10 h-8 -ml-3">
            <path
              d="M36,28 C26,10 14,10 8,16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14,10 L7,17 L16,19"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] font-bold leading-tight text-center -mt-1">
            quick
            <br />
            review
          </span>
        </div>

        <div
          aria-hidden="true"
          className="hidden xl:flex flex-col items-center absolute -left-11 bottom-16 z-30 pointer-events-none select-none"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="text-[11px] font-bold leading-tight text-center mb-0.5">
            quick
            <br />
            review
          </span>
          <svg viewBox="0 0 46 36" className="w-10 h-8 ml-2">
            <path
              d="M8,6 C16,24 28,26 38,18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M31,15 L39,18 L34,25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Main Saved Words Notebook Card */}
        <div
          className="relative z-20 rounded-[26px] border p-4 sm:p-5 space-y-3"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
            boxShadow: 'var(--shadow-clay-hover)',
          }}
        >
          {/* Card Header + Search */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-medium text-xl leading-tight m-0" style={{ color: 'var(--text-primary)' }}>
                Saved Words
              </h3>
              <p className="text-[11px] font-bold m-0 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                Your Saved Words ({visibleWords.length})
              </p>
            </div>

            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border w-36 sm:w-40"
              style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}
            >
              <Search className="w-3 h-3 shrink-0" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search saved words"
                className="w-full min-w-0 bg-transparent border-0 outline-none text-[11px] font-semibold"
                style={{ color: 'var(--text-primary)' }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="p-0.5 border-0 bg-transparent cursor-pointer shrink-0"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Language & Priority Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {(
              [
                { id: 'all', code: '', label: 'All', count: langCounts.all },
                { id: 'es', code: 'ES', label: 'Spanish', count: langCounts.es },
                { id: 'fr', code: 'FR', label: 'French', count: langCounts.fr },
                { id: 'ja', code: 'JP', label: 'Japanese', count: langCounts.ja },
              ] as const
            ).map((pill) => {
              const active = !query.trim() && selectedLang === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => {
                    playSoftChime('tap');
                    setQuery('');
                    setSelectedLang(pill.id);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold cursor-pointer transition-colors"
                  style={{
                    background: active ? 'var(--accent-soft)' : 'var(--bg-surface-soft)',
                    borderColor: active ? 'var(--accent)' : 'var(--border)',
                    color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                >
                  {pill.code && (
                    <span className="text-[9px] font-mono-code opacity-80">{pill.code}</span>
                  )}
                  <span>{pill.label}</span>
                  <span
                    className="px-1.5 py-0.2 rounded-full text-[9px] font-mono-code"
                    style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}
                  >
                    {pill.count}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                playSoftChime('tap');
                setStarredOnly((s) => !s);
              }}
              aria-pressed={starredOnly}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] font-bold cursor-pointer transition-colors"
              style={{
                background: starredOnly ? 'var(--amber-soft)' : 'var(--bg-surface-soft)',
                borderColor: starredOnly ? 'var(--amber)' : 'var(--border)',
                color: starredOnly ? 'var(--amber)' : 'var(--text-secondary)',
              }}
            >
              <Star className={`w-3 h-3 ${starredOnly ? 'fill-current' : ''}`} />
              <span>Starred</span>
            </button>
          </div>

          {/* 2x2 Saved Vocabulary Cards Grid */}
          {visibleWords.length === 0 ? (
            <div
              className="rounded-2xl border border-dashed p-6 text-center space-y-2"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface-soft)' }}
            >
              <p className="text-xs font-bold m-0" style={{ color: 'var(--text-primary)' }}>
                No matching words found
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setStarredOnly(false);
                  setSelectedLang('all');
                }}
                className="px-3 py-1 rounded-full text-[11px] font-bold border cursor-pointer"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--accent)' }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[292px] overflow-y-auto pr-0.5">
              {visibleWords.map((item) => {
                const diff = DIFFICULTY_META[item.difficulty];
                const isSpeaking = speakingId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border p-3 flex flex-col justify-between gap-2 text-left transition-colors"
                    style={{
                      background: 'var(--bg-surface-soft)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {/* Word + Phonetic + Star */}
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="flex items-start gap-2 min-w-0">
                        <button
                          type="button"
                          onClick={() => void handlePronounce(item)}
                          aria-label={`Pronounce ${item.word}`}
                          className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                          style={{
                            background: isSpeaking ? 'var(--accent)' : 'var(--bg-surface)',
                            borderColor: isSpeaking ? 'var(--accent)' : 'var(--border)',
                            color: isSpeaking ? '#ffffff' : 'var(--accent)',
                          }}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="min-w-0">
                          <div
                            className="font-lang font-bold text-[12px] leading-tight truncate"
                            style={{ color: 'var(--text-primary)' }}
                            title={item.word}
                          >
                            {item.word}
                          </div>
                          <div
                            className="text-[10px] font-mono-code leading-tight mt-0.5 truncate"
                            style={{ color: 'var(--text-muted)' }}
                            title={`/${item.phonetic}/`}
                          >
                            /{item.phonetic}/
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleStar(item.id)}
                        aria-label={item.starred ? `Unstar ${item.word}` : `Star ${item.word}`}
                        className="p-1 rounded-lg border-0 bg-transparent cursor-pointer shrink-0 transition-transform hover:scale-110"
                        style={{ color: item.starred ? 'var(--amber)' : 'var(--text-muted)' }}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.starred ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Meaning */}
                    <div>
                      <div
                        className="text-[9px] font-bold uppercase tracking-wider leading-none"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Meaning
                      </div>
                      <div
                        className="text-xs font-semibold leading-snug mt-0.5 truncate"
                        style={{ color: 'var(--text-primary)' }}
                        title={item.meaning}
                      >
                        {item.meaning}
                      </div>
                    </div>

                    {/* Footer: Interactive Difficulty Badge + Topic Tag */}
                    <div className="flex items-center justify-between gap-1.5 pt-0.5">
                      <button
                        type="button"
                        onClick={() => cycleDifficulty(item.id)}
                        title="Click to cycle difficulty level"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer transition-transform hover:-translate-y-0.5"
                        style={{
                          background: diff.bg,
                          borderColor: 'var(--border)',
                          color: diff.color,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: diff.dot }}
                        />
                        <span>{diff.label}</span>
                      </button>

                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                        style={{
                          background: 'var(--bg-surface)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.topic}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Minimalist Interactive Caption / Feedback under Library Panel */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
        <span className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
          Click speaker to hear · Star to prioritize · Tap difficulty to cycle
        </span>
      </div>

      {statusNote && (
        <span className="text-xs font-bold mt-1.5" style={{ color: 'var(--mint)' }}>
          {statusNote}
        </span>
      )}
    </div>
  );
}
