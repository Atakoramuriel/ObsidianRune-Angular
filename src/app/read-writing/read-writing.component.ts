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
  styleUrls: ['./read-writing.component.css']
})
export class ReadWritingComponent implements OnInit {


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
    if(this.chapterData == null){
      console.log("Storing Data")
      localStorage.setItem('chapterData',JSON.stringify(this.chapterService.chapter));
      this.chapterData = JSON.parse(localStorage.getItem('chapterData')!);  
    }else{
      
    }
  
  }

  ngOnInit(): void{
    console.log("Mission Accomplished")
    console.log(this.chapterData)
    // console.log(this.chapterService.chapter['title'])
    // this.chapterData = this.chapterService.chapter;

    this.title = this.chapterData['title'];
    this.text = this.chapterData['text'];
  }

  loadInfo(){
  alert(this.chapterID);
  }

}
