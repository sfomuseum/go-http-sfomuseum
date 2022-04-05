/* necessary for the hover menus */

/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 *
 * Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
 * Special thanks to Karl Swedberg for valuable input.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */
/*
 * This is not the original jQuery Supposition plugin.
 * Please refer to the README for more information.
 */


/* necessary for the hover menus */

/**
 * @file
 * The Superfish Drupal Behavior to apply the Superfish jQuery plugin to lists.
 */

(function ($, Drupal, drupalSettings) {

    'use strict';

    /**
     * jQuery Superfish plugin.
     *
     * @type {Drupal~behavior}
     *
     * @prop {Drupal~behaviorAttach} attach
     *   Attaches the behavior to an applicable <ul> element.
     */

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
