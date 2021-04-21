import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { PartnerService } from '../services/partner.service';

@Component({
  selector: 'app-partner-management',
  templateUrl: './partner-management.component.html',
  styleUrls: ['./partner-management.component.css']
})
export class PartnerManagementComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  partners = {
    type: '',
    name: '',
    description: '',
    categorie: '',
    status: 'active'
  };
  partnersFictious;
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
  partnersData;
  partnerDesactif = {
    id : '',
    motif : ''
  };
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private partenerService: PartnerService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetPartner();
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  GetPartner() {
    this.error.data = false;
    this.partenerService.GetPartners().subscribe(
      (data) => {
        console.log(data);
        this.partners = data;
        this.isLoading.data = false;
        this.dtTrigger.next();
        this.partnersData = data.data;
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.isLoading.data = true;
      }
    );
  }

  CreatePartner(event) {
    this.error.create = false;
    this.isLoading.create = true;
    console.log(this.partners);

    this.partenerService.SetPartners(this.partners).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.create = false;
        this.error.create = true;
      }
    );
  }

  OpenModalUpdate(object) {
    this.partnersFictious = object;
  }


  UpdatePartner(event) {
    this.isLoading.modify = true;
    this.error.modify = false;
    console.log(this.partnersFictious);

    this.partenerService.UpdatePartners(this.partnersFictious.id, this.partnersFictious).subscribe(
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

  goToProfile(id) {
    this.router.navigateByUrl('/home/(child1:partner-profile/' + id + ')');
  }

  OpenModelDelete(id) {
    this.partnerDesactif.id = id;
  }

  ClosedPartner(event) {
    this.isLoading.close = true;
    this.error.close = false;
    console.log(this.partnerDesactif);

    this.partenerService.DeletePartners(this.partnerDesactif.id, { motif: this.partnerDesactif.motif }).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.close = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.close = false;
        this.error.close = true;
      }
    );
  }

}
