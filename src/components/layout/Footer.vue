<template>
  <footer class="bg-gray-800 text-white py-8 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">{{ appTitle }}</h3>
          <p class="text-gray-400">Ứng dụng blog hiện đại được xây dựng với Vue 3</p>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Liên kết nhanh</h4>
          <ul class="space-y-2">
            <li><RouterLink to="/" class="text-gray-400 hover:text-white">Trang chủ</RouterLink></li>
            <li><RouterLink to="/blogs" class="text-gray-400 hover:text-white">Blogs</RouterLink></li>
            <li><RouterLink to="/about" class="text-gray-400 hover:text-white">Giới thiệu</RouterLink></li>
            <li><RouterLink to="/contact" class="text-gray-400 hover:text-white">Liên hệ</RouterLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Theo dõi chúng tôi</h4>
          <div class="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-blue-500 transition-colors">
              <img src="@/assets/icons/facebook.svg" alt="Facebook" class="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-sky-500 transition-colors">
              <img src="@/assets/icons/twitter.svg" alt="Twitter" class="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-pink-500 transition-colors">
              <img src="@/assets/icons/instagram.svg" alt="Instagram" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {{ currentYear }} {{ appTitle }}. Nhóm 8.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const appTitle = import.meta.env.VITE_APP_TITLE || 'Vue 3 Blog'
const currentYear = computed(() => new Date().getFullYear())
</script>
