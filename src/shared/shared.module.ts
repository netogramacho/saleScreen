import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SalesComponent } from './components/sales/sales.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductApi } from './api/products-api';
import { CategoriesApi } from './api/categories-api';
import { SideDialogComponent } from './components/side-dialog/side-dialog.component';
import { FormsModule } from '@angular/forms';

// MATERIAL
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ProductsComponent,
    CategoriesComponent,
    SalesComponent,
    MenuComponent,
    SideDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [ProductsComponent, CategoriesComponent, SalesComponent],
  providers: [ProductApi, CategoriesApi],
})
export class SharedModule {}
