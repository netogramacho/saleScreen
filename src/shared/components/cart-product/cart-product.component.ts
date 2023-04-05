import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/shared/interfaces/product';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() quantity!:number;
  @Output() increment = new EventEmitter();
  @Output() decrement = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.product);
  }

  incrementQuantity() {
    this.increment.emit(this.product.productId);
  }

  decrementQuantity() {
    this.decrement.emit(this.product.productId);
  }

  deleteProduct() {
    this.remove.emit(this.product.productId);
  }
}
