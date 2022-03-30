! function (t) {
    "use strict";
    var n = Element.prototype,
        e = NodeList.prototype,
        r = String.prototype;

    function o(t, e) {
        e = e || {
            bubbles: !1,
            cancelable: !1,
            detail: null
        };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
    }
    n.matches || (n.matches = n.msMatchesSelector || n.webkitMatchesSelector), n.closest || (n.closest = function (t) {
        var e = this;
        do {
            if (n.matches.call(e, t)) return e
        } while (null !== (e = e.parentElement || e.parentNode) && 1 === e.nodeType);
        return null
    }), t.NodeList && !e.forEach && (e.forEach = Array.prototype.forEach), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function (t, e) {
            if (null === t || "undefined" === t) throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(t), r = 1; r < arguments.length; r++) {
                var o = arguments[r];
                if (null !== o && "undefined" !== o)
                    for (var c in o) Object.prototype.hasOwnProperty.call(o, c) && (n[c] = o[c])
            }
            return n
        },
        writable: !0,
        configurable: !0
    }), r.startsWith || Object.defineProperty(r, "startsWith", {
        value: function (t, e) {
            e = 0 < e ? 0 | e : 0;
            return this.substring(e, e + t.length) === t
        }
    }), "function" != typeof t.CustomEvent && (o.prototype = t.Event.prototype, t.CustomEvent = o)
}(this);;

/**
 * @file
 * A promise-polyfill by @taylorhakes.
 *
 * License: MIT
 * @see https://github.com/taylorhakes/promise-polyfill
 */
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define(t) : t()
}(0, function () {
    "use strict";

    function e(e) {
        var t = this.constructor;
        return this.then(function (n) {
            return t.resolve(e()).then(function () {
                return n
            })
        }, function (n) {
            return t.resolve(e()).then(function () {
                return t.reject(n)
            })
        })
    }

    function t(e) {
        return new this(function (t, n) {
            function o(e, n) {
                if (n && ("object" == typeof n || "function" == typeof n)) {
                    var f = n.then;
                    if ("function" == typeof f) return void f.call(n, function (t) {
                        o(e, t)
                    }, function (n) {
                        r[e] = {
                            status: "rejected",
                            reason: n
                        }, 0 == --i && t(r)
                    })
                }
                r[e] = {
                    status: "fulfilled",
                    value: n
                }, 0 == --i && t(r)
            }
            if (!e || "undefined" == typeof e.length) return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var r = Array.prototype.slice.call(e);
            if (0 === r.length) return t([]);
            for (var i = r.length, f = 0; r.length > f; f++) o(f, r[f])
        })
    }

    function n(e) {
        return !(!e || "undefined" == typeof e.length)
    }

    function o() {}

    function r(e) {
        if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], l(e, this)
    }

    function i(e, t) {
        for (; 3 === e._state;) e = e._value;
        0 !== e._state ? (e._handled = !0, r._immediateFn(function () {
            var n = 1 === e._state ? t.onFulfilled : t.onRejected;
            if (null !== n) {
                var o;
                try {
                    o = n(e._value)
                } catch (r) {
                    return void u(t.promise, r)
                }
                f(t.promise, o)
            } else(1 === e._state ? f : u)(t.promise, e._value)
        })) : e._deferreds.push(t)
    }

    function f(e, t) {
        try {
            if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
                var n = t.then;
                if (t instanceof r) return e._state = 3, e._value = t, void c(e);
                if ("function" == typeof n) return void l(function (e, t) {
                    return function () {
                        e.apply(t, arguments)
                    }
                }(n, t), e)
            }
            e._state = 1, e._value = t, c(e)
        } catch (o) {
            u(e, o)
        }
    }

    function u(e, t) {
        e._state = 2, e._value = t, c(e)
    }

    function c(e) {
        2 === e._state && 0 === e._deferreds.length && r._immediateFn(function () {
            e._handled || r._unhandledRejectionFn(e._value)
        });
        for (var t = 0, n = e._deferreds.length; n > t; t++) i(e, e._deferreds[t]);
        e._deferreds = null
    }

    function l(e, t) {
        var n = !1;
        try {
            e(function (e) {
                n || (n = !0, f(t, e))
            }, function (e) {
                n || (n = !0, u(t, e))
            })
        } catch (o) {
            if (n) return;
            n = !0, u(t, o)
        }
    }
    var a = setTimeout,
        s = "undefined" != typeof setImmediate ? setImmediate : null;
    r.prototype["catch"] = function (e) {
        return this.then(null, e)
    }, r.prototype.then = function (e, t) {
        var n = new this.constructor(o);
        return i(this, new function (e, t, n) {
            this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
        }(e, t, n)), n
    }, r.prototype["finally"] = e, r.all = function (e) {
        return new r(function (t, o) {
            function r(e, n) {
                try {
                    if (n && ("object" == typeof n || "function" == typeof n)) {
                        var u = n.then;
                        if ("function" == typeof u) return void u.call(n, function (t) {
                            r(e, t)
                        }, o)
                    }
                    i[e] = n, 0 == --f && t(i)
                } catch (c) {
                    o(c)
                }
            }
            if (!n(e)) return o(new TypeError("Promise.all accepts an array"));
            var i = Array.prototype.slice.call(e);
            if (0 === i.length) return t([]);
            for (var f = i.length, u = 0; i.length > u; u++) r(u, i[u])
        })
    }, r.allSettled = t, r.resolve = function (e) {
        return e && "object" == typeof e && e.constructor === r ? e : new r(function (t) {
            t(e)
        })
    }, r.reject = function (e) {
        return new r(function (t, n) {
            n(e)
        })
    }, r.race = function (e) {
        return new r(function (t, o) {
            if (!n(e)) return o(new TypeError("Promise.race accepts an array"));
            for (var i = 0, f = e.length; f > i; i++) r.resolve(e[i]).then(t, o)
        })
    }, r._immediateFn = "function" == typeof s && function (e) {
        s(e)
    } || function (e) {
        a(e, 0)
    }, r._unhandledRejectionFn = function (e) {
        void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    };
    var d = function () {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw Error("unable to locate global object")
    }();
    "function" != typeof d.Promise ? d.Promise = r : (d.Promise.prototype["finally"] || (d.Promise.prototype["finally"] = e), d.Promise.allSettled || (d.Promise.allSettled = t))
});;
/**
 * @file
 * A requestAnimationFrame polyfill.
 *
 * by Erik Möller. fixes from Paul Irish and Tino Zijdel.
 * MIT license
 *
 * @see https://gist.github.com/paulirish/1579671
 */
