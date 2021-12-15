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

  getPosts(){
    return this.fireService.collection("posts", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }

}
