import { Component, OnInit } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Usuario {
  nombre: string;
  correo: string;
  contrasena: string;
  rol: string;
}

@Component({
  selector: 'app-perfiluser',
  imports: [AdminComponent, FormsModule,CommonModule],
  templateUrl: './perfiluser.component.html',
  styleUrl: './perfiluser.component.css'
})
export default class PerfiluserComponent implements OnInit {

  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    nombre: '',
    correo: '',
    contrasena: '',
    rol: 'user'
  };

  editando: boolean = false;
  indiceEditando: number | null = null;

  ngOnInit(): void {
    const data = localStorage.getItem('usuarios');
    if (data) {
      this.usuarios = JSON.parse(data);
    }
  }

  guardarUsuario(): void {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.contrasena) return;

    if (this.editando && this.indiceEditando !== null) {
      this.usuarios[this.indiceEditando] = { ...this.nuevoUsuario };
      this.editando = false;
      this.indiceEditando = null;
    } else {
      this.usuarios.push({ ...this.nuevoUsuario });
    }

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    this.nuevoUsuario = { nombre: '', correo: '', contrasena: '', rol: 'user' };
  }

  editarUsuario(index: number): void {
    this.nuevoUsuario = { ...this.usuarios[index] };
    this.editando = true;
    this.indiceEditando = index;
  }

  cancelarEdicion(): void {
    this.nuevoUsuario = { nombre: '', correo: '', contrasena: '', rol: 'user' };
    this.editando = false;
    this.indiceEditando = null;
  }

  eliminarUsuario(index: number): void {
    this.usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    this.cancelarEdicion();
  }

}
