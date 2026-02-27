import { Product } from './product.model';

export interface CartItem {
  product: Product;
  qty:     number;
}

export interface User {
  id:    number;
  name:  string;
  email: string;
}