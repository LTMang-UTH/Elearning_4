// Get blog statistics (total, published, views)
export const getBlogStats = async (req, res) => {
  try {
    // Tổng số bài viết
    const [totalResult] = await db.query('SELECT COUNT(*) as total FROM blogs')
    const totalBlogs = totalResult[0].total

    // Tổng số bài đã xuất bản
    const [publishedResult] = await db.query("SELECT COUNT(*) as published FROM blogs WHERE status = 'published'")
    const publishedBlogs = publishedResult[0].published

    // Tổng lượt xem
    const [viewsResult] = await db.query('SELECT SUM(views) as totalViews FROM blogs')
    const totalViews = viewsResult[0].totalViews || 0

    res.json({
      success: true,
      data: {
        totalBlogs,
        publishedBlogs,
        totalViews
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
import { validationResult } from 'express-validator'
import db from '../config/database.js'

// Helper function to create slug
function createSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Get all blogs
export const getBlogs = async (req, res) => {
  try {

    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'created_at',
      sortOrder = 'DESC',
      category = '',
      status = 'published'
    } = req.query

    // Map sortBy from frontend to DB column
    const sortByMap = {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      views: 'views',
      title: 'title',
      // add more if needed
    }
    const sortByDb = sortByMap[sortBy] || 'created_at'

    const offset = (page - 1) * limit

    let query = `
      SELECT b.*, u.name as author_name, u.avatar as author_avatar, c.name as category_name
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE 1=1
    `
    const params = []

    if (status && status !== '' && status !== undefined) {
      query += ' AND b.status = ?'
      params.push(status)
    }
    if (search) {
      query += ' AND (b.title LIKE ? OR b.content LIKE ?)' 
      params.push(`%${search}%`, `%${search}%`)
    }
    if (category) {
      query += ' AND b.category_id = ?'
      params.push(category)
    }
    query += ` ORDER BY b.${sortByDb} ${sortOrder} LIMIT ? OFFSET ?`
    params.push(parseInt(limit), offset)
    const [blogs] = await db.query(query, params)

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM blogs WHERE 1=1'
    const countParams = []
    if (status && status !== '' && status !== undefined) {
      countQuery += ' AND status = ?'
      countParams.push(status)
    }
    if (search) {
      countQuery += ' AND (title LIKE ? OR content LIKE ?)' 
      countParams.push(`%${search}%`, `%${search}%`)
    }
    if (category) {
      countQuery += ' AND category_id = ?'
      countParams.push(category)
    }
    const [countResult] = await db.query(countQuery, countParams)
    const total = countResult[0].total

    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
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

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params

    const [blogs] = await db.query(`
      SELECT b.*, u.name as author_name, u.avatar as author_avatar, c.name as category_name
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.id = ?
    `, [id])

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    // Increment views
    await db.query('UPDATE blogs SET views = views + 1 WHERE id = ?', [id])

    res.json({
      success: true,
      data: blogs[0]
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Get blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params

    const [blogs] = await db.query(`
      SELECT b.*, u.name as author_name, u.avatar as author_avatar, c.name as category_name
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.slug = ?
    `, [slug])

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    res.json({
      success: true,
      data: blogs[0]
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Create blog
export const createBlog = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      })
    }

    const { title, content, excerpt, image, category_id, status = 'draft' } = req.body
    const slug = createSlug(title)
    const author_id = req.user.id

    const [result] = await db.query(
      'INSERT INTO blogs (title, slug, content, excerpt, image, author_id, category_id, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, content, excerpt, image, author_id, category_id, status, status === 'published' ? new Date() : null]
    )

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: {
        id: result.insertId,
        title,
        slug,
        status
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

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      })
    }

    const { id } = req.params
    const { title, content, excerpt, image, category_id, status } = req.body

    // Check if blog exists and user is the author
    const [blogs] = await db.query('SELECT * FROM blogs WHERE id = ?', [id])
    
    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    if (blogs[0].author_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this blog'
      })
    }

    const slug = title ? createSlug(title) : blogs[0].slug

    await db.query(
      'UPDATE blogs SET title = ?, slug = ?, content = ?, excerpt = ?, image = ?, category_id = ?, status = ? WHERE id = ?',
      [
        title || blogs[0].title,
        slug,
        content || blogs[0].content,
        excerpt || blogs[0].excerpt,
        image || blogs[0].image,
        category_id || blogs[0].category_id,
        status || blogs[0].status,
        id
      ]
    )

    res.json({
      success: true,
      message: 'Blog updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params

    // Check if blog exists and user is the author
    const [blogs] = await db.query('SELECT * FROM blogs WHERE id = ?', [id])
    
    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    if (blogs[0].author_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this blog'
      })
    }

    await db.query('DELETE FROM blogs WHERE id = ?', [id])

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Get my blogs
export const getMyBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit

    const [blogs] = await db.query(
      'SELECT * FROM blogs WHERE author_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [req.user.id, parseInt(limit), offset]
    )

    const [countResult] = await db.query(
      'SELECT COUNT(*) as total FROM blogs WHERE author_id = ?',
      [req.user.id]
    )

    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
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

// Search blogs
export const searchBlogs = async (req, res) => {
  try {
    const { keyword = '', page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit

    const [blogs] = await db.query(`
      SELECT b.*, u.name as author_name, u.avatar as author_avatar, c.name as category_name
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.status = 'published' AND (b.title LIKE ? OR b.content LIKE ?)
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
    `, [`%${keyword}%`, `%${keyword}%`, parseInt(limit), offset])

    res.json({
      success: true,
      data: blogs
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Get blogs by category
export const getBlogsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const { page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit

    const [blogs] = await db.query(`
      SELECT b.*, u.name as author_name, u.avatar as author_avatar, c.name as category_name
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.category_id = ? AND b.status = 'published'
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
    `, [categoryId, parseInt(limit), offset])

    res.json({
      success: true,
      data: blogs
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Get popular blogs
export const getPopularBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query

    const [blogs] = await db.query(`
      SELECT b.*, u.name as author_name, u.avatar as author_avatar, c.name as category_name
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.status = "published"
      ORDER BY b.views DESC
      LIMIT ?
    `, [parseInt(limit)])

    res.json({
      success: true,
      data: blogs
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Get latest blogs
export const getLatestBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query

    const [blogs] = await db.query(`
      SELECT b.*, u.name as author_name, u.avatar as author_avatar, c.name as category_name
      FROM blogs b
      LEFT JOIN users u ON b.author_id = u.id
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.status = "published"
      ORDER BY b.created_at DESC
      LIMIT ?
    `, [parseInt(limit)])

    res.json({
      success: true,
      data: blogs
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Upload image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const url = `/uploads/${req.file.filename}`

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: { url }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Upload multiple images
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }

    const urls = req.files.map(file => `/uploads/${file.filename}`)

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: { urls }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Like blog
export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Check if already liked
    const [existing] = await db.query(
      'SELECT * FROM blog_likes WHERE blog_id = ? AND user_id = ?',
      [id, userId]
    )

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You already liked this blog'
      })
    }

    // Add like
    await db.query('INSERT INTO blog_likes (blog_id, user_id) VALUES (?, ?)', [id, userId])
    await db.query('UPDATE blogs SET likes = likes + 1 WHERE id = ?', [id])

    res.json({
      success: true,
      message: 'Blog liked successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

// Unlike blog
export const unlikeBlog = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    await db.query('DELETE FROM blog_likes WHERE blog_id = ? AND user_id = ?', [id, userId])
    await db.query('UPDATE blogs SET likes = GREATEST(likes - 1, 0) WHERE id = ?', [id])

    res.json({
      success: true,
      message: 'Blog unliked successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}
