$(function () {
  let header = $("#header"),
    intro = $("#intro"),
    introH = intro.innerHeight(),
    scrollPos = $(window).scrollTop(),
    nav = $("#nav"),
    navToggle = $("#navToggle");
  const worksSlider = $('[data-slider="slick"]');

  /* Fixed header
    ================================ */
  checkScroll(scrollPos, introH);

  $(window).on("scroll resize", function () {
    let scrollPos = $(window).scrollTop();

    scrollPos = $(this).scrollTop();

    checkScroll(scrollPos, introH);
  });

  function checkScroll(scrollPos, introH) {
    if (scrollPos > introH) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  }

  /* Smooth scroll
    ================================ */
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    let elementID = $(this).data("scroll");
    let elementOffset = $(elementID).offset().top;

    nav.removeClass("show");

    $("html, body").animate(
      {
        scrollTop: elementOffset - 120,
      },
      900
    );
  });

  /* Mobile nav
    ================================ */
  navToggle.on("click", function (event) {
    event.preventDefault();

    nav.toggleClass("show");
  });
  // если клик вне области меню = закрыть меню
  $(document).on("click", function (e) {
    if (
      $(e.target).closest(nav).length == 0 &&
      nav.hasClass("show") &&
      $(e.target).closest(navToggle).length == 0
    ) {
      nav.toggleClass("show");
    }
  });

  /* Filter
    ================================== */
  let filter = $("[data-filter]");

  filter.on("click", function (event) {
    event.preventDefault();

    let cat = $(this).data("filter");

    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function () {
        let workCat = $(this).data("cat");

        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });

  /* Modal
    ================================== */
  const modalCall = $("[data-modal]");
  const modalClose = $("[data-close]");

  modalCall.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalId = $this.data("modal");

    $(modalId).addClass("show");
    $("body").addClass("no-scroll");

    setTimeout(function () {
      $(modalId).find(".modal__dialog").css({
        transform: "scale(1)",
      });
    }, 200);

    worksSlider.slick("setPosition");
  });

  modalClose.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalParent = $this.parents(".modal");

    modalParent.find(".modal__dialog").css({
      transform: "scale(0)",
    });

    setTimeout(function () {
      modalParent.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal").on("click", function (event) {
    let $this = $(this);

    $this.find(".modal__dialog").css({
      transform: "scale(0)",
    });

    setTimeout(function () {
      $this.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal__dialog").on("click", function (event) {
    event.stopPropagation();
  });

  /* modal slider */
  worksSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
  });

  $(".slickPrev").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');

    currentSlider.slick("slickPrev");
  });

  $(".slickNext").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');

    currentSlider.slick("slickNext");
  });

  /* reviews slider */
  $(".reviews-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
});
