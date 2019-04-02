const router = require('express').Router();
const BookController = require('../controllers/book');

router.get('/', BookController.findAll);
router.post('/', BookController.create);
router.get('/:id', BookController.findOne);
router.delete('/:id', BookController.delete);
router.put('/:id', BookController.update);

module.exports = router;