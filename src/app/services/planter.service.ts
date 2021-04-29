import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanterService {
fullURL = environment.endPoint + 'planteur';
pieceURL = environment.endPoint + 'getPlanteurPieceScan/';
stockURL = environment.endPoint + 'getStocksPlanteur/';
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

  GetPlanter(): Observable<any> {
    return this.http.get(this.fullURL, { headers: this.GetHeaders() });
  }

  GetInfoById(id): Observable<any> {
    return this.http.get(this.fullURL + '/' + id, { headers: this.GetHeaders() });
  }

  SetPlanter(data): Observable<any> {
    return this.http.post(this.fullURL, data, { headers: this.GetHeaders() });
  }

  UpdatePlanter(id, data): Observable<any> {
    return this.http.patch(this.fullURL + '/' + id, data, { headers: this.GetHeaders() });
  }

  DeletePlanter(id, data): Observable<any> {
    return this.http.post(this.fullURL + '/' + id, data, { headers: this.GetHeaders() });
  }

  GetPieceScanPlanter(id): Observable<any> {
    return this.http.get(this.pieceURL + id, { headers: this.GetHeaders() });
  }

  GetStockageById(id): Observable<any> {
    return this.http.get(this.stockURL + id, { headers: this.GetHeaders() });
  }
}
