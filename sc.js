$(document).ready(function () {
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

  var owl = $('.owl-carousel')

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
})
