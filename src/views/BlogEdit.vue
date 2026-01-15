<template>
  <div class="max-w-4xl mx-auto px-6 py-8">
      <h1 class="text-4xl font-bold mb-8">Chỉnh sửa bài viết</h1>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>

      <form v-else-if="blog" @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-8">
        <Input
          id="title"
          v-model="formData.title"
          type="text"
          label="Tiêu đề bài viết"
          placeholder="Nhập tiêu đề bài viết"
          required
        />

        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
          <textarea
            v-model="formData.content"
            rows="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Viết nội dung bài viết của bạn..."
          ></textarea>
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện</label>
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <img v-if="formData.image" :src="formData.image" alt="Preview" class="mt-4 w-full h-48 object-cover rounded-lg">
        </div>

        <div class="mt-6">
          <Input
            id="category"
            v-model="formData.category"
            type="text"
            label="Danh mục"
            placeholder="Nhập danh mục"
          />
        </div>

        <div class="mt-8 flex gap-4">
          <Button type="submit" variant="primary" :loading="updating">
            Cập nhật bài viết
          </Button>
          <RouterLink to="/my-blogs" class="btn btn-secondary">
            Hủy
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { useBlogStore } from '@/store/blog'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const loading = ref(true)
const updating = ref(false)
const blog = ref(null)

const formData = reactive({
  title: '',
  content: '',
  category: '',
  tags: '',
  image: null
})

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    const result = await blogStore.uploadBlogImage(file)
    if (result.success) {
      formData.image = result.data.url
    }
  } catch (error) {
    alert('Tải ảnh lên thất bại')
  }
}

const handleSubmit = async () => {
  updating.value = true
  
  try {
    const result = await blogStore.updateBlog(route.params.id, formData)
    
    if (result.success) {
      alert('Blog updated successfully!')
      router.push('/my-blogs')
    } else {
      alert('Failed to update blog')
    }
  } catch (error) {
    alert('An error occurred')
  } finally {
    updating.value = false
  }
}

onMounted(async () => {
  await blogStore.fetchBlogById(route.params.id)
  blog.value = blogStore.currentBlog
  
  if (blog.value) {
    formData.title = blog.value.title
    formData.content = blog.value.content
    formData.category = blog.value.category
    formData.tags = blog.value.tags?.join(', ')
    formData.image = blog.value.image
  }
  
  loading.value = false
})
</script>

<style scoped>
.btn {
  @apply px-6 py-3 rounded-lg font-semibold transition-colors inline-block;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300;
}
</style>
