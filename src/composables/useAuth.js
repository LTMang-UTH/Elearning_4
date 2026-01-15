import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()
  
  const loading = ref(false)
  const error = ref(null)

  const login = async (credentials) => {
    try {
      loading.value = true
      error.value = null
      
      const result = await authStore.login(credentials)
      
      if (result.success) {
        return { success: true, message: result.message }
      } else {
        error.value = result.message
        return { success: false, message: result.message }
      }
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
      await authStore.logout()
      router.push('/login')
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    try {
      loading.value = true
      error.value = null
      
      const result = await authStore.register(userData)
      
      if (result.success) {
        return { success: true, message: result.message }
      } else {
        error.value = result.message
        return { success: false, message: result.message }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  const checkAuth = () => {
    return authStore.isLoggedIn
  }

  return {
    loading,
    error,
    login,
    logout,
    register,
    checkAuth,
    user: authStore.currentUser,
    isAuthenticated: authStore.isLoggedIn
  }
}
