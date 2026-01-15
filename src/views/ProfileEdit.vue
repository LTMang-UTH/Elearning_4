<template>
  <div class="max-w-2xl mx-auto px-6 py-8">
      <h1 class="text-3xl font-bold mb-8">Chỉnh sửa hồ sơ</h1>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-8">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện</label>
          <div class="flex items-center space-x-4">
            <img :src="previewAvatar || '/default-avatar.png'" alt="Avatar" class="w-20 h-20 rounded-full object-cover">
            <input type="file" @change="handleAvatarUpload" accept="image/*" class="text-sm">
          </div>
        </div>

        <Input
          id="name"
          v-model="formData.name"
          label="Họ và tên"
          placeholder="Nhập họ và tên của bạn"
          required
        />

        <div class="mt-4">
          <Input
            id="email"
            v-model="formData.email"
            type="email"
            label="Email"
            placeholder="Nhập email của bạn"
            disabled
          />
        </div>

        <div class="mt-4">
          <Input
            id="phone"
            v-model="formData.phone"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
          <textarea
            v-model="formData.bio"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Giới thiệu về bản thân..."
          ></textarea>
        </div>

        <div class="mt-8 flex gap-4">
          <Button type="submit" variant="primary" :loading="loading">
            Lưu thay đổi
          </Button>
          <RouterLink to="/profile" class="btn btn-secondary">
            Hủy
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const loading = ref(false)
const previewAvatar = ref(null)

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  bio: ''
})

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  previewAvatar.value = URL.createObjectURL(file)
  
  const result = await userStore.uploadAvatar(file)
  if (result.success) {
    authStore.updateUserProfile({ avatar: result.data.url })
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const result = await userStore.updateProfile(formData)
    
    if (result.success) {
      authStore.updateUserProfile(formData)
      alert('Profile updated successfully!')
      router.push('/profile')
    }
  } catch (error) {
    alert('Failed to update profile')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const user = authStore.currentUser
  if (user) {
    formData.name = user.name
    formData.email = user.email
    formData.phone = user.phone || ''
    formData.bio = user.bio || ''
    previewAvatar.value = user.avatar
  }
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
