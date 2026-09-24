import express from 'express';
import { createBook } from './controller.js';

const router = express.Router();
router.post('/books', createBook);

export default router;