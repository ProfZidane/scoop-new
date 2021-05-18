import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { CompteService } from '../services/compte.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
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
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  account = {
    banque: '',
    compte_number: '',
    details: '',
    status : ''
  };
  accountFictious;
  accountDesactif = {
    id : '',
    motif : ''
  };
  accountList;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private accountService: CompteService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetAccounts();
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

  GetAccounts() {
    this.accountService.GetAccount().subscribe(
      (data) => {
        console.log(data);
        this.isLoading.data = false;
        this.accountList = data.data;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = false;
      }
    );
  }

  CreateAccount(event) {
    console.log(this.account);
    this.isLoading.create = true;
    this.error.data = false;
    this.accountService.SetAccount(this.account).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }

  OpenModalUpdate(object) {
    this.accountFictious = object;
  }

  UpdateAccount(event) {
    console.log(this.accountFictious);
    this.isLoading.modify = true;
    this.error.modify = false;
    this.accountService.UpdateAccount(this.accountFictious.id, this.accountFictious).subscribe(
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
    this.accountDesactif.id = id;
  }

  ClosedAccount(event) {
    console.log(this.accountDesactif);
    this.isLoading.close = true;
    this.error.close = false;
    this.accountService.DeleteAccount(this.accountDesactif.id, { motif: this.accountDesactif.motif }).subscribe(
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
