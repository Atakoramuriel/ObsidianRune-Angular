
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {Router} from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'firebase/auth';
import { Writing } from '../models/Writing';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //Importante Variables
  currentUser: string = "";
  curentUserID: string = "";
  profileImg: string = "";
  userData: any;

  
  //For hiding and showing the 'new' button on bottom left 
  showCreateBtn: boolean = true;
  //Starting variables
  Auth:boolean = false;
  
  //For display of Modals
  displayPostModal: boolean = false;


  //Info for new post
  newTitle: string = "";
  newText: string = "";
  timeSaved: string = "";
  timeStamp: string = new Date() as unknown as string;
  tempID: string = "";
  newPostImg: string =  "";

  //Incase Images are uplaoded
  displayImage: boolean = false;

  //For info inside of modal
  preSelection: boolean = false;
  displayModal: boolean =false;
  displayImgModal: boolean = false;
  modalPostUser: string = "";
  modalPostUserProfileImg: string = "";
  modalPostImage: string = "";
  modalPostImages = [];
  modalPostDate: string = "";
  //For sub home menu
  mainMenu:boolean = true;
  activeMenu:boolean = false;
  profileMenu:boolean = false;
  searchMenu:boolean = false;
  legacyMenu:boolean = false;
  messageMenu:boolean = false;
  notificationMenu:boolean = false;
  settingsMenu:boolean = false;

  serviceMenu:boolean = false;
  serviceCards = [
    {
      title: "Standard Post",
      desc: "Title and some text. Quick and to the point.",
      icon: "create",
      action: "POST"
    },
    {
      title: "Anthology",
      desc: "Write to your hearts content",
      icon: "book",
      action: "WRITE"
    },
    {
      title: "Image Collection",
      desc: "Great for storyboards or collages",
      icon: "image",
      action: "IMAGE"
    },
    {
      title: "Cancel",
      desc: "Close Post Menu",
      icon: "cancel",
      action:"CLOSE"
    }
  ]

  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
    private AuthService: AuthService,
    private firebaseAuth: AngularFireAuth,
    private firebase: AngularFirestore,
    private af: AngularFireStorage) {
       //Get Current User Info
    this.firebaseAuth.authState.subscribe((user) =>{
      if(user){
        
        // alert(user['displayName']);
        this.userData = user;           
        localStorage.setItem('userData', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('userData')!);
        
      }else {

        console.log("Network Error")
        localStorage.setItem('userData','null');
        JSON.parse(localStorage.removeItem('userData')!);
        
      }

    })
    let notes: String[];
   }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('userData') as string);
    this.curentUserID = currentUser['uid'];
    this.profileImg = currentUser['photoURL'];

    let notes: String[];
    this.checkAuth();

    var currentdate = new Date().toLocaleString();
  
    this.tempID = this.AuthService.generateID();
    this.timeSaved = currentdate;
    // this.modalPostUser = this.userData['displayName'];
    // this.modalPostUserProfileImg = this.userData['photoURL']
    // console.log(this.userData[''])
  
  }

  redirectPage(path: string){
    switch(path){
      case "home":
        this.router.navigate(['/'])
      break;

    }
  }


  //Get user info
  getUserInfo(userkey: String){
    this.AuthService.getUserInfo(userkey as string).then(data => {
      const userData = data.data() as User;
      // console.log(data.data())

      
    })
}


  async loadUserInfo(){

   
    this.AuthService.getUserInfo(this.curentUserID).then(data => {
      const userData = data.data() as User;
      this.modalPostUser = userData.displayName as string;
      this.modalPostUserProfileImg = userData.photoURL as string;
      alert("HERE")
    })
}


 
savePost(){
   
  //Structure data to be posted
  const postData = {
    title: this.newTitle,
    text: this.newText,
    userkey: this.userData['uid'],
    date: this.timeSaved,
    type: this.getCount(this.newText) < 1000 ? "standard" : "Writing",
    timestamp: this.timeStamp,
    NumComments: "0",
    NumLikess: "0",
    hashtags: [],
    postImg: this.newPostImg,
    postImgs: null,
    post_id: this.tempID,
    username: this.userData['displayName']
  } 
  //Call to the Function 
  this.AuthService.newPost(postData,  this.tempID)
  .then(()=>{
    M.toast({html: "Posted to Obsidian"});
    this.displayPostModal = false;
    location.reload();
  })

}



