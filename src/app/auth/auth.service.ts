import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface Usuario {
  nombre: string;
  correo: string;
  contrasena: string; // In a real app, never send plain passwords directly
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Inicialmente no autenticado
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  login(credentials: any): Observable<string> { // Espera una respuesta de texto
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' }).pipe(
      tap((response: string) => {
        if (response === 'Logged in successfully') {
          this.isAuthenticatedSubject.next(true); // Establece el estado como autenticado
        } else {
          this.isAuthenticatedSubject.next(false); // Si la respuesta no es éxito, no autenticar
        }
      })
    );
  }

  admin(): void{
    this.isAuthenticatedSubject.next(true);
  }




  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value; 
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    // Limpiar cualquier otra información de autenticación (localStorage, etc.) si es necesario
  }

  

}
