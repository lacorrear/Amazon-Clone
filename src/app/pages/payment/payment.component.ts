import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ShoppingCart } from "src/app/models/shopping-cart";
import { ShoppingCartService } from "src/app/shared/services/shopping-cart.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  taxesPercent: number = 1.2 / 100;
  extraDays: number = 3;
  deliveryDate: Date = new Date(
    new Date().getTime() + 24 * this.extraDays * 60 * 60 * 1000
  );
  cart$: Observable<ShoppingCart>;
  paymentMethod: number;

  constructor(public _shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.paymentMethod = 0;
    this.cart$ = await this._shoppingCartService.getCart();
  }

  placeOrder() {
    if (this.paymentMethod === 0) {
      document
        .getElementById("warningPaymentMethod")
        .focus({ preventScroll: false });
    } else {
      this._shoppingCartService.placeOrder();
    }
  }
}
