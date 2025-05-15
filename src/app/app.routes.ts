import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout.component';
import { PrivateLayoutComponent } from './PrivateLayoutComponent';

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
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
      }
    ]
  }

];
