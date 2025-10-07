import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonText,
  IonProgressBar
} from '@ionic/angular/standalone';

interface Goal {
  id: number;
  name: string;
  selectedDuration?: string;
  tempDuration?: string;
  expanded?: boolean;
  progress?: number; // 0 a 100
  durationMs?: number; // duración en milisegundos
  intervalId?: any; // para almacenar setInterval
  showProgress?: boolean; // para mostrar solo la barra
}

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonButton,
    IonRadioGroup,
    IonRadio,
    IonLabel,
    IonText,
    IonProgressBar
  ]
})
export class HealthPage implements OnInit {

  goals: Goal[] = [];

  constructor() { }

  ngOnInit() {
    this.goals = [
      { id: 1, name: 'Beber agua' },
      { id: 2, name: 'Hacer ejercicio' },
      { id: 3, name: 'Leer un capítulo' }
    ];
  }

  setDuration(goal: Goal) {
    if (!goal.tempDuration) return;

    goal.selectedDuration = goal.tempDuration;
    goal.showProgress = true;
    goal.progress = 0;

    // Convertir duración a milisegundos
    switch (goal.selectedDuration) {
      case '1 día':
        goal.durationMs = 24 * 60 * 60 * 1000;
        break;
      case '1 semana':
        goal.durationMs = 7 * 24 * 60 * 60 * 1000;
        break;
      case '1 mes':
        goal.durationMs = 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        goal.durationMs = 1000; // por seguridad
    }

    // Limpiar interval previo si existiera
    if (goal.intervalId) clearInterval(goal.intervalId);

    const intervalTime = 1000; // actualiza cada segundo
    const increment = 100 / (goal.durationMs / intervalTime); // % por segundo

    goal.intervalId = setInterval(() => {
      goal.progress! += increment;
      if (goal.progress! >= 100) {
        goal.progress = 0; // reinicia al llegar a 100
      }
    }, intervalTime);
  }
}
