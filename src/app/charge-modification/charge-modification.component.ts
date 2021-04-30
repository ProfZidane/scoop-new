import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { ChargeService } from '../services/charge.service';
import { PartnerService } from '../services/partner.service';
import { WarehouseService } from '../services/warehouse.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charge-modification',
  templateUrl: './charge-modification.component.html',
  styleUrls: ['./charge-modification.component.css']
})
export class ChargeModificationComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  isLoading = {
    data : true,
    modify : false,
    create2: false,
    change: false,
    close: false
  };
  error = {
    data : false,
    modify : false,
    change: false,
    close: false,
    text: ''
  };
  success = {
    modify: false
  };
  state = {
    partner: false,
    partnerSuccess: false,
    warehouse: false,
    warehousSuccess: false
  };
  partner = {
    type: 'personne morale',
    categorie: 'exportateur',
    code: '',
    status: 'active',
    name: '',
    description: ''
  };
  warehouse = {
    region: 'Choisir une région...',
    departement: '',
    sous_prefecture: '',
    village: '',
    adresse: '',
    telephone: '',
    status: 'active',
    email: ''
  };
  partners: any;
  wareHouses: any;
  id;
  chargementFictious;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private chargeService: ChargeService, private partenerService: PartnerService, private wareService: WarehouseService,
              private route: ActivatedRoute) { }

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
    this.GetById();
    this.GetWareHouses();
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

  GetById() {
    this.error.data = false;
    this.chargeService.GetChargementById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.chargementFictious = data.data;
        this.isLoading.data = true;
      }, (err) => {
        console.log(err);
        this.isLoading.data = true;
        this.error.data = false;
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

  CreatePartner(event) {
    console.log(this.partner);
    this.isLoading.create2 = true;
    this.state.partnerSuccess = false;
    this.partenerService.SetPartners(this.partner).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create2 = false;
        this.state.partner = false;
        this.state.partnerSuccess = true;
        this.GetPartner();
      }, (err) => {
        console.log(err);
        this.isLoading.create2 = false;
      }
    );
  }

  CreateWarehouse(event) {
    this.state.warehouse = true;
    console.log(this.warehouse);
    this.wareService.SetWarehouse(this.warehouse).subscribe(
      (success) => {
        console.log(success);
        this.state.warehouse = false;
        this.state.warehousSuccess = true;
        this.GetWareHouses();
        console.log('action finie');
      }, (err) => {
        console.log(err);
        this.state.warehouse = false;
      }
    );
  }

  UpdateChargement() {
    this.isLoading.modify = true;
    this.error.modify = false;
    this.success.modify = false;
    this.error.text = '';
    console.log(this.chargementFictious);
    this.chargeService.UpdateChargement(this.id, this.chargementFictious).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.modify = false;
        this.success.modify = true;
        this.chargementFictious = {
          numero_chargement: '',
          date_chargement: '',
          entrepot_id: '',
          ville_destination: '',
          partenaire_id: '',
          acheteur_name: '',
          acheteur_contact: '',
          acheteur_code: '',
          magasin: '',
          produit: '',
          nbre_sacs: '',
          poids_tonne: '',
          transporteur: '',
          marque_camion: '',
          immatriculation_camion: '',
          avant_camion: '',
          chauffeur: '',
          num_permis: ''
        };
      }, (err) => {
        console.log(err);
        this.isLoading.modify = false;
        if (err.status === 408) {
          this.error.text = err.error.message;
        }
      }
    );
  }

}
