import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { ShoppingCart } from "src/app/models/shopping-cart";

import { ShoppingCartService } from "../../shared/services/shopping-cart.service";
import { AuthenticationService } from "./../../shared/services/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  userName: any = "";
  constructor(
    private router: Router,
    private _shoppingCartService: ShoppingCartService,
    public _authService: AuthenticationService
  ) {
    // Getting user email from local strorage
  }

  async ngOnInit() {
    // Getting cart from Firebase using the [cart id] saved in local storage
    this.cart$ = await this._shoppingCartService.getCart();
    this.readUserName();
  }

  // Move to the top of the page
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  homeRouter() {
    this.router.navigate(["/home"]);
    this.topFunction();
  }

  readUserName() {
    var email: any;
    //Subscribe to authState in order to get the current user data
    this._authService.afAuth.authState.subscribe((user: any) => {
      if (user) {
        email = user.email;
        this.userName = email?.substring(0, email.indexOf("@"));
        // console.log(this.userName);
      } else {
        this.userName = "";
      }
    });
  }
}
