import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<void> = new Subject<void>;

username?: string;
isLoggedIn?: boolean;

  @Output() sidenavClose = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data: string) => this.username = data);
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

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }
}
