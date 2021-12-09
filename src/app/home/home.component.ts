import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { PostsService } from '../services/posts.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

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
  imgPool: String[] = [
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0078.jpg?alt=media&token=1fb2d9e0-e16c-4bd7-a0d4-338914644a95",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_4533.jpg?alt=media&token=778bd24d-85d3-4fa9-afbd-746ca36b545b",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0132.jpg?alt=media&token=7f967075-407b-47fe-b717-8289fbefae05",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F139B40DF-605B-413E-856A-779E7DB486D2.png?alt=media&token=3ab9687a-fc4e-49b4-b17a-15c9e98d6ea9",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F783E2489-C126-4C86-8638-E7358B037EBF.jpeg?alt=media&token=3476c3a3-6672-414f-a889-6d02c7bbcc09",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA0F36188-5CF2-4363-A318-47738A38CB7B.jpeg?alt=media&token=2f806254-6039-4a37-a1f3-177f908c69e5",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FE499D577-C397-4BAD-BABC-B2FAE698F08E.jpeg?alt=media&token=8e0a4d85-4768-40a4-8079-03c269a52cef",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FFDE729A0-B3A3-4A91-B343-DE162DFE5AF3.jpeg?alt=media&token=81b11ded-0cc2-48a2-bcc1-ea5acd11f63c",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FC15A5317-C143-4303-BD42-4899D48AB54F.jpeg?alt=media&token=8b0dca04-f269-48ef-8756-17997ec2235d",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FGTpmGkBx6iQWfgmjn9jxkKYBkPn1%2Fimages%2FBE254897-317C-40F9-8EB5-3E6F7F8B8D67.jpeg?alt=media&token=202ddbf9-a7b1-43a2-bbd7-e756197b00a5",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FUntitled_Artwork%2035.png?alt=media&token=64599dbc-a4d7-4dad-a980-336d7c09a077",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F2b67925f-7dff-4070-8ded-15665d3a7ca9.png?alt=media&token=e746ac03-0f38-402d-845c-a9a75846cfac",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F83D7885A-9D9C-4D02-8257-8B38744FA835.jpeg?alt=media&token=71e3b24f-46a9-4817-a186-a3e983e656d5",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FGTpmGkBx6iQWfgmjn9jxkKYBkPn1%2Fimages%2FB6065E30-1353-4F39-96DC-17E32AC92BB0.jpeg?alt=media&token=bee25e36-c348-4b6b-b6dd-c83ac69db2bc",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FCCF733DE-0488-49E1-B128-95350491A843.jpeg?alt=media&token=ad602b29-0866-4796-9d3d-bc66ac99c262",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FB1BF8558-3D05-46E1-830B-627CD82B5A78.jpeg?alt=media&token=a286c12d-5f26-4f71-a720-c83f3a55ad40",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA%26A.png?alt=media&token=68e4c8e2-a92d-47ba-ae99-090daa4303f5",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FD27BD2CD-1334-4F27-AA66-DCCA45A93166_1_105_c.jpeg?alt=media&token=317823c2-e15d-4b3b-b6e9-293b0871028f",
    "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FΕλεύθερη%20σκέψη.PNG?alt=media&token=8eeab48b-e3d0-42fd-bff8-d0f06482e96f"
  ];

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

  //For sample images
  imgPrev: String = "";
  imgPrev2: String = "";
  imgPrev3: String = "";


  //Constructor 
  constructor(
    private ps: PostsService
    ) { 

  }

  ngOnInit(): void {
    setInterval(this.shuffleImg, 7000);

    //Fetch the user posts
    // this.firebaseService.checkAuth();
    this.ps.getUserPosts()



  }


 

  shuffleImg(){
    //shuffle images 
    var index =  Math.floor(Math.random() * 19);
    var index2 = (Math.floor(Math.random() * 19));
    var index3 = Math.floor(Math.random() * 19);

    //Array for images
    var imgPool = [
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0078.jpg?alt=media&token=1fb2d9e0-e16c-4bd7-a0d4-338914644a95",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_4533.jpg?alt=media&token=778bd24d-85d3-4fa9-afbd-746ca36b545b",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0132.jpg?alt=media&token=7f967075-407b-47fe-b717-8289fbefae05",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F139B40DF-605B-413E-856A-779E7DB486D2.png?alt=media&token=3ab9687a-fc4e-49b4-b17a-15c9e98d6ea9",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F783E2489-C126-4C86-8638-E7358B037EBF.jpeg?alt=media&token=3476c3a3-6672-414f-a889-6d02c7bbcc09",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA0F36188-5CF2-4363-A318-47738A38CB7B.jpeg?alt=media&token=2f806254-6039-4a37-a1f3-177f908c69e5",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FE499D577-C397-4BAD-BABC-B2FAE698F08E.jpeg?alt=media&token=8e0a4d85-4768-40a4-8079-03c269a52cef",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FFDE729A0-B3A3-4A91-B343-DE162DFE5AF3.jpeg?alt=media&token=81b11ded-0cc2-48a2-bcc1-ea5acd11f63c",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FC15A5317-C143-4303-BD42-4899D48AB54F.jpeg?alt=media&token=8b0dca04-f269-48ef-8756-17997ec2235d",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FGTpmGkBx6iQWfgmjn9jxkKYBkPn1%2Fimages%2FBE254897-317C-40F9-8EB5-3E6F7F8B8D67.jpeg?alt=media&token=202ddbf9-a7b1-43a2-bbd7-e756197b00a5",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FUntitled_Artwork%2035.png?alt=media&token=64599dbc-a4d7-4dad-a980-336d7c09a077",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F2b67925f-7dff-4070-8ded-15665d3a7ca9.png?alt=media&token=e746ac03-0f38-402d-845c-a9a75846cfac",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F83D7885A-9D9C-4D02-8257-8B38744FA835.jpeg?alt=media&token=71e3b24f-46a9-4817-a186-a3e983e656d5",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FGTpmGkBx6iQWfgmjn9jxkKYBkPn1%2Fimages%2FB6065E30-1353-4F39-96DC-17E32AC92BB0.jpeg?alt=media&token=bee25e36-c348-4b6b-b6dd-c83ac69db2bc",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FCCF733DE-0488-49E1-B128-95350491A843.jpeg?alt=media&token=ad602b29-0866-4796-9d3d-bc66ac99c262",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FB1BF8558-3D05-46E1-830B-627CD82B5A78.jpeg?alt=media&token=a286c12d-5f26-4f71-a720-c83f3a55ad40",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA%26A.png?alt=media&token=68e4c8e2-a92d-47ba-ae99-090daa4303f5",
      "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FD27BD2CD-1334-4F27-AA66-DCCA45A93166_1_105_c.jpeg?alt=media&token=317823c2-e15d-4b3b-b6e9-293b0871028f",
    ];


    // //Handle the animations
    // ( document.getElementById("bannerImgLeft") as HTMLImageElement).style.animation = "rightSlide 3s";
    // ( document.getElementById("bannerImgCenter") as HTMLImageElement).style.animation = imgPool[index2];
    // ( document.getElementById("bannerImgRight") as HTMLImageElement).style.animation = imgPool[index3];

    //Now handle updating the images
      ( document.getElementById("bannerImgLeft") as HTMLImageElement).src = imgPool[index];
      ( document.getElementById("bannerImgCenter") as HTMLImageElement).src = imgPool[index2];
      ( document.getElementById("bannerImgRight") as HTMLImageElement).src = imgPool[index3];




    
  }

}
