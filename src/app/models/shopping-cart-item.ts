export class ShoppingCartItem {
  key: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init); // explanation in video 23-17 min 2:30
  }

  // Total price per product in our shoppingCart
  get totalPrice() {
    return this.price * this.quantity;
  }
}
