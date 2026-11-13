'use client';

import { useState } from 'react';
import { Volume2, BookmarkPlus, Check, Eye, Sparkles } from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';
import type { SavedDemoWord } from './playgroundTypes';

interface VocabEntry {
  word: string;
  reading: string;
  partOfSpeech: string;
  meaning: string;
}

interface ReadingStory {
  id: 'jp' | 'es';
  label: string;
  title: string;
  level: string;
  language: string;
  langCode: string;
  sentences: {
    original: string;
    phonetic: string;
    translation: string;
    tokens: { text: string; vocabKey?: string }[];
  }[];
  vocab: Record<string, VocabEntry>;
  quiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const STORIES: Record<'jp' | 'es', ReadingStory> = {
  jp: {
    id: 'jp',
    label: '🇯🇵 Japanese N5',
    title: '雨の日の小さな喫茶店 · A Rainy Day at the Small Café',
    level: 'Beginner N5',
    language: 'Japanese',
    langCode: 'ja-JP',
    sentences: [
      {
        original: '雨の日に、静かな喫茶店に入りました。',
        phonetic: 'Ame no hi ni, shizuka na kissaten ni hairimashita.',
        translation: 'On a rainy day, I entered a quiet coffee shop.',
        tokens: [
          { text: '雨', vocabKey: '雨' },
          { text: 'の日に、' },
          { text: '静かな', vocabKey: '静かな' },
          { text: '喫茶店', vocabKey: '喫茶店' },
          { text: 'に入りました。' },
        ],
      },
      {
        original: '漢字は少し難しいですが、毎日少しずつ練習しましょう。',
        phonetic: 'Kanji wa sukoshi muzukashii desu ga, mainichi sukoshizutsu renshuu shimashou.',
        translation: 'Kanji is a little difficult, so let us practice little by little every day.',
        tokens: [
          { text: '漢字', vocabKey: '漢字' },
          { text: 'は' },
          { text: '少し', vocabKey: '少し' },
          { text: '難しいですが、' },
          { text: '毎日', vocabKey: '毎日' },
          { text: '少しずつ', vocabKey: '少しずつ' },
          { text: '練習', vocabKey: '練習' },
          { text: 'しましょう。' },
        ],
      },
    ],
    vocab: {
      '雨': { word: '雨', reading: 'あめ (ame)', partOfSpeech: 'Noun', meaning: 'Rain' },
      '静かな': { word: '静か', reading: 'しずか (shizuka)', partOfSpeech: 'Na-Adj', meaning: 'Quiet / calm' },
      '喫茶店': { word: '喫茶店', reading: 'きっさてん (kissaten)', partOfSpeech: 'Noun', meaning: 'Small café' },
      '漢字': { word: '漢字', reading: 'かんじ (kanji)', partOfSpeech: 'Noun', meaning: 'Kanji characters' },
      '少し': { word: '少し', reading: 'すこし (sukoshi)', partOfSpeech: 'Adverb', meaning: 'A little bit' },
      '毎日': { word: '毎日', reading: 'まいにち (mainichi)', partOfSpeech: 'Noun', meaning: 'Every day' },
      '少しずつ': { word: '少しずつ', reading: 'すこしずつ (sukoshizutsu)', partOfSpeech: 'Adverb', meaning: 'Little by little' },
      '練習': { word: '練習', reading: 'れんしゅう (renshuu)', partOfSpeech: 'Noun', meaning: 'Practice' },
    },
    quiz: {
      question: 'Where did the narrator go on a rainy day?',
      options: ['A busy station', 'A quiet café', 'A bookstore', 'A park'],
      correct: 1,
      explanation: '「静かな喫茶店」 means a quiet coffee shop / café.',
    },
  },
  es: {
    id: 'es',
    label: '🇪🇸 Spanish A2',
    title: 'Un domingo tranquilo · A Calm Sunday',
    level: 'Elementary A2',
    language: 'Spanish',
    langCode: 'es-ES',
    sentences: [
      {
        original: 'Los domingos por la mañana, camino sin prisa por el parque.',
        phonetic: 'los do-MIN-gos por la ma-NYA-na, ka-MEE-no sin PREE-sa por el PAR-ke',
        translation: 'On Sunday mornings, I walk without rushing through the park.',
        tokens: [
          { text: 'Los ' },
          { text: 'domingos', vocabKey: 'domingos' },
          { text: ' por la mañana, ' },
          { text: 'camino', vocabKey: 'camino' },
          { text: ' ' },
          { text: 'sin prisa', vocabKey: 'sin prisa' },
          { text: ' por el ' },
          { text: 'parque', vocabKey: 'parque' },
          { text: '.' },
        ],
      },
      {
        original: 'Me gusta leer un libro mientras escucho música suave.',
        phonetic: 'me GOOS-ta le-ER oon LEE-bro MYEN-tras es-KOO-cho MOO-see-ka SWA-ve',
        translation: 'I enjoy reading a book while listening to soft music.',
        tokens: [
          { text: 'Me gusta ' },
          { text: 'leer', vocabKey: 'leer' },
          { text: ' un ' },
          { text: 'libro', vocabKey: 'libro' },
          { text: ' mientras escucho música ' },
          { text: 'suave', vocabKey: 'suave' },
          { text: '.' },
        ],
      },
    ],
    vocab: {
      domingos: { word: 'domingos', reading: 'do-MIN-gos', partOfSpeech: 'Noun', meaning: 'Sundays' },
      camino: { word: 'caminar', reading: 'ka-mee-NAR', partOfSpeech: 'Verb', meaning: 'I walk / to walk' },
      'sin prisa': { word: 'sin prisa', reading: 'sin PREE-sa', partOfSpeech: 'Phrase', meaning: 'Unhurried / without rushing' },
      parque: { word: 'parque', reading: 'PAR-ke', partOfSpeech: 'Noun', meaning: 'Park' },
      leer: { word: 'leer', reading: 'le-ER', partOfSpeech: 'Verb', meaning: 'To read' },
      libro: { word: 'libro', reading: 'LEE-bro', partOfSpeech: 'Noun', meaning: 'Book' },
      suave: { word: 'suave', reading: 'SWA-ve', partOfSpeech: 'Adjective', meaning: 'Soft / gentle' },
    },
    quiz: {
      question: 'What does "sin prisa" express in this passage?',
      options: ['Running quickly', 'Unhurried, without rushing', 'Before sunset', 'With friends'],
      correct: 1,
      explanation: '"Sin prisa" literally means "without hurry / unhurriedly".',
    },
  },
};

export function ReadingPlayground({
  onSaveWord,
  onEarnXp,
  savedWords,
}: {
  onSaveWord: (word: SavedDemoWord) => void;
  onEarnXp: (xp: number) => void;
  savedWords: SavedDemoWord[];
}) {
  const [storyId, setStoryId] = useState<'jp' | 'es'>('jp');
  const story = STORIES[storyId];

  const [showPhonetics, setShowPhonetics] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedWord, setSelectedWord] = useState<VocabEntry>(story.vocab[Object.keys(story.vocab)[2]]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleStorySwitch = (next: 'jp' | 'es') => {
    setStoryId(next);
    const nextVocab = Object.values(STORIES[next].vocab);
    setSelectedWord(nextVocab[0]);
    setSelectedAnswer(null);
  };

  const isSaved = savedWords.some((w) => w.word === selectedWord.word);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 p-1 rounded-full border" style={{ background: 'var(--bg-input)', borderColor: 'var(--border)' }}>
          {(['jp', 'es'] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleStorySwitch(id)}
              className="px-3 py-1 rounded-full text-xs font-bold border-0 cursor-pointer transition-all"
              style={{
                background: storyId === id ? 'var(--bg-surface)' : 'transparent',
                color: storyId === id ? 'var(--accent)' : 'var(--text-muted)',
                boxShadow: storyId === id ? 'var(--shadow-soft)' : 'none',
              }}
            >
              {STORIES[id].label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowPhonetics((v) => !v)}
            className="px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer"
            style={{
              background: showPhonetics ? 'var(--accent-soft)' : 'var(--bg-surface)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            Pronunciation
          </button>
          <button
            type="button"
            onClick={() => setShowTranslation((v) => !v)}
            className="px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer inline-flex items-center gap-1"
            style={{
              background: showTranslation ? 'var(--mint-soft)' : 'var(--bg-surface)',
              borderColor: 'var(--border)',
              color: showTranslation ? 'var(--mint)' : 'var(--text-secondary)',
            }}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Translation</span>
          </button>
        </div>
      </div>

      {/* Story Card */}
      <div className="rounded-2xl border p-4 sm:p-5 space-y-4" style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-display font-semibold text-base sm:text-lg m-0" style={{ color: 'var(--text-primary)' }}>
            {story.title}
          </h4>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--accent)' }}>
            {story.level}
          </span>
        </div>

        <div className="space-y-3">
          {story.sentences.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl border p-3.5 space-y-1.5"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-lang text-base font-bold leading-loose m-0" style={{ color: 'var(--text-primary)' }}>
                  {s.tokens.map((tok, i) =>
                    tok.vocabKey && story.vocab[tok.vocabKey] ? (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          playSoftChime('tap');
                          setSelectedWord(story.vocab[tok.vocabKey!]);
                        }}
                        className="inline border-0 bg-transparent px-1 py-0.5 rounded-lg font-[inherit] cursor-pointer transition-colors"
                        style={{
                          background:
                            selectedWord.word === story.vocab[tok.vocabKey!].word
                              ? 'var(--accent-soft)'
                              : 'rgba(22, 159, 229, 0.07)',
                          color: 'var(--accent)',
                          borderBottom: '2px dotted var(--accent-bright)',
                        }}
                      >
                        {tok.text}
                      </button>
                    ) : (
                      <span key={i}>{tok.text}</span>
                    )
                  )}
                </p>

                <button
                  type="button"
                  onClick={() => void speakPhrase(s.original, story.langCode)}
                  className="p-1.5 rounded-full border-0 cursor-pointer shrink-0"
                  style={{ background: 'var(--bg-input)', color: 'var(--accent)' }}
                  aria-label="Listen to sentence"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {showPhonetics && (
                <div className="text-xs font-mono-code" style={{ color: 'var(--text-muted)' }}>
                  {s.phonetic}
                </div>
              )}

              {showTranslation && (
                <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {s.translation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tap-to-Inspect Word Inspector */}
      <div
        className="rounded-2xl border p-4 flex flex-wrap items-center justify-between gap-3"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--accent-muted)' }}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
              {selectedWord.partOfSpeech}
            </span>
            <span className="font-lang font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              {selectedWord.word}
            </span>
            <span className="text-xs font-mono-code" style={{ color: 'var(--text-muted)' }}>
              {selectedWord.reading}
            </span>
          </div>
          <div className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Meaning: <strong style={{ color: 'var(--text-primary)' }}>{selectedWord.meaning}</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void speakPhrase(selectedWord.word, story.langCode)}
            className="px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer inline-flex items-center gap-1"
            style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Hear</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSoftChime('success');
              onSaveWord({
                word: selectedWord.word,
                reading: selectedWord.reading,
                meaning: selectedWord.meaning,
                language: story.language,
              });
            }}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold border-0 cursor-pointer inline-flex items-center gap-1"
            style={{
              background: isSaved ? 'var(--mint-soft)' : 'var(--accent)',
              color: isSaved ? 'var(--mint)' : '#ffffff',
            }}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved' : 'Save Word'}</span>
          </button>
        </div>
      </div>

