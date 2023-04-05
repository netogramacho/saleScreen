import { SaleProduct } from './saleProduct';

export interface Sale {
  saleProducts: SaleProduct[];
  saleId?: number;
  saleTotal: number;
  saleTax: number;
}
