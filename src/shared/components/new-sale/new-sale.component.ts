import { SaleProduct } from './../../interfaces/saleProduct';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';
import { Product } from 'src/shared/interfaces/product';
import { ProductService } from 'src/shared/services/product.service';
import { Sale } from 'src/shared/interfaces/sale';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent implements OnInit {
  products!: Product[];
  currSale: Sale;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.currSale = {
      saleTotal: 0,
      saleTax: 0,
      saleProducts: [],
    };
  }

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.filterProducts(products);
    });
  }

  filterProducts(products: Product[]) {
    this.products = products.filter((product) => {
      return !this.currSale.saleProducts.some(
        (saleProduct) => saleProduct.product.productId === product.productId
      );
    });
  }

  openFindProduct() {
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      data: this.products,
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.currSale.saleProducts.push({ product: result, quantity: 1 });
        this.updateCurrentSale();
        this.filterProducts(this.products);
      }
    });
  }

  updateCurrentSale() {
    this.currSale.saleTotal = 0;
    this.currSale.saleTax = 0;
    this.currSale.saleProducts.forEach((saleProduct) => {
      this.currSale.saleTotal +=
        parseFloat(saleProduct.product.productPrice) * saleProduct.quantity;
      this.currSale.saleTax +=
        parseFloat(saleProduct.product.taxValue) * saleProduct.quantity;
    });
  }

  incrementQuantity(productId: number) {
    this.currSale.saleProducts.find((saleProduct) => {
      if (saleProduct.product.productId == productId) {
        saleProduct.quantity += 1;
      }
      this.updateCurrentSale();
    });
  }

  decrementQuantity(productId: number) {
    this.currSale.saleProducts.find((saleProduct) => {
      if (saleProduct.product.productId == productId) {
        if (saleProduct.quantity > 1) {
          saleProduct.quantity -= 1;
        } else {
          this.snackBar.open('The minimum quantity for a product is 1.', 'X', {
            duration: 3000,
          });
        }
      }
      this.updateCurrentSale();
    });
  }

  removeProduct(productId: number) {
    console.log(productId);
  }
}
