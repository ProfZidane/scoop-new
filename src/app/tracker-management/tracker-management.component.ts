import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { TrackerService } from '../services/tracker.service';

@Component({
  selector: 'app-tracker-management',
  templateUrl: './tracker-management.component.html',
  styleUrls: ['./tracker-management.component.css']
})
export class TrackerManagementComponent implements OnInit {
userConnected;
dtTrigger: Subject<any> = new Subject<any>();
isLoading = {
  create : false,
  data : true,
  modify : false,
  close : false
};
error = false;
errorLoading = false;
errorModify_error = false;
errorClosed = false;
trackerInfo = {
  nom : '',
  prenom : '',
  adresse : '',
  contact : '',
  sexe : '',
  date_naissance : '',
  email : '',
  piece : '',
  piece_scan : '',
  status : 'Choisir un status...'
};
trackerFictious;
file: File = null;
trackers;
myimage;
imageName;
motif;
id_pisteur;
detailPiece = {
  id : '',
  image : ''
};
pieceJointeUpdate;
right;
  rightState = {
    create: 0,
    delete: 0,
    read: 0,
    update: 0
  };
  constructor(private router: Router, private userService: AuthService,
              private location: Location, private trackerService: TrackerService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData') !== null) {
      this.userConnected = JSON.parse(localStorage.getItem('userData'));
    }
    this.GetTracker();
    this.getRight();
  }

  getRight() {
    this.right = JSON.parse(localStorage.getItem('right'));
    let createCounter = 0;
    let readCounter = 0;
    let updateCounter = 0;
    let deleteCounter = 0;
    this.right.forEach(element => {
      if (element.libelle === 'finances' || element.libelle === 'manager' || element.libelle === 'stocks') {
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

  OnFileSelected(event) {
    console.log('Upload files ...');
    const files = <File>event.target.files[0];
    if (files) {
      this.file = files;
      this.convertToBase64(this.file);
    }
  }

  OnFileSelectedInUpload(event) {
    console.log('Upload files ...');
    const files = <File>event.target.files[0];
    if (files) {
      const file = files;
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const observable =  new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe( (d) => {
      this.myimage = d;
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

  OnFileSelected2(event) {
    console.log('Upload files ...');
    const files = <File>event.target.files[0];
    if (files) {
      const file = files;
      this.convertToBase642(file);
    }
  }

  convertToBase642(file: File) {
    const observable =  new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe( (d) => {
      this.pieceJointeUpdate = d;
      console.log(d);
    });
  }

  GetTracker() {
    this.errorLoading = false;
    this.trackerService.GetTrackers().subscribe(
      (data) => {
        console.log(data);
        this.trackers = data.data;
        this.dtTrigger.next();
        this.isLoading.data = false;
      }, (err) => {
        console.log(err);
        this.isLoading.data = false;
        this.errorLoading = true;
      }
    );
  }

  CreateTracker(event) {
    this.error = false;

    // console.log(this.trackerInfo);
    // console.log(this.file);

    const data = {
      nom : this.trackerInfo.nom,
      prenom : this.trackerInfo.prenom,
      adresse : this.trackerInfo.adresse,
      contact : this.trackerInfo.contact,
      sexe : this.trackerInfo.sexe,
      date_naissance : this.trackerInfo.date_naissance,
      email : this.trackerInfo.email,
      num_piece : this.trackerInfo.piece,
      piece_scan : this.myimage,
      status : this.trackerInfo.status,
    };
    this.isLoading.create = true;
    this.trackerService.SetTrackers(data).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.create = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.create = false;
        this.error = true;
      }
    );
  }

  OpenModelUpdated(object) {
    this.trackerFictious = object;
    console.log(this.trackerFictious);
  }

  Updatetracker(event) {
    this.isLoading.modify = true;
    this.errorModify_error = false;
    this.trackerFictious.piece_scan = this.pieceJointeUpdate;
    console.log(this.trackerFictious);
    this.trackerService.UpdateTrackers(this.trackerFictious, this.trackerFictious.id).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.modify = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.modify = false;
        this.errorModify_error = true;
      }
    );
  }

  OpenModelDelete(id) {
    this.id_pisteur = id;
    console.log(this.id_pisteur);
  }

  ClosedTracker(event) {
    this.isLoading.close = true;
    this.errorClosed = false;
    console.log(this.motif);
    this.trackerService.DeleteTrackers(this.id_pisteur, { motif : this.motif }).subscribe(
      (success) => {
        console.log(success);
        this.isLoading.close = false;
        window.location.reload();
      }, (err) => {
        console.log(err);
        this.isLoading.close = false;
        this.errorClosed = true;
      }
    );
  }


  OpenModelImage(id) {
    console.log(id);
    this.detailPiece.image = '';
    this.detailPiece.id = id;
    this.trackerService.GetImageTracker(id).subscribe(
      (data) => {
        console.log(data);
        this.detailPiece.image = data.data.piece_scan;
      }, (err) => {
        console.log(err);
      }
    );
  }

  goToProfile(id) {
    this.router.navigateByUrl('/home/(child1:tracker-profile/' + id + ';open=true)');
  }

}