validate(){
  if(this.newTitle == null || this.newTitle == ""){
    alert("Must fill in Title");
    return false;
  }else if(this.newText == null || this.newText == ""){
    alert("You have to write something before you post... ");
    return false;
  }else {
    return true;
  }
}

//save the progress but not working 
saveProgress(){
//only save the post if the title and text are not empty
if(this.validate()){
  if(this.tempID == ""){
    this.tempID = this.AuthService.generateID();
    
    const postData = {
      title: this.newTitle,
      text: this.newText,
      userkey: this.userData['uid'],
      date: this.timeSaved,
    } as Writing
    //Call to the Function 
    this.AuthService.saveWritingProgress(postData, this.userData['uid'], this.tempID)
  }else{
    const postData = {
      title: this.newTitle,
      text: this.newText,
      userkey: this.userData['uid'],
      date: this.timeSaved,
    
    } as Writing
    this.AuthService.saveWritingProgress(postData, this.userData['uid'], this.tempID)
    M.toast({html: "Progress Saved"});
  }
}

// this.AuthService.saveWritingProgress()
}


getCount(value: string){
  value = value.replace(/(^\s*)|(\s*$)/gi,"");
  value = value.replace(/[ ]{2,}/gi," ");
  value = value.replace(/\n /,"\n");
  return value.split(' ').length;
}

  redirect(path: string){
    switch(path){
      case 'Dashboard': {
        this.router.navigate(['']);
        break;
      }
      case 'Profile': {
        this.router.navigate(['']);
        break;
      }
      case 'newWriting': {
        this.router.navigate(['newWriting']);
        break;
      }

    }
  }

  menuAction(action: string){
    
    switch(action){
      case "POST":
        this.displayPostModal = true;
        this.serviceMenu = false;
          break;
      case "WRITE":
        this.serviceMenu = false;
        this.redirect('newWriting');
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

    
  closePostModal(){    
    //Close the modal
    
    if(this.preSelection){
      this.preSelection = false;
    }else{
      this.displayPostModal = false;  
      this.displayModal=false
    }
  }

  async logout(){
    this.firebaseService.signOut();
    location.reload();
  }

  //Check authentication
  async checkAuth(){
     if(this.firebaseService.createUser != null){
       this.Auth = true;
     }
  }

  //Update
  async toggleMenu(selection: string){
    //Update the nav based on choice
     switch(selection){
        case "Home":
          //Show home choices
              //Main dashboard
              //New Post 
              //New Writing
              //New NFT

            //Set active menu to true
            this.mainMenu=!this.mainMenu;
            this.activeMenu=!this.activeMenu;
            

          break;
        case "Search":
            //Show the searchbar
            this.mainMenu=!this.mainMenu;
            this.searchMenu=!this.searchMenu;
          break;
        case "Profile":
          //Show Profile Options
            //View Posts
            //View Legacys
            //Edit Profile
            this.mainMenu=!this.mainMenu;
            this.profileMenu=!this.profileMenu;
          break;
        case "Notifications":
          //Show notification options  
              //Obsidian Notifications
              
              this.mainMenu=!this.mainMenu;
              this.notificationMenu=!this.notificationMenu;
        break;
        case "Legacy":
          //Show legacy option
            //View legacy 
            //New Legacy 
            //Saved Legacies
            this.mainMenu=!this.mainMenu;
            this.legacyMenu=!this.legacyMenu;
          break;
        case "Messages":
          //Show message options 
            //View Messages
            //Pinned Messages
            //New Message
            this.mainMenu=!this.mainMenu;
            this.messageMenu=!this.messageMenu;
          break;
        case "Settings":
          //Show logout options
            //View Settings
            //Profile Settings
            //Logout
            this.mainMenu=!this.mainMenu;
            this.settingsMenu=!this.settingsMenu;
          break;
     }


  }
  

}
