import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ObsidianRune';
  isLoggedIn = false;

  //Handle Constructor
  constructor(public firebaseService : FirebaseService){}

  //Initialize
  ngOnInit(){
    //Check to see if logged in 
    if(localStorage.getItem("user")!== null){
      // alert("Has User")
      // this.isLoggedIn = true;
    }else{
      // alert("No User")
      // this.isLoggedIn = false;
    }
  }

  //Functions

  //Log In
  async onSignIn(email:string, password:string){
    await this.firebaseService.signIn(email,password)
    
    if(this.firebaseService.isLoggedIn){
      this.isLoggedIn = true
    }
  }

}
