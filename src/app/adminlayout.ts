import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet],
  templateUrl: './adminlayout.html'
})
export class AdminLayoutComponent {
  title = 'shufit';
}
