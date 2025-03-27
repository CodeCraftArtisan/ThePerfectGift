import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Import RouterModule
import { Product, ProductService } from '../../services/product.service'; // Adjust path as needed

@Component({
  selector: 'app-products-details',
  standalone: true,  // Marking this component as standalone
  imports: [CommonModule, RouterModule],  // Add RouterModule here to provide ActivatedRoute and RouterLink
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product: Product | undefined;  // Product data
  currentImageIndex: number = 0; // For carousel functionality

  constructor(
    private route: ActivatedRoute,  // Inject ActivatedRoute
    private productService: ProductService
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
}
