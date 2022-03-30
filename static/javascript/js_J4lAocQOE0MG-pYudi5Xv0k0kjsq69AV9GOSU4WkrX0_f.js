'use strict';

(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.collapsible = {
    attach: function attach(context, settings) {

      $('.collapse').each(function () {
        var id = $(this).attr('id');
        var trigger = $('[aria-controls=' + id + ']');

        if ($(this).hasClass('hidden')) {
          trigger.find('.collapsed').removeClass('hidden');
        } else {
          trigger.find('.expanded').removeClass('hidden');
        }

        trigger.on('click', function (event) {
          event.preventDefault();

          $(this).toggleClass('expanded');

          $('#' + id).slideToggle(function () {
            trigger.find('.collapsed').toggle();
            trigger.find('.expanded').toggle();
          });
        });
      });
    }
  };
})(jQuery, Drupal);

'use strict';

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.collectionGallery = {
    attach: function attach() {

      $("#slick-prev").click(function () {
        var hash = 0;
        hash = parseInt(window.location.hash.substr(1));
        if (hash > 0) {
          hash = hash - 1;
        }
        ga('send', {
          hitType: 'pageview',
          page: location.pathname + '#' + hash
        });
      });
      $("#slick-next").click(function () {
        var hash = 0;
        hash = parseInt(window.location.hash.substr(1));
        if (hash > 0) {
          hash = hash - 1;
        }
        ga('send', {
          hitType: 'pageview',
          page: location.pathname + '#' + hash
        });
      });

      if ($('.collection--full').length > 0) {
        var objectId = 0;
        if (window.location.hash) {
          objectId = parseInt(window.location.hash.substr(1));
          if (Number.isNaN(objectId) || objectId < 0 || objectId > $('.collection-image').length - 1) {
            objectId = 0;
          }
        }

        $('#collection-images').on('init', function (slick) {
          $('[data-collection-image-id=' + objectId + ']').removeClass('hidden');
          $('#collection-thumbnails [data-id=' + objectId + '] img').addClass('border-color-kumera');
        });
        $('#collection-images').slick({
          adaptiveHeight: true,
          draggable: false,
          infinite: true,
          initialSlide: objectId,
          prevArrow: $('#slick-prev'),
          nextArrow: $('#slick-next')
        });
        $('#collection-images').on('afterChange', function (event, slick, currentSlide) {
          currentSlide = parseInt(currentSlide);
          history.pushState({}, null, '#' + currentSlide);
          $('.collection-image').addClass('hidden');
          $('[data-collection-image-id=' + currentSlide + ']').removeClass('hidden');
          $('#collection-thumbnails img').removeClass('border-color-kumera');
          $('#collection-thumbnails [data-id=' + currentSlide + '] img').addClass('border-color-kumera');
        });

        /* Museum team requested this to be removed, I think... */
        /*
        $('#slick-prev').css('left', '-100vw');
        $('#slick-next').css('right', '-100vw');
        $('#collection-image-wrapper').hover(function() {
          $('#slick-prev').stop().animate({
            left: 0
          });
          $('#slick-next').stop().animate({
            right: 0
          });
        }, function() {
          $('#slick-prev').stop().animate({
            left: '-100vw'
          });
          $('#slick-next').stop().animate({
            right: '-100vw'
          });
        });*/

        $('#collection-thumbnails a').click(function (event) {
          var index = $(this).attr('data-id');
          $('#collection-images').slick('slickGoTo', index);
          event.stopPropagation();
        });
      }
    }
  };
})(jQuery, Drupal);

'use strict';

(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.mobileMenu = {
    attach: function attach(context) {

      $('.mobile-menu-controls', context).click(function () {
        $(this).children().toggleClass('hidden');
        $('#block-museum-mobile-menu').slideToggle(250, function () {
          $(this).toggleClass('block').toggleClass('hidden');
          $(this).css('display', '');
        });
      });

      $('#block-museum-mobile-menu > ul > li > a', context).click(function (e) {
        e.preventDefault();
        $(e.currentTarget).parent().find('.sub-nav-controls').children().toggleClass('hidden');
        $(e.currentTarget).parent().find('.sub-nav-controls').next().slideToggle(200);
      });

      $('.sub-nav-controls', context).click(function () {
        $(this).children().toggleClass('hidden');
        $(this).next().slideToggle(200);
      });
    }
  };
})(jQuery, Drupal);


'use strict';

(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.search = {
    attach: function attach(context) {

      $('.search-controls', context).once().click(function () {
        $('#block-search-solr-header-search-form').toggleClass('open').slideToggle(200, function () {
          $('#edit-keys', this).focus();
        });
      });

      $('.main-container, footer').once().click(function () {
        if ($('#block-search-solr-header-search-form').hasClass('open')) {
          $('#block-search-solr-header-search-form').removeClass('open').slideUp(200);
        }
      });
    }
  };
})(jQuery, Drupal);
