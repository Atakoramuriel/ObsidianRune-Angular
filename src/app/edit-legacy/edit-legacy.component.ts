import { Component, OnInit, HostListener } from '@angular/core';
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
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-legacy',
  templateUrl: './edit-legacy.component.html',
  styleUrls: ['./edit-legacy.component.css']
})
export class EditLegacyComponent implements OnInit {

  //Starting Variables
  showMenuBtn: boolean = false;
  serviceMenu: boolean = false;
  themeMenu: boolean = false;
  authorMenu: boolean = false;
  privacyMenu: boolean = false;
  deletionMenu: boolean = false;
  editingWork: boolean = true;
  currentPrivacy: string = ""; //This will update

  //Area For Cards

  serviceAuthorCards = [    
    {
      title: "Change Privacy",
      desc: "Change Privacy settings for chapter",
      icon: "visibility",
      action:"PRIVACY"
    },
    {
      title: "Submit",
      desc: "upload this entry",
      icon: "create",
      action: "EDIT"
    },  
  ]

  deletionCards = [
    {
      title: "Delete Chapter?",
      desc: "This action cannot be undone.",
      icon: "delete_forever",
      action:"DELETE"
    },
    {
      title: "Cancel",
      desc: "Return to Author's menu",
      icon: "cancel",
      action:"CANCEL"
    }
  ]

  authorPrivacyCards = [
    {
      title: "Public",
      desc: "Anyone can read this chapter",
      icon: "visibility",
      action: "PUBLIC"
    },    
    {
      title: "Private",
      desc: "Only you can read this chapter",
      icon: "visibility_off",
      action:"PRIVATE"
    },
    {
      title: "Cancel",
      desc: "return to author's menu",
      icon: "cancel",
      action:"CANCEL"
    },

  ]


  serviceCards = [
    {
      title: "Cover Image",
      desc: "Select Image as cover for entry",
      icon: "image",
      action: "THEME"
    },
    {
      title: "Save Draft",
      desc: "Save to read later",
      icon: "book",
      action:"SAVE"
    },
    {
      title: "Discard",
      desc: "Return to Legacy Page",
      icon: "cancel",
      action:"CLOSE"
    }
  ]
  themeCards = [
    {
      title: "Dark",
      desc: "Black background with white text",
      icon: "brightness_2",
      action: "DARK"
    },
    {
      title: "Light",
      desc: "Light background with black text",
      icon: "brightness_high",
      action: "LIGHT"
    },
    {
      title: "Creme",
      desc: "Creme color with black text",
      icon: "brightness_6",
      action:"CREAM"
    },
    {
      title: "Author's Theme",
      desc: "Style based on author's theme",
      icon: "create",
      action:"AUTHOR"
    },
  
  ]


  //For setting themes
    authorTheme: boolean = true;
    DarkTheme: boolean = false;
    LightTheme: boolean = false;
    CreamTheme: boolean = false;

  //For Data management
  chapterData: any;

  //Variables
  chapterID: string = "";


  //Needed Legacy Data

  //Chapter Variables needed
  legacyID: string = "";
  legacy: string = "";
  title: string = "";
  text: string = "Write to your hearts content. . .";
  PrivacySetting= "Public";
  public:boolean = true;




 //Importante Variables
 curentUserID: string = "";
 userData: any;
 coverImg: string = "";
 type: string = "Writing";

 //For display of the legacy Modal when creating a new one 
 displayModal: boolean = false;


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

