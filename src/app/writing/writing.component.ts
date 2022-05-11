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

  //For display of the legacy Modal when creating a new one 
  displayModal: boolean = false;


  //For getting downloadLink
  imageLink: Observable<any> | undefined;

  constructor(
    private AuthService: AuthService,
    private firebaseAuth: AngularFireAuth,
    private firebase: AngularFirestore,
    private af: AngularFireStorage
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


  // Submenu buttons
  displayNavTool: boolean = true;
  displaySubMenu: boolean = false;
  displayPostMenu: boolean = false;
  subMenu = [
    // {name: "Tag Users", icon: "account_circle", param: "TAG"},
    // {name: "Add Img Cover", icon: "add_a_photo", param: "IMG_COVER"},
    // {name: "Save Progress", icon: "book", param: "SAVE"},
    // {name: "Submit Post", icon: "send", param: "POST"},
    {name: "Delete Post", icon: "clear", param: "DELETE"},
  ]

  postMenu = [
    {name: "Legacy", icon: "book", param: "LEGACY"},
    {name: "Obsidian Rune", icon: "brightness_2", param: "OBSIDIAN"},
    // {name: "Cancel", icon: "close", param: "CANCEL"},
    
  ]
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

  testOpen(){
    // alert("Open");
  }

  testClose(){
    // alert("Close");
        //Close the modal
    // this.displayModal = false;
    if(this.preSelection){
      this.preSelection = false;
    }else{
      // alert("Close Modal");
      this.displayModal=false
    }
  }

  //On Initialization
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.tempID = this.AuthService.generateID();

  

    //Grab previous writings
    this.loadPreviousWriting();
  

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

  //Save to Pre-Existing Legacy 
  saveLegacy(legacyID: string){
   
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
      this.AuthService.newLegacyPost(postData, legacyID)
      .then(()=>{
        M.toast({html: "Saved to Legacy"});
      })

  }

  newLegacy(){

    if(this.newTitle.length == 0 || this.newLegacyDescription.length == 0){
        this.showErrMsg = true;
    }else if(this.newTitle == "" || this.newLegacyDescription == ""){
      this.showErrMsg = true
    }else{
    //Creation of the data object
    const postData = { 
      author: this.userData['uid'],
      cover: this.imageUploaded== true ? this.downloadLink as unknown as string : this.defaultImgCover,
      date: this.timeSaved,
      privacy: this.privacy,
      desc: this.writtenPassage,
      timestamp: this.timeStamp,
      title: this.newTitle,
      type: "Writing"
    }

    //Call to Action
    this.AuthService.newLegacy(postData)
    .then(()=>{
      M.toast({html: "New Legacy Created"});
    });

    //hide the modal
    this.displayModal = false;
    this.cleanList()
    this.displayLegacyList = true;
    }
  }

  cleanList(){
    this.legacyList.splice(0,1);
    this.legacyList = [];
  }



  savePost(){
   
      //Structure data to be posted
      const postData = {
        title: this.newTitle,
        text: this.writtenPassage,
        userkey: this.userData['uid'],
        date: this.timeSaved,
        type: this.getCount(this.writtenPassage) < 1000 ? "standard" : "Writing",
        timestamp: this.timeStamp,
        NumComments: "0",
        NumLikess: "0",
        hashtags: [],
        postImgs: null,
        post_id: this.tempID,
        username: this.userData['displayName']
      } 
      //Call to the Function 
      this.AuthService.newPost(postData,  this.tempID)
      .then(()=>{
        M.toast({html: "Posted to Obsidian"});
      })

  }
  //save the progress but not working 
  saveProgress(){
    //only save the post if the title and text are not empty
    if(this.validate()){
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
    }
 
    // this.AuthService.saveWritingProgress()
  }

  // Get the number of words in any string
  getCount(value: string){
    value = value.replace(/(^\s*)|(\s*$)/gi,"");
    value = value.replace(/[ ]{2,}/gi," ");
    value = value.replace(/\n /,"\n");
    return value.split(' ').length;
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
        this.displaySubMenu = false;
        this.displayPostMenu = true;

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

  loadLegacyPosts(){
    //Splice out legacy list's first item 
    this.legacyList.splice(0,1);
    const userID = this.userData['uid'];
    //Get the legacy posts 
    this.AuthService.getUserLegacies(userID).subscribe(data => {
      data.map(e => {
        //Format the data 
        const data = e.payload.doc.data() as Legacy;
        
        //Set up object
          const legacyData = {
            id: e.payload.doc.id,
            title: data.title as string,
            desc: data.desc as string,
            cover: ((data.cover != "")  ? data.cover as string : "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2F%CE%95%CE%BB%CE%B5%CF%85%CC%81%CE%B8%CE%B5%CF%81%CE%B7%20%CF%83%CE%BA%CE%B5%CC%81%CF%88%CE%B7.PNG?alt=media&token=1ddf6078-d29a-4532-ab6a-026c6cd6f35d"),
            author: data.author as string,
            timestamp: data.timestamp as string,
            type: data.type as string,
            privacy: data.privacy as string,
            updated: data.updated as string,
          };
          this.legacyList.push(legacyData);
      });
    });
    if(this.legacyList.length == 0){
      this.legacyListTxt = "No Legacies to save to..."
    }
  }

  //After post menu button clicked
  postMenuCall(call: string){
    switch(call)
    {
      case "LEGACY":
        //bring up legacy list 
        if(this.validate()){
            //Bring up Legacy List
            this.displayPostMenu=false;
            this.displaySubMenu=false;
            this.loadLegacyPosts();
            this.cleanList();
            this.displayLegacyList=true;
        }
        break;
      case "OBSIDIAN":
        //post to obsidian rune main
        if(this.validate()){
          this.savePost();
        }

      break;
      case "CANCEL":
        //bring up the prior menu 
        this.displayPostMenu = false;
        this.displaySubMenu = true;
        
        break;
   
    }
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