! function (m) {
    for (var o = 0, n = ["ms", "moz", "webkit", "o"], e = 0; e < n.length && !m.requestAnimationFrame; ++e) m.requestAnimationFrame = window[n[e] + "RequestAnimationFrame"], m.cancelAnimationFrame = window[n[e] + "CancelAnimationFrame"] || window[n[e] + "CancelRequestAnimationFrame"];
    m.requestAnimationFrame || (m.requestAnimationFrame = function (n, e) {
        var i = (new Date).getTime(),
            a = Math.max(0, 16 - (i - o)),
            t = m.setTimeout(function () {
                n(i + a)
            }, a);
        return o = i + a, t
    }), m.cancelAnimationFrame || (m.cancelAnimationFrame = function (n) {
        clearTimeout(n)
    })
}(this);;
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once = function () {
    "use strict";
    var n = /[\11\12\14\15\40]+/,
        e = "data-once",
        t = document;

    function r(n, t, r) {
        return n[t + "Attribute"](e, r)
    }

    function o(e) {
        if ("string" != typeof e) throw new TypeError("once ID must be a string");
        if ("" === e || n.test(e)) throw new RangeError("once ID must not be empty or contain spaces");
        return '[data-once~="' + e + '"]'
    }

    function u(n) {
        if (!(n instanceof Element)) throw new TypeError("The element must be an instance of Element");
        return !0
    }

    function i(n, e) {
        void 0 === e && (e = t);
        var r = n;
        if (null === n) r = [];
        else {
            if (!n) throw new TypeError("Selector must not be empty");
            "string" != typeof n || e !== t && !u(e) ? n instanceof Element && (r = [n]) : r = e.querySelectorAll(n)
        }
        return Array.prototype.slice.call(r)
    }

    function c(n, e, t) {
        return e.filter((function (e) {
            var r = u(e) && e.matches(n);
            return r && t && t(e), r
        }))
    }

    function f(e, t) {
        var o = t.add,
            u = t.remove,
            i = [];
        r(e, "has") && r(e, "get").trim().split(n).forEach((function (n) {
            i.indexOf(n) < 0 && n !== u && i.push(n)
        })), o && i.push(o);
        var c = i.join(" ");
        r(e, "" === c ? "remove" : "set", c)
    }

    function a(n, e, t) {
        return c(":not(" + o(n) + ")", i(e, t), (function (e) {
            return f(e, {
                add: n
            })
        }))
    }
    return a.remove = function (n, e, t) {
        return c(o(n), i(e, t), (function (e) {
            return f(e, {
                remove: n
            })
        }))
    }, a.filter = function (n, e, t) {
        return c(o(n), i(e, t))
    }, a.find = function (n, e) {
        return i(n ? o(n) : "[data-once]", e)
    }, a
}();

