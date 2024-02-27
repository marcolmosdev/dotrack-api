const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');

/**
 * @openapi
 * /api/v1/project/getProject/{projectCode}:
 *   get:
 *     tags: [Project]
 *     summary: Retrieves a specific project
 *     parameters:
 *       - in: path
 *         name: projectCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The project to retrieve
 *     responses:
 *       200:
 *         description: Project exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 clientId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 shareCode:
 *                   type: string
 *       default:
 *         description: Error
 */
router.get('/getProject/:projectCode', ProjectController.getProject);

module.exports = router;
