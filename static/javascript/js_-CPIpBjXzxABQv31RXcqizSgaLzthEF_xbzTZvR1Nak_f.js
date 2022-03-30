! function (p, k, m, n) {
    "use strict";
    var v = "slick",
        y = "unslick",
        C = v + "--initialized",
        b = ".slick__slider",
        w = ".slick__arrow",
        z = ".b-lazy:not(.b-loaded)",
        _ = ".media__icon--close",
        P = "is-playing",
        $ = "is-paused",
        x = k.blazy || {};

    function s(e) {
        var i, l = p("> " + b, e).length ? p("> " + b, e) : p(e),
            a = p("> " + w, e),
            n = l.data(v) ? p.extend({}, m.slick, l.data(v)) : p.extend({}, m.slick),
            s = !("array" !== p.type(n.responsive) || !n.responsive.length) && n.responsive,
            t = n.appendDots,
            o = "blazy" === n.lazyLoad && x,
            d = l.find(".media--player").length,
            c = l.hasClass(y);
        if (c || (n.appendDots = t === w ? a : t || p(l)), s)
            for (i in s) Object.prototype.hasOwnProperty.call(s, i) && s[i].settings !== y && (s[i].settings = p.extend({}, m.slick, g(n), s[i].settings));

        function r(i) {
            l.find(z).length && ((i = l.find(i ? ".slide:not(.slick-cloned) " + z : ".slick-active " + z)).length || (i = l.find(".slick-cloned " + z)), i.length && x.init.load(i))
        }

        function u() {
            d && f(), o && r(!1)
        }

        function f() {
            l.removeClass($);
            var i = l.find("." + P);
            i.length && i.removeClass(P).find(_).click()
        }

        function h() {
            l.addClass($).slick("slickPause")
        }

        function g(e) {
            return c ? {} : {
                slide: e.slide,
                lazyLoad: e.lazyLoad,
                dotsClass: e.dotsClass,
                rtl: e.rtl,
                prevArrow: p(".slick-prev", a),
                nextArrow: p(".slick-next", a),
                appendArrows: a,
                customPaging: function (i, n) {
                    var s = i.$slides.eq(n).find("[data-thumb]") || null,
                        t = '<img alt="' + k.t(s.find("img").attr("alt")) + '" src="' + s.data("thumb") + '">',
                        t = s.length && 0 < e.dotsClass.indexOf("thumbnail") ? '<div class="slick-dots__thumbnail">' + t + "</div>" : "",
                        n = i.defaults.customPaging(i, n);
                    return t ? n.add(t) : n
                }
            }
        }
        l.data(v, n), (n = l.data(v)).randomize && !l.hasClass("slick-initiliazed") && l.children().sort(function () {
            return .5 - Math.random()
        }).each(function () {
            l.append(this)
        }), c || l.on("init.sl", function (i, n) {
            t === w && p(n.$dots).insertAfter(n.$prevArrow);
            n = l.find(".slick-cloned.slick-active " + z);
            o && n.length && x.init.load(n)
        }), o ? l.on("beforeChange.sl", function () {
            r(!0)
        }) : p(".media", l).closest(".slide__content").addClass("is-loading"), l.on("setPosition.sl", function (i, n) {
            var s, t;
            t = (s = n).slideCount <= s.options.slidesToShow, n = t || !1 === s.options.arrows, l.attr("id") === s.$slider.attr("id") && (s.options.centerPadding && "0" !== s.options.centerPadding || s.$list.css("padding", ""), t && (s.$slideTrack.width() <= s.$slider.width() || p(e).hasClass("slick--thumbnail")) && s.$slideTrack.css({
                left: "",
                transform: ""
            }), (s = l.find(".b-loaded ~ .b-loader")).length && s.remove(), a[n ? "addClass" : "removeClass"]("visually-hidden"))
        }), l.slick(g(n)), l.parent().on("click.sl", ".slick-down", function (i) {
            i.preventDefault();
            i = p(this);
            p("html, body").stop().animate({
                scrollTop: p(i.data("target")).offset().top - (i.data("offset") || 0)
            }, 800, "easeOutQuad" in p.easing && n.easing ? n.easing : "swing")
        }), n.mouseWheel && l.on("mousewheel.sl", function (i, n) {
            return i.preventDefault(), l.slick(n < 0 ? "slickNext" : "slickPrev")
        }), o || l.on("lazyLoaded lazyLoadError", function (i, n, s) {
            var t;
            t = (s = p(t = s)).closest(".slide") || s.closest("." + y), s.parentsUntil(t).removeClass(function (i, n) {
                return (n.match(/(\S+)loading/g) || []).join(" ")
            })
        }), l.on("afterChange.sl", u), d && (l.on("click.sl", _, f), l.on("click.sl", ".media__icon--play", h)), c && l.slick(y), p(e).addClass(C)
    }
    k.behaviors.slick = {
        attach: function (i) {
            i = (i = (i = "length" in (i = i || document) ? i[0] : i) instanceof HTMLDocument ? i : document).querySelectorAll(".slick:not(.slick--initialized)");
            i.length && n.once(n.forEach(i, s))
        }
    }
}(jQuery, Drupal, drupalSettings, dBlazy);;
/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
(function ($) {
    $.fn.hoverIntent = function (handlerIn, handlerOut, selector) {
        var cfg = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };
        if (typeof handlerIn === "object") {
            cfg = $.extend(cfg, handlerIn)
        } else {
            if ($.isFunction(handlerOut)) {
                cfg = $.extend(cfg, {
                    over: handlerIn,
                    out: handlerOut,
                    selector: selector
                })
            } else {
                cfg = $.extend(cfg, {
                    over: handlerIn,
                    out: handlerIn,
                    selector: handlerOut
                })
            }
        }
        var cX, cY, pX, pY;
        var track = function (ev) {
            cX = ev.pageX;
            cY = ev.pageY
        };
        var compare = function (ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if (Math.sqrt((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY)) < cfg.sensitivity) {
                $(ob).off("mousemove.hoverIntent", track);
                ob.hoverIntent_s = true;
                return cfg.over.apply(ob, [ev])
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function () {
                    compare(ev, ob)
                }, cfg.interval)
            }
        };
        var delay = function (ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = false;
            return cfg.out.apply(ob, [ev])
        };
        var handleHover = function (e) {
            var ev = $.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
            }
            if (e.type === "mouseenter") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).on("mousemove.hoverIntent", track);
                if (!ob.hoverIntent_s) {
                    ob.hoverIntent_t = setTimeout(function () {
                        compare(ev, ob)
                    }, cfg.interval)
                }
            } else {
                $(ob).off("mousemove.hoverIntent", track);
                if (ob.hoverIntent_s) {
                    ob.hoverIntent_t = setTimeout(function () {
                        delay(ev, ob)
                    }, cfg.timeout)
                }
            }
        };
        return this.on({
            "mouseenter.hoverIntent": handleHover,
            "mouseleave.hoverIntent": handleHover
        }, cfg.selector)
    }
})(jQuery);;
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
            var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

            /* if callbacks already set, store them */
            var _onBeforeShow = o.onBeforeShow,
                _onHide = o.onHide;

            $.extend($.fn.superfish.o[this.serial], {
                onBeforeShow: function () {
                    onBeforeShow.call(this); /* fire our Supposition callback */
                    _onBeforeShow.call(this); /* fire stored callbacks */
                },
                onHide: function () {
                    onHide.call(this); /* fire our Supposition callback */
                    _onHide.call(this); /* fire stored callbacks */
                }
            });
        });
    };
})(jQuery);;
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
/* Chosen v1.8.7 | (c) 2011-2018 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */

