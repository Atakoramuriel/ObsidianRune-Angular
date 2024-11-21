import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { PostsService } from '../services/posts.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Post } from '../models/post';
import * as $ from 'jquery'
import { User } from '../models/user';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Legacy } from '../models/Legacy';
import { Aevum } from '../models/Aevum';
import * as M from 'materialize-css';
import { Timestamp } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {ActivatedRoute, Params, Router} from '@angular/router'; // import router from angular router
import { ChapterService } from '../services/chapter.service';
import { data } from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  //Banner images
  imgLeft:String = "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FCCF733DE-0488-49E1-B128-95350491A843.jpeg?alt=media&token=ad602b29-0866-4796-9d3d-bc66ac99c262";
  imgCenter:String ="https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0132.jpg?alt=media&token=7f967075-407b-47fe-b717-8289fbefae05";
  imgRight:String = "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_4533.jpg?alt=media&token=778bd24d-85d3-4fa9-afbd-746ca36b545b";

  //For pool of images to select from 
  imgPool: String[] | any;
  

  //Flags for display 
  newAevum: boolean = false;
  displayLegacyList: boolean = false;

  //Hold
   //LegacyID
   legacyID: string= "";


  //Test for array
  testList = [
    {
      title: 'Truth',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FCCF733DE-0488-49E1-B128-95350491A843.jpeg?alt=media&token=ad602b29-0866-4796-9d3d-bc66ac99c262"
    },
    {
      title: 'Event Horizon',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FB1BF8558-3D05-46E1-830B-627CD82B5A78.jpeg?alt=media&token=a286c12d-5f26-4f71-a720-c83f3a55ad40"
    },
    {
      title: 'Ambition',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F1.10.png?alt=media&token=cb1cbbb6-006a-4b9c-8f45-e5b5a11c9210"
    },
    {
      title: 'Faith',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F1.9.png?alt=media&token=c16816f8-eaed-4079-b686-3ad1d53fe87a"
    },
    {
      title: 'Autumn',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F1.7.png?alt=media&token=4dba1cb9-8899-421e-87f7-48c3679bfb8a"
    }
  ];
  
  
  //More Arrays
  aevumList = [
    {
      id: "",
      title: "",
      text: "",
      timestamp: "",
      cover: "",
      status: ""
    }
  ]
  aevumActiveList = [
    {
      id: "",
      title: "",
      text: "",
      timestamp: "",
      cover: "",
      status: ""
    }
  ]

  aevumUpcomingList = [
    {
      id: "",
      title: "",
      text: "",
      timestamp: "",
      cover: "",
      status: ""
    }
  ]
  aevumClosedList = [
    {
      id: "",
      title: "",
      text: "",
      timestamp: "",
      cover: "",
      status: ""
    }
  ]

  legacyList = [
    {
      title: '',
      cover: "",
      desc: "",
      privacy: "",
      type: "",
      updated: "",
      author: "",

    },
  ];

  //For recent Post Row
  menuItems = [
    {
      title: 'New Post',
      icon: "create"
      },
    {
      title: 'Legacy',
      icon: "book"
    },
    {
      title: 'Forum',
      icon: "forum"
    },
    {
      title: 'Messages',
      icon: "email"
    },
    {
      title: 'Notifications',
      icon: "insert_comment"
    }
 
  ];

  activeUsers = [
    {
      username: 'Veritas',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA2CB3D73-7042-44EB-8076-0F22AD72A934.jpeg?alt=media&token=b57bc02a-fcea-46ed-be73-cc1f64a65db6"
      },
    {
      username: 'Gehenna',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA0F36188-5CF2-4363-A318-47738A38CB7B.jpeg?alt=media&token=2f806254-6039-4a37-a1f3-177f908c69e5"
      },
    {
      username: 'Valia',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=acd7aa64-b4f0-45e4-9b36-03dcd2b8145b"
      },
    {
      username: 'Autumn',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F2b67925f-7dff-4070-8ded-15665d3a7ca9.png?alt=media&token=cc56daca-c78a-4e97-9617-469cfeb6a489"
      },
    {
      username: 'Maze',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0384.PNG?alt=media&token=5cca5a81-32a5-40bc-a652-b603f6a063d6"
      },
    {
      username: 'Jade',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F148D895E-1BD6-4FE1-AA76-9E45ED9D8DD4.jpeg?alt=media&token=3e7eec27-3430-4962-af96-2546835a6442"
      },
 
  
 
  ];

  //For writing list
  WritingList = [
    {
      title: 'Thank you',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16",
      sample: `Thankful I am thankful for love 
      I am thankful for trust 
      I am thankful for a day 
      Where I can lust 
      Not myself 
      But my ambition 
      For there is a honest intention 
      In making great decisions. 
      I am thankful for my mom 
      Who has shown me up 
      And has shown me down 
      For I have grown 
      Into the women I am now 
      I am thankful for my siblings 
      For they gave me 
      A Reason to live 
      When I didn’t see it give  
      Me a place to forgive
      I am thankful for you 
      For you are great 
      You are a smile 
      On a gloomy day 
      You show me love 
      You show me trust 
      You show me things 
      That I should forever lust. 
      Thank you. `,
      username: "Nocturna",
      date: "November 2021",
      profileImg: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"
      
      
    },
    {
      title: 'Breathless',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16",
      sample: `
              The sun has sunken 
            The moon has woken 
        A kiss; the body is drunken 
        A touch; it gives the unspoken 
        They both know the function 
        As he allows his body to awoken 
        And she allows the seduction 
                    To betoken 
              This reproduction 
                Into an open 
                  Abduction 
        Breathless as they have broken 
        Down the construction 
        Of a wall that was a token 
        Of the hurt and destruction 
                Of the unbroken 
        they stare at the potion  
        Of a new love that wasn’t spoken
                    But a production 
          Of a love, breathless and open.   
          Love you 🦋💜`,
      username: "Nocturna",
      date: "November 2021"
    },
    {
      title: 'Smile',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16",
      sample: `
        Smile 
        The morning arose upon my room 
        A phone buzz jerks me from my sleep 
        For my mind resorts to whom 
        Only one who can keep 
        A smile that will bloom 
        When I open my phone and peep 
        That my lover has consumed 
        My phone with messages that steep 
        Into my heart and resume 
        To make my heart leap 
        And groom 
        My love for him. 💜🦋`,
      username: "Nocturna",
      date: "November 2021",
      profileImg: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"

    },
    {
      title: 'Touch',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16",
      sample: `
      Your touch 
      Your embrace 
      Your eyes to which I race 
      Your smell to which I chase 
      I crave you beyond the base 
      Of life itself for which I face 
      I love you `,
      username: "Nocturna",
      date: "November 2021",
      profileImg: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"

    },
    {
      title: 'Rings',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16",
      sample: `
          Two black rings \n
          Hold so much weight 
          For they are not just things 
          They create 
          This safe space that brings 
          A comfort and a gate 
          To this door that flings 
          Out this great 
          Vulnerability that has wings 
          So vast and allows fate 
          To sting 
          And it becomes late 
          As he hands her his black ring 
          That hold so much weight. `,
      username: "Nocturna",
      date: "November 2021",
      profileImg: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"

    }
 
  ];

  //For NFT Info
  NFT = [
    {
      title: 'Img',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"
    },
    {
      title: 'Img',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"
    },
    {
      title: 'Img',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"
    },
    {
      title: 'Img',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"
    },
    {
      title: 'Img',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"
    },
    {
      title: 'Img',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"
    },
    {
      title: 'Img',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/RuiLogo.png?alt=media&token=2a00ea98-57ac-45ee-9da9-008127c19d2a"
    },

 
  ];

