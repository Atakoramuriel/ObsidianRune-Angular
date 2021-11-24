import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

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
  legacyMenu:boolean = false;
  messageMenu:boolean = false;
  notificationMenu:boolean = false;
  settingsMenu:boolean = false;


  constructor(public firebaseService: FirebaseService) {
    let notes: String[];
   }

  ngOnInit(): void {
    let notes: String[];
    this.checkAuth();
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
