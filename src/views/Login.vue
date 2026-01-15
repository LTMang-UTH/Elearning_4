<template>
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-20">
      <h2 class="text-3xl font-bold text-center mb-6">Đăng Nhập</h2>
      
      <form @submit.prevent="handleSubmit">
        <Input
          id="email"
          v-model="formData.email"
          type="email"
          label="Email"
          placeholder="Nhập email của bạn"
          :error="errors.email"
          required
        />
        
        <div class="mt-4">
          <Input
            id="password"
            v-model="formData.password"
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu của bạn"
            :error="errors.password"
            required
          />
        </div>
        
        <div class="mt-4 flex items-center justify-between">
          <label class="flex items-center">
            <input type="checkbox" v-model="formData.remember" class="mr-2">
            <span class="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
          </label>
          
          <RouterLink to="/forgot-password" class="text-sm text-primary-600 hover:text-primary-700">
            Quên mật khẩu?
          </RouterLink>
        </div>
        
        <div class="mt-6">
          <Button type="submit" variant="primary" :loading="loading" full-width>
            Đăng Nhập
          </Button>
        </div>
        
        <p class="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?
          <RouterLink to="/register" class="text-primary-600 hover:text-primary-700 font-medium">
            Đăng ký ngay
          </RouterLink>
        </p>
      </form>

      <!-- Demo Account Info -->
      <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-sm font-semibold text-blue-800 mb-2">👤 Tài khoản Admin Demo:</p>
        <div class="space-y-1 text-sm text-blue-700">
          <p><strong>Email:</strong> admin@gmail.com</p>
          <p><strong>Mật khẩu:</strong> admin123</p>
        </div>
        <button 
          @click="fillAdminCredentials"
          type="button"
          class="mt-3 w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Điền thông tin Admin
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const formData = reactive({
  email: '',
  password: '',
  remember: false
})

const errors = reactive({
  email: '',
  password: ''
})

const validateForm = () => {
  let isValid = true
  
  if (!formData.email) {
    errors.email = 'Vui lòng nhập email'
    isValid = false
  } else {
    errors.email = ''
  }
  
  if (!formData.password) {
    errors.password = 'Vui lòng nhập mật khẩu'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    isValid = false
  } else {
    errors.password = ''
  }
  
  return isValid
}

const fillAdminCredentials = () => {
  formData.email = 'admin@gmail.com'
  formData.password = 'admin123'
  errors.email = ''
  errors.password = ''
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    const result = await authStore.login({
      email: formData.email,
      password: formData.password
    })
    
    if (result.success) {
      alert('Đăng nhập thành công!')
      
      // Nếu là admin, chuyển đến Dashboard
      // Nếu là user thường, chuyển đến Home
      if (authStore.isAdmin) {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    } else {
      alert(result.message || 'Đăng nhập thất bại')
    }
  } catch (error) {
    alert('Đã xảy ra lỗi khi đăng nhập')
  } finally {
    loading.value = false
  }
}
</script>
