import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Cita {
  cliente: string;
  entrenador: string;
  fecha: string;     // YYYY-MM-DD
  hora: string;      // HH:mm (24h)
  tipo: string;
  notas?: string;
  estado: 'confirmada' | 'pendiente' | 'cancelada';
}

@Component({
  selector: 'app-agendar',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './agendar.component.html',
  styleUrl: './agendar.component.css'
})
export default class AgendarComponent {

 citas: Cita[] = [
    {
      cliente: 'Juan Pérez',
      entrenador: 'Sofía Rodríguez',
      fecha: '2025-05-25',
      hora: '10:00',
      tipo: 'personal-training',
      estado: 'confirmada'
    },
    {
      cliente: 'María García',
      entrenador: 'Pedro Gámez',
      fecha: '2025-05-26',
      hora: '15:00',
      tipo: 'nutrition',
      estado: 'pendiente'
    },
    {
      cliente: 'Carlos López',
      entrenador: 'Ana Fernández',
      fecha: '2025-05-27',
      hora: '09:00',
      tipo: 'evaluation',
      estado: 'confirmada'
    }
  ];

  // Datos del formulario (para crear o editar)
  citaForm: Cita = this.crearCitaVacia();

  // Índice para editar, null si nueva cita
  editarIndex: number | null = null;

  crearCitaVacia(): Cita {
    return {
      cliente: '',
      entrenador: '',
      fecha: '',
      hora: '',
      tipo: '',
      notas: '',
      estado: 'pendiente'
    };
  }

  guardarCita(event: Event) {
    event.preventDefault();
    if (!this.citaForm.cliente || !this.citaForm.entrenador || !this.citaForm.fecha || !this.citaForm.hora || !this.citaForm.tipo) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (this.editarIndex !== null) {
      this.citas[this.editarIndex] = { ...this.citaForm };
    } else {
      this.citas.push({ ...this.citaForm });
    }

    this.cancelar();
  }

  editarCita(index: number) {
    this.citaForm = { ...this.citas[index] };
    this.editarIndex = index;
  }

  cancelar() {
    this.citaForm = this.crearCitaVacia();
    this.editarIndex = null;
  }

  cancelarCita(index: number) {
    if (confirm(`¿Desea cancelar la cita de ${this.citas[index].cliente} con ${this.citas[index].entrenador}?`)) {
      this.citas[index].estado = 'cancelada';
    }
  }

  reagendarCita(index: number) {
    // Para simplificar, aquí solo activamos el modo edición para cambiar fecha/hora.
    alert('Para reagendar, edite la cita y cambie la fecha u hora.');
    this.editarCita(index);
  }

  textoTipo(tipo: string): string {
    switch (tipo) {
      case 'personal-training': return 'Entrenamiento Personal';
      case 'consultation': return 'Consulta de Asesoría';
      case 'nutrition': return 'Asesoría Nutricional';
      case 'evaluation': return 'Evaluación Inicial';
      default: return tipo;
    }
  }

  textoEstado(estado: string): string {
    switch (estado) {
      case 'confirmada': return 'Confirmada';
      case 'pendiente': return 'Pendiente';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  }

  colorEstado(estado: string): string {
    switch (estado) {
      case 'confirmada': return 'green';
      case 'pendiente': return 'orange';
      case 'cancelada': return 'red';
      default: return 'black';
    }
  }
}
