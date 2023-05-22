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

const carousel = document.querySelector('.carousel'),
  arrows = document.querySelectorAll('.carousel_wrapper i'),
  cardWidth = carousel.querySelector('.card').offsetWidth,
  carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;
let cardPerViev = Math.round(carousel.offsetWidth / cardWidth);

carouselChildrens
  .slice(-cardPerViev)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
  });
carouselChildrens.slice(0, cardPerViev).forEach((card) => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

arrows.forEach((arrow) => {
  arrow.addEventListener('click', () => {
    carousel.scrollLeft += arrow.id === 'left' ? -cardWidth : cardWidth;
  });
});

const draggble = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add('dragging');
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove('dragging');
};

const autoPlay = () => {
  timeoutId = setTimeout(() => (carousel.scrollLeft += cardWidth), 1800);
};
autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove('no-transition');
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove('no-transition');
  }
  clearTimeout(timeoutId);
  if (!carousel.matches(':hover')) autoPlay();
};

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mousemove', draggble);
carousel.addEventListener('scroll', infiniteScroll);
carousel.addEventListener('mouseenter', () => clearInterval(timeoutId));
carousel.addEventListener('mouseleave', autoPlay);
