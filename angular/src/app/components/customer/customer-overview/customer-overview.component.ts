import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user';
import {CustomerService} from '../../../services/customer.service';
import {Observable} from 'rxjs';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-customer-overview',
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.component.scss']
})
export class CustomerOverviewComponent implements OnInit {
  public users : Observable<User[]>;
  @Output() customerEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Input() actionText: string;
  constructor(private cs: CustomerService) {

  }

  ngOnInit() {
    this.users = this.cs.getAll();
  }

  emitCustomer(c: User){
    this.customerEmitter.emit(c);
  }

}
