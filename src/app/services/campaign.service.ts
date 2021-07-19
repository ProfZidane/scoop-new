import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  fullURL = environment.endPoint + 'campagne';
  postURL = environment.endPoint + 'campagne';
  getFinanceURL = environment.endPoint + 'getFinancementsCampagne/';
  getPrefinanceURL = environment.endPoint + 'getPrefinancementsCampagne/';
  getAchatURL = environment.endPoint + 'getAchatsCampagne/';

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

  GetCampaign(): Observable<any> {
    return this.http.get(this.fullURL, { headers: this.GetHeaders() });
  }

  GetCampaignById(id): Observable<any> {
    return this.http.get(this.fullURL + '/' + id, { headers: this.GetHeaders() });
  }

  SetCampagne(data): Observable<any> {
    return this.http.post(this.postURL, data, { headers: this.GetHeaders() });
  }

  UpdateCampaign(id, data): Observable<any> {
    return this.http.patch(this.fullURL + '/' + id, data, { headers: this.GetHeaders() });
  }

  GetPrefinancementByCampaign(id): Observable<any> {
    return this.http.get(this.getPrefinanceURL + id, { headers: this.GetHeaders() });
  }

  GetFinancementByCampaign(id): Observable<any> {
    return this.http.get(this.getFinanceURL + id, { headers: this.GetHeaders() });
  }

  GetAchatByCampaign(id): Observable<any> {
    return this.http.get(this.getAchatURL + id, { headers: this.GetHeaders() });
  }
}
