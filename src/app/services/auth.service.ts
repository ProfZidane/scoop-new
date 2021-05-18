import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
loginURL = environment.endPoint + 'login';
registerURL = environment.endPoint + 'register';
getURL = environment.endPoint + 'getAllUsers';
updateURL = environment.endPoint + 'updateCompte/';
deleteURL = environment.endPoint + 'compteClosed/';
getRightById = environment.endPoint + 'getDroitsUser/';
assignURL = environment.endPoint + 'addDroit';
logoutURL = environment.endPoint + 'logout';
villeURL = environment.endPoint + 'parametre/ville';
testLogin = {
  email : 'admin@gmail.com',
  password : '1111'
};
right;

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
  Register(data): Observable<any> {
    return this.http.post(this.registerURL, data, { headers: this.GetHeaders() });
  }

  Login(data): Observable<any> {
    return this.http.post(this.loginURL, data);
  }

  Logout() {
    if (localStorage.getItem('token') !== null) {
      this.http.post(this.logoutURL, { headers: this.GetHeaders() });
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      return true;
    } else {
      return false;
    }
  }

  GetAllUsers(): Observable<any> {
    return this.http.get(this.getURL, { headers: this.GetHeaders() });
  }


  UpdateUser(id, data): Observable<any> {
    return this.http.post(this.updateURL + id, data, { headers: this.GetHeaders() });
  }


  DeleteUser(id, data): Observable<any> {
    return this.http.post(this.deleteURL + id, data,  { headers: this.GetHeaders() });
  }


  GetRight() {
    if (localStorage.getItem('right') !== null) {
      this.right = JSON.parse(localStorage.getItem('right'));
      return this.right;
    } else {
      return 0;
    }
  }

  GetRightById(id): Observable<any> {
    return this.http.get(this.getRightById + id, { headers: this.GetHeaders() });
  }

  AssignRight(data): Observable<any> {
    return this.http.post(this.assignURL, data, { headers: this.GetHeaders() });
  }

  GetParametre(): Observable<any> {
    return this.http.get(this.villeURL, { headers: this.GetHeaders() });
  }

  SetParametre(city): Observable<any> {
    return this.http.post(this.villeURL, city, { headers: this.GetHeaders() });
  }
}
