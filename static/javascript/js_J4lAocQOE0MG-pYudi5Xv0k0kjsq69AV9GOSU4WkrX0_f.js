/*
'use strict';

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.backToTop = {
    attach: function attach(context) {

      if ($('#back-to-top').length > 0) {
        $('#back-to-top a').on('click', function (event) {
          event.preventDefault();

          $('body,html').animate({
            scrollTop: 0
          }, 500);
        });
      }
    }
  };
})(jQuery, Drupal);
'use strict';

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.blog = {
    attach: function attach(context) {

      if ($('#scroll-to-comments').length > 0) {
        $('#scroll-to-comments').on('click', function (event) {
          event.preventDefault();

          $('body,html').animate({
            scrollTop: $($('#scroll-to-comments').attr('href')).offset().top - 50
          }, 500);
        });
      }
    }
  };
})(jQuery, Drupal);


'use strict';

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.brokenImg = {
    attach: function attach(context) {
      window.addEventListener('DOMContentLoaded', function (e) {
        document.querySelectorAll('img').forEach(function (img) {
          img.onerror = function () {
            this.className = 'error-loaded container container-sm';
          };
        });
      });
    }
  };
})(jQuery, Drupal);
*/

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

/*

'use strict';

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.exhibitionGallery = {
    attach: function attach() {

      $("#slick-prev").click(function () {
        var hash = 1;
        hash = parseInt(window.location.hash.substr(1));
        if (hash > 1) {
          hash = hash - 1;
        }
        ga('send', {
          hitType: 'pageview',
          page: location.pathname + '#' + hash
        });
      });
      $("#slick-next").click(function () {
        var hash = 1;
        hash = parseInt(window.location.hash.substr(1));
        if (hash > 1) {
          hash = hash - 1;
        }
        ga('send', {
          hitType: 'pageview',
          page: location.pathname + '#' + hash
        });
      });

      if ($('.exhibition--detail').length > 0) {
        var objectId = 1;
        if (window.location.hash) {
          objectId = parseInt(window.location.hash.substr(1));
          if (Number.isNaN(objectId) || objectId < 0 || objectId > $('.exhibition-image').length - 1) {
            objectId = 1;
          }
        }

        $('#exhibition-images').on('init', function (slick) {
          $('[data-exhibition-detail-id=' + objectId + ']').removeClass('hidden');
          $('#exhibition-thumbnails [data-id=' + objectId + '] img').addClass('border-color-kumera');
        });
        $('#exhibition-images').slick({
          adaptiveHeight: true,
          draggable: false,
          infinite: true,
          initialSlide: objectId - 1,
          prevArrow: $('#slick-prev'),
          nextArrow: $('#slick-next')
        });
        $('#exhibition-images').on('afterChange', function (event, slick, currentSlide) {
          currentSlide = parseInt(currentSlide) + 1;
          history.pushState({}, null, '#' + currentSlide);
          $('.exhibition-detail').addClass('hidden');
          $('[data-exhibition-detail-id=' + currentSlide + ']').removeClass('hidden');
          $('#exhibition-thumbnails img').removeClass('border-color-kumera');
          $('#exhibition-thumbnails [data-id=' + currentSlide + '] img').addClass('border-color-kumera');
        });

        var slideshowArrows = function slideshowArrows(mql) {
          if (mql.matches) {
            $('#slick-prev').css('left', '15px');
            $('#slick-next').css('right', '15px');
          } else {
            $('#slick-prev').css('left', '0');
            $('#slick-next').css('right', '0');
          }
        };

        var mql = window.matchMedia("(min-width: 992px) and (max-width: 1200px)");
        slideshowArrows(mql);
        mql.addListener(slideshowArrows);

        $('#exhibition-thumbnails a').click(function (event) {
          var index = $(this).attr('data-id');
          $('#exhibition-images').slick('slickGoTo', index - 1);
          event.stopPropagation();
          $("html, body").animate({ scrollTop: 0 }, 500);
        });
      }
    }
  };
})(jQuery, Drupal);
*/

