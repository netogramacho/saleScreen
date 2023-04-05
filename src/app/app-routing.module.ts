import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/shared/components/categories/categories.component';
import { ProductsComponent } from 'src/shared/components/products/products.component';
import { SalesComponent } from 'src/shared/components/sales/sales.component';

const routes: Routes = [
  {path: 'salesList', component: SalesComponent},
  {path: 'productsList', component: ProductsComponent},
  {path: 'categoriesList', component: CategoriesComponent},
  { path: '', redirectTo: '/salesList', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
