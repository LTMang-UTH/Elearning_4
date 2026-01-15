<template>
  <div class="container mx-auto px-6 py-8">
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <article v-else-if="blog" class="blog-detail max-w-4xl mx-auto">
      <img v-if="blog.image" :src="blog.image" :alt="blog.title" class="w-full h-96 object-cover rounded-lg mb-8">
      
      <h1 class="text-5xl font-bold mb-4">{{ blog.title }}</h1>
      
      <div class="flex items-center justify-between mb-8 pb-4 border-b">
        <div class="flex items-center space-x-4">
          <img 
            :src="blog.author_avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(blog.author_name || 'Author') + '&background=random'" 
            :alt="blog.author_name" 
            class="w-12 h-12 rounded-full object-cover"
          >
          <div>
            <p class="font-semibold">{{ blog.author_name || 'Unknown Author' }}</p>
            <p class="text-sm text-gray-500">{{ formatDate(blog.created_at || blog.createdAt) }}</p>
          </div>
        </div>
        
        <div v-if="canEdit" class="flex gap-2">
          <RouterLink :to="`/blogs/${blog.id}/edit`" class="btn btn-secondary">
            Sửa
          </RouterLink>
          <Button variant="danger" @click="handleDelete">
            Xóa
          </Button>
        </div>
      </div>
      
      <div class="prose max-w-none mb-8" v-html="blog.content"></div>
      
      <div class="flex items-center gap-4 mb-8">
        <span class="text-gray-600">Danh mục: <strong>{{ blog.category }}</strong></span>
        <span class="text-gray-600">Lượt xem: <strong>{{ blog.views || 0 }}</strong></span>
      </div>
      
      <div v-if="blog.tags && blog.tags.length" class="flex gap-2 flex-wrap">
        <span v-for="tag in blog.tags" :key="tag" class="px-3 py-1 bg-gray-200 rounded-full text-sm">
          {{ tag }}
        </span>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { useBlogStore } from '@/store/blog'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const authStore = useAuthStore()

const loading = ref(true)
const blog = computed(() => blogStore.currentBlog)

const canEdit = computed(() => {
  return authStore.isLoggedIn && blog.value?.authorId === authStore.currentUser?.id
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleDelete = async () => {
  if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return
  
  const result = await blogStore.deleteBlog(blog.value.id)
  
  if (result.success) {
    alert('Xóa bài viết thành công')
    router.push('/my-blogs')
  } else {
    alert('Không thể xóa bài viết')
  }
}

onMounted(async () => {
  await blogStore.fetchBlogById(route.params.id)
  loading.value = false
})
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-semibold transition-colors inline-block;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300;
}

.prose {
  @apply text-gray-800 leading-relaxed;
}
</style>
