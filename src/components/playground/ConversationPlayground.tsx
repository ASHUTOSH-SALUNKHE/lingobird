'use client';

import { useState } from 'react';
import { Volume2, BookmarkPlus, Check, RotateCcw, Send, MessageCircle } from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';
import type { SavedDemoWord } from './playgroundTypes';

interface GlossToken {
  text: string;
  meaning?: string;
  reading?: string;
}

interface DialogueTurn {
  id: string;
  speaker: 'partner' | 'user';
  name: string;
  tokens: GlossToken[];
  translation: string;
  langCode: string;
}

interface ReplyOption {
  label: string;
  tokens: GlossToken[];
  translation: string;
  partnerFollowUp: Omit<DialogueTurn, 'id'>;
}

interface Scenario {
  id: 'cafe-es' | 'bookstore-ja';
  label: string;
  language: string;
  langCode: string;
  title: string;
  opening: DialogueTurn[];
  options: ReplyOption[];
}

const SCENARIOS: Record<'cafe-es' | 'bookstore-ja', Scenario> = {
  'cafe-es': {
    id: 'cafe-es',
    label: '🇪🇸 Café in Madrid',
    language: 'Spanish',
    langCode: 'es-ES',
    title: 'Ordering a Morning Coffee',
    opening: [
      {
        id: 't1',
        speaker: 'partner',
        name: 'Sofía (Barista)',
        langCode: 'es-ES',
        translation: 'Good morning! What would you like to drink today?',
        tokens: [
          { text: '¡Buenos' },
          { text: ' ' },
          { text: 'días', meaning: 'morning / days', reading: 'DEE-as' },
          { text: '! ¿Qué ' },
          { text: 'te gustaría', meaning: 'would you like', reading: 'te goos-ta-REE-a' },
          { text: ' ' },
          { text: 'tomar', meaning: 'to drink / take', reading: 'to-MAR' },
          { text: ' hoy?' },
        ],
      },
    ],
    options: [
      {
        label: 'Order a warm café con leche',
        tokens: [
          { text: 'Un ' },
          { text: 'café con leche', meaning: 'coffee with milk', reading: 'ka-FE kon LE-che' },
          { text: ', ' },
          { text: 'por favor', meaning: 'please', reading: 'por fa-VOR' },
          { text: '.' },
        ],
        translation: 'A coffee with milk, please.',
        partnerFollowUp: {
          speaker: 'partner',
          name: 'Sofía (Barista)',
          langCode: 'es-ES',
          translation: 'Perfect! Would you like it hot or with ice?',
          tokens: [
            { text: '¡' },
            { text: 'Perfecto', meaning: 'perfect', reading: 'per-FEK-to' },
            { text: '! ¿Lo quieres ' },
            { text: 'caliente', meaning: 'hot / warm', reading: 'ka-LYEN-te' },
            { text: ' o con ' },
            { text: 'hielo', meaning: 'ice', reading: 'YE-lo' },
            { text: '?' },
          ],
        },
      },
      {
        label: 'Ask for herbal tea & toast',
        tokens: [
          { text: 'Quisiera', meaning: 'I would like (polite)', reading: 'kee-SYE-ra' },
          { text: ' un ' },
          { text: 'té verde', meaning: 'green tea', reading: 'te VER-de' },
          { text: ' y una ' },
          { text: 'tostada', meaning: 'toast', reading: 'tos-TA-da' },
          { text: '.' },
        ],
        translation: 'I would like a green tea and a toast.',
        partnerFollowUp: {
          speaker: 'partner',
          name: 'Sofía (Barista)',
          langCode: 'es-ES',
          translation: 'Right away! Enjoy sitting by the window.',
          tokens: [
            { text: '¡' },
            { text: 'Enseguida', meaning: 'right away', reading: 'en-se-GHEE-da' },
            { text: '! Siéntate junto a la ' },
            { text: 'ventana', meaning: 'window', reading: 'ven-TA-na' },
            { text: '.' },
          ],
        },
      },
    ],
  },
  'bookstore-ja': {
    id: 'bookstore-ja',
    label: '🇯🇵 Tokyo Bookshop',
    language: 'Japanese',
    langCode: 'ja-JP',
    title: 'Looking for an Easy Novel',
    opening: [
      {
        id: 'j1',
        speaker: 'partner',
        name: 'Haruto (Clerk)',
        langCode: 'ja-JP',
        translation: 'Welcome! Are you looking for anything in particular?',
        tokens: [
          { text: 'いらっしゃいませ', meaning: 'Welcome to our shop', reading: 'irasshaimase' },
          { text: '！何かお' },
          { text: '探し', meaning: 'looking for', reading: 'sagashi' },
          { text: 'ですか？' },
        ],
      },
    ],
    options: [
      {
        label: 'Ask for an easy Japanese story',
        tokens: [
          { text: 'やさしい', meaning: 'easy / gentle', reading: 'yasashii' },
          { text: '日本語の' },
          { text: '小説', meaning: 'novel / story', reading: 'shousetsu' },
          { text: 'はありますか？' },
        ],
        translation: 'Do you have any easy Japanese novels?',
        partnerFollowUp: {
          speaker: 'partner',
          name: 'Haruto (Clerk)',
          langCode: 'ja-JP',
          translation: 'Yes, they are over by that quiet shelf.',
          tokens: [
            { text: 'はい、あちらの' },
            { text: '静か', meaning: 'quiet / calm', reading: 'shizuka' },
            { text: 'な' },
            { text: '本棚', meaning: 'bookshelf', reading: 'hondana' },
            { text: 'にありますよ。' },
          ],
        },
      },
      {
        label: 'Say you are just browsing',
        tokens: [
          { text: '少し', meaning: 'a little', reading: 'sukoshi' },
          { text: '見ている', meaning: 'looking around', reading: 'mite iru' },
          { text: 'だけです。' },
        ],
        translation: 'I am just browsing for a little bit.',
        partnerFollowUp: {
          speaker: 'partner',
          name: 'Haruto (Clerk)',
          langCode: 'ja-JP',
          translation: 'Please take your time!',
          tokens: [
            { text: 'どうぞ' },
            { text: 'ゆっくり', meaning: 'unhurriedly / take your time', reading: 'yukkuri' },
            { text: 'ご覧ください。' },
          ],
        },
      },
    ],
  },
};

