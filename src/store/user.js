import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as userAPI from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref([])
  const currentUserProfile = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Actions
  const fetchUsers = async (params = {}) => {
    try {
      loading.value = true
      error.value = null

      const response = await userAPI.getUsers(params)

      if (response.success) {
        users.value = response.data.users || response.data
        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchUserById = async (userId) => {
    try {
      loading.value = true
      error.value = null

      const response = await userAPI.getUserById(userId)

      if (response.success) {
        currentUserProfile.value = response.data
        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (userData) => {
    try {
      loading.value = true
      error.value = null

      const response = await userAPI.updateProfile(userData)

      if (response.success) {
        currentUserProfile.value = response.data
        return { success: true, message: response.message }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const uploadAvatar = async (file) => {
    try {
      loading.value = true
      error.value = null

      const response = await userAPI.uploadAvatar(file)

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

  const deleteUser = async (userId) => {
    try {
      loading.value = true
      error.value = null

      const response = await userAPI.deleteUser(userId)

      if (response.success) {
        users.value = users.value.filter(user => user.id !== userId)
        return { success: true, message: response.message }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    users,
    currentUserProfile,
    loading,
    error,
    
    // Actions
    fetchUsers,
    fetchUserById,
    updateProfile,
    uploadAvatar,
    deleteUser
  }
})
