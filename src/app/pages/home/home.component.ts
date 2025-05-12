import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

  products = [
    {
      name: 'Botella térmica Shufit',
      description: 'Acero inoxidable, mantiene tus bebidas frías o calientes.',
      price: 399,
      image: 'https://picsum.photos/id/1040/600/400'
    },
    {
      name: 'Set bandas de resistencia',
      description: 'Ideal para entrenamientos en casa o al aire libre.',
      price: 299,
      image: 'https://picsum.photos/id/1033/600/400'
    },
    {
      name: 'Proteína Vegana (1kg)',
      description: 'Fórmula limpia, alta en proteína y sin aditivos.',
      price: 899,
      image: 'https://picsum.photos/id/1025/600/400'
    },
    {
      name: 'Sudadera Shufit Pro',
      description: 'Diseño premium, comodidad para tus sesiones.',
      price: 749,
      image: 'https://picsum.photos/id/1016/600/400'
    }
  ];

  coaches = [
    {
      name: 'Camila Torres',
      specialty: 'Entrenadora Personal & Yoga',
      bio: 'Con más de 8 años de experiencia en fitness funcional y bienestar integral.',
      img: 'https://picsum.photos/id/1027/600/400',
      instagram: 'https://instagram.com/camila_fit',
      linkedin: 'https://linkedin.com/in/camilatorres',
      email: 'camila@shufit.com'
    },
    {
      name: 'Daniel Vega',
      specialty: 'Coach de Nutrición Deportiva',
      bio: 'Apasionado por ayudarte a alcanzar tu mejor versión desde la alimentación.',
      img: 'https://picsum.photos/id/1005/600/400',
      instagram: 'https://instagram.com/dani.vega',
      linkedin: '',
      email: 'daniel@shufit.com'
    },
    {
      name: 'Mariana López',
      specialty: 'Instructora HIIT & Cardio',
      bio: 'Energía, disciplina y constancia son su fórmula para transformar cuerpos.',
      img: 'https://picsum.photos/id/1001/600/400',
      instagram: '',
      linkedin: 'https://linkedin.com/in/marianalopez',
      email: 'mariana@shufit.com'
    }
  ];

  providers = [
    {
      name: 'FitGear Co.',
      category: 'Equipamiento deportivo',
      logo: 'https://picsum.photos/id/1041/200/100',
      website: 'https://fitgear.example.com'
    },
    {
      name: 'NutriMax Labs',
      category: 'Suplementos alimenticios',
      logo: 'https://picsum.photos/id/1022/200/100',
      website: 'https://nutrimax.example.com'
    },
    {
      name: 'ProActive Wear',
      category: 'Ropa fitness',
      logo: 'https://picsum.photos/id/1012/200/100',
      website: 'https://proactivewear.example.com'
    },
    {
      name: 'SmartFit Tech',
      category: 'Tecnología deportiva',
      logo: 'https://picsum.photos/id/100/200/100',
      website: 'https://smartfit.example.com'
    }
  ];

}
