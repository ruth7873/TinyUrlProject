const express = require('express');
const router = express.Router();
const redirectController = require('../controllers/redirectController');

router.get('/seg/:id', redirectController.dataSegmentation);

router.get('/:id', redirectController.redirectLink)

module.exports = router;