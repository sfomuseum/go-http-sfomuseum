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
