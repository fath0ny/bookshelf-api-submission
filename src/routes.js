import express from 'express';
import { createBook, getBook, getBookById, updateBookById } from './controller.js';

const router = express.Router();
router.post('/books', createBook);
router.get('/books', getBook);
router.get('/books/:id', getBookById)
router.put('/books/:id', updateBookById);

export default router;