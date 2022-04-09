import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'student', component: StudentComponent},
  {path: 'user-profile/:name', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
