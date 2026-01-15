<template>
  <div class="my-blogs-page container mx-auto px-6 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold">Bài viết của tôi</h1>
        <RouterLink to="/blogs/create" class="btn btn-primary">
          Tạo bài viết mới
        </RouterLink>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="myBlogs.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
        <p class="text-gray-500 text-lg mb-4">Bạn chưa tạo bài viết nào</p>
        <RouterLink to="/blogs/create" class="btn btn-primary">
          Tạo bài viết đầu tiên
        </RouterLink>
      </div>

      <div v-else class="space-y-4">
        <div v-for="blog in myBlogs" :key="blog.id" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="text-2xl font-semibold mb-2">{{ blog.title }}</h3>
              <p class="text-gray-600 mb-4">{{ blog.excerpt || blog.content?.substring(0, 150) }}...</p>
              
              <div class="flex gap-4 text-sm text-gray-500">
                <span>{{ formatDate(blog.createdAt) }}</span>
                <span>{{ blog.views || 0 }} lượt xem</span>
                <span :class="blog.status === 'published' ? 'text-green-600' : 'text-yellow-600'">
                  {{ blog.status === 'published' ? 'Đã xuất bản' : 'Nháp' }}
                </span>
              </div>
            </div>
            
            <div class="flex gap-2 ml-4">
              <RouterLink :to="`/blogs/${blog.id}`" class="btn btn-secondary">
                Xem
              </RouterLink>
              <RouterLink :to="`/blogs/${blog.id}/edit`" class="btn btn-primary">
                Sửa
              </RouterLink>
              <Button variant="danger" @click="handleDelete(blog.id)">
                Xóa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { useBlogStore } from '@/store/blog'

const blogStore = useBlogStore()

const loading = ref(true)
const myBlogs = computed(() => blogStore.myBlogs)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleDelete = async (blogId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return
  
  const result = await blogStore.deleteBlog(blogId)
  
  if (result.success) {
    alert('Xóa bài viết thành công')
  } else {
    alert('Không thể xóa bài viết')
  }
}

onMounted(async () => {
  await blogStore.fetchMyBlogs()
  loading.value = false
})
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-semibold transition-colors inline-block text-sm;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300;
}
</style>
