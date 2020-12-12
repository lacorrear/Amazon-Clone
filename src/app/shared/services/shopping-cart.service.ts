import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { take } from "rxjs/internal/operators/take";

import { Product } from "../../models/product.model";
import { ShoppingCart } from "../../models/shopping-cart";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  // ----------------------------------------------------------
  // getOrCreateCartId
  // ----------------------------------------------------------

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime(),
    });
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    } else {
      let result = await this.create();
      localStorage.setItem("cartId", result.key);
      return result.key;
    }
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    //In order to use await method we have to pass async parameter to the fuction
    let cartId = await this.getOrCreateCartId(); //await is use to make cartId a value not a promise
    return this.db
      .object("/shopping-carts/" + cartId)
      .valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x.items)));
  }
  // ----------------------------------------------------------
  // /getOrCreateCartId
  // ----------------------------------------------------------

  // **********************************************************

  // ----------------------------------------------------------
  // modifying quantity Item in shopping cart
  // ----------------------------------------------------------
  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  //----------- Update Item Quantity a specific product from FireBase -----------
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    items$
      .valueChanges() // convert firebase object to observable
      .pipe(take(1)) // take 1 instance of an item
      .subscribe((item: any) => {
        //---------------------- Update the item in FireBase ----------------------
        // $exists() is deprecated. Just check if item is truthy.
        if (item) {
          let actualQuantity = item.quantity + change;
          if (actualQuantity === 0) {
            items$.remove();
          } else {
            items$.update({ quantity: actualQuantity, title: product.title });
          }
        }
        //-----------------------------------------------------------------------

        //---------------------- Create the item in FireBase ----------------------
        else {
          // since key and value are the same (eg, product: product) you can omit the value part.
          items$.set({
            title: product.title,
            image: product.image,
            price: product.price,
            rating: product.rating,
            quantity: change,
          });
        }
        //-----------------------------------------------------------------------
      });
  }
  //-----------------------------------------------------------------------------

  // Adding +1 qty for a specific product to FireBase
  async addtoCart(product: Product) {
    this.updateItem(product, 1);
  }

  // Update qty for a specific product in FireBase
  async updateItemNewQty(product: Product, newQty: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    items$
      .valueChanges() // convert firebase object to observable
      .pipe(take(1)) // take 1 instance of an item
      .subscribe((item: any) => {
        //---------------------- Update the item in FireBase ----------------------
        // $exists() is deprecated. Just check if item is truthy.
        if (item) {
          let actualQuantity = newQty;
          if (actualQuantity === 0) {
            items$.remove();
          } else {
            items$.update({ quantity: actualQuantity, title: product.title });
          }
        }
        //-----------------------------------------------------------------------
      });
  }

  // Subtracting 1 qty for a specific product in FireBase
  async subtractingFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  // Removing a specific product in FireBase
  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);
    items$.remove();
  }

  // ----------------------------------------------------------
  // /modifying quantity Item in shopping cart
  // ----------------------------------------------------------
}

//*
//*
//*
//*
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

// async clearCart() {
//   let cartId = await this.getOrCreateCartId();
//   this.db.object("/shopping-carts/" + cartId + "/items/").remove(); //remove fire base Data
// }
