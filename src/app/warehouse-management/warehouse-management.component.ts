import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Subject } from 'rxjs';
import { WarehouseService } from '../services/warehouse.service';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-warehouse-management',
  templateUrl: './warehouse-management.component.html',
  styleUrls: ['./warehouse-management.component.css']
})
export class WarehouseManagementComponent implements OnInit {
  wareHouses;
  dtTrigger: Subject<any> = new Subject<any>();
  wareHouseInfo = {
    name: '',
    region: 'Choisir une région...',
    departement: '',
    sous_prefecture: '',
    village : '',
    adresse : '',
    telephone : '',
    email : '',
    status : 'active'
  };
  wareHouseUpdating = {
    id : '',
    name: '',
    village : '',
    adresse : '',
    telephone : '',
    email : '',
    status : 'Choisir un status...',
    region: '',
    sous_prefecture: '',
    departement: ''
  };
  wareHouseDeleting = {
    id : '',
    motif : ''
  };
  wareHouseDetail;
  isLoading = {
    data : true,
    create : false,
    modify : false,
    inactive : false
  };
  error = {
    create_error : false,
    modify_error : false,
    inactive_error : false
  };
  userConnected: any;
  right;
  rightState = {
    create: 0,
    delete: 0,
    read: 0,
    update: 0
  };
  constructor(private router: Router, private wareService: WarehouseService, private userService: AuthService,
              private location: Location) { }

  ngOnInit(): void {
    this.GetWareHouses();
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.getRight();
  }

  getRight() {
    this.right = JSON.parse(localStorage.getItem('right'));
    let createCounter = 0;
    let readCounter = 0;
    let updateCounter = 0;
    let deleteCounter = 0;
    this.right.forEach(element => {
      if (element.libelle === 'administration' || element.libelle === 'manager') {
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

  Back() {
    this.router.navigateByUrl('/home');
  }

  GetWareHouses() {
    this.wareService.GetWarehouse().subscribe(
      (data) => {
        console.log(data);
        this.wareHouses = data.entrepots;
        this.dtTrigger.next();
        this.isLoading.data = false;
      }, (err) => {
        this.isLoading.data = false;
        console.log(err);
        if (err.error.message === 'Unauthenticated') {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/');
        }
      }
    );
  }


  CreateWarehouse(event) {
    this.isLoading.create = true;
    this.error.create_error = false;

    console.log(this.wareHouseInfo);
    this.wareService.SetWarehouse(this.wareHouseInfo).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
        window.location.reload();
        console.log('action finie');

      }, (err) => {
        console.log(err);
        setTimeout(() => {
          this.isLoading.create = false;
          this.error.create_error = true;
        }, 1000);
      }
    );
  }


  InactiveWare(event) {
    this.isLoading.inactive = true;
    this.error.inactive_error = false;
    console.log(this.wareHouseDeleting);
    this.wareService.DeleteWarehouse(this.wareHouseDeleting.id, { motif : this.wareHouseDeleting.motif }).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.inactive = false;
        window.location.reload();
        console.log('action finie');
      }, (err) => {
        console.log(err);
        setTimeout(() => {
          this.isLoading.inactive = false;
          this.error.inactive_error = true;
        }, 1000);
      }
    );
  }

  OpenModelUpdated(data) {
    console.log(data);
    this.wareHouseUpdating = data;
  }

  OpenModelDelete(id) {
    console.log(id);
    this.wareHouseDeleting.id = id;
  }


  UpdateWarehouse(event) {
    this.isLoading.modify = true;
    this.error.modify_error = false;
    console.log(this.wareHouseUpdating);
    this.wareService.UpdateWarehouse(this.wareHouseUpdating.id, this.wareHouseUpdating).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.modify = false;
        window.location.reload();
        console.log('action finie');
      }, (err) => {
        console.log(err);
        setTimeout(() => {
          this.isLoading.modify = false;
          this.error.modify_error = true;
        }, 1000);
      }
    );
  }



  DetailToWarehouse(id) {
    this.router.navigateByUrl('/home/(child1:ware-detail/' + id + ';open=true)');
      //'/ware-detail/' + id);
    /*
    console.log(id);
    this.wareService.GetDetailToWarehouse(id).subscribe(
      (data) => {
        console.log(data);
        this.wareHouseDetail = data;
      }, (err) => {
        console.log(err);
      }
    );*/
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }

  }

}
