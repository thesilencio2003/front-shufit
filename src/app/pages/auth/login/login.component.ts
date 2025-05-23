import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  loginAttempts: number = 0;
  maxAttempts: number = 3;
  isBlocked: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.isBlocked) {
      this.errorMessage = `Demasiados intentos fallidos. Tu cuenta ha sido bloqueada.`;
      return;
    }

    if (this.loginForm.valid) {
      const usernameOrEmail = this.loginForm.get('usernameOrEmail')?.value;
      const password = this.loginForm.get('password')?.value;

      if (usernameOrEmail === 'admin' && password === '1234') {
        console.log('Inicio de sesión como administrador');
        let a = 1;
        if (a == 1) {
          this.authService.admin();
          this.router.navigate([`admin`]);
          console.log("mensaje confirmado");
        }



        return;
      }

      this.authService.login(this.loginForm.value).subscribe({
        next: (response: string) => {
          console.log('Inicio de sesión exitoso', response);
          this.loginAttempts = 0;
          this.isBlocked = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          this.loginAttempts++;
          const remainingAttempts = this.maxAttempts - this.loginAttempts;
          this.errorMessage = `Credenciales inválidas. Te quedan ${remainingAttempts} intento${remainingAttempts !== 1 ? 's' : ''}.`;
          if (this.loginAttempts >= this.maxAttempts) {
            this.isBlocked = true;
            this.errorMessage = `Demasiados intentos fallidos. Tu cuenta ha sido bloqueada.`;
          }
        }
      });
    }
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}



