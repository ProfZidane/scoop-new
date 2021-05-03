import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargeService } from '../services/charge.service';


@Component({
  selector: 'app-charge-detail',
  templateUrl: './charge-detail.component.html',
  styleUrls: ['./charge-detail.component.css']
})
export class ChargeDetailComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  pieceJointe;
  isLoading = {
    charge : true,
    finance : false,
    product : false
  };

  error = {
    charge : false,
    product : false
  };
  id;
  charges;
  status;
  constructor(private userService: AuthService, private location: Location, private router: Router, private route: ActivatedRoute,
              private chargeService: ChargeService) { }

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
    this.GetChargeById();
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }


  GetChargeById() {
    this.error.charge = false;
    this.chargeService.GetChargementById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.charges = data.data;
        this.isLoading.charge = false;
        if (this.charges.status === 'annuler') {
          this.status = 0;
        } else if (this.charges.status === 'en cours') {
          this.status = 1;
        } else if (this.charges.status === 'vendu') {
          this.status = 3;
        } else if (this.charges.status === 'déchargé') {
          this.status = 2;
        }
        console.log(this.status);

      }, (err) => {
        console.log(err);
        this.isLoading.charge = false;
        this.error.charge = true;
      }
    );
  }

}
