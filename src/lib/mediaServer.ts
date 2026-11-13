import fs from 'node:fs';
import path from 'node:path';
import { AI_TUTOR_VIDEOS, SCREENSHOT_SLOTS, type MediaAvailability } from './mediaRegistry';

/**
 * Checks `public/screenshots/*` and `public/videos/*` on disk at build time (or per request in `next dev`).
 * This avoids browser 404 console noise when reserved placeholder slots do not yet have user files.
 */
export function getMediaAvailability(): MediaAvailability {
  const publicDir = path.join(process.cwd(), 'public');
  const availability: MediaAvailability = {};

  for (const slot of Object.values(SCREENSHOT_SLOTS)) {
    const cleanRel = slot.src.replace(/^\/+/, '');
    availability[slot.src] = fs.existsSync(path.join(publicDir, cleanRel));
  }

  for (const video of AI_TUTOR_VIDEOS) {
    const cleanRel = video.src.replace(/^\/+/, '');
    availability[video.src] = fs.existsSync(path.join(publicDir, cleanRel));
  }

  return availability;
}

