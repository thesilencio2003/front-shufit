import { Component, OnInit } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Cliente {
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
}

@Component({
  selector: 'app-clientes',
  imports: [AdminComponent,CommonModule, FormsModule ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export default class ClientesComponent implements OnInit {

 clientes: Cliente[] = [];
  nuevoCliente: Cliente = {
    nombre: '',
    direccion: '',
    telefono: '',
    correo: ''
  };

  editando: boolean = false;
  indiceEditando: number | null = null;

  ngOnInit(): void {
    const data = localStorage.getItem('clientes');
    if (data) {
      this.clientes = JSON.parse(data);
    }
  }

  


  agregarCliente(): void {
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.correo) return;

    if (this.editando && this.indiceEditando !== null) {
      this.clientes[this.indiceEditando] = { ...this.nuevoCliente };
      this.editando = false;
      this.indiceEditando = null;
    } else {
      this.clientes.push({ ...this.nuevoCliente });
    }

    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.nuevoCliente = { nombre: '', direccion: '', telefono: '', correo: '' };
  }

  editarCliente(index: number): void {
    this.nuevoCliente = { ...this.clientes[index] };
    this.editando = true;
    this.indiceEditando = index;
  }

  cancelarEdicion(): void {
    this.nuevoCliente = { nombre: '', direccion: '', telefono: '', correo: '' };
    this.editando = false;
    this.indiceEditando = null;
  }

  eliminarCliente(index: number): void {
    this.clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.cancelarEdicion();
  }
}
