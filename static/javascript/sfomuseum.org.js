// This file was generated by robots


window.addEventListener('load', function(e){


// js_WQHdplyrlQfKdHIPVZKrk2a-733sZNBYZPC_xRA5baU.pruned.js


/* seems necessary */
   
(function () {
    var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
    window.drupalSettings = {};

    if (settingsElement !== null) {
        window.drupalSettings = JSON.parse(settingsElement.textContent);
    }
})();;

/* seems necessary */

window.Drupal = {
    behaviors: {},
    locale: {}
};

/* seems necessary */

(function (Drupal, drupalSettings, drupalTranslations, console, Proxy, Reflect) {

    Drupal.throwError = function (error) {
        setTimeout(function () {
            throw error;
        }, 0);
    };

    Drupal.attachBehaviors = function (context, settings) {
        context = context || document;
        settings = settings || drupalSettings;
        var behaviors = Drupal.behaviors;
        Object.keys(behaviors || {}).forEach(function (i) {
            if (typeof behaviors[i].attach === 'function') {
                try {
                    behaviors[i].attach(context, settings);
                } catch (e) {
                    Drupal.throwError(e);
                }
            }
        });
    };

    Drupal.detachBehaviors = function (context, settings, trigger) {
        context = context || document;
        settings = settings || drupalSettings;
        trigger = trigger || 'unload';
        var behaviors = Drupal.behaviors;
        Object.keys(behaviors || {}).forEach(function (i) {
            if (typeof behaviors[i].detach === 'function') {
                try {
                    behaviors[i].detach(context, settings, trigger);
                } catch (e) {
                    Drupal.throwError(e);
                }
            }
        });
    };
    
})(Drupal, window.drupalSettings, window.drupalTranslations, window.console, window.Proxy, window.Reflect);;

/* necessary for both the hover menus and the search box */

(function (Drupal, drupalSettings) {
    var domReady = function domReady(callback) {
        var listener = function listener() {
            callback();
            document.removeEventListener('DOMContentLoaded', listener);
        };

        if (document.readyState !== 'loading') {
            setTimeout(callback, 0);
        } else {
            document.addEventListener('DOMContentLoaded', listener);
        }
    };

    domReady(function () {
        Drupal.attachBehaviors(document, drupalSettings);
    });
    
})(Drupal, window.drupalSettings);


// js_J4lAocQOE0MG-pYudi5Xv0k0kjsq69AV9GOSU4WkrX0.pruned.js

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


// js_-CPIpBjXzxABQv31RXcqizSgaLzthEF_xbzTZvR1Nak.pruned.js


/* necessary for the hover menus */
/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 * This is not the original jQuery Supposition plugin.
*/

(function ($, Drupal, drupalSettings) {

    Drupal.behaviors.superfish = {
        attach: function (context, drupalSettings) {

            // Take a look at each menu to apply Superfish to.
            $.each(drupalSettings.superfish || {}, function (index, options) {
                var $menu = $('ul#' + options.id, context);

                // Check if we are to apply the Supersubs plug-in to it.
                if (options.plugins || false) {
                    if (options.plugins.supersubs || false) {
                        $menu.supersubs(options.plugins.supersubs);
                    }
                }

                // Apply Superfish to the menu.
                $menu.superfish(options.sf);

                // Check if we are to apply any other plug-in to it.
                if (options.plugins || false) {
                    if (options.plugins.touchscreen || false) {
                        $menu.sftouchscreen(options.plugins.touchscreen);
                    }
                    if (options.plugins.smallscreen || false) {
                        $menu.sfsmallscreen(options.plugins.smallscreen);
                    }
                    if (options.plugins.supposition || false) {
                        // $menu.supposition();
                    }
                }
            });
        }
    };
})(jQuery, Drupal, drupalSettings);



});
