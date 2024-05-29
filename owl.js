$('.home-student-carousel').owlCarousel({
  loop: !0,
  margin: 10,
  nav: !0,
  autoplay: !0,
  responsive: {
    0: {
      items: 1,
    },
    993: {
      items: 1,
    },
    1000: {
      items: 1.7,
    },
    1920: {
      items: 1.7,
    },
  },
})
$('.home-abroad-carousel').owlCarousel({
  loop: !0,
  margin: 10,
  nav: !0,
  lazyLoad: !0,
  autoplay: !0,
  responsiveClass: !0,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 2.5,
    },
    1920: {
      items: 2.5,
    },
  },
})
$('.home-partner-carousel').owlCarousel({
  loop: !0,
  margin: 10,
  nav: !0,
  autoHeight: !0,
  autoplay: !0,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
    1920: {
      items: 5,
    },
  },
})
$('.we-are-hiring-carousel').owlCarousel({
  loop: !0,
  margin: 10,
  nav: !0,
  autoHeight: !0,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
    1920: {
      items: 1,
    },
  },
})
$('.home-post').owlCarousel({
  loop: !0,
  margin: 10,
  nav: !0,
  responsive: {
    0: {
      items: 1,
    },
    993: {
      items: 2,
    },
    1000: {
      items: 3,
    },
    1920: {
      items: 3,
    },
  },
})

////default
owl.owlCarousel({
  loop: true,
  margin: 20,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  stagePadding: 60,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
})
