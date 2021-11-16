import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  //Starting variables
    isLoggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth) { }

  //Handle The Sign in 
  async signIn(email: string, password: string){

    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res => {
      alert("Signed In")
      //user is now logged in 
      this.isLoggedIn = true;
      localStorage.setItem("user",JSON.stringify(res.user))
    })
    .catch((error)=>{
      alert("unable to sign in ");
      console.log("Err: " + error)
    })
  }

   //Handle The Sign in 
   async createUser(email: string, password: string){
    this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res => {
      //user is now logged in 
      this.isLoggedIn = true;
      localStorage.setItem("user",JSON.stringify(res.user))
    })
  }

  //Handle Sign Out 
  async signOut(){
    this.firebaseAuth.signOut();
    localStorage.removeItem("user");
  }
}
