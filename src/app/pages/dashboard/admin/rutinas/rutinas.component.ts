import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Rutina {
  nombre: string;
  objetivo: string;
  nivel: string;
  dias: number;
  descripcion?: string;
}

@Component({
  selector: 'app-rutinas',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.css'
})
export default class RutinasComponent {
  rutinas: Rutina[] = [
    {
      nombre: 'Rutina Full Body Principiante',
      objetivo: 'strength',
      nivel: 'beginner',
      dias: 3,
      descripcion: 'Rutina para ganar fuerza general, ideal para principiantes.'
    },
    {
      nombre: 'Dividida PPL Avanzada',
      objetivo: 'hypertrophy',
      nivel: 'advanced',
      dias: 5,
      descripcion: 'Programa avanzado enfocado en hipertrofia con división Push-Pull-Legs.'
    },
    {
      nombre: 'Cardio HIIT Quema Grasa',
      objetivo: 'fat-loss',
      nivel: 'intermediate',
      dias: 4,
      descripcion: 'Entrenamiento HIIT para pérdida de grasa, nivel intermedio.'
    }
  ];

  rutina: Rutina = {
    nombre: '',
    objetivo: '',
    nivel: 'beginner',
    dias: 3,
    descripcion: ''
  };

  rutinaEditarIndex: number | null = null;

  guardarRutina(event: Event) {
    event.preventDefault();

    if (this.rutinaEditarIndex !== null) {
      this.rutinas[this.rutinaEditarIndex] = { ...this.rutina };
    } else {
      this.rutinas.push({ ...this.rutina });
    }
    this.limpiarFormulario();
  }

  editarRutina(index: number) {
    this.rutina = { ...this.rutinas[index] };
    this.rutinaEditarIndex = index;
  }

  eliminarRutina(index: number) {
    if (confirm(`¿Seguro que quieres eliminar la rutina "${this.rutinas[index].nombre}"?`)) {
      this.rutinas.splice(index, 1);
      if (this.rutinaEditarIndex === index) {
        this.limpiarFormulario();
      }
    }
  }

  cancelar() {
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.rutina = {
      nombre: '',
      objetivo: '',
      nivel: 'beginner',
      dias: 3,
      descripcion: ''
    };
    this.rutinaEditarIndex = null;
  }

  verDetalles(rutina: Rutina) {
    alert(
      `Detalles de la Rutina:\n` +
      `Nombre: ${rutina.nombre}\n` +
      `Objetivo: ${this.objetivoTexto(rutina.objetivo)}\n` +
      `Nivel: ${this.nivelTexto(rutina.nivel)}\n` +
      `Días/Semana: ${rutina.dias}\n` +
      `Descripción: ${rutina.descripcion || '-'}`);
  }

  asignarRutina(rutina: Rutina) {
    alert(`Asignar la rutina "${rutina.nombre}" a un usuario.`);
  }

  exportarRutinas() {
    const encabezados = ['Nombre', 'Objetivo', 'Nivel', 'Días/Semana', 'Descripción'];
    const filas = this.rutinas.map(r =>
      [
        `"${r.nombre}"`,
        `"${this.objetivoTexto(r.objetivo)}"`,
        `"${this.nivelTexto(r.nivel)}"`,
        r.dias,
        `"${(r.descripcion || '').replace(/"/g, '""')}"`
      ].join(',')
    );

    const csvContent = [encabezados.join(','), ...filas].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'rutinas_inventario.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  objetivoTexto(objetivo: string): string {
    switch (objetivo) {
      case 'strength': return 'Fuerza';
      case 'hypertrophy': return 'Hipertrofia';
      case 'endurance': return 'Resistencia';
      case 'fat-loss': return 'Pérdida de Grasa';
      case 'flexibility': return 'Flexibilidad';
      default: return '';
    }
  }

  nivelTexto(nivel: string): string {
    switch (nivel) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return '';
    }
  }
}