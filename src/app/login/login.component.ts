import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  infinity: Object[] = [];

  constructor() { 
    this.infinity = [
      {word: 'Night Day Infinity Eternal Connect Time Nocturne Protect Love'},
      {word: 'الليل ، اليوم ، اللانهاية ، الأبدية ، الاتصال ، الوقت ، الموسيقى الهادئة ، حماية ، الحب'},
      {word: '夜、日、無限、永遠、接続、時間、夜想曲、守る、愛'},
      {word: 'Ημέρα Νύχτας Άπειρη Αιώνια Σύνδεση Χρόνος  Προστατεύστε την Αγάπη'},
      {word: '夜，天，,无限，永恒，连接，时间，夜曲，保护，爱'}
  ]
  }

  ngOnInit(): void {
    this.infinity = [
      {word: 'Night Day Infinity Eternal Connect Time Nocturne Protect Love'},
      {word: 'الليل ، اليوم ، اللانهاية ، الأبدية ، الاتصال ، الوقت ، الموسيقى الهادئة ، حماية ، الحب'},
      {word: '夜、日、無限、永遠、接続、時間、夜想曲、守る、愛'},
      {word: 'Ημέρα Νύχτας Άπειρη Αιώνια Σύνδεση Χρόνος  Προστατεύστε την Αγάπη'},
      {word: '夜，天，,无限，永恒，连接，时间，夜曲，保护，爱'}
    ]
  }

}
