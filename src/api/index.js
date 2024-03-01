const router = require('express').Router();
const projectRouter = require('./routers/projectRouter');
const authRouter = require('./routers/authRouter');

router.use('/project', projectRouter);
router.use('/auth', authRouter);

module.exports = router;
