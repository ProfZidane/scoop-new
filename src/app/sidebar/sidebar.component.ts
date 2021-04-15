import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMenu() {
    this.router.navigateByUrl('/menu');
  }

  isSelected(id) {
    const parent = document.querySelectorAll('.menu-home-option');
    parent.forEach(element => {
      element.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
    if (id === "menu") {
      this.router.navigateByUrl("/home/(child1:menu;open=true)");
    } else if (id === "home") {
      this.router.navigateByUrl("/home)");
    }

  }


}
