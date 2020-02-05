import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Discount, Product} from '../models/product';
import {Newproduct } from '../models/requests/newproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  private url = `${environment.apiUrl}product/`
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Product> {
    return this.http.get<Product>(`${this.url}`);
  }

  public editProduct(p: Newproduct): Observable<Product>{
    return this.http.put<Product>(`${this.url}`, p);
  }
  public createProduct(p: Newproduct): Observable<Product>{
    return this.http.post<Product>(`${this.url}`, p);
  }

  getProduct(id: string): Observable<Product> {
  return this.http.get<Product>(`${this.url}${id}`);
  }

  getFilteredProducts(ids: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}filter/${ids}`)
  }

}
