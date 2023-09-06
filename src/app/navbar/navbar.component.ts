
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {Router} from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'firebase/auth';
import { Writing } from '../models/Writing';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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

 //In case user wants to post to legacy instead of OR
 newMessageList = [
  {
    id: "",
    message: '',
    messageID: '',
    timestamp: '',
    toUserKey: '',
    username: '',
    profileImg: ''
  },
 ];


 //For the actualChat 
  chatList = [
    {
      id: '',
      message: '',
      fromUserKey:'',
      timestamp: '',
      toUserKey: '',
      username: '',
      profileImg: ''
    }
  ]

 viewNewMessageList: boolean = false;
 viewChatList: boolean = false;
 activeChatUser: string = "";
 activeChatUserPhoto: string = "";
 newChatMessage: string = "";
 newMessageTxt: string = "";


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
    // this.loadNewMessages();
    this.loadChatMessages("0Zqug3cne4PxbbXeaEbIrsBNwlA2");
    
  }

 

  cleanList(){
    this.newMessageList.splice(0,1);
    this.newMessageList = [];
    this.loadNewMessages();
  }

  async loadNewMessages(){
    this.newMessageList.splice(0,1);
    await this.AuthService.getUserNewMessages(this.curentUserID).subscribe(data => {
      this.newMessageList = [];
      data.map(e => {
        const data = e.payload.doc.data();
        let foundUser:string;

        
        this.getUserInfo(e.payload.doc.id)
        .then(user => {
          // console.log("User INfo: " + JSON.stringify(user));
          var test = JSON.stringify(user);
          var temp = JSON.parse(test);
          foundUser = temp.displayName! as string;
          var photoURL = temp.photoURL! as string;

          var username;
 
        // console.log(displayName)
        const messageData = {
          id: e.payload.doc.id,
          fromUserKey: data['fromUserKey'],
          message: data['message'],
          messageID: data['messageID'],
          timestamp: data['timestamp'],
          toUserKey: data['toUserKey'],
          username: foundUser,
          profileImg: photoURL
        };

        this.newMessageList.push(messageData);

      });
      });
    });
  
  }


  //Load the chat Messages
  async loadChatMessages(secondUserID: string){
    this.chatList.splice(0,1);
    await this.AuthService.getUserChatMessages(this.curentUserID, secondUserID)
    .subscribe(data => {
      this.chatList = [];
      data.map(e => {
        const olddata = JSON.stringify(e.payload.doc.data());
        const data = JSON.parse(olddata);
        var foundUser:string;
        // console.log("CHAT DATA ")
        
        var from:string = data.fromUserKey;
        // console.log(from)
        this.getUserInfo(from)
        .then(user => {
          // console.log("User INfo: " + JSON.stringify(user));
          var test = JSON.stringify(user);
          var temp = JSON.parse(test);
          foundUser = temp.displayName! as string;
          this.activeChatUser = foundUser;
          var photoURL = temp.photoURL! as string;
          this.activeChatUserPhoto = photoURL;

          var username;
 
        
        const chatData = {
          id: e.payload.doc.id,
          fromUserKey: data['fromUserKey'],
          message: data['message'],
          messageID: data['messageID'],
          timestamp: data['timestamp'],
          toUserKey: data['toUserKey'],
          username: foundUser,
          profileImg: photoURL
        };
        if(chatData['fromUserKey'] == this.curentUserID)
        {
          
        }
        // console.log(chatData);
        this.chatList.push(chatData);
        
      });
      });
    });
    
  }

  redirectPage(path: string){
    switch(path){
      case "home":
        this.router.navigate(['/'])
      break;

    }
  }


  //Get user info
  async getUserInfo(userkey: String){
    var USER; 
    await this.AuthService.getUserInfo(userkey as string).then(data => {
      const userData = data.data() as User;
      // console.log(userData['displayName']);    
      USER = data.data();
    })
    return USER;

}


async getUsername(userkey: String){
  var userName;
  await   this.AuthService.getUserInfo(userkey as string).then(data => {
    const userData = data.data() as User;    
    userName = userData['displayName']    
  })
  // console.log("UNC: " + userName);
  return userName;
}

reduceMessage(messageTxt: string){
  //Reduce the size of a message to a limited amount of Characters 
  
  //first import the message 
  
  
      //console.log(messageTxt)
      var newString = String(messageTxt);
      var end = "..."
  
  //Get the size of a String
      if(messageTxt.length > 50){
                  //Then Grab section message 
                          var finalString = String(newString.substring(0,50))
                          //console.log(finalString)
  
                  //Add... 
                  var endString = finalString.concat(end)
              
                  //Now return the string 
                  return String(endString)
      }else{
          return String(messageTxt)
      }
  
  }

 async selectMessage(userID: string)
  {
    alert(userID);
    await this.loadChatMessages(userID)
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
  

  displayMessages(){
    this.viewNewMessageList=!this.viewNewMessageList
  }

}
