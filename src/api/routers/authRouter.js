const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

/**
 * @openapi
 * /api/v1/auth/handleGithubCallback:
 *   get:
 *     tags: [Auth]
 *     summary: Handles the redirect back from GitHub after authentication
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful authentication
 *       '500':
 *         description: Internal server error
 */
router.get('/handleGithubCallback', AuthController.handleGithubCallback);

/**
 * @openapi
 * /api/v1/auth/signOutFromGithub:
 *   get:
 *     tags: [Auth]
 *     summary: Sign out from GitHub
 *     responses:
 *       '200':
 *         description: User signed out successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/signOutFromGithub', AuthController.signOutFromGithub);


/**
 * @openapi
 * /api/v1/auth/verifyUser:
 *   get:
 *     tags: [Auth]
 *     summary: Verifies the user's identity
 *     parameters:
 *       - in: cookie
 *         name: accessToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User verified
 *       '403':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/verifyUser', AuthController.verifyUser);

/**
 * @openapi
 * /api/v1/auth/getCurrentUser:
 *   get:
 *     tags: [Auth]
 *     summary: Fetches the current user's GitHub profile
 *     parameters:
 *       - in: cookie
 *         name: accessToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returns the user's GitHub profile
 *       '401':
 *         description: Unauthorized - Invalid or expired token
 *       '403':
 *         description: Unauthorized - Session expired
 *       '500':
 *         description: Internal server error
 */
router.get('/getCurrentUser', AuthController.getCurrentUser);

module.exports = router;
