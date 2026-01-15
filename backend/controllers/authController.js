import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../config/database.js'

// Register
export const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      })
    }

    const { name, email, password } = req.body

    // Check if user exists
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    // Generate token
    const token = jwt.sign(
      { id: result.insertId, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: result.insertId,
          name,
          email,
          role: 'user'
        },
        token
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Login
export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      })
    }

    const { email, password } = req.body

    // Check user exists
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const user = users[0]

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Get current user
export const getCurrentUser = async (req, res) => {
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

// Logout (optional - mainly handled on frontend)
export const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  })
}
