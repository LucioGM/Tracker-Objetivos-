import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonRange,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList
} from '@ionic/angular/standalone';

import { SupabaseService } from '../../services/objectives/supabase.service';

interface CaptureEntry {
  id: number;
  motivacion: number;
  progreso: number;
  mejora: string;
  created_at: string;
}

@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonRange,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    CommonModule,
    FormsModule
  ],
})
export class CapturePage implements OnInit {
  motivacion: number = 5;
  progreso: number = 5;
  mejora: string = '';
  resultado = false;

  respuestas: CaptureEntry[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.cargarRespuestas();
  }

  async guardarRespuestas() {
    try {
      const { error } = await this.supabaseService.client.from('capture').insert([
        {
          motivacion: this.motivacion,
          progreso: this.progreso,
          mejora: this.mejora,
        },
      ]);

      if (error) throw error;

      // Reiniciar formulario
      this.motivacion = 5;
      this.progreso = 5;
      this.mejora = '';

      this.resultado = true;

      // Recargar respuestas
      this.cargarRespuestas();

    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }

  async cargarRespuestas() {
    try {
      const { data, error } = await this.supabaseService.client
        .from('capture')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      this.respuestas = data as CaptureEntry[];
    } catch (error) {
      console.error('Error al cargar respuestas:', error);
    }
  }

  getProgressColor(progress: number): string {
    if (progress >= 8) return '#28a745';
    if (progress >= 5) return '#ffc107';
    return '#dc3545';
  }
}