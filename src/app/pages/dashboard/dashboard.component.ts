import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
 @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('toggleSidebar') toggleSidebarBtn!: ElementRef;
  isSidebarCollapsed: boolean = false; 

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.toggleSidebarBtn.nativeElement.addEventListener('click', () => {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      if (this.isSidebarCollapsed) {
        this.renderer.addClass(this.sidebar.nativeElement, 'sidebar-collapsed');
      } else {
        this.renderer.removeClass(this.sidebar.nativeElement, 'sidebar-collapsed');
      }
    });
  }
}
