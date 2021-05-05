import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
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
  inventories;
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private inventoryService: InventoryService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetInventory();
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'excel'
      ]
    };
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  GetInventory() {
    this.error.data = false;
    this.inventoryService.GetInventoryFunction().subscribe(
      (data) => {
        console.log(data);
        this.inventories = data.data;
        this.isLoading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }


}
