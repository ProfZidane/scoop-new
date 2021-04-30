import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
fullURL = environment.endPoint + 'chargement';
changeURL = environment.endPoint + 'changeDestination/';
disableURL = environment.endPoint + 'annulerChargement/';
  constructor(private http: HttpClient) { }

  GetHeaders() {
    if (localStorage.getItem('token') !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      });
      return headers;
    }
  }

  GetChargements(): Observable<any> {
    return this.http.get(this.fullURL, { headers: this.GetHeaders() });
  }

GetChargementById(id): Observable<any> {
  return this.http.get(this.fullURL + '/' + id, { headers: this.GetHeaders() });
}

  SetChargements(data): Observable<any> {
    return this.http.post(this.fullURL, data, { headers: this.GetHeaders() });
  }

  UpdateChargement(id, data): Observable<any> {
    return this.http.patch(this.fullURL + '/' + id, data, { headers: this.GetHeaders() });
  }

  DisableChargement(id, data): Observable<any> {
    return this.http.post(this.disableURL + id, data, {headers: this.GetHeaders() });
  }

  ChangeDestination(id, data): Observable<any> {
    return this.http.patch(this.changeURL + id, data, { headers: this.GetHeaders() });
  }

}
