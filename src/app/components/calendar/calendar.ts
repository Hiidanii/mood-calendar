import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayModal } from '../day-modal/day-modal';
import { MoodService } from '../../services/mood/mood';
import { MoodEntry } from '../../models/mood';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, DayModal, Dashboard],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  currentMonth: number = 0
  currentYear: number = 0
  daysInMonth: number[] = [];
  moodColors: Record<string, string> = {
    "😄": "#4CAF50", // Muy feliz → Verde
    "🙂": "#8BC34A", // Feliz → Verde claro
    "😌": "#2196F3", // Tranquilo → Azul
    "😐": "#9E9E9E", // Neutral → Gris
    "😣": "#FF9800", // Estresado → Naranja
    "😢": "#F44336", // Triste → Rojo
  };

  ngOnInit(): void {
    const today = new Date();
    this.currentMonth = today.getMonth(); // 0 = Enero
    this.currentYear = today.getFullYear();
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  generateCalendar(month: number, year: number) {
    const lastDay = new Date(year, month + 1, 0).getDate(); // Último día del mes
    this.daysInMonth = Array.from({ length: lastDay }, (_, i) => i + 1);
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11; // Diciembre
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0; // Enero
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  modalOpen = false;
  selectedDate: string = '';

  openModal(day: number) {
    const month = this.currentMonth + 1; // 1-12
    const dayStr = day.toString().padStart(2,'0');
    const monthStr = month.toString().padStart(2,'0');
    this.selectedDate = `${this.currentYear}-${monthStr}-${dayStr}`;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  constructor(private moodService: MoodService) {}

  getMoodColor(day: number): string {
    const month = this.currentMonth + 1; // 1-12
    const dayStr = day.toString().padStart(2,'0');
    const monthStr = month.toString().padStart(2,'0');
    const dateStr = `${this.currentYear}-${monthStr}-${dayStr}`;
    
    const entry: MoodEntry | null = this.moodService.getMood(dateStr);
    return entry ? this.moodColors[entry.mood] : '#edc7a9'; // Color por defecto
  }
}