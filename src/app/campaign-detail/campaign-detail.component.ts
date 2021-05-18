import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import { CampaignService } from '../services/campaign.service';
@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
  userConnected: any;
  isLoading = {
    info : true,
    prefinance: true,
    finance : false,
    product : false
  };

  error = {
    data : false,
    prefinance: false,
    finance: false,
  };
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  id;
  infos = {
    basic : {}
  };
  prefinances;
  finances;
  pieceJointe;
  constructor(private router: Router, private userService: AuthService, private location: Location, private route: ActivatedRoute,
              private campainService: CampaignService) { }

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
    this.GetInfoCampaign();
    this.GetPrefinancements();
    this.GetFinancements();
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  GoToProfil() {
    this.router.navigateByUrl('/home/(child1:profil-manage;open=true)');
  }

  GetInfoCampaign() {
    this.error.data = false;
    this.campainService.GetCampaignById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.infos.basic = data.data;
        this.isLoading.info = false;
      }, (err) => {
        console.log(err);
        this.isLoading.info = false;
        this.error.data = true;
      }
    );
  }

  GetPrefinancements() {
    console.log('prefinancement');
    this.error.prefinance = false;
    this.campainService.GetPrefinancementByCampaign(this.id).subscribe(
      (data) => {
        console.log(data);
        this.prefinances = data.data;
        this.isLoading.prefinance = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.prefinance = false;
        this.error.prefinance = true;
      }
    );
  }

  GetFinancements() {
    console.log('financement');
    this.isLoading.finance = true;
    this.error.finance = false;
    this.campainService.GetFinancementByCampaign(this.id).subscribe(
      (data) => {
        console.log(data);
        this.finances = data.data;
        this.isLoading.finance = false;
        this.dtTrigger2.next();
      }, (err) => {
        console.log(err);
        this.isLoading.finance = false;
        this.error.finance = true;
      }
    );
  }

  OpenModalImage(piece_jointe) {
    console.log(piece_jointe);
    this.pieceJointe = piece_jointe;
  }



}
