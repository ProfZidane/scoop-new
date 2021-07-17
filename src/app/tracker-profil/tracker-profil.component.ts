import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { TrackerService } from '../services/tracker.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tracker-profil',
  templateUrl: './tracker-profil.component.html',
  styleUrls: ['./tracker-profil.component.css']
})
export class TrackerProfilComponent implements OnInit {
id;
userConnected;
trackerInfo;
isLoading = {
  info : true,
  finance : true,
  product : false
};
error = {
  info : false,
  finance: false,
  product : false
};
dtTrigger: Subject<any> = new Subject<any>();
dtTrigger2: Subject<any> = new Subject<any>();
dtTrigger3: Subject<any> = new Subject<any>();
finances;
prefinances;
products;
objectives;
solde = 0;
pieceJointe;
  constructor(private router: Router, private userService: AuthService, private route: ActivatedRoute, private location: Location,
              private trackerService: TrackerService) { }

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

    this.GetInfoTracker();
    this.GetPrefinances();
    this.GetProducts();
    this.GetBilan();
  }

  GetInfoTracker() {
    this.error.info = false;
    this.trackerService.GetTrackerInfoById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.trackerInfo = data.data;
        this.solde = data.data.solde;
        this.isLoading.info = false;
      }, (err) => {
        console.log(err);
        this.error.info = true;
      }
    );
  }

  GetPrefinances() {
    this.error.finance = false;
    this.trackerService.GetPrefinancementByTracker(this.id).subscribe(
      (data) => {
        console.log(data);
        this.finances = data.financements;
        this.prefinances = data.prefinancements;
        this.isLoading.finance = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.finance = false;
        this.error.finance = true;
      }
    );
  }

  GetProducts() {
    this.isLoading.product = true;
    this.error.product = false;
    this.trackerService.GetProductDelivered(this.id).subscribe(
      (data) => {
        console.log(data);
        this.products = data.data;
        this.isLoading.product = false;
        this.dtTrigger2.next();
      }, (err) => {
        console.log(err);
        this.isLoading.product = false;
        this.error.product = true;
      }
    );
  }

  GetBilan() {
    this.trackerService.GetObjectifByTracker(this.id).subscribe(
      (data) => {
        console.log(data);
        this.objectives = data.data;
        this.dtTrigger3.next();
      }, (err) => {
        console.log(err);
      }
    );
  }


  OpenModelImage(piece_jointe) {
    console.log(piece_jointe);
    this.pieceJointe = piece_jointe;
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
