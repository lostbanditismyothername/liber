const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  author: {
    type: String,
    minLength: 7,
    required: true,
  },
  language: {
    type: String,
    default: "Eng",
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
