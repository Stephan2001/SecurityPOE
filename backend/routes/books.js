const express = require('express');
const {createBook, getBooks, deleteBook, getBook, updateBook} = require('../Controllers/BookController')

const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);
router.delete('/:id', deleteBook);
router.get('/:id', getBook);
router.patch('/:id', updateBook);

module.exports = router;
