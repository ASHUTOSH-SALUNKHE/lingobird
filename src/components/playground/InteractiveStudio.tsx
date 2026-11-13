'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  MessagesSquare,
  BookOpen,
  PenLine,
  Gamepad2,
  BookmarkCheck,
  Sparkles,
  Monitor,
} from 'lucide-react';
import type { PlaygroundTabId, SavedDemoWord } from './playgroundTypes';
import { FlashcardPlayground } from './FlashcardPlayground';
import { ConversationPlayground } from './ConversationPlayground';
import { ReadingPlayground } from './ReadingPlayground';
import { WritingPlayground } from './WritingPlayground';
import { MiniGamesPlayground } from './MiniGamesPlayground';
import { GrammarSavedPlayground } from './GrammarSavedPlayground';

const TABS: {
  id: PlaygroundTabId;
  label: string;
  subtitle: string;
  icon: typeof Layers;
}[] = [
  { id: 'flashcards', label: 'Flashcards', subtitle: 'FSRS + AI Style', icon: Layers },
  { id: 'conversation', label: 'Conversation', subtitle: 'Tap & Reply', icon: MessagesSquare },
  { id: 'reading', label: 'Reading', subtitle: 'Graded Stories', icon: BookOpen },
  { id: 'writing', label: 'Writing', subtitle: 'Prose Atelier', icon: PenLine },
  { id: 'games', label: 'Mini Games', subtitle: 'Match & Build', icon: Gamepad2 },
  { id: 'grammar-saved', label: 'Grammar & Saved', subtitle: 'Vault & Rules', icon: BookmarkCheck },
];

const INITIAL_SAVED: SavedDemoWord[] = [
  { word: '喫茶店', reading: 'きっさてん (kissaten)', meaning: 'Small café', language: 'Japanese' },
  { word: 'sin prisa', reading: 'sin PREE-sa', meaning: 'Unhurried / calm pace', language: 'Spanish' },
];

export function InteractiveStudio() {
  const [activeTab, setActiveTab] = useState<PlaygroundTabId>('flashcards');
  const [savedWords, setSavedWords] = useState<SavedDemoWord[]>(INITIAL_SAVED);
  const [xp, setXp] = useState(25);

  const handleSaveWord = (entry: SavedDemoWord) => {
    setSavedWords((prev) => {
      if (prev.some((w) => w.word === entry.word && w.language === entry.language)) {
        return prev;
      }
      return [entry, ...prev];
    });
    setXp((x) => x + 5);
  };

  const handleEarnXp = (amount: number) => {
    setXp((x) => x + amount);
  };

  return (
    <div className="calm-card overflow-hidden p-3 sm:p-5">
      {/* Desktop Window Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl mb-4 border"
        style={{ background: 'var(--bg-input)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--coral)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--amber)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--mint)' }} />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
            <Monitor className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>LingoBird Mini Studio</span>
          </div>
          <span
            className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}
          >
            Interactive Preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--mint)' }}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>{savedWords.length} Saved</span>
          </span>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--amber)' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{xp} XP</span>
          </span>
        </div>
      </div>

      {/* Desktop App Layout: Calm Sidebar + Single Module Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Sidebar Switcher */}
        <div className="lg:col-span-3 flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border text-left transition-all cursor-pointer shrink-0 lg:w-full"
                style={{
                  background: active ? 'var(--accent-soft)' : 'var(--bg-surface-soft)',
                  borderColor: active ? 'var(--accent-muted)' : 'var(--border)',
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-extrabold leading-tight truncate">{tab.label}</div>
                  <div className="hidden lg:block text-[10px] font-semibold opacity-75 truncate">{tab.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Focused Single-Module Canvas */}
        <div
          className="lg:col-span-9 rounded-3xl border p-4 sm:p-6 min-h-[430px]"
          style={{ background: 'var(--bg-page)', borderColor: 'var(--border)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              {activeTab === 'flashcards' && <FlashcardPlayground onEarnXp={handleEarnXp} />}
              {activeTab === 'conversation' && (
                <ConversationPlayground
                  onSaveWord={handleSaveWord}
                  onEarnXp={handleEarnXp}
                  savedWords={savedWords}
                />
              )}
              {activeTab === 'reading' && (
                <ReadingPlayground
                  onSaveWord={handleSaveWord}
                  onEarnXp={handleEarnXp}
                  savedWords={savedWords}
                />
              )}
              {activeTab === 'writing' && <WritingPlayground onEarnXp={handleEarnXp} />}
              {activeTab === 'games' && <MiniGamesPlayground onEarnXp={handleEarnXp} />}
              {activeTab === 'grammar-saved' && (
                <GrammarSavedPlayground savedWords={savedWords} onEarnXp={handleEarnXp} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

