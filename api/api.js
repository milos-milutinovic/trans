const express = require('express');
const router = express.Router();

const itemRouter = require('./item/item');

router.use('/item', itemRouter);

module.exports = router;