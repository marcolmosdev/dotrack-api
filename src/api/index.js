const router = require('express').Router();
const projectRouter = require('./routers/projectRouter');

router.use('/project', projectRouter);

module.exports = router;
