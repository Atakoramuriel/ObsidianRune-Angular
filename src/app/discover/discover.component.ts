import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {



  AevumMenuList = [
    {
      title: '',
      cover: "",
      desc: "",
      action: ""

    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
