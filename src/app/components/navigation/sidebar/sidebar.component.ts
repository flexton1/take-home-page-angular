import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
username: string;
isLoggedIn: boolean;

  @Output() sidenavClose = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  onTitleClicked() {
    if (this.isLoggedIn){
      this.router.navigateByUrl('student');
    }else {
      this.router.navigateByUrl('');
    }
  }
}
