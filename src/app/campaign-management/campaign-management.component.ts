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
    title: '',
    status: 'ouvert',
    date_debut: '',
    date_fin: ''
  };
  right;
  rightState = {
    create: 0,
    delete: 0,
    read: 0,
    update: 0
  };
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private campagneService: CampaignService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetCampaign();
    this.getRight();
  }

  getRight() {
    this.right = JSON.parse(localStorage.getItem('right'));
    let createCounter = 0;
    let readCounter = 0;
    let updateCounter = 0;
    let deleteCounter = 0;
    this.right.forEach(element => {
      if (element.libelle === 'default') {
        if (element.create === 1) {
          createCounter += 1;
        }

        if (element.read === 1) {
          readCounter += 1;
        }

        if (element.update === 1) {
          updateCounter += 1;
        }

        if (element.delete === 1) {
          deleteCounter += 1;
        }
      }
    });

    console.log(createCounter);
    console.log(readCounter);


    if (createCounter >= 1) {
      this.rightState.create = 1;
    }
    if (readCounter >= 1) {
      this.rightState.read = 1;
    }
    if (updateCounter >= 1) {
      this.rightState.update = 1;
    }
    if (deleteCounter >= 1) {
      this.rightState.delete = 1;
    }

    console.log(this.rightState);

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
