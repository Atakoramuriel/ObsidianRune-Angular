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
import { Writing } from '../models/Writing';
import * as firebase from 'firebase/compat';



@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent implements OnInit {

  //Importante Variables
  curentUserID: string = "";
  userData: any;
  coverImg: string = "";
  type: string = "Writing";

  constructor(
    private AuthService: AuthService,
    private firebaseAuth: AngularFireAuth,
    private firebase: AngularFirestore
  ) {

    //Get Current User Info
    this.firebaseAuth.authState.subscribe((user) =>{
      if(user){
        this.userData = user;
        
        localStorage.setItem('userData', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('userData')!);
      }else {
        localStorage.setItem('userData','null');
        JSON.parse(localStorage.removeItem('userData')!);
      }

    })

   }

  //Previoius Writing Array
  previousWriting: Array<Writing> = [];

  //Live Vairables
  startMsg: string ="Begin writing to your heart's content"
  newTitle: string = "";
  writtenPassage: string= "";

//Show Previous Menu
   prevWriting: boolean = false;


  // Submenu buttons
  displaySubMenu: boolean = false;
  subMenu = [
    {name: "Tag Users", icon: "account_circle", param: "TAG"},
    {name: "Add Img Cover", icon: "add_a_photo", param: "IMG_COVER"},
    {name: "Save Progress", icon: "book", param: "SAVE"},
    {name: "Submit Post", icon: "send", param: "POST"},
    {name: "Delete Post", icon: "clear", param: "DELETE"},
  ]
  tempID: string = "";
  timeSaved: string = "";

  //On Initialization
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.tempID = this.AuthService.generateID();

    //Grab previous writings
    this.loadPreviousWriting();

    //Date
    var currentdate = new Date().toLocaleString();
  
    this.timeSaved = currentdate

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

  setWriting(post: Writing){
    //Set the writing to the one selected
    this.newTitle = post['title'] as string;
    this.writtenPassage = post['text'] as string;

    //Set the value of tempID
    this.tempID = post.id as string

  }


  loadPreviousWriting(){
    this.AuthService.fetchWritingProgress(this.userData['uid']).subscribe((data)=>{
      this.previousWriting = [];

      data.map(e => {
        const data = e.payload.doc.data() as Writing

        const dataUpload = {
          id: e.payload.doc.id,
          title: data.title as string,
          text: data.text as string,
          prev: data.text as string,
          date: data.date as string
        }


        //Set Prev Value       
        dataUpload['prev'] = dataUpload['prev'] + "...";

        //Push to previous writing array
        this.previousWriting.push(dataUpload);

        //Show menu
        this.prevWriting = true;
      })
    });

  }

  //save the progress but not working 
  saveProgress(){
    if(this.tempID == ""){
      this.tempID = this.AuthService.generateID();
      
      const postData = {
        title: this.newTitle,
        text: this.writtenPassage,
        userkey: this.userData['uid'],
        date: this.timeSaved,


      } as Writing
      //Call to the Function 
      this.AuthService.saveWritingProgress(postData, this.userData['uid'], this.tempID)
    }else{
      const postData = {
        title: this.newTitle,
        text: this.writtenPassage,
        userkey: this.userData['uid'],
        date: this.timeSaved,
      
      } as Writing
      this.AuthService.saveWritingProgress(postData, this.userData['uid'], this.tempID)
      M.toast({html: "Progress Saved"});
    }
    // this.AuthService.saveWritingProgress()
  }

  //Delete The writing progress
  deleteProgress(){
    if(this.tempID != ""){
      console.log("Deleting")
      this.AuthService.deleteWritingProgress(this.userData['uid'], this.tempID);
    }else{
      console.log(this.tempID)
    }
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
        this.saveProgress()
        
        break;
      case "POST":
        alert("Submit Post called");
        break;
      case "DELETE":
        //Clean up everything
        this.newTitle = "";
        this.writtenPassage = "";
        //Delete Pending
        this.deleteProgress()
        break;
    }
  }

}