//Counter for the recent posts
recentCount = 0;

post = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: ""
  }
]
postColB = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: ""
  }
]
postColC = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: ""
  }
]


//Creation of different Buckets

//Recent Posts
recentPosts = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    username: "",
    date: ""
  }
]; 

mobilePosts = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    username: "",
    date: ""
  }
];


allPosts = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    username: "",
    date: "",
    timestamp: ""
  }
]; 

allLegacies = []

//Regular Posts
regularPosts = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    username: "",
    date: ""
  }
]; 


regularPostsB = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    username: "",
    date: ""
  }
]; 
regularPostsC = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    username: "",
    date: ""
  }
]; 

recentImgs =[
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    username: "",
    date: ""
  }
]; //Recent Images 

recentCollages = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    postImgs: [],
  }
]; //Recent Image Collages 

recentStoryboards = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: "",
    postImgs: [],
  }
]; //Recent Image Collages 

recentWritings = [  {
  id: "",
  title: "",
  text: "",
  image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
  numLikes: "",
  date: "",
  username:""
}]; //Recent writing prompts


imagePool: [string] = [""];

  //For sample images
  imgPrev: String = "";
  imgPrev2: String = "";
  imgPrev3: String = "";

  //Test
  //Test
  display: boolean = false;


  //For image displays
  displayImgModal: boolean = false;
  displayWritingModal: boolean = false;
  displayWritingModalDesktop: boolean = false;
  imgModal: String = "";
  preSelection: boolean = false;

  //Modal variables 
    modalPostTitle: String = "";
    modalPostTxt: String = "";
    modalPostDate: String = "";
    modalPostImage: String = "";
    modalPostImages = [];
    modalPostUser: string = "";
    modalPostUserProfileImg: String = "";
    modalPostAuthor: string ="";
    modalPostID: string = "";
    modalPostLikes: string= "0";
    modalPostComments: string = "0";
    modalPostLiked: boolean = false;
    modalPostUnLiked: boolean = false;
    modalPostSaved: boolean = false;
    
  //Test
  count: string= "";


  //tempUser? 
    tempUsername: String = "";

  //Current user ID
   currentUserID: string = "";
   userData: any;

  //Create List
  likesList: string[] = [];
  savedList: string[] = [];


  //Final Updated
  finalNewArr: any[]= [];

  //Data Collection 
  dataCollected: boolean = false;
  legacyCollected: boolean = false;
  aevumCollected: boolean = false;


  //Constructor 
  constructor(
  private router: Router,
  public AuthService: AuthService,
  private userService: FirebaseService,
  private firebaseAuth: AngularFireAuth,
  private chapterService: ChapterService,
    ) { 
      this.firebaseAuth.authState.subscribe((user) =>{
        if(user){
          this.userData = user;
          
          localStorage.setItem('userData', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('userData')!);
        }else {
          localStorage.setItem('userData','null');
          JSON.parse(localStorage.removeItem('userData')!);
        }

      })
      
  }


  //Test Globals 
  first: any;
  firstPostID: any;
  firstLocalPostID: any;
  last: any; //For tracking 
  lastTimestamp: any;

 //For Legacy
 firstLegacy: any;
 firstLegacyPID: any;
 firstLocalLegacyPID: any;
 lastLegacy: any;
 lastLegacyTimestamp: any;

  //For Aevum 
  firstAevum: any;
  firstAevumPID: any;
  firstLocalAevumPID: any;
  lastAevum: any;
  lastAevumTimestamp: any;


 //For Modal Word Count 
 wordCount: any = 0;
 writtenPages: Array<any> = [];


  ngOnInit(): void {
  
    // localStorage.removeItem("AllPosts"); //Just to be safe
    // console.log(this.currentUserID)
    //Update the banner images
    // setInterval(this.shuffleImg, 7000);
    this.dataCollected = false;
    
    //Check User Status
    this.checkAuthStatus()
  
    //Check to see if there is local data 

    this.loadAllData();

    this.recentPostScrollCheck();
    this.recentImageScrollCheck();
    this.recentWritingScrollCheck();

  }

  recentPostScrollCheck(){

    //check logic for the scroll
    const element = document.getElementById('regularPostScroll');
    let lastScrollTop = 0;
    if(element != null){
      // alert("Element = " + element);
      console.log("Element = " + element);
    element.onscroll = (e)=>{
    if (element.scrollTop < lastScrollTop){
          // console.log("LastScroll = " + lastScrollTop);
          // upscroll 
          return;
       } 
       lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
        if (element.scrollLeft + element.offsetWidth>= element.scrollWidth ){
          //Search more in the query
          alert("Add more to query recent posts");
        }
    }
  }
  }

  recentImageScrollCheck(){
    //check logic for the scroll
    const element = document.getElementById('recentImagePostsScroll');
    let lastScrollTop = 0;
    if(element != null){
      // alert("Element = " + element);
      console.log("Element = " + element);
    element.onscroll = (e)=>{
    if (element.scrollTop < lastScrollTop){
          // console.log("LastScroll = " + lastScrollTop);
          // upscroll 
          return;
       } 
       lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
        if (element.scrollLeft + element.offsetWidth>= element.scrollWidth ){
          //Search more in the query
          alert("Add more to query recent Image posts");
        }
    }
    }
  }

  recentWritingScrollCheck(){
    //check logic for the scroll
    const element = document.getElementById('recentWritingScroll');
    let lastScrollTop = 0;
    if(element != null){
      // alert("Element = " + element);
      console.log("Element = " + element);
    element.onscroll = (e)=>{
    if (element.scrollTop < lastScrollTop){
          // console.log("LastScroll = " + lastScrollTop);
          // upscroll 
          return;
       } 
       lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
        if (element.scrollLeft + element.offsetWidth>= element.scrollWidth ){
          //Search more in the query
          alert("Add more to query recent Writing posts");
        }
    }
    }
  }


  //Check user status
  checkAuthStatus(){
    this.userService.authStatus()
  }

  localDataValue: any;
  localLegacyDV: any;
  localAevumDV: any;

  //Load all the data
  loadAllData(){

    //check to see if there is any local data
    this.dataCollected = false;
      //if not proceed

      //if so, compare the first item of the local storage to the first data item pulled


    //Quick check to see if data is in localstorage
    // if(localStorage.getItem("AllPosts") == null){
    //   alert("No Posts ... Fetching...");
    //   this.dataCollected = false;
    // }else{
    //   console.log("Data Found No need to fetch...")
    //   console.log("Fetching Localstorage. . . ")
      
    //   this.localDataValue = localStorage.getItem("AllPosts");
    //   this.localLegacyDV = localStorage.getItem("AllLegacies");

    //   if(this.localDataValue){
    //     //This is the working way of displaying the localDataValue
    //     //console.log("Local Data Collected Below ---");
    //     // console.log(this.localDataValue);
        
    //     this.loadLocalPosts();
    //     this.loadLocalLegacies();


    //   }
    //   this.dataCollected = true;
    // }

      if(!this.dataCollected){
          
            //Load the aevum collection items
            this.loadAevum();

            //Load the posts 
            this.loadPosts();
            
            //load the legacies
            this.loadLegacies();

            this.dataCollected = true
      }

  }

  loadLocalPosts(){
        
  //Load the post into the array
  this.allPosts.splice(0,1);
  this.recentPosts.splice(0,1);
  this.recentCollages.splice(0,1);
  this.recentStoryboards.splice(0,1);
  this.recentImgs.splice(0,1);
  this.recentWritings.splice(0,1);
  this.post.splice(0,1);
  this.postColB.splice(0,1);
  this.postColC.splice(0,1);

    //Get data from local wine   
    const dataLocal = this.localDataValue;
    const data = JSON.parse(dataLocal);
    // console.log("Loading Local Posts. . .")
    // console.log(data[0]);

    data.forEach((Post: any) =>{
      // console.log("Post Img: " + Post.image);
        //  console.log("Post title: " + Post.title);
        // console.log("Post type: " + Post.type);
      //recent Post

          //Add all single images to section 
          if(Post.image != ""  && (Post.type == "standard" || Post.type == null)){
            this.recentImgs.push(Post)
          }else if(Post.image == "" && Post.type == null && this.countWords(Post.text) < 99){
            
            this.recentPosts.push(Post);
            
           
          }else if(Post.type == "standard" && this.countWords(Post.text) < 99){
            
            this.recentPosts.push(Post);
            
           
          }else if(Post.type == "Images" || Post.type == "Manga"){
            Post.postImg = Post.postImgs[0];
            this.recentCollages.push(Post);
  
          }else if(this.countWords(Post.text) > 99 ||Post.type == "Writing"){
            var short_description = Post.text.split(' ').slice(100).join(' ');
            Post.type = "Writing";
            this.recentWritings.push(Post);
          }
    });
    
    //Assign the first and last post 
    this.first = data[0];
    this.last = data[data.length - 1];

    // console.log("First Post");
    // console.log(this.first);

    // console.log("Last Post");
    // console.log(this.last);

  }


  //Load in the Aevum collections
  loadAevum(){
    //Remove first unneeded element
    this.aevumList.splice(0,1);
    this.aevumActiveList.splice(0,1);
    this.aevumUpcomingList.splice(0,1);
    this.aevumClosedList.splice(0,1);

    //Get the aevum elements 
    this.AuthService.getAevum().subscribe(data => {

      //Clear
      localStorage.removeItem("AllAevum");

      //starting Variables 
      this.aevumActiveList = [];
      this.aevumUpcomingList = [];
      this.aevumClosedList = [];
      data.map(e => {
        const data = e.payload.doc.data() as Aevum

        //Creation of data object
        const dataUpload = {
          id: e.payload.doc.id,
          title: data.title as string,
          cover: data.cover as string,
          timestamp: data.timestamp as string,
          status: data.status as string, 
          text: data.text as string
        };

        if(dataUpload['status'] == "Active"){
          this.aevumActiveList.push(dataUpload);
          this.finalNewArr.push(dataUpload);
          this.newAevum = true;
        }
        else if(dataUpload['status'] == "upcoming"){
          this.aevumUpcomingList.push(dataUpload);
          this.newAevum = true;
        }else{
          this.aevumClosedList.push(dataUpload);
          this.newAevum = true;
        }
        // this.aevumList.push(dataUpload);

      });
        //some additional work required
        



    });

    

  }



  //Load in the user Legacies
  loadLegacies(){
 
    //Remove the empty legacy sample in array, idk why its needed
    this.legacyList.splice(0,1);

    //use the authservice to get the legacies
    this.AuthService.getLegacies().subscribe(data => {

      localStorage.removeItem("AllLegacies"); //Just to be safe
  
      data.map(e => {
        this.legacyList = [];
        const data = e.payload.doc.data() as Legacy
 
        //Set up the data object
            //Set up the data in an object
            const dataUpload = {
              id: e.payload.doc.id,
              title: data.title as string,
              desc: data.desc as string,
              cover: ((data.cover != "")  ? data.cover as string : "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2F%CE%95%CE%BB%CE%B5%CF%85%CC%81%CE%B8%CE%B5%CF%81%CE%B7%20%CF%83%CE%BA%CE%B5%CC%81%CF%88%CE%B7.PNG?alt=media&token=1ddf6078-d29a-4532-ab6a-026c6cd6f35d"),
              author: data.author as string,
              timestamp: data.timestamp as string,
              type: data.type as string,
              privacy: data.privacy as string,
              updated: data.updated as string,
            };
 
        //add legacies to array
        if(dataUpload['privacy'] == "public"){  
          this.legacyList.push(dataUpload);
          this.finalNewArr.push(dataUpload);
        }
       
      });

          //Additional info required for local storage 
          localStorage.setItem("AllLegacies", JSON.stringify(this.legacyList));

          this.firstLegacy = this.legacyList[0];
          this.lastLegacy = this.legacyList[this.legacyList.length - 1];
          


    })

    if(this.legacyList.length == 0){
     
      this.loadAllLegacy()
    }else{
     
      this.displayLegacyList = true;
    }


  }

  loadAllLegacy(){
  
    //Remove the empty legacy sample in array, idk why its needed
    this.legacyList.splice(0,1);

    //use the authservice to get the legacies
    this.AuthService.getAllLegacyPosts().subscribe(data => {
  
      localStorage.removeItem("AllLegacies"); //Just to be safe


      data.map(e => {
        // this.legacyList = [];
        const data = e.payload.doc.data() as Legacy
 
        //Set up the data object
            //Set up the data in an object
            const dataUpload = {
              id: e.payload.doc.id,
              title: data.title as string,
              desc: data.desc as string,
              cover: ((data.cover != "")  ? data.cover as string : "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2F%CE%95%CE%BB%CE%B5%CF%85%CC%81%CE%B8%CE%B5%CF%81%CE%B7%20%CF%83%CE%BA%CE%B5%CC%81%CF%88%CE%B7.PNG?alt=media&token=1ddf6078-d29a-4532-ab6a-026c6cd6f35d"),
              author: data.author as string,
              timestamp: data.timestamp as string,
              type: data.type as string,
              privacy: data.privacy as string,
              updated: data.updated as string,
            };
 
        //add legacies to array
        if(dataUpload['privacy'] == "public"){  
          this.legacyList.push(dataUpload);
          this.finalNewArr.push(dataUpload);
        }
       
      });
      //Additional info required for local storage 
        localStorage.setItem("AllLegacies", JSON.stringify(this.legacyList));

        this.firstLegacy = this.legacyList[0];
        this.lastLegacy = this.legacyList[this.legacyList.length - 1];
        


    })

    
  }

 loadLocalLegacies(){

  //Clean up 
  this.legacyList.splice(0,1);

  const dataLocal = this.localLegacyDV;
  const data = JSON.parse(dataLocal);

  data.forEach((Legacy: any) => {
      if(Legacy.privacy == "public"){
        this.legacyList.push(Legacy);
        this.finalNewArr.push(Legacy);
      }
    
  });

  this.firstLegacy = data[0];
  this.lastLegacy = data[data.length - 1];


 }



  showModalDialog(card:any){
  //Reset the Modal Variables
    this.modalPostLiked = false;
    this.modalPostSaved = false;
    //Empty out array values
    this.likesList = [];
    this.savedList = [];

    console.log("CARD INFO")
    console.log(card);

        //Get total likes for legacy id 
        //From list of likes see if the current user is hidden amonst list 
        this.AuthService.getLikes(card['id']).subscribe(data => {
          //Creation of data struction 
          data.map(e => {
            const data = e.payload.doc.id;
            this.likesList.push(data);
          })
          
          //Check to see if username is included     
            if(this.likesList.includes(this.userData['uid'])){
              this.modalPostLiked = true;
            }else{
              this.modalPostLiked = false;
            }
      })

    //Get the value of the likes 
      this.AuthService.getLikesCount(card['id']).subscribe(data => {
        
        this.modalPostLikes = data.size as unknown as string;
      })

    //Update the modal 
      //Modal variables
      if(card['type'] == "Images" || card['type'] == "standard" || card['image'] != ""){
        this.modalPostID = card['id'];
        this.modalPostTitle = card['title']
        this.modalPostTxt = card['text']
        this.modalPostDate = card['date']
        this.modalPostImage =  (card['type'] != "Images") ? card['image'] : ""
        this.modalPostImages =  (card['type'] == "Images") ? card['postImgs'] :  card['postImgs']
          //Display the modal
    this.displayModal=true;
   
      }
      else if(card['type'] == "Storyboard" ){
        this.modalPostID = card['id'];
        this.modalPostTitle = card['title']
        this.modalPostTxt = card['text']
        this.modalPostDate = card['date']
        this.modalPostImage =  ""
        this.modalPostImages =  card['postImgs'] 
          //Display the modal
    this.displayModal=true;
      }
      else if(card['type'] == "Writing" ){
        
        this.modalPostID = card['id'];
        this.modalPostTitle = card['title']
        this.modalPostTxt = card['text']
        this.modalPostDate = card['date']
        this.modalPostImage =  ""
        this.modalPostImages =  card['postImgs'] 
        this.displayWritingModal = true;
      }
 
     

  

    // console.log(card)
    this.loadUserInfo(card)
  }
  showModalDialogDesktop(card:any){
  //Reset the Modal Variables
  this.wordCount = 0;
  this.writtenPages = [];
    this.modalPostLiked = false;
    this.modalPostSaved = false;
    //Empty out array values
    this.likesList = [];
    this.savedList = [];

    console.log("CARD INFO")
    console.log(card);

        //Get total likes for legacy id 
        //From list of likes see if the current user is hidden amonst list 
        this.AuthService.getLikes(card['id']).subscribe(data => {
          //Creation of data struction 
          data.map(e => {
            const data = e.payload.doc.id;
            this.likesList.push(data);
          })
          
          //Check to see if username is included     
            if(this.likesList.includes(this.userData['uid'])){
              this.modalPostLiked = true;
            }else{
              this.modalPostLiked = false;
            }
      })

    //Get the value of the likes 
      this.AuthService.getLikesCount(card['id']).subscribe(data => {
        this.modalPostLikes = data.size as unknown as string;
      })

    //Update the modal 
      //Modal variables
      if(card['type'] == "Images" || card['type'] == "standard" || card['image'] != ""){
        this.modalPostID = card['id'];
        this.modalPostTitle = card['title']
        this.modalPostTxt = card['text']
        this.modalPostDate = card['date']
        this.modalPostImage =  (card['type'] != "Images") ? card['image'] : ""
        this.modalPostImages =  (card['type'] == "Images") ? card['postImgs'] :  card['postImgs']
          //Display the modal
    this.displayModal=true;
   
      }
      else if(card['type'] == "Storyboard" ){
        this.modalPostID = card['id'];
        this.modalPostTitle = card['title']
        this.modalPostTxt = card['text']
        this.modalPostDate = card['date']
        this.modalPostImage =  ""
        this.modalPostImages =  card['postImgs'] 
          //Display the modal
    this.displayModal=true;
      }
      else if(card['type'] == "Writing" ){
        
        this.modalPostID = card['id'];
        this.modalPostTitle = card['title']
        this.modalPostTxt = card['text']
        this.modalPostDate = card['date']
        this.modalPostImage =  ""
        this.modalPostImages =  card['postImgs'] 
        this.displayWritingModalDesktop = true;
      }
 

      //Start of the Word Count Theory 
      let text = this.modalPostTxt;
      var  pretext = "";
      var index = 0;

            // Loop through the text
            // and count spaces in it

            for (let i = 0; i < text.length; i++) {
              let currentCharacter = text[i];
              pretext += text[i];

              // Check if the character is a space
              if (currentCharacter == " ") {
                  this.wordCount += 1;
              }

              if(this.wordCount == 250)
              {
                index++;
                this.wordCount = 0;
                this.writtenPages.push({
                  "PageText" : pretext,
                  "Page": index
                })
              }
          }

          // Add 1 to make the count equal to
          // the number of words 
          // (count of words = count of spaces + 1)
          this.wordCount += 1;

       

      //End of the word count theory 
     

  

    // console.log(card)
    this.loadUserInfo(card)
  }

  showModalMangaDialog(card:any){
    //Reset the Modal Variables
      this.modalPostLiked = false;
      this.modalPostSaved = false;
      //Empty out array values
      this.likesList = [];
      this.savedList = [];
  
      console.log("CARD INFO")
      console.log(card);
  
          //Get total likes for legacy id 
          //From list of likes see if the current user is hidden amonst list 
          this.AuthService.getLikes(card['id']).subscribe(data => {
            //Creation of data struction 
            data.map(e => {
              const data = e.payload.doc.id;
              this.likesList.push(data);
            })
            
            //Check to see if username is included     
              if(this.likesList.includes(this.userData['uid'])){
                this.modalPostLiked = true;
              }else{
                this.modalPostLiked = false;
              }
        })
  
      //Get the value of the likes 
        this.AuthService.getLikesCount(card['id']).subscribe(data => {
          
          this.modalPostLikes = data.size as unknown as string;
        })
  
      //Update the modal 
      if(card['type'] == "Manga" ){
          this.modalPostID = card['id'];
          this.modalPostTitle = card['title']
          this.modalPostTxt = card['text']
          this.modalPostDate = card['date']
          
          this.modalPostImages =  card['postImgs'] 
          this.mangaPageLimit = this.modalPostImages.length;
            //Display the modal
      this.displayMangaModal=true;
        }
   
       
  
    
  
      // console.log(card)
      this.loadUserInfo(card)
    }
  

  incrementMangaPage(){
    // 1 & 2
    // 3 & 4 
    if((this.mangaPage+1) == this.mangaPageLimit){
      this.closeModalDialogue();
    }

    if(!this.readingManga){
      this.readingManga = true;
      this.mangaPage = this.mangaPage + 2;
    }else {
      this.mangaPage = this.mangaPage + 2;
    }
  }

  decrementMangaPage(){
    if((this.mangaPage-1) == 0){
      this.closeModalDialogue();
      this.mangaPage = 0;
    }
    if((this.mangaPage - 1) > 0){
      this.mangaPage = this.mangaPage - 2;
    }
   
  }


  closeManga(){
    this.closeModalDialogue();
    this.mangaPage = 0;
  }

  validateMangaClose(){
    // alert("Page: " + this.mangaPage + "Limit: " + this.mangaPageLimit);
    
  }

  closeModalDialogue(){
    //Close the modal
    // this.displayModal = false;
    if(this.preSelection){
      this.preSelection = false;
    }else{
      // alert("Close Modal");
      this.displayModal=false
      this.displayWritingModal=false;
      this.displayMangaModal = false;
      this.mangaPage = 0;
      
    }
  }
 

  navigateLegacy(card:any){
    //Navigate forwarad to legacy page
    const queryParams: Params = { id: card['id'] };
    this.router.navigate(['/Legacy'],
    {
      queryParams: queryParams,
      queryParamsHandling: 'merge', 
    });

  }

  navigateChapter(card:any){    
    console.log("CARDID: " + card['id']);
    //Navigate forwarad to legacy page
    const queryParams: Params = { id: card['id'] };
    this.router.navigate(['/Reading'],
    {
      queryParams: queryParams,
      queryParamsHandling: 'merge', 
    });

  }

  showLegacyModal(card:any){
    //Reset the Modal Variables
    this.modalPostLiked = false;
    this.modalPostSaved = false;
    this.likesList = [];
    this.savedList = [];

    //Update the modal 
      //Set Modal variables
        this.modalPostTitle = card['title']
        this.modalPostTxt = card['desc']
        this.modalPostDate = card['updated']
        this.modalPostImage = card['cover']
        this.modalPostID = card['id']
     
      
    //Get total likes for legacy id 
        //From list of likes see if the current user is hidden amonst list 
        this.AuthService.getLegacyLikes(this.modalPostID).subscribe(data => {
            //Creation of data struction 
            data.map(e => {
              const data = e.payload.doc.id;
              this.likesList.push(data);
            })
            
            //Check to see if username is included     
              if(this.likesList.includes(this.userData['uid'])){
                this.modalPostLiked = true;
              }else{
                this.modalPostLiked = false;
              }
        })

        //Check to see if saved already
          this.AuthService.getLegacySaves(this.modalPostID,this.userData['uid']).subscribe(data => {
            data.map(e => {
              const data = e.payload.doc.id;
              this.savedList.push(data)
              // console.log(this.savedList)
            })

              //Confirm if the username is included
              if(this.savedList.includes(this.modalPostID)){
                this.modalPostSaved = true;
              }else{
                this.modalPostSaved = false;
              }

          })


    //Display the modal
    this.displayLegacyModal=true;

    // console.log(card)
    this.loadUserInfo(card)
  }
  
