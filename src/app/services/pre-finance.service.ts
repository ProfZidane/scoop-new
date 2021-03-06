import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreFinanceService {
fullURL = environment.endPoint + 'prefinancement';
deleteURL = environment.endPoint + 'financement/annuler/';
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

  GetPrefinancement(): Observable<any> {
    return this.http.get(this.fullURL, { headers: this.GetHeaders() });
  }

  SetPrefinancement(data): Observable<any> {
    return this.http.post(this.fullURL, data, { headers: this.GetHeaders() });
  }


  UpdatePreFinancement(id, data): Observable<any> {
    return this.http.patch(this.fullURL + '/' + id, data, { headers: this.GetHeaders() });
  }


  DeletePreFinancement(id, data): Observable<any> {
    return this.http.post(this.deleteURL + id, data, { headers: this.GetHeaders() });
  }

}
