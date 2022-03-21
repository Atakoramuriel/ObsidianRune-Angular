import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { LoginComponent } from './login/login.component';
import { FirebaseService } from './services/firebase.service';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RouterModule, Routes} from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import {PostsService} from './services/posts.service'

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

//Test

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DiscoverComponent } from './discover/discover.component';
import { LegacyComponent } from './legacy/legacy.component';

//Gaurds to be put in place
import { AuthGuard } from './services/auth.gaurd';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';
import { WritingComponent } from './writing/writing.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    PostsComponent,
    DiscoverComponent,
    LegacyComponent,
    WritingComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    // RouterModule.forRoot(appRoutes),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
   
    //PrimeNG
    DialogModule,
    ButtonModule
 

  ],
  providers: [FirebaseService, PostsService, AuthGuard,SecureInnerPagesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
