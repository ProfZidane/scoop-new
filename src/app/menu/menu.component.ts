import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  manageUser() {
    this.router.navigateByUrl("/home/(child1:user-manage;open=true)");
  }

  manageWarehouse() {
    this.router.navigateByUrl("/home/(child1:ware-manage;open=true)");
  }

}
