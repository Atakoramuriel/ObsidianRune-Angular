import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(public firebaseService: FirebaseService){}

  //ErrorMsg
  errorMsg: String = "";

  ngOnInit(): void {
    //set Error Message to empty
    this.errorMsg = "";

    //Check to see if logged in 
    if(localStorage.getItem("user")!== null){
      // this.isLoggedIn = true;
    }else{
      // this.isLoggedIn = false;
    }
  }

    //Log In
    async SignIn(email:string, password:string){
      return this.firebaseService.signIn(email, password);


    }

}
