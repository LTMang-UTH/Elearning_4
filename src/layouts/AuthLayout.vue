<template>
  <div class="auth-layout min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.auth-layout {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
