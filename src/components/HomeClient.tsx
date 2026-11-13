'use client';

import type { MediaAvailability } from '@/lib/mediaRegistry';
import { HeroBand } from './landing/HeroBand';
import { FlashcardsBand } from './landing/FlashcardsBand';
import { ReadingWritingBand } from './landing/ReadingWritingBand';
import { AiTutorBand } from './landing/AiTutorBand';
import { ConversationBand } from './landing/ConversationBand';
import { QuietMoreBand } from './landing/QuietMoreBand';
import { FaqBand } from './landing/FaqBand';
import { ClosingCtaBand } from './landing/ClosingCtaBand';

export function HomeClient({ availability }: { availability: MediaAvailability }) {
  return (
    <main>
      <HeroBand availability={availability} />
      <FlashcardsBand />
      <ReadingWritingBand />
      <AiTutorBand availability={availability} />
      <ConversationBand />
      <QuietMoreBand />
      <FaqBand />
      <ClosingCtaBand />
    </main>
  );
}
