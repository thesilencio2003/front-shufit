import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestionequipo',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './gestionequipo.component.html',
  styleUrl: './gestionequipo.component.css'
})
export default class GestionequipoComponent {

   equipos = [
    {
      id: 'SN-CINTA-001A',
      nombre: 'Cinta de Correr ProFX',
      tipo: 'cardio',
      estado: 'available',
      ultimoMantenimiento: '2025-05-10',
      proximoMantenimiento: '2025-08-10'
    },
    {
      id: 'SN-PESAS-005B',
      nombre: 'Juego de Mancuernas (5-25kg)',
      tipo: 'strength',
      estado: 'in-use',
      ultimoMantenimiento: '2025-03-20',
      proximoMantenimiento: '2025-06-20'
    },
    {
      id: 'SN-ELI-002C',
      nombre: 'Elíptica SmartFit',
      tipo: 'cardio',
      estado: 'maintenance',
      ultimoMantenimiento: '2025-05-20',
      proximoMantenimiento: '2025-05-27'
    }
  ];

  equipo = {
    id: '',
    nombre: '',
    tipo: '',
    estado: 'available',
    ultimoMantenimiento: '',
    proximoMantenimiento: ''
  };

  guardarEquipo(event: Event) {
    event.preventDefault();
    const index = this.equipos.findIndex(e => e.id === this.equipo.id);
    if (index !== -1) {
      this.equipos[index] = {...this.equipo};
    } else {
      this.equipos.push({...this.equipo});
    }
    this.limpiarFormulario();
  }

  cancelar() {
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.equipo = {
      id: '',
      nombre: '',
      tipo: '',
      estado: 'available',
      ultimoMantenimiento: '',
      proximoMantenimiento: ''
    };
  }

  tipoTexto(tipo: string) {
    switch(tipo) {
      case 'cardio': return 'Cardio';
      case 'strength': return 'Fuerza';
      case 'accessories': return 'Accesorios';
      case 'recovery': return 'Recuperación';
      default: return '';
    }
  }

  estadoTexto(estado: string) {
    switch(estado) {
      case 'available': return 'Disponible';
      case 'in-use': return 'En Uso';
      case 'maintenance': return 'En Mantenimiento';
      case 'retired': return 'Fuera de Servicio';
      default: return '';
    }
  }

  colorEstado(estado: string) {
    switch(estado) {
      case 'available': return 'green';
      case 'in-use': return 'blue';
      case 'maintenance': return 'orange';
      case 'retired': return 'red';
      default: return 'black';
    }
  }

  verDetalles(equipo: any) {
    alert(`Detalles del equipo:\nID: ${equipo.id}\nNombre: ${equipo.nombre}\nTipo: ${this.tipoTexto(equipo.tipo)}\nEstado: ${this.estadoTexto(equipo.estado)}\nÚltimo Mantenimiento: ${equipo.ultimoMantenimiento}\nPróximo Mantenimiento: ${equipo.proximoMantenimiento}`);
  }

  registrarMantenimiento(equipo: any) {
    const fecha = prompt('Ingrese la fecha del próximo mantenimiento (YYYY-MM-DD):', equipo.proximoMantenimiento || '');
    if (fecha) {
      equipo.proximoMantenimiento = fecha;
      alert('Fecha de próximo mantenimiento actualizada.');
    }
  }

  programarMantenimiento() {
    alert('Función para programar nuevo mantenimiento');
  }

  verHistorial() {
    alert('Función para ver historial de mantenimiento');
  }
}


