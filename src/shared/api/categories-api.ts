import { Category } from '../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoriesApi {
  constructor(private http: HttpClient) {}

  get(): Observable<Category[]> {
    return this.http
      .get<any>('/category-api')
      .pipe(map((category) => category.map((category: any) => ({
        categoryId: category.PRC_ID,
        categoryName: category.PRC_NAME,
        categoryTax: category.PRC_TAX,
        categoryActive: category.PRC_ACTIVE,
      }))));
  }

  post(category:Category) {
    return this.http.post<any>('/category-api', category);
  }

  put(category:Category) {
    return this.http.put<any>('/category-api/' + category.categoryId, category);
  }

  delete(categoryId: any) {
    return this.http.delete<any>('/category-api/' + categoryId);
  }
}
