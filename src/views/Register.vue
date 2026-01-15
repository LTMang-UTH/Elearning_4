<template>
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-20">
      <h2 class="text-3xl font-bold text-center mb-6">Đăng Ký</h2>
      
      <form @submit.prevent="handleSubmit">
        <Input
          id="name"
          v-model="formData.name"
          type="text"
          label="Họ và tên"
          placeholder="Nhập họ và tên của bạn"
          :error="errors.name"
          required
        />
        
        <div class="mt-4">
          <Input
            id="email"
            v-model="formData.email"
            type="email"
            label="Email"
            placeholder="Nhập email của bạn"
            :error="errors.email"
            required
          />
        </div>
        
        <div class="mt-4">
          <Input
            id="password"
            v-model="formData.password"
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            :error="errors.password"
            required
          />
        </div>
        
        <div class="mt-4">
          <Input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            :error="errors.confirmPassword"
            required
          />
        </div>
        
        <div class="mt-6">
          <Button type="submit" variant="primary" :loading="loading" full-width>
            Đăng Ký
          </Button>
        </div>
        
        <p class="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?
          <RouterLink to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
            Đăng nhập ngay
          </RouterLink>
        </p>
      </form>
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
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateForm = () => {
  let isValid = true
  
  if (!formData.name) {
    errors.name = 'Vui lòng nhập họ và tên'
    isValid = false
  } else {
    errors.name = ''
  }
  
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
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu không khớp'
    isValid = false
  } else {
    errors.confirmPassword = ''
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    const result = await authStore.register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
    
    if (result.success) {
      alert('Đăng ký thành công! Vui lòng đăng nhập.')
      router.push('/login')
    } else {
      alert(result.message || 'Đăng ký thất bại')
    }
  } catch (error) {
    alert('Đã xảy ra lỗi khi đăng ký')
  } finally {
    loading.value = false
  }
}
</script>
