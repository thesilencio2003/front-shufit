import { Component } from '@angular/core';
import AdminComponent from "../admin.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Version {
  version: string;
  date: string;
  changes: string;
}

@Component({
  selector: 'app-terminos',
  imports: [AdminComponent,CommonModule, FormsModule],
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.css'
})
export default class TerminosComponent {
gimnasioNombre = 'FitGym';  // Cambia según tu gym/plataforma
  pais = 'Colombia';
  ciudad = 'Cali';
  correoContacto = 'contacto@fitgym.com';
  telefonoContacto = '+57 300 123 4567';

  versiones: Version[] = [
    {
      version: '1.2',
      date: '2025-05-23',
      changes: 'Se añadió sección de "Propiedad Intelectual".'
    },
    {
      version: '1.1',
      date: '2024-11-10',
      changes: 'Se actualizaron las políticas de cancelación de membresías.'
    },
    {
      version: '1.0',
      date: '2023-01-01',
      changes: 'Versión inicial de los Términos y Condiciones.'
    }
  ];

  aceptar() {
    alert('Gracias por aceptar los Términos y Condiciones.');
    // Aquí puedes redirigir o guardar el consentimiento
  }

  cancelar() {
    alert('Has cancelado la aceptación. No podrás continuar.');
    // Aquí puedes manejar la lógica para cancelar, redirigir, etc.
  }

  verVersion(version: Version) {
    alert(`Versión ${version.version}\nFecha: ${version.date}\nCambios:\n${version.changes}`);
    // O abrir un modal con más detalles
  }

  exportarVersionActual() {
    const texto = `Términos y Condiciones - Versión Actual\n\nÚltima actualización: 23 de Mayo de 2025\n\n` +
      `Por favor, consulte la versión completa en la plataforma.`;
    const blob = new Blob([texto], { type: 'text/plain' });
    const url= window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Terminos_y_Condiciones_FitGym.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
