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
  const accordionButtons = document.querySelectorAll('.accordion-button')
  const accordionLinks = document.querySelectorAll('.accordion-link')

  accordionLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.stopPropagation() // Prevent the accordion toggle
      window.location.href = link.getAttribute('href') // Navigate to the link
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

function countryDestinationFn() {
  $('ul li a').click(function () {
    console.log('Tab link clicked')

    $('ul li').removeClass('active')
    $(this).parent('li').addClass('active')

    var tabId = $(this).attr('href')

    $('.column2').removeClass('active-content').addClass('hidden-content')
    $(tabId).removeClass('hidden-content').addClass('active-content')

    return false
  })

  const listItems = document.querySelectorAll('.country-destinations ul li')
  listItems.forEach((item, index) => {
    const delay = (index + 1) * 200

    item.style.transitionDelay = `${delay}ms`
  })

  var owl = $('.destination-owl-carousel')

  owl.owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2.1,
      },
    },
  })

  $('.prevBtn').click(function () {
    owl.trigger('prev.owl.carousel')
  })

  $('.nextBtn').click(function () {
    owl.trigger('next.owl.carousel')
  })

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  })

  const hiddenElements = document.querySelectorAll('.hidden')
  hiddenElements.forEach(el => observer.observe(el))
}

document.addEventListener('DOMContentLoaded', function () {
  injectHtml([countrySidebarFn, headerActiveFn, countryDestinationFn])
})

document.addEventListener('scroll', () => {
  const headerContainer = document.querySelector('.header-container')
  const scroll = window.scrollY
  if (scroll > 1 && headerContainer && headerContainer.classList) {
    headerContainer.classList.add('header-scrolled')
  } else {
    headerContainer.classList.remove('header-scrolled')
  }

  const scrollToTopBtn = document.getElementById('scrollToTopBtn')
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show')
  } else {
    scrollToTopBtn.classList.remove('show')
  }
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
})
