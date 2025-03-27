import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component'; 
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsDetailsComponent} from './components/products-details/products-details.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'product-details/:id', component: ProductsDetailsComponent }
];
