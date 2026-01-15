<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const classes = ['btn']
  
  // Variant
  classes.push(`btn-${props.variant}`)
  
  // Size
  classes.push(`btn-${props.size}`)
  
  // Full width
  if (props.fullWidth) {
    classes.push('w-full')
  }
  
  // Disabled
  if (props.disabled || props.loading) {
    classes.push('opacity-50 cursor-not-allowed')
  }
  
  return classes.join(' ')
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  @apply font-medium rounded-lg transition-colors inline-flex items-center justify-center;
}

.btn-sm {
  @apply px-3 py-1.5 text-sm;
}

.btn-md {
  @apply px-4 py-2 text-base;
}

.btn-lg {
  @apply px-6 py-3 text-lg;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}

.btn-success {
  @apply bg-green-600 text-white hover:bg-green-700;
}

.loading-spinner {
  @apply w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin;
}
</style>
