<template>
  <div class="blog-list-page container mx-auto px-6 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold">Tất cả bài viết</h1>
        <RouterLink v-if="isLoggedIn" to="/blogs/create" class="btn btn-primary">
          Tạo bài viết mới
        </RouterLink>
      </div>

      <div class="mb-6 flex gap-4">
        <Input
          v-model="searchQuery"
          placeholder="Tìm kiếm bài viết..."
          @input="handleSearch"
        />
        
        <select v-model="sortBy" @change="handleSort" class="px-4 py-2 border rounded-lg">
          <option value="createdAt">Mới nhất</option>
          <option value="title">Tiêu đề</option>
          <option value="views">Xem nhiều nhất</option>
        </select>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="blogs.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Không tìm thấy bài viết nào</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="blog in blogs" :key="blog.id" class="blog-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img :src="blog.image || '/placeholder-blog.jpg'" :alt="blog.title" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ blog.title }}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">{{ blog.excerpt || blog.content }}</p>
            
            <!-- Author Info -->
            <div class="flex items-center gap-2 mb-4">
              <img 
                :src="blog.author_avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(blog.author_name || 'Author') + '&background=random'" 
                :alt="blog.author_name" 
                class="w-8 h-8 rounded-full object-cover"
              >
              <span class="text-sm text-gray-700 font-medium">{{ blog.author_name || 'Unknown Author' }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">{{ formatDate(blog.createdAt) }}</span>
              <RouterLink :to="`/blogs/${blog.id}`" class="text-primary-600 hover:text-primary-700 font-medium">
                Đọc thêm →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div v-if="pagination.totalPages > 1" class="mt-8 flex justify-center gap-2">
        <button
          v-for="page in pagination.totalPages"
          :key="page"
          @click="handlePageChange(page)"
          :class="['px-4 py-2 rounded-lg', page === pagination.page ? 'bg-primary-600 text-white' : 'bg-gray-200 hover:bg-gray-300']"
        >
          {{ page }}
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import { useBlogStore } from '@/store/blog'
import { useAuthStore } from '@/store/auth'

const blogStore = useBlogStore()
const authStore = useAuthStore()

const loading = ref(false)
const searchQuery = ref('')
const sortBy = ref('createdAt')

const blogs = computed(() => blogStore.blogs)
const pagination = computed(() => blogStore.pagination)
const isLoggedIn = computed(() => authStore.isLoggedIn)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchBlogs = async (params = {}) => {
  loading.value = true
  await blogStore.fetchBlogs({
    page: 1,
    limit: 12,
    sortBy: sortBy.value,
    ...params
  })
  loading.value = false
}

const handleSearch = () => {
  if (searchQuery.value) {
    blogStore.searchBlogs({ keyword: searchQuery.value })
  } else {
    fetchBlogs()
  }
}

const handleSort = () => {
  fetchBlogs({ sortBy: sortBy.value })
}

const handlePageChange = (page) => {
  fetchBlogs({ page })
}

onMounted(() => {
  fetchBlogs()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn {
  @apply px-6 py-3 rounded-lg font-semibold transition-colors;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700;
}
</style>
