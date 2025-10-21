import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ObjectiveService, Objective } from '../../services/objectives/objective';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BaseChartDirective]
})
export class StatsPage implements OnInit {
  goals: Objective[] = [];
  objectives$ = this.objectiveService.getObjectives();

  // Datos del gráfico
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Progreso (%)', backgroundColor: [] }]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    }
  };

  constructor(private objectiveService: ObjectiveService) {}

  ngOnInit() {
    this.objectiveService.getObjectives().subscribe((goals: Objective[]) => {
      this.goals = goals;

      // Actualizamos el gráfico
      this.barChartData.labels = goals.map((g: Objective) => g.title);
      this.barChartData.datasets[0].data = goals.map((g: Objective) => g.progress);
      this.barChartData.datasets[0].backgroundColor = goals.map((g: Objective) =>
        this.getProgressColor(g.progress)
      );
    });
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'medium';
  }
}