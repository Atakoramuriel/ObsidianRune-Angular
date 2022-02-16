import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { PostsService } from '../services/posts.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Post } from '../models/post';
import * as $ from 'jquery'
import { User } from '../models/user';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


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
  //Test for array
  legacyList = [
    {
      title: 'Obsidian',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0132.jpg?alt=media&token=7f967075-407b-47fe-b717-8289fbefae05"
    },
    {
      title: 'Midnight Sun',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA0F36188-5CF2-4363-A318-47738A38CB7B.jpeg?alt=media&token=2f806254-6039-4a37-a1f3-177f908c69e5"
    },
    {
      title: 'Blood Sun',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FC15A5317-C143-4303-BD42-4899D48AB54F.jpeg?alt=media&token=8b0dca04-f269-48ef-8756-17997ec2235d"
    },
    {
      title: 'Memory',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_4533.jpg?alt=media&token=778bd24d-85d3-4fa9-afbd-746ca36b545b"
    }
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

recentPosts = [
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: ""
  }
]; //Recent Posts

recentImgs =[
  {
    id: "",
    title: "",
    text: "",
    image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
    numLikes: ""
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

recentWritings = [  {
  id: "",
  title: "",
  text: "",
  image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2FMint.png?alt=media&token=1d6925dd-efc9-4f5e-9110-79ca1d7200ea",
  numLikes: ""
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
  imgModal: String = "";
  preSelection: boolean = false;

  //Modal variables 
    modalPostTitle: String = "";
    modalPostTxt: String = "";
    modalPostDate: String = "";
    modalPostImage: String = "";
    modalPostUser: string = "";
    modalPostUserProfileImg: String = "";


  //Constructor 
  constructor(
  public AuthService: AuthService
    ) { 

  }

  ngOnInit(): void {

    //Update the banner images
    // setInterval(this.shuffleImg, 7000);
    
    
    
    //Load the posts 
    this.loadPosts();

  }



//Test
  loadPosts(){

    

//Load the post into the array
    this.recentPosts.splice(0,1);
    this.recentCollages.splice(0,1);
    this.recentImgs.splice(0,1);
    this.recentWritings.splice(0,1);
    this.post.splice(0,1);
    this.postColB.splice(0,1);
    this.postColC.splice(0,1);

    //TempID Needed to get likes


    this.AuthService.getPosts().subscribe(data => {
       data.map(e => {
        //Const Data e.payload.doc.data() as Type needed to avoid error of object unknown
        const data = e.payload.doc.data() as Post
        const dataUpload = {
          id: e.payload.doc.id,
          title: data.title as string,
          text: data.text as string,
          image: ((data.postImg != "")  ? data.postImg as string : "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2F%CE%95%CE%BB%CE%B5%CF%85%CC%81%CE%B8%CE%B5%CF%81%CE%B7%20%CF%83%CE%BA%CE%B5%CC%81%CF%88%CE%B7.PNG?alt=media&token=1ddf6078-d29a-4532-ab6a-026c6cd6f35d"),
          numLikes: ((data.NumLikes != null) ? data.NumLikes as string : "0"),
          numComments: ((data.NumComments != null) ? data.NumComments as string : "0"),
          userKey: data.userkey as string,
          date: data.date as string,
          type: data.type as String,
          postImgs: data.postImgs as any
        };
        

        //Add the first twenty to recent posts
        if(this.recentCount <= 15){
          this.recentPosts.push(dataUpload);
          this.recentCount = this.recentCount + 1;
         
        }
        
        //Add all single images to section 
        if(dataUpload['image'] != "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/Classes%2F%CE%95%CE%BB%CE%B5%CF%85%CC%81%CE%B8%CE%B5%CF%81%CE%B7%20%CF%83%CE%BA%CE%B5%CC%81%CF%88%CE%B7.PNG?alt=media&token=1ddf6078-d29a-4532-ab6a-026c6cd6f35d"){
          this.recentImgs.push(dataUpload)
        }

        //Add all of the image collages 
        if(dataUpload['type'] == "Images"){
          console.log("Array Value");
          this.recentCollages.push(dataUpload);
          console.log(this.recentCollages);
        }

        if(this.recentCount > 15){
       
       //Randomly add posts to different rows
            if(this.post.length < 30){
              this.post.push(dataUpload)
          }else if(this.postColB.length < 30){
              this.postColB.push(dataUpload)
          }else if(this.postColC.length < 30){
              this.postColC.push(dataUpload)
          }
        }
 
        console.log(this.recentCount);

        //Add images to image pool 
        this.imagePool.push(dataUpload['image']);

        
         //Get Likes 
        this.AuthService.getLikes(dataUpload['id'])
        
   

      })
    })

   

  }

  loadUserInfo(userInfo: any){
      var userKey = userInfo['userKey']
      this.AuthService.getUserInfo(userKey).then(data => {
        const userData = data.data() as User;
        console.log(" __ Data Below __");
        console.log(userData.displayName);
        this.modalPostUser = userData.displayName as string;
        this.modalPostUserProfileImg = userData.photoURL as string;

      })
  }



  showDialog() {
    this.display = true;
 }
 
//Like Post
  likePost(){

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

  showModalDialog(card:any){
    console.log(card)
    //Update the modal 
      //Modal variables 
        this.modalPostTitle = card['title']
        this.modalPostTxt = card['text']
        this.modalPostDate = card['date']
        this.modalPostImage = card['image']
     

    //Display the modal
    this.displayModal=true;

    // console.log(card)
    this.loadUserInfo(card)
  }

  closeModalDialogue(){
    //Close the modal
    // this.displayModal = false;
    if(this.preSelection){
      this.preSelection = false;
    }else{
      // alert("Close Modal");
      this.displayModal=false

    }
  }
 
  //Modal functions
      // modal image function display 
      displayModalImg(){
        this.displayImgModal= true;
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

      //Hide the image modal
      closeImgModal(){
        this.displayImgModal=false
      }


  //Test redirections
  goProfile(){
    alert("Going to Profile Page")
    this.preSelection=true;
  }

  likeModalPost(){
    alert("Liked Post")
    this.preSelection=true
  }

  commentPost(){
    alert("Comment Post")
    this.preSelection=true
  }



}
