<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
    <div class="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div class="text-center">
        <!-- Icon -->
        <div class="mb-6">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full">
            <i class="fas fa-exclamation-triangle text-red-600 text-5xl"></i>
          </div>
        </div>
        
        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Không thể kết nối đến Server
        </h1>
        
        <!-- Message -->
        <p class="text-lg text-gray-600 mb-6">
          {{ errorMessage }}
        </p>
        
        <!-- Error Details (Collapsible) -->
        <div v-if="errorDetails" class="mb-8">
          <button 
            @click="showDetails = !showDetails"
            class="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center mx-auto"
          >
            <i :class="showDetails ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="mr-2"></i>
            {{ showDetails ? 'Ẩn' : 'Xem' }} chi tiết lỗi
          </button>
          
          <transition name="slide-fade">
            <div v-if="showDetails" class="mt-4 bg-gray-50 rounded-lg p-4 text-left">
              <pre class="text-xs text-gray-700 overflow-x-auto">{{ errorDetails }}</pre>
            </div>
          </transition>
        </div>
        
        <!-- Solutions -->
        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-left mb-8">
          <h3 class="font-bold text-gray-800 mb-3 flex items-center">
            <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
            Cách khắc phục:
          </h3>
          <ol class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start">
              <span class="font-bold mr-2">1.</span>
              <span>Kiểm tra MySQL/MariaDB đã được khởi động chưa</span>
            </li>
            <li class="flex items-start">
              <span class="font-bold mr-2">2.</span>
              <span>Chạy lệnh: <code class="bg-gray-200 px-2 py-1 rounded text-xs">mysql -V</code> để kiểm tra MySQL</span>
            </li>
            <li class="flex items-start">
              <span class="font-bold mr-2">3.</span>
              <span>Import database từ file <code class="bg-gray-200 px-2 py-1 rounded text-xs">backend/database.sql</code></span>
            </li>
            <li class="flex items-start">
              <span class="font-bold mr-2">4.</span>
              <span>Kiểm tra file <code class="bg-gray-200 px-2 py-1 rounded text-xs">backend/.env</code> có đúng thông tin không</span>
            </li>
            <li class="flex items-start">
              <span class="font-bold mr-2">5.</span>
              <span>Xem hướng dẫn chi tiết trong <a href="/DATABASE_SETUP.md" class="text-indigo-600 hover:underline font-medium">DATABASE_SETUP.md</a></span>
            </li>
          </ol>
        </div>
        
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="retry"
            class="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            <i class="fas fa-sync-alt mr-2"></i>
            Thử lại
          </button>
          
          <button 
            @click="goBack"
            class="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Quay lại
          </button>
        </div>
        
        <!-- Help Link -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-500">
            Cần trợ giúp? 
            <a href="https://github.com/your-repo/issues" target="_blank" class="text-indigo-600 hover:underline font-medium">
              Báo cáo lỗi
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  errorMessage: {
    type: String,
    default: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra database và backend server.'
  },
  errorDetails: {
    type: String,
    default: null
  }
})

const router = useRouter()
const showDetails = ref(false)

const retry = () => {
  window.location.reload()
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
