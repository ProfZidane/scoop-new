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
right;
state = false;
  constructor(private userService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.GetUsers();
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    if (localStorage.getItem('right') !== null) {
      this.right = JSON.parse(localStorage.getItem('right'));
      this.right.forEach(element => {
        if (element.libelle === 'administration') {
          this.state = true;
        } else {
          this.state = false;
        }
      });
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
