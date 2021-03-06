import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  userInfo = {
    name : '',
    email : '',
    telephone : '',
    adresse : '',
    photo : null,
    role : '',
    is_super_admin: false,
    status : '',
    entrepot_id : '',
    fonction : '',
    ville_service: ''
  };
  userUpdating = {
    id : '',
    name : '',
    email : '',
    telephone : '',
    adresse : '',
    photo : null,
    role : '',
    status : '',
    entrepot_id : '',
    fonction : ''
  };
  userDeleting = {
    id : '',
    motif : ''
  };
  entrepots;
  error = {
    email_error : false,
    create_error : false,
    modify_error : false,
    inactive_error : false
  };
  isLoading = {
    data : true,
    create : false,
    modify : false,
    inactive : false
  };
  stateAdmin = false;
  stateDecharge = false;
  stateCreareCity = false;
  success;
  successRequest = false;
  dtTrigger: Subject<any> = new Subject<any>();
  users;
  userConnected: any;
  ville = {
    isLoading : false,
    city: ''
  };
  cities;
  constructor(private router: Router, private wareService: WarehouseService, private userService: AuthService,
              private location: Location) { }

  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = {
      select: true
    };
    this.wareService.GetWarehouse().subscribe(
      (data) => {
        this.entrepots = data.entrepots;
        console.log(this.entrepots);

      }, (err) => {
        console.log(err);
      }
    );
    this.GetUsers();
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetCity();
  }

  Back() {
    this.router.navigateByUrl('/home');
  }

  GoToProfil() {
    this.router.navigateByUrl('/home/(child1:profil-manage;open=true)');
  }

  GetUsers() {
    this.userService.GetAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.users = data.data;
        console.log(this.users);
        this.isLoading.data = false;
        this.dtTrigger.next();

      }, (err) => {
        console.log(err);
      }
    );
  }

  CreateUser(event) {
    this.error.create_error = false;
    this.error.email_error = false;
    this.isLoading.create = true;
    console.log(this.userInfo);
    this.userService.Register(this.userInfo).subscribe(
      (success) => {
        console.log(success);
        this.successRequest = true;
        this.isLoading.create = false;
            // redirection to page
        window.location.reload();
      }, (err) => {
        console.log(err);
        if (err.status === 422) {
          this.error.email_error = true;
        } else {
          this.error.create_error = true;
        }
      }
    );
  }

  OpenModalUpdating(data) {
    console.log(data);
    this.userUpdating = data;
    console.log(this.userUpdating);
  }

  OpenModalDeleting(id) {
    console.log(id);
    this.userDeleting.id = id;
  }

  OnRole(event) {
    console.log(event.target.value);
    if (event.target.value === 'manager') {
      this.stateAdmin = true;
      this.stateDecharge = false;
      this.userInfo.ville_service = '';
    } else if (event.target.value === 'agent_externe') {
      this.stateDecharge = true;
      this.stateAdmin = false;
      this.userInfo.ville_service = '';
    } else {
      this.stateAdmin = false;
      this.stateDecharge = false;
      this.userInfo.ville_service = '';
    }
  }

  OnChoiceRadio(event) {
    console.log(event.target.value);
    if (event.target.value === 'oui') {
      this.userInfo.is_super_admin = true;
    } else {
      this.userInfo.is_super_admin = false;
    }
  }

  OnChangeCity(event) {
    console.log(event.target.value);
    this.userInfo.ville_service = event.target.value;
    console.log(this.userInfo);

  }

  CreateCity() {
    this.stateCreareCity = true;
  }

  closeCreate() {
    this.stateCreareCity = false;
    this.ville.isLoading = false;
  }

  GetCity() {
    this.userService.GetParametre().subscribe(
      (data) => {
        console.log(data);
        this.cities = data.data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  SaveCity() {
    console.log(this.ville);
    this.ville.isLoading = true;
    const data = {
      name: this.ville.city
    };
    console.log(data);

    this.userService.SetParametre(data).subscribe(
      (success) => {
        console.log(success);
        this.ville.isLoading = false;
        this.GetCity();
      }, (err) => {
        console.log(err);
        this.ville.isLoading = false;
      }
    );

  }
  UpdatingUser(event) {
    this.error.modify_error = false;
    this.error.email_error = false;
    this.isLoading.modify = true;
    console.log(this.userUpdating);
    this.userService.UpdateUser(this.userUpdating.id, this.userUpdating).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.modify = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.error.modify_error = true;
        this.isLoading.modify = false;
      }
    );
  }



  DeletingUser(event) {
    this.error.inactive_error = false;
    this.error.email_error = false;
    this.isLoading.inactive = true;
    console.log(this.userDeleting);
    this.userService.DeleteUser(this.userDeleting.id, { motif: this.userDeleting.motif }).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.inactive = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.error.inactive_error = true;
        this.isLoading.inactive = false;
      }
    );
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }

  }


  AssignRight(id) {
    console.log(id);
    this.router.navigateByUrl('/home/(child1:user-right/' + id + ';open=true)');
  }

}
