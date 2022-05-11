import { Injectable, NgZone } from '@angular/core';
//firestore plugin 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { Post } from '../models/post';
import { Writing } from '../models/Writing';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData: any;

  //More Variables
    // Variable to store shortLink from api response
    

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

  

  //For loading the posts in 
  getPosts(){
    return this.fireService.collection("posts", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }

  getLegacies(){
    return this.fireService.collection("Legacy", ref => ref.orderBy('updated','desc')).snapshotChanges();
  }
  getUserLegacies(userID: string){
    return this.fireService.collection("Legacy",ref => ref.where("author","==",userID)).snapshotChanges();
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

  //officially upload post
  newPost(data: Post, postID: string){
    return this.fireService.collection("posts").add(data)
    .then(()=>{
      console.log("Post Successful");
    })
    .catch((error) => {
        console.log("Post Err: " + error);
    })
  }
  //officially upload post
  newLegacyPost(data: Post, legacyID: string){
    return this.fireService.collection("Legacy").doc(legacyID).collection("posts").add(data)
    .then(()=>{
      console.log("Post Successful");
    })
    .catch((error) => {
        console.log("Post Err: " + error);
    })
  }

  //Officially upload Legacy
  newLegacy(data: Post){
    return this.fireService.collection("Legacy").add(data)
    .then(()=>{
      console.log("New Legacy Post Successful");
    })
    .catch((error) => {
        console.log("Post Err: " + error);
    })
  }
  
  //Save Writing Progress
  saveWritingProgress(data: Writing, userKey: string, postID: string){

    return this.fireService.collection('users').doc(userKey).collection("PendingWriting").doc(postID).set(data)
    .then(() => {
      console.log("Progress Saved")
    })
    .catch((error)=>{
      console.log("Error Saving Writing Progress ->" + error);
    })
  }

  deleteWritingProgress(userKey: string, postID: string)
  {
    return this.fireService.collection("users").doc(userKey).collection("PendingWriting").doc(postID).delete()
    .then(()=>{
      console.log("Successfully Deleted old saved writing progress");
    })
    .catch((error) => {
      console.log("Unable to delete old Writing Saved in progress -> " + error);
    })
  }

  fetchWritingProgress(userKey: string)
  {
    return this.fireService.collection("users").doc(userKey).collection("PendingWriting").snapshotChanges();
  }


  //Tag User 
  tagUser(userKey: string, tagUserKey: string, postID: string){
    return this.fireService.collection("users").doc(tagUserKey).collection("Tagged").doc(postID)
    .set({
      postID: postID,
      type: "Writing",
      from: userKey
    });
  }
  

  //Notify User
  notifyUser(userKey: string ,destUserKey: string, postID: string)
  {
    return this.fireService.collection("users").doc(destUserKey).collection("Notifications").add({
      type: "WRITING",
      date: new Date(),
      postID: postID,
      userID: userKey,
      timestamp: timestamp.toString
    })
  }

  generateID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i <= 25; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
  

  //save and unsave legacy posts
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
