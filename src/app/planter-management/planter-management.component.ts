import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { PlanterService } from '../services/planter.service';

@Component({
  selector: 'app-planter-management',
  templateUrl: './planter-management.component.html',
  styleUrls: ['./planter-management.component.css']
})
export class PlanterManagementComponent implements OnInit {
  userConnected;
  dtTrigger: Subject<any> = new Subject<any>();
  isLoading = {
    create : false,
    data : true,
    modify : false,
    close : false
  };
  error = {
    create: false,
    data: false,
    modify: false,
    close: false
  };
  planter = {
    nom : '',
    prenom : '',
    adresse : '',
    contact : '',
    sexe : '',
    date_naissance : '',
    email : '',
    num_piece : '',
    piece_scan : '',
  };
  planters;
  plantersFictious;
  plantersClosed = {
    id: '',
    motif: ''
  };
  pieceScan;
  right;
  rightState = {
    create: 0,
    delete: 0,
    read: 0,
    update: 0
  };
  constructor(private router: Router, private userService: AuthService,
              private location: Location, private planterService: PlanterService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetPlanters();
    this.getRight();
  }

  getRight() {
    this.right = JSON.parse(localStorage.getItem('right'));
    let createCounter = 0;
    let readCounter = 0;
    let updateCounter = 0;
    let deleteCounter = 0;
    this.right.forEach(element => {
      if (element.libelle === 'finances' || element.libelle === 'manager') {
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

  ComeBack() {
    this.location.back();
  }


  Logout() {
    if (this.userService.Logout()) {
      this.router.navigateByUrl('/');
    }
  }

  goToProfile(id) {
    this.router.navigateByUrl('/home/(child1:planter-profil/' + id + ';open=true)');
  }

  OnFileSelected(event) {
    console.log('Upload files ...');
    const files = <File>event.target.files[0];
    if (files) {
      const file = files;
      this.convertToBase64(file);
    }
  }

  OnFileSelectedInUpload(event) {
    console.log('Upload files ...');
    const files = <File>event.target.files[0];
    if (files) {
      const file = files;
      this.convertToBase64_2(file);
    }
  }

  convertToBase64_2(file: File) {
    const observable =  new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe( (d) => {
      this.plantersFictious.piece_scan = d;
      console.log(d);

    });
  }

  convertToBase64(file: File) {
    const observable =  new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe( (d) => {
      this.planter.piece_scan = d;
      console.log(d);

    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  GetPlanters() {
    this.error.data = false;
    this.planterService.GetPlanter().subscribe(
      (data) => {
        console.log(data);
        this.planters = data.data;
        this.isLoading.data = false;
        this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.error.data = true;
      }
    );
  }

  CreatePlanter(event) {
    this.isLoading.create = true;
    this.error.create = false;
    this.planterService.SetPlanter(this.planter).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.create = false;
        this.error.create = true;
      }
    );
  }

  OpenModalUpdate(object) {
    this.plantersFictious = object;
    console.log(this.plantersFictious);

  }

  OpenModalDelete(id) {
    this.plantersClosed.id = id;
  }

  OpenModelImage(id) {
    this.pieceScan = null;
    this.planterService.GetPieceScanPlanter(id).subscribe(
      (data) => {
        console.log(data);
        this.pieceScan = data.data.piece_scan;
      }, (err) => {
        console.log(err);
      }
    );
  }

  UpdatePlanter(event) {
    this.isLoading.modify = true;
    this.error.modify = false;
    this.planterService.UpdatePlanter(this.plantersFictious.id, this.plantersFictious).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.modify = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.modify = false;
        this.error.modify = true;
      }
    );
  }

  DeletePlanter(event) {
    this.isLoading.close = true;
    this.error.close = false;
    this.planterService.DeletePlanter(this.plantersClosed.id, { motif: this.plantersClosed.motif }).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.close = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.close = false;
        this.error.close = true;
      }
    );
  }


}
