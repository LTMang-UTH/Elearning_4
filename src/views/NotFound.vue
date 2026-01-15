<template>
  <div class="not-found-page text-center py-20">
      <h1 class="text-9xl font-bold text-primary-600">404</h1>
      <h2 class="text-4xl font-semibold mt-4 mb-6">Không tìm thấy trang</h2>
      <p class="text-xl text-gray-600 mb-8">Trang bạn đang tìm kiếm không tồn tại.</p>
      <RouterLink to="/" class="btn btn-primary">
        Về trang chủ
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.btn {
  @apply px-8 py-4 rounded-lg font-semibold transition-colors inline-block text-lg;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700;
}
</style>
