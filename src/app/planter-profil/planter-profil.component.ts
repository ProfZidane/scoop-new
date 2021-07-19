import { Component, OnInit } from '@angular/core';
import { PlanterService } from '../services/planter.service';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
@Component({
  selector: 'app-planter-profil',
  templateUrl: './planter-profil.component.html',
  styleUrls: ['./planter-profil.component.css']
})
export class PlanterProfilComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();

  pieceJointe;
  isLoading = {
    info : true,
    finance : false,
    product : true
  };

  error = {
    data : false,
    product : false,
    finance: false
  };

  id;
  planterInfo;
  stockage;
  finances;
  prefinances;
  constructor(private planterService: PlanterService, private userService: AuthService, private location: Location,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.route.paramMap.subscribe(
      (params => {
        this.id = params.get('id');
      })
    );
    console.log(this.id);
    this.GetPlanterInfo();
    this.GetStock();
    this.GetFinances();
  }

  ComeBack() {
    this.location.back();
  }



  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  GetPlanterInfo() {
    this.planterService.GetInfoById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.planterInfo = data.data;
        this.isLoading.info = false;
      }, (err) => {
        console.log(err);
        this.isLoading.info = false;
      }
    );
  }

  GetStock() {
    this.isLoading.product = true;
    this.error.product = false;
    this.planterService.GetStockageById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.isLoading.product = false;
        this.stockage = data.data;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.product = false;
        this.error.product = true;
      }
    );
  }


  GetFinances() {
    this.isLoading.finance = true;
    this.error.finance = false;
    this.planterService.GetFinancingById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.isLoading.finance = false;
        this.finances = data.financements;
        this.prefinances = data.prefinancements;
        this.dtTrigger2.next();
      }, (err) => {
        console.log(err);
        this.error.finance = true;
        this.isLoading.finance = false;
      }
    );
  }

  // tslint:disable-next-line:typedef
  OpenModelImage(piece_jointe) {
    console.log(piece_jointe);
    this.pieceJointe = piece_jointe;
  }

}
