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
      title: 'Night & Time',
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
     documents = [
        { employees: [ {name: 'John Smith', age: 28},
                {name: 'Sarah Johnson', age: 32},
                {name: 'Mark Miller', age: 46}
            ]
        },
        { employees: [ ] },
        { employees: [ {name: 'Jimmy Colleen', age: 35},
                {name: 'Olivia Powell', age: 37}
            ]
        },
    ];


  constructor() { 
   
  }

  ngOnInit(): void {

  }

}
