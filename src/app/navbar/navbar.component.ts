import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //Starting variables
  Auth:boolean = false;

  constructor(public firebaseService: FirebaseService) {
    let notes: String[];
   }

  ngOnInit(): void {
    let notes: String[];
    this.checkAuth();
  }

  //Check authentication
  async checkAuth(){
     if(this.firebaseService.createUser != null){
       this.Auth = true;
     }
  }

}
