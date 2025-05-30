import { Component, OnInit } from '@angular/core';
import AdminComponent from '../admin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-productos',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  nuevo: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: ''
  };

  editando: boolean = false;
  indiceEditando: number | null = null;

  ngOnInit(): void {
    const data = localStorage.getItem('productos');
    if (data) {
      this.productos = JSON.parse(data);
    }
  }

  guardarProducto(): void {
    if (!this.nuevo.nombre || !this.nuevo.descripcion || this.nuevo.precio <= 0) return;

    if (this.editando && this.indiceEditando !== null) {
      this.productos[this.indiceEditando] = { ...this.nuevo };
      this.editando = false;
      this.indiceEditando = null;
    } else {
      this.productos.push({ ...this.nuevo });
    }

    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.nuevo = { nombre: '', descripcion: '', precio: 0, imagen: '' };
  }

  editarProducto(index: number): void {
    this.nuevo = { ...this.productos[index] };
    this.editando = true;
    this.indiceEditando = index;
  }

  cancelar(): void {
    this.nuevo = { nombre: '', descripcion: '', precio: 0, imagen: '' };
    this.editando = false;
    this.indiceEditando = null;
  }

  eliminarProducto(index: number): void {
    this.productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.cancelar();
  }
}
 
