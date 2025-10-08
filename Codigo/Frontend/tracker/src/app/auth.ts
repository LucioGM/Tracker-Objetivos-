import { Injectable } from '@angular/core';
import { supabase } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  // Login con email y contraseña
  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { data, error };
    } catch (err: any) {
      console.error('Error en login:', err.message);
      return { data: null, error: { message: err.message } };
    }
  }

  // Registro de nuevo usuario
  async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      return { data, error };
    } catch (err: any) {
      console.error('Error en signUp:', err.message);
      return { data: null, error: { message: err.message } };
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (err: any) {
      console.error('Error al cerrar sesión:', err.message);
      return false;
    }
  }

  // Obtener usuario actual
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data?.user ?? null;
  }

  // Escuchar cambios de sesión
  onAuthStateChange(callback: Function) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
}