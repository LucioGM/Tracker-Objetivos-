import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonProgressBar,
  IonButton, IonFab, IonFabButton, IonIcon,
  IonCard, IonCardContent, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonProgressBar,
    IonButton, IonFab, IonFabButton, IonIcon,
    IonCard, IonCardContent,
    CommonModule, FormsModule
  ]
})
export class HomePage implements OnInit {
  goals = [
    { name: 'Terminar el proyecto', progress: 80 },
    { name: 'Leer 10 páginas diarias', progress: 50 },
    { name: 'Salir a caminar', progress: 30 },
  ];
  get totalGoals() {
    return this.goals.length;
  }
  
  get completedGoals() {
    return this.goals.filter(g => g.progress >= 100).length;
  }
  
  get inProgressGoals() {
    return this.goals.filter(g => g.progress > 0 && g.progress < 100).length;
  }

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
      inputs: [{ name: 'goalName', type: 'text', placeholder: 'Ej: Meditar 10 min' }],
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