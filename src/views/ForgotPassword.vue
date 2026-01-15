<template>
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-20">
    <h2 class="text-3xl font-bold text-center mb-6">Quên mật khẩu</h2>
    
    <p class="text-gray-600 text-center mb-6">
      Nhập địa chỉ email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
    </p>
    
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
      
      <div class="mt-6">
        <Button type="submit" variant="primary" :loading="loading" full-width>
          Gửi liên kết đặt lại
        </Button>
      </div>
      
      <p class="mt-4 text-center text-sm text-gray-600">
        Đã nhớ mật khẩu?
        <RouterLink to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
          Đăng nhập tại đây
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const loading = ref(false)
const formData = reactive({
  email: ''
})

const errors = reactive({
  email: ''
})

const handleSubmit = async () => {
  if (!formData.email) {
    errors.email = 'Email không được để trống'
    return
  }
  
  loading.value = true
  
  try {
    // API call would go here
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!')
  } catch (error) {
    alert('Gửi liên kết đặt lại thất bại')
  } finally {
    loading.value = false
  }
}
</script>
