import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { Product, ProductService } from '../../services/product.service'; 
import { CartItem, CartService } from '../../services/cart.service';


@Component({
  selector: 'app-products-details',
  standalone: true,  
  imports: [CommonModule, RouterModule],  //
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product: Product | undefined;  
  currentImageIndex: number = 0; // For carousel functionality

  constructor(
    private route: ActivatedRoute,  
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Get the product ID from the URL
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      // Fetch product details using the product ID
      this.productService.getProductById(productId).subscribe((product) => {
        this.product = product;
      });
    }
  }

  // Function to go to the next image in the carousel
  nextImage(): void {
    if (this.product && this.currentImageIndex < this.product.imageUrls.length - 1) {
      this.currentImageIndex++;
    }
  }

  // Function to go to the previous image in the carousel
  previousImage(): void {
    if (this.product && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
  addToCart(): void {
    if (this.product) {
      const productToAdd: CartItem = {
        id: Number(this.product.id),  // Convert to number
        name: this.product.name,
        price: this.product.price,
        quantity: 1,
        imageUrl: "IMPORTANT TO CHANGE IMAGE HERE BACK TO TAKE IMAGE ",  // Use the first image as imageUrl
      };
      this.cartService.addToCart(productToAdd);
    }
  }
  
}
