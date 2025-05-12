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
        loadComponent: () => import('./pages/auth/login/login.component').then(m => m.default)
      },
      {
        path: 'sobrenosotros',
        title: 'Sobre Nosotros',
        loadComponent: () => import('./pages/sobrenosotros/sobrenosotros.component').then(m => m.default)
      },
      {
        path: 'contacto',
        title: 'Contacto',
        loadComponent: () => import('./pages/contacto/contacto.component').then(m => m.default)
      },
      {
        path: 'terminos',
        title: 'Términos y Condiciones',
        loadComponent: () => import('./pages/terminos/terminos.component').then(m => m.default)
      },
      {
        path: 'politicas',
        title: 'Políticas',
        loadComponent: () => import('./pages/politicas/politicas.component').then(m => m.default)
      },
      {
        path: 'tienda',
        title: 'Tienda',
        loadComponent: () => import('./pages/tienda/tienda.component').then(m => m.default)
      }
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
