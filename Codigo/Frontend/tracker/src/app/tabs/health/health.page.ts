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
  IonInput,
  IonDatetime,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonCheckbox,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';

import { SupabaseService } from '../../services/objectives/supabase.service';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

interface Meta {
  id?: number;
  titulo: string;
  descripcion?: string;
  fecha: string;
  completada: boolean;
}

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonCheckbox,
    IonIcon, // ✅ agregado para que funcione <ion-icon>
  ],
})
export class HealthPage implements OnInit {
  metas: Meta[] = [];
  nuevaMeta: Partial<Meta> = { titulo: '', descripcion: '', fecha: '' };

  constructor(
    private supabaseService: SupabaseService,
    private alertCtrl: AlertController
  ) {
    addIcons({ trashOutline }); // ✅ registrar el icono
  }

  async ngOnInit() {
    await this.cargarMetas();
  }

  async cargarMetas() {
    const { data, error } = await this.supabaseService.client
      .from('metas_calendario')
      .select('*')
      .order('fecha', { ascending: true });
    if (!error) this.metas = data || [];
  }

  async agregarMeta() {
    if (!this.nuevaMeta.titulo || !this.nuevaMeta.fecha) {
      const alert = await this.alertCtrl.create({
        header: 'Campos incompletos',
        message: 'Debes ingresar un título y una fecha.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const { error } = await this.supabaseService.client
      .from('metas_calendario')
      .insert([this.nuevaMeta]);

    if (!error) {
      this.nuevaMeta = { titulo: '', descripcion: '', fecha: '' };
      await this.cargarMetas();
    }
  }

  async toggleCompletada(meta: Meta) {
    const { error } = await this.supabaseService.client
      .from('metas_calendario')
      .update({ completada: !meta.completada })
      .eq('id', meta.id);

    if (!error) await this.cargarMetas();
  }

  async eliminarMeta(id?: number) {
    const { error } = await this.supabaseService.client
      .from('metas_calendario')
      .delete()
      .eq('id', id);

    if (!error) await this.cargarMetas();
  }
}