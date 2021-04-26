import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
fullURL = environment.endPoint + 'stock';
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

  GetInfoWeighing(): Observable<any> {
    return this.http.get(this.fullURL, { headers: this.GetHeaders() });
  }

  GetInfoWeighingById(id): Observable<any> {
    return this.http.get(this.fullURL + '/' + id, { headers: this.GetHeaders() });
  }

  SetSales(data): Observable<any> {
    return this.http.post(this.fullURL, data, { headers: this.GetHeaders() });
  }

  GetHistorySales(): Observable<any> {
    return this.http.get(this.fullURL, { headers: this.GetHeaders() });
  }


}
