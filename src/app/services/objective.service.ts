import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
fullURL = environment.endPoint + 'objectif';
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

  GetObjectifs(): Observable<any> {
    return this.http.get(this.fullURL, { headers: this.GetHeaders() });
  }

  SetObjectifs(data): Observable<any> {
    return this.http.post(this.fullURL, data, { headers: this.GetHeaders() });
  }

  UpdateObjectifs(id, data): Observable<any> {
    return this.http.patch(this.fullURL + '/' + id, data, { headers: this.GetHeaders() });
  }

  DeleteObjectifs(id): Observable<any> {
    return this.http.delete(this.fullURL + '/' + id, { headers: this.GetHeaders() });
  }
}
