import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-management.component.html',
  styleUrls: ['./campaign-management.component.css']
})
export class CampaignManagementComponent implements OnInit {
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
    close: false,
    text: ''
  };
  warning = {
    previsual: false,
    text : '',
    registerBtn : false
  };
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  campaigns;
  campaignFictious;
  campaignDelete = {
    id : '',
    motif : ''
  };
  campaign = {
    status: 'ouvert',
    date_debut: '',
    date_fin: ''
  };
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private campagneService: CampaignService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetCampaign();
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }


  CreateCampaign(event) {
    this.isLoading.create = true;
    this.error.create = false;
    console.log(this.campaign);
    this.campagneService.SetCampagne(this.campaign).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.create = false;
        this.error.create = true;
        if (err.status === 408 || err.status === 403) {
          this.error.text = err.error.message;
        } else {
          this.error.text = 'Une erreur s\'est produite. Veuillez vérifiez les informations inscrites svp !';
        }
      }
    );

  }

  GetCampaign() {
    this.error.data = false;
    this.campagneService.GetCampaign().subscribe(
      (data) => {
        console.log(data);
        this.campaigns = data.data;
        this.isLoading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        if (err.status === 408 ) {

        }
      }
    );
  }

  OpenModalUpdate(object) {
    this.campaignFictious = object;
    console.log(this.campaignFictious);
  }

  UpdateCampaign(event) {
    this.isLoading.modify = true;
    this.error.modify = false;
    this.campagneService.UpdateCampaign(this.campaignFictious.id, this.campaignFictious).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.modify = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.modify = false;
        this.error.modify = true;
      }
    );
  }

  OpenModalDelete(id) {
    this.campaignDelete.id = id;
  }

  DeleteCampaign() {

  }


  GoToDetail(id) {
    this.router.navigateByUrl('/home/(child1:campaign-detail/' + id + ';open=true)');
  }



}
