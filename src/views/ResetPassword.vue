<template>
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-20">
      <h2 class="text-3xl font-bold text-center mb-6">Đặt lại mật khẩu</h2>
      
      <form @submit.prevent="handleSubmit">
        <Input
          id="password"
          v-model="formData.password"
          type="password"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          :error="errors.password"
          required
        />
        
        <div class="mt-4">
          <Input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu mới"
            :error="errors.confirmPassword"
            required
          />
        </div>
        
        <div class="mt-6">
          <Button type="submit" variant="primary" :loading="loading" full-width>
            Đặt lại mật khẩu
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const formData = reactive({
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  password: '',
  confirmPassword: ''
})

const handleSubmit = async () => {
  if (formData.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    return
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu không khớp'
    return
  }
  
  loading.value = true
  
  try {
    // API call would go here with route.params.token
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Đặt lại mật khẩu thành công!')
    router.push('/login')
  } catch (error) {
    alert('Đặt lại mật khẩu thất bại')
  } finally {
    loading.value = false
  }
}
</script>
