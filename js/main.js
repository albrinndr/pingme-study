function injectHtml(callbacks) {
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

const countrySidebarFn = () => {
  const currentPath = window.location.pathname.split('/').pop()
  const navLinks = document.querySelectorAll('#country-list a')

  if (navLinks.length > 0) {
    navLinks.forEach(link => {
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

document.addEventListener('DOMContentLoaded', function () {
  injectHtml([countrySidebarFn])
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
