import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {CustomerService} from '../../../services/customer.service';
import {User} from '../../../models/user';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  constructor(private cs: CustomerService) {

  }

  ngOnInit() {
  }


  deleteCustomer($event) {
    this.cs.delete($event.id).subscribe(c => console.log(c))
  }
}
