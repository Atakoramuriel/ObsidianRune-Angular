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
  menuList: String[] = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5"]

  //username


  constructor() { }

  ngOnInit(): void {
  }

}
