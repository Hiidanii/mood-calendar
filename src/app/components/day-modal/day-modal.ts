import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MoodEntry, MoodType } from '../../models/mood';
import { MoodService } from '../../services/mood/mood';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-modal',
  imports: [CommonModule],
  templateUrl: './day-modal.html',
  styleUrl: './day-modal.css',
})
export class DayModal {
  @Input() date!: string; // Recibimos la fecha desde el calendario
  @Output() closeModal = new EventEmitter<void>();

  moods: MoodType[] = ["😄", "🙂", "😌", "😐", "😣", "😢"];
  selectedMood: MoodType | null = null;
  selectedTags: string[] = [];

  availableTags: string[] = ["🏋️‍♂️", "📚", "👥", "🎮", "🛌🏼", "☀️", "🌧️"];

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    const existing = this.moodService.getMood(this.date);
    if (existing) {
      this.selectedMood = existing.mood;
      this.selectedTags = existing.tags;
    }
  }

  toggleTag(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      if (this.selectedTags.length < 5) {
        this.selectedTags.push(tag);
      }
    }
  }

  save() {
    if (!this.selectedMood) return;
    this.moodService.saveMood({
      date: this.date,
      mood: this.selectedMood,
      tags: this.selectedTags
    });
    this.closeModal.emit();
  }

  cancel() {
    this.closeModal.emit();
  }

  getMonthName(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long' });
  }

  getDayNumber(dateStr: string): number {
    const date = new Date(dateStr);
    return date.getDate();
  }
}
