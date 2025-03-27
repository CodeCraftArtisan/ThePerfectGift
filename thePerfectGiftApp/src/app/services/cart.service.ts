import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cart: CartItem[] = []; // Make sure cart is of type CartItem[]
  
    getCart(): CartItem[] {  // Ensure this method returns CartItem[] type
      return [...this.cart];
    }
  
    addToCart(product: CartItem): void {
      const existingItem = this.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    }
  
    removeFromCart(productId: number): void {
      this.cart = this.cart.filter(item => item.id !== productId);
    }
  
    getTotal(): number {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  
    clearCart(): void {
      this.cart = [];
    }
  }
