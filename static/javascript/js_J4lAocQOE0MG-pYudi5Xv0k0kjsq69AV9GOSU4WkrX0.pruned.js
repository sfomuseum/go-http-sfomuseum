'use strict';

"use strict";

/* necessary for mobile menu */

(function ($, Drupal) {

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

/* necessary for search box */

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
