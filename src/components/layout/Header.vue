<template>
  <header class="header-modern sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-lg border-b border-indigo-100">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="logo-container group">
          <div class="flex items-center space-x-3">
            <div class="logo-icon">
              <i class="fas fa-feather-alt text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"></i>
            </div>
            <div>
              <h1 class="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                BlogSpace
              </h1>
              <p class="text-xs text-gray-500 font-medium">Chia sẻ câu chuyện</p>
            </div>
          </div>
        </RouterLink>

        <div class="hidden md:flex items-center space-x-2">
          <RouterLink to="/" class="nav-link-modern">
            <i class="fas fa-home mr-2"></i>Trang chủ
          </RouterLink>
          <RouterLink to="/blogs" class="nav-link-modern">
            <i class="fas fa-blog mr-2"></i>Blogs
          </RouterLink>
          
          <template v-if="isLoggedIn">
            <!-- Admin Dashboard Link -->
            <RouterLink v-if="isAdmin" to="/dashboard" class="nav-link-modern bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
            </RouterLink>
            
            <RouterLink to="/my-blogs" class="nav-link-modern">
              <i class="fas fa-book-reader mr-2"></i>Blog của tôi
            </RouterLink>
            <button @click="goToCreateBlog" class="btn-gradient">
              <i class="fas fa-plus-circle mr-2"></i>Tạo Blog
            </button>
            <RouterLink to="/profile" class="nav-link-modern">
              <i class="fas fa-user-circle mr-2"></i>Hồ sơ
            </RouterLink>
            <button @click="handleLogout" class="btn-outline">
              <i class="fas fa-sign-out-alt mr-2"></i>Đăng xuất
            </button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="btn-gradient">
              <i class="fas fa-sign-in-alt mr-2"></i>Đăng nhập
            </RouterLink>
            <RouterLink to="/register" class="btn-outline">
              <i class="fas fa-user-plus mr-2"></i>Đăng ký
            </RouterLink>
          </template>
        </div>

        <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-indigo-50 transition-colors">
          <svg class="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div v-if="showMobileMenu" class="md:hidden mt-4 space-y-2">
        <RouterLink to="/" class="block nav-link">Trang chủ</RouterLink>
        <RouterLink to="/blogs" class="block nav-link">Blogs</RouterLink>
        
        <template v-if="isLoggedIn">
          <!-- Admin Dashboard Link -->
          <RouterLink v-if="isAdmin" to="/dashboard" class="block nav-link bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold">Dashboard</RouterLink>
          
          <RouterLink to="/my-blogs" class="block nav-link">Blog của tôi</RouterLink>
          <RouterLink to="/blogs/create" class="block nav-link">Tạo Blog</RouterLink>
          <RouterLink to="/profile" class="block nav-link">Hồ sơ</RouterLink>
          <button @click="handleLogout" class="block w-full text-left nav-link">
            Đăng xuất
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="block nav-link">Đăng nhập</RouterLink>
          <RouterLink to="/register" class="block nav-link">Đăng ký</RouterLink>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const appTitle = import.meta.env.VITE_APP_TITLE || 'Vue 3 Blog'
const showMobileMenu = ref(false)

const isLoggedIn = computed(() => authStore.isLoggedIn)
const isAdmin = computed(() => authStore.isAdmin)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const goToCreateBlog = () => {
  router.push('/blogs/create')
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header-modern {
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.logo-container {
  position: relative;
}

.logo-icon {
  transition: transform 0.3s;
}

.logo-container:hover .logo-icon {
  transform: rotate(-10deg) scale(1.1);
}

.nav-link-modern {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.nav-link-modern:hover {
  color: #4f46e5;
  background-color: #eef2ff;
}

.nav-link-modern.router-link-active {
  background: linear-gradient(to right, #6366f1, #a855f7);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-gradient {
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(to right, #4f46e5, #9333ea, #ec4899);
  display: flex;
  align-items: center;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
}

.btn-gradient:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.btn-outline {
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  border: 2px solid #4f46e5;
  color: #4f46e5;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.btn-outline:hover {
  background-color: #4f46e5;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
