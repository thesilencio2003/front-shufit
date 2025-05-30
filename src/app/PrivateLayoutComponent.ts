import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-private',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './PrivateLayoutComponent.html'
})
export class PrivateLayoutComponent  {
  title = 'shufit';
}
