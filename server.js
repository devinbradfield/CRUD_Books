const express = require("express");
const res = require("express/lib/response");
const app = express();
const host = "http://localhost";
const port = 3000;
const books = [
  {
    id: 0,
    title: "Harry Potter and the Philospher's Stone",
    release_year: 1997,
    author: "JK Rowling",
  },
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    release_year: 1998,
    author: "JK Rowling",
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    release_year: 1999,
    author: "JK Rowling",
  },
];
app.use(express.json());

app.listen(port, () => console.log(`App listening at ${host}:${port}`));

app.get("/api/books", (req, res) => {
  let { release_year } = req.query;

  if (release_year !== undefined) {
    console.log(`Year book was released ${release_year}`);
    const myBooks = books.filter(
      (element) => element.release_year === parseInt(release_year)
    );
    console.log(myBooks);
    res.status(200).send(myBooks);
  } else {
    res.status(200).send(books);
  }
});

app.get("/api/books/:bookId", (req, res) => {
  var { bookId } = req.params;
  console.log(`Here is my book id! ${bookId}`);
  const myBook = books.find((element) => {
    return element.id === parseInt(bookId);
  });
  console.log("Here is my book", myBook);
  res.status(201).send(myBook);
});

app.post("/api/books", (req, res) => {
  const { title, release_year, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    release_year,
    author,
  };
  books.push(newBook);
  console.log(req.body);
  res.status(201).send(`${title} added to libray.`);
});
app.patch("/api/books", (req, res) => {
  let foundFlag = false;
  let foundBook = {};
  books.forEach((book) => {
    if (book.title === req.body.title) {
      foundFlag = true;
      book.release_year = req.body.release_year;
      foundBook = book;
    }
  });
  if (foundFlag) {
    res.status(200).send(foundBook);
  } else {
    res.status(404).send("Book not found in library.");
  }
});
app.put(`/api/books/:bookId`, (req, res) => {
  var { bookId } = req.params;
  let myBookIndex = books.findIndex((element) => {
    return element.id === parseInt(bookId);
  });

  console.log("my Book Index", myBookIndex);
  if (myBookIndex < 0) {
    res.status(404).send(` Book Id: ${bookId} does not exist in the library`);
  } else {
    let updatedBook = req.body;
    books[myBookIndex].name = updatedBook.name;
    books[myBookIndex].release_year = updatedBook.release_year;
    books[myBookIndex].author = updatedBook.author;
    res.status(204).send(books[myBookIndex]);
  }
});
