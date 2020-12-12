import { Component, Input, OnInit } from "@angular/core";

import { ShoppingCartService } from "../../shared/services/shopping-cart.service";

@Component({
  selector: "app-checkout-item-card",
  templateUrl: "./checkout-item-card.component.html",
  styleUrls: ["./checkout-item-card.component.scss"],
})
export class CheckoutItemCardComponent implements OnInit {
  @Input("product") product: any;

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Testing values
  // product = <ShoppingCartItem>{
  //   title: "DualSense Wireless Controller XX",
  //   price: 69.69,
  //   rating: 4,
  //   quantity: 3,
  //   image: "https://m.media-amazon.com/images/I/71y+UGuJl5L._AC_AA180_.jpg",
  // };

  constructor(public _shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  // To show the starts we create a fake array
  fakeArray(): Array<any> {
    if (this.product.rating >= 0) {
      return new Array(this.product.rating);
    }
  }

  deleteItem() {
    this._shoppingCartService.removeFromCart(this.product);
  }

  updateItemNewQty(newQty: number) {
    this._shoppingCartService.updateItemNewQty(this.product, newQty);
  }
}
