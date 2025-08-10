const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho' }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author are required' });

  const newBook = { id: books.length ? books[books.length - 1].id + 1 : 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by id
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});

// DELETE book by id
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const idx = books.findIndex(b => b.id === bookId);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });

  const deleted = books.splice(idx, 1)[0];
  res.json(deleted);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
