import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cart: Product[];
  public totalPrice = 0;
  constructor(private cs: CartService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cs.cartUpdated.subscribe(object => this.update());
    this.update();
  }

  total(amount: number, price: number) {
    const localTotal = amount * price;
    return localTotal;
  }

  private update() {
    this.totalPrice = 0;
    this.cart = this.cs.getCart();
    this.cart.forEach(p => {
      if(p.discount === null)
        this.totalPrice += p.price * p.amount
      else
        this.totalPrice += p.priceWithDiscount * p.amount
    })
  }

  delete(p: Product) {
    //Call reseting the new cart after deletion has been complete
   this.cs.deleteFromCart(p).subscribe(() => this.cs.setPrettyCart());
  }
}
