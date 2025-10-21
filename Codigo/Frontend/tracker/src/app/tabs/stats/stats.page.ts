import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonProgressBar,
  IonCard, IonCardContent
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { ObjectiveService } from '../../services/objectives/objective';

interface Objective {
  id?: number;
  title: string;
  progress: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonProgressBar,
    IonCard, IonCardContent,
    CommonModule
  ]
})
export class StatsPage implements OnInit {
  objectives$: Observable<Objective[]>;

  constructor(private objectiveService: ObjectiveService) {
    // Inicializamos el Observable para la plantilla
    this.objectives$ = this.objectiveService.getObjectives();
  }

  ngOnInit() {
    // No es necesario suscribirse manualmente, se usa | async en el HTML
  }

  // Retorna el color de la barra según el progreso
  getProgressColor(progress: number): string {
    if (progress >= 100) {
      return 'success';
    } else if (progress > 0) {
      return 'warning';
    } else {
      return 'medium';
    }
  }
}