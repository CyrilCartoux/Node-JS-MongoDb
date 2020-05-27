const mongodb = require("mongodb")
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // update the product
      dbOperation = db.collection("products").updateOne(
        { _id: new mongodb.ObjectId(this._id) }, {$set: this}
      )
    } else {
      // insert it
      dbOperation = db.collection('products').insertOne(this)
    }
    return dbOperation
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      });
  }

  static fetchAll() {
    const db = getDb();
    // find returns a cursor
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      // because id are stored differently
      .find({ _id: mongodb.ObjectID(prodId) })
      // next to get the last document returned by find()
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = Product;