export function ConversationPlayground({
  onSaveWord,
  onEarnXp,
  savedWords,
}: {
  onSaveWord: (word: SavedDemoWord) => void;
  onEarnXp: (xp: number) => void;
  savedWords: SavedDemoWord[];
}) {
  const [scenarioId, setScenarioId] = useState<'cafe-es' | 'bookstore-ja'>('cafe-es');
  const scenario = SCENARIOS[scenarioId];

  const [messages, setMessages] = useState<DialogueTurn[]>(scenario.opening);
  const [replied, setReplied] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const [customInput, setCustomInput] = useState('');
  const [inspected, setInspected] = useState<GlossToken | null>({
    text: 'te gustaría',
    meaning: 'would you like',
    reading: 'te goos-ta-REE-a',
  });

  const switchScenario = (id: 'cafe-es' | 'bookstore-ja') => {
    setScenarioId(id);
    setMessages(SCENARIOS[id].opening);
    setReplied(false);
    setCustomInput('');
    setInspected(null);
  };

  const handleChooseOption = (option: ReplyOption) => {
    playSoftChime('success');
    onEarnXp(15);
    setMessages((prev) => {
      const turn = prev.length;
      const userMsg: DialogueTurn = {
        id: `user-${turn}`,
        speaker: 'user',
        name: 'You',
        tokens: option.tokens,
        translation: option.translation,
        langCode: scenario.langCode,
      };
      const partnerMsg: DialogueTurn = {
        id: `partner-${turn + 1}`,
        ...option.partnerFollowUp,
      };
      return [...prev, userMsg, partnerMsg];
    });
    setReplied(true);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customInput.trim();
    if (!cleaned) return;
    playSoftChime('success');
    onEarnXp(15);

    setMessages((prev) => {
      const turn = prev.length;
      const userMsg: DialogueTurn = {
        id: `custom-${turn}`,
        speaker: 'user',
        name: 'You',
        tokens: [{ text: cleaned }],
        translation: 'Custom learner response',
        langCode: scenario.langCode,
      };
      const partnerMsg: DialogueTurn = {
        id: `partner-custom-${turn + 1}`,
        speaker: 'partner',
        name: scenario.opening[0].name,
        langCode: scenario.langCode,
        translation:
          scenarioId === 'cafe-es'
            ? 'Sounds great! I will prepare that calmly for you right away.'
            : 'Understood! I will guide you right over there.',
        tokens:
          scenarioId === 'cafe-es'
            ? [{ text: '¡Muy bien! Te lo ' }, { text: 'preparo', meaning: 'I prepare', reading: 'pre-PA-ro' }, { text: ' ahora mismo.' }]
            : [{ text: 'かしこまりました。こちらへ' }, { text: 'どうぞ', meaning: 'please go ahead', reading: 'douzo' }, { text: '。' }],
      };
      return [...prev, userMsg, partnerMsg];
    });
    setCustomInput('');
    setReplied(true);
  };

  const isAlreadySaved = (word: string) => savedWords.some((s) => s.word === word);

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 p-1 rounded-full border" style={{ background: 'var(--bg-input)', borderColor: 'var(--border)' }}>
          {(['cafe-es', 'bookstore-ja'] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => switchScenario(id)}
              className="px-3 py-1 rounded-full text-xs font-bold cursor-pointer border-0 transition-all"
              style={{
                background: scenarioId === id ? 'var(--bg-surface)' : 'transparent',
                color: scenarioId === id ? 'var(--accent)' : 'var(--text-muted)',
                boxShadow: scenarioId === id ? 'var(--shadow-soft)' : 'none',
              }}
            >
              {SCENARIOS[id].label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTranslations((v) => !v)}
            className="px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer"
            style={{
              background: showTranslations ? 'var(--accent-soft)' : 'var(--bg-surface-soft)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {showTranslations ? 'Hide Translations' : 'Show Translations'}
          </button>
          <button
            type="button"
            onClick={() => switchScenario(scenarioId)}
            className="p-1.5 rounded-full border cursor-pointer"
            style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            aria-label="Reset conversation"
            title="Restart conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Stream */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}
      >
        <div className="text-[11px] font-bold flex items-center justify-between" style={{ color: 'var(--text-muted)' }}>
          <span>Tip: Click any dotted word below to inspect & save it</span>
          <span>{scenario.title}</span>
        </div>

        <div className="space-y-3">
          {messages.map((msg) => {
            const fullText = msg.tokens.map((t) => t.text).join('');
            const isUser = msg.speaker === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[11px] font-bold mb-1 px-1" style={{ color: 'var(--text-muted)' }}>
                  {msg.name}
                </span>
                <div
                  className="max-w-[88%] rounded-2xl px-4 py-3 border space-y-1.5"
                  style={
                    isUser
                      ? {
                          background: 'var(--accent-soft)',
                          borderColor: 'var(--accent-muted)',
                        }
                      : {
                          background: 'var(--bg-surface)',
                          borderColor: 'var(--border)',
                        }
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-lang text-sm sm:text-base font-bold leading-relaxed m-0" style={{ color: 'var(--text-primary)' }}>
                      {msg.tokens.map((tok, i) =>
                        tok.meaning ? (
                          <button
                            key={`${msg.id}-${i}`}
                            type="button"
                            onClick={() => {
                              playSoftChime('tap');
                              setInspected(tok);
                            }}
                            className="inline border-0 bg-transparent p-0 font-[inherit] cursor-pointer transition-colors"
                            style={{
                              color: inspected?.text === tok.text ? 'var(--accent)' : 'inherit',
                              borderBottom: '2px dotted var(--accent-bright)',
                            }}
                          >
                            {tok.text}
                          </button>
                        ) : (
                          <span key={`${msg.id}-${i}`}>{tok.text}</span>
                        )
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => void speakPhrase(fullText, msg.langCode)}
                      className="p-1.5 rounded-full border-0 cursor-pointer shrink-0"
                      style={{ background: 'var(--bg-input)', color: 'var(--accent)' }}
                      aria-label="Play audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {showTranslations && (
                    <p className="text-xs font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                      {msg.translation}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline Word Gloss Bar */}
      {inspected && inspected.meaning && (
        <div
          className="rounded-2xl border p-3.5 flex flex-wrap items-center justify-between gap-3"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--accent-muted)' }}
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-lang font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {inspected.text}
              </span>
              {inspected.reading && (
                <span className="text-xs font-mono-code" style={{ color: 'var(--text-muted)' }}>
                  [{inspected.reading}]
                </span>
              )}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
              = {inspected.meaning}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void speakPhrase(inspected.text, scenario.langCode)}
              className="px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer inline-flex items-center gap-1"
              style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Speak</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playSoftChime('success');
                onSaveWord({
                  word: inspected.text,
                  reading: inspected.reading,
                  meaning: inspected.meaning!,
                  language: scenario.language,
                });
              }}
              className="px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer inline-flex items-center gap-1"
              style={{
                background: isAlreadySaved(inspected.text) ? 'var(--mint-soft)' : 'var(--accent)',
                borderColor: 'transparent',
                color: isAlreadySaved(inspected.text) ? 'var(--mint)' : '#ffffff',
              }}
            >
              {isAlreadySaved(inspected.text) ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
              <span>{isAlreadySaved(inspected.text) ? 'Saved' : 'Save Word'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Reply Area */}
      {!replied ? (
        <div className="space-y-2.5">
          <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <MessageCircle className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>Choose a natural reply or type your own:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {scenario.options.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleChooseOption(opt)}
                className="text-left p-3.5 rounded-2xl border transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
              >
                <div className="font-lang text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  {opt.tokens.map((t) => t.text).join('')}
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {opt.label}
                </div>
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder={`Type a custom reply in ${scenario.language}…`}
              className="flex-1 px-4 py-2.5 rounded-full border text-sm font-semibold outline-none"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            />
            <button type="submit" className="calm-btn-primary text-xs px-4 py-2.5">
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      ) : (
        <div
          className="rounded-2xl border p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold"
          style={{ background: 'var(--mint-soft)', borderColor: 'rgba(47,158,111,0.28)', color: 'var(--mint)' }}
        >
          <span>Nice turn! Conversation Arena tracks audio cues, translations & vocabulary capture seamlessly.</span>
          <button
            type="button"
            onClick={() => switchScenario(scenarioId)}
            className="px-3 py-1 rounded-full border cursor-pointer text-xs font-bold"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            Try Another Reply
          </button>
        </div>
      )}
    </div>
  );
}

