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
import { Observable, Timestamp } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Writing } from '../models/Writing';
import * as firebase from 'firebase/compat';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ChapterService } from '../services/chapter.service';


@Component({
  selector: 'app-edit-legacy',
  templateUrl: './edit-legacy.component.html',
  styleUrls: ['./edit-legacy.component.css']
})
export class EditLegacyComponent implements OnInit {
 //Importante Variables
 curentUserID: string = "";
 userData: any;
 coverImg: string = "";
 type: string = "Writing";

 //For display of the legacy Modal when creating a new one 
 displayModal: boolean = false;


 //For getting downloadLink
 imageLink: Observable<any> | undefined;
 constructor(
  private router: Router,
  private AuthService: AuthService,
  private firebaseAuth: AngularFireAuth,
  private firebase: AngularFirestore,
  private af: AngularFireStorage,
  private chapterService: ChapterService
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

 //In case user wants to post to legacy instead of OR
 legacyList = [
  {
    id: "",
    title: '',
    cover: "",
    desc: "",
    privacy: "",
    type: "",
    updated: "",
    author: "",
  },
 ];


 //Default Image
 defaultImg: string = "";
 defaultImgCover: string = "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2F%CE%95%CE%BB%CE%B5%CF%85%CC%81%CE%B8%CE%B5%CF%81%CE%B7%20%CF%83%CE%BA%CE%B5%CC%81%CF%88%CE%B7.PNG?alt=media&token=1ddf6078-d29a-4532-ab6a-026c6cd6f35d";

 defaultPostImgPath: string ="/N4Posts";
 defaultLegacyImgPath: string ="/LegacyCovers";

//Variables for new legacy post
newLegacyTitle: string = "";
newLegacyDescription: string = "";
newLegacyCover: string = "";
privacy: string = "public";

 //
 displayLegacyList: boolean = false;
 legacyListTxt: string = "Select Legacy to save to";


  //Previoius Writing Array
  previousWriting: Array<Writing> = [];

  //Live Vairables
  startMsg: string ="Begin writing to your heart's content"
  newTitle: string = "";
  writtenPassage: string= "";
  imageCover:string = "";


//For assistance in showing modal 
 modalActive: boolean = false;

//Show Previous Menu
   prevWriting: boolean = false;



  tempID: string = "";
  savedProgress: boolean = false;
  timeSaved: string = "";
  timeStamp: string = new Date() as unknown as string;
  username: string = "";
  userProfileImg: string = "";

  //Variables for uploading files
  filePath: string = "";
  imageUploaded: boolean = false;
  downloadLink: string = "";

  //For Error Messages
  showErrMsg: boolean = false;

  //For modal 
  preSelection: boolean = false;


  //For Data import management
  legacyID: string = "";
  chapterID: string = "";
  chapterData: any;
  dataValue: any;

//New Data for editing
  Entries: string = "";
  Readers: string = "";
  Likes: string = "";
  desc: string = "";
  author: string = "";
  cover: string ="";
  title: string = "";

  //For File uploads
  upload($event: any){

    //upload and get event
    console.log("Upload function Called. . .")

    //get the file path 
    this.filePath = $event.target.files[0];
    var fileName = $event.target.files[0].name;
    //Test console of firepath 
    console.log(this.filePath);
    console.log($event.target.files[0].name);

    this.uploadFile(fileName);
  }

  uploadFile(fileName: string) {
    //Test console output 
    console.log("UploadFile Called. . .")

    
    //upload file 
    console.log("Attempting upload to firebase ")

    var fullPath = this.defaultLegacyImgPath + "/" + this.userData['uid'] + "/" + fileName;

    //Place file within Firebase Storage
    var uploadTask = this.af.upload(fullPath, this.filePath)

    var fileRef = this.af.ref(fullPath);
    
    //Get the percentage of the upload progress
    var uploadPercent = uploadTask.percentageChanges();
    
    //Find out when download URL is available
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.imageLink = fileRef.getDownloadURL();
        this.imageLink.subscribe(url => {
          this.downloadLink = url;
        })
        this.setImage();
        this.imageUploaded = true;
      })
    )
    .subscribe();
  }

  //Basic idea is... get the image from the cloud
  setImage(){
      //Set the upload link to true
      this.imageUploaded = true;
  }


  //On Initialization
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.tempID = this.AuthService.generateID();

  
    
    this.dataValue = sessionStorage.getItem('chapterData');

    if(this.dataValue){    
      // console.log("DValue: below");
      // console.log(this.dataValue); //Returns full data


      // console.log("CData: below");
      // console.log(this.chapterData);   //Returns undefined

      this.chapterData = JSON.parse(sessionStorage.getItem('chapterData')!);  
      this.writtenPassage = this.chapterData['text'];
      this.coverImg = this.chapterData['cover']
      this.newTitle = this.chapterData['title'];
      this.legacyID = this.chapterData['LegacyId']
      this.chapterID = this.chapterData['id']; 
      
    
  
  

    }else{    
          // console.log(this.chapterService.chapter['title'])
    this.chapterData = this.chapterService.chapter;
    console.log("CData: below");
    console.log(this.chapterData);
      this.writtenPassage = this.chapterData['text'];
      this.coverImg = this.chapterData['cover']
      this.newTitle = this.chapterData['title'];
      
      this.legacyID = this.chapterData['LegacyId']
      this.chapterID = this.chapterData['id']; 
      
 
    }

    //Date
    var currentdate = new Date().toLocaleString();
  
    this.timeSaved = currentdate
    this.username = this.userData['displayName'] as string;
    this.userProfileImg = this.userData['photoURL'] as string;
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

 

  //updateCSS
  adjustHeight(){

    //lower the top size
    document.getElementById('textRow')?.setAttribute("position","fixed");
    document.getElementById('textRow')?.setAttribute("top","5%");
    document.getElementById('textRow')?.setAttribute("width","100%");
   
    //Increase the height of the written passage
      document.getElementById('writtenPassage')?.setAttribute("style","height: 750px");
      document.getElementById('writtenPassage')?.setAttribute("style","max-height: 750px");


  }

  swapPrivacy(){
    if(this.privacy == "public"){
      this.privacy = "private";
    }else{
      this.privacy = "public";
    }
  }


  setWriting(post: Writing){
    //Set the writing to the one selected
    this.newTitle = post['title'] as string;
    this.writtenPassage = post['text'] as string;

    //Set the value of tempID
    this.tempID = post.id as string

  }


  //Save to Pre-Existing Legacy 
  updateLegacy(legacyID: string){
   
      //Structure data to be posted
      const postData = {
        author: this.userData['uid'],
        cover: this.imageUploaded==false ? this.downloadLink : this.defaultImgCover,
        date: this.timeSaved,
        privacy: this.privacy,
        text: this.writtenPassage,
        timestamp: this.timeStamp,
        title: this.newTitle,
      }
      //Call to the Function 
      this.AuthService.updateLegacy(legacyID,postData)
      .then(()=>{
        M.toast({html: "Saved to Legacy"});
      })

  }



 
 
  validate(){
    if(this.newTitle == null || this.newTitle == ""){
      alert("Must fill in Title");
      return false;
    }else if(this.writtenPassage == null || this.writtenPassage == ""){
      alert("You have to write something before you post... ");
      return false;
    }else {
      return true;
    }
  }

}
