import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {ProductService} from './product.service';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = `${environment.apiUrl}customer/`;
  constructor(private http: HttpClient, private as: AuthenticationService, private ps: ProductService) { }

  public getAll(): Observable<User> {
    return this.http.get<User>(`${this.url}GetAll`);
  }
}
