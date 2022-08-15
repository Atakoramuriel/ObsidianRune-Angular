import { Component, OnInit } from '@angular/core';

//Additional Imports
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { LegacyPost } from '../models/LegacyPost';
import { Legacy } from '../models/Legacy';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-read-writing',
  templateUrl: './read-writing.component.html',
  styleUrls: ['./read-writing.component.css']
})
export class ReadWritingComponent implements OnInit {

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
    public firebaseAuth: AngularFireAuth
  ) { 
    this.activatedroute.queryParams.subscribe(data => {
      // console.log(data)
      //Set the id for the function later
      this.chapterID = data['id'];
      // this.title = data['title'] as string;
      // this.text = data['text']
      // this.coverImg = data['cover']
  })
  }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(){
  alert(this.chapterID);
  }

}
