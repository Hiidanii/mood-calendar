export type MoodType = "😄" | "🙂" | "😌" | "😐" | "😣" | "😢";

export interface MoodEntry {
  date: string;   // YYYY-MM-DD
  mood: MoodType;
  tags: string[]; // Emojis
}

