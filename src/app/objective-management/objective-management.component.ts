import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { ObjectiveService } from '../services/objective.service';
import { PartnerService } from '../services/partner.service';
import { TrackerService } from '../services/tracker.service';

@Component({
  selector: 'app-objective-management',
  templateUrl: './objective-management.component.html',
  styleUrls: ['./objective-management.component.css']
})
export class ObjectiveManagementComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
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
  objectives;
  objectivesFictious;
  objectivesDelete = {
    id: '',
  };
  objectif = {
    type: '',
    quantite: '',
    unite: '',
    date_debut: '',
    date_fin: '',
    personne_id: ''
  };
  state = {
    tracker: false,
    partner: false
  };
  partners: any;
  trackers: any;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private objectiveService: ObjectiveService, private partenerService: PartnerService,
              private trackerService: TrackerService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }

    this.GetObjectif();
    this.GetPartner();
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

  GetObjectif() {
    this.error.data = false;
    this.objectiveService.GetObjectifs().subscribe(
      (data) => {
        console.log(data);
        this.isLoading.data = false;
        this.objectives = data.data;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }

  CreateObjectif(event) {
    this.isLoading.create = true;
    this.error.create = false;
    this.objectiveService.SetObjectifs(this.objectif).subscribe(
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
    this.objectivesFictious = object;
    console.log(this.objectivesFictious.id);

  }

  OpenModalDelete(id) {
    this.objectivesDelete.id = id;
  }

  OnSelected(event) {
    console.log(event.target.value);
    const value = event.target.value;
    if (value === 'partenaire') {
      this.state.partner = true;
      this.state.tracker = false;
    } else if (value === 'pisteur') {
      this.state.tracker = true;
      this.state.partner = false;
    } else {
      this.state.partner = false;
      this.state.tracker = false;
    }
  }


  UpdateObjective(event) {
    this.objectivesFictious.personne_id = this.objectivesFictious.personne_id.toString();
    this.isLoading.modify = true;
    this.error.modify = false;
    this.objectiveService.UpdateObjectifs(this.objectivesFictious.id, this.objectivesFictious).subscribe(
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

  DeleteObjectif(event) {
    this.isLoading.close = true;
    this.error.close = false;
    this.objectiveService.DeleteObjectifs(this.objectivesDelete.id).subscribe(
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
