import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as blogAPI from '@/api/blog'

export const useBlogStore = defineStore('blog', () => {
  // State
  const blogs = ref([])
  const currentBlog = ref(null)
  const myBlogs = ref([])
  const popularBlogs = ref([])
  const latestBlogs = ref([])
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const blogList = computed(() => blogs.value)
  const blogDetail = computed(() => currentBlog.value)

  // Actions
  const fetchBlogs = async (params = {}) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.getBlogs(params)

      if (response.success) {
        blogs.value = response.data.blogs || response.data.data || response.data
        pagination.value = {
          page: response.data.page || params.page || 1,
          limit: response.data.limit || params.limit || 10,
          total: response.data.total || 0,
          totalPages: response.data.totalPages || 0
        }
        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchBlogById = async (blogId) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.getBlogById(blogId)

      if (response.success) {
        currentBlog.value = response.data
        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchBlogBySlug = async (slug) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.getBlogBySlug(slug)

      if (response.success) {
        currentBlog.value = response.data
        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const createBlog = async (blogData) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.createBlog(blogData)

      if (response.success) {
        blogs.value.unshift(response.data)
        return { success: true, message: response.message, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateBlog = async (blogId, blogData) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.updateBlog(blogId, blogData)

      if (response.success) {
        const index = blogs.value.findIndex(blog => blog.id === blogId)
        if (index !== -1) {
          blogs.value[index] = response.data
        }
        if (currentBlog.value?.id === blogId) {
          currentBlog.value = response.data
        }
        return { success: true, message: response.message }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.deleteBlog(blogId)

      if (response.success) {
        blogs.value = blogs.value.filter(blog => blog.id !== blogId)
        myBlogs.value = myBlogs.value.filter(blog => blog.id !== blogId)
        return { success: true, message: response.message }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const uploadBlogImage = async (file) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.uploadBlogImage(file)

      if (response.success) {
        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const searchBlogs = async (searchParams) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.searchBlogs(searchParams)

      if (response.success) {
        blogs.value = response.data.blogs || response.data.data || response.data
        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchMyBlogs = async (params = {}) => {
    try {
      loading.value = true
      error.value = null

      const response = await blogAPI.getMyBlogs(params)

      if (response.success) {
        myBlogs.value = response.data.blogs || response.data.data || response.data
        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchPopularBlogs = async (limit = 5) => {
    try {
      const response = await blogAPI.getPopularBlogs(limit)

      if (response.success) {
        popularBlogs.value = response.data || []
        return { success: true, data: response.data }
      }
      popularBlogs.value = []
      return { success: false, message: 'Failed to fetch popular blogs' }
    } catch (err) {
      popularBlogs.value = []
      console.error('Error fetching popular blogs:', err)
      return { success: false, message: err.message }
    }
  }

  const fetchLatestBlogs = async (limit = 5) => {
    try {
      const response = await blogAPI.getLatestBlogs(limit)

      if (response.success) {
        latestBlogs.value = response.data || []
        return { success: true, data: response.data }
      }
      latestBlogs.value = []
      return { success: false, message: 'Failed to fetch latest blogs' }
    } catch (err) {
      latestBlogs.value = []
      console.error('Error fetching latest blogs:', err)
      return { success: false, message: err.message }
    }
  }

  return {
    // State
    blogs,
    currentBlog,
    myBlogs,
    popularBlogs,
    latestBlogs,
    pagination,
    loading,
    error,
    
    // Getters
    blogList,
    blogDetail,
    
    // Actions
    fetchBlogs,
    fetchBlogById,
    fetchBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadBlogImage,
    searchBlogs,
    fetchMyBlogs,
    fetchPopularBlogs,
    fetchLatestBlogs
  }
})
