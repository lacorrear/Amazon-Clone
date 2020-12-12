import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  // CREATING a product in FireBase Database
  // create(product) {
  //   return this.db.list("/products").push(product);
  // }

  // GETTING all products form FireBase, the way to get data from firebase
  getAll() {
    return this.db
      .list("/products")
      .snapshotChanges()
      .pipe(
        map((products: any[]) =>
          products.map((prod) => {
            const payload = prod.payload.val();
            const key = prod.key;
            return <any>{ key, ...payload };
          })
        )
      );
  }

  // GETTING a product for its ID from firebase
  // get(productId: string) {
  //   return this.db
  //     .object("/products/" + productId)
  //     .snapshotChanges()
  //     .pipe(
  //       map((res) => {
  //         return res.payload.val();
  //       })
  //     );
  // }

  // UPDATE porducts properties after the user edit
  // update(productId, product) {
  //   return this.db.object("/products/" + productId).update(product);
  // }

  // DELETE a produtc
  // delete(productId) {
  //   return this.db.object("/products/" + productId).remove();
  // }
}
