import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Subject } from 'rxjs';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {
detailWarehouse;
id;
isLoading = {
  data : false,
  create: false
};

error = {
  create: false,
  text: ''
};
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
stateAdmin = false;
  stateDecharge = false;
  stateCreareCity = false;
  ville = {
    isLoading : false,
    city: ''
  };
  cities;
dtTrigger: Subject<any> = new Subject<any>();
  userConnected: any;
  constructor(private wareService: WarehouseService, private router: Router, private userService: AuthService,
              private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params => {
        this.id = params.get('id');
      })
    );
    console.log(this.id);
    this.DetailToWarehouse(this.id);
    this.userInfo.entrepot_id = this.id;
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
  }

  DetailToWarehouse(id) {
    console.log(id);
    this.isLoading.data = true;
    this.wareService.GetDetailToWarehouse(id).subscribe(
      (data) => {
        console.log(data);
        this.detailWarehouse = data;
        this.isLoading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
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

  CreateUser(event) {
    this.error.create = false;
    this.isLoading.create = true;
    console.log(this.userInfo);
    this.userService.Register(this.userInfo).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
            // redirection to page
        window.location.reload();
      }, (err) => {
        console.log(err);
        if (err.status === 422) {
          this.error.text = 'Adresse e-mail invalide ! Veuillez vérifiez votre adresse mail.';
        } else {
          this.error.text = 'Une erreur est survenue. Veuillez réessayez plus tard !';
        }
      }
    );
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

}
