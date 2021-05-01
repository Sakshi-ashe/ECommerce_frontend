import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Note: initially this whole class is empty.
  // Below code is written by hand.

  private baseUrl ='http://localhost:1717/api/products';
  
  constructor(private httpClient : HttpClient) { }

  getProductsList() : Observable<Product[]>
  {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
            map(response => response._embedded.products)
        )
  }

}




interface GetResponse{
  _embedded:{
    products: Product[]
  }
}


/* see below json data fetched from http://localhost:1717/api/products 
{
  "_embedded" : {
    "products" : [ {
      "sku" : "BOOK-TECH-1000",
      "name" : "JavaScript - The Fun Parts",
      "description" : "Learn JavaScript",
      "unitPrice" : 19.99,
      "imageUrl" : "assets/images/products/placeholder.png",
      "active" : true,
      "unitsInStock" : 100,
      "dateCreated" : "2021-04-29T00:25:57.000+00:00",
      "lastUpdated" : null,
      "_links" : {
        "self" : {
      
*/