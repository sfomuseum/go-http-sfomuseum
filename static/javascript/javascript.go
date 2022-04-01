// package javascript provides JavaScript (JS) assets for use in SFO Museum web applications.
// JS files with a `drupal` suffix are sourced from the sfomuseum.org website.
// JS files with a `pruned` suffix are modified versions of their `drupal` counterparts and contain only
// those elements necessary for functionality in the common SFO Museum header and footer.
// The `jquery-3.6.0.min.js` and `superfish.min.js` are the minified source files of dependencies used
// by the common SFO Museum header and footer JavaScript code.
// The `config.pruned.json` file is JSON configuration file containing varaibles and data necessary for the
// `superfish.min.js` code to work. These data are hard-coded in the `templates/html/common_footer.html`
// template and this file is included as an easier-to-read reference.
// The `sfomuseum.sweater.js` file is the unminified concatenation of all the relevant JS files necessary
// for the common SFO Museum header and footers to function. It is generated programatically in the Makefile.
// In future releases the dependency on jQuery should be replaced with equivalent functionality written in
// plain-vanilla JavaScript.
package javascript
