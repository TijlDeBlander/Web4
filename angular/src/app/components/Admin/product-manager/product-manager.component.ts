import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editProduct($event: Product) {
    this.router.navigateByUrl(`edit-product/${$event.id}`)
  }
}
