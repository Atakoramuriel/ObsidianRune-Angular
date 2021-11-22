import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {
  bounceOnEnterAnimation,
  bounceInAnimation,

} from 'angular-animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    bounceInAnimation(),
  ]
})
export class LoginComponent implements OnInit {
  //Starting variables
    isLoggedIn = false;
    loginSet: boolean = true;
    registerSet: boolean = false;

  constructor(public firebaseService: FirebaseService, private router: Router){}

  //ErrorMsg
  errorMsg: String = "";
  newErrorMsg: String = "";
  state = false
  ngOnInit(): void {
    //set Error Messages to empty
    this.errorMsg = "";
    this.newErrorMsg = "";

    //Set login to true
    this.loginSet = true;

    //Run animation 
    this.toggleState();
    
    //Check to see if logged in 
    if(this.firebaseService.checkAuth == null)
    {
      //User is signed in
      this.isLoggedIn = true;
      this.router.navigateByUrl('');

    }else{
      //User is not Signed in 
      this.isLoggedIn = false;

    }
  }
  
    
    //Animation of Logo
    animation = 'bounceIn';
  
    //Log Into account
    async SignIn(email:string, password:string){
     
      if(email.length != 0 && password.length != 0){
        this.firebaseService.signIn(email, password)
        .catch(error =>{ 
          this.errorMsg = error
        });
      }else{
        this.errorMsg = "Fill in Both Email and Password";
      }
    }

    //Create new account
    async SignUp(email: string, password:string, confirmPassword:string){
      if(password == confirmPassword){
        //Passwords match, continue
         this.firebaseService.createUser(email,password)
     
      }else{
        //Change error message to show passwords do not match 
        this.newErrorMsg = "Passwords do not match";
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
