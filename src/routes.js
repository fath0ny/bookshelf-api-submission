import express from 'express';
import { createBook, getBook, getBookById } from './controller.js';

const router = express.Router();
router.post('/books', createBook);
router.get('/books', getBook);
router.get('/books/:id', getBookById)

export default router;