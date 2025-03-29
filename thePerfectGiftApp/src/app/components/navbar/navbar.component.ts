import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NgClass } from '@angular/common';
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LanguageMenuComponent, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  cartItemCount = 0;
  hasItemsInCart = false; // ✅ New property to track cart status

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
      this.hasItemsInCart = this.cartItemCount > 0; // ✅ Update button color dynamically
    });
  }
}