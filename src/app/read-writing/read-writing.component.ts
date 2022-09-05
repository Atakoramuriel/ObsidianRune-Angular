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
  serviceCards = [
    {
      title: "Like",
      desc: "Title and some text. Quick and to the point.",
      icon: "create",
      action: "favorite_border"
    },
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedroute: ActivatedRoute,
    public AuthService: AuthService,
    public firebaseAuth: AngularFireAuth,
    private location:Location,
    private chapterService: ChapterService,
    private _location: Location
  ) { 
    const dataValue = sessionStorage.getItem('chapterData');

  
  }

  ngOnInit(): void{
    //Start 
    const dataValue = sessionStorage.getItem('chapterData');
    if(dataValue){    
      console.log("Data Already obtained")
      this.chapterData = JSON.parse(sessionStorage.getItem('chapterData')!);  
      this.text = this.chapterData['text'];
      this.coverImg = this.chapterData['cover']
      this.title = this.chapterData['title'];
    }else{
      console.log("No Data obtained")

          // console.log(this.chapterService.chapter['title'])
    this.chapterData = this.chapterService.chapter;
    this.text = this.chapterData['text'];
    this.coverImg = this.chapterData['cover']
    this.title = this.chapterData['title'];
    }




  
  }

  menuAction(action: string){
    
    switch(action){
      case "POST":
        this.serviceMenu = false;
          break;
      case "WRITE":
        this.serviceMenu = false;
        break;
      case "THEME":
        //user wants to upload several images
          this.serviceMenu = false;
          this.themeMenu = true;

          
        break;
      case "CLOSE":
        //hide the service menu
        this.serviceMenu = false;
        this._location.back();
        break;
      default:
        //Need to select option
        break;
    }
  }

  themeMenuAction(action: string){
    switch(action){
      case "DARK":
        this.authorTheme=false;
        this.LightTheme=false;
        this.DarkTheme = true;
        this.serviceMenu=false;
        this.CreamTheme=false;
        this.themeMenu=false;
        break;
        case "LIGHT":
          this.authorTheme=false;
          this.DarkTheme=false;
          this.LightTheme=true;
          this.serviceMenu=false;
          this.CreamTheme=false;
          this.themeMenu=false;
        break;
        case "CREAM":
          this.authorTheme=false;
          this.DarkTheme=false;
          this.LightTheme=false;
          this.CreamTheme = true;
          this.serviceMenu=false;
          this.themeMenu=false;
        break;
        case "AUTHOR":
          this.authorTheme=true;
          this.DarkTheme=false;
          this.LightTheme=false;
          this.CreamTheme = true;
          this.serviceMenu=false;
          this.themeMenu=false;
        break;

    }
  }

}
