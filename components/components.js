const express = require('express');
const router = express.Router();

const indexRouter = require('./index/index');
const uploadRouter = require('./upload/upload');

router.use('/index', indexRouter);
router.use('/upload', uploadRouter);

router.get('/', (req, res) => {
    res.redirect('/index');
});

module.exports = router;