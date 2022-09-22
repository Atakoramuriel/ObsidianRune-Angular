import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { LegacyComponent } from './legacy/legacy.component';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';
import { AuthGuard } from './services/auth.gaurd';
import { WritingComponent } from './writing/writing.component';
import { ProfileComponent } from './profile/profile.component';
import { ReadWritingComponent } from './read-writing/read-writing.component';
import { EditLegacyComponent } from './edit-legacy/edit-legacy.component';


const appRoutes: Routes = [
  {
    path: '', 
    component: HomeComponent, 
    canActivate: [AuthGuard],
    },
  {
    path: 'Profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard],
    },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard],
    },
  {
    path: 'Discover',
    component: DiscoverComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Legacy',
    component: LegacyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newWriting',
    component: WritingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editLegacyChapter',
    component: EditLegacyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Reading',
    component: ReadWritingComponent,
    canActivate: [AuthGuard]
  },
]


@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}
