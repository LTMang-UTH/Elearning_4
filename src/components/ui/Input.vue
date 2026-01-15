<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="inputClasses"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  error: String,
  hint: String
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputClasses = computed(() => {
  const classes = [
    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors'
  ]
  
  if (props.error) {
    classes.push('border-red-500 focus:ring-red-500')
  } else {
    classes.push('border-gray-300 focus:ring-primary-500 focus:border-primary-500')
  }
  
  if (props.disabled) {
    classes.push('bg-gray-100 cursor-not-allowed')
  }
  
  return classes.join(' ')
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}
</script>
