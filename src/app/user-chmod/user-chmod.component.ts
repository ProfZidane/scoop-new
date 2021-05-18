import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-user-chmod',
  templateUrl: './user-chmod.component.html',
  styleUrls: ['./user-chmod.component.css']
})
export class UserChmodComponent implements OnInit {
  userConnected: any;
  id: string;

  manager = {
    read : false,
    write : false,
    delete : false,
    update: false
  };
  default = {
    read : false,
    write : false,
    delete : false,
    update: false
  };
  administration = {
    read : false,
    write : false,
    delete : false,
    update: false
  };
  finance = {
    read : false,
    write : false,
    delete : false,
    update: false
  };
  stock = {
    read : false,
    write : false,
    delete : false,
    update: false
  };
  pesee = {
    read : false,
    write : false,
    delete : false,
    update: false
  };
  chargeur = {
    read: false,
    write: false,
    delete: false,
    update: false
  };
  rightDefault;
  constructor(private router: Router, private userService: AuthService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params => {
        this.id = params.get('id');
      })
    );
    console.log(this.id);
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetRightUser();
  }

  ComeBack() {
    this.location.back();
  }

  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  GoToProfil() {
    this.router.navigateByUrl('/home/(child1:profil-manage;open=true)');
  }

  // get right By id
  GetRightUser() {
    this.userService.GetRightById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.rightDefault = data.droits;
        this.rightDefault.forEach(element => {
          if (element.libelle === 'default') {
            if (element.create === 1) {
              this.default.write = true;
            } else {
              this.default.write = false;
            }
            if (element.read === 1) {
              this.default.read = true;
            } else {
              this.default.read = false;
            }
            if (element.delete === 1) {
              this.default.delete = true;
            } else {
              this.default.delete = false;
            }
            if (element.update === 1) {
              this.default.update = true;
            } else {
              this.default.update = false;
            }
          }

          if (element.libelle === 'administration') {
            if (element.create === 1) {
              this.administration.write = true;
            } else {
              this.administration.write = false;
            }
            if (element.read === 1) {
              this.administration.read = true;
            } else {
              this.administration.read = false;
            }
            if (element.delete === 1) {
              this.administration.delete = true;
            } else {
              this.administration.delete = false;
            }
            if (element.update === 1) {
              this.administration.update = true;
            } else {
              this.administration.update = false;
            }
          }

          if (element.libelle === 'finances') {
            if (element.create === 1) {
              this.finance.write = true;
            } else {
              this.finance.write = false;
            }
            if (element.read === 1) {
              this.finance.read = true;
            } else {
              this.finance.read = false;
            }
            if (element.delete === 1) {
              this.finance.delete = true;
            } else {
              this.finance.delete = false;
            }
            if (element.update === 1) {
              this.finance.update = true;
            } else {
              this.finance.update = false;
            }
          }

          if (element.libelle === 'stocks') {
            if (element.create === 1) {
              this.stock.write = true;
            } else {
              this.stock.write = false;
            }
            if (element.read === 1) {
              this.stock.read = true;
            } else {
              this.stock.read = false;
            }
            if (element.delete === 1) {
              this.stock.delete = true;
            } else {
              this.stock.delete = false;
            }
            if (element.update === 1) {
              this.stock.update = true;
            } else {
              this.stock.update = false;
            }
          }

          if (element.libelle === 'manager') {
            if (element.create === 1) {
              this.manager.write = true;
            } else {
              this.manager.write = false;
            }
            if (element.read === 1) {
              this.manager.read = true;
            } else {
              this.manager.read = false;
            }
            if (element.delete === 1) {
              this.manager.delete = true;
            } else {
              this.manager.delete = false;
            }
            if (element.update === 1) {
              this.manager.update = true;
            } else {
              this.manager.update = false;
            }
          }

          if (element.libelle === 'pesees') {
            if (element.create === 1) {
              this.pesee.write = true;
            } else {
              this.pesee.write = false;
            }
            if (element.read === 1) {
              this.pesee.read = true;
            } else {
              this.pesee.read = false;
            }
            if (element.delete === 1) {
              this.pesee.delete = true;
            } else {
              this.pesee.delete = false;
            }
            if (element.update === 1) {
              this.pesee.update = true;
            } else {
              this.pesee.update = false;
            }
          }

          if (element.libelle === 'dechargeur') {
            if (element.create === 1) {
              this.chargeur.write = true;
            } else {
              this.chargeur.write = false;
            }
            if (element.read === 1) {
              this.chargeur.read = true;
            } else {
              this.chargeur.read = false;
            }
            if (element.delete === 1) {
              this.chargeur.delete = true;
            } else {
              this.chargeur.delete = false;
            }
            if (element.update === 1) {
              this.chargeur.update = true;
            } else {
              this.chargeur.update = false;
            }
          }
        });
      }, (err) => {
        console.log(err);
      }
    );
  }

  // event to right
  eventDefault(event, action) {
    console.log('l\'action solicitée est : ' + action);
    console.log(event);
    if (this.default.write === true || this.default.delete === true) {
      this.default.read = true;
    }
    if (this.default.read === false) {
      this.default.write = false;
      this.default.delete = false;
    }
    console.log(this.default);
    const data = {
      user_id : this.id,
      libelle : 'default',
      create : this.default.write,
      read : this.default.read,
      delete : this.default.delete,
      update: this.default.update
    };
    console.log(data);
    this.userService.AssignRight(data).subscribe(
      (success) => {
        console.log(success);
      }, (err) => {
        console.log(err);
      }
    );
  }

  eventAdministration(event, action) {
    console.log('l\'action solicitée est : ' + action);
    console.log(event);
    console.log(this.administration);
    if (this.administration.write === true || this.administration.delete === true) {
      this.administration.read = true;
    }
    if (this.administration.read === false) {
      this.administration.write = false;
      this.administration.delete = false;
    }
    const data = {
      user_id : this.id,
      libelle : 'administration',
      create : this.administration.write,
      read : this.administration.read,
      delete : this.administration.delete,
      update: this.administration.update
    };
    console.log(data);
    this.userService.AssignRight(data).subscribe(
      (success) => {
        console.log(success);
      }, (err) => {
        console.log(err);
      }
    );
  }

  eventFinance(event, action) {
    console.log('l\'action solicitée est : ' + action);
    console.log(event);
    console.log(this.finance);
    if (this.finance.write === true || this.finance.delete === true) {
      this.finance.read = true;
    }
    if (this.finance.read === false) {
      this.finance.write = false;
      this.finance.delete = false;
    }
    const data = {
      user_id : this.id,
      libelle : 'finances',
      create : this.finance.write,
      read : this.finance.read,
      delete : this.finance.delete,
      update: this.finance.update
    };
    console.log(data);
    this.userService.AssignRight(data).subscribe(
      (success) => {
        console.log(success);
      }, (err) => {
        console.log(err);
      }
    );
  }

  eventStock(event, action) {
    console.log('l\'action solicitée est : ' + action);
    console.log(event);
    console.log(this.stock);
    if (this.stock.write === true || this.stock.delete === true) {
      this.stock.read = true;
    }
    if (this.stock.read === false) {
      this.stock.write = false;
      this.stock.delete = false;
    }
    const data = {
      user_id : this.id,
      libelle : 'stocks',
      create : this.stock.write,
      read : this.stock.read,
      delete : this.stock.delete,
      update: this.stock.update
    };
    console.log(data);
    this.userService.AssignRight(data).subscribe(
      (success) => {
        console.log(success);
      }, (err) => {
        console.log(err);
      }
    );
  }

  eventManager(event, action) {
    console.log('l\'action solicitée est : ' + action);
    console.log(event);
    console.log(this.manager);
    if (this.manager.write === true || this.manager.delete === true) {
      this.manager.read = true;
    }
    if (this.manager.read === false) {
      this.manager.write = false;
      this.manager.delete = false;
    }
    const data = {
      user_id : this.id,
      libelle : 'manager',
      create : this.manager.write,
      read : this.manager.read,
      delete : this.manager.delete,
      update: this.manager.update
    };
    console.log(data);
    this.userService.AssignRight(data).subscribe(
      (success) => {
        console.log(success);
      }, (err) => {
        console.log(err);
      }
    );
  }

  eventPesee(event, action) {
    console.log('l\'action solicitée est : ' + action);
    console.log(event);
    console.log(this.pesee);
    if (this.pesee.write === true || this.pesee.delete === true) {
      this.pesee.read = true;
    }
    if (this.pesee.read === false) {
      this.pesee.write = false;
      this.pesee.delete = false;
    }
    const data = {
      user_id : this.id,
      libelle : 'pesees',
      create : this.pesee.write,
      read : this.pesee.read,
      delete : this.pesee.delete,
      update: this.pesee.update
    };
    console.log(data);
    this.userService.AssignRight(data).subscribe(
      (success) => {
        console.log(success);
      }, (err) => {
        console.log(err);
      }
    );
  }

  eventChargeur(event, action) {
    console.log('l\'action solicitée est : ' + action);
    console.log(event);
    console.log(this.chargeur);
    if (this.chargeur.write === true || this.chargeur.delete === true) {
      this.chargeur.read = true;
    }
    if (this.chargeur.read === false) {
      this.chargeur.write = false;
      this.chargeur.delete = false;
    }
    const data = {
      user_id : this.id,
      libelle : 'dechargeur',
      create : this.chargeur.write,
      read : this.chargeur.read,
      delete : this.chargeur.delete,
      update: this.chargeur.update
    };
    console.log(data);
    this.userService.AssignRight(data).subscribe(
      (success) => {
        console.log(success);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
