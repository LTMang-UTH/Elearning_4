<template>
  <div class="dashboard-page container mx-auto px-6 py-8">
    <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      <i class="fas fa-tachometer-alt mr-3"></i>Dashboard Quản Trị
    </h1>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="stat-card bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium mb-1">Tổng người dùng</p>
            <h3 class="text-3xl font-bold">{{ stats.totalUsers }}</h3>
          </div>
          <div class="bg-white/20 p-4 rounded-full">
            <i class="fas fa-users text-3xl"></i>
          </div>
        </div>
      </div>

      <div class="stat-card bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium mb-1">Tổng bài viết</p>
            <h3 class="text-3xl font-bold">{{ stats.totalBlogs }}</h3>
          </div>
          <div class="bg-white/20 p-4 rounded-full">
            <i class="fas fa-blog text-3xl"></i>
          </div>
        </div>
      </div>

      <div class="stat-card bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium mb-1">Bài đã xuất bản</p>
            <h3 class="text-3xl font-bold">{{ stats.publishedBlogs }}</h3>
          </div>
          <div class="bg-white/20 p-4 rounded-full">
            <i class="fas fa-check-circle text-3xl"></i>
          </div>
        </div>
      </div>

      <div class="stat-card bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm font-medium mb-1">Tổng lượt xem</p>
            <h3 class="text-3xl font-bold">{{ stats.totalViews }}</h3>
          </div>
          <div class="bg-white/20 p-4 rounded-full">
            <i class="fas fa-eye text-3xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">
        <i class="fas fa-bolt mr-2 text-yellow-500"></i>Thao tác nhanh
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RouterLink to="/blogs" class="action-card group">
          <i class="fas fa-list text-2xl text-indigo-600 mb-2 group-hover:scale-110 transition-transform"></i>
          <h3 class="font-semibold text-gray-800">Quản lý bài viết</h3>
          <p class="text-sm text-gray-600 mt-1">Xem và chỉnh sửa tất cả bài viết</p>
        </RouterLink>

        <RouterLink to="/blogs/create" class="action-card group">
          <i class="fas fa-plus-circle text-2xl text-green-600 mb-2 group-hover:scale-110 transition-transform"></i>
          <h3 class="font-semibold text-gray-800">Tạo bài viết mới</h3>
          <p class="text-sm text-gray-600 mt-1">Viết bài viết mới</p>
        </RouterLink>

        <button @click="refreshStats" class="action-card group">
          <i class="fas fa-sync-alt text-2xl text-blue-600 mb-2 group-hover:rotate-180 transition-transform"></i>
          <h3 class="font-semibold text-gray-800">Làm mới dữ liệu</h3>
          <p class="text-sm text-gray-600 mt-1">Cập nhật thống kê mới nhất</p>
        </button>
      </div>
    </div>

    <!-- Recent Blogs Table -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">
        <i class="fas fa-clock mr-2 text-blue-500"></i>Bài viết gần đây
      </h2>
      
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="recentBlogs.length === 0" class="text-center py-8 text-gray-500">
        Chưa có bài viết nào
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tiêu đề</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tác giả</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Lượt xem</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày tạo</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="blog in recentBlogs" :key="blog.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-4">
                <div class="font-medium text-gray-900">{{ blog.title }}</div>
                <div class="text-sm text-gray-500 line-clamp-1">{{ blog.excerpt || blog.content }}</div>
              </td>
              <td class="px-4 py-4 text-sm text-gray-600">{{ blog.author?.name || 'N/A' }}</td>
              <td class="px-4 py-4">
                <span :class="getStatusClass(blog.status)" class="px-3 py-1 rounded-full text-xs font-semibold">
                  {{ getStatusText(blog.status) }}
                </span>
              </td>
              <td class="px-4 py-4 text-sm text-gray-600">
                <i class="fas fa-eye mr-1 text-gray-400"></i>{{ blog.views || 0 }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-600">{{ formatDate(blog.created_at) }}</td>
              <td class="px-4 py-4">
                <div class="flex gap-2">
                  <RouterLink :to="`/blogs/${blog.id}`" class="text-blue-600 hover:text-blue-700" title="Xem">
                    <i class="fas fa-eye"></i>
                  </RouterLink>
                  <RouterLink :to="`/blogs/${blog.id}/edit`" class="text-green-600 hover:text-green-700" title="Sửa">
                    <i class="fas fa-edit"></i>
                  </RouterLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useBlogStore } from '@/store/blog'
import { useUserStore } from '@/store/user'

const blogStore = useBlogStore()
const userStore = useUserStore()

const loading = ref(true)
const stats = ref({
  totalUsers: 0,
  totalBlogs: 0,
  publishedBlogs: 0,
  totalViews: 0
})

const recentBlogs = ref([])

import * as blogAPI from '@/api/blog'

const loadDashboardData = async () => {
  loading.value = true
  try {
    // Load blogs (chỉ lấy trang đầu để hiển thị gần đây)
    await blogStore.fetchBlogs({ sort: 'createdAt', status: undefined })
    recentBlogs.value = blogStore.blogs

    // Lấy thống kê tổng hợp từ API mới
    const statsRes = await blogAPI.getBlogStats()
    console.log('Blog Stats API:', statsRes)
    if (statsRes && (statsRes.totalBlogs !== undefined || statsRes.publishedBlogs !== undefined || statsRes.totalViews !== undefined)) {
      stats.value = {
        ...stats.value,
        ...statsRes
      }
      stats.value.totalBlogs = Number(stats.value.totalBlogs) || 0
      stats.value.publishedBlogs = Number(stats.value.publishedBlogs) || 0
      stats.value.totalViews = Number(stats.value.totalViews) || 0
    } else {
      stats.value.totalBlogs = 0
      stats.value.publishedBlogs = 0
      stats.value.totalViews = 0
    }
    // Mock total users (cần API thực tế)
    stats.value.totalUsers = 3
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const refreshStats = () => {
  loadDashboardData()
}

const getStatusClass = (status) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-700'
    case 'draft':
      return 'bg-yellow-100 text-yellow-700'
    case 'archived':
      return 'bg-gray-100 text-gray-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'published':
      return 'Đã xuất bản'
    case 'draft':
      return 'Bản nháp'
    case 'archived':
      return 'Đã lưu trữ'
    default:
      return status
  }
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}

.action-card:hover {
  border-color: #6366f1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.stat-card {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
