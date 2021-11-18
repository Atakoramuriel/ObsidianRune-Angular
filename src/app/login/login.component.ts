import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {
  bounceOnEnterAnimation,
  bounceInAnimation,

} from 'angular-animations';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    bounceInAnimation(),
    
   
  ]
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(public firebaseService: FirebaseService){}

  //ErrorMsg
  errorMsg: String = "";
  state = false
  ngOnInit(): void {
    //set Error Message to empty
    this.errorMsg = "";

    //Run animation 
    this.toggleState();
    
    

    //Check to see if logged in 
    if(localStorage.getItem("user")!== null){
      // this.isLoggedIn = true;
    }else{
      // this.isLoggedIn = false;
    }
  }
  
    
    //Animation of Logo
    animation = 'bounceIn';
  
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

    //For animations
  animationState = true;
  animationWithState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 109);
  }

  toggleState() {
    this.state = !this.state;
   
  }


}
