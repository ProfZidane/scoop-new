import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import { CompteService } from '../services/compte.service';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-sales-buying-detail',
  templateUrl: './sales-buying-detail.component.html',
  styleUrls: ['./sales-buying-detail.component.css']
})
export class SalesBuyingDetailComponent implements OnInit {
isLoading = {
  data: true,
  calcul: false
};

error = {
  data: false,
  calcul: false
};

visibility = {
  input: false,
  button: false,
  loadBtn: false
};

id;

userConnected;

buyingPrice;

finalAmount;

date;
compte;
compteList;
info;
ifpaid;
  constructor(private router: Router, private userService: AuthService, private location: Location, private route: ActivatedRoute,
              private compteService: CompteService, private salesService: SalesService) { }

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
    this.getAccounts();
    this.SetTime();
    this.getById();
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  SetTime() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    let month2 = '';
    if (month < 10) {
      month2 = '0' + month;
    } else {
      month2 = month.toString();
    }
    const formatDate = year + '-' + month2 + '-' + day;
    console.log(formatDate);
    this.date = formatDate;

  }

  getAccounts() {
    this.compteService.GetAccount().subscribe(
      (data) => {
        console.log(data);
        this.compteList = data.data;
        this.compte = data.data[0];
      }, (err) => {
        console.log(err);
      }
    );
  }

  getById() {
    this.salesService.GetInfoWeighingById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.info = data.data;
        if (this.info.status === 'paid') {
          this.ifpaid = true;
        } else {
          this.ifpaid = false;
        }
        console.log(this.ifpaid);

      }, (err) => {
        console.log(err);
      }
    );
  }

  Calculate() {
    console.log(this.buyingPrice);
    this.isLoading.calcul = true;

    this.finalAmount = Number(this.buyingPrice * this.info.poids_net);
    setTimeout( () =>  {
      this.visibility.input = true;
      this.visibility.button = true;
      this.isLoading.calcul = false;
    }, 1000);
  }

  Validation(event) {
    this.visibility.loadBtn = true;
    console.log(this.finalAmount);
    const data = {
      prix_unitaire: Number(this.buyingPrice),
      montant_total: Number(this.finalAmount),
      date: this.date,
      pesee_id: this.info.id,
      compte_id: this.compte.id
    };

    console.log(data);

    this.salesService.ValidationPaid(data).subscribe(
      (success) => {
        console.log(success);
        this.visibility.loadBtn = false;
        this.router.navigateByUrl('/home/(child1:sales-manage;open=true)');
      }, (err) => {
        console.log(err);
        this.visibility.loadBtn = false;
      }
    );
  }

}
