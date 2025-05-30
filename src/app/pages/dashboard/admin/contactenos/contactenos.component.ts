import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactenos',
  imports: [AdminComponent, FormsModule,CommonModule],
  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.css'
})
export default class ContactenosComponent {

  formData = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  enviado = false;

  enviarMensaje(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    // Aquí normalmente harías la llamada a un backend o API
    console.log('Mensaje enviado:', this.formData);

    this.enviado = true;
    alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado.');

    this.limpiarFormulario(form);
  }

  limpiarFormulario(form?: NgForm) {
    this.formData = {
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    };
    this.enviado = false;

    if (form) {
      form.resetForm();
    }
  }
}


