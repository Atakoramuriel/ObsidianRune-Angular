import { Injectable } from '@angular/core';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post'
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

//Open
// import {
//   collection,
//   doc,
//   docData,
//   DocumentReference,
//   CollectionReference,
//   Firestore,
//   onSnapshot,
//   query,
//   where,
//   Unsubscribe,
//   Query,
//   DocumentData,
//   collectionData,
//   collectionChanges,
//   docSnapshots,

// } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  // userDoc;
  
  constructor() { 
    //OPEN
    // this.userDoc = db.firestore.collection('posts');

  }

    getUserPosts(){

    //   this.userDoc.get().then((querySnapshot) => { 
    //     querySnapshot.forEach((doc) => {
    //          console.log(doc.id, "=>", doc.data());  
    //     })
    //  })
 
    }

}
