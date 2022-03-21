import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { PostsService } from '../services/posts.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Post } from '../models/post';
import * as $ from 'jquery'
import { User } from '../models/user';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Legacy } from '../models/Legacy';
import { Aevum } from '../models/Aevum';
import * as M from 'materialize-css';
import { Timestamp } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent implements OnInit {

  constructor() { }

  startMsg: string ="Use this method of Writing to Release the inner turmoil."
  writtenPassage: string= "";

  // Submenu buttons
  subMenu = [
    {name: "Tag Users", icon: "account_circle", param: "TAG"},
    {name: "Add Img Cover", icon: "add_a_photo", param: "IMG_COVER"},
    {name: "Save Progress", icon: "book", param: "SAVE"},
    {name: "Submit Post", icon: "send", param: "POST"}
  ]

  //On Initialization
  ngOnInit(): void {
  }

  //After initialization (Listener?)
  ngAfterViewInit(){
    const textarea = document.querySelector("textarea");

    textarea!.addEventListener("keydown", (e) => {
      if (e.keyCode === 9) {
        e.preventDefault();

        textarea!.setRangeText(
          "     ",
          textarea!.selectionStart,
          textarea!.selectionStart,
          "end"
        );
      }
    });
  
  }


  //After sub menu button clicked
  menuCall(call: string){
    switch(call)
    {
      case "TAG":
        alert("Tag Users called");
        break;
      case "IMG_COVER":
        alert("Add Image Cover called");
        break;
      case "SAVE":
        alert("Save Progress called");
        break;
      case "POST":
        alert("Submit Post called");
        break;
    }
  }

}
