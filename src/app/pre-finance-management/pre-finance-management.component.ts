import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pre-finance-management',
  templateUrl: './pre-finance-management.component.html',
  styleUrls: ['./pre-finance-management.component.css']
})
export class PreFinanceManagementComponent implements OnInit {
  isLoading = {
    data : true,
    create : false,
    modify: false,
    close: false
  };
  error = {
    data : false,
    create : false,
    modify: false,
    close: false
  };
  warning = {
    previsual: false,
    text : '',
    registerBtn : false
  };
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
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

}
