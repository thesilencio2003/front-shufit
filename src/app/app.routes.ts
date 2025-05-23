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
  ]
}

];
