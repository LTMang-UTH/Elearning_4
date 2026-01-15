/**
 * Custom directive: v-click-outside
 * Detect clicks outside an element
 */
export const clickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

/**
 * Custom directive: v-focus
 * Auto focus an element when it's inserted into the DOM
 */
export const focus = {
  mounted(el) {
    el.focus()
  }
}

/**
 * Custom directive: v-tooltip
 * Show tooltip on hover
 */
export const tooltip = {
  mounted(el, binding) {
    const tooltipText = binding.value
    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip'
    tooltip.textContent = tooltipText
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      white-space: nowrap;
      z-index: 9999;
      display: none;
      pointer-events: none;
    `

    document.body.appendChild(tooltip)

    el.addEventListener('mouseenter', (e) => {
      const rect = el.getBoundingClientRect()
      tooltip.style.display = 'block'
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`
      tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`
    })

    el.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none'
    })

    el._tooltip = tooltip
  },
  unmounted(el) {
    if (el._tooltip) {
      document.body.removeChild(el._tooltip)
    }
  }
}
