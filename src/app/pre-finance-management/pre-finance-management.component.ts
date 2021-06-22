import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { PreFinanceService } from '../services/pre-finance.service';
import { CompteService } from '../services/compte.service';
import { TrackerService } from '../services/tracker.service';
import { PartnerService } from '../services/partner.service';
import { PlanterService } from '../services/planter.service';

@Component({
  selector: 'app-pre-finance-management',
  templateUrl: './pre-finance-management.component.html',
  styleUrls: ['./pre-finance-management.component.css']
})
export class PreFinanceManagementComponent implements OnInit {
  isLoading = {
    data : true,
    create : false,
    modify: false,
    close: false,
    simulate: false
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
  data = {
    default : {},
  };
  prefinancementFictious;
  prefinancementDelete = {
    id : '',
    motif : ''
  };
  prefinancementDetail;
  prefinances = {
    compte_id: '',
    pisteur_id: '',
    montant: '',
    date: '',
    piece_jointe: ''
  };
  timer: number;
  setTimer;
  accountList: any;
  trackers: any;
  simulateData = {
    state: false,
    price: '',
    montant: '',
    sac: ''
  };
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
  partnersData;
  planters;
  addInput = {
    planteur: '',
    pisteur: '',
    partner: ''
  };

  newPrefinancing;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private prefinancementService: PreFinanceService, private trackerService: TrackerService,
              private accountService: CompteService, private partenerService: PartnerService, private planterService: PlanterService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetPrefinancements();
    this.GetAccounts();
    this.GetTracker();
    this.GetPartner();
    this.GetPlanters();
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
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
      this.prefinances.piece_jointe = d;
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


  Previsualisation(event) {

    this.newPrefinancing = this.manageData();

    // console.log(this.newPrefinancing);

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


  GetPrefinancements() {
    this.error.data = false;
    this.prefinancementService.GetPrefinancement().subscribe(
      (data) => {
        console.log(data);
        this.isLoading.data = false;
        this.data.default = data.data;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }


  CreatePrefinancement(event) {
    this.warning.previsual = false;
    console.log(this.newPrefinancing);

    // this.warning.registerBtn = false;
    clearInterval(this.setTimer);
    this.isLoading.create = true;
    this.error.create = false;

    this.prefinancementService.SetPrefinancement(this.newPrefinancing).subscribe(
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
    this.prefinancementFictious = object;
  }

  UpdatePrefinancement(event) {
    this.isLoading.modify = true;
    this.error.modify = false;

    this.prefinancementService.UpdatePreFinancement(this.prefinancementFictious.id, this.prefinancementFictious).subscribe(
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
    this.prefinancementDelete.id = id;
  }


  DeletePrefinancement(event) {
    this.isLoading.close = true;
    this.error.close = false;
    console.log(this.prefinancementDelete);

    this.prefinancementService.DeletePreFinancement(this.prefinancementDelete.id, { motif: this.prefinancementDelete.motif }).subscribe(
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

  OpenModalPieceJointe(pieceJoint) {
    this.prefinancementDetail = pieceJoint;
    console.log(this.prefinancementDetail);

  }

  Simulation() {
    this.isLoading.simulate = true;
    this.simulateData.state = false;
    console.log(this.simulateData);
    const montant = Number(this.simulateData.montant) / Number(this.simulateData.price);
    console.log(montant);

    this.simulateData.sac = montant.toString();
    this.isLoading.simulate = false;
    this.simulateData.state = true;
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
      compte_id: this.prefinances.compte_id,
      date: this.prefinances.date,
      montant: this.prefinances.montant,
      acteur: {
        type: '',
        acteur_id: '',
        etat: ''
      },
      piece_jointe: this.prefinances.piece_jointe
    };

    if (this.state.question.receipt === true) {

      data.acteur.etat = 'prefinancement recu';

    } else {

      data.acteur.etat = 'prefinancement octroyer';

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
