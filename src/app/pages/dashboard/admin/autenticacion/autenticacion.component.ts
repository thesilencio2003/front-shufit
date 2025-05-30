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

interface SesionActiva {
  usuario: string;
  dispositivo: string;
  ultimoAcceso: string;
  ubicacion: string;
}

@Component({
  selector: 'app-autenticacion',
  imports: [AdminComponent, FormsModule,CommonModule],
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})
export default class AutenticacionComponent implements OnInit {
[x: string]: any;
 nombreOcorreo: string = '';
  contrasena: string = '';

  sesiones: SesionActiva[] = [];

  ngOnInit(): void {
    const sesionesGuardadas = localStorage.getItem('sesiones');
    if (sesionesGuardadas) {
      this.sesiones = JSON.parse(sesionesGuardadas);
    }
  }

  iniciarSesion(): void {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (!usuariosGuardados) {
      alert('No hay usuarios registrados.');
      return;
    }

    const usuarios: Usuario[] = JSON.parse(usuariosGuardados);
    const usuario = usuarios.find(u =>
      (u.nombre === this.nombreOcorreo || u.correo === this.nombreOcorreo) &&
      u.contrasena === this.contrasena
    );

    if (usuario) {
      const nuevaSesion: SesionActiva = {
        usuario: usuario.nombre,
        dispositivo: this.obtenerDispositivo(),
        ultimoAcceso: new Date().toLocaleString(),
        ubicacion: 'Ubicación simulada' // Aquí puedes integrar IP/Geo si lo deseas
      };

      this.sesiones.push(nuevaSesion);
      localStorage.setItem('sesiones', JSON.stringify(this.sesiones));
      alert(`¡Bienvenido ${usuario.nombre}!`);
      this.nombreOcorreo = '';
      this.contrasena = '';
    } else {
      alert('Credenciales incorrectas.');
    }
  }

  cerrarSesion(index: number): void {
    this.sesiones.splice(index, 1);
    localStorage.setItem('sesiones', JSON.stringify(this.sesiones));
  }

  obtenerDispositivo(): string {
    const ua = navigator.userAgent;
    if (/windows/i.test(ua)) return 'Chrome en Windows';
    if (/android/i.test(ua)) return 'Chrome en Android';
    if (/iphone|ipad/i.test(ua)) return 'Safari en iOS';
    return 'Navegador desconocido';
  }
}
