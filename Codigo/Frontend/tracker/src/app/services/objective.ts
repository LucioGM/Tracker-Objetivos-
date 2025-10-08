import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Objective {
  id: number;
  title: string;
  progress: number; // 0 a 100
}

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  private objectives: Objective[] = [
    { id: 1, title: 'Aprender Angular', progress: 40 },
    { id: 2, title: 'Completar proyecto Ionic', progress: 70 },
    { id: 3, title: 'Hacer ejercicio diario', progress: 20 }
  ];

  private objectivesSubject = new BehaviorSubject<Objective[]>(this.objectives);
  public objectives$ = this.objectivesSubject.asObservable();

  constructor() {}

  getObjectives(): Observable<Objective[]> {
    return this.objectives$;
  }

  addObjective(obj: Objective) {
    this.objectives.push(obj);
    this.objectivesSubject.next(this.objectives);
  }

  updateProgress(id: number, progress: number) {
    const obj = this.objectives.find(o => o.id === id);
    if (obj) {
      obj.progress = progress;
      this.objectivesSubject.next(this.objectives);
    }
  }
}
