import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-subtotal",
  templateUrl: "./subtotal.component.html",
  styleUrls: ["./subtotal.component.scss"],
})
export class SubtotalComponent implements OnInit {
  @Input("numberOfitems") numberOfitems: number;
  @Input("totalToPay") totalToPay: number;

  constructor() {}

  ngOnInit(): void {}
}
