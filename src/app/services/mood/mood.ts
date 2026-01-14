import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MoodEntry } from '../../models/mood';

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  private storageKey = 'moodCalendar';
  // Subject para notificar cambios
  private moodChanged = new BehaviorSubject<void>(undefined);
  moodChanged$ = this.moodChanged.asObservable();

  constructor() { }

  saveMood(entry: MoodEntry) {
    const data = this.getAllMoods();
    const index = data.findIndex(e => e.date === entry.date);
    if (index > -1) {
      data[index] = entry;
    } else {
      data.push(entry);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    this.moodChanged.next(); // notificamos que cambió un mood
  }

  getMood(date: string): MoodEntry | null {
    const data = this.getAllMoods();
    return data.find(e => e.date === date) || null;
  }

  getAllMoods(): MoodEntry[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }
}
