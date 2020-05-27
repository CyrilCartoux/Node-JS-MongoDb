const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this)
  }

  static findById(uid) {
    const db = getDb()
    return db.collection("users").findOne({_id: mongodb.ObjectId(uid)})
    .then()
    .catch(err => {
      console.log(err)
    });
  }
}

module.exports = User;
