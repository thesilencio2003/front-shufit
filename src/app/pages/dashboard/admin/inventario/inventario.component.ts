import { Component, OnInit } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ArticuloInventario {
  sku: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  proveedor: string;
  stockMinimo: number;
}

@Component({
  selector: 'app-inventario',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export default class InventarioComponent implements OnInit {
  articulos: ArticuloInventario[] = [];

  articuloForm: ArticuloInventario = {
    sku: '',
    nombre: '',
    categoria: '',
    cantidad: 0,
    proveedor: '',
    stockMinimo: 0
  };

  editIndex: number | null = null;

  ngOnInit(): void {
    const data = localStorage.getItem('inventario');
    if (data) {
      this.articulos = JSON.parse(data);
    }
  }

  guardarArticulo() {
    if (!this.articuloForm.sku || !this.articuloForm.nombre || !this.articuloForm.categoria) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    if (this.editIndex === null) {
      // Agregar nuevo artículo
      this.articulos.push({ ...this.articuloForm });
    } else {
      // Actualizar artículo existente
      this.articulos[this.editIndex] = { ...this.articuloForm };
    }

    this.guardarLocalStorage();
    this.limpiarFormulario();
  }

  editarArticulo(index: number) {
    this.editIndex = index;
    this.articuloForm = { ...this.articulos[index] };
  }

  limpiarFormulario() {
    this.articuloForm = {
      sku: '',
      nombre: '',
      categoria: '',
      cantidad: 0,
      proveedor: '',
      stockMinimo: 0
    };
    this.editIndex = null;
  }

  guardarLocalStorage() {
    localStorage.setItem('inventario', JSON.stringify(this.articulos));
  }

 
  eliminarArticulo(index: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      this.articulos.splice(index, 1);
      this.guardarLocalStorage();
      this.limpiarFormulario(); // Limpia el formulario si se elimina el artículo que se estaba editando
    }
  }

  // Nuevo método para cancelar la edición
  cancelarEdicion() {
    this.limpiarFormulario();
  }

  registrarSalida(index: number) {
    const cantidadSalida = prompt('Ingrese la cantidad a retirar:');
    const cantidadNum = cantidadSalida ? parseInt(cantidadSalida, 10) : 0;

    if (!cantidadNum || cantidadNum <= 0) {
      alert('Cantidad inválida.');
      return;
    }

    if (cantidadNum > this.articulos[index].cantidad) {
      alert('No hay suficiente stock para retirar esa cantidad.');
      return;
    }

    this.articulos[index].cantidad -= cantidadNum;
    this.guardarLocalStorage();
  }

  estadoStock(articulo: ArticuloInventario): { texto: string; color: string } {
    if (articulo.cantidad <= 0) {
      return { texto: 'Agotado', color: 'red' };
    }
    if (articulo.cantidad <= articulo.stockMinimo) {
      return { texto: 'Crítico', color: 'red' };
    }
    if (articulo.cantidad <= articulo.stockMinimo * 2) {
      return { texto: 'Bajo Stock', color: 'orange' };
    }
    return { texto: 'En Stock', color: 'green' };
  }

  generarReporte() {
  if (this.articulos.length === 0) {
    alert('No hay datos para generar reporte.');
    return;
  }

  const encabezados = ['SKU', 'Artículo', 'Categoría', 'Cantidad', 'Proveedor', 'Stock Mínimo', 'Estado'];
  const filas = this.articulos.map(articulo => {
    const estado = this.estadoStock(articulo).texto;
    const categoriaTexto =
      articulo.categoria === 'accessories' ? 'Accesorios' :
      articulo.categoria === 'machines' ? 'Máquinas' :
      articulo.categoria === 'clothing' ? 'Indumentaria' :
      articulo.categoria === 'nutrition' ? 'Nutrición' : '';

    return [
      articulo.sku,
      articulo.nombre,
      categoriaTexto,
      articulo.cantidad.toString(),
      articulo.proveedor,
      articulo.stockMinimo.toString(),
      estado
    ].join(',');
  });

  const contenidoCSV = [encabezados.join(','), ...filas].join('\n');
  const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'reporte_inventario.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
}
