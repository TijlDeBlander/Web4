import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Newproduct} from '../../../models/requests/newproduct';
import {Discount, Product} from '../../../models/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() create ;
  public loader = false;
  public p: Product = new Product();
  public productForm: FormGroup;
  constructor(private fb: FormBuilder,
              private ps: ProductService,
              private route: ActivatedRoute
  ) {
    this.constructProductForm();
  }

  ngOnInit() {
    console.log(this.create);
    if(this.create) {
      this.p = new Product();
      this.constructProductForm();
    }
    else {
      let id = this.route.snapshot.paramMap.get('id');
      this.loader = true;
      this.ps.getProduct(id).subscribe(product =>{
          this.loader = false;
          this.p = Object.assign(new Product(), product);
          if(this.p.discount === null)
            this.p.discount = new Discount();
          console.log(this.p);
          this.constructProductForm()
        }
        , error => this.loader = false)
    }
  }

  submit(i) {
    let p = new Newproduct();
    p.name = i.name;
    p.price = i.price;
    if(i.discountAmount != null){
      p.discountAmount = i.discountAmount;
      p.reason = i.reason;
      p.discountIsAbsolute = i.discountIsAbsolute
    }else
      p.discountAmount = 0;
    if(this.create){
      this.ps.createProduct(p).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error)
      })
    }else{
      p.id = this.p.id;
      this.ps.editProduct(p).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error)
      });
    }

  }

  constructProductForm(){
    this.productForm = this.fb.group({
      name: [this.p.name, [Validators.required, Validators.minLength(2)]],
      price: [this.p.price, [Validators.required, Validators.min(1)]],
      discountIsAbsolute: [this.p.discount.absolute],
      discountAmount: [this.p.discount.amount, Validators.min(0)],
      reason: [this.p.discount.reason]
    })
  }
}
