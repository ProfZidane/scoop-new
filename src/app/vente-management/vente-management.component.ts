import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { VenteService } from '../services/vente.service';
import { CompteService } from '../services/compte.service';
@Component({
  selector: 'app-vente-management',
  templateUrl: './vente-management.component.html',
  styleUrls: ['./vente-management.component.css']
})
export class VenteManagementComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = {
    data: true,
    create: false
  };
  error = {
    data: false,
    create: false,
    text: "Une erreur s'est produite. Veuillez réessayer plus tard svp !"
  };
  state = {
    unit: false
  };
  poundSac;
  vente = {
    montant_total: 0,
    compte_id: '',
    prix_unitaire: 0,
    date_vente: '',
    chargement_id: ''
  };
  ventes;
  compteList: any;
  compte: any;
  right;
  rightState = {
    create: 0,
    delete: 0,
    read: 0,
    update: 0
  };
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private venteService: VenteService, private compteService: CompteService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }

    this.getVentes();
    this.getAccounts();
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  OpenModal(id, sacs) {
    this.poundSac = sacs;
    this.vente.chargement_id = id;
  }

  goToHistory() {
    this.router.navigateByUrl('/home/(child1:vente-history;open=true)');
  }

  getAccounts() {
    this.compteService.GetAccount().subscribe(
      (data) => {
        console.log(data);
        this.compteList = data.data;
        this.compte = data.data[0];
        this.vente.compte_id = this.compte.id;
        console.log(this.compte);

      }, (err) => {
        console.log(err);
      }
    );
  }

  getVentes() {
    this.error.data = false;
    this.venteService.GetVentes().subscribe(
      (data) => {
        console.log(data);
        this.ventes = data.data;
        this.isLoading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }

  ValidVente() {
    this.isLoading.create = true;
    this.error.create = false;
    this.venteService.SetVentes(this.vente).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.create = false;
        this.error.create = true;
        if (err.status === 408) {
          this.error.text = err.error.message;
        }
      }
    );
  }

  getMontantTotal() {
    const montant = Number(this.poundSac) * 1000 * Number(this.vente.prix_unitaire);
    this.vente.montant_total = montant;

    const month = new Date().toLocaleDateString();
    const t = month.split('/');
    const newDate = t[t.length - 1] + '-' + t[t.length - 2] + '-' + t[t.length - 3];
    console.log(newDate);
    this.vente.date_vente = newDate;

    this.state.unit = true;
  }
}
