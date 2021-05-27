import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { PartnerService } from '../services/partner.service';
import { WarehouseService } from '../services/warehouse.service';
import { ChargeService } from '../services/charge.service';

@Component({
  selector: 'app-charge-insert',
  templateUrl: './charge-insert.component.html',
  styleUrls: ['./charge-insert.component.css']
})
export class ChargeInsertComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = {
    create : false,
    create2: false,
    create3: false,
    modify: false,
    close: false
  };
  error = {
    create : false,
    create3: false,
    modify: false,
    close: false,
    text: 'Une erreur est survenue. Veuillez réessayez plus tard !'
  };
  success = {
    create: false,
    create3: false
  };
  chargement = {
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
  partners: any;
  wareHouses: any;
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
  state = {
    partner: false,
    partnerSuccess: false,
    warehouse: false,
    warehousSuccess: false
  };
  cities;
  cityName;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private partenerService: PartnerService, private wareService: WarehouseService, private chargeService: ChargeService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetPartner();
    this.GetWareHouses();
    this.GetCity();
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

  CreateCityDestination(event) {
    this.error.create3 = false;
    this.isLoading.create3 = true;
    console.log(this.cityName);
    this.userService.SetParametre({ name: this.cityName }).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create3 = false;
        this.success.create3 = true;
        this.GetCity();
      }, (err) => {
        console.log(err);
        this.isLoading.create3 = false;
        this.error.create3 = true;
        this.error.text = 'Une erreur est survenue. Veuillez réessayez plus tard !';
      }
    );

    setTimeout( () => {
      this.success.create3 = false;
    }, 3000);
  }

  CreateChargement() {
    console.log(this.chargement);
    this.isLoading.create = true;
    this.error.create = false;
    this.success.create = false;
    this.chargeService.SetChargements(this.chargement).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
        this.success.create = true;
        this.chargement = {
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
        this.isLoading.create = false;
        this.error.create = true;
        if (err.status === 408) {
          this.error.text = err.error.message;
        } else if (err.status === 422) {
          this.error.text = 'Veuillez saisir les informations correctement !';
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

}
