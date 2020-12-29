import { Observable } from "rxjs/internal/Observable";
import { ShoppingCartService } from "../../shared/services/shopping-cart.service";
import { Component, OnInit } from "@angular/core";
import { ShoppingCart } from "src/app/models/shopping-cart";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(public _shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this._shoppingCartService.getCart();
  }
}
