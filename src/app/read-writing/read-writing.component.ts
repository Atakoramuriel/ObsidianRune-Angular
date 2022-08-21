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
  serviceMenu: boolean = true;
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
      action: "WRITE"
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

  chapterData: any;

  //Variables
  chapterID: string = "";

  //Chapter Variables needed
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
    private chapterService: ChapterService

  ) { 
   
  
  }

  ngOnInit(): void{
    //Start 
    const dataValue = sessionStorage.getItem('chapterData');
    if(dataValue){
    

      this.chapterData = JSON.parse(sessionStorage.getItem('chapterData')!);  
      this.text = this.chapterData['text'];
      this.coverImg = this.chapterData['cover']
      this.title = this.chapterData['title'];
    }


    // console.log(this.chapterService.chapter['title'])
    this.chapterData = this.chapterService.chapter;
    this.text = this.chapterData['text'];
    this.coverImg = this.chapterData['cover']

    this.title = this.chapterData['title'];

  
  }

  menuAction(action: string){
    
    switch(action){
      case "POST":
        this.serviceMenu = false;
          break;
      case "WRITE":
        this.serviceMenu = false;

        break;
      case "IMAGE":
        //user wants to upload several images
          
        break;
      case "CLOSE":
        //hide the service menu
        this.serviceMenu = false;
        break;
      default:
        //Need to select option
        break;
    }
  }

}
