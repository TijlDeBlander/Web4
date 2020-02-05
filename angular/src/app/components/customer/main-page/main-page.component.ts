import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(private cs: CartService) { }

  ngOnInit() {
  }

  addToCart($event: Product) {
    this.cs.addToCart($event).subscribe(a => {this.cs.setPrettyCart(); })

  }
}
