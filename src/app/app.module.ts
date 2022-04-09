import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { StudentComponent } from './student/student.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TokenInterceptor } from './token-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentiItemComponent } from './components/studenti-item/studenti-item.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    StudentComponent,
    NavbarComponent,
    SidebarComponent,
    StudentiItemComponent,
    EditStudentComponent,
    AddStudentComponent,
    DeleteDialogComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    NgxWebstorageModule.forRoot(),
    MatDialogModule,
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
