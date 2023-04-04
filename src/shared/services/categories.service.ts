import { Injectable } from '@angular/core';
import { CategoriesApi } from '../api/categories-api';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private categoriesApi: CategoriesApi) {}

  getCategories() {
    return this.categoriesApi.get();
  }
}
