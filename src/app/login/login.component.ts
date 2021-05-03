import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userInfo = {
  email : '',
  password : ''
};
loading;
error = {
  error_404 : false,
  text: ''
};
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = false;
    this.error.error_404 = false;
    console.log(this.userInfo);
    this.authService.Login(this.userInfo).subscribe(
      (success) => {
        console.log(success);
        localStorage.setItem('token', success.token);
        localStorage.setItem('userData', JSON.stringify(success.user));
        localStorage.setItem('right', JSON.stringify(success.droits));
        setTimeout( () => {
          this.loading = true;
          this.router.navigateByUrl('home');
        }, 1000);
      }, (err) => {
        console.log(err);

        if (err.status === 401) {
          this.error.text = 'Votre login ou mot de passe est incorrect !';
        } else if (err.status === 422) {
          this.error.text = 'Veuillez remplir toutes les informations !';
        } else {
          this.error.text = 'Une erreur est survenue. Veuillez réessayez ultérieurement !';
        }
        setTimeout( () => {
          this.loading = true;
          this.error.error_404 = true;

        }, 1000);
      }
    );
  }

}
