export type PlaygroundTabId =
  | 'flashcards'
  | 'conversation'
  | 'reading'
  | 'writing'
  | 'games'
  | 'grammar-saved';

export interface SavedDemoWord {
  word: string;
  reading?: string;
  meaning: string;
  language: string;
}

