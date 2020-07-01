const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({

  title: String,
  description: String,
  image: String,
  Price: Number

});

module.exports = Book = mongoose.model('Book', BookSchema);