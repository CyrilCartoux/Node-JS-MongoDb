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
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id;
    // });

    // no products in the cart 
    const updatedCart = { items: [{ ...product, quantity: 1 }] }
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