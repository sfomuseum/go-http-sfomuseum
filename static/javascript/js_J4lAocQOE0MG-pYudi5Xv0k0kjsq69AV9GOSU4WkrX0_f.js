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
