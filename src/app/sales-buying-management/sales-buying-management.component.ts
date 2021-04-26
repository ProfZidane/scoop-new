import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-sales-buying-management',
  templateUrl: './sales-buying-management.component.html',
  styleUrls: ['./sales-buying-management.component.css']
})
export class SalesBuyingManagementComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = {
    data: true
  };
  error = {
    data: false
  };
  infos;
  constructor(private router: Router, private userService: AuthService, private location: Location, private salesService: SalesService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }

    this.GetWeightingInfo();

    setTimeout( () => {
      this.isLoading.data = false;
    }, 1000);
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  goToDetail(id) {
    this.router.navigateByUrl('/home/(child1:sales-detail/' + id + ';open=true)');
  }

  goToHistory() {
    this.router.navigateByUrl('/home/(child1:sales-history;open=true)');
  }

  GetWeightingInfo() {
    this.error.data = false;
    this.salesService.GetInfoWeighing().subscribe(
      (data) => {
        console.log(data);
        this.isLoading.data = false;
        this.infos = data.data;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }

}
