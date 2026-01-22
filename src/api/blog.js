// Lấy thống kê tổng hợp blog (Public API)
export const getBlogStats = async () => {
  try {
    const response = await axiosInstance.get('/blogs/stats')
    return response.data
  } catch (error) {
    throw error
  }
}
import axiosInstance from './axiosInstance'

/**
 * API Blog - Blog API
 * CRUD: Create, Read, Update, Delete
 * + Upload, Search, Sort
 */

// Lấy danh sách blog (Public API)
export const getBlogs = async (params = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category = '',
      status // không gán mặc định
    } = params

    const response = await axiosInstance.get('/blogs', {
      params: {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        category,
        status
      }
    })

    return response
  } catch (error) {
    throw error
  }
}

// Lấy chi tiết blog theo ID (Public API)
export const getBlogById = async (blogId) => {
  try {
    const response = await axiosInstance.get(`/blogs/${blogId}`)
    return response
  } catch (error) {
    throw error
  }
}

// Lấy chi tiết blog theo slug (Public API)
export const getBlogBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(`/blogs/slug/${slug}`)
    return response
  } catch (error) {
    throw error
  }
}

// Tạo blog mới (Private API - yêu cầu authentication)
export const createBlog = async (blogData) => {
  try {
    const response = await axiosInstance.post('/blogs', blogData)
    return response
  } catch (error) {
    throw error
  }
}

// Cập nhật blog (Private API - yêu cầu authentication)
export const updateBlog = async (blogId, blogData) => {
  try {
    const response = await axiosInstance.put(`/blogs/${blogId}`, blogData)
    return response
  } catch (error) {
    throw error
  }
}

// Xóa blog (Private API - yêu cầu authentication)
export const deleteBlog = async (blogId) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${blogId}`)
    return response
  } catch (error) {
    throw error
  }
}

// Upload hình ảnh cho blog (Private API)
export const uploadBlogImage = async (file) => {
  try {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await axiosInstance.post('/blogs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return response
  } catch (error) {
    throw error
  }
}

// Upload nhiều hình ảnh cho blog (Private API)
export const uploadMultipleBlogImages = async (files) => {
  try {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`images`, file)
    })
    
    const response = await axiosInstance.post('/blogs/upload-multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return response
  } catch (error) {
    throw error
  }
}

// Tìm kiếm blog (Public API)
export const searchBlogs = async (searchParams) => {
  try {
    const {
      keyword = '',
      category = '',
      tags = [],
      dateFrom = '',
      dateTo = '',
      page = 1,
      limit = 10
    } = searchParams
    
    const response = await axiosInstance.get('/blogs/search', {
      params: {
        keyword,
        category,
        tags: tags.join(','),
        dateFrom,
        dateTo,
        page,
        limit
      }
    })
    
    return response
  } catch (error) {
    throw error
  }
}

// Lấy danh sách blog của user hiện tại (Private API)
export const getMyBlogs = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/blogs/my-blogs', { params })
    return response
  } catch (error) {
    throw error
  }
}

// Lấy blog theo category (Public API)
export const getBlogsByCategory = async (categoryId, params = {}) => {
  try {
    const response = await axiosInstance.get(`/blogs/category/${categoryId}`, { params })
    return response
  } catch (error) {
    throw error
  }
}

// Lấy blog phổ biến nhất (Public API)
export const getPopularBlogs = async (limit = 5) => {
  try {
    const response = await axiosInstance.get('/blogs/popular', {
      params: { limit }
    })
    return response
  } catch (error) {
    throw error
  }
}

// Lấy blog mới nhất (Public API)
export const getLatestBlogs = async (limit = 5) => {
  try {
    const response = await axiosInstance.get('/blogs/latest', {
      params: { limit }
    })
    return response
  } catch (error) {
    throw error
  }
}

// Like blog (Private API)
export const likeBlog = async (blogId) => {
  try {
    const response = await axiosInstance.post(`/blogs/${blogId}/like`)
    return response
  } catch (error) {
    throw error
  }
}

// Unlike blog (Private API)
export const unlikeBlog = async (blogId) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${blogId}/like`)
    return response
  } catch (error) {
    throw error
  }
}

export default {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  uploadMultipleBlogImages,
  searchBlogs,
  getMyBlogs,
  getBlogsByCategory,
  getPopularBlogs,
  getLatestBlogs,
  likeBlog,
  unlikeBlog
}
