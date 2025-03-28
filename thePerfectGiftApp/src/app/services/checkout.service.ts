import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:4242/create-checkout-session';

  constructor(private http: HttpClient) {}

  createCheckoutSession(cartItems: CartItem[]) {
    return this.http.post<{ url: string }>(this.apiUrl, { cartItems });
  }
}
