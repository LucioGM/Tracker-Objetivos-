import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ObjectiveService, Objective } from '../../services/objectives/objective';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BaseChartDirective]
})
export class StatsPage implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  goals: Objective[] = [];
  objectives$ = this.objectiveService.getObjectives();

  // Datos del gráfico
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Progreso (%)',
        backgroundColor: [],
        borderRadius: 6,
        barThickness: 30 // ancho de las barras ajustable
      }
    ]
  };

  // Opciones visuales del gráfico con eje Y estilizado
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,                // intervalos de los números
          color: 'white',            // color de los números del eje Y
          font: {
            size: 18,                  // tamaño de fuente
            weight: 'bold',            // grosor
            family: 'Poppins, Arial, sans-serif' // fuente personalizada
          },
          callback: (value) => `${value}%` // agrega el símbolo %
        },
        grid: {
          color: 'white',            // color de las líneas horizontales
          lineWidth: 1
        }
      },
      x: {
        ticks: {
          color: 'white',            // color de las etiquetas del eje X
          font: { size: 20, family: 'Poppins, Arial, sans-serif' }
        },
        grid: { display: false }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#2c3e50',
          font: { size: 13, family: 'Poppins, Arial, sans-serif' }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#2c3e50',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    }
  };

  constructor(private objectiveService: ObjectiveService) {}

  ngOnInit() {
    this.objectiveService.getObjectives().subscribe((goals: Objective[]) => {
      this.goals = goals;

      // Actualizamos el gráfico
      this.barChartData.labels = goals.map((g) => g.title);
      this.barChartData.datasets[0].data = goals.map((g) => g.progress);
      this.barChartData.datasets[0].backgroundColor = goals.map((g) =>
        this.getProgressColor(g.progress)
      );

      // Refrescar gráfico
      this.chart?.update();
    });
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#28a745'; // verde
    if (progress >= 50) return '#ffc107'; // amarillo
    return '#dc3545'; // rojo
  }
}