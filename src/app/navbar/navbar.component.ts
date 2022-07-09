
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //Starting variables
  Auth:boolean = false;

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
      title: "Written Passage",
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
    public router: Router) {
    let notes: String[];
   }

  ngOnInit(): void {
    let notes: String[];
    this.checkAuth();
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
      case "PRIVATE":
        //user wants to do a private writing


        break;
      case "Close":
        //hide the service menu
        this.serviceMenu = false;
        break;
      default:
        //Need to select option
        break;
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
