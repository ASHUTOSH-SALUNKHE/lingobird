# LingoBird Website — Reserved Media Drop-In Guide

The website automatically detects real screenshots and AI Tutor videos placed in `public/`.
Until you add your recordings and screenshots, calm reserved blueprint frames are shown cleanly (with zero broken images or 404 console errors).

## Reserved Screenshots (`public/screenshots/`)

Recommended size: **1600 × 1000 px** (PNG or WebP, 16:10 aspect ratio).

| Target Filename | Where Shown | What to Capture |
|---|---|---|
| `public/screenshots/hero-overview.png` | Home hero + Download page | Main LingoBird Windows Overview screen (streak, spotlight card, translator) |
| `public/screenshots/flashcards-studio.png` | Home pillars + Features + How-to-Use | Deck workspace, custom HTML/CSS Card Studio, and FSRS rating buttons |
| `public/screenshots/reading-writing.png` | Home pillars + Features | Graded Reading story + Word Inspector OR Writing Atelier character feedback |
| `public/screenshots/conversation-games.png` | Home pillars + Features | Conversation Arena audio dialogue & Mini Games / Grammar hub |
| `public/screenshots/settings-offline-ai.png` | Home pillars + AI & Speech page | Settings view (Piper Neural Voices, Whisper STT, OPUS-MT, Gemini/Ollama) |
| `public/screenshots/ai-tutor-workspace.png` | Features page | Live AI Tutor session with streaming audio & target word tracker |
| `public/screenshots/onboarding-guides.png` | Features + How-to-Use page | Startup Onboarding Guide or 7-step Flashcard Creation Guide |

## Reserved AI Tutor Videos (`public/videos/`)

Recommended resolution: **1920 × 1080 px** (MP4 H.264 or WebM, 16:9 aspect ratio).

| Target Filename | Showcase Tab | Recommended Clip |
|---|---|---|
| `public/videos/ai-tutor-overview.mp4` | Live Voice & Text Tutor | AI Tutor streaming a reply with synchronized speech playback (~60s) |
| `public/videos/ai-tutor-voice-loop.mp4` | Speech-to-Text & Word Gloss | Recording mic speech via Whisper STT & tapping words inline (~45s) |
| `public/videos/ai-tutor-setup.mp4` | Free Gemini or Local Ollama | Entering Gemma/Gemini key or auto-scanning Ollama in Settings (~45s) |

> **Tip:** Since the site builds with `output: "export"`, rebuild (`npm run build`) or refresh `npm run dev` after dropping new image/video files so they are picked up cleanly.

