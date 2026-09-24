import express from 'express';
import { createBook, getBook } from './controller.js';

const router = express.Router();
router.post('/books', createBook);
router.get('/books', getBook);

export default router;