import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout.component';
import { PrivateLayoutComponent } from './PrivateLayoutComponent';
import { AuthGuard } from './auth.guard';
import { AdminLayoutComponent } from './adminlayout';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.default)
      },
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/auth/login/login.component')
      },
      {
        path: 'login/register',
        title: 'Register',
        loadComponent: () => import('./pages/auth/register/register.component')
      },
      {
        path: 'sobrenosotros',
        title: 'Sobre Nosotros',
        loadComponent: () => import('./pages/sobrenosotros/sobrenosotros.component')
      },
      {
        path: 'contacto',
        title: 'Contacto',
        loadComponent: () => import('./pages/contacto/contacto.component')
      },
      {
        path: 'terminos',
        title: 'Términos y Condiciones',
        loadComponent: () => import('./pages/terminos/terminos.component')
      },
      {
        path: 'politicas',
        title: 'Políticas',
        loadComponent: () => import('./pages/politicas/politicas.component')
      },
      {
        path: 'tienda',
        title: 'Tienda',
        loadComponent: () => import('./pages/tienda/tienda.component')
      },
      {
        path: 'recuperar',
        title: 'Recuperar',
        loadComponent: () => import('./pages/auth/recuperar/recuperar.component')
      },
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
      },
      {
        path: 'dashboard/perfil',
        title: 'Perfil',
        loadComponent: () => import('./pages/dashboard/perfil-usuario/perfil-usuario.component')
      },
      {
        path: 'dashboard/agendar',
        title: 'Agendar',
        loadComponent: () => import('./pages/dashboard/agendar-usuario/agendar-usuario.component')
      },
      {
        path: 'dashboard/pagos',
        title: 'Pagos',
        loadComponent: () => import('./pages/dashboard/pagos/pagos.component')
      },
      {
        path: 'dashboard/rutinas',
        title: 'Rutinas',
        loadComponent: () => import('./pages/dashboard/rutina/rutina.component')
      },
      {
        path: 'dashboard/alimentacion',
        title: 'Alimentación',
        loadComponent: () => import('./pages/dashboard/alimentacion/alimentacion.component')
      },

      {
        path: 'dashboard/entrenadores',
        title: 'Entrenadores',
        loadComponent: () => import('./pages/dashboard/entrenador/entrenador.component')
      },
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        title: 'Dashboard Admin',
        loadComponent: () => import('./pages/dashboard/admin/admin.component')
      },
      {
        path: 'productos',
        title: 'Productos',
        loadComponent: () => import('./pages/dashboard/admin/productos/productos.component')
      },
      {
        path: 'clientes',
        title: 'Clientes',
        loadComponent: () => import('./pages/dashboard/admin/clientes/clientes.component')
      },
      {
        path: 'entrenadores',
        title: 'Entrenadores',
        loadComponent: () => import('./pages/dashboard/admin/entrenadores/entrenadores.component')
      },
      {
        path: 'perfiluser',
        title: 'Perfil de usuario',
        loadComponent: () => import('./pages/dashboard/admin/perfiluser/perfiluser.component')
      },
      {
        path: 'roles',
        title: 'Roles',
        loadComponent: () => import('./pages/dashboard/admin/roles/roles.component')
      },
      {
        path: 'autenticacion',
        title: 'Autenticación',
        loadComponent: () => import('./pages/dashboard/admin/autenticacion/autenticacion.component')
      },
      {
        path: 'carrito',
        title: 'Carrito',
        loadComponent: () => import('./pages/dashboard/admin/carrito/carrito.component')
      },
      {
        path: 'bodega',
        title: 'Bodega',
        loadComponent: () => import('./pages/dashboard/admin/bodega/bodega.component')
      },
      {
        path: 'inventario',
        title: 'Inventario',
        loadComponent: () => import('./pages/dashboard/admin/inventario/inventario.component')
      },
      {
        path: 'gestionequipo',
        title: 'Gestión de equipo',
        loadComponent: () => import('./pages/dashboard/admin/gestionequipo/gestionequipo.component')
      },
      {
        path: 'rutinas',
        title: 'Rutinas',
        loadComponent: () => import('./pages/dashboard/admin/rutinas/rutinas.component')
      },
      {
        path: 'agendar',
        title: 'Agendar',
        loadComponent: () => import('./pages/dashboard/admin/agendar/agendar.component')
      },
      {
        path: 'informes',
        title: 'Informes',
        loadComponent: () => import('./pages/dashboard/admin/informes/informes.component')
      },
      {
        path: 'pqrsd',
        title: 'PQRSD',
        loadComponent: () => import('./pages/dashboard/admin/pqrsd/pqrsd.component') 
      },
      {
        path: 'configuracion',
        title: 'Configuración',
        loadComponent: () => import('./pages/dashboard/admin/configuracion/configuracion.component')
      },
      {
        path: 'contactenos',
        title: 'Contactenos',
        loadComponent: () => import('./pages/dashboard/admin/contactenos/contactenos.component')
        
      },
      {
        path: 'seguridad',
        title: 'Seguridad',
        loadComponent: () => import('./pages/dashboard/admin/seguridad/seguridad.component')
        },
        {
          path: 'terminos',
          title: 'Terminos',
          loadComponent: () => import('./pages/dashboard/admin/terminos/terminos.component')
        },
        {
           path: 'auditoria',
           title: 'Auditoria',
           loadComponent: () => import('./pages/dashboard/admin/auditoria/auditoria.component')
        }

    ]
  }

];
