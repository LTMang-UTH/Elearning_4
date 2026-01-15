import { useAuthStore } from '@/store/auth'

/**
 * Navigation Guard - Kiểm tra xác thực
 */
export const authGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isLoggedIn

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Chuyển hướng đến trang login nếu chưa đăng nhập
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  } else if (to.name === 'Login' && isAuthenticated) {
    // Nếu đã đăng nhập thì không cho vào trang login
    // Admin -> Dashboard, User -> Home
    if (authStore.isAdmin) {
      next({ name: 'Dashboard' })
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
}

/**
 * Navigation Guard - Kiểm tra quyền Admin
 */
export const adminGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAdmin) {
    if (!authStore.isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển về trang login
      next({ 
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    } else if (!authStore.isAdmin) {
      // Nếu đã đăng nhập nhưng không phải admin, chuyển về Home
      alert('Bạn không có quyền truy cập trang này!')
      next({ name: 'Home' })
    } else {
      // Là admin, cho phép truy cập
      next()
    }
  } else {
    next()
  }
}

/**
 * Navigation Guard - Set title cho page
 */
export const setPageTitle = (to, from, next) => {
  const defaultTitle = import.meta.env.VITE_APP_TITLE || 'Vue 3 App'
  const pageTitle = to.meta.title || defaultTitle
  
  document.title = pageTitle ? `${pageTitle} - ${defaultTitle}` : defaultTitle
  
  next()
}
