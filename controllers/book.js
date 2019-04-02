const Book = require('../models/book');


class Controller {
  static findAll(req, res) {
    Book.findAll({})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static findOne(req, res) {
    Book.findOne({ id: req.params.id })
    .then(obj => {
      res.status(200).json(obj);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static create(req, res) {
    Book.create({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.category
    })
    .then(obj => {
      res.status(201).json({ message: 'successfully created', obj });
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static delete(req, res) {
    Book.destroy(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'successfully deleted' });
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static update(req, res) {
    Book.findOne({ _id: req.params.id })
    .then(obj => {
      obj.update({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: req.body.stock
      })
      res.status(200).json({ message: 'successfully updated' });
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }
}


module.exports = Controller;