import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from './shared/header/header.component';
import FooterComponent from './shared/footer/footer.component';

@Component({
  selector: 'app-public',
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent {
  title = 'shufit';
}
