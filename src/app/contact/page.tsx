'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const contactReasons = [
  '🐛 Bug report',
  '💡 Feature request',
  '🔧 Setup or installation help',
  '🤖 AI provider integration question (Chrome AI, Gemini, Ollama)',
  '🤝 Partnership & Inquiries',
  '📢 Feedback or suggestions',
  '✨ Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '2px solid #C8E0F0',
    borderRadius: '16px',
    color: '#1A3A4C',
    padding: '14px 18px',
    width: '100%',
    fontSize: '0.95rem',
    fontWeight: 600,
    outline: 'none',
    fontFamily: 'Nunito, sans-serif',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <main style={{ paddingTop: 68 }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="lb-sky-bg lb-grid-bg"
        style={{
          padding: '72px 24px 64px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div className="animate-float" style={{ marginBottom: 16 }}>
            <Image
              src="/lingobird-logo.png"
              alt="LingoBird Mascot"
              width={88}
              height={88}
              style={{
                display: 'block',
                margin: '0 auto',
                filter: 'drop-shadow(0 8px 24px rgba(22,159,229,0.35))',
              }}
            />
          </div>

          <div className="lb-section-tag" style={{ justifyContent: 'center' }}>
            💬 We Love Hearing From You!
          </div>

          <h1
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              color: '#1A3A4C',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            Get in Touch with{' '}
            <span className="lb-gradient-text">the LingoBird Team</span>
          </h1>

          <p
            style={{
              color: '#4A7A96',
              fontSize: '1.1rem',
              fontWeight: 600,
              lineHeight: 1.7,
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            Have an idea for a feature, need help configuring Ollama or Gemini, or want to say hi?
            Drop us a message below!
          </p>
        </div>
      </section>

      {/* ── Content Grid ─────────────────────────────────────── */}
      <section style={{ background: '#F0F8FF', padding: '64px 24px 96px' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 40,
            alignItems: 'start',
          }}
        >
          {/* Left Column: Quick info & support cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                icon: '🐛',
                title: 'Bug Reports',
                desc: 'Found a parsing or UI glitch on WhatsApp Web? Let us know the exact page or error and we will patch it fast.',
                badge: 'Fast Fix',
                badgeColor: '#E05D52',
              },
              {
                icon: '💡',
                title: 'Feature Ideas',
                desc: 'Want voice pronunciations, Telegram adapter, or custom SRS algorithms? Share your dream language learning tool!',
                badge: 'Roadmap',
                badgeColor: '#76B87A',
              },
              {
                icon: '🤖',
                title: 'AI Setup Help',
                desc: 'Trouble with Chrome Prompt API flags, Gemini API keys, or Ollama local CORS? We are happy to help troubleshoot.',
                badge: '100% Free',
                badgeColor: '#169FE5',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="lb-card"
                style={{
                  padding: 24,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(22,159,229,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.05rem',
                        fontWeight: 900,
                        color: '#1A3A4C',
                      }}
                    >
                      {card.title}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: card.badgeColor,
                        background: '#FFFFFF',
                        border: `1.5px solid #C8E0F0`,
                        borderRadius: 50,
                        padding: '2px 8px',
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.88rem',
                      color: '#4A7A96',
                      lineHeight: 1.6,
                      fontWeight: 600,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Support Card */}
            <div
              className="lb-card"
              style={{
                padding: 28,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF3E0 100%)',
                border: '2px solid #F4A261',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: '1.8rem' }}>💌</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#5A3E36' }}>
                    Dedicated Support & Help
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#E76F51', fontWeight: 800 }}>
                    Fast & Friendly Assistance
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: '#5A3E36',
                  lineHeight: 1.6,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Need assistance with local AI configuration, language settings, or have ideas for future updates? We read and reply to all inquiries promptly.
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: '#E76F51',
                }}
              >
                ✨ Response typically within 24 hours
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div
            className="lb-card"
            style={{
              padding: '36px 32px',
              background: '#FFFFFF',
              boxShadow: '0 12px 36px rgba(22,159,229,0.12)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 16px' }}>
                <div className="animate-bounce-in" style={{ fontSize: '4rem', marginBottom: 16 }}>
                  💌
                </div>
                <h2
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 900,
                    fontSize: '1.8rem',
                    color: '#1A3A4C',
                    marginBottom: 12,
                  }}
                >
                  Message Sent Successfully!
                </h2>
                <p
                  style={{
                    color: '#4A7A96',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    lineHeight: 1.7,
                    maxWidth: 440,
                    margin: '0 auto 28px',
                  }}
                >
                  Thank you for reaching out! We will review your message and reply to your email address promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', reason: '', message: '' });
                  }}
                  className="lb-btn-secondary"
                  style={{ fontSize: '0.95rem', padding: '12px 28px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h2
                    style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 900,
                      fontSize: '1.6rem',
                      color: '#1A3A4C',
                      margin: '0 0 6px',
                    }}
                  >
                    Send Us a Message ✉️
                  </h2>
                  <p style={{ margin: 0, color: '#7BAFC8', fontSize: '0.9rem', fontWeight: 700 }}>
                    Usually responds within 24 hours
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        color: '#1A3A4C',
                        marginBottom: 6,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#169FE5';
                        e.target.style.boxShadow = '0 0 0 4px rgba(22,159,229,0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#C8E0F0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        color: '#1A3A4C',
                        marginBottom: 6,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#169FE5';
                        e.target.style.boxShadow = '0 0 0 4px rgba(22,159,229,0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#C8E0F0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-reason"
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#1A3A4C',
                      marginBottom: 6,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Topic / Reason
                  </label>
                  <select
                    id="contact-reason"
                    name="reason"
                    required
                    value={form.reason}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#169FE5';
                      e.target.style.boxShadow = '0 0 0 4px rgba(22,159,229,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#C8E0F0';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="" disabled>
                      Select what you'd like to discuss…
                    </option>
                    {contactReasons.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#1A3A4C',
                      marginBottom: 6,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about the issue, questions, or ideas you have..."
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#169FE5';
                      e.target.style.boxShadow = '0 0 0 4px rgba(22,159,229,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#C8E0F0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="lb-btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '1.05rem',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.75 : 1,
                  }}
                >
                  {submitting ? 'Sending Message… 🕊️' : 'Send Message 🚀'}
                </button>

                <p
                  style={{
                    margin: 0,
                    textAlign: 'center',
                    fontSize: '0.78rem',
                    color: '#7BAFC8',
                    fontWeight: 700,
                  }}
                >
                  🔒 Your email is never shared or added to marketing newsletters.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
