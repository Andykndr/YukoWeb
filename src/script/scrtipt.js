const hamburger = document.querySelector('.hamburger'),
  promo = document.querySelector('.header_promo'),
  promoItem = document.querySelectorAll('.promo_item');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('hamburger_active');
  promo.classList.toggle('header_promo_active');
});
promoItem.forEach((item) => {
  item.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    promo.classList.toggle('header_promo_active');
  });
});

$(document).ready(function () {
  $('.carousel_slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="img/services/arrow/arrowleft.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="img/services/arrow/arrowright.png"></button>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          autoplay: true,
          autoplaySpeed: 1500,
          dots: true,
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 577,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(function () {
    $('ul.portfolio_tabs').on(
      'click',
      'li:not(.portfolio_tab_active)',
      function () {
        $(this)
          .addClass('portfolio_tab_active')
          .siblings()
          .removeClass('portfolio_tab_active')
          .closest('div.container')
          .find('div.portfolio')
          .removeClass('portfolio_active')
          .eq($(this).index())
          .addClass('portfolio_active');
      }
    );
  });

  new WOW().init();
});
