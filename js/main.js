function injectHtml(callbacks) {
  mobileSidebarLinkFn()
  var z, i, elmnt, file, xhttp
  z = document.getElementsByTagName('*')
  for (i = 0; i < z.length; i++) {
    elmnt = z[i]
    file = elmnt.getAttribute('inject-html')
    if (file) {
      xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText
            if (callbacks && callbacks.length > 0) {
              callbacks.forEach(callback => callback())
            }
          }
          if (this.status == 404) {
            elmnt.innerHTML = 'Page not found.'
          }
          elmnt.removeAttribute('inject-html')
          injectHtml(callbacks)
        }
      }
      xhttp.open('GET', file, true)
      xhttp.send()
      return
    }
  }
  if (callbacks && callbacks.length > 0) {
    callbacks.forEach(callback => callback())
  }
}

const mobileSidebarLinkFn = () => {
  const accordionButtons = document.querySelectorAll(
    '.header-mobile-container .accordion-button'
  )
  const accordionLinks = document.querySelectorAll(
    '.header-mobile-container .accordion-link'
  )

  accordionLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.stopPropagation()
      window.location.href = link.getAttribute('href')
    })
  })

  accordionButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const link = button.querySelector('.accordion-link')
      if (event.target !== link) {
        const target = button.getAttribute('data-bs-target')
        const collapseElement = document.querySelector(target)
        const isCollapsed = collapseElement.classList.contains('show')

        if (isCollapsed) {
          collapseElement.classList.remove('show')
        } else {
          collapseElement.classList.add('show')
        }
      }
    })
  })
}

const countrySidebarFn = () => {
  const currentPath = window.location.pathname.split('/').pop()
  const countryLinks = document.querySelectorAll('#country-list a')

  if (countryLinks.length > 0) {
    countryLinks.forEach(link => {
      const hrefPath = link.getAttribute('href').split('/').pop()
      if (hrefPath === currentPath) {
        link.querySelector('.card').classList.add('active')
        link.addEventListener('click', function (event) {
          event.preventDefault()
        })
      }
    })
  }
}

const headerActiveFn = () => {
  const currentPath = window.location.pathname.split('/').pop()
  const headerLinks = document.querySelectorAll('.item a')

  if (headerLinks.length > 0) {
    headerLinks.forEach(link => {
      const hrefPath = link.getAttribute('href').split('/').pop()
      if (hrefPath === currentPath) {
        link.closest('.item').classList.add('active')
        const liElement = link.closest('li')
        if (liElement) {
          liElement.classList.add('active')
        }
        link.addEventListener('click', function (event) {
          event.preventDefault()
        })
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  injectHtml([countrySidebarFn, headerActiveFn])
  const fixOverflow = () => {
    document.documentElement.style.overflowX = 'hidden'
    document.body.style.overflowX = 'hidden'
  }

  fixOverflow()
  window.addEventListener('resize', fixOverflow)
})

document.addEventListener('scroll', () => {
  const headerContainer = document.querySelector('.header-container')
  const scroll = window.scrollY
  if (scroll > 1 && headerContainer && headerContainer.classList) {
    headerContainer.classList.add('header-scrolled')
  } else {
    headerContainer.classList.remove('header-scrolled')
  }
})
