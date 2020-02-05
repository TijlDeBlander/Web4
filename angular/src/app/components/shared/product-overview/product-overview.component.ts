import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Observable} from 'rxjs';
import {Product} from '../../../models/product';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {
  @Input() actionText: string;
  @Output() productEmitter: EventEmitter<Product> = new EventEmitter<Product>();
  public products : Observable<Product>;
  constructor(private ps: ProductService, private cs: CartService) {
    this.products = this.ps.getAll();
  }

  ngOnInit() {

  }

  emitProduct(p: Product) {
    this.productEmitter.emit(p);
  }
}
