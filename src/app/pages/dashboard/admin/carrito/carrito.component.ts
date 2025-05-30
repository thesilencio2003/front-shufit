import { Component, OnInit } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ItemCarrito {
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export default class CarritoComponent implements OnInit {

    carrito: ItemCarrito[] = [];

  nuevoItem: ItemCarrito = {
    nombre: '',
    precio: 0,
    cantidad: 1
  };

  ngOnInit(): void {
    const data = localStorage.getItem('carrito');
    if (data) {
      this.carrito = JSON.parse(data);
    }
  }

  agregarAlCarrito(): void {
    if (!this.nuevoItem.nombre || this.nuevoItem.precio <= 0 || this.nuevoItem.cantidad <= 0) return;

    // Si el producto ya existe, suma cantidades
    const indice = this.carrito.findIndex(item => item.nombre.toLowerCase() === this.nuevoItem.nombre.toLowerCase());

    if (indice >= 0) {
      this.carrito[indice].cantidad += this.nuevoItem.cantidad;
    } else {
      this.carrito.push({ ...this.nuevoItem });
    }

    this.guardarCarrito();
    this.resetForm();
  }

  aumentarCantidad(index: number): void {
    this.carrito[index].cantidad++;
    this.guardarCarrito();
  }

  disminuirCantidad(index: number): void {
    if (this.carrito[index].cantidad > 1) {
      this.carrito[index].cantidad--;
      this.guardarCarrito();
    }
  }

  eliminarProducto(index: number): void {
    this.carrito.splice(index, 1);
    this.guardarCarrito();
  }

  getTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  resetForm(): void {
    this.nuevoItem = { nombre: '', precio: 0, cantidad: 1 };
  }

  guardarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}


