import { Injectable, NgZone } from '@angular/core';
//firestore plugin 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { Post } from '../models/post';
import { Writing } from '../models/Writing';
import { timestamp } from 'rxjs';
import { Legacy } from '../models/Legacy';

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

  getUserPosts(userID: string){
    return this.fireService.collection("posts", ref => ref.where("userkey","==",userID).orderBy('timestamp','desc')).get();
  }

  getAllLegacyPosts(){
    return this.fireService.collection("Legacy", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }
  getLegacies(){
    return this.fireService.collection("Legacy", ref => ref.orderBy('updated','desc')).snapshotChanges();
  }
  getUserLegacies(userID: string){
    return this.fireService.collection("Legacy",ref => ref.where("author","==",userID)).snapshotChanges();
  }

  getUserNewMessages(userID: string){
    return this.fireService.collection("NewMessage").doc(userID).collection("NewMessage", ref => ref.orderBy("timestamp",'desc')).snapshotChanges();
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

  loadBookmarkedChapters(userKey: string, legacyID: string, chapterID: string){
    return this.fireService.collection("users").doc(userKey).collection("SavedLegacyChapters").doc(legacyID).collection("posts").doc(chapterID).snapshotChanges()
  }

  addLegacySubscriber(legacyID: string, userKey: string){
    return this.fireService.collection("Legacy").doc(legacyID).collection("followers").doc(userKey).set({
      userkey: userKey
    })

  }

  removeLegacySubscriber(legacyID: string, userKey: string){
    return this.fireService.collection("Legacy").doc(legacyID).collection("followers").doc(userKey).delete();
  }

 //Save Writing Progress
 bookmarkLegacyChapter(legacyID:string, userKey: string, chapterID: string){

  return this.fireService.collection('users').doc(userKey).collection("SavedLegacyChapters").doc(legacyID).collection("posts").doc(chapterID).set({
    chapterID: chapterID
  })
  .then(() => {
    console.log("Saved Chapter")
  })
  .catch((error)=>{
    console.log("Error Saving Chapter->" + error);
  })
}

//Save Writing Progress
unBookmarkLegacyChapter(legacyID:string, userKey: string, chapterID: string){

  return this.fireService.collection('users').doc(userKey).collection("SavedLegacyChapters").doc(legacyID).collection("posts").doc(chapterID).delete()
  .then(() => {
    console.log("Chapter unBookmarked")
  })
  .catch((error)=>{
    console.log("Error unbookmarking->" + error);
  })
}


 bookmarkLegacy(legacyID: string, userKey: string){
   return this.fireService.collection('users').doc(userKey).collection("savedLegacies").doc(legacyID).set({
     legacyID: legacyID
   }).then(()=>{
     M.toast({html: "Legacy Bookmarked"});
   }).catch((error)=> {
     M.toast({html: "Error Saving Legacy: " + error});
   })
 }

 unBookmarkLegacy(legacyID: string, userKey: string){
   return this.fireService.collection('users').doc(userKey).collection("savedLegacies").doc(legacyID).delete().then(()=>{
     M.toast({html: "Legacy removed from bookmarks"});
   }).catch((error)=> {
     M.toast({html: "Error Saving Legacy: " + error});
   })
 }

 loadBookmarkedLegacies(userID: string){
  return this.fireService.collection("users").doc(userID).collection("SavedLegacies").snapshotChanges()
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

  editLegacyPost(data: Post, legacyID: string, legacyPostID: string){
    return this.fireService.collection("Legacy").doc(legacyID).collection("posts").doc(legacyPostID).set(data)
    .then(()=>{
      console.log("Legacy Chapter Updated");
    })
    .catch((error) => {
        console.log("Chapter update Err: " + error);
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
  saveLegacyPost(legacyID: string,  userID: string){
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


 deleteLegacy(legacyID: string){
   return this.fireService.collection("Legacy").doc(legacyID).delete()
   .then(()=>{
     console.log("Legacy Deleted");
   }).catch((error)=> {
     console.log("Err deleting Legacy: " + error);
   })
 }

 updateLegacy(LegacyID: string, data: any){
  return this.fireService.collection("Legacy").doc(LegacyID).update(data);
}

updateLegacyPrivacy(LegacyID: string, chapterID: string, privacy: string){
  return this.fireService.collection("Legacy").doc(LegacyID).collection("posts").doc(chapterID).update({
    'privacy' : privacy
  })
}

 updateLegacyChapter(LegacyID: string, chapterID: string, data: any){
   return this.fireService.collection("Legacy").doc(LegacyID).collection("posts").doc(chapterID).update({
     "title": data['title'],
     "text": data['text'],
     "date": data['date'],
     "cover": data['cover']
   })   
 }


   //save and unsave legacy Chapters
 saveLegacyChapter(data: any, userID: string){
   console.log("LAW");
   console.log(data);
    return this.fireService.collection("users").doc(userID).collection("savedLegacyChapters").doc(data['legacyID']).collection("chapters").doc(data['chapterID']).set(data).then(()=>{
      console.log("Legacy Saved");
    }).catch((error) => {
      console.log("Error: " + error);
    })
 }
 unSaveLegacyChapter(legacyID: string, chapterID: string,  userID: string){
    return this.fireService.collection("users").doc(userID).collection("savedLegacyChapters").doc(legacyID).collection("chapters").doc(chapterID).delete().catch((error) => {
      console.log("Error: " + error);
    })
 }

 deleteLegacyChapter(LegacyID: string, chapterID: string){
   return this.fireService.collection("Legacy").doc(LegacyID).collection("posts").doc(chapterID).delete()
   .then(()=>{
      console.log("Legacy Chapter Deleted");
    }).catch((error)=> {
      console.log("Err deleting Chapter: " + error);
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




//Get the Chat for a user 

getUserChatMessages(userID: string, secondUserID: string){
  
  return this.fireService.collection("Message").doc(userID).collection(secondUserID, ref => ref.orderBy('timestamp',"desc")).snapshotChanges();
}


// getUserPosts(userID: string){
//   return this.fireService.collection("posts", ref => ref.where("userkey","==",userID).orderBy('timestamp','desc')).get();
// }




}
