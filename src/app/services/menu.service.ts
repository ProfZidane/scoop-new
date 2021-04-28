import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
favoris = [];
  constructor() { }

  GetFavoris() {
    if (localStorage.getItem('favoris') !== null) {
      this.favoris = JSON.parse(localStorage.getItem('favoris'));
      return this.favoris;
    } else {
      return false;
    }
  }

  VerifyFavoris(menu) {
    let state = false;
    /*this.favoris.forEach(element => {
      if (element.id === menu.id) {
        console.log('exist');
      } else {
        console.log('not exist');

      }
    });*/
    if (localStorage.getItem('favoris') !== null) {
      this.favoris = JSON.parse(localStorage.getItem('favoris'));
    }

    for (let i = 0; i < this.favoris.length; i++) {
      console.log(this.favoris[i]);

      if ((this.favoris[i].id === menu.id) && (this.favoris[i].name === menu.name)) {
        console.log('exist');
        state = true;
        break;
      }
    }

    return state;
  }

  SetFavoris(menu) {
    console.log(this.favoris);
    console.log(this.favoris.includes(menu));
    console.log(this.VerifyFavoris(menu));

    if (menu !== null || menu !== {}) {
      if (this.VerifyFavoris(menu) === false) {
        this.favoris.push(menu);
        localStorage.setItem('favoris', JSON.stringify(this.favoris));
        console.log('ajout au favoris réussi avec success !');
      } else {
        console.log('Widget déjà inscrit dans les favoris !');
      }
    }
  }
}
