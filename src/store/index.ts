import Cart from './cart';

export default class RootStore {
    cart: Cart;
    localStorage: Storage;

    constructor() {
        this.cart = new Cart(this);
        this.localStorage = window.localStorage;
    }
}
