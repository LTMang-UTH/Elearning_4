import axios from 'axios'
import router from '@/router'

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('access_token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log request khi ở môi trường development
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.log('🚀 Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
        params: config.params
      })
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response khi ở môi trường development
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.log('✅ Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      })
    }
    
    // Chuẩn hóa response
    return {
      success: true,
      data: response.data.data || response.data,
      message: response.data.message || 'Success',
      statusCode: response.status
    }
  },
  (error) => {
    // Log error khi ở môi trường development
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.error('❌ Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      })
    }
    
    // Xử lý lỗi
    const errorResponse = {
      success: false,
      data: null,
      message: error.response?.data?.message || error.message || 'An error occurred',
      statusCode: error.response?.status || 500
    }
    
    // Xử lý lỗi 401 (Unauthorized) - Token hết hạn
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      router.push('/login')
      errorResponse.message = 'Session expired. Please login again.'
    }
    
    // Xử lý lỗi 403 (Forbidden)
    if (error.response?.status === 403) {
      errorResponse.message = 'You do not have permission to perform this action.'
    }
    
    // Xử lý lỗi 404 (Not Found)
    if (error.response?.status === 404) {
      errorResponse.message = 'Resource not found.'
    }
    
    // Xử lý lỗi 500 (Server Error)
    if (error.response?.status === 500) {
      errorResponse.message = 'Internal server error. Please try again later.'
    }
    
    return Promise.reject(errorResponse)
  }
)

export default axiosInstance
