import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, Product } from '../../core/models/product.model';
import { CartItem, User } from '../../core/models/cart.model';
import { priceWithTax, subtotal, isProduct, finalPrice, filterProducts, pick } from '../../core/utils/pricing.util';
import { titleCase } from '../../core/utils/text.util';

@Component({
  selector:    'app-shop',
  standalone:  true,
  imports:     [CommonModule],
  templateUrl: './shop.html',
  styleUrl:    './shop.css'
})
export class Shop {

  currentUser: User = { id: 1, name: 'ana torres', email: 'ana@uni.edu' };

  products: Product[] = [
    { id: 1, sku: 'WEB-1001', name: 'Landing Page Profesional',  description: 'Diseño y desarrollo de landing page optimizada para conversión', price: 299.0, stock: 10, category: Category.Tech,    onSale: true, discount: 0.10 },
    { id: 2, sku: 'WEB-1002', name: 'Tienda E-commerce',         description: 'Plataforma de ventas online completa con pasarela de pagos',      price: 799.0, stock: 5,  category: Category.Tech },
    { id: 3, sku: 'MKT-2001', name: 'Pack SEO Mensual',          description: 'Posicionamiento en Google y auditoría técnica incluida',           price: 199.0, stock: 15, category: Category.Home,    onSale: true, discount: 0.15 },
    { id: 4, sku: 'MKT-2002', name: 'Gestión Redes Sociales',    description: 'Manejo profesional de Instagram, Facebook y LinkedIn',             price: 149.0, stock: 20, category: Category.Fashion },
  ];

  cart: CartItem[] = [];

  get total(): number {
    const items = this.cart.map(ci => ({ price: ci.product.price, qty: ci.qty }));
    return subtotal(items);
  }

  get totalWithTax(): number {
    return priceWithTax(this.total);
  }

  displayName(): string {
    return titleCase(this.currentUser.name);
  }

  withTax(n: number): number {
    return priceWithTax(n, 0.18);
  }

  getFinalPrice(p: Product): number {
    return finalPrice(p);
  }

  debugIsProduct(v: unknown): string {
    return isProduct(v) ? `OK product: ${(v as Product).sku}` : 'NO product';
  }

  logPickedProducts(): void {
    this.products.forEach(p => {
      const picked = pick(p, ['name', 'price']);
      console.log(picked);
    });
  }

  get filteredTech(): Product[] {
    return filterProducts(this.products, { term: '', category: Category.Tech });
  }

  addToCart(product: Product): void {
    const existing = this.cart.find(c => c.product.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      this.cart = [...this.cart, { product, qty: 1 }];
    }
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter(c => c.product.id !== product.id);
  }

  cartQty(product: Product): number {
    return this.cart.find(c => c.product.id === product.id)?.qty ?? 0;
  }
}