/*
'use strict';

(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.grids = {
    attach: function attach(context) {

      //console.log('cookies', document.cookie);

      var gridPathCookie = getCookie('grid_path');
      var gridCookie = getCookie('grid');

      if (window.location.pathname != gridPathCookie) {
        eraseCookie('grid');
        eraseCookie('grid_path');
        showAsGrid();
      } else if (gridCookie && gridCookie == 'false') {
        showAsList();
      } else {
        showAsGrid();
      }

      var openFilterCookie = getCookie('open_filter');
      var openFilterPathCookie = getCookie('open_filter_path');

      if (window.location.pathname == openFilterPathCookie) {
        if (openFilterCookie && openFilterCookie == 'true') {
          $('#filter-form').slideDown(function () {
            if ($(this).is(':visible')) {
              setCookie('open_filter', 'true');
              setCookie('open_filter_path', window.location.pathname);
            } else {
              setCookie('open_filter', 'false');
            }
          });
        }
      } else {
        eraseCookie('open_filter');
        eraseCookie('open_filter_path');
      }

      function showForm() {
        $('#filter-form').slideToggle(function () {
          if ($(this).is(':visible')) {
            setCookie('open_filter', 'true');
            setCookie('open_filter_path', window.location.pathname);
          } else {
            setCookie('open_filter', 'false');
          }
        });
      }

      function resize() {
        if ($('.use-grid-js').hasClass('is-grid')) {
          var width = $('.use-grid-js .item-wrapper:first-child').width();
          $('.use-grid-js .item-wrapper').height(width * .8);
        }
      }

      function showAsGrid() {
        $('.use-grid-js').removeClass('is-list').addClass('is-grid');
        $('.use-grid-js .item-wrapper').attr('class', $('.use-grid-js .item-wrapper:first-child').attr('data-grid-class'));
        $('.use-grid-js .list-item').hide();
        $('.use-grid-js .grid-item').show();
        $('#list-view').removeClass('active');
        $('#grid-view').addClass('active');
        eraseCookie('grid');
        setCookie('grid', 'true');
        setCookie('grid_path', window.location.pathname);
        resize();
      }

      function showAsList() {
        $('.use-grid-js .item-wrapper').height('auto');
        $('.use-grid-js').removeClass('is-grid').addClass('is-list');
        $('.use-grid-js .item-wrapper').attr('class', $('.use-grid-js .item-wrapper:first-child').attr('data-list-class'));
        $('.use-grid-js .grid-item').hide();
        $('.use-grid-js .list-item').show();
        $('#grid-view').removeClass('active');
        $('#list-view').addClass('active');
        eraseCookie('grid');
        setCookie('grid', 'false');
        setCookie('grid_path', window.location.pathname);
      }

      $('#show-form, #close-form', context).on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
        showForm();
      });
      $('#grid-view').on('click', function (event) {
        event.preventDefault();
        showAsGrid();
      });
      $('#list-view').on('click', function (event) {
        event.preventDefault();
        showAsList();
      });

      // $('.views-exposed-form select[multiple]').multipleSelect();
      // $('.views-exposed-form select:not([multiple])').multipleSelect({
      //   single: true
      // });

      if ($('.use-grid-js').length > 0) {
        resize();
        window.onresize = resize;
      }

      function setCookie(name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
        }
        var cookieString = name + "=" + (value || "") + expires + ";path=/";
        document.cookie = cookieString;
      }

      function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
          }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }

      function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
      }
    }
  };
})(jQuery, Drupal);
*/

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

  Drupal.behaviors.newsletterSignup = {
    attach: function attach(context) {

      if ($('#simplenews-subscriptions-block-default-newsletter', context).length) {

        // Use the label as the input's placeholder
        var input = $('#simplenews-subscriptions-block-default-newsletter .form-email');
        var label = input.prev();
        input.attr('placeholder', label.text());
      }
    }
  };
})(jQuery, Drupal);
'use strict';

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.pressReleaseGallery = {
    attach: function attach() {

      if ($('.press-release--detail').length > 0) {
        var objectId = 0;
        if (window.location.hash) {
          objectId = parseInt(window.location.hash.substr(1));
          if (Number.isNaN(objectId) || objectId < 0 || objectId > $('.press-release-image').length - 1) {
            objectId = 0;
          }
        }

        $('#press-release-images').on('init', function (slick) {
          $('[data-press-release-title-id=' + objectId + ']').removeClass('hidden');
          $('[data-press-release-detail-id=' + objectId + ']').removeClass('hidden');
          $('#press-release-thumbnails [data-id=' + objectId + '] img').addClass('border-color-kumera');
        });
        $('#press-release-images').slick({
          adaptiveHeight: true,
          draggable: false,
          infinite: true,
          initialSlide: objectId,
          prevArrow: $('#slick-prev'),
          nextArrow: $('#slick-next')
        });
        $('#press-release-images').on('afterChange', function (event, slick, currentSlide) {
          currentSlide = parseInt(currentSlide);
          history.pushState({}, null, '#' + currentSlide);
          $('.press-release-filename').addClass('hidden');
          $('[data-press-release-title-id=' + currentSlide + ']').removeClass('hidden');
          $('.press-release-detail').addClass('hidden');
          $('[data-press-release-detail-id=' + currentSlide + ']').removeClass('hidden');
          $('#press-release-thumbnails .js-press-gallery-selector').removeClass('border-color-kumera');
          $('#press-release-thumbnails [data-id=' + currentSlide + '] .js-press-gallery-selector').addClass('border-color-kumera');
        });

        $('#press-release-thumbnails a').click(function (event) {
          var index = $(this).attr('data-id');
          $('#press-release-images').slick('slickGoTo', index);
          event.stopPropagation();
        });
      }
    }
  };
})(jQuery, Drupal);
'use strict';

