import express from 'express'
import { body } from 'express-validator'
import * as blogController from '../controllers/blogController.js'
import { authenticateToken } from '../middleware/auth.js'
import upload from '../middleware/upload.js'

const router = express.Router()

// Public routes
router.get('/', blogController.getBlogs)
router.get('/stats', blogController.getBlogStats)
router.get('/popular', blogController.getPopularBlogs)
router.get('/latest', blogController.getLatestBlogs)
router.get('/search', blogController.searchBlogs)
router.get('/category/:categoryId', blogController.getBlogsByCategory)
router.get('/slug/:slug', blogController.getBlogBySlug)
router.get('/:id', blogController.getBlogById)

// Protected routes
router.post('/',
  authenticateToken,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required')
  ],
  blogController.createBlog
)

router.put('/:id',
  authenticateToken,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().trim().notEmpty().withMessage('Content cannot be empty')
  ],
  blogController.updateBlog
)

router.delete('/:id', authenticateToken, blogController.deleteBlog)

router.get('/my/blogs', authenticateToken, blogController.getMyBlogs)

router.post('/upload', authenticateToken, upload.single('image'), blogController.uploadImage)

router.post('/upload-multiple', authenticateToken, upload.array('images', 5), blogController.uploadMultipleImages)

router.post('/:id/like', authenticateToken, blogController.likeBlog)

router.delete('/:id/like', authenticateToken, blogController.unlikeBlog)

export default router
