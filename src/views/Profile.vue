<template>
  <div class="profile-page max-w-4xl mx-auto px-6 py-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold">Hồ Sơ Của Tôi</h1>
          <RouterLink to="/profile/edit" class="btn btn-primary">
            Chỉnh Sửa Hồ Sơ
          </RouterLink>
        </div>

        <div v-if="user" class="space-y-6">
          <div class="flex items-center space-x-6">
            <img
              :src="user.avatar || '/default-avatar.png'"
              alt="Avatar"
              class="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
              <p class="text-gray-600">{{ user.email }}</p>
              <span class="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                {{ user.role }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Họ và Tên</label>
              <p class="text-gray-900">{{ user.name }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p class="text-gray-900">{{ user.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <p class="text-gray-900">{{ user.phone || 'Chưa cung cấp' }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ngày tham gia</label>
              <p class="text-gray-900">{{ formatDate(user.createdAt) }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
            <p class="text-gray-900">{{ user.bio || 'Chưa có giới thiệu' }}</p>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold mb-6">Thống Kê</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-primary-50 rounded-lg">
            <p class="text-4xl font-bold text-primary-600">{{ stats.totalBlogs }}</p>
            <p class="text-gray-600 mt-2">Tổng Số Blog</p>
          </div>
          
          <div class="text-center p-6 bg-green-50 rounded-lg">
            <p class="text-4xl font-bold text-green-600">{{ stats.totalViews }}</p>
            <p class="text-gray-600 mt-2">Lượt Xem</p>
          </div>
          
          <div class="text-center p-6 bg-purple-50 rounded-lg">
            <p class="text-4xl font-bold text-purple-600">{{ stats.totalLikes }}</p>
            <p class="text-gray-600 mt-2">Lượt Thích</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const user = computed(() => authStore.currentUser)
const stats = ref({
  totalBlogs: 0,
  totalViews: 0,
  totalLikes: 0
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  // Load user statistics
  stats.value = {
    totalBlogs: 12,
    totalViews: 1543,
    totalLikes: 234
  }
})
</script>

<style scoped>
.btn {
  @apply px-6 py-3 rounded-lg font-semibold transition-colors inline-block;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700;
}
</style>
