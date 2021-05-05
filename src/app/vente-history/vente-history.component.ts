import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber, timer } from 'rxjs';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { VenteService } from '../services/vente.service';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-vente-history',
  templateUrl: './vente-history.component.html',
  styleUrls: ['./vente-history.component.css']
})
export class VenteHistoryComponent implements OnInit {
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
  constructor(private router: Router, private userService: AuthService, private location: Location,
              private venteService: VenteService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.getHistoriqueVente();
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

  getHistoriqueVente() {
    const data = {
      date_debut: null,
      date_fin: null
    };
    this.error.data = false;
    this.venteService.GetHistoryVente(data).subscribe(
      (data) => {
        console.log(data);
        this.histories = data.data;
        this.isLoading.data = false;
        this.histories.forEach(element => {
          this.montant += element.montant_total;
        });
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }

  Trie() {
    this.montant = 0;
    console.log(this.trie);
    this.state.trie = true;
    this.error.data = false;
    this.venteService.GetHistoryVente(this.trie).subscribe(
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
