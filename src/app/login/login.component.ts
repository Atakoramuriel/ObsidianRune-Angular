import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {
  bounceOnEnterAnimation,
  flashOnEnterAnimation,
  pulseOnEnterAnimation,
  rubberBandOnEnterAnimation,
  shakeOnEnterAnimation,
  swingOnEnterAnimation,
  tadaOnEnterAnimation,
  wobbleOnEnterAnimation,
  jelloOnEnterAnimation,
  flipOnEnterAnimation,
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  bounceInUpOnEnterAnimation,
  bounceOutDownOnLeaveAnimation,
  bounceInDownOnEnterAnimation,
  bounceOutUpOnLeaveAnimation,
  bounceInLeftOnEnterAnimation,
  bounceInRightOnEnterAnimation,
  bounceOutLeftOnLeaveAnimation,
  bounceOutRightOnLeaveAnimation,
  fadeInOnEnterAnimation,
  fadeInUpOnEnterAnimation,
  fadeInDownOnEnterAnimation,
  fadeInLeftOnEnterAnimation,
  fadeInRightOnEnterAnimation,
  fadeInUpBigOnEnterAnimation,
  fadeInDownBigOnEnterAnimation,
  fadeInLeftBigOnEnterAnimation,
  fadeInRightBigOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeOutUpOnLeaveAnimation,
  fadeOutDownOnLeaveAnimation,
  fadeOutLeftOnLeaveAnimation,
  fadeOutRightOnLeaveAnimation,
  fadeOutUpBigOnLeaveAnimation,
  fadeOutDownBigOnLeaveAnimation,
  fadeOutLeftBigOnLeaveAnimation,
  fadeOutRightBigOnLeaveAnimation,
  flipInXOnEnterAnimation,
  flipInYOnEnterAnimation,
  flipOutXOnLeaveAnimation,
  flipOutYOnLeaveAnimation,
  lightSpeedInOnEnterAnimation,
  lightSpeedOutOnLeaveAnimation,
  rotateInOnEnterAnimation,
  rotateInUpLeftOnEnterAnimation,
  rotateInUpRightOnEnterAnimation,
  rotateInDownLeftOnEnterAnimation,
  rotateInDownRightOnEnterAnimation,
  rotateOutOnLeaveAnimation,
  rotateOutUpLeftOnLeaveAnimation,
  rotateOutUpRightOnLeaveAnimation,
  rotateOutDownLeftOnLeaveAnimation,
  rotateOutDownRightOnLeaveAnimation,
  slideInRightOnEnterAnimation,
  slideInUpOnEnterAnimation,
  slideInDownOnEnterAnimation,
  slideInLeftOnEnterAnimation,
  slideOutUpOnLeaveAnimation,
  slideOutDownOnLeaveAnimation,
  slideOutLeftOnLeaveAnimation,
  slideOutRightOnLeaveAnimation,
  zoomInOnEnterAnimation,
  zoomInUpOnEnterAnimation,
  zoomInDownOnEnterAnimation,
  zoomInLeftOnEnterAnimation,
  zoomInRightOnEnterAnimation,
  zoomOutOnLeaveAnimation,
  zoomOutUpOnLeaveAnimation,
  zoomOutDownOnLeaveAnimation,
  zoomOutLeftOnLeaveAnimation,
  zoomOutRightOnLeaveAnimation,
  hingeOnLeaveAnimation,
  jackInTheBoxOnEnterAnimation,
  rollInOnEnterAnimation,
  rollOutOnLeaveAnimation,
  expandOnEnterAnimation,
  collapseOnLeaveAnimation,
  fadeInExpandOnEnterAnimation,
  fadeOutCollapseOnLeaveAnimation,
  expandRightOnEnterAnimation,
  collapseLeftOnLeaveAnimation,
  fadeInExpandRightOnEnterAnimation,
  fadeOutCollapseLeftOnLeaveAnimation
} from 'angular-animations';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('Push',[
      state('show',style({
        opacity: 1
      })
      ),
      state('hide', style({
        opacity: 0
      })),
      transition('hide => show', animate('500ms ease-in')),
      transition('show => hide', animate('1500ms ease-out')),

    ]
    ),
    bounceOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100 })
  ]
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(public firebaseService: FirebaseService){}

  //ErrorMsg
  errorMsg: String = "";
  state = false
  ngOnInit(): void {
    //set Error Message to empty
    this.errorMsg = "";

    //Run animation 
    this.toggleState();

    //Check to see if logged in 
    if(localStorage.getItem("user")!== null){
      // this.isLoggedIn = true;
    }else{
      // this.isLoggedIn = false;
    }
  }
    
    //Animation of Logo
    animation = 'bounceIn';
    toggleState() {
      this.state = !this.state;
    }

    //Log In
    async SignIn(email:string, password:string){
      alert("Signed In Reached");
      if(email.length != 0 && password.length != 0){
        alert("Email: " + email.length
        )
        alert("If Statement Reached")
        return this.firebaseService.signIn(email, password);
      }else{
        this.errorMsg = "Fill in Both Email and Password"
      }
      


    }

}
