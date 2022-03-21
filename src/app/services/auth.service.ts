import { Injectable, NgZone } from '@angular/core';
//firestore plugin 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData: any;
  constructor(
    public fireService: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone) 
    { 
  // Setting logged in user in localstorage else null
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
  }
  
    
   // Returns true when user is looged in and email is verified
   get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user == null ? false : true;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['user-profile']);
        });
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['Login']);
    });
  }

    

  //New Post 
  newPost(Post: unknown){
    return this.fireService.collection("posts").add(Post);
  }

  

  //For loading the posts in 
  getPosts(){
    return this.fireService.collection("posts", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }

  getLegacies(){
    return this.fireService.collection("Legacy", ref => ref.orderBy('updated','desc')).snapshotChanges();
  }

  getAevum(){
    return this.fireService.collection("Aevum", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }

  loadLegacy(legacyID: string){
    return this.fireService.collection("Legacy").doc(legacyID).ref.get();
  }

  getLegacyPosts(legacyID: string){
    return this.fireService.collection("Legacy").doc(legacyID).collection("posts").snapshotChanges();

  }


  getLikesCount(postID: string){
    var count;
    return this.fireService.collection("posts").doc(postID).collection("Likes").get();
  
  }


  //Add likes to post

  likePost(postID: string, userID: string){
    return this.fireService.collection("posts").doc(postID).collection("Likes").doc(userID).set({
      'Liked':"Liked"
    }).then(()=>{
      console.log("Done");
    }).catch((error) => {
      console.log("Error: " + error);
    })
 }
 unLikePost(postID: string, userID: string){
    return this.fireService.collection("posts").doc(postID).collection("Likes").doc(userID).delete().catch((error) => {
      console.log("Error: " + error);
    })
 }


  //Add likes to legacy
  likeLegacyPost(legacyID: string, userID: string){
     return this.fireService.collection("Legacy").doc(legacyID).collection("Likes").doc(userID).set({
       'Liked':"Liked"
     }).then(()=>{
       console.log("Done");
     }).catch((error) => {
       console.log("Error: " + error);
     })
  }
  unLikeLegacyPost(legacyID: string, userID: string){
     return this.fireService.collection("Legacy").doc(legacyID).collection("Likes").doc(userID).delete().catch((error) => {
       console.log("Error: " + error);
     })
  }

  saveLegacyPost(legacyID: string, userID: string){
     return this.fireService.collection("users").doc(userID).collection("savedLegacys").doc(legacyID).set({
       'LegacyID':legacyID
     }).then(()=>{
       console.log("Legacy Saved");
     }).catch((error) => {
       console.log("Error: " + error);
     })
  }
  unSaveLegacyPost(legacyID: string, userID: string){
     return this.fireService.collection("users").doc(userID).collection("savedLegacys").doc(legacyID).delete().catch((error) => {
       console.log("Error: " + error);
     })
  }

  addLegacyFollower(legacyID: string, userID: string){
      return this.fireService.collection("Legacy").doc(legacyID).collection("Readers").doc(userID).set({
        "userKey": userID
      })
  }
  removeLegacyFollower(legacyID: string, userID: string){
      return this.fireService.collection("Legacy").doc(legacyID).collection("Readers").doc(userID).delete();
  }
  addLegacyLike(legacyID: string, userID: string){
      return this.fireService.collection("Legacy").doc(legacyID).collection("Likes").doc(userID).set({
        "userKey": userID
      })
  }
  removeLegacyLike(legacyID: string, userID: string){
      return this.fireService.collection("Legacy").doc(legacyID).collection("Likes").doc(userID).delete();
  }
 

  getLegacyLikes(legacyID: string){
    return this.fireService.collection("Legacy").doc(legacyID).collection("Likes").snapshotChanges();
  }

  
  getLegacySaves(legacyID: string,userID: string){
    return this.fireService.collection("users").doc(userID).collection("savedLegacys").snapshotChanges();
  }


  //Get Likes 
  getLikes(postID: string){
    return this.fireService.collection("posts").doc(postID).collection("Likes").snapshotChanges();
  }


  getUserInfo(userKey: string){
    return this.fireService.collection("users").doc(userKey).ref.get();

  }



}
