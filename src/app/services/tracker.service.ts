import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  postURl = environment.endPoint + 'pisteur';
  getURl = environment.endPoint + 'pisteur';
  deleteURL = environment.endPoint + 'pisteurClosed/';
  getImageURL = environment.endPoint + 'getPisteurPieceScan/';
  getInfoURL = environment.endPoint + 'pisteur/';
  getPrefinance = environment.endPoint + 'getPrefinancementsPisteur/';
  getProductFinal = environment.endPoint + 'getStocksPisteur/';
  getBilanURL = environment.endPoint + 'getBilansPisteur/';
  trackers;
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
  GetHeaders2() {
    if (localStorage.getItem('token') !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      });
      return headers;
    }
  }
  SetTrackers(data): Observable<any> {
    return this.http.post(this.postURl, data, { headers: this.GetHeaders() });
  }

  GetTrackers(): Observable<any> {
    return this.http.get(this.getURl, { headers: this.GetHeaders2() });
  }

  GetImageTracker(id): Observable<any> {
    return this.http.get(this.getImageURL + id, { headers: this.GetHeaders() });
  }

  GetTrackerInfoById(id): Observable<any> {
    return this.http.get(this.getInfoURL + id, { headers: this.GetHeaders() });
  }

  UpdateTrackers(data, id): Observable<any> {
    return this.http.patch(this.getURl + '/' + id, data, { headers: this.GetHeaders() });
  }

  DeleteTrackers(id, data): Observable<any> {
    return this.http.post(this.deleteURL + id, data, { headers: this.GetHeaders() });
  }


  GetPrefinancementByTracker(id): Observable<any> {
    return this.http.get(this.getPrefinance + id, { headers: this.GetHeaders() });
  }


  GetProductDelivered(id): Observable<any> {
    return this.http.get(this.getProductFinal + id, { headers: this.GetHeaders() });
  }


  GetObjectifByTracker(id): Observable<any> {
    return this.http.get(this.getBilanURL + id, { headers: this.GetHeaders() });
  }

}
