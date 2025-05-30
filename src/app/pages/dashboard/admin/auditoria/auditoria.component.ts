import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


interface AuditRecord {
  id: string;
  date: string;
  user: string;
  action: string;
  module: string;
  details: string;
  ip: string;
}

@Component({
  selector: 'app-auditoria',
  imports: [AdminComponent,CommonModule, FormsModule],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css'
})
export default class AuditoriaComponent {
 filter = {
    user: '',
    action: '',
    module: '',
    startDate: '',
    endDate: ''
  };

  auditData: AuditRecord[] = [
    {
      id: 'AUD-001',
      date: '2025-05-23T23:30:00',
      user: 'Admin Principal',
      action: 'Actualizar',
      module: 'Equipo',
      details: "Equipo 'Cinta de Correr' estado de 'Mantenimiento' a 'Disponible'",
      ip: '192.168.1.105'
    },
    {
      id: 'AUD-002',
      date: '2025-05-23T22:45:20',
      user: 'Juan Pérez',
      action: 'Crear',
      module: 'Citas',
      details: "Agendó cita para 'Entrenamiento Personal' con 'Sofía Rodríguez' el 2025-05-28",
      ip: '181.100.20.30'
    },
    {
      id: 'AUD-003',
      date: '2025-05-23T21:15:05',
      user: 'Sistema Automático',
      action: 'Leer',
      module: 'Inventario',
      details: "Consulta de stock para 'Proteína Whey' (alerta de bajo stock)",
      ip: 'N/A'
    },
    {
      id: 'AUD-004',
      date: '2025-05-22T08:00:00',
      user: 'María García',
      action: 'Inicio de Sesión',
      module: 'Autenticación',
      details: 'Inicio de sesión exitoso',
      ip: '45.23.12.56'
    },
    {
      id: 'AUD-005',
      date: '2025-05-21T14:00:00',
      user: 'Admin Principal',
      action: 'Cambio de Configuración',
      module: 'Configuración',
      details: "Política de contraseñas cambiada de 'Media' a 'Fuerte'",
      ip: '192.168.1.105'
    }
  ];

  filteredData: AuditRecord[] = [...this.auditData];

  aplicarFiltros(form: NgForm) {
    if (form.invalid) {
      alert('Por favor corrige los filtros antes de aplicar.');
      return;
    }

    this.filteredData = this.auditData.filter((record) => {
      const matchesUser =
        !this.filter.user ||
        record.user.toLowerCase().includes(this.filter.user.toLowerCase());

      const matchesAction =
        !this.filter.action || record.action === this.getActionLabel(this.filter.action);

      const matchesModule =
        !this.filter.module || record.module.toLowerCase() === this.filter.module.toLowerCase();

      const recordDate = new Date(record.date);
      const startDate = this.filter.startDate ? new Date(this.filter.startDate) : null;
      const endDate = this.filter.endDate ? new Date(this.filter.endDate) : null;

      const matchesStartDate = startDate ? recordDate >= startDate : true;
      const matchesEndDate = endDate ? recordDate <= endDate : true;

      return matchesUser && matchesAction && matchesModule && matchesStartDate && matchesEndDate;
    });
  }

  limpiarFiltros(form: NgForm) {
    form.resetForm();
    this.filteredData = [...this.auditData];
  }

  getActionLabel(value: string): string {
    const map: { [key: string]: string } = {
      create: 'Crear',
      read: 'Leer',
      update: 'Actualizar',
      delete: 'Eliminar',
      login: 'Inicio de Sesión',
      logout: 'Cierre de Sesión',
      'config-change': 'Cambio de Configuración',
      'permission-change': 'Cambio de Permisos'
    };
    return map[value] || '';
  }

  exportarCSV() {
    const header = ['ID Evento', 'Fecha y Hora', 'Usuario', 'Acción', 'Módulo Afectado', 'Detalles del Cambio', 'IP Origen'];
    const rows = this.filteredData.map(rec => [
      rec.id,
      rec.date,
      rec.user,
      rec.action,
      rec.module,
      rec.details,
      rec.ip
    ]);

    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registro_auditoria.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  limpiarRegistrosAntiguos() {
    if (confirm('¿Seguro que quieres eliminar los registros antiguos? Esta acción no se puede deshacer.')) {
      // Simula eliminar registros previos a cierta fecha (por ejemplo 2025-05-22)
      const cutoffDate = new Date('2025-05-22T00:00:00');
      this.auditData = this.auditData.filter(rec => new Date(rec.date) >= cutoffDate);
      this.filteredData = [...this.auditData];
      alert('Registros antiguos eliminados.');
    }
  }
}
