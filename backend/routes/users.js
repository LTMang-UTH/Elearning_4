import express from 'express'
import { body } from 'express-validator'
import * as userController from '../controllers/userController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// Get profile
router.get('/profile', userController.getProfile)

// Update profile
router.put('/profile',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required')
  ],
  userController.updateProfile
)

// Change password
router.put('/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  userController.changePassword
)

export default router
