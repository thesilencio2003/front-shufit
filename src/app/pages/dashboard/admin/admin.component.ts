import { Component } from '@angular/core';
import DashboardComponent from "../dashboard.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [DashboardComponent,RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export default class AdminComponent {

}
