import { ShoppingCartService } from "src/app/shared/services/shopping-cart.service";
import { Component, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-payment-sumary",
  templateUrl: "./payment-sumary.component.html",
  styleUrls: ["./payment-sumary.component.scss"],
})
export class PaymentSumaryComponent implements OnInit {
  @Input("numberOfitems") numberOfitems: number;
  @Input("totalToPay") totalToPay: number;
  @Input("totalTaxes") totalTaxes: number;
  @Input("paymentMethod") paymentMethod: number;

  // totalTaxes: number;

  constructor(public _shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}
}
