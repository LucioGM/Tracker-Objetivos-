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
import { add, trashOutline } from 'ionicons/icons';
import { ObjectiveService } from '../../services/objectives/objective';
import { SupabaseService } from '../../services/objectives/supabase.service';

interface Objective {
  id?: number;
  title: string;
  progress: number;
}

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
  goals: Objective[] = [];

  get totalGoals() {
    return this.goals.length;
  }

  get completedGoals() {
    return this.goals.filter(g => g.progress >= 100).length;
  }

  get inProgressGoals() {
    return this.goals.filter(g => g.progress > 0 && g.progress < 100).length;
  }

  constructor(
    private alertController: AlertController,
    private objectiveService: ObjectiveService,
    private supabaseService: SupabaseService
  ) {
    addIcons({ add, trashOutline });
  }

  ngOnInit() {
    this.loadGoals();
  }

  async loadGoals() {
    this.objectiveService.getObjectives().subscribe(goals => {
      this.goals = goals;
    });
  }

  async increaseProgress(goal: Objective) {
    goal.progress = Math.min(goal.progress + 10, 100);
    await this.objectiveService.updateProgress(goal.id!, goal.progress);
  }

  async addGoal() {
    const alert = await this.alertController.create({
      header: 'Nuevo objetivo',
      inputs: [{ name: 'goalName', type: 'text', placeholder: 'Ej: Meditar 10 min' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: async (data) => {
            if (data.goalName.trim() !== '') {
              await this.objectiveService.addObjective(data.goalName);
              this.loadGoals();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteGoal(goal: Objective) {
    const alert = await this.alertController.create({
      header: 'Eliminar objetivo',
      message: `¿Deseas eliminar "${goal.title}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.supabaseService.client
              .from('objectives')
              .delete()
              .eq('id', goal.id);
            this.loadGoals();
          }
        }
      ]
    });
    await alert.present();
  }
}