import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public authenticated;
  public user: User;
  constructor(private as: AuthenticationService) {
    this.as.isLoggedInEmitter.subscribe(res => this.authenticated = res)
  }

  ngOnInit() {
    this.authenticated = this.as.isAuthenticated();
    this.as.getUserObject().subscribe(c => {this.user = c; console.log(c)});

  }

  logout() {
    this.as.logout();
  }


}
