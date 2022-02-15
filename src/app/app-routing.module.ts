import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full'},
//   { path: 'login', component: LoginComponent}
// ];


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Discover', component: DiscoverComponent}

]


@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
