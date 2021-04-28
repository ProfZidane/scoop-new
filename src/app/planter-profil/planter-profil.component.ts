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
  pieceJointe;
  isLoading = {
    info : true,
    finance : true,
    product : false
  };

  error = {
    data : false,
    finance : false
  };
  id
  planterInfo;
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

}
