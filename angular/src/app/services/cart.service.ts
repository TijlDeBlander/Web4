import {EventEmitter, Injectable, Output} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {AuthenticationService} from './authentication.service';
import {Addtocart} from '../models/requests/addtocart';
import {ProductService} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  @Output() cartUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  private url = `${environment.apiUrl}cart/`;
  constructor(private http: HttpClient, private as: AuthenticationService, private ps: ProductService) { }

  public addToCart(p: Product, amount = 1){
    let req = new Addtocart();
    req.productId = p.id;
    req.amount = amount;
    req.userId = this.as.getUser();
    this.setPrettyCart();
    return this.http.post(`${this.url}`, req)
  }
  public deleteFromCart(p: Product){
    let req = new Addtocart();
    req.productId = p.id;
    req.amount = 0;
    req.userId = this.as.getUser();
    console.log(req);
    return this.http.post(`${this.url}delete`, req)
  }

  public setPrettyCart() {
    this.as.getUserObject().subscribe(user => {
      let string = '';
      Object.keys(user.cart).forEach(c => string += c + ';' + user.cart[c] + ',');
      if(string === '') {
        localStorage.setItem('cart', JSON.stringify([]));
        this.cartUpdated.emit(true)
      }
      else
      this.ps.getFilteredProducts(string.slice(0, string.length - 1)).subscribe(c => {
        localStorage.setItem('cart', JSON.stringify(c));
        this.cartUpdated.emit(true)
      });
    });
  }

  public getCart(): Product[] {
    return JSON.parse(localStorage.getItem('cart'));
  }
}
