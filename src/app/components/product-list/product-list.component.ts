import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  currentCategoryId: number;

  currentCategoryName: string;

  searchMode: boolean;

  constructor(private productService : ProductService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log("########");
    console.log(this.searchMode);
    

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }

 handleListProducts(){
   //chack if "id " parameter is available.
   const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
   console.log(hasCategoryId);

   if(hasCategoryId){
     // get the 'id' param string, convert string to a number using the  "+" symbol
     this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
     console.log(this.currentCategoryId);

     this.currentCategoryName = this.route.snapshot.paramMap.get('name');

   }
   else{
     // not category id available.... default to category id 1
     this.currentCategoryId = 1;
     console.log(this.currentCategoryId);

     this.currentCategoryName = 'Books';

   }

   //now get the products for this given category id
   this.productService.getProductsList(this.currentCategoryId).subscribe(
     data => {
       this.products = data;
     }
   )

 }

 handleSearchProducts(){
   const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

   //now search for the products using keyword
   this.productService.searchProducts(theKeyword).subscribe(
     data => {
       this.products = data;
     }
   )
 }
}
