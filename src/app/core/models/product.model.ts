export enum Category {
  Tech    = 'TECH',
  Home    = 'HOME',
  Fashion = 'FASHION'
}

export interface Product {
  id:           number;
  sku:          string;
  name:         string;
  description?: string;
  price:        number;
  stock:        number;
  category:     Category;
  imageUrl?:    string;
  onSale?:      boolean;
  discount?:    number; // 0–1 como proporción (Tarea)
}

export type Money = number;
export type Id    = number | string;

// Tarea: tipo unión para búsqueda
export type Search = string | { term: string; category?: Category };