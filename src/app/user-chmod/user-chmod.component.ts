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
    delete : false
  };
  default = {
    read : false,
    write : false,
    delete : false
  };
  administration = {
    read : false,
    write : false,
    delete : false
  };
  finance = {
    read : false,
    write : false,
    delete : false
  };
  stock = {
    read : false,
    write : false,
    delete : false
  };
  pesee = {
    read : false,
    write : false,
    delete : false
  }
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
      delete : this.default.delete
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
      delete : this.administration.delete
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
      delete : this.finance.delete
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
      delete : this.stock.delete
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
      delete : this.manager.delete
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
      delete : this.pesee.delete
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
