import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private checkoutService: CheckoutService, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    this.checkoutService.createCheckoutSession(this.cartItems).subscribe(response => {
      window.location.href = response.url; // Redirect to Stripe Checkout
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}