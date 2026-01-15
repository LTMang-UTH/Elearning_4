<template>
  <router-view v-slot="{ Component, route }">
    <component :is="getLayout(route)" v-if="Component">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </component>
  </router-view>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const authStore = useAuthStore()

// Initialize auth on app mount
authStore.initializeAuth()

// Get layout component based on route meta
const getLayout = (route) => {
  const layoutName = route.meta?.layout || 'DefaultLayout'
  
  return layoutName === 'AuthLayout' ? AuthLayout : DefaultLayout
}
</script>

<style>
@import './styles/main.css';
@import './styles/tailwind.css';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
