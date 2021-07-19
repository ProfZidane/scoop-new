import { Component, OnInit } from '@angular/core';
import { LogServiceService } from '../services/log-service.service';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-management',
  templateUrl: './log-management.component.html',
  styleUrls: ['./log-management.component.css']
})
export class LogManagementComponent implements OnInit {
  userConnected;
  right;
  rightState = {
    create: 0,
    delete: 0,
    read: 0,
    update: 0
  };
  isLoading = {
    data : true,
    create : false,
    modify: false,
    close: false
  };
  error = {
    data : false,
    create : false,
    modify: false,
    close: false
  };
  loggers = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  constructor(private logService: LogServiceService, private router: Router, private userService: AuthService,
              private location: Location) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.getLog();
    this.getRight();

  }

  getRight() {
    this.right = JSON.parse(localStorage.getItem('right'));
    let createCounter = 0;
    let readCounter = 0;
    let updateCounter = 0;
    let deleteCounter = 0;
    this.right.forEach(element => {
      if (element.libelle === 'administration' || element.libelle === 'manager') {
        if (element.create === 1) {
          createCounter += 1;
        }

        if (element.read === 1) {
          readCounter += 1;
        }

        if (element.update === 1) {
          updateCounter += 1;
        }

        if (element.delete === 1) {
          deleteCounter += 1;
        }
      }
    });

    console.log(createCounter);
    console.log(readCounter);


    if (createCounter >= 1) {
      this.rightState.create = 1;
    }
    if (readCounter >= 1) {
      this.rightState.read = 1;
    }
    if (updateCounter >= 1) {
      this.rightState.update = 1;
    }
    if (deleteCounter >= 1) {
      this.rightState.delete = 1;
    }

    console.log(this.rightState);

  }

  getLog() {
    this.isLoading.data = true;
    this.error.data = false;
    this.logService.geLogs().subscribe(
      (data) => {
        console.log(data);
        data.data.forEach(element => {
          const divModel = element.model_impacted.split('\\');

          this.loggers.push({
              request_type : element.request_type,
                model_impacted : divModel[2],
                user_name_action : element.user_name_action,
                user_email_action : element.user_email_action,
                user_role_action : element.user_role_action,
                date_action : element.date_action
          });
        });

        console.log(this.loggers);
        this.isLoading.data = false;
        this.error.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

}
