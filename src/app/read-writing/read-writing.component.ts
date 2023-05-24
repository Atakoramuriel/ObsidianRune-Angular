import { Component, OnInit } from '@angular/core';

//Additional Imports
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { LegacyPost } from '../models/LegacyPost';
import { Legacy } from '../models/Legacy';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Location } from '@angular/common';
import { ChapterService } from '../services/chapter.service';
import { transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-read-writing',
  templateUrl: './read-writing.component.html',
  animations: [

  ],
  styleUrls: ['./read-writing.component.css']
})
export class ReadWritingComponent implements OnInit {

  //Starting Variables
  showMenuBtn: boolean = false;
  serviceMenu: boolean = false;
  themeMenu: boolean = false;
  authorMenu: boolean = false;
  privacyMenu: boolean = false;
  deletionMenu: boolean = false;
  editingWork: boolean = false;
  currentPrivacy: string = ""; //This will update

  serviceAuthorCards = [
    {
      title: "Edit",
      desc: "Edit this chapter",
      icon: "create",
      action: "EDIT"
    },    
    {
      title: "Change Privacy",
      desc: "Change Privacy settings for chapter",
      icon: "visibility",
      action:"PRIVACY"
    },
    {
      title: "Delete",
      desc: "Delete this chapter from legacy",
      icon: "delete_forever",
      action:"DELETE"
    }
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
      title: "Theme",
      desc: "Change page theme",
      icon: "book",
      action: "THEME"
    },
    {
      title: "Bookmark",
      desc: "Save to read later",
      icon: "book",
      action:"SAVE"
    },
    {
      title: "Return",
      desc: "Return to Legacy",
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

  //Chapter Variables needed
  legacyID: string = "";
  legacy: string = "";
  title: string = "";
  text: string = "";
  coverImg: string = ""

  author: boolean = false;
  tempAuthor: string = "";
  currentUserID: string= "";

  userData: any;
  dataValue: any;
  returnValue: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedroute: ActivatedRoute,
    public AuthService: AuthService,
    public firebaseAuth: AngularFireAuth,
    private location:Location,
    private chapterService: ChapterService,
    private _location: Location,
    private userService: FirebaseService,
  ) { 
    const dataValue = sessionStorage.getItem('chapterData');

  
  }

  ngOnInit(): void{
    //Start 
    //Get the current user
    const currentUser = JSON.parse(localStorage.getItem('userData') as string);
  
    



    this.dataValue = sessionStorage.getItem('chapterData');
    this.returnValue = sessionStorage.getItem('returnValue');

    if(this.dataValue){    
      // alert("AQUI")
      // console.log("DValue: below");
      // console.log(this.dataValue); //Returns full data

      // console.log("CData: below");
      // console.log(this.chapterData);   //Returns undefined

      this.chapterData = JSON.parse(sessionStorage.getItem('chapterData')!);  
      this.text = this.chapterData['text'];
      this.coverImg = this.chapterData['cover']
      this.title = this.chapterData['title'];
      this.tempAuthor = this.chapterData['author'];
      this.legacyID = this.chapterData['LegacyId']
      this.chapterID = this.chapterData['id']; 
      this.currentUserID = currentUser['uid'];
      //Validation of Author 
      if(this.tempAuthor == currentUser['uid']){
        this.author = true;        
      }

    }else{    
          // console.log(this.chapterService.chapter['title'])
    this.chapterData = this.chapterService.chapter;
    console.log("CData: below");
    console.log(this.chapterData);
      this.text = this.chapterData['text'];
      this.coverImg = this.chapterData['cover']
      this.title = this.chapterData['title'];
      this.tempAuthor = this.chapterData['author'];
      this.legacyID = this.chapterData['LegacyId']
      this.chapterID = this.chapterData['id']; 
      this.currentUserID = currentUser['uid'];
      if(this.tempAuthor == currentUser['uid']){
        this.author = true;        
      }
    }
  }


  navigateLegacy(legacyID: string){

  

    //Navigate forwarad to legacy page
    const queryParams: Params = { id: legacyID };
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
