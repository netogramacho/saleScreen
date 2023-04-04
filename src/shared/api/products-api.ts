import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';
import { httpOptions } from './default-api';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductApi {
  constructor(private http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get<any>('/products').pipe(
      map((products) =>
        products.map((product: any) => ({
          prc_id: product.PRC_ID,
          prc_name: product.PRC_NAME,
          prc_tax: product.PRC_TAX,
          pro_active: product.PRC_ACTIVE,
          pro_description: product.PRC_DESCRIPTION,
          pro_id: product.PRO_ID,
          pro_name: product.PRO_NAME,
          pro_price: parseFloat(product.PRO_PRICE),
          tax_value: product.TAX_VALUE.toFixed(2),
        })),
      ),
    );
  }

  createProduct(product:Product): Observable<Product> {
    return this.http.post<any>('/products', product, httpOptions).pipe(
      map((product) => product.map((product:any) => ({
        prc_id: product.PRC_ID,
        prc_name: product.PRC_NAME,
        prc_tax: product.PRC_TAX,
        pro_active: product.PRC_ACTIVE,
        pro_description: product.PRC_DESCRIPTION,
        pro_id: product.PRO_ID,
        pro_name: product.PRO_NAME,
        pro_price: parseFloat(product.PRO_PRICE),
        tax_value: product.TAX_VALUE.toFixed(2),
      })))
    )
  }
}
