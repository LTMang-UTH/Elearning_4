import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

// Import routes
import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blogs.js'
import userRoutes from './routes/users.js'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create Express app
const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    statusCode: 404
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    statusCode: err.status || 500,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// Start server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 API: http://localhost:${PORT}/api`)
})

export default app
