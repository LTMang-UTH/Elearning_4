<template>
  <div class="default-layout">
    <Header />
    <main class="main-content">
      <div class="container mx-auto px-4 py-8">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - 200px);
}
</style>
