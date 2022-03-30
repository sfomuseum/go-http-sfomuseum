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


(function ($) {
    $.fn.supposition = function () {
        var $w = $(window),
            /*do this once instead of every onBeforeShow call*/
            _offset = function (dir) {
                return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset'] ||
                    document.documentElement && document.documentElement[dir == 'y' ? 'scrollTop' : 'scrollLeft'] ||
                    document.body[dir == 'y' ? 'scrollTop' : 'scrollLeft'];
            },
            onHide = function () {
                this.css({
                    bottom: ''
                });
            },
            onBeforeShow = function () {
                this.each(function () {
                    var $u = $(this);
                    $u.css('display', 'block');
                    var $mul = $u.closest('.sf-menu'),
                        level = $u.parents('ul').length,
                        menuWidth = $u.width(),
                        menuParentWidth = $u.closest('li').outerWidth(true),
                        menuParentLeft = $u.closest('li').offset().left,
                        totalRight = $w.width() + _offset('x'),
                        menuRight = $u.offset().left + menuWidth,
                        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;
                    if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
                        if (menuParentLeft < exactMenuWidth) {
                            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)) {
                                $u.css({
                                    left: 0,
                                    right: 'auto'
                                });
                            } else {
                                $u.css({
                                    left: menuParentWidth + 'px',
                                    right: 'auto'
                                });
                            }
                        }
                    } else {
                        if (menuRight > totalRight && menuParentLeft > menuWidth) {
                            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)) {
                                $u.css({
                                    right: 0,
                                    left: 'auto'
                                });
                            } else {
                                $u.css({
                                    right: menuParentWidth + 'px',
                                    left: 'auto'
                                });
                            }
                        }
                    }
                    var windowHeight = $w.height(),
                        offsetTop = $u.offset().top,
                        menuParentShadow = ($mul.hasClass('sf-shadow') && $u.css('padding-bottom').length > 0) ? parseInt($u.css('padding-bottom').slice(0, -2)) : 0,
                        menuParentHeight = ($mul.hasClass('sf-vertical')) ? '-' + menuParentShadow : $u.parent().outerHeight(true) - menuParentShadow,
                        menuHeight = $u.height(),
                        baseline = windowHeight + _offset('y');
                    var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
                    if (expandUp) {
                        $u.css({
                            bottom: menuParentHeight + 'px',
                            top: 'auto'
                        });
                    }
                    $u.css('display', 'none');
                });
            };

        return this.each(function () {
	    // pass
	});

    };
})(jQuery);;

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
                        $menu.supposition();
                    }
                }
            });
        }
    };
})(jQuery, Drupal, drupalSettings);;

/**
 * @file
 * Attaches behaviors for the Chosen module.
 */

/* necessary for the hover menus */

