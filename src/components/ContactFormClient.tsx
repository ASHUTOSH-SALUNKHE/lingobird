'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Mail, Coffee } from 'lucide-react';
import { DEVELOPER_EMAIL } from '@/data/lingobirdData';

const TOPICS = [
  'Setup & AI Model Help (Gemini / Ollama)',
  'Offline Voices or Whisper STT Question',
  'Flashcards & Custom Card Templates',
  'Bug Report or Feature Suggestion',
  'General Feedback',
];

export function ContactFormClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[LingoBird] ${topic || 'Inquiry'} — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
    window.open(`mailto:${DEVELOPER_EMAIL}?subject=${subject}&body=${body}`, '_self');
    setSent(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-4">
        <div className="calm-card p-6 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg m-0" style={{ color: 'var(--text-primary)' }}>
                Direct Developer Support
              </h2>
              <p className="text-xs font-semibold m-0" style={{ color: 'var(--text-muted)' }}>
                Ashutosh Salunkhe · India
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
            Questions about offline Piper voices, Whisper STT, Ollama CORS, or Flashcard Studio HTML/CSS? Reach out directly:
          </p>
          <a
            href={`mailto:${DEVELOPER_EMAIL}`}
            className="block px-3.5 py-2.5 rounded-xl border text-xs font-mono-code font-semibold no-underline"
            style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--accent)' }}
          >
            {DEVELOPER_EMAIL}
          </a>
        </div>

        <div className="calm-card p-6 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            <Coffee className="w-4 h-4" style={{ color: 'var(--amber)' }} />
            <span>Support Indie Development</span>
          </div>
          <p className="text-xs leading-relaxed font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
            LingoBird stays calm, private, and free of tracking. If it helps your daily language habit, you can leave a warm coffee anytime.
          </p>
          <a
            href="https://buymeacoffee.com/ashutosh___10"
            target="_blank"
            rel="noopener noreferrer"
            className="calm-btn-secondary text-xs py-2.5 px-4 w-full"
          >
            Buy Me a Coffee →
          </a>
        </div>
      </div>

      <div className="lg:col-span-7 calm-card p-6 sm:p-8">
        {sent ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center" style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="font-display font-semibold text-2xl m-0" style={{ color: 'var(--text-primary)' }}>
              Email Draft Opened
            </h2>
            <p className="text-sm font-medium max-w-md mx-auto m-0" style={{ color: 'var(--text-secondary)' }}>
              Your message for <strong>{DEVELOPER_EMAIL}</strong> has been prepared in your mail client. Thank you for reaching out!
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName('');
                setEmail('');
                setTopic('');
                setMessage('');
              }}
              className="calm-btn-secondary text-xs"
            >
              Compose Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="c-name" className="block text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Your Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="c-email" className="block text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Your Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="c-topic" className="block text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Topic
              </label>
              <select
                id="c-topic"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none cursor-pointer"
                style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                <option value="" disabled>
                  Select a topic…
                </option>
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="c-msg" className="block text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Message
              </label>
              <textarea
                id="c-msg"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your feedback, setup question, or idea…"
                className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none resize-y"
                style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>

            <button type="submit" className="calm-btn-primary w-full py-3">
              <Send className="w-4 h-4" />
              <span>Compose Support Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

