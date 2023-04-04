import { Product } from 'src/shared/interfaces/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/shared/services/product.service';
import { Categories } from 'src/shared/interfaces/categories';
import { CategoriesService } from 'src/shared/services/categories.service';
import { SideDialogComponent } from '../side-dialog/side-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(SideDialogComponent) sideDialog!: SideDialogComponent;
  @ViewChild(MatTable) table!: MatTable<any>;

  products!: Product[];
  categories!: Categories[];
  loading = true;
  displayedColumns = ['pro_id', 'pro_name', 'pro_price', 'tax_value'];
  isDialogOpen: boolean = false;

  currProduct: Product;

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService
  ) {
    this.currProduct = {
      pro_name: '',
      pro_description: '',
      pro_price: 0,
      prc_id: 0,
    };
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.loading = false;
    });
  }

  prepareAddProduct() {
    this.categoriesService.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
      this.isDialogOpen = true;
    });
  }

  saveProduct() {
    this.productService.createProduct(this.currProduct).subscribe((product) => {
      this.getProducts();
      this.sideDialog.close();
    });
  }
}
