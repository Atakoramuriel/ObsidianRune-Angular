import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full'},
//   { path: 'login', component: LoginComponent}
// ];


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Login', component: LoginComponent},

]


@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
