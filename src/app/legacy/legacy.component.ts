import { Component, DebugElement, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { LegacyPost } from '../models/LegacyPost';
import { Legacy } from '../models/Legacy';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { URLSearchParams } from 'url';
import { ChapterService } from '../services/chapter.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.css']
})
export class LegacyComponent implements OnInit {

  //refresh Rate 
  alreadyLoaded: string = 'false';
  newMode: boolean = false;
  editMode: boolean = false;
  newEntryMenu: boolean = false;


  //LegacyID
  legacyID: string= "";
  currentUser: string = "";
  currentUserID: string= "";
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
    isFollowing: boolean = false;


  //Legacy Info Needed
  Entries: String = "0";
  Likes: String = "0";
  Readers: String = "0";
  Contributers: String = "0";


  //If there are no entries 
  hasEntries: boolean = false;


  //Deleted 
  collectedIDs: string[] = [];
  forDeletion: string[] = [];
  FDL: number = 0;


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
  preDeletedEntries = [
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

  legacyBookmarks: any = [];
    
  loadedData: boolean = false;

  //For uploading Image 
  filePath: string = "";
  imageUploaded: boolean = false;
  downloadLink: string = "";

  defaultPostImgPath: string ="/N4Posts";
  defaultLegacyImgPath: string ="/LegacyCovers";

  
  //For Error Messages
  showErrMsg: boolean = false;


  privacySetting : string = "";
  isPublic: boolean = true;

  count: number = 0;
  imageLink: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedroute: ActivatedRoute,
    public AuthService: AuthService,
    public firebaseAuth: AngularFireAuth,
    private chapterService: ChapterService,
    private af: AngularFireStorage
  ) { 
    this.activatedroute.queryParams.subscribe(data => {
      
        //Set the id for the function later
        this.legacyID = data['id'];
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const currentUser = JSON.parse(localStorage.getItem('userData') as string);
    this.currentUserID = currentUser['uid'];
    const chapterData = sessionStorage.getItem('chapterData');
    const returnValue = sessionStorage.getItem('returnValue');
    if(chapterData){
      console.log("Chapter Data Already Reloaded");
      sessionStorage.removeItem('chapterData');
    }else{
      console.log("No Chapter data to remove from Legacy");
    }


    if(!this.loadedData){
      
      //Load the page information 
      this.loadLegacyInfo();
      this.loadBookmarkedLegacies();
      // this.loadLegacyPosts();
      this.loadedData = true;
      this.count++;
  
    }
  
    this.preDeletedEntries.pop();
  
    $(document).ready(function(){
      $('.parallax').parallax();
      });
   
  
  }

  deleteLegacy(){
    let text = "Are you sure you want to delete the " + this.title + " legacy \n";
    if(confirm(text)){
      console.log("Deleting Legacy");
      //Delete the Legacy chapters 

      if(this.collectedIDs.length > 0){
          //Delete the legacy 
          this.collectedIDs.forEach(chapter => {
              console.log("Deleting Chapter Prior to Legacy Deletion: " + chapter);
              this.forDeletion.push(chapter);
          });
          this.deleteChapters();
      }
      this.AuthService.deleteLegacy(this.legacyID).then(()=>{
        console.log("Legacy Deleted");
        M.toast({html: "Successfully Deleted Legacy"})
        this.router.navigate(['/']);
      })
    }
  }


 addReader(legacyID: string, userkey: string){
   this.AuthService.addLegacySubscriber(legacyID, userkey).then(() => {})
   
 }

 removeReader(legacyID: string, userKey: string){
   this.AuthService.removeLegacySubscriber(legacyID,userKey).then(()=>{})
 }

 followLegacy(){
   this.AuthService.bookmarkLegacy(this.legacyID, this.currentUserID).then(response => {
      M.toast({html: "Successfully Bookmarked Legacy"})
      this.isFollowing = true;
      this.addReader(this.legacyID, this.currentUserID);
   }).catch(error => { 
    M.toast({html: "Error saving legacy - " + error})
   })
 }

 
 unFollowLegacy(){
   this.AuthService.unBookmarkLegacy(this.legacyID, this.currentUserID).then(response => {
     M.toast({html: "Unfollowed Legacy"})
     this.isFollowing = false;
     this.removeReader(this.legacyID, this.currentUserID);
   }).catch(error => { 
      M.toast({html: "Error unfollowing: " + error})
   })
 }



  //For File uploads
  upload($event: any){
    // alert("Called")
    //upload and get event
    // console.log("Upload function Called. . .")

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

    var fullPath = this.defaultLegacyImgPath + "/" + this.currentUserID + "/" + fileName;

    //Place file within Firebase Storage
    var uploadTask = this.af.upload(fullPath, this.filePath)

    var fileRef = this.af.ref(fullPath);
    
    //Get the percentage of the upload progress
    var uploadPercent = uploadTask.percentageChanges();
    console.log("Uploading... ");
    //Find out when download URL is available
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.imageLink = fileRef.getDownloadURL();
        this.imageLink.subscribe((url: string) => {
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
    // alert(this.downloadLink)
    // alert(this.cover)
      //Set the upload link to true
      this.imageUploaded = true;
      this.cover = this.downloadLink;
      
  }

 

  addForDeletion(postID: string, entry: any, index: number){
    //Add to predeletion 
    this.preDeletedEntries.push(entry);

    //Add to for Deletion final array 
    this.forDeletion.push(postID);
    this.FDL++;

    //Remove from the current array 
    this.publicEntries.splice(index,1);
    
  }

  removeForDeletion(postID: string, entry: any, index: number){
    //Add to Public Array again
    this.publicEntries.push(entry);

    //Remove from for Deletion
    var tempID = this.forDeletion.indexOf(postID)
    this.FDL--;
    //Remove from the PreDeleted Series
    this.forDeletion.splice(tempID,1);
    this.preDeletedEntries.splice(tempID,1);    
  }


  deleteChapters(){
      this.forDeletion.forEach(postID => {
        // alert("Deleting Story ==> " + postID)
        this.AuthService.deleteLegacyChapter(this.legacyID, postID).then(response => {
          M.toast({html: "Successfully Deleted"});
        }).catch(error => {
          M.toast({html: "Error Deleting Chapter: " + error});
        })

       
    });
  }

  updateLegacy(){

    const newData = {
      cover: this.imageUploaded== true ? this.downloadLink as unknown as string : this.cover,
      title : this.title,
      desc : this.desc, 
      privacy: this.privacySetting
    }
    this.AuthService.updateLegacy(this.legacyID, newData).then(()=>{
      M.toast({html: "Legacy Updated"});
      this.editMode = false;
      location.reload();
    }).catch((error)=> {
      M.toast({html: "Error Saving : " + error});
    })
  }


  loadBookmarkedLegacies(){
    this.AuthService.loadBookmarkedLegacies(this.currentUserID).subscribe(data => {
      this.legacyBookmarks = []
      data.map(e => { 
        const data = e.payload.doc.data() as Legacy
        const legacy = {
          id: e.payload.doc.id,
          title: data.title as string, 
          cover: data.cover as string, 
          author: data.author as string, 
          legacyID: data.legacyID as string, 
          privacy: data.privacy as string
        }
        this.legacyBookmarks.push(legacy);


      })
    })
    if(this.legacyBookmarks.includes(this.legacyID)){
        // alert("FOLLOWING")
        this.isFollowing = true;
    }
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
            this.privacySetting = legacyData.privacy as string; 
            if(this.author == this.currentUserID){
              this.isAuthor = true;
            }

            if(this.privacySetting == "public"){
              this.isPublic = true;
            }else{
              this.isPublic = false;
            }


      }).then(() => {
          this.getUserInfo(this.author);
          localStorage.setItem('refresh', 'true');
          this.loadLegacyPosts();
          
      })
      this.alreadyLoaded = localStorage.getItem('refresh') as string;

  }

  changePrivacy(){
    if(this.isPublic){
      this.privacySetting = "private"
      this.isPublic = false;
    }else{
      this.privacySetting = "public",
      this.isPublic = true;
    }
  }

  NewLegacyEntry(){
    //Display menu option 

  }

  editLegacy(){

 

    var chapter:any = {};

    chapter["LegacyId"] = this.legacyID;

  
    const dataValue = sessionStorage.getItem('chapterData');

    if(dataValue)
    {
   
          //Remove Data
          console.log("Cleaning chapter Data")
          sessionStorage.removeItem('chapterData');
    
          console.log("Cleaning chapter from Service")
          this.chapterService.cleanChapter();
    
          //Now progress forward
          this.chapterService.setChapter(chapter);
          sessionStorage.setItem('chapterData',this.legacyID);
          this.router.navigate(['/editLegacyChapter']);
    }else{
     
      // this.chapterService.setChapter(chapter);
      console.log("Storing new chapter");
      sessionStorage.setItem('chapterData',this.legacyID);
      this.router.navigate(['/editLegacyChapter']);
    }
 
    
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
      this.publicEntries = [];
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

          //Add legacy ID to bucket in case of full deletion 
          this.collectedIDs.push(e.payload.doc.id);

          //Push to all first
          this.allEntries.push(dataUpload);

          // push to public array
          if(dataUpload['privacy'] == "public"){
              this.publicEntries.push(dataUpload);
              this.hasEntries = true;
          }

          // push to private array
          if(dataUpload['privacy'] == "private"){
             this.privateEntries.push(dataUpload);
          }
          this.Entries = this.publicEntries.length as unknown as string;
          
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
