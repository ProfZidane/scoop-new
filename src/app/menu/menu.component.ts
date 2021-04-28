import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';

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
  constructor(private router: Router, private userService: AuthService, private menuService: MenuService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.getRightUserConnected();
  }

  manageUser() {
    this.router.navigateByUrl('/home/(child1:user-manage;open=true)');
    const indique = {
      name: 'Compte utilisateurs',
      route: 'user-manage',
      icon: 'person_outline',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique)
  }

  manageWarehouse() {
    this.router.navigateByUrl('/home/(child1:ware-manage;open=true)');
    const indique = {
      name: 'Entrepôts',
      route: 'ware-manage',
      icon: 'store_mall_directory',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }

  manageTracker() {
    this.router.navigateByUrl('/home/(child1:tracker-manage;open=true)');
    const indique = {
      name: 'Pisteurs',
      route: 'tracker-manage',
      icon: 'accessibility',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }

  ManagePartner() {
    this.router.navigateByUrl('/home/(child1:partner-manage;open=true)');
    const indique = {
      name: 'Partenaires',
      route: 'partner-manage',
      icon: 'assignment_ind',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }

  ManageFinance() {
    this.router.navigateByUrl('/home/(child1:finance-manage;open=true)');
    const indique = {
      name: 'Financements',
      route: 'finance-manage',
      icon: 'attach_money',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }

  ManagePreFinance() {
    this.router.navigateByUrl('/home/(child1:pre-finance-manage;open=true)');
    const indique = {
      name: 'Pré-Financements',
      route: 'pre-finance-manage',
      icon: 'monetization_on',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }

  ManageCampaign() {
    this.router.navigateByUrl('/home/(child1:campaign-manage;open=true)');
    const indique = {
      name: 'Campagnes',
      route: 'campaign-manage',
      icon: 'insert_invitation',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }

  ManagePlanter() {
    this.router.navigateByUrl('/home/(child1:planter-manage;open=true)');
    const indique = {
      name: 'Planteurs',
      route: 'planter-manage',
      icon: 'local_florist',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }

  ManageSalesBuying() {
    this.router.navigateByUrl('/home/(child1:sales-manage;open=true)');
    const indique = {
      name: 'Achats',
      route: 'sales-manage',
      icon: 'compare_arrows',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }

  ManageObjectif() {
    this.router.navigateByUrl('/home/(child1:objectif-manage;open=true)');
    const indique = {
      name: 'Objectifs',
      route: 'objectif-manage',
      icon: 'star_border',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
  }


  ManageCharge() {
    this.router.navigateByUrl('/home/(child1:charge-manage;open=true)');
    const indique = {
      name: 'Chargements',
      route: 'charge-manage',
      icon: 'local_shipping',
      id: JSON.parse(localStorage.getItem('userData')).id
    };
    this.menuService.SetFavoris(indique);
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
          } else if (element.libelle === 'finances') {
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
