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
      alert("Signed In Reached");
      if(email.length != 0 && password.length != 0){
        alert("Email: " + email.length
        )
        alert("If Statement Reached")
        return this.firebaseService.signIn(email, password);
      }else{
        this.errorMsg = "Fill in Both Email and Password"
      }
      


    }

}
