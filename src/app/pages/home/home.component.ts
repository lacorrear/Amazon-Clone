import { ShoppingCartService } from "../../shared/services/shopping-cart.service";
import { ProductService } from "../../shared/services/products.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public dbProducts: Product[] = [];

  constructor(
    private _productService: ProductService,
    private _shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this._shoppingCartService.getCart();
  }

  getAllProducts() {
    this._productService.getAll().subscribe((data) => {
      this.dbProducts = data;
      // console.log("DB-products:", data);
    });
  }
}
