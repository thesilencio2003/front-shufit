import { Component, OnInit } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ProductoBodega {
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  ubicacion: string;
}

@Component({
  selector: 'app-bodega',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css'
})
export default class BodegaComponent implements OnInit {

 productos: ProductoBodega[] = [];

  nuevoProducto: ProductoBodega = {
    codigo: '',
    nombre: '',
    categoria: '',
    stock: 0,
    ubicacion: ''
  };

  editIndex: number | null = null;

  ngOnInit(): void {
    const data = localStorage.getItem('productosBodega');
    if (data) {
      this.productos = JSON.parse(data);
    }
  }

  guardarProducto(): void {
    if (!this.nuevoProducto.codigo || !this.nuevoProducto.nombre || !this.nuevoProducto.categoria) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    if (this.editIndex === null) {
      // Nuevo producto
      this.productos.push({ ...this.nuevoProducto });
    } else {
      // Editar producto existente
      this.productos[this.editIndex] = { ...this.nuevoProducto };
      this.editIndex = null;
    }

    this.guardarLocalStorage();
    this.resetForm();
  }

  editarProducto(index: number): void {
    this.editIndex = index;
    this.nuevoProducto = { ...this.productos[index] };
  }

  eliminarProducto(index: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productos.splice(index, 1);
      this.guardarLocalStorage();
    }
  }

  resetForm(): void {
    this.nuevoProducto = {
      codigo: '',
      nombre: '',
      categoria: '',
      stock: 0,
      ubicacion: ''
    };
    this.editIndex = null;
  }

  guardarLocalStorage(): void {
    localStorage.setItem('productosBodega', JSON.stringify(this.productos));
  }
}
