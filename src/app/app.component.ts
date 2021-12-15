import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ObsidianRune';
  isLoggedIn = false;

  //Test
  post:any = "";
  postTitle: string = "";
  postTxt: string = "";



  //Handle Constructor
  constructor(
    private primengConfig: PrimeNGConfig,
    public firebaseService : FirebaseService,
    public AuthService: AuthService){}

  //Initialize
  ngOnInit(){
    this.primengConfig.ripple = true;
    //Get Posts
    this.AuthService.getPosts().subscribe(data => {
      this.post = data.map(e => {
          const pulledData =  {
            id: e.payload.doc.id,
            title: e.payload.doc.data()
          };
          
      })
      console.log(this.post)
    });

  }

  //Functions




  //Log In
  async onSignIn(email:string, password:string){
    await this.firebaseService.signIn(email,password)
    
    if(this.firebaseService.isLoggedIn){
      this.isLoggedIn = true
    }
  }

}
