import { CategoriesApi } from './../../api/categories-api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categoriesApi: CategoriesApi) {}

  ngOnInit(): void {
    this.categoriesApi.get();
  }
}
