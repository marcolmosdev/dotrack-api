const express = require('express');
const router = express.Router();
const CodeController = require('../controllers/codeController');

/**
 * @openapi
 * /api/v1/code/getCode/{code}:
 *   get:
 *     tags: [Codes]
 *     summary: Retrieves a specific code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The code to retrieve
 *     responses:
 *       200:
 *         description: Code exists
 *       default:
 *         description: Error
 */
router.get('/getCode/:code', CodeController.getCode);

module.exports = router;
