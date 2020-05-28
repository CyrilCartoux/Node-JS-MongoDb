const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    // item already exists
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      // update the qty of the existing one
      updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
      // or update the new one
      updatedCartItems.push({
        productId: mongodb.ObjectId(product._id),
        quantity: newQuantity
      })
    }

    // no products in the cart 
    const updatedCart = { items: updatedCartItems }
    const db = getDb();
    console.log(this._id)
    console.log(mongodb.ObjectId(this._id))
    return db.collection("users").updateOne(
      { _id: mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } })
  }

  static findById(userId) {
    const db = getDb()
    return db.collection("users").find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then((user) => {
        console.log(user)
        return user
      })
      .catch(err => { console.log(err) })
  }
}

module.exports = User;