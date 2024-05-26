document.addEventListener('DOMContentLoaded', function () {
  const select = document.getElementById('blog-categories')
  const blogCards = document.querySelectorAll('[data-option]')
  const options = new Set()

  // Collect unique data-options
  blogCards.forEach(card => {
    options.add(card.getAttribute('data-option'))
  })

  // Create and append 'All' option
  const allOption = document.createElement('option')
  allOption.value = 'all'
  allOption.textContent = 'All'
  select.appendChild(allOption)

  // Create and append other options
  options.forEach(option => {
    const formattedOption = option
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    const optionElement = document.createElement('option')
    optionElement.value = option
    optionElement.textContent = formattedOption
    select.appendChild(optionElement)
  })

  // Filter function
  select.addEventListener('change', function () {
    const selectedOption = this.value
    blogCards.forEach(card => {
      if (
        selectedOption === 'all' ||
        card.getAttribute('data-option') === selectedOption
      ) {
        card.style.display = 'block'
      } else {
        card.style.display = 'none'
      }
    })
  })

  // Trigger initial filter
  select.dispatchEvent(new Event('change'))
})
