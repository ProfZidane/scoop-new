import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
users;
loading = true;
userConnected;
  constructor(private userService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.GetUsers();
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
  }

  GetUsers() {
    this.userService.GetAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.users = data.data.slice(0, 6);
        this.loading = false;
      }, (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  GoToUserManagement() {
    this.router.navigateByUrl('/home/(child1:user-manage;open=true)');
  }

  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }

  }

}
