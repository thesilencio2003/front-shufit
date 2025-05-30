import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Informe {
  nombre: string;
  tipo: string;
  rango: string;
  autor: string;
  fecha: string;
  contenido: string;
  formato: 'pdf' | 'csv';
}

@Component({
  selector: 'app-informes',
  imports: [AdminComponent,FormsModule,CommonModule],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.css'
})
export default class InformesComponent {
 reporte = {
    tipo: '',
    inicio: '',
    fin: '',
    filtro: ''
  };

  // Lista de informes generados
  informesGenerados: Informe[] = [
    {
      nombre: 'Informe Clientes Mayo 2025',
      tipo: 'Clientes Registrados',
      rango: '01/05/2025 - 22/05/2025',
      autor: 'Admin Principal',
      fecha: '2025-05-22',
      contenido: 'Lista completa de clientes registrados durante mayo.',
      formato: 'pdf'
    },
    {
      nombre: 'Inventario Actual - Q2',
      tipo: 'Inventario Actual',
      rango: 'N/A',
      autor: 'Admin Inventario',
      fecha: '2025-05-21',
      contenido: 'Resumen completo del inventario en el segundo trimestre.',
      formato: 'csv'
    }
  ];

  // Ver contenido del informe (simulado con alert)
  verInforme(reporte: Informe): void {
    const contenido = `
📄 Informe: ${reporte.nombre}
📂 Tipo: ${reporte.tipo}
📅 Rango: ${reporte.rango}
👤 Autor: ${reporte.autor}
🕓 Fecha: ${reporte.fecha}

📝 Contenido:
${reporte.contenido}
    `;
    alert(contenido);
  }

  // Descargar informe (genera archivo PDF o CSV simulado)
  descargarInforme(informe: Informe): void {
    const blob = new Blob([informe.contenido], {
      type: informe.formato === 'pdf' ? 'application/pdf' : 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${informe.nombre.replace(/\s+/g, '_')}.${informe.formato}`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Limpiar los filtros del formulario
  limpiarFiltros(): void {
    this.reporte = {
      tipo: '',
      inicio: '',
      fin: '',
      filtro: ''
    };
  }

  // Simular navegación al historial completo
  verHistorial(): void {
    alert('Navegar a historial completo de informes.');
  }

  // Obtener el nombre legible del tipo
  obtenerNombreTipo(valor: string): string {
    switch (valor) {
      case 'clients': return 'Clientes Registrados';
      case 'trainers': return 'Rendimiento de Entrenadores';
      case 'equipment': return 'Estado del Equipo';
      case 'inventory': return 'Inventario Actual';
      case 'appointments': return 'Citas Agendadas';
      case 'sales': return 'Ventas y Carrito';
      case 'activity-log': return 'Registro de Actividad';
      default: return 'Desconocido';
    }
  }
}