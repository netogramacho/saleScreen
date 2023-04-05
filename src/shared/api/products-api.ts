import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../interfaces/product';
import { catchError, map } from 'rxjs/operators';
import { httpOptions } from './default-api';

@Injectable()
export class ProductApi {
  constructor(private http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get<any>('/products-api').pipe(
      map((products) =>
        products.map((product: any) => ({
          categoryId: product.PRC_ID,
          categoryName: product.PRC_NAME,
          categoryTax: product.PRC_TAX,
          productActive: product.PRC_ACTIVE,
          productDescription: product.PRO_DESCRIPTION,
          productId: product.PRO_ID,
          productName: product.PRO_NAME,
          productPrice: parseFloat(product.PRO_PRICE).toFixed(2),
          taxValue: product.TAX_VALUE.toFixed(2),
        }))
      )
    );
  }

  post(product: Product) {
    return this.http.post<any>('/products-api', product, httpOptions).pipe(
      catchError((error) => {
        // Handle error here, e.g., log error or show error message
        return throwError(error);
      })
    );
  }

  put(product: Product) {
    return this.http
      .put<any>('/products-api/' + product.productId, product, httpOptions)
      .pipe(
        catchError((error) => {
          // Handle error here, e.g., log error or show error message
          return throwError(error);
        })
      );
  }

  delete(productId: any) {
    return this.http.delete<any>('/products-api/' + productId).pipe(
      catchError((error) => {
        // Handle error here, e.g., log error or show error message
        return throwError(error);
      })
    );
  }
}
