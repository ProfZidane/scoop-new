import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { ChargeService } from '../services/charge.service';
import { PartnerService } from '../services/partner.service';
import { WarehouseService } from '../services/warehouse.service';
@Component({
  selector: 'app-charge-management',
  templateUrl: './charge-management.component.html',
  styleUrls: ['./charge-management.component.css']
})
export class ChargeManagementComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  isLoading = {
    data : true,
    create : false,
    create2: false,
    change: false,
    close: false
  };
  error = {
    data : false,
    create : false,
    change: false,
    close: false,
    text: 'Une erreur s\'est produite. Veuillez réessayer plus tard svp !'
  };
  chargement = {};
  chargements;
  chargementFictious;
  chargementDelete = {
    id: '',
    motif: ''
  };
  destination = {
    id: '',
    content : {
      ville : '',
      partenaire_id: ''
    }
  };
  statePartner = false;

  partner = {
    type: 'personne morale',
    categorie: 'exportateur',
    code: '',
    status: 'active',
    name: '',
    description: ''
  };
  partners: any;
  wareHouses: any;
  sacs = 0;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private chargeService: ChargeService, private partenerService: PartnerService, private wareService: WarehouseService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.dtOptions = {
      ordering: false
    };
    this.GetChargement();
    this.GetPartner();
    this.GetWareHouses();
    this.GetStock();
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


  GetStock() {
    this.chargeService.GetPound().subscribe(
      (data) => {
        console.log(data);
        this.sacs = data.data.poids;
        this.sacs = this.sacs / 1000;
      }, (err) => {
        console.log(err);
      }
    );
  }

  GetPartner() {
    this.partenerService.GetPartners().subscribe(
      (data) => {
        console.log(data);
        this.partners = data.data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  GetWareHouses() {
    this.wareService.GetWarehouse().subscribe(
      (data) => {
        console.log(data);
        this.wareHouses = data.entrepots;
      }, (err) => {
        console.log(err);
        if (err.error.message === 'Unauthenticated') {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  GetChargement() {
    this.error.data = false;
    this.chargeService.GetChargements().subscribe(
      (data) => {
        console.log(data);
        this.chargements = data.data;
        console.log(this.chargement);

        this.isLoading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }




  OpenUpdate(id) {
    this.router.navigateByUrl('/home/(child1:charge-modify/' + id + ';open=true)');
  }

  OpenModalDelete(id) {
    this.chargementDelete.id = id;
  }

  OpenModalChange(id) {
    this.destination.id = id;
  }

  goToCreate() {
    this.router.navigateByUrl('/home/(child1:charge-insert;open=true)');
  }

  goToDetail(id) {
    this.router.navigateByUrl('/home/(child1:charge-detail/' + id + ';open=true)');
  }

  goToEntry() {
    this.router.navigateByUrl('/home/(child1:entry-stock;open=true)');
  }

  ChangeDestination(event) {
    this.isLoading.change = true;
    this.error.change = false;
    console.log(this.destination.content);
    const data = {
      ville_destination: this.destination.content.ville,
      partenaire_id: this.destination.content.partenaire_id
    };
    this.chargeService.ChangeDestination(this.destination.id, data).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.change = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.change = false;
        this.error.change = true;
      }
    );
  }

  OpenCreationPartner() {
    this.statePartner = true;
  }

  CloseCreationPartner() {
    this.statePartner = false;
  }

  CreatePartner() {
    console.log(this.partner);
    this.isLoading.create2 = true;
    this.partenerService.SetPartners(this.partner).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create2 = false;
        this.statePartner = false;
        this.GetPartner();
      }, (err) => {
        console.log(err);
        this.isLoading.create2 = false;
      }
    );
  }


  DeleteChargement(event) {
    this.isLoading.close = true;
    this.error.close = false;
    this.chargeService.DisableChargement(this.chargementDelete.id, { motif: this.chargementDelete.motif }).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.close = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.close = false;
        this.error.close = true;
        if (err.status === 408) {
          this.error.text = err.error.message;
        }
      }
    );
  }

}
