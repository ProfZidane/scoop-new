import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userConnected: any;

  constructor(private router: Router, private userService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
  }

  manageUser() {
    this.router.navigateByUrl("/home/(child1:user-manage;open=true)");
  }

  manageWarehouse() {
    this.router.navigateByUrl("/home/(child1:ware-manage;open=true)");
  }

  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }

  }

}
