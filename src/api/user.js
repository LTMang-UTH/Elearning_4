import axiosInstance from './axiosInstance'

/**
 * API người dùng - User API
 */

// Lấy danh sách người dùng (Admin only)
export const getUsers = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/users', { params })
    return response
  } catch (error) {
    throw error
  }
}

// Lấy thông tin người dùng theo ID
export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`)
    return response
  } catch (error) {
    throw error
  }
}

// Cập nhật thông tin người dùng
export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData)
    return response
  } catch (error) {
    throw error
  }
}

// Cập nhật profile của user hiện tại
export const updateProfile = async (userData) => {
  try {
    const response = await axiosInstance.put('/users/profile', userData)
    
    // Cập nhật lại thông tin user trong localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const updatedUser = { ...user, ...response.data }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    return response
  } catch (error) {
    throw error
  }
}

// Upload avatar
export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData()
    formData.append('avatar', file)
    
    const response = await axiosInstance.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return response
  } catch (error) {
    throw error
  }
}

// Xóa người dùng (Admin only)
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`)
    return response
  } catch (error) {
    throw error
  }
}

export default {
  getUsers,
  getUserById,
  updateUser,
  updateProfile,
  uploadAvatar,
  deleteUser
}
