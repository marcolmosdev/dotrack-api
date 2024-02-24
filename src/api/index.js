const router = require('express').Router();
const codeRouter = require('./routers/codeRouter');

router.use('/code', codeRouter);

module.exports = router;
