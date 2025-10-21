import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://akhokbjlyoxedpvvegnp.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraG9rYmpseW94ZWRwdnZlZ25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMDk4NjgsImV4cCI6MjA3MDY4NTg2OH0.imx3Nz50Zd7jDDwII_cWMBed5TSmq0Tp-KO7EaHKRNs'
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}