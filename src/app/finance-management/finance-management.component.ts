import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { FinanceService } from '../services/finance.service';
import { CompteService } from '../services/compte.service';
import { PartnerService } from '../services/partner.service';
import { PlanterService } from '../services/planter.service';
import { TrackerService } from '../services/tracker.service';

@Component({
  selector: 'app-finance-management',
  templateUrl: './finance-management.component.html',
  styleUrls: ['./finance-management.component.css']
})
export class FinanceManagementComponent implements OnInit {
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
  warning = {
    previsual: false,
    text : '',
    registerBtn : false
  };
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  finance = {
    compte_id : '',
    partenaire_id : '',
    montant : '',
    date: '',
    piece_jointe : ''
  };
  financeFictious;
  financeDelete = {
    id : '',
    motif : ''
  };
  accountList;
  partnersData;
  financeList;
  timer = 30;
  setTimer;
  pieceJointe;
  state = {
    question: {
      receipt: false,
      give: {
        question: false,
        state: false
      }
    },
    entity: {
      pisteur: false,
      planteur: false
    },
    form: {
      partner: false,
      rest: false
    }
  };
  pisteurs;
  planters;
  addInput = {
    planteur: '',
    pisteur: '',
    partner: ''
  };
  trackers: any;
  financing;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private financeService: FinanceService, private accountService: CompteService, private partenerService: PartnerService,
              private trackerService: TrackerService, private planterService: PlanterService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetFinances();
    this.GetAccounts();
    this.GetPartner();
    this.GetPlanters();
    this.GetTracker();
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



  OnFileSelected(event) {
    console.log('Upload files ...');
    const files = <File>event.target.files[0];
    if (files) {
      const file = files;
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const observable =  new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe( (d) => {
      this.finance.piece_jointe = d;
      console.log(d);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  ManageAccount() {
    this.router.navigateByUrl('/home/(child1:account-manage;open=true)');
  }

  GetFinances() {
    this.error.data = false;
    this.financeService.GetFinancement().subscribe(
      (data) => {
        console.log(data);
        this.financeList = data.data;
        this.isLoading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = false;
      }
    );
  }

  GetAccounts() {
    this.accountService.GetAccount().subscribe(
      (data) => {
        console.log(data);
        this.accountList = data.data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  GetPartner() {
    this.partenerService.GetPartners().subscribe(
      (data) => {
        console.log(data);
        this.partnersData = data.data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  GetTracker() {
    this.trackerService.GetTrackers().subscribe(
      (data) => {
        console.log(data);
        this.trackers = data.data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  GetPlanters() {
    this.planterService.GetPlanter().subscribe(
      (data) => {
        console.log(data);
        this.planters = data.data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  Timer() {
    setInterval( () => {
      if (this.timer !== 0) {
        this.timer --;
      }
    }, 1000);
  }

  Previsualisation(event) {

    this.financing = this.manageData();

    this.timer = 30;
    this.warning.registerBtn = true;
    this.warning.previsual = true;
    console.log('timer to re-read !');
    this.warning.text = 'Veuillez relire les informations entrées ! Vous disposez de : ';
    this.setTimer = setInterval( () => {
      if (this.timer !== 0) {
        this.timer --;
      }
    }, 1000);
    setTimeout( () => {
      this.warning.previsual = false;
      this.warning.registerBtn = false;
      clearInterval(this.setTimer);
    }, 60000);
  }

  CreateFinance() {
    // annule action
    this.warning.previsual = false;
    console.log(this.financing);

    // this.warning.registerBtn = false;
    clearInterval(this.setTimer);

    this.isLoading.create = true;
    this.error.create = false;
    console.log(this.finance);
    this.financeService.SetFinancement(this.financing).subscribe(
      (success) => {
        this.isLoading.create = false;
        console.log(success);
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.create = false;
        this.error.create = true;
      }
    );
  }

  OpenModalUpdate(object) {
    this.financeFictious = {};
    this.financeFictious = object;
  }

  UpdateFinance(event) {
    this.isLoading.modify = true;
    this.error.modify = false;
    console.log(this.financeFictious);
    /*this.financeFictious.compte_id = this.financeFictious.compte_id.toString();
    this.financeFictious.partenaire_id = this.financeFictious.partenaire_id.toString();*/
    this.financeService.UpdateFinancement(this.financeFictious.id, this.financeFictious).subscribe(
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
    this.financeDelete.id = id;
  }

  OpenModalPieceJointe(piece) {
    console.log(piece);

    this.pieceJointe = piece;
  }

  DeleteFinance(event) {
    this.isLoading.close = true;
    this.error.close = false;
    console.log(this.financeDelete);

  }

  setChoiceOfFinancement(value) {
    console.log(value);
    if (value === 'octroyer') {
      this.state.question.give.question = true;
    } else {
      this.state.question.receipt = true;
    }
  }

  setChoiceGrantedPersonn(value) {
    console.log(value);
    this.state.question.give.state = true;

    if (value === 'pisteur') {
      this.state.entity.pisteur = true;
      this.state.entity.planteur = false;
    } else {
      this.state.entity.pisteur = false;
      this.state.entity.planteur = true;
    }
  }

  manageData() {
    let data = {
      compte_id: this.finance.compte_id,
      date: this.finance.date,
      montant: this.finance.montant,
      acteur: {
        type: '',
        acteur_id: '',
        etat: ''
      },
      piece_jointe: this.finance.piece_jointe
    };

    if (this.state.question.receipt === true) {

      data.acteur.etat = 'financement recu';

    } else {

      data.acteur.etat = 'financement octroyer';

    }

    if (this.state.entity.pisteur === true) {
      data.acteur.acteur_id = this.addInput.pisteur;
      data.acteur.type = 'pisteur';
    } else if (this.state.entity.planteur === true) {
      data.acteur.acteur_id = this.addInput.planteur;
      data.acteur.type = 'planteur';
    } else {
      data.acteur.acteur_id = this.addInput.partner;
      data.acteur.type = 'partenaire';
    }

    return data;

  }

  disabledCreation() {
    this.state = {
      question: {
        receipt: false,
        give: {
          question: false,
          state: false
        }
      },
      entity: {
        pisteur: false,
        planteur: false
      },
      form: {
        partner: false,
        rest: false
      }
    };
  }



}
