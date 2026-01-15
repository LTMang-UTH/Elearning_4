import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import db from '../config/database.js'

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, name, email, avatar, phone, bio, role, status, created_at FROM users WHERE id = ?',
      [req.user.id]
    )

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: users[0]
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      })
    }

    const { name, phone, bio, avatar } = req.body
    
    await db.query(
      'UPDATE users SET name = ?, phone = ?, bio = ?, avatar = ? WHERE id = ?',
      [name, phone, bio, avatar, req.user.id]
    )

    const [users] = await db.query(
      'SELECT id, name, email, avatar, phone, bio, role FROM users WHERE id = ?',
      [req.user.id]
    )

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: users[0]
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Get user
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [req.user.id])
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const user = users[0]

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id])

    res.json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}
