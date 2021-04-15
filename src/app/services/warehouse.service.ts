import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
getWareURL = 'https://scoop-coopraca.lce-test.fr/api/entrepot';
postWareURL = 'https://scoop-coopraca.lce-test.fr/api/entrepot';
updateURL = 'https://scoop-coopraca.lce-test.fr/api/entrepot/';
deleteURL = 'https://scoop-coopraca.lce-test.fr/api/entrepotClosed/';
detailURL = 'https://scoop-coopraca.lce-test.fr/api/getIntervenants/';
  constructor(private http: HttpClient) { }

  GetHeaders() {
    if (localStorage.getItem('token') !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      });
      return headers;
    }
  }
  GetWarehouse(): Observable<any> {
    return this.http.get(this.getWareURL, { headers: this.GetHeaders()});
  }

  SetWarehouse(data): Observable<any> {
    return this.http.post(this.postWareURL, data, { headers: this.GetHeaders() });
  }

  UpdateWarehouse(id, data): Observable<any> {
    return this.http.put(this.updateURL + id, data, { headers: this.GetHeaders() });
  }

  DeleteWarehouse(id, data): Observable<any> {
    return this.http.post(this.deleteURL + id, data, { headers: this.GetHeaders() });
  }

  GetDetailToWarehouse(id): Observable<any> {
    return this.http.get(this.detailURL + id, { headers: this.GetHeaders() });
  }
}
