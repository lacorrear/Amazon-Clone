import { ShoppingCartService } from "../../shared/services/shopping-cart.service";
import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;

  constructor(private _shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  fakeArray(): Array<any> {
    if (this.product.rating >= 0) {
      return new Array(this.product.rating);
    }
  }

  addToCart() {
    this._shoppingCartService.addtoCart(this.product);
  }
}
