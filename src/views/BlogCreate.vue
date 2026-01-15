<template>
  <div class="max-w-4xl mx-auto px-6 py-8">
      <h1 class="text-4xl font-bold mb-8">Tạo bài viết mới</h1>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-8">
        <Input
          id="title"
          v-model="formData.title"
          type="text"
          label="Tiêu đề bài viết"
          placeholder="Nhập tiêu đề bài viết"
          :error="errors.title"
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
          <p v-if="errors.content" class="mt-1 text-sm text-red-600">{{ errors.content }}</p>
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện</label>
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <p v-if="uploadProgress" class="mt-2 text-sm text-primary-600">Đang tải lên: {{ uploadProgress }}%</p>
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

        <div class="mt-6">
          <Input
            id="tags"
            v-model="formData.tags"
            type="text"
            label="Thẻ (phân cách bằng dấu phẩy)"
            placeholder="vue, javascript, lập trình web"
          />
        </div>

        <div class="mt-8 flex gap-4">
          <Button type="submit" variant="primary" :loading="loading">
            Xuất bản bài viết
          </Button>
          <Button type="button" variant="secondary" @click="saveDraft">
            Lưu nháp
          </Button>
          <RouterLink to="/blogs" class="btn btn-secondary">
            Hủy
          </RouterLink>
        </div>
      </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { useBlogStore } from '@/store/blog'

const router = useRouter()
const blogStore = useBlogStore()

const loading = ref(false)
const uploadProgress = ref(0)

const formData = reactive({
  title: '',
  content: '',
  category: '',
  tags: '',
  image: null,
  status: 'published'
})

const errors = reactive({
  title: '',
  content: ''
})

const validateForm = () => {
  let isValid = true
  
  if (!formData.title) {
    errors.title = 'Tiêu đề không được để trống'
    isValid = false
  } else {
    errors.title = ''
  }
  
  if (!formData.content) {
    errors.content = 'Nội dung không được để trống'
    isValid = false
  } else {
    errors.content = ''
  }
  
  return isValid
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    uploadProgress.value = 50
    const result = await blogStore.uploadBlogImage(file)
    
    if (result.success) {
      formData.image = result.data.url
      uploadProgress.value = 100
      setTimeout(() => { uploadProgress.value = 0 }, 2000)
    }
  } catch (error) {
    alert('Tải ảnh lên thất bại')
    uploadProgress.value = 0
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    const blogData = {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: formData.image,
      status: 'published'
    }
    
    const result = await blogStore.createBlog(blogData)
    
    if (result.success) {
      alert('Xuất bản bài viết thành công!')
      router.push('/my-blogs')
    } else {
      alert(result.message || 'Tạo bài viết thất bại')
    }
  } catch (error) {
    alert('Đã xảy ra lỗi khi tạo bài viết')
  } finally {
    loading.value = false
  }
}

const saveDraft = async () => {
  formData.status = 'draft'
  await handleSubmit()
}
</script>

<style scoped>
.btn {
  @apply px-6 py-3 rounded-lg font-semibold transition-colors inline-block;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300;
}
</style>
