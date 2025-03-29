import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service'; // Adjust path as needed

import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-products-list',
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent  implements OnInit {


  products$!: Observable<Product[]>;


  constructor(private productService: ProductService) { }


  ngOnInit(): void {

    this.products$ = this.productService.getProducts();
    this.products$.subscribe(products => {
      console.log('Fetched products:', products);
    });

  }


}
