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
    finance : true,
    product : true
  };

  error = {
    data : false
  };
  dtTrigger: Subject<any> = new Subject<any>();
  id;
  infos = {
    basic : {}
  };
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
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
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

}
