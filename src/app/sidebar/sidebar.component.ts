import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../services/sales.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  histories;
  rightContent = {
    administration: {
      state : false,
    },
    finance : {
      state : false,
    },
    default : {
      state : false,
    },
    stocks : {
      state : false,
    },
    manager: {
      state : false,
    }
  };
  right;
  constructor(private router: Router, private salesService: SalesService, private userService: AuthService) { }

  ngOnInit(): void {
    this.getNotification();
    this.getRightUserConnected();
  }

  goToMenu() {
    this.router.navigateByUrl('/menu');
  }

  isSelected(id) {
    const parent = document.querySelectorAll('.menu-home-option');
    parent.forEach(element => {
      element.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
    if (id === 'menu') {
      this.router.navigateByUrl('/home/(child1:menu;open=true)');
    } else if (id === 'home') {
      this.router.navigateByUrl('/home)');
    } else if (id === 'user') {
      this.router.navigateByUrl('/home/(child1:user-manage;open=true)');
    }

  }

  GetHistory() {
    this.salesService.GetInfoWeighing().subscribe(
      (data) => {
        // console.log(data);
        if (data.data.length > 0) {
          this.histories = data.data.length;
          // console.log(this.histories);
          // console.log("notification reçue");

        } else {
          // console.log('aucune notif achat');
        }

      }, (err) => {
        // console.log(err);
      }
    );
  }

  getNotification() {
    setInterval( () => {
      this.GetHistory();
    }, 6000);
  }

  goToSalesPage() {
    this.router.navigateByUrl('/home/(child1:sales-manage;open=true)');
  }


  getRightUserConnected() {
    if (this.userService.GetRight() !== 0) {
      this.right = this.userService.GetRight();
      console.log(this.right);
      this.right.forEach(element => {
          if (element.libelle === 'administration') {
            this.rightContent.administration.state = true;
          } else if (element.libelle === 'default') {
            this.rightContent.default.state = true;
          } else if (element.libelle === 'finances') {
            this.rightContent.finance.state = true;
          } else if (element.libelle === 'stocks') {
            this.rightContent.stocks.state = true;
          } else if (element.libelle === 'manager') {
            this.rightContent.manager.state = true;
          }
      });
      console.log(this.rightContent);

    }
  }


}
