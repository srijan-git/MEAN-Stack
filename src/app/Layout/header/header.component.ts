import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false
  AdminloggedIn: boolean = false
  userID;
  constructor(private session: SessionService, private router: Router) {
    this.userID = localStorage.getItem('userId')
    if (window.localStorage.getItem('token')) {
      this.loggedIn = true;
    }
    if (window.localStorage.getItem('Admin')) {
      this.AdminloggedIn = true;
    }
  }
  ngOnInit(): void { }

  logout(): void {
    this.session.removeToken()
    this.loggedIn = false;
    this.AdminloggedIn = false;
    this.router.navigate(['/noauthview'])
  }
}
