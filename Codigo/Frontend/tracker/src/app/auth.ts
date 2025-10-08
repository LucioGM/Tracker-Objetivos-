import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  async login(email: string, password: string): Promise<{ data: any; error: any }> {
    // Simulación de autenticación
    if (email === 'test@example.com' && password === 'password') {
      return { data: { user: { email } }, error: null };
    } else {
      return { data: null, error: { message: 'Credenciales inválidas' } };
    }
  }

  async logout(): Promise<void> {
    console.log('Sesión cerrada');
  }
}