import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // Note: initially this whole class is empty.
  // Below code is written by hand.

  //private baseUrl ='http://localhost:1717/api/products';
  //by default , only 20 items diplayed even when 100 items present .
  
  private baseUrl ='http://localhost:1717/api/products';
  private categoryUrl ='http://localhost:1717/api/product-category';


  constructor(private httpClient : HttpClient) { }

  getProductsListPaginate(thePage: number, 
                          thePageSize: number,
                          theCategoryId : number) : Observable<GetResponseProducts>
  {
    //need to build url based on category id
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  

  getProductsList(theCategoryId : number) : Observable<Product[]>
  {
    //need to build url based on category id
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    console.log(searchUrl);

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }


  searchProducts(theKeyword : string) : Observable<Product[]>{
        //need to build url based on keyword
        const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
        console.log(searchUrl);
  
        return this.getProducts(searchUrl);
    
  }

  searchProductsPaginate(thePage: number, 
                          thePageSize: number,
                          theKeyword : string) : Observable<GetResponseProducts>
                      {
                      //need to build url based on category id
                      const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
                      + `&page=${thePage}&size=${thePageSize}`;

                      return this.httpClient.get<GetResponseProducts>(searchUrl);
                      }


//select the repetitive code -> refactor -> to a method
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProduct(theProductId: number): Observable<Product> {
      // need to build url based on product id
      const productUrl = `${this.baseUrl}/${theProductId}`;

      return this.httpClient.get<Product>(productUrl);
  }

}




interface GetResponseProducts{
  _embedded:{
    products: Product[]
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
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


interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}


// http://localhost:1717/api/product-category
// {
//   "_embedded" : {
//     "productCategory" : [ {
//       "id" : 1,
//       "categoryName" : "Books",
//       "_links" : {
//         "self" : {
//           "href" : "http://localhost:1717/api/product-category/1"
//         },
//         "productCategory" : {
//           "href" : "http://localhost:1717/api/product-category/1"
//         },
//         "products" : {
//           "href" : "http://localhost:1717/api/product-category/1/products"
//         }
//       }
//     }, {
//       "id" : 2,
//       "categoryName" : "Coffee Mugs",
//       "_links" 