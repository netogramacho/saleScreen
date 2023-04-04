import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/shared/components/categories/categories.component';
import { ProductsComponent } from 'src/shared/components/products/products.component';
import { SalesComponent } from 'src/shared/components/sales/sales.component';

const routes: Routes = [
  {path: 'sales', component: SalesComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'categories', component: CategoriesComponent},
  { path: '', redirectTo: '/sales', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
