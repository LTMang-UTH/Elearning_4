import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authAPI from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const currentUser = computed(() => user.value)
  const isLoggedIn = computed(() => isAuthenticated.value && !!token.value)
  const userRole = computed(() => user.value?.role || 'guest')
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  const initializeAuth = () => {
    const savedToken = localStorage.getItem('access_token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
  }

  const login = async (credentials) => {
    try {
      loading.value = true
      error.value = null

      const response = await authAPI.login(credentials)

      if (response.success) {
        token.value = response.data.token
        user.value = response.data.user
        isAuthenticated.value = true

        return { success: true, message: response.message }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    try {
      loading.value = true
      error.value = null

      const response = await authAPI.register(userData)

      return { success: true, message: response.message }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      await authAPI.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      token.value = null
      user.value = null
      isAuthenticated.value = false
      loading.value = false
    }
  }

  const updateUserProfile = (updatedData) => {
    if (user.value) {
      user.value = { ...user.value, ...updatedData }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  const changePassword = async (passwordData) => {
    try {
      loading.value = true
      error.value = null

      const response = await authAPI.changePassword(passwordData)

      return { success: true, message: response.message }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchCurrentUser = async () => {
    try {
      loading.value = true
      const response = await authAPI.getCurrentUser()

      if (response.success) {
        user.value = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Getters
    currentUser,
    isLoggedIn,
    userRole,
    isAdmin,
    
    // Actions
    initializeAuth,
    login,
    register,
    logout,
    updateUserProfile,
    changePassword,
    fetchCurrentUser
  }
})
