import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectiveService, Objective } from '../../services/objective';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class StatsPage {

  objectives$: Observable<Objective[]>;

  constructor(private objectiveService: ObjectiveService) {
    // Obtenemos la lista de objetivos en tiempo real
    this.objectives$ = this.objectiveService.getObjectives();
  }

  // Función para obtener el color de la barra según progreso
  getProgressColor(progress: number): string {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'danger';
  }
}