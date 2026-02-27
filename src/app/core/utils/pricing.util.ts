import type { Product } from '../models/product.model';
import { Search, Category } from '../models/product.model';

export function priceWithTax(price: number, taxRate = 0.18): number {
  return +(price * (1 + taxRate)).toFixed(2);
}

export function subtotal(items: Array<{ price: number; qty: number }>): number {
  return +items.reduce((acc, it) => acc + it.price * it.qty, 0).toFixed(2);
}

// Type guard
export function isProduct(value: unknown): value is Product {
  return (
    !!value &&
    typeof value === 'object' &&
    'sku'   in (value as object) &&
    'price' in (value as object)
  );
}

// Tarea: precio final aplicando descuento antes del IGV
export function finalPrice(p: Product): number {
  const discounted = p.discount ? p.price * (1 - p.discount) : p.price;
  return priceWithTax(discounted);
}

// Tarea: filtrar productos con type narrowing
export function filterProducts(list: Product[], s: Search): Product[] {
  if (typeof s === 'string') {
    const term = s.toLowerCase();
    return list.filter(p => p.name.toLowerCase().includes(term));
  }
  return list.filter(p => {
    const matchTerm     = p.name.toLowerCase().includes(s.term.toLowerCase());
    const matchCategory = s.category ? p.category === s.category : true;
    return matchTerm && matchCategory;
  });
}

// Tarea: función genérica pick
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}