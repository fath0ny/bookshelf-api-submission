import express from 'express';
import { createBook, getBook, getBookById, updateBookById, deleteBookById } from './controller.js';

const router = express.Router();

router.post('/books', createBook);
router.get('/books', getBook);
router.get('/books/:id', getBookById)
router.put('/books/:id', updateBookById);
router.delete('/books/:id', deleteBookById);

export default router;