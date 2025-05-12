import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './PrivateLayoutComponent.html'
})
export class PrivateLayoutComponent  {
  title = 'shufit';
}