;
/*!
 * jQuery Once v2.2.3 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function (e) {
    "use strict";
    if (typeof exports === "object" && typeof exports.nodeName !== "string") {
        e(require("jquery"))
    } else if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
})(function (t) {
    "use strict";
    var r = function (e) {
        e = e || "once";
        if (typeof e !== "string") {
            throw new TypeError("The jQuery Once id parameter must be a string")
        }
        return e
    };
    t.fn.once = function (e) {
        var n = "jquery-once-" + r(e);
        return this.filter(function () {
            return t(this).data(n) !== true
        }).data(n, true)
    };
    t.fn.removeOnce = function (e) {
        return this.findOnce(e).removeData("jquery-once-" + r(e))
    };
    t.fn.findOnce = function (e) {
        var n = "jquery-once-" + r(e);
        return this.filter(function () {
            return t(this).data(n) === true
        })
    }
});

/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function () {
    var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
    window.drupalSettings = {};

    if (settingsElement !== null) {
        window.drupalSettings = JSON.parse(settingsElement.textContent);
    }
})();;
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

window.Drupal = {
    behaviors: {},
    locale: {}
};

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

    Drupal.checkPlain = function (str) {
        str = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return str;
    };

    Drupal.formatString = function (str, args) {
        var processedArgs = {};
        Object.keys(args || {}).forEach(function (key) {
            switch (key.charAt(0)) {
            case '@':
                processedArgs[key] = Drupal.checkPlain(args[key]);
                break;

            case '!':
                processedArgs[key] = args[key];
                break;

            default:
                processedArgs[key] = Drupal.theme('placeholder', args[key]);
                break;
            }
        });
        return Drupal.stringReplace(str, processedArgs, null);
    };

    Drupal.stringReplace = function (str, args, keys) {
        if (str.length === 0) {
            return str;
        }

        if (!Array.isArray(keys)) {
            keys = Object.keys(args || {});
            keys.sort(function (a, b) {
                return a.length - b.length;
            });
        }

        if (keys.length === 0) {
            return str;
        }

        var key = keys.pop();
        var fragments = str.split(key);

        if (keys.length) {
            for (var i = 0; i < fragments.length; i++) {
                fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
            }
        }

        return fragments.join(args[key]);
    };

    Drupal.t = function (str, args, options) {
        options = options || {};
        options.context = options.context || '';

        if (typeof drupalTranslations !== 'undefined' && drupalTranslations.strings && drupalTranslations.strings[options.context] && drupalTranslations.strings[options.context][str]) {
            str = drupalTranslations.strings[options.context][str];
        }

        if (args) {
            str = Drupal.formatString(str, args);
        }

        return str;
    };

    Drupal.url = function (path) {
        return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + path;
    };

    Drupal.url.toAbsolute = function (url) {
        var urlParsingNode = document.createElement('a');

        try {
            url = decodeURIComponent(url);
        } catch (e) {}

        urlParsingNode.setAttribute('href', url);
        return urlParsingNode.cloneNode(false).href;
    };

    Drupal.url.isLocal = function (url) {
        var absoluteUrl = Drupal.url.toAbsolute(url);
        var protocol = window.location.protocol;

        if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
            protocol = 'https:';
        }

        var baseUrl = "".concat(protocol, "//").concat(window.location.host).concat(drupalSettings.path.baseUrl.slice(0, -1));

        try {
            absoluteUrl = decodeURIComponent(absoluteUrl);
        } catch (e) {}

        try {
            baseUrl = decodeURIComponent(baseUrl);
        } catch (e) {}

        return absoluteUrl === baseUrl || absoluteUrl.indexOf("".concat(baseUrl, "/")) === 0;
    };

    Drupal.formatPlural = function (count, singular, plural, args, options) {
        args = args || {};
        args['@count'] = count;
        var pluralDelimiter = drupalSettings.pluralDelimiter;
        var translations = Drupal.t(singular + pluralDelimiter + plural, args, options).split(pluralDelimiter);
        var index = 0;

        if (typeof drupalTranslations !== 'undefined' && drupalTranslations.pluralFormula) {
            index = count in drupalTranslations.pluralFormula ? drupalTranslations.pluralFormula[count] : drupalTranslations.pluralFormula.default;
        } else if (args['@count'] !== 1) {
            index = 1;
        }

        return translations[index];
    };

    Drupal.encodePath = function (item) {
        return window.encodeURIComponent(item).replace(/%2F/g, '/');
    };

    Drupal.deprecationError = function (_ref) {
        var message = _ref.message;

        if (drupalSettings.suppressDeprecationErrors === false && typeof console !== 'undefined' && console.warn) {
            console.warn("[Deprecation] ".concat(message));
        }
    };

    Drupal.deprecatedProperty = function (_ref2) {
        var target = _ref2.target,
            deprecatedProperty = _ref2.deprecatedProperty,
            message = _ref2.message;

        if (!Proxy || !Reflect) {
            return target;
        }

        return new Proxy(target, {
            get: function get(target, key) {
                if (key === deprecatedProperty) {
                    Drupal.deprecationError({
                        message: message
                    });
                }

                for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    rest[_key - 2] = arguments[_key];
                }

                return Reflect.get.apply(Reflect, [target, key].concat(rest));
            }
        });
    };

    Drupal.theme = function (func) {
        if (func in Drupal.theme) {
            var _Drupal$theme;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            return (_Drupal$theme = Drupal.theme)[func].apply(_Drupal$theme, args);
        }
    };

    Drupal.theme.placeholder = function (str) {
        return "<em class=\"placeholder\">".concat(Drupal.checkPlain(str), "</em>");
    };
})(Drupal, window.drupalSettings, window.drupalTranslations, window.console, window.Proxy, window.Reflect);;
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

if (window.jQuery) {
    jQuery.noConflict();
}

document.documentElement.className += ' js';

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
})(Drupal, window.drupalSettings);;
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

Drupal.debounce = function (func, wait, immediate) {
    var timeout;
    var result;
    return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var context = this;

        var later = function later() {
            timeout = null;

            if (!immediate) {
                result = func.apply(context, args);
            }
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            result = func.apply(context, args);
        }

        return result;
    };
};;
! function (o, u) {
    "use strict";
    var l = Object.assign,
        i = Array.prototype,
        c = Object.prototype,
        t = i.splice,
        r = i.some,
        n = "undefined" != typeof Symbol && Symbol,
        f = "class",
        d = "add",
        s = "remove",
        a = "width",
        h = "height",
        e = "after",
        p = "before",
        v = "begin",
        g = "Left",
        m = "Height",
        y = "Width",
        b = "client" + y,
        E = "scroll",
        w = "iterator",
        A = "Observer",
        C = /-([a-z])/g,
        x = /^--/,
        S = {},
        O = (z.prototype.init = function (t, n) {
            n = new z(t, n);
            return R(t) ? (t.idblazy || (t.idblazy = n), t.idblazy) : n
        }, z);

    function z(t, n) {
        if (this.name = "dblazy", t) {
            if (I(t)) return t;
            var e = t;
            if (B(t)) {
                if (H(e = ot((I(n) ? n[0] : n) || u, t))) return
            } else if (W(t)) return this.ready(t);
            !e.nodeType && e !== o || (e = [e]);
            for (var r = this.length = e.length, i = 0; i < r; i++) this[i] = e[i]
        }
    }
    var L = O.prototype,
        T = L.init;

    function j(t) {
        var n = this,
            e = (n = I(n) ? n : T(n)).length;
        return e && 1 !== e ? n.each(t) : t(n[0]), n
    }

    function I(t) {
        return t instanceof O
    }

    function N(t) {
        return !H(t) && Array.isArray(t)
    }

    function P(t) {
        return "boolean" == typeof t
    }

    function R(t) {
        return t && t instanceof Element
    }

    function W(t) {
        return "function" == typeof t
    }

    function H(t) {
        return M(t) || D(t) || !1 === t || t.length && 0 === t.length
    }

    function M(t) {
        return null === t
    }

    function q(t) {
        if ("object" != typeof t || H(t)) return !1;
        t = Object.getPrototypeOf(t);
        return M(t) || t === c
    }

    function B(t) {
        return "string" == typeof t
    }

    function D(t) {
        return void 0 === t
    }

    function F(t) {
        return -1 !== [1, 9, 11].indexOf(!!t && t.nodeType)
    }

    function $(t) {
        return F(t) || !!(t = t) && t === t.window
    }

    function k(t, n, e) {
        if ("[object Object]" === c.toString.call(t))
            for (var r in t) U(t, r) && "length" !== r && n.call(e, t[r], r, t);
        else t && (1 === t.length ? n.call(e, t[0], 0, t) : t.forEach(n, e));
        return t
    }

    function U(t, n) {
        return c.hasOwnProperty.call(t, n)
    }

    function V(t) {
        return N(t) ? t : [t]
    }

    function _(t, n, r, e) {
        var i = this,
            o = D(r),
            u = !q(n) && (o || P(e)),
            c = B(e) ? e : "";
        if (u) {
            e = t && t.length ? t[0] : t;
            return o && (r = ""), J(e, n) ? e.getAttribute(n) : r
        }
        return j.call(t, function (e) {
            if (!F(e)) return u ? "" : i;
            q(n) ? k(n, function (t, n) {
                e.setAttribute(c + n, t)
            }) : M(r) ? k(V(n), function (t) {
                t = c + t;
                e.hasAttribute(t) && e.removeAttribute(t)
            }) : "src" === n ? e.src = r : e.setAttribute(n, r)
        })
    }

    function J(t, n) {
        return F(t) && t.hasAttribute(n)
    }

    function Q(t, n, e) {
        return _(t, n, null, e || "")
    }

    function G(e, t) {
        var r, i = 0;
        return F(e) && B(t) && (r = e.classList, k(t.split(" "), function (t) {
            var n;
            r ? r.contains(t) && i++ : (n = _(e, f)) && n.match(t) && i++
        })), 0 < i
    }

    function K(t, e, r) {
        return j.call(t, function (t) {
            var n;
            F(t) && B(e) && (n = t.classList, t = e.split(" "), n && (D(r) ? t.map(function (t) {
                n.toggle(t)
            }) : n[r].apply(n, t)))
        })
    }

    function X(n, t) {
        var e = 0;
        return R(n) && R(t) ? n !== t && n.contains(t) : N(n) ? -1 !== n.indexOf(t) : (B(n) && k(V(t), function (t) {
            -1 !== n.indexOf(t) && e++
        }), 0 < e)
    }

    function Y(t) {
        return t.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&")
    }

    function Z(n, t) {
        var e = 0;
        return B(n) && k(V(t), function (t) {
            n.startsWith(t) && e++
        }), 0 < e
    }

    function tt(t) {
        return t.replace(/\\s+/g, " ").trim()
    }

    function nt(t, n) {
        return R(t) && B(n) ? t.closest(n) : null
    }

    function et(t, n) {
        return !!R(t) && (B(n) ? t.matches(n) : R(n) && t === n)
    }

    function rt(n, t) {
        return r.call(V(t), function (t) {
            return F(n) && n.nodeName.toLowerCase() === t.toLowerCase()
        })
    }

    function it(t, n, e) {
        return B(n) && F(t) ? D(e) ? t.querySelector(n) || [] : function (t, n) {
            var e = V(t); {
                var r;
                B(t) && (r = n.querySelector(t), e = M(r) ? [] : n.querySelectorAll(t))
            }
            return i.slice.call(e)
        }(n, t) : []
    }

    function ot(t, n) {
        return it(t, n, 1)
    }

    function ut(t) {
        var n;
        !R(t) || (n = Ct(t)) && n.removeChild(t)
    }

    function ct(t) {
        return R(t) && t.currentStyle || !D(u.documentMode)
    }

    function ft() {
        return o.devicePixelRatio || 1
    }

    function st() {
        return o.innerWidth || u.documentElement[b] || u.body[b] || o.screen[a]
    }

    function at(t, n, e, r, i, o) {
        return vt(t, n, e, r, i, o, d)
    }

    function lt(t, n, e, r, i, o) {
        return vt(t, n, e, r, i, o, s)
    }

    function dt(t, n, e, r) {
        return at(t, n, e, {
            once: !0
        }, r)
    }

    function ht(t) {
        return t.decoded || t.complete
    }

    function pt() {
        return 1
    }

    function vt(t, n, e, c, r, f, s) {
        var i, o = c,
            a = ct();
        c = B(e) ? (i = X(n, ["touchstart", E, "wheel"]), D(r) && (r = !a && {
            capture: !i,
            passive: i
        }), function (t) {
            var n = t.target;
            if (et(n, e)) o.call(n, t);
            else
                for (; n && n !== this;) {
                    if (et(n, e)) return void o.call(n, t);
                    n = n.parentElement
                }
        }) : (f = r, r = o, e);
        return j.call(t, function (i) {
            var o, u;
            $(i) && (o = !1, u = r || !1, q(r) && (u = l({
                capture: !1,
                passive: !0
            }, r), o = u.once || !1), k(n.split(" "), function (t) {
                f = f || Z(t, ["blazy.", "bio."]);
                var n = s === d,
                    e = (f ? t : t.split(".")[0]).trim(),
                    r = c = c || S[t];
                W(c) && (o && n && a && (n = !(c = function t(n) {
                    i.removeEventListener(e, t, u), r.apply(this, arguments)
                })), i[s + "EventListener"](e, c, u)), n ? S[t] = c : delete S[t]
            }))
        })
    }

    function gt(t, e, r, i) {
        return j.call(t, function (t) {
            var n;
            return $(t) && (n = D(r) ? new Event(e) : (n = {
                bubbles: !0,
                cancelable: !0,
                detail: r || {}
            }, q(i) && (n = l(n, i)), new CustomEvent(e, n)), t.dispatchEvent(n)), n
        })
    }

    function mt(t) {
        return t.replace(C, function (t, n) {
            return n.toUpperCase()
        })
    }

    function yt(t) {
        return x.test(t)
    }

    function bt(t, n, e) {
        if (R(t)) {
            var r = getComputedStyle(t, null);
            return D(n) ? r : e || yt(n) ? r.getPropertyValue(n) || null : r[n] || t.style[n]
        }
    }

    function Et(t, n, i) {
        var o = this,
            e = D(i),
            u = q(n),
            c = !u && e;
        if (c && B(n)) {
            var r = t && t.length ? t[0] : t,
                e = [a, h, "top", "right", "bottom", "left"],
                r = bt(r, n);
            return -1 === e.indexOf(n) ? r : parseInt(r, 10)
        }
        return j.call(t, function (e) {
            if (!R(e)) return c ? "" : o;

            function r(t, n) {
                W(n) && (n = n()), (X(t, "-") || yt(t)) && (t = mt(t)), e.style[t] = B(n) ? n : n + "px"
            }
            u ? k(n, function (t, n) {
                r(n, t)
            }) : M(i) ? k(V(n), function (t) {
                e.style.removeProperty(t)
            }) : B(n) && r(n, i)
        })
    }

    function wt(t, n, e) {
        var r, i = 0;
        return R(t) && (i = t["offset" + e], n && (r = bt(t), t = function (t) {
            return parseInt(r["margin" + t], 10)
        }, i += e === m ? t("Top") + t("Bottom") : t(g) + t("Right"))), i
    }

    function At(t, n, e) {
        R(t) && t["insertAdjacent" + (R(n) ? "Element" : "HTML")](e, n)
    }

    function Ct(t) {
        return R(t) && t.parentElement
    }

    function xt(t) {
        return R(t) && t.previousElementSibling
    }(T.fn = T.prototype = L).length = 0, L.splice = t, n && (L[n[w]] = i[n[w]]), T.trigger = gt.bind(T), L.trigger = function (t, n, e) {
        return gt(this, t, n, e)
    }, T.isArr = N, T.isBool = P, T.isElm = R, T.isFun = W, T.isEmpty = H, T.isNull = M, T.isNum = function (t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }, T.isObj = q, T.isStr = B, T.isUnd = D, T.isEvt = $, T.isQsa = F, T.isIo = "Intersection" + A in o, T.isMo = "Mutation" + A in o, T.isRo = "Resize" + A in o, T.isNativeLazy = "loading" in HTMLImageElement.prototype, T.isAmd = "function" == typeof define && define.amd, T._er = -1, T._ok = 1, T.chain = function (t, n) {
        return j.call(t, n)
    }, L.chain = function (t) {
        return j.call(this, t)
    }, T.each = k, L.each = function (t) {
        return k(this, t)
    }, T.extend = l, L.extend = function (t) {
        return l(L, t)
    }, T.has = U, T.parse = function (t) {
        try {
            return 0 === t.length || "1" === t ? {} : JSON.parse(t)
        } catch (t) {
            return {}
        }
    }, T.toArray = V, T.hasAttr = J.bind(T), L.hasAttr = function (n) {
        var e = this;
        return r.call(e, function (t) {
            return J.call(e, t, n)
        })
    }, T.attr = _.bind(T), L.attr = function (t, n, e) {
        return M(n) ? this.removeAttr(t, e) : _(this, t, n, e)
    }, T.removeAttr = Q.bind(T), L.removeAttr = function (t, n) {
        return Q(this, t, n)
    }, T.hasClass = G.bind(T), L.hasClass = function (n) {
        var e = this;
        return r.call(e, function (t) {
            return G.call(e, t, n)
        })
    }, T.toggleClass = K.bind(T), L.toggleClass = function (t, n) {
        return K(this, t, n)
    }, T.addClass = function (t, n) {
        return K(t, n, d)
    }.bind(T), L.addClass = function (t) {
        return this.toggleClass(t, d)
    }, T.removeClass = function (t, n) {
        return K(t, n, s)
    }.bind(T), L.removeClass = function (t) {
        return arguments.length ? this.toggleClass(t, s) : this.attr(f, "")
    }, T.contains = X, T.escape = Y, T.startsWith = Z, T.trimSpaces = tt, T.closest = nt, L.closest = function (t) {
        return nt(this[0], t)
    }, T.is = et, T.equal = rt, L.equal = function (t) {
        return rt(this[0], t)
    }, T.find = it, L.find = function (t, n) {
        return it(this[0], t, n)
    }, T.findAll = ot, L.findAll = function (t) {
        return ot(this[0], t)
    }, L.first = function (t) {
        return D(t) ? this[0] : t
    }, T.remove = ut, L.remove = function () {
        this.each(ut)
    }, T.ie = ct, T.pixelRatio = ft, T.windowWidth = st, T.windowSize = function () {
        return {
            width: st(),
            height: o.innerHeight || u.documentElement.clientHeight
        }
    }, T.activeWidth = function (n, t) {
        var e = t.up || !1,
            r = Object.keys(n),
            i = r[0],
            o = r[r.length - 1],
            u = t.ww || st(),
            t = u * ft(),
            c = e ? u : t;
        return D(r = r.filter(function (t) {
            return e ? parseInt(t, 10) <= c : parseInt(t, 10) >= c
        }).map(function (t) {
            return n[t]
        })[e ? "pop" : "shift"]()) ? n[o <= c ? o : i] : r
    }, L.toEvent = function (t, n, e, r, i, o) {
        return vt(this, t, n, e, r, i, o)
    }, T.on = at.bind(T), L.on = function (t, n, e, r, i) {
        return this.toEvent(t, n, e, r, i, d)
    }, T.off = lt.bind(T), L.off = function (t, n, e, r, i) {
        return this.toEvent(t, n, e, r, i, s)
    }, T.one = dt.bind(T), L.one = function (t, n, e) {
        return dt(this, t, n, e)
    }, T.isDecoded = ht, L.ready = function (t) {
        function n() {
            return setTimeout(t, 0, T)
        }
        return "loading" !== u.readyState ? n() : u.addEventListener("DOMContentLoaded", n), this
    }, T.decode = function (e) {
        return ht(e) ? Promise.resolve(e) : "decode" in e ? (e.decoding = "async", e.decode()) : new Promise(function (t, n) {
            e.onload = function () {
                t(e)
            }, e.onerror = n()
        })
    }, T.once = function (t, n, e) {
        var r = [];
        return D(n) || (n = (r = B(n) ? ot(e || u, n) : V(n)).length) && pt(1 === n ? t(r[0]) : k(r, t)), r
    }, T.throttle = function (n, e, r) {
        e = e || 50;
        var i = 0;
        return function () {
            var t = +new Date;
            t - i < e || (i = t, n.apply(r, arguments))
        }
    }, T.resize = function (n, e) {
        return o.onresize = function (t) {
            clearTimeout(e), e = setTimeout(n.bind(t), 200)
        }, n
    }, T.template = function (t, n) {
        for (var e in n) U(n, e) && (t = t.replace(new RegExp(Y("$" + e), "g"), n[e]));
        return tt(t)
    }, T.context = function (t) {
        return (t = (t = t || u).length ? t[0] : t) && -1 !== [9, 11].indexOf(!!(n = t) && n.nodeType) ? t : u;
        var n
    }, T.camelCase = mt, T.isVar = yt, T.computeStyle = bt, L.computeStyle = function (t) {
        return bt(this[0], t)
    }, T.css = Et, L.css = function (t, n) {
        return Et(this, t, n)
    }, T.rect = function (t) {
        return R(t) ? t.getBoundingClientRect() : {}
    }, T.offset = function (t) {
        return {
            top: ((t = (void 0)(t)).top || 0) + u.body[E + "Top"],
            left: (t.left || 0) + u.body[E + g]
        }
    }, T.width = function (t, n) {
        return Et(t, a, n)
    }, T.height = function (t, n) {
        return Et(t, h, n)
    }, T.outerWidth = function (t, n) {
        return wt(t, n, y)
    }, T.outerHeight = function (t, n) {
        return wt(t, n, m)
    }, T.after = function (t, n) {
        At(t, n, e + "end")
    }, T.before = function (t, n) {
        At(t, n, p + v)
    }, T.append = function (t, n) {
        At(t, n, p + "end")
    }, T.prepend = function (t, n) {
        At(t, n, e + v)
    }, T.parent = Ct, T.prev = xt, T.next = function (t) {
        return R(t) && t.nextElementSibling
    }, T.index = function (t) {
        var n = 0;
        if (R(t))
            for (; !M(t = xt(t));) n++;
        return n
    }, T.matches = et, T.forEach = k, T.bindEvent = at.bind(T), T.unbindEvent = lt.bind(T), "undefined" != typeof exports ? module.exports = T : o.dBlazy = T
}(this, this.document);;
! function (n, o, r) {
    "use strict";

    function i(t) {
        t = t || 0;
        var i = n.windowSize();
        return {
            top: 0 - t,
            left: 0 - t,
            bottom: i.height + t,
            right: i.width + t
        }
    }
    n.ww = 0, n.vp = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }, n.isVisible = function (t, i) {
        var e = t.target || t;
        return n.isIo ? t.isIntersecting || 0 < t.intersectionRatio : (e = e, i = i, (e = n.isElm(e) ? n.rect(e) : e).right >= i.left && e.bottom >= i.top && e.left <= i.right && e.top <= i.bottom)
    }, n.isResized = function (t, i) {
        return !!i.contentRect || !!t.resizeTrigger || !1
    }, n.viewport = i, n.windowData = function (t, i) {
        var e = this,
            n = t.offset || 100,
            o = t.mobileFirst || !1;
        return i && e.initViewport(t), e.ww = e.vp.right - n, {
            vp: e.vp,
            ww: e.ww,
            up: o
        }
    }, n.initViewport = function (t) {
        return this.vp = i(t.offset), this.vp
    }, n.updateViewport = function (t) {
        var i = this,
            e = t.offset;
        return i.vp.bottom = (o.innerHeight || r.documentElement.clientHeight) + e, i.vp.right = (o.innerWidth || r.documentElement.clientWidth) + e, i.windowData(t)
    }
}(dBlazy, this, this.document);;
! function (l, i, s) {
    "use strict";
    var d = "blazy",
        f = 0,
        g = ["srcset", "src"],
        r = "b-bg";

    function t(s, e) {
        return s = s.target || s, l.hasClass(s, e)
    }
    l._defaults = {
        error: !1,
        offset: 100,
        root: s,
        success: !1,
        selector: ".b-lazy",
        separator: "|",
        container: !1,
        containerClass: !1,
        errorClass: "b-error",
        loadInvisible: !1,
        successClass: "b-loaded",
        visibleClass: !1,
        validateDelay: 25,
        saveViewportOffsetDelay: 50,
        srcset: "data-srcset",
        src: "data-src",
        bgClass: r,
        isMedia: !1,
        parent: ".media",
        disconnect: !1,
        intersecting: !1,
        observing: !1,
        resizing: !1,
        mobileFirst: !1,
        rootMargin: "0px",
        threshold: [0]
    }, l.isCompleted = function (s) {
        if (l.isElm(s)) {
            if (l.equal(s, "img")) return l.isDecoded(s);
            if (l.equal(s, "iframe")) return "complete" === (s.contentDocument || s.contentWindow.document).readyState
        }
        return !1
    }, l.isBg = function (s, e) {
        return t(s, e && e.bgClass || r)
    }, l.isBlur = function (s) {
        return t(s, "b-blur")
    }, l.selector = function (s, e) {
        var r = s.selector;
        return e && l.isBool(e) && (e = ":not(." + s.successClass + ")"), r + (e = e || "")
    }, l.success = function (s, e, r, t) {
        return l.isFun(t.success) && t.success(s, e, r, t), 0 < f && f--, f
    }, l.error = function (s, e, r, t) {
        return l.isFun(t.error) && t.error(s, e, r, t), ++f
    }, l.status = function (s, e, r) {
        return this.loaded(s, e, null, r)
    }, l.loaded = function (s, e, r, t) {
        var i = l.closest(s, t.parent) || s,
            n = e === l._ok || !0 === e,
            o = t.successClass,
            a = t.errorClass,
            c = "is-" + o,
            u = "is-" + a;
        return r = r || i, l.addClass(s, n ? o : a), l.addClass(i, n ? c : u), l.removeClass(i, "is-b-visible"), f = this[n ? "success" : "error"](s, e, r, t), n && l.removeAttr(s, g, "data-"), l.trigger(s, d + ".loaded", {
            status: e
        }), f
    }, l.loadVideo = function (s, e, r) {
        return l.mapSource(s, "src", !0), s.load(), l.status(s, e, r)
    }, l.onresizing = function (s, e) {
        var r = s.elms,
            t = s.options;
        l.isFun(t.resizing) && t.resizing(s, r, e), l.trigger(i, d + ".resizing", {
            winData: e,
            entries: r
        })
    }
}(dBlazy, this, this.document);;
! function (i) {
    "use strict";

    function r(t, n, e) {
        return i.chain(t, function (a) {
            i.isElm(a) && i.each(i.toArray(n), function (t) {
                var n, r = "data-" + t;
                i.hasAttr(a, r) && (n = i.attr(a, r), i.attr(a, t, n), e && i.removeAttr(a, r))
            })
        })
    }

    function a(t, e, u, c) {
        i.isUnd(c) && (c = !0);
        return i.chain(t, function (t) {
            var n, r, a;
            i.isElm(t) && (n = t.parentNode, r = i.equal(n, "picture"), a = null, c ? a = r ? n : t : r && (a = n), i.isElm(a) && (a = a.getElementsByTagName("source"), e = e || (r ? "srcset" : "src"), a.length && i(a).mapAttr(e, u)))
        })
    }
    i.mapAttr = r, i.fn.mapAttr = function (t, n) {
        return r(this, t, n)
    }, i.mapSource = a, i.fn.mapSource = function (t, n, r) {
        return a(this, t, n, r)
    }
}(dBlazy);;
! function (l, s) {
    "use strict";
    l.enqueue = function (n, e, r) {
        l.each(n, e.bind(r)), n.length = 0
    }, l.initObserver = function (r, n, e, i) {
        var t, o = r.options || {},
            a = r._queue || [],
            s = "windowData" in r ? r.windowData() : {},
            u = {
                rootMargin: o.rootMargin || "0px",
                threshold: o.threshold || 0
            };

        function c(n) {
            var e;
            return a.length || (e = requestAnimationFrame(h), r._raf.push(e)), a.push(n), !1
        }

        function h() {
            l.enqueue(a, n, r)
        }
        e = l.toArray(e), i && (r.ioObserver = l.isIo ? new IntersectionObserver(c, u) : n.call(r, e));
        return r.roObserver = function () {
            return t = this, s = l.isUnd(s.ww) ? l.windowData(o, !0) : r.windowData(), l.isRo ? new ResizeObserver(c) : n.call(r, e)
        }(), r.resizeTrigger = t, s
    }, l.observe = function (n, r, e) {
        function i(e) {
            e && r.length && l.each(r, function (n) {
                e.observe(n)
            })
        }
        var t = n.options || {},
            o = n.ioObserver,
            a = n.roObserver;
        return l.isIo && (o || a) ? (e && i(o), i(a)) : "Blazy" in s && (n.bLazy = new Blazy(t)), n
    }, l.unload = function (n) {
        n = n._raf;
        n && n.length && l.each(n, function (n) {
            cancelAnimationFrame(n)
        })
    }
}(dBlazy, this);;
! function (i) {
    "use strict";

    function n(n) {
        return i.chain(n, function (n) {
            var c = "loading",
                n = [n, i.closest(n, '[class*="' + c + '"]')];
            i.each(n, function (n) {
                var a;
                i.isElm(n) && (a = n.className, i.contains(a, c) && (n.className = a.replace(/(\S+)loading/g, "")))
            })
        })
    }
    i.unloading = n, i.fn.unloading = function () {
        return n(this)
    }
}(dBlazy);;
! function (n, e) {
    "use strict";
    n.debounce = function (n, c, u) {
        e.debounce(function () {
            n.call(u, c)
        }, 201, !0)
    }
}(dBlazy, Drupal);;
! function (t, e) {
    "use strict";
    var o = "Blazy",
        s = t.dBlazy;
    s.isAmd ? define([o, s, t], e) : "object" == typeof exports ? module.exports = e(o, s, t) : t.Blazy = e(o, s, t)
}(this, function (f, u, o) {
    "use strict";
    var d, v, n = document,
        g = "srcset",
        i = {},
        r = {},
        p = {};
    return function (t) {
        var s = this;
        s.name = f, s.options = i = u.extend(u._defaults, t || {}), s.options.container = !!i.containerClass && u.findAll(n, i.containerClass), s.destroyed = !0;
        t = s._util = {};
        return i = s.options, d = i.src || "data-src", v = 1 < u.pixelRatio(), u.initViewport(i), s.windowData = function () {
            return u.isUnd(p.vp) ? u.windowData(i, !0) : p
        }, s.revalidate = function () {
            e(s)
        }, s.load = function (t, e) {
            var o = s.options;
            t && u.isUnd(t.length) ? l(t, e, o) : u.each(t, function (t) {
                l(t, e, o)
            })
        }, s.destroy = function () {
            var e = s._util;
            i.container && u.each(i.container, function (t) {
                u.off(t, "scroll." + f, e.validateT)
            }), u.off(o, "scroll." + f, e.validateT), u.off(o, "resize." + f, e.validateT), u.off(o, "resize." + f, e.saveViewportOffsetT), s.count = 0, s.elms.length = 0, s.destroyed = !0
        }, t.validateT = u.throttle(function () {
            a(s)
        }, i.validateDelay, s), t.saveViewportOffsetT = u.throttle(function () {
            c(i), u.onresizing(s, p)
        }, i.saveViewportOffsetDelay, s), c(i), setTimeout(function () {
            e(s)
        }), s
    };

    function e(t) {
        var e = t._util;
        t.elms = u.findAll(i.root || n, u.selector(i)), t.count = t.elms.length, t.destroyed && (t.destroyed = !1, i.container && u.each(i.container, function (t) {
            u.on(t, "scroll." + f, e.validateT)
        }), u.on(o, "resize." + f, e.saveViewportOffsetT), u.on(o, "resize." + f, e.validateT), u.on(o, "scroll." + f, e.validateT)), a(t)
    }

    function a(t) {
        for (var e = 0; e < t.count; e++) {
            var o = t.elms[e];
            (function (t, e) {
                var o = u.rect(t);
                if (e.container) {
                    var s = u.closest(t, e.containerClass);
                    if (s) {
                        var n = u.rect(s);
                        if (u.isVisible(n, r)) {
                            var i = n.top - e.offset,
                                t = n.right + e.offset,
                                s = n.bottom + e.offset,
                                e = n.left - e.offset,
                                e = {
                                    top: i > r.top ? i : r.top,
                                    right: t < r.right ? t : r.right,
                                    bottom: s < r.bottom ? s : r.bottom,
                                    left: e > r.left ? e : r.left
                                };
                            return u.isVisible(o, e)
                        }
                        return !1
                    }
                }
                return u.isVisible(o, r)
            }(o, t.options) || u.hasClass(o, t.options.successClass)) && (t.load(o), t.elms.splice(e, 1), t.count--, e--)
        }
        0 === t.count && t.destroy()
    }

    function l(t, e, o) {
        var s, n, i, r, a, l, c;
        !u.hasClass(t, o.successClass) && (e || o.loadInvisible || 0 < t.offsetWidth && 0 < t.offsetHeight) && ((c = u.attr(t, d) || u.attr(t, o.src)) ? (e = c.split(o.separator), s = e[v && 1 < e.length ? 1 : 0], n = u.attr(t, o.srcset), c = u.isBg(t, o), i = u.equal(t, "img"), e = t.parentNode, r = u.equal(e, "picture"), a = u.ie(t), l = a && t.currentStyle["object-fit"], i || c ? (c = new Image, r && (c = t, u.each(e.getElementsByTagName("source"), function (t) {
            h(t, g, o.srcset)
        })), u.one(c, "error." + f, function () {
            u.status(t, !1, o)
        }), u.one(c, "load." + f, function () {
            i ? r || (w(t, s, n, l), l && (t.style.backgroundImage = 'url("' + s + '")')) : (l = a, u.isFun(u.bgUrl) ? (s = u.bgUrl(t, p), u.bg(t, p)) : t.style.backgroundImage = 'url("' + s + '")'), m(t, o)
        }), w(c, s, n, l)) : (t.src = s, m(t, o))) : u.equal(t, "video") ? (u.each(t.getElementsByTagName("source"), function (t) {
            h(t, "src", o.src)
        }), t.load(), m(t, o)) : (o.error && o.error(t, "missing"), u.addClass(t, o.errorClass)))
    }

    function m(t, e) {
        u.status(t, !0, e)
    }

    function h(t, e, o) {
        var s = u.attr(t, o);
        s && (u.attr(t, e, s), u.removeAttr(t, o))
    }

    function w(t, e, o, s) {
        o && u.attr(t, g, o), s ? (u.addClass(t, "is-b-ie"), t.src = "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20" + (t.width || 1) + "%20" + (t.height || 1) + "'%2F%3E") : t.src = e
    }

    function c(t) {
        p = u.updateViewport(t), r = u.vp
    }
});;
! function (e, i) {
    "use strict";
    var t = "Bio",
        s = e.dBlazy;
    s.isAmd ? define([t, s, e], i) : "object" == typeof exports ? module.exports = i(t, s) : e[t] = i(t, s)
}(this || module || {}, function (t, v, e) {
    "use strict";
    v.isAmd && window;
    var s, o = document,
        n = o,
        f = {},
        r = 0,
        b = 0,
        d = 0,
        a = 0,
        u = "b-bg",
        p = ".media",
        y = "addClass",
        h = "removeClass",
        l = !1,
        c = 25,
        m = i.prototype;

    function i(e) {
        var i = v.extend(m, this);
        return i.name = t, i.options = s = v.extend({}, v._defaults, e || {}), u = s.bgClass || u, c = s.validateDelay || c, p = s.parent || p, n = s.root || n, setTimeout(function () {
            i.reinit()
        }), i
    }

    function g(e, i) {
        var t = this,
            s = t.options,
            o = t.count,
            n = t.ioObserver;
        r === o - 1 && t.destroyQuietly(), n && t.isLoaded(e) && !e.bloaded && s.isMedia && (n.unobserve(e), e.bloaded = !0, r++), e.bhit && !i || (t.lazyLoad(e, f), a++, i = !(e.bhit = !0)), v.isFun(s.intersecting) && s.intersecting(e, s), v.trigger(e, "bio.intersecting", {
            options: s
        })
    }

    function z(e) {
        var r = this,
            d = r.options,
            a = v.vp,
            u = v.ww,
            i = e[0],
            l = v.isBlur(i),
            i = v.isResized(r, i),
            c = d.visibleClass;
        if (i) f = v.updateViewport(d), v.onresizing(r, f);
        else if (r.destroyed && !c) return;
        v.each(e, function (e) {
            var i = e.target || e,
                t = v.isResized(r, e),
                s = v.isVisible(e, a),
                o = v.closest(i, p) || i,
                n = r.isLoaded(i);
            v[s && !n ? y : h](o, "is-b-visible"), c && v.isStr(c) && v[s ? y : h](o, c), s && g.call(r, i), t && 0 < b && !l && (b !== u && r.resizing(i, f), r.resizeTick++), v.isFun(d.observing) && d.observing(e, s, d)
        }), b = u
    }
    return m.constructor = i, m.count = 0, m.erCount = 0, m.resizeTick = 0, m.lazyLoad = function (e, i) {}, m.loadImage = function (e, i, t) {}, m.resizing = function (e, i) {}, m.natively = function () {}, m.windowData = function () {
        return v.isUnd(f.vp) ? v.windowData(this.options, !0) : f
    }, m.load = function (e, i, t) {
        var s = this;
        e = e && v.toArray(e), v.isUnd(t) || (s.options = v.extend(s.options, t || {})), v.each(e, function (e) {
            (s.isValid(e) || v.isElm(e) && i) && g.call(s, e, i)
        })
    }, m.isLoaded = function (e) {
        return v.hasClass(e, this.options.successClass)
    }, m.isValid = function (e) {
        return v.isElm(e) && !this.isLoaded(e)
    }, m.revalidate = function (e) {
        var i = this;
        (!0 === e || i.count !== a) && d < a && (i.elms = v.findAll(n, v.selector(i.options))).length && (i.observe(!0), d++)
    }, m.destroyQuietly = function (e) {
        var i = this,
            t = i.options;
        i.destroyed || !e && !v.isUnd(Drupal.io) || (t = v.find(o, v.selector(t, ":not(." + t.successClass + ")")), v.isElm(t) || i.destroy(e))
    }, m.destroy = function (e) {
        var i = this,
            t = i.options,
            s = i.ioObserver;
        i.destroyed || 0 < i.erCounted && !e || (r === i.count - 1 && t.disconnect || e) && (s && s.disconnect(), v.unload(i), i.count = 0, i.elms = [], i.ioObserver = null, i.destroyed = !0)
    }, m.observe = function (e) {
        var i = this,
            t = i.elms;
        v.isIo && (i.destroyed || e) && (f = v.initObserver(i, z, t, !0), i.destroyed = !1), l && !e || (v.observe(i, t, !0), l = !0)
    }, m.reinit = function () {
        this.destroyed = !0,
            function (e) {
                e.natively();
                var i = e.elms = v.findAll(n, v.selector(e.options));
                e.count = i.length, e._raf = [], e._queue = [], e.observe(!0)
            }(this)
    }, i
});;
! function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function (i) {
    "use strict";
    var e = window.Slick || {};
    (e = function () {
        var e = 0;
        return function (t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
    }()).prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function (e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function (i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function () {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function () {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function (e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function () {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function (i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function () {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function () {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function () {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function () {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function () {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function () {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function (e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function (e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
        case "previous":
            s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
            break;
        case "next":
            s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
            break;
        case "index":
            var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
            r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
            break;
        default:
            return
        }
    }, e.prototype.checkNavigable = function (i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function () {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function (i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function (i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function (i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function () {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function (i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function () {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        return this.currentSlide
    }, e.prototype.getDotCount = function () {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function (i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
        return this.options[i]
    }, e.prototype.getNavigableIndexes = function () {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function () {
        return this
    }, e.prototype.getSlideCount = function () {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function (e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function () {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function (i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }, e.prototype.initArrowEvents = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function () {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function (i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            i("img[data-lazy]", e).each(function () {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function () {
                    e.animate({
                        opacity: 0
                    }, 100, function () {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function () {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }, r.onerror = function () {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                }, r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, e.prototype.loadSlider = function () {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function () {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function () {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function (e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function (i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function () {
            e < 3 ? setTimeout(function () {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function (e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function () {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                } s.breakpoints.sort(function (i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function () {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.setCSS = function (i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function () {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function () {
        var e, t = this;
        t.$slides.each(function (o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function () {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function (i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                } l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function () {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function () {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, e.prototype.setSlideClasses = function (i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function () {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function (i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function (e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }, e.prototype.slideHandler = function (i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
                a.postSlide(o)
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
            a.postSlide(o)
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
                a.postSlide(s)
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function () {
                a.postSlide(s)
            }) : a.postSlide(s)
        }
    }, e.prototype.startLoad = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function () {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function (i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function (i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
        case "start":
            e.swipeStart(i);
            break;
        case "move":
            e.swipeMove(i);
            break;
        case "end":
            e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function (i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function (i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function () {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function (i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function () {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function () {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function () {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function () {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
    }
});;
! function (t, e) {
    "use strict";
    var a = "BioMedia",
        o = t.dBlazy,
        n = t.Bio;
    "function" == typeof define && define.amd ? define([a, o, n], e) : "object" == typeof exports ? module.exports = e(a, o, n) : t[a] = e(a, o, n)
}(this, function (a, d, o) {
    "use strict";
    var e = document,
        t = "data-",
        p = "src",
        l = "srcset",
        f = t + p,
        g = [l, p],
        h = 0,
        n = !1,
        r = Bio.prototype,
        i = s.prototype = Object.create(r);

    function s(t) {
        var e = o.apply(d.extend(r, d.extend(i, this)), arguments);
        return e.name = a, e
    }
    return i.constructor = s, i.lazyLoad = function (t, e) {
        var a = this,
            o = a.options,
            n = t.parentNode,
            r = d.isBg(t),
            i = d.equal(n, "picture"),
            s = d.equal(t, "img") && !i,
            c = d.equal(t, "video"),
            n = d.hasAttr(t, f);
        i ? (n && (d.mapSource(t, l, !0), d.mapAttr(t, p, !0)), h = d.status(t, !0, o)) : c ? h = d.loadVideo(t, !0, o) : s || r ? a.loadImage(t, r, e) : d.hasAttr(t, p) && (d.attr(t, f) && d.mapAttr(t, p, !0), h = d.status(t, !0, o)), a.erCount = h
    }, i.loadImage = function (t, a, o) {
        function e(t, e) {
            a && d.isFun(d.bg) && d.bg(t, o), h = d.status(t, e, n)
        }
        var n = this.options,
            r = new Image,
            i = d.hasAttr(t, l),
            s = d.hasAttr(t, f),
            c = s ? f : p,
            u = s ? "data-srcset" : l;
        "decode" in r && (r.decoding = "async"), a && d.isFun(d.bgUrl) ? r.src = d.bgUrl(t, o) : (s && d.mapAttr(t, g, !1), r.src = d.attr(t, c)), i && (r.srcset = d.attr(t, u)), d.decode(r).then(function () {
            e(t, !0)
        }).catch(function () {
            e(t, i), i || (t.bhit = !1)
        })
    }, i.resizing = function (t, e) {
        var a = d.isBg(t, this.options);
        a && this.loadImage(t, a, e)
    }, i.natively = function () {
        var t = this.options;
        d.isNativeLazy && !n && (t = d.selector(t, "[data-src][loading]:not(.b-blur)"), (t = d.findAll(e, t)).length && d(t).mapAttr(["srcset", "src"], !0).mapSource(!1, !0, !1), n = !0)
    }, s
});;
! function (o, t, n, l, e) {
    "use strict";
    var s = "data",
        a = ".b-blur",
        r = ".media",
        i = "successClass",
        u = (c = "blazy") + ".done",
        c = function () {},
        d = {};
    t.blazy = {
        context: e,
        name: "Drupal.blazy",
        init: null,
        instances: [],
        resizeTick: 0,
        resizeTrigger: !1,
        blazySettings: n.blazy || {},
        ioSettings: n.blazyIo || {},
        options: {},
        clearCompat: c,
        clearScript: c,
        checkResize: c,
        resizing: c,
        revalidate: c,
        isIo: function () {
            return !0
        },
        isBlazy: function () {
            return !o.isIo && "Blazy" in l
        },
        isFluid: function (t, n) {
            return o.equal(t.parentNode, "picture") && o.hasAttr(n, "data-dimensions")
        },
        isLoaded: function (t) {
            return o.hasClass(t, this.options[i])
        },
        globals: function () {
            var t = this,
                n = {
                    isMedia: !0,
                    success: t.clearing.bind(t),
                    error: t.clearing.bind(t),
                    resizing: t.resizing.bind(t),
                    selector: ".b-lazy",
                    parent: r,
                    errorClass: "b-error",
                    successClass: "b-loaded"
                };
            return o.extend(t.blazySettings, t.ioSettings, n)
        },
        extend: function (t) {
            d = o.extend({}, d, t)
        },
        merge: function (t) {
            var n = this;
            return n.options = o.extend({}, n.globals(), n.options, t || {}), n.options
        },
        run: function (t) {
            return new BioMedia(t)
        },
        mount: function (t) {
            var n = this;
            return n.merge(), t && o.each(d, function (t) {
                o.isFun(t) && t.call(n)
            }), o.extend(n, d)
        },
        selector: function (t) {
            t = t || "";
            var n = this.options;
            return n.selector + t + ":not(." + n[i] + ")"
        },
        clearing: function (t) {
            var n, i;
            t.bclearing || (n = this, i = o.hasClass(t, "b-responsive") && o.hasAttr(t, s + "-pfsrc"), o.isFun(o.unloading) && o.unloading(t), o.trigger(t, u, {
                options: n.options
            }), n.clearCompat(t), n.clearScript(t), l.picturefill && i && l.picturefill({
                reevaluate: !0,
                elements: [t]
            }), t.bclearing = !0)
        },
        windowData: function () {
            return this.init ? this.init.windowData() : {}
        },
        load: function (n) {
            var i = this;
            l.setTimeout(function () {
                var t = o.findAll(n || e, i.selector());
                t.length && o.each(t, i.update.bind(i))
            }, 100)
        },
        update: function (t, n, i) {
            function e() {
                o.hasAttr(t, "data-b-bg") && o.isFun(o.bg) ? o.bg(t, i || s.windowData()) : s.init && (o.hasClass(t, r.substring(1)) || (t = o.find(t, r) || t), s.init.load(t, !0, a))
            }
            var s = this,
                a = s.options,
                r = a.selector;
            (n = n || !1) ? l.setTimeout(e, 100): e()
        },
        rebind: function (t, i, e) {
            var n = o.findAll(t, this.options.selector + ":not(" + a + ")"),
                s = n.length;
            s || (n = o.findAll(t, "img:not(" + a + ")")), n.length && o.each(n, function (t) {
                var n = s ? u : "load";
                o.one(t, n, i, s), e && e.observe(t)
            })
        },
        pad: function (n, i, t) {
            var e = this,
                s = o.closest(n, r) || n;
            setTimeout(function () {
                var t = Math.round(n.naturalHeight / n.naturalWidth * 100, 2);
                e.isFluid(n, s) && (s.style.paddingBottom = t + "%"), o.isFun(i) && i.call(e, n, s, t)
            }, t || 0)
        }
    }
}(dBlazy, Drupal, drupalSettings, this, this.document);;
! function (o, i, n) {
    "use strict";
    var l = "blazy",
        c = l + "--on",
        t = "b-checked",
        e = "image",
        r = "#drupal-modal, .is-b-scroll",
        d = {};

    function s(a, t, i) {
        var n, e = this,
            r = 1 < e.resizeTick,
            s = e.instances;
        s.length && r && (n = function (a) {
            a.dblazy && a.dbuniform && (a.dblazy !== t.dblazy || a.dbpicture || (o.trigger(a, l + ".uniform." + a.dblazy, {
                pad: i
            }), a.dbpicture = !0))
        }, o.each(s, function (a) {
            o.debounce(n, a, e)
        }, e))
    }
    i.blazy = o.extend(i.blazy || {}, {
        clearScript: function (a) {
            o.hasClass(a, d.errorClass) && !o.hasClass(a, t) && (o.addClass(a, t), this.update(a, !0)), this.pad(a, s)
        },
        fixDataUri: function () {
            var a = o.findAll(this.context, this.selector('[src^="image"]'));
            a.length && o.each(a, function (a) {
                var t = o.attr(a, "src");
                o.contains(t, ["base64", "svg+xml"]) && o.attr(a, "src", t.replace(e, "data:" + e))
            })
        }
    }), i.behaviors.blazy = {
        attach: function (a) {
            var t = i.blazy,
                a = o.context(a);
            t.context = a, o.once(function (a) {
                var t = this,
                    i = o.parse(o.attr(a, "data-" + l)),
                    n = o.hasClass(a, l + "--field block-grid " + l + "--uniform"),
                    e = (1e4 * Math.random()).toFixed(0),
                    r = l + ".uniform." + e,
                    s = o.findAll(a, ".media--ratio");
                d = t.merge(i), t.revalidate = t.revalidate || o.hasClass(a, l + "--revalidate"), o.addClass(a, c), a.dblazy = e, a.dbuniform = n, t.instances.push(a), n && s.length && o.on(a, r, function (a) {
                    var t = a.detail.pad || 0;
                    10 < t && o.each(s, function (a) {
                        a.style.paddingBottom = t + "%"
                    })
                })
            }.bind(t), ".blazy:not(.blazy--on)", a), o.once(function (a) {
                var t = this,
                    i = {
                        mobileFirst: !1
                    };
                n.documentElement.isSameNode(a) || (i.root = a);
                a = (i = t.merge(i)).container;
                a && !o.contains(r, a) && (r += ", " + a.trim()), i.container = r, d = t.merge(i), t.fixDataUri(), t.init = t.run(t.options)
            }.bind(t), "html", a)
        }
    }
}(dBlazy, Drupal, (drupalSettings, this.document));;
