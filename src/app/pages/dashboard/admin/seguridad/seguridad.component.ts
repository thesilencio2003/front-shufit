import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface SecurityLog {
  fechaHora: string;
  tipoEvento: string;
  usuario: string;
  ip: string;
  resultado: string;
  color?: string;
}

@Component({
  selector: 'app-seguridad',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './seguridad.component.html',
  styleUrl: './seguridad.component.css'
})
export default class SeguridadComponent {

   cambioContrasena = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  twoFAEnabled = false;

  alertSettings = {
    alertLoginAttempts: true,
    alertNewDevice: false,
    alertEmail: ''
  };

  securityLogs: SecurityLog[] = [
    {
      fechaHora: '2025-05-23 23:30:15',
      tipoEvento: 'Inicio de Sesión',
      usuario: 'Admin Principal',
      ip: '192.168.1.105',
      resultado: 'Exitoso',
      color: 'green'
    },
    {
      fechaHora: '2025-05-23 23:28:00',
      tipoEvento: 'Intento de Inicio de Sesión',
      usuario: 'usuario_desconocido',
      ip: '203.0.113.45',
      resultado: 'Fallido (Contraseña incorrecta)',
      color: 'red'
    },
    {
      fechaHora: '2025-05-22 14:00:00',
      tipoEvento: 'Cambio de Contraseña',
      usuario: 'Juan Pérez',
      ip: '192.168.1.101',
      resultado: 'Exitoso',
      color: 'green'
    }
  ];

  cambiarContrasena(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    if (this.cambioContrasena.newPassword !== this.cambioContrasena.confirmPassword) {
      alert('La nueva contraseña y su confirmación no coinciden.');
      return;
    }
    if (!this.validarPassword(this.cambioContrasena.newPassword)) {
      alert('La nueva contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, números y símbolos.');
      return;
    }

    // Simula cambio de contraseña exitoso
    alert('Contraseña cambiada con éxito.');
    form.resetForm();
    this.cambioContrasena = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  validarPassword(pwd: string): boolean {
    // Mínimo 8 caracteres, al menos una mayúscula, un número y un símbolo
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(pwd);
  }

  toggle2FA() {
    this.twoFAEnabled = !this.twoFAEnabled;
    alert(`Autenticación de dos factores ${this.twoFAEnabled ? 'habilitada' : 'deshabilitada'}.`);
  }

  configurar2FA() {
    if (!this.twoFAEnabled) {
      alert('Primero habilita la autenticación de dos factores.');
      return;
    }
    // Aquí pondrías la lógica para configurar 2FA (ej: mostrar QR, etc)
    alert('Redirigiendo a la configuración de 2FA...');
  }

  guardarAlertas(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    alert('Configuración de alertas de seguridad guardada.');
  }

  exportarRegistro() {
    alert('Función de exportar registros aún no implementada.');
  }

  verTodosRegistros() {
    alert('Función de ver todos los registros aún no implementada.');
  }

}
