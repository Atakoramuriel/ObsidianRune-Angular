import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { LegacyPost } from '../models/LegacyPost';
import { Legacy } from '../models/Legacy';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { URLSearchParams } from 'url';
import { ChapterService } from '../services/chapter.service';
@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.css']
})
export class LegacyComponent implements OnInit {

  //refresh Rate 
  alreadyLoaded: string = 'false';

  //LegacyID
  legacyID: string= "";
  currentUser: string = "";
  //Starting Variables 
  title: String = "";
  desc: String = "";
  updated: String = "";
  author: String = "";
  authorProfileImg: String = "";
  preCover: string = "";
  cover: string = "";
  mainImg: string = "";

 //Prep
 imageLoaded: boolean = false;

  //options
    readers: string = "";
    likes: string ="";

    //isAuthor
    isAuthor: boolean = false;


  //Lgeacy Info Needed
  Entries: String = "0";
  Likes: String = "0";
  Readers: String = "0";
  Contributers: String = "0";

  // For all entries
  allEntries = [
    {
      id: "",
      title: "",
      text: "",
      previewTxt: "",
      author: "",
      privacy: "",
      cover: "",
      timestamp: "",
      date: "",
      type: "",
      updated: "",
    }
  ];
  publicEntries = [
    {
      id: "",
      title: "",
      text: "",
      previewTxt: "",
      author: "",
      privacy: "",
      cover: "",
      timestamp: "",
      date: "",
      type: "",
      updated: "",
    }
  ];
  privateEntries = [
    {
      id: "",
      title: "",
      text: "",
      previewTxt: "",
      author: "",
      privacy: "",
      cover: "",
      timestamp: "",
      date: "",
      type: "",
      updated: "",
    }
  ];
    
  loadedData: boolean = false;
  count: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedroute: ActivatedRoute,
    public AuthService: AuthService,
    public firebaseAuth: AngularFireAuth,
    private chapterService: ChapterService
  ) { 
    this.activatedroute.queryParams.subscribe(data => {
      
        //Set the id for the function later
        this.legacyID = data['id'];
    })
  }

  ngOnInit(): void {
 
    const chapterData = sessionStorage.getItem('chapterData');
    if(chapterData){
      console.log("Chapter Data Already Reloaded");
      sessionStorage.removeItem('chapterData');
    }else{
      console.log("No Chapter data to remove from Legacy");
    }


    if(!this.loadedData){
      
      //Load the page information 
      this.loadLegacyInfo();
      this.loadLegacyPosts();
      this.loadedData = true;
      this.count++;
  
    }
  
  
    $(document).ready(function(){
      $('.parallax').parallax();
      });
   
  
  }

  ngAfterViewInit() {
  }

  //This is that later function 
  loadLegacyInfo(){
   
    this.AuthService.loadLegacy(this.legacyID).then(data => {
        //Assign the data variables 
            const legacyData = data.data() as Legacy;
            this.title = legacyData.title as string;
            this.desc = legacyData.desc as string;
            this.cover = legacyData.cover as string;
            this.author = legacyData.author as string;
      }).then(() => {
          this.getUserInfo(this.author);
          localStorage.setItem('refresh', 'true');
          
      })
      this.alreadyLoaded = localStorage.getItem('refresh') as string;

  }


  editLegacy(){
    sessionStorage.setItem("chapterData", this.legacyID)
    //Navigate Away 
    this.router.navigate(['/editLegacyChapter']);
  }
  

  loadLegacyPosts(){

    //Remove first entry in arrays
      this.allEntries.splice(0,1);
      this.privateEntries.splice(0,1);
      this.publicEntries.splice(0,1);

    this.AuthService.getLegacyPosts(this.legacyID).subscribe(data => {
      data.map(e => {
          const data = e.payload.doc.data() as LegacyPost;


          // Data to be pushed to array
          const dataUpload = {
            id: e.payload.doc.id,
            title: data.title as string,
            text: data.text as string,
            previewTxt: data.text?.split(' ').splice(0, 15).join(' ') as string,
            cover: data.cover != "" ? data.cover as string : this.cover as string, 
            author: data.author as string, 
            date: data.date as string,
            timestamp: data.timestamp as string,
            privacy: data.privacy as string,
            type: data.type as string,
            updated: data.updated as string, 
          }

          //Push to all first
          this.allEntries.push(dataUpload);

          // push to public array
          if(dataUpload['privacy'] == "public"){
              this.publicEntries.push(dataUpload);
          }

          // push to private array
          if(dataUpload['privacy'] == "private"){
             this.privateEntries.push(dataUpload);
          }
          this.Entries = this.allEntries.length as unknown as string;

      })
    })

    // console.log("__ CON __")
    // console.log(this.publicEntries)
  }

  //Get user info
  getUserInfo(userkey: String){
      this.AuthService.getUserInfo(userkey as string).then(data => {
        const userData = data.data() as User;
        // console.log(data.data())
        this.author = userData.displayName as string;
        this.authorProfileImg = userData.photoURL as string;
        
      })
  }



 //Navigate to the Read Page 
  readChapter(card: any){
   
    var chapter = card;
    chapter["LegacyId"] = this.legacyID;
    // console.log("INFORMATION BELOW")
    console.log(card);
   
  const dataValue = sessionStorage.getItem('chapterData');
  if(dataValue){
    //Remove Data
      console.log("Cleaning chapter Data")
      sessionStorage.removeItem('chapterData');

      console.log("Cleaning chapter from Service")
      this.chapterService.cleanChapter();

    //Now progress forward
      this.chapterService.setChapter(chapter);
      sessionStorage.setItem('chapterData',JSON.stringify(chapter));
      this.router.navigate(['/Reading']);

  }else{
    console.log("No Data to report");
    this.chapterService.setChapter(chapter);
    console.log("Storing new chapter");
    sessionStorage.setItem('chapterData',JSON.stringify(chapter));
    this.router.navigate(['/Reading']);
  }

  
  
    
  }

 

}
