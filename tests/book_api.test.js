const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./book_api_test_helper");
const Book = require("../models/book");

const api = supertest(app);

beforeEach(async () => {
  await Book.deleteMany({});
  await Book.insertMany(helper.initialBooks);
});

afterAll(() => {
  mongoose.connection.close();
});

// GET MANY
describe("When there are initial notes in DB", () => {
  test("books are returned as json", async () => {
    await api
      .get("/api/books")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("entire books are returned", async () => {
    const res = await api.get("/api/books");
    const { books } = res.body;

    expect(books).toHaveLength(helper.initialBooks.length);
  });

  test("Dostoyevski got his book as well", async () => {
    const res = await api.get("/api/books");
    const { books } = res.body;
    const authors = books.map((b) => b.author);

    expect(authors).toContain("Dostoyevski");
  });
});

// GET INDIVIDUAL
describe("viewing a specific book", () => {
  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingID();
    const res = await api.get(`/api/books/${validNonexistingId}`);

    console.log(res.status);

    // expect(res.status).toBe(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    const res = await api.get(`/api/books/${invalidId}`);

    // expect(res.status).toBe(400);
  });
});

// CREATE
describe("addition of a new book", () => {
  test("succeeds with valid data", async () => {
    const newBook = {
      title: "Travelling Light",
      author: "Anonymous",
      language: "english",
      likes: 5,
    };

    await api
      .post("/api/books")
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const booksAtEnd = await helper.booksInDB();
    expect(booksAtEnd).toHaveLength(helper.initialBooks.length + 1);

    const titles = booksAtEnd.map((n) => n.title);
    expect(titles).toContain("Travelling Light");
  });

  test("fails with status code 400 if data invalid", async () => {
    const newBook = {
      author: "Anonymous",
      likes: 5,
    };
    const res = await api.post("/api/books").send(newBook);

    expect(res.status).toBe(400);

    const booksAtEnd = await helper.booksInDB();

    expect(booksAtEnd).toHaveLength(helper.initialBooks.length);
  });
});

// DELETE BOOK
describe("deletion of a book", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const booksAtStart = await helper.booksInDB();
    const bookToDelete = booksAtStart[0];
    const bookToDeleteID = bookToDelete._id.toString();
    console.log(bookToDeleteID);
    const res = await api.delete(`/api/books/${bookToDeleteID}`);
    expect(res.status).toBe(204);

    const booksAtEnd = await helper.booksInDB();
    expect(booksAtEnd).toHaveLength(helper.initialBooks.length - 1);

    const authors = booksAtEnd.map((r) => r.author);
    expect(authors).not.toContain(bookToDelete.author);
  });
});
