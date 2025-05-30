import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PQRSDF {
  id: string;
  tipo: string;
  asunto: string;
  fechaRadicacion: string;
  estado: string;
}

@Component({
  selector: 'app-pqrsd',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './pqrsd.component.html',
  styleUrl: './pqrsd.component.css'
})
export default class PqrsdComponent {

 tipos = [
    { value: 'peticion', label: 'Petición' },
    { value: 'queja', label: 'Queja' },
    { value: 'reclamo', label: 'Reclamo' },
    { value: 'sugerencia', label: 'Sugerencia' },
    { value: 'denuncia', label: 'Denuncia' },
    { value: 'felicitacion', label: 'Felicitación' }
  ];

  pqrsdfForm = {
    tipo: '',
    asunto: '',
    descripcion: '',
    cliente: '',
    email: '',
    telefono: ''
  };

  historial: PQRSDF[] = [
    {
      id: 'PQRSDF-001',
      tipo: 'Queja',
      asunto: 'Mal funcionamiento de máquina',
      fechaRadicacion: '2025-05-20',
      estado: 'En Revisión'
    },
    {
      id: 'PQRSDF-002',
      tipo: 'Sugerencia',
      asunto: 'Ampliar horario fines de semana',
      fechaRadicacion: '2025-05-18',
      estado: 'Recibida'
    },
    {
      id: 'PQRSDF-003',
      tipo: 'Felicitación',
      asunto: 'Excelente servicio del entrenador Pedro',
      fechaRadicacion: '2025-05-15',
      estado: 'Cerrada'
    }
  ];

  enviarSolicitud() {
    if (!this.pqrsdfForm.tipo || !this.pqrsdfForm.asunto || !this.pqrsdfForm.descripcion || !this.pqrsdfForm.email) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    const nuevoId = `PQRSDF-${(this.historial.length + 1).toString().padStart(3, '0')}`;
    const nuevaSolicitud: PQRSDF = {
      id: nuevoId,
      tipo: this.pqrsdfForm.tipo,
      asunto: this.pqrsdfForm.asunto,
      fechaRadicacion: new Date().toISOString().split('T')[0],
      estado: 'Recibida'
    };
    this.historial.unshift(nuevaSolicitud);
    alert('Solicitud enviada con éxito!');
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.pqrsdfForm = {
      tipo: '',
      asunto: '',
      descripcion: '',
      cliente: '',
      email: '',
      telefono: ''
    };
  }

  verDetalles(id: string) {
    const solicitud = this.historial.find(h => h.id === id);
    if (solicitud) {
      alert(`Detalles de la solicitud:\nID: ${solicitud.id}\nTipo: ${solicitud.tipo}\nAsunto: ${solicitud.asunto}\nFecha: ${solicitud.fechaRadicacion}\nEstado: ${solicitud.estado}`);
    }
  }

  actualizarEstado(id: string) {
    const solicitud = this.historial.find(h => h.id === id);
    if (!solicitud) return;
    const nuevoEstado = prompt('Ingrese nuevo estado:', solicitud.estado);
    if (nuevoEstado && nuevoEstado.trim() !== '') {
      solicitud.estado = nuevoEstado.trim();
      alert('Estado actualizado.');
    }
  }

  buscarSolicitudes() {
    alert('Funcionalidad de búsqueda aún no implementada.');
  }

  generarReporte() {
    alert('Funcionalidad de generación de reporte aún no implementada.');
  }
}


