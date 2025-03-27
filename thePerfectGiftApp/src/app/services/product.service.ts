import { inject, Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';
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

  private firestore: Firestore = inject(Firestore); // Use `inject()` instead of constructor injection

  productsCollection = collection(this.firestore, 'products');

  getProductById(id: string): Observable<Product> {

    const productDoc = doc(this.firestore, `gift-products/${id}`); // Reference to the specific document
 
    return docData(productDoc, { idField: 'id' }) as Observable<Product>; // Fetch the document data
 
  }

  getProducts(): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'gift-products'); // Ensure collection name is correct
    return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }
  

  // You can add more methods here for adding, updating, and deleting products
}
