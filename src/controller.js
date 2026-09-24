import { nanoid } from "nanoid";
import book from './book.js';

export const createBook = (req, res, next) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished =  pageCount === readPage;

  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, insertedAt, updatedAt };
  book.push(newBook);

  const isSuccess = book.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return res.status(201).json({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId: id }
    });
  }

  return res.status(500).json({
    status: "fail",
    message: "Gagal menambahkan buku"
  });
};

export const getBook = (req, res) => {
  const getAllBook = book.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }));

  return res.status(200).json({
    status: "success",
    data: getAllBook
  });
};
