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
  product : true
};
dtTrigger: Subject<any> = new Subject<any>();
finances;
products;
solde = 0;

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
  }

  GetInfoTracker() {
    this.trackerService.GetTrackerInfoById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.trackerInfo = data.data;
        this.isLoading.info = false;
      }, (err) => {
        console.log(err);
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

}
