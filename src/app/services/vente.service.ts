import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class VenteService {
fullURL = environment.endPoint + 'vente';
historyURL = environment.endPoint + 'getHistoriqueVentes';
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

  GetVentes(): Observable<any> {
    return this.http.get(this.fullURL, { headers: this.GetHeaders() });
  }

  SetVentes(data): Observable<any> {
    return this.http.post(this.fullURL, data, { headers: this.GetHeaders() });
  }

  GetHistoryVente(data): Observable<any> {
    return this.http.post(this.historyURL, data, { headers: this.GetHeaders() });
  }
}
