import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Test for array
  testList = [
    {
      title: 'Obsidian',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0132.jpg?alt=media&token=7f967075-407b-47fe-b717-8289fbefae05"
    },
    {
      title: 'Midnight Sun',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA0F36188-5CF2-4363-A318-47738A38CB7B.jpeg?alt=media&token=2f806254-6039-4a37-a1f3-177f908c69e5"
    },
    {
      title: 'Nocturne',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0078.jpg?alt=media&token=1fb2d9e0-e16c-4bd7-a0d4-338914644a95"
    },
    {
      title: 'Red Storm',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FC15A5317-C143-4303-BD42-4899D48AB54F.jpeg?alt=media&token=8b0dca04-f269-48ef-8756-17997ec2235d"
    },
    {
      title: 'Sacred Flame',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA2CB3D73-7042-44EB-8076-0F22AD72A934.jpeg?alt=media&token=b57bc02a-fcea-46ed-be73-cc1f64a65db6"
    }
  ];


  //For recent Post Row
  RecentPost = [
    {
      title: 'Nightmare Flame',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA2CB3D73-7042-44EB-8076-0F22AD72A934.jpeg?alt=media&token=b57bc02a-fcea-46ed-be73-cc1f64a65db6"
    },
    {
      title: 'Crisis Lore',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FE499D577-C397-4BAD-BABC-B2FAE698F08E.jpeg?alt=media&token=8e0a4d85-4768-40a4-8079-03c269a52cef"
    },
    {
      title: 'Familia o',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F83D7885A-9D9C-4D02-8257-8B38744FA835.jpeg?alt=media&token=71e3b24f-46a9-4817-a186-a3e983e656d5"
    },
    {
      title: 'Flight',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FCCF733DE-0488-49E1-B128-95350491A843.jpeg?alt=media&token=ad602b29-0866-4796-9d3d-bc66ac99c262"
    },
    {
      title: 'Dias Rojo',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_4533.jpg?alt=media&token=778bd24d-85d3-4fa9-afbd-746ca36b545b"
    }
 
  ];
  WritingList = [
    {
      title: 'Solas Rojo',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16"
    },
    {
      title: 'Dia de Nocturne',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16"
    },
    {
      title: 'CrisisRe Veritas',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16"
    },
    {
      title: 'Dragon',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16"
    },
    {
      title: 'Comnplete',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_0140.PNG?alt=media&token=3c72eed7-b2f1-4be7-a20a-cc7b1e7a0a16"
    }
 
  ];
  NFT = [
    {
      title: 'Nightmare Flame',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FA2CB3D73-7042-44EB-8076-0F22AD72A934.jpeg?alt=media&token=b57bc02a-fcea-46ed-be73-cc1f64a65db6"
    },
    {
      title: 'Crisis Lore',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FE499D577-C397-4BAD-BABC-B2FAE698F08E.jpeg?alt=media&token=8e0a4d85-4768-40a4-8079-03c269a52cef"
    },
    {
      title: 'Familia o',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2F83D7885A-9D9C-4D02-8257-8B38744FA835.jpeg?alt=media&token=71e3b24f-46a9-4817-a186-a3e983e656d5"
    },
    {
      title: 'Flight',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FCCF733DE-0488-49E1-B128-95350491A843.jpeg?alt=media&token=ad602b29-0866-4796-9d3d-bc66ac99c262"
    },
    {
      title: 'Dias Rojo',
      image: "https://firebasestorage.googleapis.com/v0/b/obsidianrune-vuejs.appspot.com/o/N4Posts%2FItVzlZqqYXQukCYVI3TZodI7oQq2%2Fimages%2FIMG_4533.jpg?alt=media&token=778bd24d-85d3-4fa9-afbd-746ca36b545b"
    }
 
  ];


  constructor() { 
   
  }

  ngOnInit(): void {

  }

}
