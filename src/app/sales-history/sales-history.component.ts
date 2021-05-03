import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { SalesService } from '../services/sales.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = {
    data: true
  };
  error = {
    data: false
  };
  state = {
    trie: false
  };
  histories;
  montant = 0;
  trie = {
    date_debut: '',
    date_fin: ''
  };
  constructor(private router: Router, private userService: AuthService, private location: Location, private salesService: SalesService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetHistory();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }



  GetHistory() {
    const data = {
      date_debut: null,
      date_fin: null
    };
    this.error.data = false;
    this.salesService.GetHistorySales2(data).subscribe(
      (data) => {
        console.log(data);
        this.isLoading.data = false;
        this.histories = data.data;
        this.histories.forEach(element => {
          this.montant += element.montant_total;
        });
        console.log(this.montant);
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }

  Trie() {
    console.log(this.trie);
    this.state.trie = true;
    this.error.data = false;
    this.salesService.GetHistorySales2(this.trie).subscribe(
      (data) => {
        console.log(data);
        this.isLoading.data = false;
        this.histories = data.data;
        this.histories.forEach(element => {
          this.montant += element.montant_total;
        });
        console.log(this.montant);
        this.state.trie = false;
        this.rerender();
        // this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
        this.state.trie = false;
      }
    );
  }

}
