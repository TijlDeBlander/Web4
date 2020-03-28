import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {CustomerService} from '../../../services/customer.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  constructor(private cs: CustomerService) {

  }

  ngOnInit() {
    this.cs.getAll().subscribe(c => console.log(c))
  }


}
