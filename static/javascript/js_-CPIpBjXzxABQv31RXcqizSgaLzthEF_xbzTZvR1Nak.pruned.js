/* necessary for the hover menus */
/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 * This is not the original jQuery Supposition plugin.
*/

(function ($, Drupal, drupalSettings) {

    'use strict';

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