//Working loadPosts Method
  loadPosts(){
    
//Load the post into the array
    this.allPosts.splice(0,1);
    this.recentPosts.splice(0,1);
    this.recentCollages.splice(0,1);
    this.recentStoryboards.splice(0,1);
    this.recentImgs.splice(0,1);
    this.recentWritings.splice(0,1);
    this.post.splice(0,1);
    this.postColB.splice(0,1);
    this.postColC.splice(0,1);

    //TempID Needed to get likes


    this.AuthService.getPosts().subscribe(data => {
      //Set data in local storage
      localStorage.removeItem("AllPosts"); //Just to be safe
      

      
      //Set the last variable
      
      
      //Prep each of the columns 
      this.allPosts = [];
      this.recentCollages = [] 
      this.recentPosts = []
      this.recentStoryboards = []
      this.recentImgs = []
      this.recentWritings = []


      data.map(e => {    
        
        

        //Const Data e.payload.doc.data() as Type needed to avoid error of object unknown
        const data = e.payload.doc.data() as Post
   
        //Set up the data in an object
        const mobileUpload = {
          id: e.payload.doc.id,
          title: data.title as string,
          text: data.text as string,
          image: ((data.postImg != "")  ? data.postImg as string : ""),
          numLikes: ((data.NumLikes != null) ? data.NumLikes as string : "0"),
          numComments: ((data.NumComments != null) ? data.NumComments as string : "0"),
          userKey: data.userkey as string,
          date: data.date as string,
          type: data.type as String,
          postImgs: data.postImgs as any,
          username: data.username as string
        };
        const dataUpload = {
          id: e.payload.doc.id,
          title: data.title as string,
          text: data.text as string,
          image: ((data.postImg != "")  ? data.postImg as string : ""),
          numLikes: ((data.NumLikes != null) ? data.NumLikes as string : "0"),
          numComments: ((data.NumComments != null) ? data.NumComments as string : "0"),
          userKey: data.userkey as string,
          date: data.date as string,
          timestamp: data.timestamp as string,
          type: data.type as String,
          postImgs: data.postImgs as any,
          username: data.username as string
        };

        //Test the getuser info function 
        var userBox = this.getUser(data.userkey as String);
      
        //Add all posts to mobile posts 
        this.mobilePosts.push(mobileUpload);

        //Append to all post
        this.allPosts.push(dataUpload);


          //Add all single images to section 
        if(dataUpload['image'] != ""  && (dataUpload['type'] == "standard" || dataUpload['type'] == null)){
          this.recentImgs.push(dataUpload)
        }else if(dataUpload['image'] == "" && dataUpload['type'] == null && this.countWords(dataUpload['text']) < 99){
          
          this.recentPosts.push(dataUpload);
          
         
        }else if(dataUpload['type'] == "standard" && this.countWords(dataUpload['text']) < 99){
          
          this.recentPosts.push(dataUpload);
          
         
        }else if((dataUpload['type'] == "Images" || dataUpload['type'] == "Storyboard" || dataUpload['type'] == "Manga") && data.postImgs != null){
          console.log("Data upload Test for image")
          console.log("Data upload Test for image II : " + data.postImgs[0]);
          console.log(dataUpload);
          dataUpload['image'] = data.postImgs[0];
          this.recentCollages.push(dataUpload);

        }else if(this.countWords(dataUpload['text']) > 99 ||dataUpload['type'] == "Writing"){
          var short_description = dataUpload['text'].split(' ').slice(100).join(' ');
          dataUpload['type'] = "Writing";
          this.recentWritings.push(dataUpload);
        }
 
     

        //Add images to image pool 
        this.imagePool.push(dataUpload['image']);

        
         //Get Likes 
        this.AuthService.getLikes(dataUpload['id'])
        
   

      })
       console.log("Number of Posts collected: " + this.allPosts.length);
       localStorage.setItem("AllPosts", JSON.stringify(this.allPosts));

       //Set up the first and Last 
       this.first = this.allPosts[0];
       this.last = this.allPosts[this.allPosts.length - 1];
       this.lastTimestamp = this.allPosts[this.allPosts.length - 1].timestamp;

        // console.log("First Post");
        // console.log(this.first);

        // console.log("Last Post");
        // console.log(this.last);

        // console.log("Last TimeStamp");
        // console.log(this.lastTimestamp);

    })

    // console.log("Number of Posts collected: " + this.allPosts.length);
    

  }

  
  loadUserInfo(userInfo: any){

      var userKey = userInfo['userKey']
      this.AuthService.getUserInfo(userKey).then(data => {
        const userData = data.data() as User;
        this.modalPostUser = userData.displayName as string;
        this.modalPostUserProfileImg = userData.photoURL as string;

      })
  }

  reRoute(id?: string ){
    //Reroute to the legacy page 
    // console.log("ID: " + id);

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
    sessionStorage.setItem('returnValue', "Home")
    this.router.navigate(['/Reading']);

}else{
  console.log("No Data to report");
  this.chapterService.setChapter(chapter);
  console.log("Storing new chapter");
  sessionStorage.setItem('chapterData',JSON.stringify(chapter));
  sessionStorage.setItem('returnValue', "Home")
  this.router.navigate(['/Reading']);
}
  
}


  getUser(userKey: String){
    this.AuthService.getUserInfo(userKey as string).then(data => {
        
      const userData = data.data() as User;
      this.tempUsername = userData as string;
    })
   
    return this.tempUsername as string;

  }




  showDialog() {
    this.display = true;
 }

 //Get regular post Likes
  getLikesNum(postID: string){
      return this.AuthService.getLikesCount(postID);
  }
 
