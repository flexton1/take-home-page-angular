import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  
  isLoggedIn: boolean;
  username: string;
  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();};
    
    logout() {
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigateByUrl('');
       this.toastr.warning('Odjavljeni ste');
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
