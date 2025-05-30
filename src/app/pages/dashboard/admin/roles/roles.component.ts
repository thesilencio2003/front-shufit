import { Component, OnInit } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Asignacion {
  usuario: string;
  rol: string;
  permisos: string[];
}

@Component({
  selector: 'app-roles',
  imports: [AdminComponent, FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export default class RolesComponent implements OnInit {
  asignaciones: Asignacion[] = [];
  usuariosDisponibles: string[] = ['Juan Pérez', 'María García'];

  nuevo: Asignacion = {
    usuario: '',
    rol: '',
    permisos: []
  };

  editando: boolean = false;
  indiceEditando: number | null = null;
  ngOnInit(): void {
    // Obtener asignaciones de roles previas (si existen)
    const data = localStorage.getItem('rolesPermisos');
    if (data) {
      this.asignaciones = JSON.parse(data);
    }

    // Obtener usuarios guardados desde "perfil de usuario"
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      const lista = JSON.parse(usuariosGuardados);
      this.usuariosDisponibles = lista.map((u: any) => u.nombre);
    }
  }

  togglePermiso(permiso: string): void {
    const index = this.nuevo.permisos.indexOf(permiso);
    if (index > -1) {
      this.nuevo.permisos.splice(index, 1);
    } else {
      this.nuevo.permisos.push(permiso);
    }
  }

  guardarAsignacion(): void {
    if (!this.nuevo.usuario || !this.nuevo.rol || this.nuevo.permisos.length === 0) return;

    if (this.editando && this.indiceEditando !== null) {
      this.asignaciones[this.indiceEditando] = { ...this.nuevo };
      this.editando = false;
      this.indiceEditando = null;
    } else {
      this.asignaciones.push({ ...this.nuevo });
    }

    localStorage.setItem('rolesPermisos', JSON.stringify(this.asignaciones));
    this.nuevo = { usuario: '', rol: '', permisos: [] };
  }

  editarAsignacion(index: number): void {
    this.nuevo = { ...this.asignaciones[index], permisos: [...this.asignaciones[index].permisos] };
    this.editando = true;
    this.indiceEditando = index;
  }

  cancelar(): void {
    this.nuevo = { usuario: '', rol: '', permisos: [] };
    this.editando = false;
    this.indiceEditando = null;
  }

  eliminarAsignacion(index: number): void {
    this.asignaciones.splice(index, 1);
    localStorage.setItem('rolesPermisos', JSON.stringify(this.asignaciones));
    this.cancelar();
  }

  tienePermiso(permiso: string): boolean {
    return this.nuevo.permisos.includes(permiso);
  }
}