      {/* Comprehension Check */}
      <div className="rounded-2xl border p-4 space-y-2.5" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--mint)' }} />
          <span>Quick Comprehension Check: {story.quiz.question}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {story.quiz.options.map((opt, idx) => {
            const chosen = selectedAnswer === idx;
            const isCorrect = idx === story.quiz.correct;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSelectedAnswer(idx);
                  if (isCorrect) {
                    playSoftChime('success');
                    onEarnXp(10);
                  } else {
                    playSoftChime('gentle');
                  }
                }}
                className="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all"
                style={{
                  background: chosen
                    ? isCorrect
                      ? 'var(--mint-soft)'
                      : 'var(--amber-soft)'
                    : 'var(--bg-surface-soft)',
                  borderColor: chosen
                    ? isCorrect
                      ? 'var(--mint)'
                      : 'var(--amber)'
                    : 'var(--border)',
                  color: chosen
                    ? isCorrect
                      ? 'var(--mint)'
                      : 'var(--amber)'
                    : 'var(--text-secondary)',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <p className="text-xs font-semibold m-0" style={{ color: selectedAnswer === story.quiz.correct ? 'var(--mint)' : 'var(--amber)' }}>
            {selectedAnswer === story.quiz.correct ? 'Nice reading! ' : 'Close — '}
            {story.quiz.explanation}
          </p>
        )}
      </div>
    </div>
  );
}

