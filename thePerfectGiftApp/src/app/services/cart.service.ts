import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

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
  private cart: CartItem[] = [];  
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor(private functions: AngularFireFunctions) {}

  getCart(): CartItem[] {  
    return [...this.cart];
  }

  addToCart(product: CartItem): void {
    console.log('Adding to cart:', product);
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.cartSubject.next([...this.cart]);
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next([...this.cart]);
  }

  // Checkout method uses the injected AngularFireFunctions
  async checkout() {
    const callable = this.functions.httpsCallable('stripeCheckout');
    
    try {
      const result = await callable({ cartItems: this.cart }).toPromise();
      if (result && result.sessionId) {
        // Redirect to Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/${result.sessionId}`;
      } else {
        console.error('No session ID received');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }
}