 //For getting downloadLink
 imageLink: Observable<any> | undefined;
 constructor(
  private router: Router,
  private AuthService: AuthService,
  private firebaseAuth: AngularFireAuth,
  private firebase: AngularFirestore,
  private af: AngularFireStorage,
  private chapterService: ChapterService,
  private _location: Location,
  private location:Location,
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
  dataValue: any;

//New Data for editing
  Entries: string = "";
  Readers: string = "";
  Likes: string = "";
  desc: string = "";
  author: boolean = true;
  cover: string ="";
  tempAuthor: string = "";
  currentUserID: string= "";

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
      console.log(this.dataValue); //Returns full data


      // console.log("CData: below");
      // console.log(this.chapterData);   //Returns undefined

      // this.chapterData = JSON.parse(sessionStorage.getItem('chapterData')!);  

      // this.writtenPassage = this.chapterData['text'];
      // this.coverImg = this.chapterData['cover']
      // this.newTitle = this.chapterData['title'];
      this.legacyID = this.dataValue;

      
      
    
  
  

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

//Imported Functionsd

navigateLegacy(legacyID: string){

  //Navigate forwarad to legacy page
  const queryParams: Params = { id: legacyID };
  // alert(queryParams);
  this.router.navigate(['/Legacy'],
  {
    queryParams: queryParams,
    queryParamsHandling: 'merge', 
  });

}

menuAction(action: string){    
  switch(action){
    case "THEME":
      //user wants to upload several images
        this.serviceMenu = false;
        this.themeMenu = true; 
    
      break;
    case "SAVE":        
        const data = {
          'title' : this.title,
          "cover" : this.coverImg,
          "author": this.author,
          "legacyID": this.legacyID,
          "chapterID": this.chapterID
        }
        this.AuthService.saveLegacyChapter(data, this.currentUserID);
        M.toast({html: 'Chapter Bookmarked', classes: 'rounded'});

              
        this.serviceCards[1] = {
          "title" : "Un-Bookmark",
          "desc" : "Remove Chapter from bookmarks",
          "icon" : "bookmark_border",
          "action" : "UNSAVE"
        }
      break;
    case "UNSAVE":       
    M.toast({html: 'Bookmark Removed', classes: 'rounded'}); 
      this.AuthService.unSaveLegacyChapter(this.legacyID, this.chapterID, this.currentUserID);
      this.serviceCards[1] =   {
        title: "Bookmark",
        desc: "Save to read later",
        icon: "bookmark",
        action:"SAVE"
      }
    break;
    case "CLOSE":

    this.navigateLegacy(this.legacyID);

      break;
  }
}

authorMenuAction(action: string){    
  switch(action){
    case "EDIT":
     this.editingWork = true;
     
      this.authorMenu = false;
      this.privacyMenu=false;
        break;
    case "PRIVACY":
      this.authorMenu=false;
      this.privacyMenu=true;
      break;
    case "DELETE":       
        this.authorMenu = false;
        this.deletionMenu = true;
        this.privacyMenu = false;
              
      break;

  }
}

deletionMenuAction(action: string){    
  switch(action){   
    case "DELETE":
      M.toast({html: 'Chapter Deleted', classes: 'rounded'});
      //user wants to upload several images
        this.AuthService.deleteLegacyChapter(this.legacyID, this.chapterID);
        this._location.back();
        this.deletionMenu = false;
        this.authorMenu = false;
        this.privacyMenu = false;                
      break;
    case "CANCEL":                     
          this.deletionMenu = false;
          this.authorMenu = true;            
          this.privacyMenu = false;                
    break;

  }
}

privacyAction(action: string){    
  switch(action){
    case "PUBLIC":
      M.toast({html: 'Chapter Made Public', classes: 'rounded'});
      this.AuthService.updateLegacyPrivacy(this.legacyID, this.chapterID,"public");
      this.authorMenu = false;
      this.privacyMenu= false;

        break;
    case "PRIVATE":
      M.toast({html: 'Chapter Made Private', classes: 'rounded'});
      this.AuthService.updateLegacyPrivacy(this.legacyID, this.chapterID,"private");

      this.authorMenu=false;
      this.privacyMenu=false;
 
      break;
    case "CANCEL":
      this.authorMenu=true;
      this.privacyMenu=false;
      this.serviceMenu = false;
      this.themeMenu = false;
      break;

  }
}
//Works perfectly 
themeMenuAction(action: string){
  switch(action){
    case "DARK":
      M.toast({html: 'Dark Theme Set', classes: 'rounded'});

      this.authorTheme=false;
      this.LightTheme=false;
      this.DarkTheme = true;
      this.serviceMenu=false;
      this.CreamTheme=false;
      this.themeMenu=false;
      this.authorMenu=false;
      this.privacyMenu=false;
      break;
      case "LIGHT":
        M.toast({html: 'Light Theme Set', classes: 'rounded'});
        this.authorTheme=false;
        this.DarkTheme=false;
        this.LightTheme=true;
        this.serviceMenu=false;
        this.CreamTheme=false;
        this.themeMenu=false;
        this.authorMenu=false;
        this.privacyMenu=false;
      break;
      case "CREAM":
        M.toast({html: 'Creme Theme Set', classes: 'rounded'});
        this.authorTheme=false;
        this.DarkTheme=false;
        this.LightTheme=false;
        this.CreamTheme = true;
        this.serviceMenu=false;
        this.themeMenu=false;
        this.authorMenu=false;
        this.privacyMenu=false;
      break;
      case "AUTHOR":
        M.toast({html: 'Default Theme Set', classes: 'rounded'});
        this.authorTheme=true;
        this.DarkTheme=false;
        this.LightTheme=false;
        this.CreamTheme = false;
        this.serviceMenu=false;
        this.themeMenu=false;
        this.authorMenu=false;
        this.privacyMenu=false;
      break;

  }
}







}
function unloadHandler(event: Event | undefined, Event: { new(type: string, eventInitDict?: EventInit | undefined): Event; prototype: Event; readonly AT_TARGET: number; readonly BUBBLING_PHASE: number; readonly CAPTURING_PHASE: number; readonly NONE: number; }) {
  throw new Error('Function not implemented.');
}

