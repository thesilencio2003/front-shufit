import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuracion',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export default class ConfiguracionComponent {
 gymInfo = {
    name: '',
    address: '',
    phone: '',
    email: ''
  };

  notifications = {
    appointments: true,
    lowStock: false,
    pqrsd: false
  };

  securityOptions = {
    passwordPolicy: 'medium',
    twoFactorAuth: false
  };

  // Valores por defecto para restablecer
  defaultValues = {
    gymInfo: {
      name: 'Gimnasio Elite Fitness',
      address: 'Calle 10 # 5-20, Cali',
      phone: '+57 310 123 4567',
      email: 'info@elitefitness.com'
    },
    notifications: {
      appointments: true,
      lowStock: false,
      pqrsd: false
    },
    securityOptions: {
      passwordPolicy: 'medium',
      twoFactorAuth: false
    }
  };

  constructor() {
    this.resetToDefaults();
  }

  guardarCambios(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      alert('Por favor corrige los errores en el formulario antes de guardar.');
      return;
    }
    alert('Cambios guardados exitosamente.');
  }

  resetToDefaults() {
    this.gymInfo = { ...this.defaultValues.gymInfo };
    this.notifications = { ...this.defaultValues.notifications };
    this.securityOptions = { ...this.defaultValues.securityOptions };
  }

  goToSection(section: string) {
    alert(`Navegando a ${section}...`);
    // Aquí puedes añadir lógica real de navegación o abrir modal, etc.
  }

  verRegistroActividad() {
    alert('Mostrando registro de actividad de configuración...');
  }
}
