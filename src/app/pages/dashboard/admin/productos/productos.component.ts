import { Component } from '@angular/core';
import DashboardComponent from "../../dashboard.component";
import AdminComponent from '../admin.component';

@Component({
  selector: 'app-productos',
  imports: [AdminComponent, DashboardComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class ProductosComponent  {
 
}