(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.publicArtLocations = {
    attach: function attach(context, settings) {

      function getCurrentItemId() {
        return $('.public-art--full').attr('data-id');
      }

      function getCurrentItem() {
        var currentItemId = getCurrentItemId();
        return $('.view-public-art-locations [data-id=' + currentItemId + ']');
      }

      function getCurrentSectionId() {
        var currentItem = getCurrentItem();
        return currentItem.parents('.section').attr('id');
      }

      function getItemHeight() {
        return $('.view-public-art-locations .section:first .item:first').outerHeight();
      }

      function collapse(section) {
        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;

        var top = 0;
        if (section.attr('id') == getCurrentSectionId()) {
          var currentItem = getCurrentItem();
          top = -currentItem.position().top;
        }
        var inner = section.children().first();
        inner.animate({
          top: top
        }, duration);
        section.animate({
          height: getItemHeight()
        }, duration);
        section.addClass('collapsed');
      }

      function collapseAll() {
        var initialize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (initialize) {
          $('.view-public-art-locations .section').each(function () {
            collapse($(this), 0);
          });
        } else {
          $('.view-public-art-locations .section.collapsed').each(function () {
            collapse($(this), 0);
          });
        }
      }

      function expand(section) {
        var inner = section.children().first();
        var height = inner.height();
        inner.animate({
          top: 0
        });
        section.animate({
          height: height
        }, function () {
          section.css('height', '');
        });
        section.removeClass('collapsed');

        // Toggle visible icons.
        section.prev().find('.icon').toggleClass('hidden');
      }

      if ($('.view-public-art-locations').length > 0) {

        // Highlight the current item.
        var currentItem = getCurrentItem();
        currentItem.find('img').addClass('border-color-kumera');

        // Add next and previous anchors.
        var currentItemWrapper = currentItem.parents('.item');
        var prevItemWrapper = currentItemWrapper.prev();
        var nextItemWrapper = currentItemWrapper.next();

        if (prevItemWrapper.length > 0) {
          var prevAnchor = prevItemWrapper.find('a');
          var $prevPager = $('.prev-public-art');
          $prevPager.attr('href', prevAnchor.attr('href'));
        } else {
          $('.prev-public-art').remove();
        }

        if (nextItemWrapper.length > 0) {
          var nextAnchor = nextItemWrapper.find('a');
          var $nextPager = $('.next-public-art');
          $nextPager.attr('href', nextAnchor.attr('href'));
        } else {
          $('.next-public-art').remove();
        }

        // Collapse sections into a single row.
        collapseAll(true);
        window.onresize = function () {
          collapseAll(false);
        };

        var expanded = getCookie('pub-art-expanded');
        if (expanded) {
          var showFirst = $('.first-open.view-public-art-locations');
          if (showFirst.length < 1) {
            expand($('#' + expanded));
          }
        }

        // Expand/collapse sections.
        $('.view-public-art-locations .heading a', context).click(function (event) {
          event.preventDefault();

          // Expand/collapse this section.
          var section = $(this).parents('.heading').next();
          eraseCookie('pub-art-expanded');
          if (section.hasClass('collapsed')) {
            expand(section);
            setCookie('pub-art-expanded', section.attr('id'));
          } else {
            collapse(section);
          }
        });
      }

      function setCookie(name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
        }
        var cookieString = name + "=" + (value || "") + expires + ";path=/";
        document.cookie = cookieString;
      }

      function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
          }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }

      function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
      }

      var hideGalleries = $('.hide-galleries.view-public-art-locations');
      if (hideGalleries.length > 0) {
        var $markup = $('<div class="view-more-galleries"><div class="galleries"></div></div>');
        var count = 0;
        hideGalleries.find('.view-content > *').each(function () {
          if (count > 1) {
            $(this).appendTo($markup.find('.galleries'));
          }
          count++;
        });

        $markup.prepend('<h3 class="see-all heading mt-4 mb-1 px-1 text-base">\n' + '    <a href="#" class="inline-flex justify-start text-color-kumera no-underline hover:underline">\n' + '      <span class="mr-1">See all Public Art</span>\n' + '      <div class="icon closed">\n' + '        <svg class="svg-inline--fa fa-chevron-right fa-w-10 fa-sm" aria-hidden="true" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg><!-- <i class="fas fa-chevron-right fa-sm"></i> -->\n' + '      </div>\n' + '      <div class="icon opened hidden">\n' + '        <svg class="svg-inline--fa fa-chevron-down fa-w-14 fa-sm" aria-hidden="true" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg><!-- <i class="fas fa-chevron-down fa-sm"></i> -->\n' + '      </div>\n' + '    </a>\n' + '  </h3>');
        hideGalleries.find('.view-content').append($markup);

        $('h3.see-all').on('click', function (e) {
          e.preventDefault();
          $(this).find('.icon.closed').toggleClass('hidden');
          $(this).find('.icon.opened').toggleClass('hidden');
          $(this).siblings('.galleries').slideToggle(300);
        });
        hideGalleries.find('.view-content').addClass('show');
      }

      var showFirst = $('.first-open.view-public-art-locations');
      if (showFirst.length > 0) {
        expand($('.first-open.view-public-art-locations').find('#section'));
        // $('.first-open.view-public-art-locations').find('h3:first-child .icon').toggleClass('hidden');
      }
    }
  };
})(jQuery, Drupal);
'use strict';

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.sfoImageModal = {
    attach: function attach(context) {
      if (context !== document) {
        return;
      }

      $('.wikipedia_field_group .wikipedia_hide_show').click(function () {

        var $this = $(this);
        var html = $this.html() === 'Cite this object' ? 'Hide' : 'Cite this object';

        $this.html(html);
        $('.wikipedia_field_group .glyphicon').toggleClass("glyphicon-chevron-up");
        $('.wikipedia_field_group .wikipedia_field').toggleClass("hidden");
      });

      var $modal = $('.modal.dblclick-popup');
      var $dblclick = $('.dblclick');

      $dblclick.on('click', function () {
        var $id = $(this).attr('id');
        var $imageSrc = $('#' + $id + ' img').attr('src');

        $modal.find('img').attr('src', $imageSrc);
        $modal.modal('toggle');
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
'use strict';

//
// This file has been modified.
//

/* eslint-disable */

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/*
 * This is not the original jQuery Superfish plugin.
 * Please refer to the README for more information.
 */

(function ($) {
  $.fn.superfish = function (op) {
    var sf = $.fn.superfish,
        c = sf.c,
        $arrow = $(['<span class="', c.arrowClass, '"> &#187;</span>'].join('')),
        over = function over() {
      var $$ = $(this),
          menu = getMenu($$);
      clearTimeout(menu.sfTimer);
      $$.showSuperfishUl().siblings().hideSuperfishUl();
    },
        out = function out() {
      var $$ = $(this),
          menu = getMenu($$),
          o = sf.op;
      clearTimeout(menu.sfTimer);
      menu.sfTimer = setTimeout(function () {
        if ($$.children('.sf-clicked').length == 0) {
          o.retainPath = $.inArray($$[0], o.$path) > -1;
          $$.hideSuperfishUl();
          if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1) {
            over.call(o.$path);
          }
        }
      }, o.delay);
    },
        getMenu = function getMenu($menu) {
      var menu = $menu.parents(['ul.', c.menuClass, ':first'].join(''))[0];
      sf.op = sf.o[menu.serial];
      return menu;
    },
        addArrow = function addArrow($a) {
      $a.addClass(c.anchorClass).append($arrow.clone());
    };

    return this.each(function () {
      var s = this.serial = sf.o.length;
      var o = $.extend({}, sf.defaults, op);
      o.$path = $('li.' + o.pathClass, this).slice(0, o.pathLevels);
      var p = o.$path;
      for (var l = 0; l < p.length; l++) {
        p.eq(l).addClass([o.hoverClass, c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass);
      }
      sf.o[s] = sf.op = o;

      $('li:has(ul)', this)[$.fn.hoverIntent && !o.disableHI ? 'hoverIntent' : 'hover'](over, out).each(function () {
        if (o.autoArrows) addArrow($(this).children('a:first-child, span.nolink:first-child'));
      }).not('.' + c.bcClass).hideSuperfishUl();

      var $a = $('a, span.nolink', this);
      $a.each(function (i) {
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function () {
          over.call($li);
        }).blur(function () {
          out.call($li);
        });
      });
      o.onInit.call(this);
    }).each(function () {
      var menuClasses = [c.menuClass];
      if (sf.op.dropShadows) {
        menuClasses.push(c.shadowClass);
      }
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};

  sf.c = {
    bcClass: 'sf-breadcrumb',
    menuClass: 'sf-js-enabled',
    anchorClass: 'sf-with-ul',
    arrowClass: 'sf-sub-indicator',
    shadowClass: 'sf-shadow'
  };
  sf.defaults = {
    hoverClass: 'sfHover',
    pathClass: 'overideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: { opacity: 'show' },
    speed: 'fast',
    autoArrows: true,
    dropShadows: true,
    disableHI: false, // true disables hoverIntent detection
    onInit: function onInit() {}, // callback functions
    onBeforeShow: function onBeforeShow() {},
    onShow: function onShow() {},
    onHide: function onHide() {}
  };
  $.fn.extend({
    hideSuperfishUl: function hideSuperfishUl() {
      var o = sf.op,
          not = o.retainPath === true ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.', o.hoverClass].join(''), this).add(this).not(not).removeClass(o.hoverClass).children('ul').addClass('hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl: function showSuperfishUl() {
      var o = sf.op,
          sh = sf.c.shadowClass + '-off',
          $ul = this.addClass(o.hoverClass).children('ul.hidden').hide().removeClass('hidden');
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation, o.speed, function () {
        o.onShow.call($ul);
      });
      return this;
    }
  });
})(jQuery);

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, once) {
  var deprecatedMessageSuffix = "is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256";
  var originalJQOnce = $.fn.once;
  var originalJQRemoveOnce = $.fn.removeOnce;

  $.fn.once = function jQueryOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.once() ".concat(deprecatedMessageSuffix)
    });
    return originalJQOnce.apply(this, [id]);
  };

  $.fn.removeOnce = function jQueryRemoveOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.removeOnce() ".concat(deprecatedMessageSuffix)
    });
    return originalJQRemoveOnce.apply(this, [id]);
  };

  var drupalOnce = once;

  function augmentedOnce(id, selector, context) {
    originalJQOnce.apply($(selector, context), [id]);
    return drupalOnce(id, selector, context);
  }

  function remove(id, selector, context) {
    originalJQRemoveOnce.apply($(selector, context), [id]);
    return drupalOnce.remove(id, selector, context);
  }

  window.once = Object.assign(augmentedOnce, drupalOnce, {
    remove: remove
  });
})(jQuery, once);;
/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
;
