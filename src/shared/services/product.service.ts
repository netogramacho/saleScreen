import { Injectable } from '@angular/core';
import { ProductApi } from '../api/products-api';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private productApi: ProductApi) {}

  getProducts() {
    return this.productApi.get();
  }

  createProduct(product:Product) {
    return this.productApi.createProduct(product);
  }
}
