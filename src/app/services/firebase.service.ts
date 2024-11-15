import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //Starting variables
    isLoggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth,  private router: Router) { }


  //Get username



  //CheckUserStatus
  async checkAuth(){
    alert("Called Service to CheckAuth")
    if(this.firebaseAuth.currentUser == null){
      //Signed out redirect to login page
      return false;

    }else{
      //All is well. . .
      return true
    }
  }


  //Handle The Sign in 
  async signIn(email: string, password: string)
  {

    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res => {
      //user is now logged in 
      this.isLoggedIn = true;
      localStorage.setItem("user",JSON.stringify(res.user))
      this.router.navigateByUrl('');

      
    })
    .catch((error)=>{
      console.log("Err: " + error)
    })
  }

  //GetAuth status 
  async authStatus(){
    this.firebaseAuth.onAuthStateChanged(user => {
       if(user != null){
         return true 
       }else{
         return false
       }
    })
  }

   //Handle The Sign in 
   async createUser(email: string, password: string)
   {
    this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res => {
      //user is now logged in 
      this.isLoggedIn = true;
      localStorage.setItem("user",JSON.stringify(res.user))
    })
    .catch((error)=>{
      console.log("New User Error: " + error);
      return error;
    })
  }

  //Handle Sign Out 
  async signOut()
  {
    this.firebaseAuth.signOut();
    localStorage.removeItem("user");
  }
}
