import {Newproduct} from './requests/newproduct';

export class Discount {
  absolute: boolean;
  id : string;
  amount : number;
  reason : string;
  constructor(){}
}

export class Product{
  id :  string;
  name :  string;
  price : number;
  priceWithDiscount : number;
  amount;
  discount : {
    absolute: boolean;
    id : string;
    amount : number;
    reason : string
  };
  constructor(){
    this.discount = new Discount();
  }

  tojson(){
    return {

    }
  }
  generate(np: Newproduct): Product{
    this.name = np.name;
    this.price = np.price;
    if(np.discountAmount != 0){
      this.discount.amount = np.discountAmount;
      this.discount.reason = np.reason;
      this.discount.absolute = np.discountIsAbsolute;
    }

    return this;
  }
}
