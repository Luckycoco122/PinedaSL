(function ($) {
  "use strict";

  /* ===========================
     Core existente del tema
     =========================== */

  // WOW.js
  new WOW().init();

  // Back to top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 90) {
      $('.nav-bar').addClass('nav-sticky');
      $('.carousel, .page-header').css("margin-top", "73px");
    } else {
      $('.nav-bar').removeClass('nav-sticky');
      $('.carousel, .page-header').css("margin-top", "0");
    }
  });

  // Dropdown on hover (desktop)
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $('.navbar .dropdown').on('mouseover', function () {
          $('.dropdown-toggle', this).trigger('click');
        }).on('mouseout', function () {
          $('.dropdown-toggle', this).trigger('click').blur();
        });
      } else {
        $('.navbar .dropdown').off('mouseover').off('mouseout');
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // CounterUp
  $('[data-toggle="counter-up"]').counterUp({ delay: 10, time: 2000 });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $('.btn-play').click(function () { $videoSrc = $(this).data("src"); });
    $('#videoModal').on('shown.bs.modal', function () {
      $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });
    $('#videoModal').on('hide.bs.modal', function () {
      $("#video").attr('src', $videoSrc);
    });
  });

  // Testimonial Slider
  $('.testimonial-slider').slick({
    infinite: true,
    autoplay: true,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.testimonial-slider-nav'
  });
  $('.testimonial-slider-nav').slick({
    arrows: false,
    dots: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '22px',
    slidesToShow: 3,
    asNavFor: '.testimonial-slider'
  });
  $('.testimonial .slider-nav').css({ position: "relative", height: "160px" });

  // Related / Blogs carousel
  $(".related-slider").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: { 0: { items: 1 }, 576: { items: 1 }, 768: { items: 2 } }
  });

  // Portfolio isotope
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });
  $('#portfolio-flters li').on('click', function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');
    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

  /* ============================================================
     Mobile UX tweaks (aplica en TODAS las páginas)
     - Detecta móvil
     - Inyecta CSS del botón moderno
     - Reduce top-bar a 20px en móvil (en cualquier plantilla)
     ============================================================ */
  (function mobileUX() {
    /* ---- Config ---- */
    var MOBILE_MAX = 820;           // px
    var NAV_H_MOBILE = '76px';
    var NAV_H_DESKTOP = '92px';
    var TOPBAR_PX = 20;             // altura franja amarilla en móvil

    /* ---- Detección móvil (viewport + pointer + UA fallback) ---- */
    var mq = window.matchMedia('(max-width:' + MOBILE_MAX + 'px), (pointer: coarse)');
    var UA_MOBILE = /Android|iPhone|iPad|iPod|Windows Phone|Mobile/i;
    function isMobile() { return mq.matches || UA_MOBILE.test(navigator.userAgent || ''); }

    /* ---- Helpers CSS ---- */
    function ensureStyle(id, cssText) {
      var tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        tag.textContent = cssText;
        document.head.appendChild(tag);
      }
      return tag;
    }
    function removeStyle(id) {
      var tag = document.getElementById(id);
      if (tag) tag.remove();
    }

    /* ---- CSS botón moderno (disponible siempre, una sola vez) ---- */
    var BTN_CSS =
      '.btn-modern{--btn-bg1:#1fd06d;--btn-bg2:#11b053;--btn-txt:#052b14;--btn-glow:rgba(31,208,109,.55);--btn-ring:rgba(31,208,109,.35);--btn-shadow:0 10px 24px rgba(17,176,83,.22),0 2px 6px rgba(0,0,0,.08);display:inline-flex;align-items:center;justify-content:center;gap:.55rem;padding:.9rem 1.3rem;border-radius:999px;border:none;background:linear-gradient(135deg,var(--btn-bg1),var(--btn-bg2));color:var(--btn-txt);font-weight:800;letter-spacing:.2px;text-decoration:none;box-shadow:var(--btn-shadow);transition:transform .18s ease,box-shadow .18s ease,filter .18s ease;position:relative;isolation:isolate;}'
      + '.btn-modern::after{content:"";position:absolute;left:50%;transform:translateX(-50%);bottom:-12px;width:58%;height:4px;border-radius:999px;background:rgba(0,0,0,.25);filter:blur(3px);pointer-events:none;z-index:-1;}'
      + '.btn-modern:hover{transform:translateY(-2px);filter:saturate(1.05);box-shadow:0 14px 28px var(--btn-glow),0 3px 10px rgba(0,0,0,.12);}'
      + '.btn-modern:active{transform:translateY(0);filter:saturate(1);box-shadow:0 8px 18px rgba(0,0,0,.18);}'
      + '.btn-modern:focus-visible{outline:none;box-shadow:0 0 0 4px #fff,0 0 0 8px var(--btn-ring),0 10px 24px rgba(17,176,83,.22);}'
      + '.btn-modern .ico{font-size:1.15em;line-height:0;}'
      + '.btn-modern[data-variant="primary"]{--btn-bg1:#5b8cff;--btn-bg2:#3a66ff;--btn-txt:#041033;--btn-glow:rgba(90,140,255,.55);--btn-ring:rgba(90,140,255,.35);}'
      + '.btn-modern[data-variant="warning"]{--btn-bg1:#ffd86b;--btn-bg2:#ffb84d;--btn-txt:#3a2400;--btn-glow:rgba(255,184,77,.55);--btn-ring:rgba(255,184,77,.35);}';

    /* ---- Reducir top-bar en móvil (cubriendo distintos nombres de clase) ---- */
    var TOPBAR_SELECTORS = ['.top-bar', '.header-top', '.topbar', '.top-strip', '.topstrip'];
    function shrinkTopBar() {
      if (!isMobile()) return;

      var found = false;
      TOPBAR_SELECTORS.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          found = true;
          el.style.setProperty('min-height', TOPBAR_PX + 'px', 'important');
          el.style.setProperty('height', TOPBAR_PX + 'px', 'important');
          el.style.setProperty('padding', '0', 'important');
          el.style.setProperty('margin', '0', 'important');
          el.style.setProperty('overflow', 'hidden', 'important');
          el.style.setProperty('border-bottom', '1px solid rgba(0,0,0,.08)', 'important');
        });
      });

      // Reintentos si el header se monta tarde
      if (!found) {
        setTimeout(shrinkTopBar, 150);
        setTimeout(shrinkTopBar, 600);
      }
    }

    /* ---- Aplicación global ---- */
    function apply() {
      var mobile = isMobile();
      var docEl = document.documentElement;

      // flag + variable de altura del header
      docEl.classList.toggle('is-mobile', mobile);
      docEl.style.setProperty('--nav-h', mobile ? NAV_H_MOBILE : NAV_H_DESKTOP);

      // Estilos del botón (una vez)
      ensureStyle('btn-modern-css', BTN_CSS);

      // Topbar fina solo en móvil
      if (mobile) shrinkTopBar(); else removeStyle('thin-topbar-mobile');
    }

    // Init + listeners
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', apply, { once: true });
    } else {
      apply();
    }
    if (mq.addEventListener) mq.addEventListener('change', apply); else mq.addListener(apply);
    window.addEventListener('resize', apply, { passive: true });
    window.addEventListener('orientationchange', apply, { passive: true });

    // Si el DOM cambia (algunos headers se inyectan), volvemos a aplicar
    var mo = new MutationObserver(apply);
    mo.observe(document.documentElement, { childList: true, subtree: true });
  })();

})(jQuery);
