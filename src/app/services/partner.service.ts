import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
getURL = environment.endPoint + 'partenaire';
postURL = environment.endPoint + 'partenaire';
getByIdURL = environment.endPoint + 'partenaire/';
patchURL = environment.endPoint + 'partenaire/';
deleteURL = environment.endPoint + 'partenaireClosed/';
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

  GetPartners(): Observable<any> {
    return this.http.get(this.getURL, { headers: this.GetHeaders() });
  }

  GetPartnersById(id): Observable<any>{
    return this.http.get(this.getByIdURL + id, { headers: this.GetHeaders() });
  }


  SetPartners(data): Observable<any> {
    return this.http.post(this.postURL, data, { headers: this.GetHeaders() });
  }

  UpdatePartners(id, data): Observable<any> {
    return this.http.patch(this.patchURL + id, data, { headers: this.GetHeaders() });
  }


  DeletePartners(id, data): Observable<any> {
    return this.http.post(this.deleteURL + id, data, { headers: this.GetHeaders() });
  }
}
