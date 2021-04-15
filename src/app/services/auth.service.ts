import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
loginURL = 'https://scoop-coopraca.lce-test.fr/api/login';
registerURL = 'https://scoop-coopraca.lce-test.fr/api/register';
getURL = 'https://scoop-coopraca.lce-test.fr/api/getAllUsers';
updateURL = 'https://scoop-coopraca.lce-test.fr/api/updateCompte/';
deleteURL = 'https://scoop-coopraca.lce-test.fr/api/compteClosed/';
testLogin = {
  email : 'admin@gmail.com',
  password : '1111'
};
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
}
