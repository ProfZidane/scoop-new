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
    status: 'active',
    code: ''
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
  stateCode = false;
  right;
  rightState = {
    create: 0,
    delete: 0,
    read: 0,
    update: 0
  };
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private partenerService: PartnerService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetPartner();
    this.getRight();
  }

  getRight() {
    this.right = JSON.parse(localStorage.getItem('right'));
    let createCounter = 0;
    let readCounter = 0;
    let updateCounter = 0;
    let deleteCounter = 0;
    this.right.forEach(element => {
      if (element.libelle === 'finances' || element.libelle === 'manager') {
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
    console.log(id);

    this.router.navigateByUrl('/home/(child1:partner-profile/' + id + ');open=true');
  }

  goToMyProfile(id) {
    console.log(id);

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

  OnTyped(event) {
    console.log(event.target.value);
    const value = event.target.value;
    if (value === 'exportateur') {
      this.stateCode = true;
    } else {
      this.stateCode = false;
    }
  }

  create() {
    this.partners.type = 'personne morale';
    this.partners.status = 'active';
  }
}