(function () {
    var t, e, s, i, n = function (t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        },
        r = function (t, e) {
            function s() {
                this.constructor = t
            }
            for (var i in e) o.call(e, i) && (t[i] = e[i]);
            return s.prototype = e.prototype, t.prototype = new s, t.__super__ = e.prototype, t
        },
        o = {}.hasOwnProperty;
    (i = function () {
        function t() {
            this.options_index = 0, this.parsed = []
        }
        return t.prototype.add_node = function (t) {
            return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
        }, t.prototype.add_group = function (t) {
            var e, s, i, n, r, o;
            for (e = this.parsed.length, this.parsed.push({
                    array_index: e,
                    group: !0,
                    label: t.label,
                    title: t.title ? t.title : void 0,
                    children: 0,
                    disabled: t.disabled,
                    classes: t.className
                }), o = [], s = 0, i = (r = t.childNodes).length; s < i; s++) n = r[s], o.push(this.add_option(n, e, t.disabled));
            return o
        }, t.prototype.add_option = function (t, e, s) {
            if ("OPTION" === t.nodeName.toUpperCase()) return "" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: t.value,
                text: t.text,
                html: t.innerHTML,
                title: t.title ? t.title : void 0,
                selected: t.selected,
                disabled: !0 === s ? s : t.disabled,
                group_array_index: e,
                group_label: null != e ? this.parsed[e].label : null,
                classes: t.className,
                style: t.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1
        }, t
    }()).select_to_array = function (t) {
        var e, s, n, r, o;
        for (r = new i, s = 0, n = (o = t.childNodes).length; s < n; s++) e = o[s], r.add_node(e);
        return r.parsed
    }, e = function () {
        function t(e, s) {
            this.form_field = e, this.options = null != s ? s : {}, this.label_click_handler = n(this.label_click_handler, this), t.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
        }
        return t.prototype.set_default_values = function () {
            return this.click_test_action = function (t) {
                return function (e) {
                    return t.test_active_click(e)
                }
            }(this), this.activate_action = function (t) {
                return function (e) {
                    return t.activate_field(e)
                }
            }(this), this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className), this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || Infinity, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1, this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY, this.case_sensitive_search = this.options.case_sensitive_search || !1, this.hide_results_on_select = null == this.options.hide_results_on_select || this.options.hide_results_on_select
        }, t.prototype.set_default_text = function () {
            return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || t.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || t.default_single_text, this.default_text = this.escape_html(this.default_text), this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || t.default_no_result_text
        }, t.prototype.choice_label = function (t) {
            return this.include_group_label_in_selected && null != t.group_label ? "<b class='group-name'>" + this.escape_html(t.group_label) + "</b>" + t.html : t.html
        }, t.prototype.mouse_enter = function () {
            return this.mouse_on_container = !0
        }, t.prototype.mouse_leave = function () {
            return this.mouse_on_container = !1
        }, t.prototype.input_focus = function (t) {
            if (this.is_multiple) {
                if (!this.active_field) return setTimeout(function (t) {
                    return function () {
                        return t.container_mousedown()
                    }
                }(this), 50)
            } else if (!this.active_field) return this.activate_field()
        }, t.prototype.input_blur = function (t) {
            if (!this.mouse_on_container) return this.active_field = !1, setTimeout(function (t) {
                return function () {
                    return t.blur_test()
                }
            }(this), 100)
        }, t.prototype.label_click_handler = function (t) {
            return this.is_multiple ? this.container_mousedown(t) : this.activate_field()
        }, t.prototype.results_option_build = function (t) {
            var e, s, i, n, r, o, h;
            for (e = "", h = 0, n = 0, r = (o = this.results_data).length; n < r && (s = o[n], i = "", "" !== (i = s.group ? this.result_add_group(s) : this.result_add_option(s)) && (h++, e += i), (null != t ? t.first : void 0) && (s.selected && this.is_multiple ? this.choice_build(s) : s.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(s))), !(h >= this.max_shown_results)); n++);
            return e
        }, t.prototype.result_add_option = function (t) {
            var e, s;
            return t.search_match && this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), s = document.createElement("li"), s.className = e.join(" "), t.style && (s.style.cssText = t.style), s.setAttribute("data-option-array-index", t.array_index), s.innerHTML = t.highlighted_html || t.html, t.title && (s.title = t.title), this.outerHTML(s)) : ""
        }, t.prototype.result_add_group = function (t) {
            var e, s;
            return (t.search_match || t.group_match) && t.active_options > 0 ? ((e = []).push("group-result"), t.classes && e.push(t.classes), s = document.createElement("li"), s.className = e.join(" "), s.innerHTML = t.highlighted_html || this.escape_html(t.label), t.title && (s.title = t.title), this.outerHTML(s)) : ""
        }, t.prototype.results_update_field = function () {
            if (this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing) return this.winnow_results()
        }, t.prototype.reset_single_select_options = function () {
            var t, e, s, i, n;
            for (n = [], t = 0, e = (s = this.results_data).length; t < e; t++)(i = s[t]).selected ? n.push(i.selected = !1) : n.push(void 0);
            return n
        }, t.prototype.results_toggle = function () {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, t.prototype.results_search = function (t) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, t.prototype.winnow_results = function (t) {
            var e, s, i, n, r, o, h, l, c, _, a, u, d, p, f;
            for (this.no_results_clear(), _ = 0, e = (h = this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), c = this.get_search_regex(e), i = 0, n = (l = this.results_data).length; i < n; i++)(r = l[i]).search_match = !1, a = null, u = null, r.highlighted_html = "", this.include_option_in_results(r) && (r.group && (r.group_match = !1, r.active_options = 0), null != r.group_array_index && this.results_data[r.group_array_index] && (0 === (a = this.results_data[r.group_array_index]).active_options && a.search_match && (_ += 1), a.active_options += 1), f = r.group ? r.label : r.text, r.group && !this.group_search || (u = this.search_string_match(f, c), r.search_match = null != u, r.search_match && !r.group && (_ += 1), r.search_match ? (h.length && (d = u.index, o = f.slice(0, d), s = f.slice(d, d + h.length), p = f.slice(d + h.length), r.highlighted_html = this.escape_html(o) + "<em>" + this.escape_html(s) + "</em>" + this.escape_html(p)), null != a && (a.group_match = !0)) : null != r.group_array_index && this.results_data[r.group_array_index].search_match && (r.search_match = !0)));
            return this.result_clear_highlight(), _ < 1 && h.length ? (this.update_results_content(""), this.no_results(h)) : (this.update_results_content(this.results_option_build()), (null != t ? t.skip_highlight : void 0) ? void 0 : this.winnow_results_set_highlight())
        }, t.prototype.get_search_regex = function (t) {
            var e, s;
            return s = this.search_contains ? t : "(^|\\s|\\b)" + t + "[^\\s]*", this.enable_split_word_search || this.search_contains || (s = "^" + s), e = this.case_sensitive_search ? "" : "i", new RegExp(s, e)
        }, t.prototype.search_string_match = function (t, e) {
            var s;
            return s = e.exec(t), !this.search_contains && (null != s ? s[1] : void 0) && (s.index += 1), s
        }, t.prototype.choices_count = function () {
            var t, e, s;
            if (null != this.selected_option_count) return this.selected_option_count;
            for (this.selected_option_count = 0, t = 0, e = (s = this.form_field.options).length; t < e; t++) s[t].selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }, t.prototype.choices_click = function (t) {
            if (t.preventDefault(), this.activate_field(), !this.results_showing && !this.is_disabled) return this.results_show()
        }, t.prototype.keydown_checker = function (t) {
            var e, s;
            switch (s = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), 8 !== s && this.pending_backstroke && this.clear_backstroke(), s) {
            case 8:
                this.backstroke_length = this.get_search_field_value().length;
                break;
            case 9:
                this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
                break;
            case 13:
            case 27:
                this.results_showing && t.preventDefault();
                break;
            case 32:
                this.disable_search && t.preventDefault();
                break;
            case 38:
                t.preventDefault(), this.keyup_arrow();
                break;
            case 40:
                t.preventDefault(), this.keydown_arrow()
            }
        }, t.prototype.keyup_checker = function (t) {
            var e, s;
            switch (s = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), s) {
            case 8:
                this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0 ? this.keydown_backstroke() : this.pending_backstroke || (this.result_clear_highlight(), this.results_search());
                break;
            case 13:
                t.preventDefault(), this.results_showing && this.result_select(t);
                break;
            case 27:
                this.results_showing && this.results_hide();
                break;
            case 9:
            case 16:
            case 17:
            case 18:
            case 38:
            case 40:
            case 91:
                break;
            default:
                this.results_search()
            }
        }, t.prototype.clipboard_event_checker = function (t) {
            if (!this.is_disabled) return setTimeout(function (t) {
                return function () {
                    return t.results_search()
                }
            }(this), 50)
        }, t.prototype.container_width = function () {
            return null != this.options.width ? this.options.width : this.form_field.offsetWidth + "px"
        }, t.prototype.include_option_in_results = function (t) {
            return !(this.is_multiple && !this.display_selected_options && t.selected) && (!(!this.display_disabled_options && t.disabled) && !t.empty)
        }, t.prototype.search_results_touchstart = function (t) {
            return this.touch_started = !0, this.search_results_mouseover(t)
        }, t.prototype.search_results_touchmove = function (t) {
            return this.touch_started = !1, this.search_results_mouseout(t)
        }, t.prototype.search_results_touchend = function (t) {
            if (this.touch_started) return this.search_results_mouseup(t)
        }, t.prototype.outerHTML = function (t) {
            var e;
            return t.outerHTML ? t.outerHTML : ((e = document.createElement("div")).appendChild(t), e.innerHTML)
        }, t.prototype.get_single_html = function () {
            return '<a class="chosen-single chosen-default">\n  <span>' + this.default_text + '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
        }, t.prototype.get_multi_html = function () {
            return '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' + this.default_text + '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
        }, t.prototype.get_no_results_html = function (t) {
            return '<li class="no-results">\n  ' + this.results_none_found + " <span>" + this.escape_html(t) + "</span>\n</li>"
        }, t.browser_is_supported = function () {
            return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : !(/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent))
        }, t.default_multiple_text = "Select Some Options", t.default_single_text = "Select an Option", t.default_no_result_text = "No results match", t
    }(), (t = jQuery).fn.extend({
        chosen: function (i) {
            return e.browser_is_supported() ? this.each(function (e) {
                var n, r;
                r = (n = t(this)).data("chosen"), "destroy" !== i ? r instanceof s || n.data("chosen", new s(this, i)) : r instanceof s && r.destroy()
            }) : this
        }
    }), s = function (s) {
        function n() {
            return n.__super__.constructor.apply(this, arguments)
        }
        return r(n, e), n.prototype.setup = function () {
            return this.form_field_jq = t(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex
        }, n.prototype.set_up_html = function () {
            var e, s;
            return (e = ["chosen-container"]).push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && e.push(this.form_field.className), this.is_rtl && e.push("chosen-rtl"), s = {
                "class": e.join(" "),
                title: this.form_field.title
            }, this.form_field.id.length && (s.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = t("<div />", s), this.container.width(this.container_width()), this.is_multiple ? this.container.html(this.get_multi_html()) : this.container.html(this.get_single_html()), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
        }, n.prototype.on_ready = function () {
            return this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            })
        }, n.prototype.register_observers = function () {
            return this.container.on("touchstart.chosen", function (t) {
                return function (e) {
                    t.container_mousedown(e)
                }
            }(this)), this.container.on("touchend.chosen", function (t) {
                return function (e) {
                    t.container_mouseup(e)
                }
            }(this)), this.container.on("mousedown.chosen", function (t) {
                return function (e) {
                    t.container_mousedown(e)
                }
            }(this)), this.container.on("mouseup.chosen", function (t) {
                return function (e) {
                    t.container_mouseup(e)
                }
            }(this)), this.container.on("mouseenter.chosen", function (t) {
                return function (e) {
                    t.mouse_enter(e)
                }
            }(this)), this.container.on("mouseleave.chosen", function (t) {
                return function (e) {
                    t.mouse_leave(e)
                }
            }(this)), this.search_results.on("mouseup.chosen", function (t) {
                return function (e) {
                    t.search_results_mouseup(e)
                }
            }(this)), this.search_results.on("mouseover.chosen", function (t) {
                return function (e) {
                    t.search_results_mouseover(e)
                }
            }(this)), this.search_results.on("mouseout.chosen", function (t) {
                return function (e) {
                    t.search_results_mouseout(e)
                }
            }(this)), this.search_results.on("mousewheel.chosen DOMMouseScroll.chosen", function (t) {
                return function (e) {
                    t.search_results_mousewheel(e)
                }
            }(this)), this.search_results.on("touchstart.chosen", function (t) {
                return function (e) {
                    t.search_results_touchstart(e)
                }
            }(this)), this.search_results.on("touchmove.chosen", function (t) {
                return function (e) {
                    t.search_results_touchmove(e)
                }
            }(this)), this.search_results.on("touchend.chosen", function (t) {
                return function (e) {
                    t.search_results_touchend(e)
                }
            }(this)), this.form_field_jq.on("chosen:updated.chosen", function (t) {
                return function (e) {
                    t.results_update_field(e)
                }
            }(this)), this.form_field_jq.on("chosen:activate.chosen", function (t) {
                return function (e) {
                    t.activate_field(e)
                }
            }(this)), this.form_field_jq.on("chosen:open.chosen", function (t) {
                return function (e) {
                    t.container_mousedown(e)
                }
            }(this)), this.form_field_jq.on("chosen:close.chosen", function (t) {
                return function (e) {
                    t.close_field(e)
                }
            }(this)), this.search_field.on("blur.chosen", function (t) {
                return function (e) {
                    t.input_blur(e)
                }
            }(this)), this.search_field.on("keyup.chosen", function (t) {
                return function (e) {
                    t.keyup_checker(e)
                }
            }(this)), this.search_field.on("keydown.chosen", function (t) {
                return function (e) {
                    t.keydown_checker(e)
                }
            }(this)), this.search_field.on("focus.chosen", function (t) {
                return function (e) {
                    t.input_focus(e)
                }
            }(this)), this.search_field.on("cut.chosen", function (t) {
                return function (e) {
                    t.clipboard_event_checker(e)
                }
            }(this)), this.search_field.on("paste.chosen", function (t) {
                return function (e) {
                    t.clipboard_event_checker(e)
                }
            }(this)), this.is_multiple ? this.search_choices.on("click.chosen", function (t) {
                return function (e) {
                    t.choices_click(e)
                }
            }(this)) : this.container.on("click.chosen", function (t) {
                t.preventDefault()
            })
        }, n.prototype.destroy = function () {
            return t(this.container[0].ownerDocument).off("click.chosen", this.click_test_action), this.form_field_label.length > 0 && this.form_field_label.off("click.chosen"), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, n.prototype.search_field_disabled = function () {
            return this.is_disabled = this.form_field.disabled || this.form_field_jq.parents("fieldset").is(":disabled"), this.container.toggleClass("chosen-disabled", this.is_disabled), this.search_field[0].disabled = this.is_disabled, this.is_multiple || this.selected_item.off("focus.chosen", this.activate_field), this.is_disabled ? this.close_field() : this.is_multiple ? void 0 : this.selected_item.on("focus.chosen", this.activate_field)
        }, n.prototype.container_mousedown = function (e) {
            var s;
            if (!this.is_disabled) return !e || "mousedown" !== (s = e.type) && "touchstart" !== s || this.results_showing || e.preventDefault(), null != e && t(e.target).hasClass("search-choice-close") ? void 0 : (this.active_field ? this.is_multiple || !e || t(e.target)[0] !== this.selected_item[0] && !t(e.target).parents("a.chosen-single").length || (e.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), t(this.container[0].ownerDocument).on("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        }, n.prototype.container_mouseup = function (t) {
            if ("ABBR" === t.target.nodeName && !this.is_disabled) return this.results_reset(t)
        }, n.prototype.search_results_mousewheel = function (t) {
            var e;
            if (t.originalEvent && (e = t.originalEvent.deltaY || -t.originalEvent.wheelDelta || t.originalEvent.detail), null != e) return t.preventDefault(), "DOMMouseScroll" === t.type && (e *= 40), this.search_results.scrollTop(e + this.search_results.scrollTop())
        }, n.prototype.blur_test = function (t) {
            if (!this.active_field && this.container.hasClass("chosen-container-active")) return this.close_field()
        }, n.prototype.close_field = function () {
            return t(this.container[0].ownerDocument).off("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale(), this.search_field.blur()
        }, n.prototype.activate_field = function () {
            if (!this.is_disabled) return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, n.prototype.test_active_click = function (e) {
            var s;
            return (s = t(e.target).closest(".chosen-container")).length && this.container[0] === s[0] ? this.active_field = !0 : this.close_field()
        }, n.prototype.results_build = function () {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = i.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
                first: !0
            })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, n.prototype.result_do_highlight = function (t) {
            var e, s, i, n, r;
            if (t.length) {
                if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), i = parseInt(this.search_results.css("maxHeight"), 10), r = this.search_results.scrollTop(), n = i + r, s = this.result_highlight.position().top + this.search_results.scrollTop(), (e = s + this.result_highlight.outerHeight()) >= n) return this.search_results.scrollTop(e - i > 0 ? e - i : 0);
                if (s < r) return this.search_results.scrollTop(s)
            }
        }, n.prototype.result_clear_highlight = function () {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, n.prototype.results_show = function () {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.get_search_field_value()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            }))
        }, n.prototype.update_results_content = function (t) {
            return this.search_results.html(t)
        }, n.prototype.results_hide = function () {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
                chosen: this
            })), this.results_showing = !1
        }, n.prototype.set_tab_index = function (t) {
            var e;
            if (this.form_field.tabIndex) return e = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = e
        }, n.prototype.set_label_behavior = function () {
            if (this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = t("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0) return this.form_field_label.on("click.chosen", this.label_click_handler)
        }, n.prototype.show_search_field_default = function () {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, n.prototype.search_results_mouseup = function (e) {
            var s;
            if ((s = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first()).length) return this.result_highlight = s, this.result_select(e), this.search_field.focus()
        }, n.prototype.search_results_mouseover = function (e) {
            var s;
            if (s = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first()) return this.result_do_highlight(s)
        }, n.prototype.search_results_mouseout = function (e) {
            if (t(e.target).hasClass("active-result") || t(e.target).parents(".active-result").first()) return this.result_clear_highlight()
        }, n.prototype.choice_build = function (e) {
            var s, i;
            return s = t("<li />", {
                "class": "search-choice"
            }).html("<span>" + this.choice_label(e) + "</span>"), e.disabled ? s.addClass("search-choice-disabled") : ((i = t("<a />", {
                "class": "search-choice-close",
                "data-option-array-index": e.array_index
            })).on("click.chosen", function (t) {
                return function (e) {
                    return t.choice_destroy_link_click(e)
                }
            }(this)), s.append(i)), this.search_container.before(s)
        }, n.prototype.choice_destroy_link_click = function (e) {
            if (e.preventDefault(), e.stopPropagation(), !this.is_disabled) return this.choice_destroy(t(e.target))
        }, n.prototype.choice_destroy = function (t) {
            if (this.result_deselect(t[0].getAttribute("data-option-array-index"))) return this.active_field ? this.search_field.focus() : this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()
        }, n.prototype.results_reset = function () {
            if (this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.trigger_form_field_change(), this.active_field) return this.results_hide()
        }, n.prototype.results_reset_cleanup = function () {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, n.prototype.result_select = function (t) {
            var e, s;
            if (this.result_highlight) return e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.is_multiple ? e.removeClass("active-result") : this.reset_single_select_options(), e.addClass("result-selected"), s = this.results_data[e[0].getAttribute("data-option-array-index")], s.selected = !0, this.form_field.options[s.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(s) : this.single_set_selected_text(this.choice_label(s)), this.is_multiple && (!this.hide_results_on_select || t.metaKey || t.ctrlKey) ? t.metaKey || t.ctrlKey ? this.winnow_results({
                skip_highlight: !0
            }) : (this.search_field.val(""), this.winnow_results()) : (this.results_hide(), this.show_search_field_default()), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.trigger_form_field_change({
                selected: this.form_field.options[s.options_index].value
            }), this.current_selectedIndex = this.form_field.selectedIndex, t.preventDefault(), this.search_field_scale())
        }, n.prototype.single_set_selected_text = function (t) {
            return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(t)
        }, n.prototype.result_deselect = function (t) {
            var e;
            return e = this.results_data[t], !this.form_field.options[e.options_index].disabled && (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.trigger_form_field_change({
                deselected: this.form_field.options[e.options_index].value
            }), this.search_field_scale(), !0)
        }, n.prototype.single_deselect_control_build = function () {
            if (this.allow_single_deselect) return this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")
        }, n.prototype.get_search_field_value = function () {
            return this.search_field.val()
        }, n.prototype.get_search_text = function () {
            return t.trim(this.get_search_field_value())
        }, n.prototype.escape_html = function (e) {
            return t("<div/>").text(e).html()
        }, n.prototype.winnow_results_set_highlight = function () {
            var t, e;
            if (e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), null != (t = e.length ? e.first() : this.search_results.find(".active-result").first())) return this.result_do_highlight(t)
        }, n.prototype.no_results = function (t) {
            var e;
            return e = this.get_no_results_html(t), this.search_results.append(e), this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            })
        }, n.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove()
        }, n.prototype.keydown_arrow = function () {
            var t;
            return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
        }, n.prototype.keyup_arrow = function () {
            var t;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result")).length ? this.result_do_highlight(t.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight()) : void 0 : this.results_show()
        }, n.prototype.keydown_backstroke = function () {
            var t;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last()).length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0
        }, n.prototype.clear_backstroke = function () {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, n.prototype.search_field_scale = function () {
            var e, s, i, n, r, o, h;
            if (this.is_multiple) {
                for (r = {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px",
                        display: "none",
                        whiteSpace: "pre"
                    }, s = 0, i = (o = ["fontSize", "fontStyle", "fontWeight", "fontFamily", "lineHeight", "textTransform", "letterSpacing"]).length; s < i; s++) r[n = o[s]] = this.search_field.css(n);
                return (e = t("<div />").css(r)).text(this.get_search_field_value()), t("body").append(e), h = e.width() + 25, e.remove(), this.container.is(":visible") && (h = Math.min(this.container.outerWidth() - 10, h)), this.search_field.width(h)
            }
        }, n.prototype.trigger_form_field_change = function (t) {
            return this.form_field_jq.trigger("input", t), this.form_field_jq.trigger("change", t)
        }, n
    }()
}).call(this);;
/**
 * @file
 * Attaches behaviors for the Chosen module.
 */

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

        var ret = select.oldChosen(options);

        // only act if the select has display: none, otherwise chosen is unsupported (iPhone, etc)
        if (is_creating_chosen && select.css('display') === 'none') {
            // https://github.com/harvesthq/chosen/issues/515#issuecomment-33214050
            // only do this if we are initializing chosen (no params, or object params) not calling a method
            select.attr('style', 'display:visible; position:absolute; width:0px; height: 0px; clip:rect(0,0,0,0)');
            select.attr('tabindex', -1);
        }
        return ret;
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

})(jQuery, Drupal, drupalSettings);;
/**
 * Minified by jsDelivr using UglifyJS v3.0.24.
 * Original file: /npm/multiple-select@1.2.1/multiple-select.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
! function (e) {
    "use strict";

    function u(u, s) {
        var i = this,
            l = u.attr("name") || s.name || "";
        this.options = s, this.$el = u.hide(), this.$label = this.$el.closest("label"), 0 === this.$label.length && this.$el.attr("id") && (this.$label = e(t('label[for="%s"]', this.$el.attr("id").replace(/:/g, "\\:")))), this.$parent = e(t('<div class="ms-parent %s" %s/>', u.attr("class") || "", t('title="%s"', u.attr("title")))), this.$choice = e(t(['<button type="button" class="ms-choice">', '<span class="placeholder">%s</span>', "<div></div>", "</button>"].join(""), this.options.placeholder)), this.$drop = e(t('<div class="ms-drop %s"%s></div>', this.options.position, t(' style="width: %s"', this.options.dropWidth))), this.$el.after(this.$parent), this.$parent.append(this.$choice), this.$parent.append(this.$drop), this.$el.prop("disabled") && this.$choice.addClass("disabled"), this.$parent.css("width", this.options.width || this.$el.css("width") || this.$el.outerWidth() + 20), this.selectAllName = 'data-name="selectAll' + l + '"', this.selectGroupName = 'data-name="selectGroup' + l + '"', this.selectItemName = 'data-name="selectItem' + l + '"', this.options.keepOpen || e(document).click(function (t) {
            e(t.target)[0] !== i.$choice[0] && e(t.target).parents(".ms-choice")[0] !== i.$choice[0] && (e(t.target)[0] === i.$drop[0] || e(t.target).parents(".ms-drop")[0] !== i.$drop[0] && t.target !== u[0]) && i.options.isOpen && i.close()
        })
    }
    var t = function (e) {
            var u = arguments,
                t = !0,
                s = 1;
            return e = e.replace(/%s/g, function () {
                var e = u[s++];
                return void 0 === e ? (t = !1, "") : e
            }), t ? e : ""
        },
        s = function (e) {
            for (var u = [{
                    base: "A",
                    letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
                }, {
                    base: "AA",
                    letters: /[\uA732]/g
                }, {
                    base: "AE",
                    letters: /[\u00C6\u01FC\u01E2]/g
                }, {
                    base: "AO",
                    letters: /[\uA734]/g
                }, {
                    base: "AU",
                    letters: /[\uA736]/g
                }, {
                    base: "AV",
                    letters: /[\uA738\uA73A]/g
                }, {
                    base: "AY",
                    letters: /[\uA73C]/g
                }, {
                    base: "B",
                    letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
                }, {
                    base: "C",
                    letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
                }, {
                    base: "D",
                    letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
                }, {
                    base: "DZ",
                    letters: /[\u01F1\u01C4]/g
                }, {
                    base: "Dz",
                    letters: /[\u01F2\u01C5]/g
                }, {
                    base: "E",
                    letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
                }, {
                    base: "F",
                    letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
                }, {
                    base: "G",
                    letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
                }, {
                    base: "H",
                    letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
                }, {
                    base: "I",
                    letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
                }, {
                    base: "J",
                    letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
                }, {
                    base: "K",
                    letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
                }, {
                    base: "L",
                    letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
                }, {
                    base: "LJ",
                    letters: /[\u01C7]/g
                }, {
                    base: "Lj",
                    letters: /[\u01C8]/g
                }, {
                    base: "M",
                    letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
                }, {
                    base: "N",
                    letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
                }, {
                    base: "NJ",
                    letters: /[\u01CA]/g
                }, {
                    base: "Nj",
                    letters: /[\u01CB]/g
                }, {
                    base: "O",
                    letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
                }, {
                    base: "OI",
                    letters: /[\u01A2]/g
                }, {
                    base: "OO",
                    letters: /[\uA74E]/g
                }, {
                    base: "OU",
                    letters: /[\u0222]/g
                }, {
                    base: "P",
                    letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
                }, {
                    base: "Q",
                    letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
                }, {
                    base: "R",
                    letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
                }, {
                    base: "S",
                    letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
                }, {
                    base: "T",
                    letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
                }, {
                    base: "TZ",
                    letters: /[\uA728]/g
                }, {
                    base: "U",
                    letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
                }, {
                    base: "V",
                    letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
                }, {
                    base: "VY",
                    letters: /[\uA760]/g
                }, {
                    base: "W",
                    letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
                }, {
                    base: "X",
                    letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
                }, {
                    base: "Y",
                    letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
                }, {
                    base: "Z",
                    letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
                }, {
                    base: "a",
                    letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
                }, {
                    base: "aa",
                    letters: /[\uA733]/g
                }, {
                    base: "ae",
                    letters: /[\u00E6\u01FD\u01E3]/g
                }, {
                    base: "ao",
                    letters: /[\uA735]/g
                }, {
                    base: "au",
                    letters: /[\uA737]/g
                }, {
                    base: "av",
                    letters: /[\uA739\uA73B]/g
                }, {
                    base: "ay",
                    letters: /[\uA73D]/g
                }, {
                    base: "b",
                    letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
                }, {
                    base: "c",
                    letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
                }, {
                    base: "d",
                    letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
                }, {
                    base: "dz",
                    letters: /[\u01F3\u01C6]/g
                }, {
                    base: "e",
                    letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
                }, {
                    base: "f",
                    letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
                }, {
                    base: "g",
                    letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
                }, {
                    base: "h",
                    letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
                }, {
                    base: "hv",
                    letters: /[\u0195]/g
                }, {
                    base: "i",
                    letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
                }, {
                    base: "j",
                    letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
                }, {
                    base: "k",
                    letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
                }, {
                    base: "l",
                    letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
                }, {
                    base: "lj",
                    letters: /[\u01C9]/g
                }, {
                    base: "m",
                    letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
                }, {
                    base: "n",
                    letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
                }, {
                    base: "nj",
                    letters: /[\u01CC]/g
                }, {
                    base: "o",
                    letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
                }, {
                    base: "oi",
                    letters: /[\u01A3]/g
                }, {
                    base: "ou",
                    letters: /[\u0223]/g
                }, {
                    base: "oo",
                    letters: /[\uA74F]/g
                }, {
                    base: "p",
                    letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
                }, {
                    base: "q",
                    letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
                }, {
                    base: "r",
                    letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
                }, {
                    base: "s",
                    letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
                }, {
                    base: "t",
                    letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
                }, {
                    base: "tz",
                    letters: /[\uA729]/g
                }, {
                    base: "u",
                    letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
                }, {
                    base: "v",
                    letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
                }, {
                    base: "vy",
                    letters: /[\uA761]/g
                }, {
                    base: "w",
                    letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
                }, {
                    base: "x",
                    letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
                }, {
                    base: "y",
                    letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
                }, {
                    base: "z",
                    letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
                }], t = 0; t < u.length; t++) e = e.replace(u[t].letters, u[t].base);
            return e
        };
    u.prototype = {
        constructor: u,
        init: function () {
            var u = this,
                s = e("<ul></ul>");
            this.$drop.html(""), this.options.filter && this.$drop.append(['<div class="ms-search">', '<input type="text" autocomplete="off" autocorrect="off" autocapitilize="off" spellcheck="false">', "</div>"].join("")), this.options.selectAll && !this.options.single && s.append(['<li class="ms-select-all">', "<label>", t('<input type="checkbox" %s /> ', this.selectAllName), this.options.selectAllDelimiter[0], this.options.selectAllText, this.options.selectAllDelimiter[1], "</label>", "</li>"].join("")), e.each(this.$el.children(), function (e, t) {
                s.append(u.optionToHtml(e, t))
            }), s.append(t('<li class="ms-no-results">%s</li>', this.options.noMatchesFound)), this.$drop.append(s), this.$drop.find("ul").css("max-height", this.options.maxHeight + "px"), this.$drop.find(".multiple").css("width", this.options.multipleWidth + "px"), this.$searchInput = this.$drop.find(".ms-search input"), this.$selectAll = this.$drop.find("input[" + this.selectAllName + "]"), this.$selectGroups = this.$drop.find("input[" + this.selectGroupName + "]"), this.$selectItems = this.$drop.find("input[" + this.selectItemName + "]:enabled"), this.$disableItems = this.$drop.find("input[" + this.selectItemName + "]:disabled"), this.$noResults = this.$drop.find(".ms-no-results"), this.events(), this.updateSelectAll(!0), this.update(!0), this.options.isOpen && this.open()
        },
        optionToHtml: function (u, s, i, l) {
            var o, n = this,
                a = e(s),
                c = a.attr("class") || "",
                h = t('title="%s"', a.attr("title")),
                r = this.options.multiple ? "multiple" : "",
                p = this.options.single ? "radio" : "checkbox";
            if (a.is("option")) {
                var E, d = a.val(),
                    A = n.options.textTemplate(a),
                    F = a.prop("selected"),
                    f = t('style="%s"', this.options.styler(d));
                return o = l || a.prop("disabled"), (E = e([t('<li class="%s %s" %s %s>', r, c, h, f), t('<label class="%s">', o ? "disabled" : ""), t('<input type="%s" %s%s%s%s>', p, this.selectItemName, F ? ' checked="checked"' : "", o ? ' disabled="disabled"' : "", t(' data-group="%s"', i)), t("<span>%s</span>", A), "</label>", "</li>"].join(""))).find("input").val(d), E
            }
            if (a.is("optgroup")) {
                var g = n.options.labelTemplate(a),
                    C = e("<div/>");
                return i = "group_" + u, o = a.prop("disabled"), C.append(['<li class="group">', t('<label class="optgroup %s" data-group="%s">', o ? "disabled" : "", i), this.options.hideOptgroupCheckboxes || this.options.single ? "" : t('<input type="checkbox" %s %s>', this.selectGroupName, o ? 'disabled="disabled"' : ""), g, "</label>", "</li>"].join("")), e.each(a.children(), function (e, u) {
                    C.append(n.optionToHtml(e, u, i, o))
                }), C.html()
            }
        },
        events: function () {
            var u = this,
                s = function (e) {
                    e.preventDefault(), u[u.options.isOpen ? "close" : "open"]()
                };
            this.$label && this.$label.off("click").on("click", function (e) {
                "label" === e.target.nodeName.toLowerCase() && e.target === this && (s(e), u.options.filter && u.options.isOpen || u.focus(), e.stopPropagation())
            }), this.$choice.off("click").on("click", s).off("focus").on("focus", this.options.onFocus).off("blur").on("blur", this.options.onBlur), this.$parent.off("keydown").on("keydown", function (e) {
                switch (e.which) {
                case 27:
                    u.close(), u.$choice.focus()
                }
            }), this.$searchInput.off("keydown").on("keydown", function (e) {
                9 === e.keyCode && e.shiftKey && u.close()
            }).off("keyup").on("keyup", function (e) {
                if (u.options.filterAcceptOnEnter && (13 === e.which || 32 == e.which) && u.$searchInput.val()) return u.$selectAll.click(), u.close(), void u.focus();
                u.filter()
            }), this.$selectAll.off("click").on("click", function () {
                var t = e(this).prop("checked"),
                    s = u.$selectItems.filter(":visible");
                s.length === u.$selectItems.length ? u[t ? "checkAll" : "uncheckAll"]() : (u.$selectGroups.prop("checked", t), s.prop("checked", t), u.options[t ? "onCheckAll" : "onUncheckAll"](), u.update())
            }), this.$selectGroups.off("click").on("click", function () {
                var s = e(this).parent().attr("data-group"),
                    i = u.$selectItems.filter(":visible").filter(t('[data-group="%s"]', s)),
                    l = i.length !== i.filter(":checked").length;
                i.prop("checked", l), u.updateSelectAll(), u.update(), u.options.onOptgroupClick({
                    label: e(this).parent().text(),
                    checked: l,
                    children: i.get(),
                    instance: u
                })
            }), this.$selectItems.off("click").on("click", function () {
                if (u.updateSelectAll(), u.update(), u.updateOptGroupSelect(), u.options.onClick({
                        label: e(this).parent().text(),
                        value: e(this).val(),
                        checked: e(this).prop("checked"),
                        instance: u
                    }), u.options.single && u.options.isOpen && !u.options.keepOpen && u.close(), u.options.single) {
                    var t = e(this).val();
                    u.$selectItems.filter(function () {
                        return e(this).val() !== t
                    }).each(function () {
                        e(this).prop("checked", !1)
                    }), u.update()
                }
            })
        },
        open: function () {
            if (!this.$choice.hasClass("disabled")) {
                if (this.options.isOpen = !0, this.$choice.find(">div").addClass("open"), this.$drop[this.animateMethod("show")](), this.$selectAll.parent().show(), this.$noResults.hide(), this.$el.children().length || (this.$selectAll.parent().hide(), this.$noResults.show()), this.options.container) {
                    var u = this.$drop.offset();
                    this.$drop.appendTo(e(this.options.container)), this.$drop.offset({
                        top: u.top,
                        left: u.left
                    })
                }
                this.options.filter && (this.$searchInput.val(""), this.$searchInput.focus(), this.filter()), this.options.onOpen()
            }
        },
        close: function () {
            this.options.isOpen = !1, this.$choice.find(">div").removeClass("open"), this.$drop[this.animateMethod("hide")](), this.options.container && (this.$parent.append(this.$drop), this.$drop.css({
                top: "auto",
                left: "auto"
            })), this.options.onClose()
        },
        animateMethod: function (e) {
            return {
                show: {
                    fade: "fadeIn",
                    slide: "slideDown"
                },
                hide: {
                    fade: "fadeOut",
                    slide: "slideUp"
                }
            } [e][this.options.animate] || e
        },
        update: function (u) {
            var t = this.options.displayValues ? this.getSelects() : this.getSelects("text"),
                s = this.$choice.find(">span"),
                i = t.length;
            0 === i ? s.addClass("placeholder").html(this.options.placeholder) : this.options.allSelected && i === this.$selectItems.length + this.$disableItems.length ? s.removeClass("placeholder").html(this.options.allSelected) : this.options.ellipsis && i > this.options.minimumCountSelected ? s.removeClass("placeholder").text(t.slice(0, this.options.minimumCountSelected).join(this.options.delimiter) + "...") : this.options.countSelected && i > this.options.minimumCountSelected ? s.removeClass("placeholder").html(this.options.countSelected.replace("#", t.length).replace("%", this.$selectItems.length + this.$disableItems.length)) : s.removeClass("placeholder").text(t.join(this.options.delimiter)), this.options.addTitle && s.prop("title", this.getSelects("text")), this.$el.val(this.getSelects()).trigger("change"), this.$drop.find("li").removeClass("selected"), this.$drop.find("input:checked").each(function () {
                e(this).parents("li").first().addClass("selected")
            }), u || this.$el.trigger("change")
        },
        updateSelectAll: function (e) {
            var u = this.$selectItems;
            e || (u = u.filter(":visible")), this.$selectAll.prop("checked", u.length && u.length === u.filter(":checked").length), !e && this.$selectAll.prop("checked") && this.options.onCheckAll()
        },
        updateOptGroupSelect: function () {
            var u = this.$selectItems.filter(":visible");
            e.each(this.$selectGroups, function (s, i) {
                var l = e(i).parent().attr("data-group"),
                    o = u.filter(t('[data-group="%s"]', l));
                e(i).prop("checked", o.length && o.length === o.filter(":checked").length)
            })
        },
        getSelects: function (u) {
            var s = this,
                i = [],
                l = [];
            return this.$drop.find(t("input[%s]:checked", this.selectItemName)).each(function () {
                i.push(e(this).parents("li").first().text()), l.push(e(this).val())
            }), "text" === u && this.$selectGroups.length && (i = [], this.$selectGroups.each(function () {
                var u = [],
                    l = e.trim(e(this).parent().text()),
                    o = e(this).parent().data("group"),
                    n = s.$drop.find(t('[%s][data-group="%s"]', s.selectItemName, o)),
                    a = n.filter(":checked");
                if (a.length) {
                    if (u.push("["), u.push(l), n.length > a.length) {
                        var c = [];
                        a.each(function () {
                            c.push(e(this).parent().text())
                        }), u.push(": " + c.join(", "))
                    }
                    u.push("]"), i.push(u.join(""))
                }
            })), "text" === u ? i : l
        },
        setSelects: function (u) {
            var s = this;
            this.$selectItems.prop("checked", !1), this.$disableItems.prop("checked", !1), e.each(u, function (e, u) {
                s.$selectItems.filter(t('[value="%s"]', u)).prop("checked", !0), s.$disableItems.filter(t('[value="%s"]', u)).prop("checked", !0)
            }), this.$selectAll.prop("checked", this.$selectItems.length === this.$selectItems.filter(":checked").length + this.$disableItems.filter(":checked").length), e.each(s.$selectGroups, function (u, t) {
                var i = e(t).parent().attr("data-group"),
                    l = s.$selectItems.filter('[data-group="' + i + '"]');
                e(t).prop("checked", l.length && l.length === l.filter(":checked").length)
            }), this.update()
        },
        enable: function () {
            this.$choice.removeClass("disabled")
        },
        disable: function () {
            this.$choice.addClass("disabled")
        },
        checkAll: function () {
            this.$selectItems.prop("checked", !0), this.$selectGroups.prop("checked", !0), this.$selectAll.prop("checked", !0), this.update(), this.options.onCheckAll()
        },
        uncheckAll: function () {
            this.$selectItems.prop("checked", !1), this.$selectGroups.prop("checked", !1), this.$selectAll.prop("checked", !1), this.update(), this.options.onUncheckAll()
        },
        focus: function () {
            this.$choice.focus(), this.options.onFocus()
        },
        blur: function () {
            this.$choice.blur(), this.options.onBlur()
        },
        refresh: function () {
            this.init()
        },
        filter: function () {
            var u = this,
                i = e.trim(this.$searchInput.val()).toLowerCase();
            0 === i.length ? (this.$selectAll.parent().show(), this.$selectItems.parent().show(), this.$disableItems.parent().show(), this.$selectGroups.parent().show(), this.$noResults.hide()) : (this.$selectItems.each(function () {
                var u = e(this).parent();
                u[s(u.text().toLowerCase()).indexOf(s(i)) < 0 ? "hide" : "show"]()
            }), this.$disableItems.parent().hide(), this.$selectGroups.each(function () {
                var s = e(this).parent(),
                    i = s.attr("data-group");
                s[u.$selectItems.filter(":visible").filter(t('[data-group="%s"]', i)).length ? "show" : "hide"]()
            }), this.$selectItems.parent().filter(":visible").length ? (this.$selectAll.parent().show(), this.$noResults.hide()) : (this.$selectAll.parent().hide(), this.$noResults.show())), this.updateOptGroupSelect(), this.updateSelectAll(), this.options.onFilter(i)
        }
    }, e.fn.multipleSelect = function () {
        var t, s = arguments[0],
            i = arguments,
            l = ["getSelects", "setSelects", "enable", "disable", "open", "close", "checkAll", "uncheckAll", "focus", "blur", "refresh", "close"];
        return this.each(function () {
            var o = e(this),
                n = o.data("multipleSelect"),
                a = e.extend({}, e.fn.multipleSelect.defaults, o.data(), "object" == typeof s && s);
            if (n || (n = new u(o, a), o.data("multipleSelect", n)), "string" == typeof s) {
                if (e.inArray(s, l) < 0) throw "Unknown method: " + s;
                t = n[s](i[1])
            } else n.init(), i[1] && (t = n[i[1]].apply(n, [].slice.call(i, 2)))
        }), void 0 !== t ? t : this
    }, e.fn.multipleSelect.defaults = {
        name: "",
        isOpen: !1,
        placeholder: "",
        selectAll: !0,
        selectAllDelimiter: ["[", "]"],
        minimumCountSelected: 3,
        ellipsis: !1,
        multiple: !1,
        multipleWidth: 80,
        single: !1,
        filter: !1,
        width: void 0,
        dropWidth: void 0,
        maxHeight: 250,
        container: null,
        position: "bottom",
        keepOpen: !1,
        animate: "none",
        displayValues: !1,
        delimiter: ", ",
        addTitle: !1,
        filterAcceptOnEnter: !1,
        hideOptgroupCheckboxes: !1,
        selectAllText: "Select all",
        allSelected: "All selected",
        countSelected: "# of % selected",
        noMatchesFound: "No matches found",
        styler: function () {
            return !1
        },
        textTemplate: function (e) {
            return e.html()
        },
        labelTemplate: function (e) {
            return e.attr("label")
        },
        onOpen: function () {
            return !1
        },
        onClose: function () {
            return !1
        },
        onCheckAll: function () {
            return !1
        },
        onUncheckAll: function () {
            return !1
        },
        onFocus: function () {
            return !1
        },
        onBlur: function () {
            return !1
        },
        onOptgroupClick: function () {
            return !1
        },
        onClick: function () {
            return !1
        },
        onFilter: function () {
            return !1
        }
    }
}(jQuery);
