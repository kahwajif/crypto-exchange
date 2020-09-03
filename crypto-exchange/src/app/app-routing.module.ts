import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
