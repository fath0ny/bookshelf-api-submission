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

export const getBookById = (req, res) => {
  const { id } = req.params;
  const books = book.find((b) => b.id === id);

  if (books) {
    return res.status(200).json({
      status: "success",
      data: { book }
    });
  }
  
  return res.status(404).json({
    status: "fail",
    message: "Buku tidak ditemukan"
  });
};

export const updateBookById = (req, res) => {
  const { id } = req.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
  const updatedAt = new Date().toISOString();
  const index = book.findIndex((b) => b.id === id);

  if (index !== -1) {
    book[index] = {...book[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt};
    if (!name) {
      return res.status(400).json({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku"
      });
    }

    if (readPage > pageCount) {
      return res.status(400).json({
        status: "fail",
        message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      });
    }
    
    return res.status(200).json({
      status: "success",
      message: "Buku berhasil diperbarui"
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan"
  });
};
