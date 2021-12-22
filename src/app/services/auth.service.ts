import { Injectable } from '@angular/core';

//firestore plugin 
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireService: AngularFirestore) { }

  //New Post 
  newPost(Post: unknown){
    return this.fireService.collection("posts").add(Post);
  }

  //For loading the posts in 
  getPosts(){
    return this.fireService.collection("posts", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }

  //Get Likes 
  getLikes(postID: string){
    return this.fireService.collection("posts").doc(postID).collection("Likes").get();
  }


  getUserInfo(userKey: string){
    return this.fireService.collection("users").doc(userKey).ref.get();

  }



}
