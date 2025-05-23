import { Component} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CardBienvenidaComponent } from "./card-bienvenida/card-bienvenida.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterModule, CardBienvenidaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent  {
 
}
