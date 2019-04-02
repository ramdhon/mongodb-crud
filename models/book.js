const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'Bookstore';
const collectionName = 'Books';
const { ObjectId } = require('mongodb');


class Book {
  constructor(isbn, title, author, category, stock, _id) {
    this._id = _id;
    this.isbn = isbn,
    this.title = title,
    this.author = author,
    this.category = category,
    this.stock = stock
  }

  static findAll(obj) {
    return new Promise((resolve, reject) => {
      let client = null; 

      MongoClient.connect(url, { useNewUrlParser: true })
        .then(newClient => {
          client = newClient;
          console.log('connected');
          const db = client.db(dbName);
          const collection = db.collection(collectionName);
          return collection.find(obj).toArray();
        })
        .then(data => {
          client.close();
          data = data.map(object => new Book(object.isbn, object.title, object.author, object.category, object.stock, object._id));
          resolve(data);
        })
        .catch(err => {
          client.close();
          reject(err);
        })
    })
  }

  static findOne(obj) {
    return new Promise((resolve, reject) => {
      let client = null; 
      MongoClient.connect(url, { useNewUrlParser: true })
        .then(newClient => {
          client = newClient;
          console.log('connected');
          const db = client.db(dbName);
          const collection = db.collection(collectionName);
          return collection.find(obj).toArray();
        })
        .then(data => {
          client.close();
          if (data.length === 0) {
            throw new Error('data not found')
          } else {
            data = data.map(object => new Book(object.isbn, object.title, object.author, object.category, object.stock, object._id));
            resolve(data[0]);
          }
        })
        .catch(err => {
          client.close();
          reject(err);
        })
    })
  }

  static destroy(id) {
    return new Promise((resolve, reject) => {
      let client = null; 
      MongoClient.connect(url, { useNewUrlParser: true })
        .then(newClient => {
          client = newClient;
          console.log('connected');
          const db = client.db(dbName);
          const collection = db.collection(collectionName);
          return collection.deleteOne({ _id: ObjectId(id) });
        })
        .then(() => {
          client.close();
          resolve();
        })
        .catch(err => {
          client.close();
          reject(err);
        })
    })
  }

  static create(obj) {
    return new Promise((resolve, reject) => {
      let client = null;
      
      obj = new Book(obj.isbn, obj.title, obj.author, obj.category, obj.stock);
      MongoClient.connect(url, { useNewUrlParser: true })
        .then(newClient => {
          client = newClient;
          console.log('connected');
          const db = client.db(dbName);
          const collection = db.collection(collectionName);
          return collection.insertOne(obj);
        })
        .then(() => {
          client.close();
          resolve(obj);
        })
        .catch(err => {
          client.close();
          reject(err);
        })
    })
  }

  update(obj) {
    return new Promise((resolve, reject) => {
      let client = null; 
      MongoClient.connect(url, { useNewUrlParser: true })
        .then(newClient => {
          client = newClient;
          console.log('connected');
          const db = client.db(dbName);
          const collection = db.collection(collectionName);
          return collection.updateOne({ id: ObjectId(this.id) }, { 
            $set: {
              isbn: obj.isbn,
              title: obj.title,
              author: obj.author,
              category: obj.category,
              stock: obj.stock
            }
          });
        })
        .then(() => {
          client.close();
          resolve();
        })
        .catch(err => {
          client.close();
          reject(err);
        })
    })
  }
}


module.exports = Book;