import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { ShoppingCartService } from "src/app/shared/services/shopping-cart.service";

@Injectable({
  providedIn: "root",
})
export class PaymentGuard implements CanActivate {
  constructor(
    private _shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | Promise<boolean> | any {
    // return boolean vaule form a promise
    return new Promise((resolve, reject) => {
      this._shoppingCartService.getCart().then((data) => {
        // subscribing in order to get data from the cart
        data.subscribe((cart) => {
          if (cart.items.length == 0) {
            resolve(false);
            this.router.navigate(["/home"]);
          } else {
            resolve(true);
          }
        });
      });
    });
  }
}