//Like Post
  likeLegacyPost(legacyID: string){
    const userID = JSON.parse(localStorage.getItem('userData')!);
    this.AuthService.likeLegacyPost(legacyID ,userID.uid);
  }

  unlikeLegacyPost(legacyID: string){
    this.AuthService.unLikeLegacyPost(legacyID, this.userData['uid']);
  }

//Save Post
  saveLegacy(legacyID: string){
    this.AuthService.saveLegacyPost(legacyID, this.userData['uid']);
  }

  unSaveLegacy(legacyID: string){
    this.AuthService.unSaveLegacyPost(legacyID, this.userData['uid']);
  }

  //Add Like to legacy tally
  addLegacyLike(legacyID: string){
    this.AuthService.addLegacyLike(legacyID, this.userData['uid']);
  }

  removeLegacyLike(legacyID: string, ){
    this.AuthService.removeLegacyLike(legacyID, this.userData['uid']);
  }
  //Add Like to legacy tally
  addLegacyReader(legacyID: string){
    this.AuthService.addLegacyFollower(legacyID, this.userData['uid']);
  }

  removeLegacyReader(legacyID: string){
    this.AuthService.removeLegacyFollower(legacyID, this.userData['uid']);
  }


//Shuffle images at the top banner
  shuffleImg(){
    //shuffle images 
    var index =  (Math.floor(Math.random() * 19) + 1);
    var index2 = (Math.floor(Math.random() * 19) + 1);
    var index3 = (Math.floor(Math.random() * 19) + 1);

    // //Handle the animations
    // ( document.getElementById("bannerImgLeft") as HTMLImageElement).style.animation = "rightSlide 3s";
    // ( document.getElementById("bannerImgCenter") as HTMLImageElement).style.animation = imgPool[index2];
    // ( document.getElementById("bannerImgRight") as HTMLImageElement).style.animation = imgPool[index3];

    //Now handle updating the images
  
      ( document.getElementById("bannerImgLeft") as HTMLImageElement).src = this.imagePool[index];
      ( document.getElementById("bannerImgCenter") as HTMLImageElement).src = this.imagePool[index2];
      ( document.getElementById("bannerImgRight") as HTMLImageElement).src = this.imagePool[index3];
     
  }


  //For modal display
  displayModal: boolean =false;
  displayLegacyModal: boolean = false;
  displayMangaModal: boolean = false;
  mangaPage: number = 0;
  mangaPageLimit: number = 0;
  readingManga: boolean = false;

  countWords(str: any) {
    str = str.replace(/(^\s*)|(\s*$)/gi,"");
    str = str.replace(/[ ]{2,}/gi," ");
    str = str.replace(/\n /,"\n");
    return str.split(' ').length;
    }

  

  
  closeLegacyModal(){
    //Close the modal
    // this.displayModal = false;
    if(this.preSelection){
      this.preSelection = false;
    }else{
      // alert("Close Modal");
      this.displayLegacyModal=false
    }
  }
 
  //Modal functions
      // modal image function display 
      displayModalImg(){
        this.displayImgModal= true;
      }
      
          // modal image function display 
          displayModalWriting(){
            this.displayWritingModal= true;
          }

      //Show the image Modal
      setImageModal(){
        this.displayModalImg();
        this.imgModal = "";
        this.imgModal = this.modalPostImage
        // console.log("Image Value: " + image);
        // console.log("ImgModal: " + this.imgModal)
        this.preSelection=true
      }
      setCollageImageModal(image: String){
        this.displayModalImg();
        this.imgModal = "";
        this.imgModal = image
        // console.log("Image Value: " + image);
        // console.log("ImgModal: " + this.imgModal)
        this.preSelection=true
      }

      //Hide the image modal
      closeImgModal(){
        this.displayImgModal=false
      }

      closeWritingModal(){
        this.displayWritingModal=false;
      }

  //Test redirections
  goProfile(){
    alert("Going to Profile Page")
    this.preSelection=true;
  }

  likeModalPost(postID: string){
    this.AuthService.likePost(postID, this.userData['uid']);
    var temp: number =+this.modalPostLikes;
    var newVal = temp + 1;
    this.modalPostLikes = newVal as unknown as string;
  }
  unLikeModalPost(postID: string){
    this.AuthService.unLikePost(postID, this.userData['uid']);
    var temp: number =+this.modalPostLikes;
    if(temp != 0){
      var newVal = temp - 1;
      this.modalPostLikes = newVal as unknown as string;
    }
  }

  commentPost(){
    // alert("Comment Post")
    this.preSelection=true
  }

  

}
