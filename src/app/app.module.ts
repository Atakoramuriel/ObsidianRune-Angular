import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { FirebaseService } from './services/firebase.service';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Login', component: LoginComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
