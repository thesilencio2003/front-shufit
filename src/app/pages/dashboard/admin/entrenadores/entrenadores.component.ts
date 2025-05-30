import { Component, OnInit } from '@angular/core';
import AdminComponent from '../admin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Entrenador {
  nombre: string;
  especialidad: string;
  telefono: string;
  correo: string;
}

@Component({
  selector: 'app-entrenadores',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.css'
})
export default class EntrenadoresComponent implements OnInit {

   entrenadores: Entrenador[] = [];
  nuevoEntrenador: Entrenador = {
    nombre: '',
    especialidad: '',
    telefono: '',
    correo: ''
  };

  editando: boolean = false;
  indiceEditando: number | null = null;

  ngOnInit(): void {
    const data = localStorage.getItem('entrenadores');
    if (data) {
      this.entrenadores = JSON.parse(data);
    }
  }

  guardarEntrenador(): void {
    if (!this.nuevoEntrenador.nombre || !this.nuevoEntrenador.correo) return;

    if (this.editando && this.indiceEditando !== null) {
      this.entrenadores[this.indiceEditando] = { ...this.nuevoEntrenador };
      this.editando = false;
      this.indiceEditando = null;
    } else {
      this.entrenadores.push({ ...this.nuevoEntrenador });
    }

    localStorage.setItem('entrenadores', JSON.stringify(this.entrenadores));
    this.nuevoEntrenador = { nombre: '', especialidad: '', telefono: '', correo: '' };
  }

  editarEntrenador(index: number): void {
    this.nuevoEntrenador = { ...this.entrenadores[index] };
    this.editando = true;
    this.indiceEditando = index;
  }

  

  cancelarEdicion(): void {
    this.nuevoEntrenador = { nombre: '', especialidad: '', telefono: '', correo: '' };
    this.editando = false;
    this.indiceEditando = null;
  }

  eliminarEntrenador(index: number): void {
    this.entrenadores.splice(index, 1);
    localStorage.setItem('entrenadores', JSON.stringify(this.entrenadores));
    this.cancelarEdicion();
  }

}
