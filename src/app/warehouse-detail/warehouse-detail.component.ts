import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Subject } from 'rxjs';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {
detailWarehouse;
id;
isLoading = {
  data : false
};
dtTrigger: Subject<any> = new Subject<any>();
  userConnected: any;
  constructor(private wareService: WarehouseService, private router: Router, private userService: AuthService,
              private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params => {
        this.id = params.get('id');
      })
    );
    console.log(this.id);
    this.DetailToWarehouse(this.id);
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
  }

  DetailToWarehouse(id) {
    console.log(id);
    this.isLoading.data = true;
    this.wareService.GetDetailToWarehouse(id).subscribe(
      (data) => {
        console.log(data);
        this.detailWarehouse = data;
        this.isLoading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
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