(function ($, Drupal, drupalSettings) {
    'use strict';

    // Temporal workaround while  https://github.com/harvesthq/chosen/issues/515
    // is fixed. This fix was taken from:
    // https://github.com/harvesthq/chosen/issues/515#issuecomment-104602031
    $.fn.oldChosen = $.fn.chosen;
    $.fn.chosen = function (options) {
        var select = $(this),
            is_creating_chosen = !!options;

        if (is_creating_chosen && select.css('position') === 'absolute') {
            // if we are creating a chosen and the select already has the appropriate styles added
            // we remove those (so that the select hasn't got a crazy width), then create the chosen
            // then we re-add them later
            select.removeAttr('style');
        }

	return;

	// This code always fails with a 'oldChosen' is not a function error
	// https://github.com/harvesthq/chosen has a deprecation notice
	// (20220330/thisisaaronland)

	/*
        var ret = select.oldChosen(options);

        // only act if the select has display: none, otherwise chosen is unsupported (iPhone, etc)
        if (is_creating_chosen && select.css('display') === 'none') {
            // https://github.com/harvesthq/chosen/issues/515#issuecomment-33214050
            // only do this if we are initializing chosen (no params, or object params) not calling a method
            select.attr('style', 'display:visible; position:absolute; width:0px; height: 0px; clip:rect(0,0,0,0)');
            select.attr('tabindex', -1);
        }
        return ret;
	*/
    };

    // Update Chosen elements when state has changed.
    $(document).on('state:disabled', 'select', function (e) {
        $(e.target).trigger('chosen:updated');
    });

    Drupal.behaviors.chosen = {

        settings: {

            /**
             * Completely ignores elements that match one of these selectors.
             *
             * Disabled on:
             * - Field UI
             * - WYSIWYG elements
             * - Tabledrag weights
             * - Elements that have opted-out of Chosen
             * - Elements already processed by Chosen.
             *
             * @type {string}
             */
            ignoreSelector: '#field-ui-field-storage-add-form select, #entity-form-display-edit-form select, #entity-view-display-edit-form select, .wysiwyg, .draggable select[name$="[weight]"], .draggable select[name$="[position]"], .locale-translate-filter-form select, .chosen-disable, .chosen-processed',

            /**
             * Explicit "opt-in" selector.
             *
             * @type {string}
             */
            optedInSelector: 'select.chosen-enable',

            /**
             * The default selector, overridden by drupalSettings.
             *
             * @type {string}
             */
            selector: 'select:visible'
        },

        /**
         * Drupal attach behavior.
         */
        attach: function (context, settings) {
            this.settings = this.getSettings(settings);
            this.getElements(context).once('chosen').each(function (i, element) {
                this.createChosen(element);
            }.bind(this));
        },

        /**
         * Creates a Chosen instance for a specific element.
         *
         * @param {jQuery|HTMLElement} element
         *   The element.
         */
        createChosen: function (element) {
            var $element = $(element);
            $element.chosen(this.getElementOptions($element));
        },

        /**
         * Filter out elements that should not be converted into Chosen.
         *
         * @param {jQuery|HTMLElement} element
         *   The element.
         *
         * @return {boolean}
         *   TRUE if the element should stay, FALSE otherwise.
         */
        filterElements: function (element) {
            var $element = $(element);

            // Remove elements that should be ignored completely.
            if ($element.is(this.settings.ignoreSelector)) {
                return false;
            }

            // Zero value means no minimum.
            var minOptions = $element.attr('multiple') ? this.settings.minimum_multiple : this.settings.minimum_single;
            return !minOptions || $element.find('option').length >= minOptions;
        },

        /**
         * Retrieves the elements that should be converted into Chosen instances.
         *
         * @param {jQuery|Element} context
         *   A DOM Element, Document, or jQuery object to use as context.
         * @param {string} [selector]
         *   A selector to use, defaults to the default selector in the settings.
         */
        getElements: function (context, selector) {
            var $context = $(context || document);
            var $elements = $context.find(selector || this.settings.selector);

            // Remove elements that should not be converted into Chosen.
            $elements = $elements.filter(function (i, element) {
                return this.filterElements(element);
            }.bind(this));

            // Add elements that have explicitly opted in to Chosen.
            $elements = $elements.add($context.find(this.settings.optedInSelector));

            return $elements;
        },

        /**
         * Retrieves options used to create a Chosen instance based on an element.
         *
         * @param {jQuery|HTMLElement} element
         *   The element to process.
         *
         * @return {Object}
         *   The options object used to instantiate a Chosen instance with.
         */
        getElementOptions: function (element) {
            var $element = $(element);
            var options = $.extend({}, this.settings.options);
            var dimension;
            var width;

            // The width default option is considered the minimum width, so this
            // must be evaluated for every option.
            if (this.settings.minimum_width > 0) {
                // Given we need to manage settings as both percentage and pixel widths,
                // we need to handle width calculations separately.
                if (this.settings.use_relative_width) {
                    dimension = '%';
                    width = ($element.width() / $element.parent().width() * 100).toPrecision(5);
                } else {
                    dimension = 'px';
                    width = $element.width();
                }

                if (width < this.settings.minimum_width) {
                    options.width = this.settings.minimum_width + dimension;
                } else {
                    options.width = width + dimension;
                }
            }

            // Some field widgets have cardinality, so we must respect that.
            // @see \Drupal\chosen\ChosenFormRender::preRenderSelect()
            var cardinality;
            if ($element.attr('multiple') && (cardinality = $element.data('cardinality'))) {
                options.max_selected_options = cardinality;
            }

            return options;
        },

        /**
         * Retrieves the settings passed from Drupal.
         *
         * @param {Object} [settings]
         *   Passed Drupal settings object, if any.
         */
        getSettings: function (settings) {
            return $.extend(true, {}, this.settings, settings && settings.chosen || drupalSettings.chosen);
        }

    };

})(jQuery, Drupal, drupalSettings);
