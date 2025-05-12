import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent {

   ngAfterViewInit(): void {
    AOS.init({
      duration: 1000, 
      once: true      
    });
  }
}
