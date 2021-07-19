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
prixMoyen;
type = 'bar';
  data;
  data1;
  data2;
  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  labels;
  dureeMoyenne;
  labelTime = [];
  dataTime = [];
  salesSort = [0,0,0,0,0,0,0,0,0,0,0,0];
  labelObjectif = [];
  dataObjectif = [];
  objectifMoyen;
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
    this.GetCost();
    this.GetTimeToApprov();
    this.GetSalesByMonthAndTracker();
//    this.GetSalesByMonth();
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
        let sum = 0;
        this.objectives.forEach(element => {
          this.labelObjectif.push(element.qte_demande.toString() + ' ' + element.unite);
          this.dataObjectif.push(element.poucentage);
          sum += element.poucentage;
        });
        this.objectifMoyen = sum / data.data.length;
        console.log(this.labelObjectif);
        console.log(this.dataObjectif);
        console.log(this.objectifMoyen);
        const title = 'Objectifs';
        this.setChart3(this.labelObjectif, title, this.dataObjectif);
        this.dtTrigger3.next();
      }, (err) => {
        console.log(err);
      }
    );
  }

  GetCost() {
    this.trackerService.getMeanCost(this.id).subscribe(
      (data) => {
        console.log(data);
        let sum = 0;
        data.data.forEach(element => {
          sum += element.prix_unitaire;
        });
        console.log(sum);
        this.prixMoyen = sum / data.data.length;
      }, (err) => {
        console.log(err);
      }
    );
  }

  GetSalesByMonthAndTracker() {
    this.trackerService.getSalesByMonthAndTracker(this.id).subscribe(
      (res) => {
        console.log(res);
        const sort = res.data;
        let keys = [];
        let values = [];
        const length = sort.length;
        console.log(sort[0]);

        sort.forEach(element => {
          keys.push(Object.keys(element)[0]);
        });

        console.log(keys);

        keys.forEach(element => {
          if (element === 'January') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[0] = sum / j[element].length;
                } else {
                  this.salesSort[0] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'February') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[1] = sum / j[element].length;
                } else {
                  this.salesSort[1] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'March') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[2] = sum / j[element].length;
                } else {
                  this.salesSort[2] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'April') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[3] = sum / j[element].length;
                } else {
                  this.salesSort[3] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'May') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[4] = sum / j[element].length;
                } else {
                  this.salesSort[4] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'June') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[5] = sum / j[element].length;
                } else {
                  this.salesSort[5] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'July') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[6] = sum / j[element].length;
                } else {
                  this.salesSort[6] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element ===  'August') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[7] = sum / j[element].length;
                } else {
                  this.salesSort[7] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'September') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[8] = sum / j[element].length;
                } else {
                  this.salesSort[8] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'October') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[9] = sum / j[element].length;
                } else {
                  this.salesSort[9] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'November') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[10] = sum / j[element].length;
                } else {
                  this.salesSort[10] = j[element][0].prix_unitaire;
                }
              }
            });
          } else if (element === 'December') {
            sort.forEach(j => {
              if (j[element] !== undefined) {
                if (j[element].length > 1) {
                  let sum = 0;
                  j[element].forEach(price => {
                    sum += price.prix_unitaire;
                  });
                  this.salesSort[11] = sum / j[element].length;
                } else {
                  this.salesSort[11] = j[element][0].prix_unitaire;
                }
              }
            });
          }

        });


        console.log(this.salesSort);
        this.setChart2(this.salesSort);

      }, (err) => {
        console.log(err);
      }
    );
  }

/*   GetSalesByMonth() {
    this.trackerService.GetSalesByMonth().subscribe(
      (data) => {
        console.log(data);
        const sort = data.data;

        console.log(Object.keys(sort));
        const keys = Object.keys(sort);
        keys.forEach(element => {

          if (element === 'January') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[0] = sum / sort[element].length;
            } else {
              this.salesSort[0] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'February') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[1] = sum / sort[element].length;
            } else {
              this.salesSort[1] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'March') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[2] = sum / sort[element].length;
            } else {
              this.salesSort[2] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'April') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[3] = sum / sort[element].length;
            } else {
              this.salesSort[3] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'May') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[4] = sum / sort[element].length;
            } else {
              this.salesSort[4] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'June') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[5] = sum / sort[element].length;
            } else {
              this.salesSort[5] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'July') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[6] = sum / sort[element].length;
            } else {
              this.salesSort[6] = sort[element][0].prix_unitaire;
            }
          } else if (element ===  'August') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[7] = sum / sort[element].length;
            } else {
              this.salesSort[7] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'September') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[8] = sum / sort[element].length;
            } else {
              this.salesSort[8] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'October') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[9] = sum / sort[element].length;
            } else {
              this.salesSort[9] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'November') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[10] = sum / sort[element].length;
            } else {
              this.salesSort[10] = sort[element][0].prix_unitaire;
            }
          } else if (element === 'December') {
            if (sort[element].length > 1) {
              let sum = 0;
              sort[element].forEach(price => {
                sum += price.prix_unitaire;
              });
              this.salesSort[11] = sum / sort[element].length;
            } else {
              this.salesSort[11] = sort[element][0].prix_unitaire;
            }
          }

        });

        console.log(this.salesSort);
      }, (err) => {
        console.log(err);
      }
    );
  } */

  GetTimeToApprov() {
    this.trackerService.getTimeAprovisionnement(this.id).subscribe(
      (data) => {
        console.log(data);
        let sum = 0;
        data.data.forEach(element => {
          sum += element.duree;
          this.dataTime.push(element.poids_net);
          this.labelTime.push(element.duree.toString() + ' jour(s)');
        });
        this.dureeMoyenne = sum / data.data.length;
        console.log(this.labelTime);
        console.log(this.dataTime);
        const title = 'Durée d\'approvisionnement';
        this.setChart(this.labelTime, title, this.dataTime);
      }, (err) => {
        console.log(err);

      }
    );
  }

  setChart(label, title, data) {
    this.data = {
      labels: label,
      datasets: [{
        label: title,
        data,/*
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ], */
        borderWidth: 1
      }]
    };
  }

  setChart2(data) {
    this.data1 = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [{
        label: 'Prix moyen d\'achat',
        data, /*
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ], */
        borderWidth: 1
      }]
    };
  }

  setChart3(label, title, data) {
    this.data2 = {
      labels: label,
      datasets: [{
        label: title,
        data,/*
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ], */
        borderWidth: 1
      }]
    };
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
