import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonProgressBar, IonButton,
    IonFab, IonFabButton, IonIcon,
    CommonModule, FormsModule
  ]
})
export class HealthPage implements OnInit {
  goals = [
    { name: 'Beber 2L de agua', progress: 50 },
    { name: 'Dormir 8 horas', progress: 70 },
    { name: 'Ejercicio diario', progress: 30 },
  ];

  constructor(private alertController: AlertController) {
    addIcons({ add });
  }

  ngOnInit() {}

  increaseProgress(goal: any) {
    goal.progress = Math.min(goal.progress + 10, 100);
  }

  async addGoal() {
    const alert = await this.alertController.create({
      header: 'Nuevo objetivo',
      inputs: [
        {
          name: 'goalName',
          type: 'text',
          placeholder: 'Ej: Meditar 10 min'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            if (data.goalName.trim() !== '') {
              this.goals.push({ name: data.goalName, progress: 0 });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
