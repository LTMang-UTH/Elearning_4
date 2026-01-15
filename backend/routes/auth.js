import express from 'express'
import { body } from 'express-validator'
import * as authController from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Register
router.post('/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  authController.register
)

// Login
router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.login
)

// Get current user (protected)
router.get('/me', authenticateToken, authController.getCurrentUser)

// Logout (protected)
router.post('/logout', authenticateToken, authController.logout)

export default router
