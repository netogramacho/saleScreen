import { Categories } from './../interfaces/categories';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoriesApi {
  constructor(private http: HttpClient) {}

  get(): Observable<Categories[]> {
    return this.http
      .get<any>('/category')
      .pipe(map((category) => category.map((category: any) => ({
        prc_id: category.PRC_ID,
        prc_name: category.PRC_NAME,
        prc_tax: category.PRC_TAX,
        prc_active: category.PRC_ACTIVE,
      }))));
  }
}
