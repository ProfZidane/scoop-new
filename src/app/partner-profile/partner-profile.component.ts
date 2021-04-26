import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import { PartnerService } from '../services/partner.service';
@Component({
  selector: 'app-partner-profile',
  templateUrl: './partner-profile.component.html',
  styleUrls: ['./partner-profile.component.css']
})
export class PartnerProfileComponent implements OnInit {
  userConnected: any;
  isLoading = {
    info : true,
    finance : true,
    product : false
  };

  error = {
    data : false,
    finance : false
  };
  dtTrigger: Subject<any> = new Subject<any>();
  id;
  partner = {
    info : []
  };
  solde = 0;
  finances;
  pieceJointe;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private partenerService: PartnerService, private route: ActivatedRoute) { }

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
    this.GetInfoPartner();
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

  GetInfoPartner() {
    this.error.data = false;
    this.partenerService.GetPartnersById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.partner.info = data.data;
        this.isLoading.info = false;
      }, (err) => {
        console.log(err);
        this.error.data = true;
      }
    );
  }

  GetFinances() {
    this.error.finance = false;
    this.partenerService.GetFinancementByTracker(this.id).subscribe(
      (data) => {
        console.log(data);
        this.finances = data.data;
        this.isLoading.finance = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.finance = false;
        this.error.finance = true;
      }
    );
  }

  OpenModelImage(piece_jointe) {
    console.log(piece_jointe);
    this.pieceJointe = piece_jointe;
  }

}
