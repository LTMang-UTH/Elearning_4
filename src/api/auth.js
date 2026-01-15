import axiosInstance from './axiosInstance'

/**
 * API xác thực - Authentication API
 */

// Đăng nhập
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials)
    
    // Lưu token vào localStorage
    if (response.data.token) {
      localStorage.setItem('access_token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    
    return response
  } catch (error) {
    throw error
  }
}

// Đăng ký
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData)
    return response
  } catch (error) {
    throw error
  }
}

// Đăng xuất
export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout')
    
    // Xóa token khỏi localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    
    return response
  } catch (error) {
    // Vẫn xóa token dù API lỗi
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    throw error
  }
}

// Làm mới token
export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/auth/refresh-token')
    
    if (response.data.token) {
      localStorage.setItem('access_token', response.data.token)
    }
    
    return response
  } catch (error) {
    throw error
  }
}

// Lấy thông tin user hiện tại
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/me')
    return response
  } catch (error) {
    throw error
  }
}

// Đổi mật khẩu
export const changePassword = async (passwordData) => {
  try {
    const response = await axiosInstance.post('/auth/change-password', passwordData)
    return response
  } catch (error) {
    throw error
  }
}

// Quên mật khẩu
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/auth/forgot-password', { email })
    return response
  } catch (error) {
    throw error
  }
}

// Reset mật khẩu
export const resetPassword = async (resetData) => {
  try {
    const response = await axiosInstance.post('/auth/reset-password', resetData)
    return response
  } catch (error) {
    throw error
  }
}

export default {
  login,
  register,
  logout,
  refreshToken,
  getCurrentUser,
  changePassword,
  forgotPassword,
  resetPassword
}
