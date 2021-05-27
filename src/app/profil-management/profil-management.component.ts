import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil-management',
  templateUrl: './profil-management.component.html',
  styleUrls: ['./profil-management.component.css']
})
export class ProfilManagementComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = {
    data : true,
    create : false,
    modify: false,
    close: false,
    simulate: false
  };
  error = {
    data : false,
    create : false,
    modify: false,
    close: false
  };

  state = {
    modify: false,
    delete: false
  };

  constructor(private router: Router, private userService: AuthService, private location: Location) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  goToSupport() {
    this.router.navigateByUrl('/home/(child1:support-manage;open=true)');
  }

  Modify() {
    if (this.state.modify === false) {
      this.state.modify = true;
    } else {
      this.state.modify = false;
    }
  }

  deleteHistory() {
    this.state.delete = true;
    localStorage.setItem('favoris', JSON.stringify([]));
    setTimeout( () => {
       this.state.delete = false;
    }, 3000);
  }

}
