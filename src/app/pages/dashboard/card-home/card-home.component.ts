import { Component } from '@angular/core';
import DashboardComponent from "../dashboard.component";
import { CardBienvenidaComponent } from "../card-bienvenida/card-bienvenida.component";

@Component({
  selector: 'app-card-home',
  imports: [DashboardComponent, CardBienvenidaComponent],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css'
})
export class CardHomeComponent {

}
