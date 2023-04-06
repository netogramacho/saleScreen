import { Injectable } from '@angular/core';
import { CategoriesApi } from '../api/categories-api';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../interfaces/category';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesSubject$ = new BehaviorSubject<Category[]>([]);
  private categoriesLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private categoriesApi: CategoriesApi) {
    this.loadCategories();
  }

  get categories$() {
    return this.categoriesSubject$.asObservable();
  }

  get laoding$() {
    return this.categoriesLoading$.asObservable();
  }

  loadCategories() {
    this.categoriesLoading$.next(true);
    this.categoriesApi.get().subscribe((category) => {
      this.categoriesSubject$.next(category);
      this.categoriesLoading$.next(false);
    });
  }

  createCategory(category: Category) {
    return this.categoriesApi.post(category).pipe(
      tap(() => {
        this.loadCategories();
      })
    );
  }

  updateCategory(category: Category) {
    return this.categoriesApi.put(category).pipe(
      tap(() => {
        this.loadCategories();
      })
    );
  }

  deleteCategory(category: Category) {
    return this.categoriesApi.delete(category.categoryId).pipe(
      tap(() => {
        this.loadCategories();
      })
    );
  }
}
