import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

// Define an interface for your Product data 
export interface Product {
  id?: string; // Firestore automatically generates IDs
  name: string;
  price: number;
  description: string;
  stripeID: string;
  imageUrls: Array<string>;  
  variantIds: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('gift-products'); // Replace 'products' with your collection name
  }

  getProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

  // You can add more methods here for adding, updating, and deleting products
}
