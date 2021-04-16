import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userConnected: any;
  right;
  rightContent = {
    administration: {
      state : false,
      content : []
    },
    finance : {
      state : false,
      content : []
    },
    default : {
      state : false,
      content : []
    },
    stocks : {
      state : false,
      content : []
    },
    manager: {
      state : false,
      content : []
    }
  };
  constructor(private router: Router, private userService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.getRightUserConnected();
  }

  manageUser() {
    this.router.navigateByUrl("/home/(child1:user-manage;open=true)");
  }

  manageWarehouse() {
    this.router.navigateByUrl("/home/(child1:ware-manage;open=true)");
  }

  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  getRightUserConnected() {
    if (this.userService.GetRight() !== 0) {
      this.right = this.userService.GetRight();
      console.log(this.right);
      this.right.forEach(element => {
          if (element.libelle === 'administration') {
            this.rightContent.administration.state = true;
            this.rightContent.administration.content = element;
          } else if (element.libelle === 'default') {
            this.rightContent.default.state = true;
            this.rightContent.default.content = element;
          } else if (element.libelle === 'finance') {
            this.rightContent.finance.state = true;
            this.rightContent.finance.content = element;
          } else if (element.libelle === 'stocks') {
            this.rightContent.stocks.state = true;
            this.rightContent.stocks.content = element;
          } else if (element.libelle === 'manager') {
            this.rightContent.manager.state = true;
            this.rightContent.manager.content = element;
          }
      });
      console.log(this.rightContent);

    }
  }

}
