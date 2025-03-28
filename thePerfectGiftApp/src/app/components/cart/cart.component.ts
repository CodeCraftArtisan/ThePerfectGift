import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];  // Define cartItems as CartItem[]
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotal();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.updateCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.updateCart();
  }

  updateCart(): void {
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotal();
  }

  proceedToCheckout(): void {
    this.cartService.checkout().then((response: any) => {
      if (response.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${response.sessionId}`;
      } else {
        console.error("Error creating checkout session", response.error);
      }
    });
  }
  
}
