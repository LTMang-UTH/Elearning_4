import { reactive, ref, computed } from 'vue'

export function useForm(initialValues = {}, validationRules = {}) {
  const formData = reactive({ ...initialValues })
  const errors = reactive({})
  const touched = reactive({})
  const isSubmitting = ref(false)

  // Validate a single field
  const validateField = (fieldName) => {
    const value = formData[fieldName]
    const rules = validationRules[fieldName]

    if (!rules) {
      errors[fieldName] = ''
      return true
    }

    // Required validation
    if (rules.required && !value) {
      errors[fieldName] = rules.requiredMessage || `${fieldName} is required`
      return false
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      errors[fieldName] = rules.minLengthMessage || `${fieldName} must be at least ${rules.minLength} characters`
      return false
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[fieldName] = rules.maxLengthMessage || `${fieldName} must be at most ${rules.maxLength} characters`
      return false
    }

    // Email validation
    if (rules.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        errors[fieldName] = rules.emailMessage || 'Invalid email address'
        return false
      }
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[fieldName] = rules.patternMessage || `Invalid ${fieldName} format`
      return false
    }

    // Custom validation
    if (rules.custom && typeof rules.custom === 'function') {
      const customError = rules.custom(value, formData)
      if (customError) {
        errors[fieldName] = customError
        return false
      }
    }

    errors[fieldName] = ''
    return true
  }

  // Validate all fields
  const validateForm = () => {
    let isValid = true
    
    Object.keys(validationRules).forEach(fieldName => {
      if (!validateField(fieldName)) {
        isValid = false
      }
    })

    return isValid
  }

  // Handle field blur
  const handleBlur = (fieldName) => {
    touched[fieldName] = true
    validateField(fieldName)
  }

  // Handle field change
  const handleChange = (fieldName, value) => {
    formData[fieldName] = value
    
    if (touched[fieldName]) {
      validateField(fieldName)
    }
  }

  // Reset form
  const resetForm = () => {
    Object.keys(formData).forEach(key => {
      formData[key] = initialValues[key] || ''
      errors[key] = ''
      touched[key] = false
    })
    isSubmitting.value = false
  }

  // Check if form is valid
  const isValid = computed(() => {
    return Object.keys(errors).every(key => !errors[key])
  })

  // Check if form has errors
  const hasErrors = computed(() => {
    return Object.keys(errors).some(key => errors[key])
  })

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    isValid,
    hasErrors,
    validateField,
    validateForm,
    handleBlur,
    handleChange,
    resetForm
  }
}
