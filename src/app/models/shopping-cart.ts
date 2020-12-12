import { Product } from "src/app/models/product.model";
import { ShoppingCartItem } from "./shopping-cart-item";

// has to be class in order to use logic
export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {}; // initialize

    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      // key: productId make the Id of the ShoppingCartItem equal to the Product Id
      // ...item spread operator
      this.items.push(new ShoppingCartItem({ ...item, key: productId }));
    }
  }

  //getting the quantity of each product in the shopping cart
  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  //getting the total number of products in the shopping cart
  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }

  //getting the total price in the shopping cart
  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }
}
