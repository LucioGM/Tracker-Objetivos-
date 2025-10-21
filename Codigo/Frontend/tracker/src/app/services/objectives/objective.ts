import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Objective {
  id?: number;
  title: string;
  progress: number;
  created_at?: string;
  user_id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
  private objectivesSubject = new BehaviorSubject<Objective[]>([]);
  public objectives$: Observable<Objective[]> = this.objectivesSubject.asObservable();

  constructor(private supabase: SupabaseService) {
    this.loadObjectives();
  }

  private async getUserId(): Promise<string | null> {
    const { data, error } = await this.supabase.client.auth.getUser();
    if (error || !data?.user) return null;
    return data.user.id;
  }

  async loadObjectives(): Promise<void> {
    const userId = await this.getUserId();
    if (!userId) return;

    const { data, error } = await this.supabase.client
      .from('objectives')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    this.objectivesSubject.next(data || []);
  }

  async addObjective(title: string): Promise<void> {
    const userId = await this.getUserId();
    if (!userId) return;

    const { error } = await this.supabase.client
      .from('objectives')
      .insert([{ user_id: userId, title, progress: 0 }]);

    if (error) throw error;
    await this.loadObjectives();
  }

  async updateProgress(id: number, progress: number): Promise<void> {
    const { error } = await this.supabase.client
      .from('objectives')
      .update({ progress })
      .eq('id', id);

    if (error) throw error;
    await this.loadObjectives();
  }

  getObjectives(): Observable<Objective[]> {
    return this.objectives$;
  }
}
